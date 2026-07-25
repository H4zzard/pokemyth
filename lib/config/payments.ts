/**
 * Configuração de pagamentos e taxas do Market (RMT).
 *
 * Este arquivo é a **fonte única** dos percentuais. Alterar aqui reflete no
 * site inteiro (cards do Market, checkout, modal de venda, painel do vendedor).
 */

export type PaymentMethod = "pix" | "card";
export type PaymentProviderId = "mercadopago" | "stripe" | "asaas" | "none";

/** Taxa da plataforma sobre o valor do anúncio (RMT). 0.08 = 8%. */
export const PLATFORM_FEE_RATE = 0.08;

/** Taxa fixa por transação, em BRL. Somada ao percentual. */
export const PLATFORM_FEE_FIXED = 0;

/**
 * Quem paga a taxa da plataforma.
 * - "seller": desconta do repasse do vendedor (comprador paga o preço anunciado)
 * - "buyer":  soma ao total do comprador (vendedor recebe o preço cheio)
 */
export const FEE_PAYER: "seller" | "buyer" = "seller";

/** Limites de valor por transação, em BRL. */
export const TRANSACTION_LIMITS = {
  min: 1,
  max: 100_000,
} as const;

/**
 * Métodos de pagamento.
 *
 * `enabled: false` até o gateway ser conectado — o checkout mostra o método
 * como "em breve" em vez de falhar no meio do fluxo.
 */
export const paymentMethods: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  enabled: boolean;
  /** Repasse ao vendedor liberado após N dias (janela antifraude/chargeback). */
  payoutHoldDays: number;
}> = [
  {
    id: "pix",
    label: "PIX",
    description: "Aprovação em segundos. QR Code ou copia e cola.",
    enabled: false, // TODO: ligar ao conectar o gateway
    payoutHoldDays: 2,
  },
  {
    id: "card",
    label: "Cartão de crédito",
    description: "Parcelamento disponível. Sujeito a análise antifraude.",
    enabled: false, // TODO: ligar ao conectar o gateway
    payoutHoldDays: 30,
  },
];

/** Parcelamento máximo no cartão. */
export const MAX_INSTALLMENTS = 12;

/**
 * Custo do gateway, apenas para *estimativa* de margem em relatórios internos.
 * NÃO é cobrado do usuário — o valor real vem do extrato do gateway.
 * TODO(financeiro): ajustar conforme o contrato assinado.
 */
export const gatewayCostEstimate: Record<PaymentMethod, { rate: number; fixed: number }> = {
  pix: { rate: 0.0099, fixed: 0 },
  card: { rate: 0.0399, fixed: 0.39 },
};

// ---------------------------------------------------------------------------
// Resolução do provedor (server-side)
// ---------------------------------------------------------------------------

/** Provedor ativo, definido por env. `none` = nenhum conectado ainda. */
export function getActiveProviderId(): PaymentProviderId {
  const raw = (process.env.PAYMENT_PROVIDER ?? "none").toLowerCase();
  if (raw === "mercadopago" || raw === "stripe" || raw === "asaas") return raw;
  return "none";
}

export function getProviderCredentials() {
  return {
    accessToken: process.env.PAYMENT_PROVIDER_KEY ?? "",
    publicKey: process.env.NEXT_PUBLIC_PAYMENT_PUBLIC_KEY ?? "",
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET ?? "",
  };
}

export function isPaymentsConfigured() {
  const { accessToken } = getProviderCredentials();
  return getActiveProviderId() !== "none" && Boolean(accessToken);
}

/** Métodos realmente disponíveis agora (flag local + gateway conectado). */
export function getEnabledMethods() {
  if (!isPaymentsConfigured()) return [];
  return paymentMethods.filter((m) => m.enabled).map((m) => m.id);
}
