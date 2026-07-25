import type { WaitlistInput } from "@/lib/schemas";
import { fail, ok, type ServiceResult } from "./types";

/**
 * Waitlist de fundadores — este serviço fala com a nossa própria rota
 * (`/api/waitlist`), que por sua vez grava na planilha via Apps Script.
 * Diferente dos demais services, este NÃO é um placeholder: o fluxo é real
 * assim que as variáveis de ambiente estiverem preenchidas.
 */

export interface WaitlistSuccess {
  /** Posição na planilha (1..N), quando o script informa. */
  position: number | null;
  spotsLeft: number | null;
  redirectUrl: string;
}

export async function submitWaitlist(
  input: WaitlistInput
): Promise<ServiceResult<WaitlistSuccess>> {
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      return fail({
        code: res.status === 400 ? "INVALID_INPUT" : "SERVICE_UNAVAILABLE",
        message:
          data?.message ??
          "Não foi possível registrar sua inscrição. Tente novamente.",
      });
    }

    return ok({
      position: data.position ?? null,
      spotsLeft: data.spotsLeft ?? null,
      redirectUrl: data.redirectUrl as string,
    });
  } catch {
    return fail({
      code: "SERVICE_UNAVAILABLE",
      message: "Sem conexão com o servidor. Verifique sua internet e tente de novo.",
    });
  }
}

export interface WaitlistStatus {
  configured: boolean;
  totalSpots: number;
  spotsLeft: number | null;
}

export async function getWaitlistStatus(): Promise<ServiceResult<WaitlistStatus>> {
  try {
    const res = await fetch("/api/waitlist", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return fail();
    return ok({
      configured: Boolean(data.configured),
      totalSpots: Number(data.totalSpots),
      spotsLeft: data.spotsLeft ?? null,
    });
  } catch {
    return fail();
  }
}
