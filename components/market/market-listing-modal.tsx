"use client";

import Image from "next/image";
import { Star, ShoppingCart, ShieldCheck, Store } from "lucide-react";
import type { MarketListing } from "@/lib/types";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RarityBadge, OnlineDot } from "@/components/shared/badges";
import { PriceDisplay } from "@/components/shared/price-display";
import {
  marketCategoryLabels,
  calcPlatformFee,
} from "@/lib/data/market-items";
import { formatDate } from "@/lib/utils";

export function MarketListingModal({
  listing,
  open,
  onClose,
  onBuy,
}: {
  listing: MarketListing | null;
  open: boolean;
  onClose: () => void;
  onBuy: (listing: MarketListing) => void;
}) {
  if (!listing) return null;

  return (
    <Dialog open={open} onClose={onClose} size="xl" title={listing.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Galeria */}
        <div>
          <div className="relative aspect-square overflow-hidden border border-border clip-chamfer bg-bg">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-cover"
            />
            <div className="absolute left-2 top-2">
              <RarityBadge rarity={listing.rarity} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/5 p-3 clip-chamfer-sm">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" />
            <p className="text-xs text-muted">
              <span className="font-semibold text-emerald-300">Compra protegida.</span>{" "}
              Transferência automática após confirmação do pagamento, com
              intermediação da plataforma.
            </p>
          </div>
        </div>

        {/* Informações */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <span>{marketCategoryLabels[listing.category]}</span>
            <span>·</span>
            <span>Mundo {listing.world}</span>
            <span>·</span>
            <span>{formatDate(listing.createdAt)}</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {listing.description}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2">
            {listing.attributes.map((attr) => (
              <div
                key={attr.label}
                className="border border-border bg-bg/40 p-2.5 clip-chamfer-sm"
              >
                <dt className="text-[11px] uppercase tracking-wide text-muted/70">
                  {attr.label}
                </dt>
                <dd className="text-sm font-medium text-ink">{attr.value}</dd>
              </div>
            ))}
          </dl>

          {/* Vendedor */}
          <div className="mt-4 flex items-center justify-between border border-border bg-bg/40 p-3 clip-chamfer-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-magenta/30 bg-magenta/10">
                <Store className="h-5 w-5 text-magenta" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">
                  {listing.seller.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1 text-gold">
                    <Star className="h-3 w-3 fill-current" />
                    {listing.seller.rating.toFixed(1)}
                  </span>
                  <span>· {listing.seller.totalSales} vendas</span>
                </div>
              </div>
            </div>
            <OnlineDot online={listing.seller.online} />
          </div>

          {/* Resumo da compra */}
          <div className="mt-auto pt-4">
            <div className="flex items-end justify-between border-t border-border pt-4">
              <PriceDisplay
                value={listing.price}
                size="lg"
                fee={calcPlatformFee(listing.price)}
              />
              <Button onClick={() => onBuy(listing)}>
                <ShoppingCart className="h-4 w-4" /> Comprar
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-muted/70">
              Ao comprar, você concorda com os termos do Market e com a
              intermediação da plataforma.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
