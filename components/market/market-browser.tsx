"use client";

import * as React from "react";
import { Search, SlidersHorizontal, Plus, X, Store } from "lucide-react";
import type {
  MarketCategory,
  MarketListing,
  Rarity,
} from "@/lib/types";
import {
  marketCategoryLabels,
  rarityLabels,
} from "@/lib/data/market-items";
import { Input, Select, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarketItemCard } from "./market-item-card";
import { MarketListingModal } from "./market-listing-modal";
import { MarketCheckoutModal } from "./market-checkout-modal";
import { MarketSellModal } from "./market-sell-modal";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/states";
import { cn } from "@/lib/utils";

const categories = Object.keys(marketCategoryLabels) as MarketCategory[];
const rarities = Object.keys(rarityLabels) as Rarity[];

type SortKey = "recentes" | "menor-preco" | "maior-preco" | "mais-vendidos";
const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "mais-vendidos", label: "Mais vendidos" },
];

const PAGE_SIZE = 6;

export function MarketBrowser({ listings }: { listings: MarketListing[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<MarketCategory | "todas">("todas");
  const [rarity, setRarity] = React.useState<Rarity | "todas">("todas");
  const [world, setWorld] = React.useState<string>("todos");
  const [sellerStatus, setSellerStatus] = React.useState<"todos" | "online" | "offline">("todos");
  const [sort, setSort] = React.useState<SortKey>("recentes");
  const [page, setPage] = React.useState(1);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [viewing, setViewing] = React.useState<MarketListing | null>(null);
  const [buying, setBuying] = React.useState<MarketListing | null>(null);
  const [selling, setSelling] = React.useState(false);

  const worlds = React.useMemo(
    () => Array.from(new Set(listings.map((l) => l.world))),
    [listings]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = listings.filter((l) => {
      if (category !== "todas" && l.category !== category) return false;
      if (rarity !== "todas" && l.rarity !== rarity) return false;
      if (world !== "todos" && l.world !== world) return false;
      if (sellerStatus === "online" && !l.seller.online) return false;
      if (sellerStatus === "offline" && l.seller.online) return false;
      if (q && !l.title.toLowerCase().includes(q) && !l.description.toLowerCase().includes(q))
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "menor-preco":
          return a.price - b.price;
        case "maior-preco":
          return b.price - a.price;
        case "mais-vendidos":
          return b.salesCount - a.salesCount;
        default:
          return +new Date(b.createdAt) - +new Date(a.createdAt);
      }
    });
    return list;
  }, [listings, query, category, rarity, world, sellerStatus, sort]);

  React.useEffect(() => setPage(1), [query, category, rarity, world, sellerStatus, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filtersContent = (
    <div className="space-y-5">
      <div>
        <Label>Raridade</Label>
        <Select value={rarity} onChange={(e) => setRarity(e.target.value as Rarity | "todas")}>
          <option value="todas">Todas</option>
          {rarities.map((r) => (
            <option key={r} value={r}>
              {rarityLabels[r]}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Mundo</Label>
        <Select value={world} onChange={(e) => setWorld(e.target.value)}>
          <option value="todos">Todos</option>
          {worlds.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Vendedor</Label>
        <Select
          value={sellerStatus}
          onChange={(e) => setSellerStatus(e.target.value as typeof sellerStatus)}
        >
          <option value="todos">Todos</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </Select>
      </div>
      <div>
        <Label>Ordenar por</Label>
        <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );

  return (
    <div>
      {/* Barra superior */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no Market…"
            className="pl-10"
            aria-label="Buscar anúncios"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </Button>
          <Button onClick={() => setSelling(true)}>
            <Plus className="h-4 w-4" /> Vender
          </Button>
        </div>
      </div>

      {/* Categorias */}
      <div className="mt-5 flex flex-wrap gap-2">
        <CatChip label="Todas" active={category === "todas"} onClick={() => setCategory("todas")} />
        {categories.map((c) => (
          <CatChip
            key={c}
            label={marketCategoryLabels[c]}
            active={category === c}
            onClick={() => setCategory(c)}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Filtros desktop */}
        <aside className="hidden lg:block">
          <div className="panel sticky top-24 p-5">
            <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-ink">
              <SlidersHorizontal className="h-4 w-4 text-magenta" /> Filtros
            </h2>
            {filtersContent}
          </div>
        </aside>

        {/* Resultados */}
        <div>
          <p className="mb-4 text-sm text-muted">
            {filtered.length}{" "}
            {filtered.length === 1 ? "anúncio encontrado" : "anúncios encontrados"}
          </p>

          {pageItems.length === 0 ? (
            <EmptyState
              icon={Store}
              title="Nenhum anúncio encontrado"
              description="Ajuste os filtros ou tente outra busca."
              action={
                <Button variant="secondary" onClick={() => setSelling(true)}>
                  <Plus className="h-4 w-4" /> Criar anúncio
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((listing) => (
                  <MarketItemCard
                    key={listing.id}
                    listing={listing}
                    onView={setViewing}
                    onBuy={setBuying}
                  />
                ))}
              </div>
              <Pagination
                className="mt-10"
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Drawer de filtros (mobile) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t border-magenta/20 bg-bg-soft p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Filtros</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar filtros"
                className="flex h-9 w-9 items-center justify-center border border-border clip-chamfer-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filtersContent}
            <Button className="mt-6 w-full" onClick={() => setDrawerOpen(false)}>
              Ver {filtered.length} resultados
            </Button>
          </aside>
        </div>
      )}

      {/* Modais */}
      <MarketListingModal
        listing={viewing}
        open={!!viewing}
        onClose={() => setViewing(null)}
        onBuy={(l) => {
          setViewing(null);
          setBuying(l);
        }}
      />
      <MarketCheckoutModal
        listing={buying}
        open={!!buying}
        onClose={() => setBuying(null)}
      />
      <MarketSellModal open={selling} onClose={() => setSelling(false)} />
    </div>
  );
}

function CatChip({
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
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors clip-chamfer-sm",
        active
          ? "border-magenta bg-magenta/15 text-ink"
          : "border-border text-muted hover:border-magenta/40 hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}
