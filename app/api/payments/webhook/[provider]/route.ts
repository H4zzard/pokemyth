import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";
import { PaymentNotConfiguredError } from "@/lib/payments/types";
import { getActiveProviderId } from "@/lib/config/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receptor de webhooks do gateway.
 *
 * URL a cadastrar no painel do provedor:
 *   https://SEU_DOMINIO/api/payments/webhook/mercadopago
 *   https://SEU_DOMINIO/api/payments/webhook/stripe
 *
 * REGRAS QUE NÃO PODEM SER QUEBRADAS:
 *   1. O corpo é lido como TEXTO CRU (`request.text()`), nunca `request.json()`
 *      antes da validação — a assinatura é calculada sobre os bytes originais.
 *   2. `provider.parseWebhook` DEVE lançar se a assinatura não bater. É o único
 *      ponto que separa uma confirmação real de alguém chamando esta URL à mão.
 *   3. Responda 200 rápido. Processamento pesado vai para fila/job.
 *   4. Trate reentrega: o mesmo evento pode chegar várias vezes (idempotência
 *      por `event.id`).
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: providerParam } = await params;

  if (providerParam !== getActiveProviderId()) {
    return NextResponse.json(
      { ok: false, error: "UNKNOWN_PROVIDER" },
      { status: 404 }
    );
  }

  // 1. Corpo cru — obrigatório para validar a assinatura.
  const rawBody = await request.text();

  try {
    const provider = getPaymentProvider();

    // 2. Valida assinatura e normaliza. Lança se for inválida.
    const event = await provider.parseWebhook(rawBody, request.headers);

    // 3. TODO: aplicar o efeito do evento, de forma idempotente.
    //    if (await alreadyProcessed(event.id)) return NextResponse.json({ ok: true });
    //
    //    switch (event.type) {
    //      case "charge.paid":
    //        await markOrderPaid(event.orderId);
    //        await enqueueItemDelivery(event.orderId);   // entrega no servidor do jogo
    //        await scheduleSellerPayout(event.orderId);  // após payoutHoldDays
    //        break;
    //      case "charge.failed":
    //        await markOrderFailed(event.orderId);
    //        break;
    //      case "charge.updated":
    //        await syncOrderStatus(event.orderId, event.status);
    //        break;
    //    }
    //    await recordProcessed(event.id);

    console.info("[payments] webhook recebido:", event.type, event.id);

    return NextResponse.json({ ok: true, received: event.type });
  } catch (err) {
    if (err instanceof PaymentNotConfiguredError) {
      // Gateway ainda não conectado: responde 503 para o provedor tentar de novo.
      return NextResponse.json(
        { ok: false, error: "PAYMENTS_NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    // Assinatura inválida ou corpo malformado — não reentregar.
    console.error("[payments] webhook rejeitado:", err);
    return NextResponse.json(
      { ok: false, error: "INVALID_SIGNATURE" },
      { status: 400 }
    );
  }
}
