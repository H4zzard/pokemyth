import { fail, ok, delay, type ServiceResult } from "./types";
import { mockAccount } from "@/lib/data/account";
import type { PaymentMethod } from "@/lib/config/payments";

/**
 * Camada de pagamento usada pela UI (roda no navegador).
 *
 * O contrato do gateway vive em `lib/payments/` e as rotas em
 * `app/api/payments/*`. Aqui só falamos com as nossas próprias rotas.
 *
 * IMPORTANTE: nenhuma função simula um pagamento aprovado — enquanto o gateway
 * não estiver conectado, o retorno é sempre um erro controlado.
 */

export interface CheckoutOptions {
  configured: boolean;
  methods: PaymentMethod[];
  limits: { min: number; max: number };
  maxInstallments: number;
}

/** Métodos disponíveis — o checkout consulta antes de exibir as opções. */
export async function getCheckoutOptions(): Promise<ServiceResult<CheckoutOptions>> {
  try {
    const res = await fetch("/api/payments/checkout", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return fail();
    return ok({
      configured: Boolean(data.configured),
      methods: (data.methods ?? []) as PaymentMethod[],
      limits: data.limits,
      maxInstallments: data.maxInstallments,
    });
  } catch {
    return fail();
  }
}

export interface CreatePaymentInput {
  listingId: string;
  method: PaymentMethod;
  installments?: number;
  /** Token do cartão gerado pelo SDK do gateway no navegador. */
  cardToken?: string;
  buyer: { name: string; email: string; taxId?: string };
}

/**
 * Cria a cobrança no gateway.
 * Retorna erro controlado até `PAYMENT_PROVIDER` estar configurado e a ordem do
 * Market ser persistida (ver TODOs em app/api/payments/checkout/route.ts).
 */
export async function createPaymentIntent(
  input: CreatePaymentInput
): Promise<ServiceResult<{ chargeId: string; pixCopyPaste?: string }>> {
  try {
    const res = await fetch("/api/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      return fail({
        code: "SERVICE_UNAVAILABLE",
        message:
          data?.message ?? "Pagamentos ainda não disponíveis. Tente mais tarde.",
      });
    }

    return ok({
      chargeId: data.charge.id,
      pixCopyPaste: data.charge.pixCopyPaste,
    });
  } catch {
    return fail();
  }
}

export async function getPaymentStatus(
  _chargeId: string
): Promise<ServiceResult<never>> {
  await delay();
  // TODO: criar GET /api/payments/charge/[id] ao ligar o gateway (polling do PIX).
  return fail();
}

export async function cancelPayment(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: POST /api/payments/charge/[id]/cancel
  return fail();
}

export async function requestSellerPayout(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: repasse ao vendedor após a janela de `payoutHoldDays`.
  return fail();
}

export async function getSellerBalance(): Promise<
  ServiceResult<{ available: number; pending: number }>
> {
  await delay(200);
  // Leitura mockada — apenas exibição.
  return ok({
    available: mockAccount.availableBalance,
    pending: mockAccount.pendingBalance,
  });
}
