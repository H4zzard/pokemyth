import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PokepediaSearch } from "@/components/pokepedia/pokepedia-search";
import { pokepediaEntries } from "@/lib/data/pokepedia";

export const metadata: Metadata = {
  title: "Pokepedia",
  description:
    "Enciclopédia do PokeMyth Online: criaturas, itens, regiões, quests, bosses, NPCs e sistemas do jogo.",
};

export default function PokepediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pokepedia"
        title="Enciclopédia do mundo"
        description="Consulte criaturas, itens, regiões, quests, bosses, NPCs e sistemas do mundo de PMO."
      />
      <section className="section pt-12">
        <div className="container">
          {/* TODO: substituir por dados oficiais da Pokepedia (API/CMS) */}
          <PokepediaSearch entries={pokepediaEntries} />
        </div>
      </section>
    </>
  );
}
