import { getProviderCredentials } from "@/lib/config/payments";
import {
  PaymentNotConfiguredError,
  type Charge,
  type CreateChargeInput,
  type PayoutInput,
  type Payout,
  type PaymentProvider,
  type WebhookEvent,
} from "../types";

/**
 * Mercado Pago — esqueleto pronto para implementação.
 *
 * Recomendado para o mercado brasileiro: PIX + cartão + split nativo.
 *
 * PARA IMPLEMENTAR:
 *   1. npm i mercadopago
 *   2. Preencher no .env.local:
 *        PAYMENT_PROVIDER=mercadopago
 *        PAYMENT_PROVIDER_KEY=APP_USR-...        (Access Token)
 *        NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=APP_USR- (Public Key, p/ tokenizar cartão)
 *        PAYMENT_WEBHOOK_SECRET=...              (Assinatura secreta do webhook)
 *   3. Substituir cada `throw new PaymentNotConfiguredError` pela chamada real.
 *   4. Ligar `enabled: true` nos métodos em lib/config/payments.ts.
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/landing
 *
 * IMPORTANTE: enquanto os métodos lançarem, nada no site simula um pagamento
 * aprovado. Não substitua os throws por respostas fake.
 */
export const mercadoPagoProvider: PaymentProvider = {
  id: "mercadopago",
  supportedMethods: ["pix", "card"],

  async createCharge(_input: CreateChargeInput): Promise<Charge> {
    assertConfigured();
    // TODO: POST /v1/payments
    //   PIX  → payment_method_id: "pix", devolve point_of_interaction.transaction_data
    //          (qr_code = copia e cola, qr_code_base64 = imagem)
    //   Card → token: input.cardToken, installments: input.installments
    //   Split → application_fee: input.platformFeeInCents / 100
    //   Idempotência: header "X-Idempotency-Key": input.orderId
    throw new PaymentNotConfiguredError(
      "createCharge do Mercado Pago ainda não implementado."
    );
  },

  async getCharge(_chargeId: string): Promise<Charge> {
    assertConfigured();
    // TODO: GET /v1/payments/{id} e mapear status:
    //   approved → "paid" | pending/in_process → "pending" | rejected → "failed"
    //   refunded → "refunded" | cancelled → "canceled"
    throw new PaymentNotConfiguredError(
      "getCharge do Mercado Pago ainda não implementado."
    );
  },

  async cancelCharge(_chargeId: string): Promise<Charge> {
    assertConfigured();
    // TODO: PUT /v1/payments/{id} { status: "cancelled" }
    throw new PaymentNotConfiguredError("cancelCharge não implementado.");
  },

  async refundCharge(_chargeId: string, _amountInCents?: number): Promise<Charge> {
    assertConfigured();
    // TODO: POST /v1/payments/{id}/refunds
    throw new PaymentNotConfiguredError("refundCharge não implementado.");
  },

  async createPayout(_input: PayoutInput): Promise<Payout> {
    assertConfigured();
    // TODO: repasse ao vendedor. Duas rotas possíveis:
    //   a) split no momento da cobrança (marketplace) — preferível
    //   b) transferência PIX avulsa após a janela antifraude
    throw new PaymentNotConfiguredError("createPayout não implementado.");
  },

  async parseWebhook(_rawBody: string, _headers: Headers): Promise<WebhookEvent> {
    assertConfigured();
    // TODO: validar o header "x-signature" (HMAC-SHA256 de
    //   `id:{data.id};request-id:{x-request-id};ts:{ts};`) com PAYMENT_WEBHOOK_SECRET.
    //   LANÇAR se não bater — nunca confiar no corpo sem validar.
    throw new PaymentNotConfiguredError("parseWebhook não implementado.");
  },
};

function assertConfigured() {
  const { accessToken } = getProviderCredentials();
  if (!accessToken) {
    throw new PaymentNotConfiguredError(
      "PAYMENT_PROVIDER_KEY não definido para o Mercado Pago."
    );
  }
}
