import type { MarketListing, MarketTransaction } from "@/lib/types";
import type { SellListingInput } from "@/lib/schemas";
import { marketListings } from "@/lib/data/market-items";
import { transactions } from "@/lib/data/transactions";
import { fail, ok, delay, type ServiceResult } from "./types";

// TODO: conectar à API/DB do Market.

export async function getMarketListings(): Promise<ServiceResult<MarketListing[]>> {
  await delay(300);
  return ok(marketListings);
}

export async function getMarketListing(
  id: string
): Promise<ServiceResult<MarketListing>> {
  await delay(200);
  const listing = marketListings.find((l) => l.id === id);
  if (!listing) {
    return fail({ code: "NOT_FOUND", message: "Anúncio não encontrado." });
  }
  return ok(listing);
}

export async function createMarketListing(
  _input: SellListingInput
): Promise<ServiceResult<{ listingId: string }>> {
  await delay();
  // TODO: validar item no servidor + persistir. Não confirma publicação real.
  return fail();
}

export async function updateMarketListing(): Promise<ServiceResult<never>> {
  await delay();
  return fail();
}

export async function cancelMarketListing(): Promise<ServiceResult<never>> {
  await delay();
  return fail();
}

export async function createMarketOrder(
  _listingId: string
): Promise<ServiceResult<never>> {
  await delay();
  // TODO: cria a ordem e inicia o fluxo de pagamento protegido. Não conclui compra real.
  return fail();
}

export async function getMarketTransactions(): Promise<
  ServiceResult<MarketTransaction[]>
> {
  await delay(300);
  return ok(transactions);
}
