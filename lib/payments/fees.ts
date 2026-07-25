import {
  FEE_PAYER,
  PLATFORM_FEE_FIXED,
  PLATFORM_FEE_RATE,
  gatewayCostEstimate,
  type PaymentMethod,
} from "@/lib/config/payments";

// Reexportados para quem só precisa exibir os percentuais na UI.
export { PLATFORM_FEE_RATE, PLATFORM_FEE_FIXED, FEE_PAYER } from "@/lib/config/payments";

/** Arredonda para centavos, evitando ruído de ponto flutuante. */
function money(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Converte BRL para centavos — formato exigido pelos gateways. */
export function toCents(value: number): number {
  return Math.round(value * 100);
}

export function fromCents(cents: number): number {
  return money(cents / 100);
}

/** Taxa da plataforma sobre um valor anunciado. */
export function calcPlatformFee(price: number): number {
  return money(price * PLATFORM_FEE_RATE + PLATFORM_FEE_FIXED);
}

/** Quanto o vendedor recebe. */
export function calcNetAmount(price: number): number {
  return FEE_PAYER === "seller" ? money(price - calcPlatformFee(price)) : money(price);
}

/** Quanto o comprador paga. */
export function calcBuyerTotal(price: number): number {
  return FEE_PAYER === "buyer" ? money(price + calcPlatformFee(price)) : money(price);
}

export interface FeeBreakdown {
  /** Preço anunciado. */
  price: number;
  /** Total cobrado do comprador. */
  buyerTotal: number;
  /** Taxa retida pela plataforma. */
  platformFee: number;
  /** Valor repassado ao vendedor. */
  sellerNet: number;
  /** Custo estimado do gateway (interno — não exibir ao usuário). */
  gatewayCostEstimated: number;
  /** Margem estimada da plataforma após o gateway (interno). */
  platformMarginEstimated: number;
}

/**
 * Quebra completa de uma transação do Market.
 * Use isto no checkout, no modal de venda e nos relatórios — assim os números
 * nunca divergem entre telas.
 */
export function calcFeeBreakdown(
  price: number,
  method: PaymentMethod = "pix"
): FeeBreakdown {
  const platformFee = calcPlatformFee(price);
  const buyerTotal = calcBuyerTotal(price);
  const sellerNet = calcNetAmount(price);

  const cost = gatewayCostEstimate[method];
  const gatewayCostEstimated = money(buyerTotal * cost.rate + cost.fixed);

  return {
    price: money(price),
    buyerTotal,
    platformFee,
    sellerNet,
    gatewayCostEstimated,
    platformMarginEstimated: money(platformFee - gatewayCostEstimated),
  };
}
