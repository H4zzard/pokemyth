import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featureFlags } from "@/lib/config/features";
import { PageHeader } from "@/components/shared/page-header";
import { MarketBrowser } from "@/components/market/market-browser";
import { marketListings } from "@/lib/data/market-items";

export const metadata: Metadata = {
  title: "Market PMO",
  description:
    "Negocie produtos permitidos entre jogadores através de uma experiência integrada ao servidor PokeMyth Online.",
};

export default function MarketPage() {
  // Market desligado durante a waitlist de fundadores.
  if (!featureFlags.marketEnabled) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Market de jogadores"
        title="Market PMO"
        description="Negocie produtos permitidos entre jogadores através de uma experiência integrada ao servidor. Compra protegida, transferência automática após confirmação."
      />
      <section className="section pt-12">
        <div className="container">
          {/* TODO: substituir por getMarketListings() da API do Market */}
          <MarketBrowser listings={marketListings} />
        </div>
      </section>
    </>
  );
}
