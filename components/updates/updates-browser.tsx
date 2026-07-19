"use client";

import * as React from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import type { GameUpdate, UpdateCategory } from "@/lib/types";
import { updateCategoryLabels } from "@/lib/data/updates";
import { Input, Select, Label } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/badges";
import { EmptyState } from "@/components/shared/states";
import { formatDate, cn } from "@/lib/utils";

const categories = Object.keys(updateCategoryLabels) as UpdateCategory[];

const categoryTone: Record<
  UpdateCategory,
  "pending" | "progress" | "success" | "error" | "info"
> = {
  conteudo: "info",
  evento: "progress",
  balanceamento: "pending",
  correcao: "error",
  sistema: "info",
  market: "success",
};

export function UpdatesBrowser({ updates }: { updates: GameUpdate[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<UpdateCategory | "todas">("todas");
  const [version, setVersion] = React.useState("todas");

  const versions = React.useMemo(
    () => Array.from(new Set(updates.map((u) => u.version))),
    [updates]
  );

  const filtered = updates.filter((u) => {
    const q = query.trim().toLowerCase();
    if (category !== "todas" && u.category !== category) return false;
    if (version !== "todas" && u.version !== version) return false;
    if (q && !u.title.toLowerCase().includes(q) && !u.summary.toLowerCase().includes(q))
      return false;
    return true;
  });

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar atualizações…"
            className="pl-10"
            aria-label="Buscar atualizações"
          />
        </div>
        <div className="min-w-[150px]">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as UpdateCategory | "todas")}
            aria-label="Filtrar por categoria"
          >
            <option value="todas">Todas categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {updateCategoryLabels[c]}
              </option>
            ))}
          </Select>
        </div>
        <div className="min-w-[130px]">
          <Select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            aria-label="Filtrar por versão"
          >
            <option value="todas">Todas versões</option>
            {versions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={Search}
          title="Nenhuma atualização encontrada"
          description="Ajuste os filtros ou tente outra busca."
        />
      ) : (
        <div className="mt-8 space-y-4">
          {filtered.map((u) => (
            <UpdateAccordion key={u.id} update={u} />
          ))}
        </div>
      )}
      <p className="mt-8 text-center text-xs text-muted/70">
        {/* TODO: substituir por dados da API (updates-service.getUpdates()) */}
        Em média 2–3 atualizações por semana no PokeMyth Online.
      </p>
    </div>
  );
}

function UpdateAccordion({ update }: { update: GameUpdate }) {
  const [open, setOpen] = React.useState(update.featured ?? false);

  return (
    <article id={update.slug} className="panel scroll-mt-28 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        {update.image && (
          <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden border border-border clip-chamfer-sm sm:block">
            <Image src={update.image} alt="" fill sizes="112px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={categoryTone[update.category]} dot={false}>
              {updateCategoryLabels[update.category]}
            </StatusBadge>
            <span className="text-xs text-muted">{update.version}</span>
            <span className="text-xs text-muted">· {formatDate(update.date)}</span>
          </div>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
            {update.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted">{update.summary}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-border p-5">
          <p className="text-sm text-muted">{update.summary}</p>
          <div className="mt-4 space-y-4">
            {update.changes.map((group) => (
              <div key={group.title}>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-magenta">
                  {group.title}
                </h4>
                <ul className="space-y-1.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
