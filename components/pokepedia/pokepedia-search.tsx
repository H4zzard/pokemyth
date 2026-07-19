"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { PokepediaCategory, PokepediaEntry } from "@/lib/types";
import { pokepediaCategoryLabels } from "@/lib/data/pokepedia";
import { Input } from "@/components/ui/input";
import { PokepediaCard } from "./pokepedia-card";
import { EmptyState } from "@/components/shared/states";
import { cn } from "@/lib/utils";

const allCategories = Object.keys(
  pokepediaCategoryLabels
) as PokepediaCategory[];

export function PokepediaSearch({
  entries,
  categories = allCategories,
  compact = false,
}: {
  entries: PokepediaEntry[];
  categories?: PokepediaCategory[];
  /** compact: usado na prévia da home (limita resultados). */
  compact?: boolean;
}) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<PokepediaCategory | "todos">(
    "todos"
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = entries;
    if (active !== "todos") list = list.filter((e) => e.category === active);
    if (q)
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          (e.type ?? "").toLowerCase().includes(q) ||
          (e.region ?? "").toLowerCase().includes(q)
      );
    return compact ? list.slice(0, 4) : list;
  }, [entries, query, active, compact]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar criaturas, itens, regiões, quests…"
          className="pl-10"
          aria-label="Buscar na Pokepedia"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Categorias">
        <CategoryChip
          label="Todos"
          active={active === "todos"}
          onClick={() => setActive("todos")}
        />
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={pokepediaCategoryLabels[cat]}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={Search}
          title="Nenhum resultado"
          description="Tente outra busca ou categoria."
        />
      ) : (
        <div
          className={cn(
            "mt-6 grid gap-4",
            compact
              ? "grid-cols-2 lg:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {filtered.map((entry) => (
            <PokepediaCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors clip-chamfer-sm",
        active
          ? "border-magenta bg-magenta/15 text-ink"
          : "border-border text-muted hover:border-magenta/40 hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}
