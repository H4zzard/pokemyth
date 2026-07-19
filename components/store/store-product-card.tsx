"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import type { StoreProduct } from "@/lib/types";
import { storeCategoryLabels } from "@/lib/data/store-products";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";

export function StoreProductCard({
  product,
  onAdd,
}: {
  product: StoreProduct;
  onAdd: (product: StoreProduct) => void;
}) {
  return (
    <article className="panel panel-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="border border-border bg-night/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted clip-chamfer-sm">
            {storeCategoryLabels[product.category]}
          </span>
        </div>
        {product.badge && (
          <span className="absolute right-3 top-3 border border-gold/40 bg-night/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold clip-chamfer-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {product.description}
        </p>
        <ul className="mt-3 space-y-1">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between pt-4">
          <PriceDisplay value={product.price} size="default" />
          <Button size="sm" onClick={() => onAdd(product)}>
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </div>
        <p className="mt-2 text-[10px] text-muted/60">
          Sujeito aos termos da Loja PMO.
        </p>
      </div>
    </article>
  );
}
