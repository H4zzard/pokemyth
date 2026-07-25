import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/schemas";
import { isWaitlistConfigured, waitlistConfig } from "@/lib/config/waitlist";
import { featureFlags } from "@/lib/config/features";
import {
  getWaitlistStatus,
  registerWaitlistEntry,
} from "@/lib/server/waitlist-sheet";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ponte entre o formulário e o Web App do Google Apps Script.
 *
 * A URL do script e o segredo compartilhado nunca chegam ao navegador: o
 * browser fala apenas com esta rota, que assina a chamada no servidor.
 */

/** Vagas restantes — usado para atualizar o contador sem recarregar a página. */
export async function GET() {
  if (!featureFlags.waitlistEnabled) {
    return NextResponse.json({ ok: false, error: "DISABLED" }, { status: 404 });
  }
  const status = await getWaitlistStatus();
  return NextResponse.json({ ok: true, ...status });
}

export async function POST(request: Request) {
  if (!featureFlags.waitlistEnabled) {
    return NextResponse.json({ ok: false, error: "DISABLED" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_INPUT", message: "Corpo inválido." },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        message: "Confira os dados do formulário.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (!isWaitlistConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "NOT_CONFIGURED",
        message:
          "A planilha de inscrições ainda não foi conectada. Defina WAITLIST_SHEETS_URL e WAITLIST_SHARED_SECRET.",
      },
      { status: 503 }
    );
  }

  const { fullName, username, email, discord } = parsed.data;

  try {
    const data = await registerWaitlistEntry({
      fullName,
      username,
      email,
      discord,
      // Metadados úteis para triagem — sem cookies nem fingerprinting.
      source: request.headers.get("referer") ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
    });

    if (!data.ok) {
      const map: Record<string, { status: number; message: string }> = {
        FULL: {
          status: 409,
          message: `As ${waitlistConfig.totalSpots} vagas de fundador já foram preenchidas. Entre no Discord para acompanhar as próximas ondas.`,
        },
        DUPLICATE: {
          status: 409,
          message:
            "Este e-mail ou usuário já está inscrito. Confira seu Discord — falamos com os selecionados por lá.",
        },
        UNAUTHORIZED: {
          status: 500,
          message:
            "Falha de autenticação com a planilha. Verifique WAITLIST_SHARED_SECRET.",
        },
      };
      const mapped = map[data.error ?? ""] ?? {
        status: 502,
        message: "Não foi possível registrar sua inscrição. Tente novamente.",
      };
      return NextResponse.json(
        {
          ok: false,
          error: data.error ?? "UPSTREAM_ERROR",
          message: mapped.message,
        },
        { status: mapped.status }
      );
    }

    return NextResponse.json({
      ok: true,
      position: data.position ?? null,
      spotsLeft: data.spotsLeft ?? null,
      redirectUrl: waitlistConfig.redirectUrl,
    });
  } catch (err) {
    console.error("[waitlist] envio falhou:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "UPSTREAM_ERROR",
        message:
          "Não foi possível falar com a planilha de inscrições. Tente novamente em instantes.",
      },
      { status: 502 }
    );
  }
}
