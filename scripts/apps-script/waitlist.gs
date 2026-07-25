/**
 * PokeMyth Online — Waitlist de Players Fundadores
 * Google Apps Script (Web App) que grava as candidaturas em uma planilha.
 *
 * Instalação passo a passo: ver scripts/apps-script/README.md
 *
 * Endpoints (POST, JSON):
 *   { secret, action: "status" }
 *     -> { ok: true, totalSpots, spotsLeft, taken }
 *   { secret, action: "signup", fullName, username, email, discord, source?, userAgent? }
 *     -> { ok: true, position, spotsLeft }
 *     -> { ok: false, error: "FULL" | "DUPLICATE" | "UNAUTHORIZED" | "BAD_REQUEST" }
 */

// ===========================================================================
// CONFIGURAÇÃO
// ===========================================================================

/** Vagas do beta fechado. Deve bater com waitlistConfig.totalSpots no site. */
var TOTAL_SPOTS = 10;

/** Nome da aba da planilha. Criada automaticamente se não existir. */
var SHEET_NAME = 'Fundadores';

/**
 * Quando true, candidaturas acima de TOTAL_SPOTS continuam sendo gravadas
 * (marcadas como "Lista de espera") em vez de serem recusadas com FULL.
 * Recomendado: true — você não perde leads depois que as 10 vagas enchem.
 */
var KEEP_OVERFLOW = true;

var HEADERS = [
  'Data/Hora',
  'Nome',
  'Nick desejado',
  'E-mail',
  'Discord',
  'Status',
  'Origem',
  'User Agent',
];

// ===========================================================================
// ENTRADA HTTP
// ===========================================================================

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'BAD_REQUEST' });
    }

    var body = JSON.parse(e.postData.contents);

    if (!isAuthorized(body.secret)) {
      return jsonOut({ ok: false, error: 'UNAUTHORIZED' });
    }

    if (body.action === 'status') {
      return jsonOut(buildStatus());
    }

    if (body.action === 'signup') {
      return jsonOut(handleSignup(body));
    }

    return jsonOut({ ok: false, error: 'BAD_REQUEST' });
  } catch (err) {
    return jsonOut({ ok: false, error: 'SERVER_ERROR', message: String(err) });
  }
}

/** GET simples só para conferir se o deploy está no ar. */
function doGet() {
  return jsonOut({ ok: true, service: 'pokemyth-waitlist', totalSpots: TOTAL_SPOTS });
}

// ===========================================================================
// AÇÕES
// ===========================================================================

function buildStatus() {
  var sheet = getSheet();
  var taken = countConfirmed(sheet);
  return {
    ok: true,
    totalSpots: TOTAL_SPOTS,
    spotsLeft: Math.max(0, TOTAL_SPOTS - taken),
    taken: taken,
  };
}

function handleSignup(body) {
  var fullName = trimStr(body.fullName);
  var username = trimStr(body.username);
  var email = trimStr(body.email).toLowerCase();
  var discord = trimStr(body.discord);

  if (!fullName || !username || !email || !discord) {
    return { ok: false, error: 'BAD_REQUEST' };
  }

  // Trava para evitar que dois envios simultâneos peguem a mesma vaga.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = getSheet();
    var rows = sheet.getDataRange().getValues();

    // Duplicidade por e-mail ou nick (ignora a linha de cabeçalho).
    for (var i = 1; i < rows.length; i++) {
      var rowEmail = String(rows[i][3] || '').trim().toLowerCase();
      var rowUser = String(rows[i][2] || '').trim().toLowerCase();
      if (rowEmail === email || rowUser === username.toLowerCase()) {
        return { ok: false, error: 'DUPLICATE' };
      }
    }

    var taken = countConfirmed(sheet);
    var isOverflow = taken >= TOTAL_SPOTS;

    if (isOverflow && !KEEP_OVERFLOW) {
      return { ok: false, error: 'FULL' };
    }

    var status = isOverflow ? 'Lista de espera' : 'Fundador';

    sheet.appendRow([
      new Date(),
      fullName,
      username,
      email,
      discord,
      status,
      trimStr(body.source),
      trimStr(body.userAgent),
    ]);

    var position = sheet.getLastRow() - 1; // desconta o cabeçalho
    var newTaken = countConfirmed(sheet);

    notifyDiscord(fullName, username, email, discord, status, position);

    return {
      ok: true,
      position: position,
      status: status,
      spotsLeft: Math.max(0, TOTAL_SPOTS - newTaken),
      totalSpots: TOTAL_SPOTS,
    };
  } finally {
    lock.releaseLock();
  }
}

// ===========================================================================
// PLANILHA
// ===========================================================================

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Garante o cabeçalho na primeira execução.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var header = sheet.getRange(1, 1, 1, HEADERS.length);
    header.setFontWeight('bold');
    header.setBackground('#1a1030');
    header.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 240);
    sheet.setColumnWidth(5, 180);
  }

  return sheet;
}

/** Conta apenas as candidaturas que ocupam vaga de fundador. */
function countConfirmed(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;

  var statuses = sheet.getRange(2, 6, last - 1, 1).getValues();
  var count = 0;
  for (var i = 0; i < statuses.length; i++) {
    var s = String(statuses[i][0] || '').trim().toLowerCase();
    // Linhas em branco (importadas na mão) contam como fundador.
    if (s !== 'lista de espera' && s !== 'recusado') count++;
  }
  return count;
}

// ===========================================================================
// NOTIFICAÇÃO OPCIONAL NO DISCORD
// ===========================================================================

/**
 * Avisa a equipe no Discord a cada candidatura.
 * Opcional: só dispara se a propriedade DISCORD_WEBHOOK_URL estiver definida.
 */
function notifyDiscord(fullName, username, email, discord, status, position) {
  try {
    var url = PropertiesService.getScriptProperties().getProperty(
      'DISCORD_WEBHOOK_URL'
    );
    if (!url) return;

    var payload = {
      embeds: [
        {
          title: 'Nova candidatura — Player Fundador #' + position,
          color: 14247151, // magenta
          fields: [
            { name: 'Nome', value: fullName, inline: true },
            { name: 'Nick', value: username, inline: true },
            { name: 'Discord', value: discord, inline: true },
            { name: 'E-mail', value: email, inline: false },
            { name: 'Status', value: status, inline: true },
          ],
        },
      ],
    };

    UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
  } catch (err) {
    // Nunca deixa a notificação derrubar o cadastro.
    console.error('notifyDiscord falhou: ' + err);
  }
}

// ===========================================================================
// UTILITÁRIOS
// ===========================================================================

function isAuthorized(secret) {
  var expected = PropertiesService.getScriptProperties().getProperty(
    'WAITLIST_SHARED_SECRET'
  );
  return Boolean(expected) && String(secret) === String(expected);
}

function trimStr(v) {
  return v === null || v === undefined ? '' : String(v).trim();
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ===========================================================================
// SETUP — rode uma vez pelo editor do Apps Script
// ===========================================================================

/**
 * Cria a aba com cabeçalhos e gera um segredo aleatório.
 * Após rodar, copie o segredo do log para WAITLIST_SHARED_SECRET no .env.local.
 */
function setup() {
  getSheet();

  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('WAITLIST_SHARED_SECRET');

  if (!secret) {
    secret = Utilities.getUuid().replace(/-/g, '');
    props.setProperty('WAITLIST_SHARED_SECRET', secret);
  }

  console.log('Planilha pronta. Aba: ' + SHEET_NAME);
  console.log('WAITLIST_SHARED_SECRET=' + secret);
  console.log('Copie o valor acima para o .env.local do site.');
}
