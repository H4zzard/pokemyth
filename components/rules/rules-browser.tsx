"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShieldAlert, LifeBuoy } from "lucide-react";
import type { RuleCategory, RuleSeverity } from "@/lib/types";
import { ruleSeverityMeta } from "@/lib/data/rules";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/states";
import { cn } from "@/lib/utils";

const severityStyles: Record<RuleSeverity, string> = {
  leve: "border-sky-500/40 text-sky-300 bg-sky-500/10",
  moderada: "border-gold/40 text-gold bg-gold/10",
  grave: "border-orange-500/40 text-orange-300 bg-orange-500/10",
  critica: "border-destructive/50 text-rose-300 bg-destructive/10",
};

export function RulesBrowser({ categories }: { categories: RuleCategory[] }) {
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState(categories[0]?.id);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        rules: cat.rules.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.rules.length > 0 || cat.title.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      {/* Sumário sticky */}
      <aside className="hidden lg:block">
        <nav className="sticky top-24" aria-label="Sumário das regras">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Categorias
          </p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "block border-l-2 px-3 py-1.5 text-sm transition-colors",
                    activeId === cat.id
                      ? "border-magenta bg-magenta/10 text-ink"
                      : "border-transparent text-muted hover:border-magenta/40 hover:text-ink"
                  )}
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/support" className="mt-6 block">
            <Button variant="outline" size="sm" className="w-full">
              <LifeBuoy className="h-4 w-4" /> Reportar / Suporte
            </Button>
          </Link>
        </nav>
      </aside>

      <div>
        {/* Busca */}
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nas regras…"
            className="pl-10"
            aria-label="Buscar nas regras"
          />
        </div>

        {/* Aviso importante */}
        <div className="mb-8 flex items-start gap-3 border border-gold/30 bg-gold/5 p-4 clip-chamfer-sm">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm text-muted">
            Estas regras podem ser atualizadas. Em caso de dúvida, consulte o
            suporte oficial. Jogar em PMO implica concordar com estas diretrizes.
          </p>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="Nenhuma regra encontrada"
            description="Tente outro termo de busca."
          />
        ) : (
          <div className="space-y-10">
            {filtered.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-28">
                <h2 className="heading-display text-2xl">{cat.title}</h2>
                {cat.intro && (
                  <p className="mt-2 text-sm text-muted">{cat.intro}</p>
                )}
                <ul className="mt-5 space-y-3">
                  {cat.rules.map((rule) => (
                    <li key={rule.id} className="panel p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-base font-semibold text-ink">
                          {rule.title}
                        </h3>
                        {rule.severity && (
                          <span
                            className={cn(
                              "border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider clip-chamfer-sm",
                              severityStyles[rule.severity]
                            )}
                          >
                            {ruleSeverityMeta[rule.severity].label}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-muted">{rule.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
