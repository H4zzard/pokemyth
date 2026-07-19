import { fail, ok, delay, type ServiceResult } from "./types";
import { mockAccount } from "@/lib/data/account";

// TODO: conectar ao gateway de pagamento (com webhooks para confirmar status).
// IMPORTANTE: nenhuma função simula um pagamento concluído com sucesso.

export async function createPaymentIntent(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: criar intenção de pagamento no gateway.
  return fail();
}

export async function getPaymentStatus(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: consultar status real do pagamento.
  return fail();
}

export async function cancelPayment(): Promise<ServiceResult<never>> {
  await delay();
  return fail();
}

export async function requestSellerPayout(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: solicitar repasse ao vendedor após confirmação e liberação.
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
