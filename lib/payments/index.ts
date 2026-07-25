import { getActiveProviderId } from "@/lib/config/payments";
import { PaymentNotConfiguredError, type PaymentProvider } from "./types";
import { mercadoPagoProvider } from "./providers/mercadopago";
import { stripeProvider } from "./providers/stripe";

export * from "./types";
export * from "./fees";

/**
 * Ponto único de acesso ao gateway.
 *
 * Todo o app deve usar `getPaymentProvider()` — nunca importar um provedor
 * concreto. Assim, trocar de gateway é uma variável de ambiente.
 */
export function getPaymentProvider(): PaymentProvider {
  const id = getActiveProviderId();

  switch (id) {
    case "mercadopago":
      return mercadoPagoProvider;
    case "stripe":
      return stripeProvider;
    case "asaas":
      // TODO: criar lib/payments/providers/asaas.ts seguindo o mesmo contrato.
      throw new PaymentNotConfiguredError(
        "Provedor Asaas ainda não implementado."
      );
    default:
      throw new PaymentNotConfiguredError(
        "Defina PAYMENT_PROVIDER (mercadopago | stripe | asaas) no ambiente."
      );
  }
}

/** Versão que não lança — útil para telas que só querem saber se dá para pagar. */
export function tryGetPaymentProvider(): PaymentProvider | null {
  try {
    return getPaymentProvider();
  } catch {
    return null;
  }
}
