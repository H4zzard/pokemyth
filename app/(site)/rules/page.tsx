import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { RulesBrowser } from "@/components/rules/rules-browser";
import { ruleCategories, rulesLastUpdated } from "@/lib/data/rules";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Regras",
  description:
    "Regras e diretrizes do PokeMyth Online: conduta, contas, comércio, Market RMT, segurança e mais.",
};

export default function RulesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Regras"
        title="Regras do PokeMyth Online"
        description="Diretrizes para uma comunidade justa, segura e divertida. Consulte por categoria ou busque um tema específico."
      >
        <p className="text-xs text-muted">
          Última atualização: {formatDate(rulesLastUpdated)}
        </p>
      </PageHeader>
      <section className="section pt-12">
        <div className="container">
          {/* TODO(equipe): revisar todo o conteúdo das regras em lib/data/rules.ts */}
          <RulesBrowser categories={ruleCategories} />
        </div>
      </section>
    </>
  );
}
