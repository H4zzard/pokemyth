import type { PaymentMethod, PaymentProviderId } from "@/lib/config/payments";

/**
 * Contrato que qualquer gateway (Mercado Pago, Stripe, Asaas, …) deve cumprir.
 *
 * O resto do app fala **apenas** com esta interface — trocar de gateway não
 * deve exigir mudança em nenhum componente de UI.
 */

export type ChargeStatus =
  | "pending" // criada, aguardando pagamento
  | "processing" // em análise / autorizada
  | "paid" // confirmada
  | "failed" // recusada
  | "refunded"
  | "canceled"
  | "expired";

export interface CreateChargeInput {
  /** ID da ordem do Market (idempotência do lado do gateway). */
  orderId: string;
  method: PaymentMethod;
  /** Valor total cobrado do comprador, em centavos. */
  amountInCents: number;
  description: string;
  buyer: {
    id?: string;
    name: string;
    email: string;
    /** CPF — obrigatório para PIX na maioria dos PSPs brasileiros. */
    taxId?: string;
  };
  /** Split/repasse: para onde vai o líquido do vendedor. */
  seller?: {
    id: string;
    /** ID da conta do vendedor no gateway (split payment). */
    recipientId?: string;
  };
  /** Comissão retida pela plataforma, em centavos. */
  platformFeeInCents: number;
  /** Cartão: número de parcelas. */
  installments?: number;
  /** Token do cartão gerado no client (nunca envie PAN ao servidor). */
  cardToken?: string;
  /** Metadados livres, repassados ao webhook. */
  metadata?: Record<string, string>;
}

export interface Charge {
  id: string;
  provider: PaymentProviderId;
  orderId: string;
  method: PaymentMethod;
  status: ChargeStatus;
  amountInCents: number;
  /** PIX: payload copia-e-cola. */
  pixCopyPaste?: string;
  /** PIX: QR Code em base64 (data URI). */
  pixQrCodeBase64?: string;
  /** PIX: expiração ISO 8601. */
  expiresAt?: string;
  /** Cartão: URL de 3DS/redirect, quando exigido. */
  redirectUrl?: string;
  createdAt: string;
}

export interface PayoutInput {
  sellerId: string;
  amountInCents: number;
  /** Chave PIX do vendedor. */
  pixKey: string;
  reference: string;
}

export interface Payout {
  id: string;
  status: "requested" | "processing" | "paid" | "failed";
  amountInCents: number;
}

/** Evento normalizado vindo do webhook do gateway. */
export interface WebhookEvent {
  id: string;
  type: "charge.updated" | "charge.paid" | "charge.failed" | "payout.updated" | "unknown";
  chargeId?: string;
  orderId?: string;
  status?: ChargeStatus;
  raw: unknown;
}

export interface PaymentProvider {
  readonly id: PaymentProviderId;
  readonly supportedMethods: PaymentMethod[];

  /** Cria a cobrança (PIX ou cartão). */
  createCharge(input: CreateChargeInput): Promise<Charge>;

  /** Consulta o status atual — usado no polling da tela de pagamento. */
  getCharge(chargeId: string): Promise<Charge>;

  cancelCharge(chargeId: string): Promise<Charge>;

  refundCharge(chargeId: string, amountInCents?: number): Promise<Charge>;

  /** Repasse ao vendedor após a janela de segurança. */
  createPayout(input: PayoutInput): Promise<Payout>;

  /**
   * Valida a assinatura do webhook e normaliza o evento.
   * DEVE lançar se a assinatura for inválida — nunca confie no corpo cru.
   */
  parseWebhook(rawBody: string, headers: Headers): Promise<WebhookEvent>;
}

export class PaymentNotConfiguredError extends Error {
  code = "PAYMENTS_NOT_CONFIGURED" as const;
  constructor(detail = "Nenhum gateway de pagamento conectado.") {
    super(detail);
    this.name = "PaymentNotConfiguredError";
  }
}

export class PaymentProviderError extends Error {
  code = "PAYMENT_PROVIDER_ERROR" as const;
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "PaymentProviderError";
  }
}
