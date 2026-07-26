# Waitlist → Google Sheets (Apps Script)

Como ligar o formulário de `/fundadores` a uma planilha do Google. Leva ~5 minutos.

## 1. Criar a planilha

1. Acesse [sheets.new](https://sheets.new) e nomeie, por exemplo, **PMO — Players Fundadores**.
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo do `Código.gs` e cole todo o conteúdo de [`waitlist.gs`](./waitlist.gs).
4. Salve (Ctrl+S).

## 2. Gerar o segredo

1. No editor do Apps Script, selecione a função **`setup`** na barra superior e clique em **Executar**.
2. Autorize o script quando o Google pedir (é a sua própria conta acessando a sua planilha).
3. Leia o segredo em **⚙ Configurações do projeto → Propriedades do script**.
   A linha `WAITLIST_SHARED_SECRET` mostra o valor.

Esse valor é o `WAITLIST_SHARED_SECRET` do site.

> **O Registro de execução não mostrou nada?** É comum — o painel nem sempre
> exibe `console.log`. Use a tela de Propriedades do script acima, ou rode a
> função **`mostrarSegredo`**, que devolve o valor como mensagem de erro
> (erros sempre aparecem no registro).

### Prefere definir o segredo você mesmo?

Funciona igual — o script só compara o valor recebido com o armazenado:

1. **⚙ Configurações do projeto → Propriedades do script → Adicionar propriedade**
2. Nome: `WAITLIST_SHARED_SECRET`
3. Valor: uma string longa e aleatória (ex.: `pmo_9f3k2p8x7m1q4w6z5v0n`)
4. Use o mesmo valor no `.env.local`

## 3. Publicar como Web App

1. Botão **Implantar → Nova implantação**.
2. Em **Tipo**, escolha **App da Web**.
3. Configure:
   - **Executar como:** `Eu` (sua conta)
   - **Quem pode acessar:** `Qualquer pessoa`
4. Clique em **Implantar** e copie a **URL do app da Web**
   (`https://script.google.com/macros/s/AKfy.../exec`).

> "Qualquer pessoa" é necessário porque quem chama é o servidor do site, sem login
> Google. O acesso é protegido pelo segredo compartilhado — requisições sem ele
> recebem `UNAUTHORIZED`.

## 4. Configurar o site

No `.env.local` (e nas variáveis de ambiente da hospedagem):

```env
WAITLIST_SHEETS_URL=https://script.google.com/macros/s/AKfy.../exec
WAITLIST_SHARED_SECRET=3f9a1c...
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/cEDvqWQzXp
```

Reinicie o `npm run dev`. Pronto — o formulário passa a gravar na planilha.

## 5. (Opcional) Aviso no Discord a cada inscrição

1. No seu servidor: **Configurações do canal → Integrações → Webhooks → Novo webhook**. Copie a URL.
2. No Apps Script: **Configurações do projeto (⚙) → Propriedades do script → Adicionar propriedade**.
3. Nome: `DISCORD_WEBHOOK_URL` · Valor: a URL do webhook.

Cada candidatura vira uma mensagem no canal.

---

## Colunas da planilha

| Coluna | Conteúdo |
|---|---|
| Data/Hora | Preenchido pelo script |
| Nome | Nome do jogador |
| Nick desejado | Nome de usuário no jogo |
| E-mail | E-mail de contato |
| Discord | @ do Discord |
| Status | `Fundador` (dentro das 10) ou `Lista de espera` |
| Origem | Página de onde veio o envio |
| User Agent | Navegador usado |

## Comportamento das 10 vagas

`TOTAL_SPOTS = 10` no topo do `waitlist.gs`.

- As 10 primeiras candidaturas entram como **`Fundador`**.
- A partir da 11ª, entram como **`Lista de espera`** (`KEEP_OVERFLOW = true`) —
  continuam sendo gravadas, e o contador do site mostra 0 vagas restantes.
- Se preferir **recusar** os envios após a 10ª vaga, troque para
  `KEEP_OVERFLOW = false`. O site passa a exibir a tela "Vagas esgotadas".
- Marcar uma linha como `Recusado` na coluna Status **libera a vaga** de volta.

## Atualizando o script depois

Ao editar o `waitlist.gs`, é preciso **Implantar → Gerenciar implantações → ✏️ →
Versão: Nova versão → Implantar**. A URL não muda. Se você criar uma implantação
nova em vez de editar a existente, a URL muda e o `.env` precisa ser atualizado.

## Problemas comuns

### "Não foi possível abrir o arquivo" ao abrir Extensões → Apps Script

Conflito de múltiplas contas Google no mesmo navegador. A URL do erro mostra
`authuser=2` — o Google está tentando abrir com a conta errada.

1. **Janela anônima** (resolve quase sempre): faça login apenas com a conta dona
   da planilha, abra a planilha e vá em Extensões → Apps Script.
2. **Corrigir a URL**: troque `authuser=2` por `authuser=0` na barra de endereço.
3. **Deslogar de tudo** em `google.com/accounts` e entrar só com a conta dona.

### Script avulso (sem partir da planilha)

Se preferir criar o script em [script.new](https://script.new), ele não fica
vinculado a nenhuma planilha. Nesse caso, troque em `waitlist.gs`:

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
```

por

```js
var ss = SpreadsheetApp.openById('ID_DA_SUA_PLANILHA');
```

O ID é o trecho da URL da planilha entre `/d/` e `/edit`.

### Apps Script bloqueado no Google Workspace

Em contas de domínio corporativo, o administrador pode ter o serviço desativado.
Verifique no Admin Console: **Apps → Serviços adicionais do Google → Apps Script**.

## Testando

Com o site rodando, envie o formulário em `/fundadores`. Erros aparecem como toast
na tela e no terminal do `next dev` com o prefixo `[waitlist]`.

Para testar o script isoladamente, abra a URL do Web App no navegador — deve
responder `{"ok":true,"service":"pokemyth-waitlist","totalSpots":10}`.
