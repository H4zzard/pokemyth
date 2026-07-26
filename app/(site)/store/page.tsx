import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featureFlags } from "@/lib/config/features";
import { PageHeader } from "@/components/shared/page-header";
import { StoreBrowser } from "@/components/store/store-browser";
import { storeProducts } from "@/lib/data/store-products";

export const metadata: Metadata = {
  title: "Loja PMO",
  description:
    "Loja oficial do PokeMyth Online: passes premium, cosméticos, conveniências, serviços e pacotes.",
};

export default function StorePage() {
  // Loja desligada durante a waitlist de fundadores.
  if (!featureFlags.storeEnabled) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Loja oficial"
        title="Loja PMO"
        description="Produtos oficiais do servidor para melhorar sua experiência. Sem loot boxes — você sempre sabe o que está comprando."
      />
      <section className="section pt-12">
        <div className="container">
          {/* TODO: substituir por produtos da loja oficial (API/CMS) */}
          <StoreBrowser products={storeProducts} />
        </div>
      </section>
    </>
  );
}
