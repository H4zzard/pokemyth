"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus, Info } from "lucide-react";
import type { CartItem, StoreCategory, StoreProduct } from "@/lib/types";
import { storeCategoryLabels } from "@/lib/data/store-products";
import { StoreProductCard } from "./store-product-card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/states";
import { useToast } from "@/components/ui/toaster";
import { formatBRL, cn } from "@/lib/utils";

const categories = Object.keys(storeCategoryLabels) as StoreCategory[];

export function StoreBrowser({ products }: { products: StoreProduct[] }) {
  const { toast } = useToast();
  const [category, setCategory] = React.useState<StoreCategory | "todas">("todas");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);

  const filtered =
    category === "todas"
      ? products
      : products.filter((p) => p.category === category);

  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  function addToCart(product: StoreProduct) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { product, quantity: 1 }];
    });
    toast({ tone: "success", title: "Adicionado ao carrinho", description: product.name });
  }

  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === id
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  return (
    <div>
      {/* Barra de categorias + carrinho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip label="Todas" active={category === "todas"} onClick={() => setCategory("todas")} />
          {categories.map((c) => (
            <Chip
              key={c}
              label={storeCategoryLabels[c]}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>
        <Button variant="secondary" onClick={() => setCartOpen(true)} className="relative shrink-0">
          <ShoppingBag className="h-4 w-4" /> Carrinho
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-magenta px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <StoreProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>

      {/* Carrinho */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} title="Seu carrinho" size="md">
        {cart.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Carrinho vazio"
            description="Adicione produtos da Loja PMO para continuar."
          />
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center gap-3 border border-border bg-bg/40 p-3 clip-chamfer-sm"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border clip-chamfer-sm">
                    {item.product.image && (
                      <Image src={item.product.image} alt="" fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.product.name}</p>
                    <p className="text-xs text-muted">{formatBRL(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => changeQty(item.product.id, -1)}
                      aria-label="Diminuir"
                      className="flex h-7 w-7 items-center justify-center border border-border clip-chamfer-sm hover:border-magenta/50"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => changeQty(item.product.id, 1)}
                      aria-label="Aumentar"
                      className="flex h-7 w-7 items-center justify-center border border-border clip-chamfer-sm hover:border-magenta/50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => changeQty(item.product.id, -item.quantity)}
                      aria-label="Remover"
                      className="ml-1 flex h-7 w-7 items-center justify-center text-muted hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-xl font-semibold text-ink">
                {formatBRL(total)}
              </span>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                setCartOpen(false);
                setCheckout(true);
              }}
            >
              Ir para o pagamento
            </Button>
          </>
        )}
      </Dialog>

      {/* Checkout mockado */}
      <Dialog open={checkout} onClose={() => setCheckout(false)} title="Finalizar compra" size="sm">
        <div className="flex items-start gap-2 border border-cyan-magic/30 bg-cyan-magic/5 p-3 clip-chamfer-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-magic" />
          <p className="text-xs text-muted">
            <span className="font-semibold text-cyan-magic">
              Integração com servidor pendente.
            </span>{" "}
            O pagamento da Loja PMO será ativado quando o gateway for conectado.
            Nenhuma cobrança foi realizada.
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">Total do pedido</span>
          <span className="font-display font-semibold text-ink">{formatBRL(total)}</span>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={() => setCheckout(false)}>
            Entendi
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

function Chip({
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
