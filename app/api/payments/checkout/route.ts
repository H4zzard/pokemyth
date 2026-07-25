import { NextResponse } from "next/server";
import { z } from "zod";
import { getPaymentProvider } from "@/lib/payments";
import { PaymentNotConfiguredError } from "@/lib/payments/types";
import {
  MAX_INSTALLMENTS,
  TRANSACTION_LIMITS,
  getEnabledMethods,
  isPaymentsConfigured,
} from "@/lib/config/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Criação de cobrança do Market (PIX / cartão).
 *
 * Enquanto nenhum gateway estiver conectado, responde 503 com
 * `PAYMENTS_NOT_CONFIGURED` — nunca finge um pagamento aprovado.
 *
 * TODO ao conectar o gateway:
 *   1. Autenticar o comprador (sessão) em vez de confiar no corpo da requisição.
 *   2. Buscar o anúncio no banco e usar o **preço do banco**, nunca o enviado
 *      pelo cliente — caso contrário dá para comprar um item por R$ 1,00.
 *   3. Criar a ordem no banco com status "aguardando pagamento" ANTES de chamar
 *      o gateway, e usar o ID dela como chave de idempotência.
 *   4. Só então montar o `CreateChargeInput` (esboço no final do arquivo).
 */

const checkoutSchema = z.object({
  listingId: z.string().min(1),
  method: z.enum(["pix", "card"]),
  installments: z.coerce.number().int().min(1).max(MAX_INSTALLMENTS).optional(),
  /** Token gerado no navegador pelo SDK do gateway. Nunca receba o PAN aqui. */
  cardToken: z.string().optional(),
  buyer: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    taxId: z.string().optional(),
  }),
});

/** Métodos disponíveis — o checkout consulta antes de exibir as opções. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isPaymentsConfigured(),
    methods: getEnabledMethods(),
    limits: TRANSACTION_LIMITS,
    maxInstallments: MAX_INSTALLMENTS,
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_INPUT", message: "Corpo inválido." },
      { status: 400 }
    );
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "INVALID_INPUT",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    // Lança PaymentNotConfiguredError enquanto PAYMENT_PROVIDER não estiver definido.
    const provider = getPaymentProvider();

    // TODO: buscar o anúncio e criar a ordem antes de cobrar.
    return NextResponse.json(
      {
        ok: false,
        error: "NOT_IMPLEMENTED",
        message:
          "Gateway conectado, mas a ordem do Market ainda não é persistida. " +
          "Implemente a criação da ordem antes de liberar o checkout.",
        provider: provider.id,
        listingId: parsed.data.listingId,
      },
      { status: 501 }
    );
  } catch (err) {
    if (err instanceof PaymentNotConfiguredError) {
      return NextResponse.json(
        {
          ok: false,
          error: "PAYMENTS_NOT_CONFIGURED",
          message:
            "Nenhum gateway de pagamento conectado. Defina PAYMENT_PROVIDER e PAYMENT_PROVIDER_KEY.",
        },
        { status: 503 }
      );
    }

    console.error("[payments] checkout falhou:", err);
    return NextResponse.json(
      { ok: false, error: "PROVIDER_ERROR", message: "Falha ao criar a cobrança." },
      { status: 502 }
    );
  }
}

/* ---------------------------------------------------------------------------
 * Esboço do fluxo final — mova para dentro do try acima quando a ordem existir:
 *
 *   import { calcFeeBreakdown, toCents } from "@/lib/payments";
 *
 *   const listing = await getListingFromDb(parsed.data.listingId);
 *   if (!listing || listing.status !== "ativo") return notFound();
 *
 *   const fees = calcFeeBreakdown(listing.price, parsed.data.method);
 *   const order = await createOrder({ listing, buyerId, fees });
 *
 *   const charge = await provider.createCharge({
 *     orderId: order.id,
 *     method: parsed.data.method,
 *     amountInCents: toCents(fees.buyerTotal),
 *     platformFeeInCents: toCents(fees.platformFee),
 *     description: `PMO Market — ${listing.title}`,
 *     buyer: parsed.data.buyer,
 *     seller: { id: listing.seller.id, recipientId: listing.seller.recipientId },
 *     installments: parsed.data.installments,
 *     cardToken: parsed.data.cardToken,
 *     metadata: { listingId: listing.id, orderId: order.id },
 *   });
 *
 *   return NextResponse.json({ ok: true, charge, fees });
 * ------------------------------------------------------------------------- */
