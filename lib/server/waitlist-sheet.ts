import {
  getWaitlistEndpoint,
  isWaitlistConfigured,
  waitlistConfig,
} from "@/lib/config/waitlist";

/**
 * Cliente do Web App do Google Apps Script (ver `scripts/apps-script/waitlist.gs`).
 * Só roda no servidor: a URL e o segredo nunca são expostos ao navegador.
 */

export type ScriptResponse = {
  ok: boolean;
  error?: "FULL" | "DUPLICATE" | "UNAUTHORIZED" | "BAD_REQUEST" | string;
  position?: number;
  spotsLeft?: number;
  totalSpots?: number;
};

async function callAppsScript(
  payload: Record<string, unknown>
): Promise<ScriptResponse> {
  const { url, secret } = getWaitlistEndpoint();

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret }),
    // Apps Script responde 302 para googleusercontent — precisa seguir.
    redirect: "follow",
    cache: "no-store",
  });

  const text = await res.text();
  try {
    return JSON.parse(text) as ScriptResponse;
  } catch {
    throw new Error(
      `Resposta inválida do Apps Script (HTTP ${res.status}): ${text.slice(0, 200)}`
    );
  }
}

export interface WaitlistStatus {
  configured: boolean;
  totalSpots: number;
  /** `null` quando a planilha ainda não está conectada ou está indisponível. */
  spotsLeft: number | null;
}

export async function getWaitlistStatus(): Promise<WaitlistStatus> {
  if (!isWaitlistConfigured()) {
    return {
      configured: false,
      totalSpots: waitlistConfig.totalSpots,
      spotsLeft: null,
    };
  }

  try {
    const data = await callAppsScript({ action: "status" });
    return {
      configured: true,
      totalSpots: data.totalSpots ?? waitlistConfig.totalSpots,
      spotsLeft: typeof data.spotsLeft === "number" ? data.spotsLeft : null,
    };
  } catch (err) {
    // Nunca derruba a página por causa do contador.
    console.error("[waitlist] status falhou:", err);
    return {
      configured: true,
      totalSpots: waitlistConfig.totalSpots,
      spotsLeft: null,
    };
  }
}

export interface WaitlistEntry {
  fullName: string;
  username: string;
  email: string;
  discord: string;
  source?: string;
  userAgent?: string;
}

export function registerWaitlistEntry(entry: WaitlistEntry) {
  return callAppsScript({ action: "signup", ...entry });
}
