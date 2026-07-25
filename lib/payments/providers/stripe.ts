import { getProviderCredentials } from "@/lib/config/payments";
import {
  PaymentNotConfiguredError,
  type Charge,
  type CreateChargeInput,
  type Payout,
  type PayoutInput,
  type PaymentProvider,
  type WebhookEvent,
} from "../types";

/**
 * Stripe — esqueleto pronto para implementação.
 *
 * Alternativa para cartão (inclusive internacional) e repasses via Connect.
 * Atenção: PIX no Stripe exige habilitação específica na conta BR — se o PIX
 * for o método principal, prefira o Mercado Pago ou Asaas.
 *
 * PARA IMPLEMENTAR:
 *   1. npm i stripe
 *   2. Preencher no .env.local:
 *        PAYMENT_PROVIDER=stripe
 *        PAYMENT_PROVIDER_KEY=sk_live_...
 *        NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=pk_live_...
 *        PAYMENT_WEBHOOK_SECRET=whsec_...
 *   3. Substituir os throws pelas chamadas reais.
 *
 * Docs: https://docs.stripe.com/payments/payment-intents
 */
export const stripeProvider: PaymentProvider = {
  id: "stripe",
  supportedMethods: ["card", "pix"],

  async createCharge(_input: CreateChargeInput): Promise<Charge> {
    assertConfigured();
    // TODO: stripe.paymentIntents.create({
    //   amount: input.amountInCents,
    //   currency: "brl",
    //   payment_method_types: input.method === "pix" ? ["pix"] : ["card"],
    //   application_fee_amount: input.platformFeeInCents,   // Connect
    //   transfer_data: { destination: input.seller?.recipientId },
    // }, { idempotencyKey: input.orderId })
    throw new PaymentNotConfiguredError(
      "createCharge do Stripe ainda não implementado."
    );
  },

  async getCharge(_chargeId: string): Promise<Charge> {
    assertConfigured();
    // TODO: stripe.paymentIntents.retrieve(id) e mapear:
    //   succeeded → "paid" | processing → "processing"
    //   requires_payment_method → "pending" | canceled → "canceled"
    throw new PaymentNotConfiguredError("getCharge do Stripe não implementado.");
  },

  async cancelCharge(_chargeId: string): Promise<Charge> {
    assertConfigured();
    // TODO: stripe.paymentIntents.cancel(id)
    throw new PaymentNotConfiguredError("cancelCharge não implementado.");
  },

  async refundCharge(_chargeId: string, _amountInCents?: number): Promise<Charge> {
    assertConfigured();
    // TODO: stripe.refunds.create({ payment_intent: id, amount })
    throw new PaymentNotConfiguredError("refundCharge não implementado.");
  },

  async createPayout(_input: PayoutInput): Promise<Payout> {
    assertConfigured();
    // TODO: stripe.transfers.create(...) via Connect
    throw new PaymentNotConfiguredError("createPayout não implementado.");
  },

  async parseWebhook(_rawBody: string, _headers: Headers): Promise<WebhookEvent> {
    assertConfigured();
    // TODO: stripe.webhooks.constructEvent(rawBody, headers.get("stripe-signature"), whsec)
    //   O corpo precisa ser o texto CRU — não use request.json() antes de validar.
    throw new PaymentNotConfiguredError("parseWebhook não implementado.");
  },
};

function assertConfigured() {
  const { accessToken } = getProviderCredentials();
  if (!accessToken) {
    throw new PaymentNotConfiguredError(
      "PAYMENT_PROVIDER_KEY não definido para o Stripe."
    );
  }
}
