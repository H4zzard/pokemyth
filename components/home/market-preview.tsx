"use client";

import * as React from "react";
import Link from "next/link";
import {
  Megaphone,
  ShoppingCart,
  CheckCircle2,
  Repeat,
  ArrowRight,
  Clock,
  ShieldCheck,
  History,
  LayoutDashboard,
} from "lucide-react";
import type { MarketListing } from "@/lib/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { MarketItemCard } from "@/components/market/market-item-card";
import { MarketListingModal } from "@/components/market/market-listing-modal";
import { MarketCheckoutModal } from "@/components/market/market-checkout-modal";

const flow = [
  { icon: Megaphone, label: "Anunciar" },
  { icon: ShoppingCart, label: "Comprar" },
  { icon: CheckCircle2, label: "Confirmar" },
  { icon: Repeat, label: "Transferir" },
];

const highlights = [
  { icon: Clock, text: "Anúncios disponíveis 24 horas, mesmo offline." },
  { icon: ShoppingCart, text: "Compra integrada ao site." },
  { icon: Repeat, text: "Transferência automática após confirmação." },
  { icon: History, text: "Histórico completo de transações." },
  { icon: ShieldCheck, text: "Vendedor e comprador protegidos pelas regras." },
  { icon: LayoutDashboard, text: "Controle total pelo painel da conta." },
];

export function MarketPreview({ listings }: { listings: MarketListing[] }) {
  const [viewing, setViewing] = React.useState<MarketListing | null>(null);
  const [buying, setBuying] = React.useState<MarketListing | null>(null);
  const preview = listings.slice(0, 2);

  return (
    <section className="section cv-section relative overflow-hidden border-y border-border bg-bg-soft/40">
      <div className="absolute -left-40 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-magenta/10 blur-[120px]" />
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Texto */}
          <div>
            <SectionHeading
              eyebrow="Market de jogadores"
              title="Negocie mesmo quando estiver offline"
              description="Anuncie itens e produtos permitidos pelo servidor, encontre oportunidades e negocie com outros jogadores através de uma experiência integrada ao PokeMyth Online."
            />

            {/* Fluxo */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {flow.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div className="inline-flex items-center gap-2 border border-magenta/25 bg-magenta/5 px-3 py-2 clip-chamfer-sm">
                    <step.icon className="h-4 w-4 text-magenta" />
                    <span className="text-sm font-medium text-ink">
                      {step.label}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Destaques */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h.text} className="flex items-start gap-2.5 text-sm">
                  <h.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-magic" />
                  <span className="text-muted">{h.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/market">
                <Button>
                  Acessar Market
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Prévia */}
          <div className="grid gap-4 sm:grid-cols-2">
            {preview.map((listing) => (
              <MarketItemCard
                key={listing.id}
                listing={listing}
                onView={setViewing}
                onBuy={setBuying}
              />
            ))}
          </div>
        </div>
      </div>

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
    </section>
  );
}
