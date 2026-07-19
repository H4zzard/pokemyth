import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { FeaturedUpdate } from "@/components/updates/featured-update";
import { UpdatesBrowser } from "@/components/updates/updates-browser";
import { updates, featuredUpdate } from "@/lib/data/updates";

export const metadata: Metadata = {
  title: "Atualizações",
  description:
    "Changelog do PokeMyth Online: novos conteúdos, eventos, balanceamentos e correções, com atualizações frequentes.",
};

export default function UpdatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Atualizações"
        title="Changelog do PMO"
        description="Acompanhe tudo o que muda no mundo de PokeMyth Online — conteúdos, eventos, balanceamentos, correções e sistemas."
      />
      <section className="section pt-12">
        <div className="container">
          <div className="mb-10">
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-magenta">
              Em destaque
            </h2>
            <div className="lg:max-w-3xl">
              <FeaturedUpdate update={featuredUpdate} />
            </div>
          </div>
          {/* TODO: substituir por updates-service.getUpdates() */}
          <UpdatesBrowser updates={updates} />
        </div>
      </section>
    </>
  );
}
