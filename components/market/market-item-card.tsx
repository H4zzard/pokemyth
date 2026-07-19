import Image from "next/image";
import { ShoppingCart, Eye, ShieldCheck } from "lucide-react";
import type { MarketListing } from "@/lib/types";
import {
  marketCategoryLabels,
  calcPlatformFee,
} from "@/lib/data/market-items";
import { RarityBadge, OnlineDot } from "@/components/shared/badges";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";

export function MarketItemCard({
  listing,
  onView,
  onBuy,
}: {
  listing: MarketListing;
  onView?: (listing: MarketListing) => void;
  onBuy?: (listing: MarketListing) => void;
}) {
  return (
    <article className="panel panel-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-bg">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2">
          <RarityBadge rarity={listing.rarity} />
        </div>
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 border border-emerald-400/30 bg-night/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 clip-chamfer-sm">
          <ShieldCheck className="h-3 w-3" /> Compra protegida
        </span>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-card to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wide text-muted">
          <span>{marketCategoryLabels[listing.category]}</span>
          {listing.quantity > 1 && <span>x{listing.quantity}</span>}
        </div>
        <h3 className="mt-1 line-clamp-1 font-display text-base font-semibold text-ink">
          {listing.title}
        </h3>

        <ul className="mt-2 space-y-0.5 text-xs text-muted">
          {listing.attributes.slice(0, 2).map((attr) => (
            <li key={attr.label} className="flex justify-between gap-2">
              <span className="text-muted/70">{attr.label}</span>
              <span className="truncate text-ink/80">{attr.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="truncate text-muted">
            por <span className="text-ink/90">{listing.seller.name}</span>
          </span>
          <OnlineDot online={listing.seller.online} />
        </div>

        <div className="mt-3 flex items-end justify-between">
          <PriceDisplay
            value={listing.price}
            size="default"
            fee={calcPlatformFee(listing.price)}
          />
          <span className="text-[11px] text-muted">{listing.salesCount} vendas</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onView?.(listing)}
            aria-label={`Visualizar ${listing.title}`}
          >
            <Eye className="h-4 w-4" /> Ver
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onBuy?.(listing)}
            aria-label={`Comprar ${listing.title}`}
          >
            <ShoppingCart className="h-4 w-4" /> Comprar
          </Button>
        </div>
      </div>
    </article>
  );
}
