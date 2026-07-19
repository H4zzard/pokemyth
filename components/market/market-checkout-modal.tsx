"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck, Info, Play } from "lucide-react";
import type { MarketListing, TransactionStatus } from "@/lib/types";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TransactionTimeline } from "./transaction-timeline";
import { PriceDisplay } from "@/components/shared/price-display";
import { calcPlatformFee } from "@/lib/data/market-items";
import { transactionTimeline } from "@/lib/data/transactions";
import { createMarketOrder } from "@/lib/services/market-service";
import { useToast } from "@/components/ui/toaster";
import { formatBRL } from "@/lib/utils";

type Phase = "review" | "pending" | "demo";

export function MarketCheckoutModal({
  listing,
  open,
  onClose,
}: {
  listing: MarketListing | null;
  open: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [accepted, setAccepted] = React.useState(false);
  const [phase, setPhase] = React.useState<Phase>("review");
  const [demoStatus, setDemoStatus] = React.useState<TransactionStatus>(
    transactionTimeline[0]
  );
  const [submitting, setSubmitting] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = React.useCallback(() => {
    setAccepted(false);
    setPhase("review");
    setDemoStatus(transactionTimeline[0]);
    setSubmitting(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!listing) return null;

  const fee = calcPlatformFee(listing.price);

  async function handleConfirm() {
    setSubmitting(true);
    // Chamada real ao serviço — retorna erro controlado (sem sucesso falso).
    const res = await createMarketOrder(listing!.id);
    setSubmitting(false);
    if (!res.ok) {
      setPhase("pending");
      toast({
        tone: "info",
        title: "Integração com servidor pendente",
        description:
          "O pagamento e a transferência real serão ativados ao conectar as APIs.",
      });
    }
  }

  // Demonstração do fluxo (claramente rotulada) — não representa transação real.
  function runDemo() {
    setPhase("demo");
    let i = 0;
    setDemoStatus(transactionTimeline[0]);
    const step = () => {
      i += 1;
      if (i < transactionTimeline.length) {
        setDemoStatus(transactionTimeline[i]);
        timerRef.current = setTimeout(step, 1100);
      }
    };
    timerRef.current = setTimeout(step, 1100);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="md"
      title="Finalizar compra protegida"
    >
      {/* Item */}
      <div className="flex items-center gap-3 border border-border bg-bg/40 p-3 clip-chamfer-sm">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border clip-chamfer-sm">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{listing.title}</p>
          <p className="text-xs text-muted">
            Vendedor: {listing.seller.name} · Mundo {listing.world}
          </p>
        </div>
      </div>

      {phase === "review" && (
        <>
          {/* Resumo */}
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Valor do item</dt>
              <dd className="text-ink">{formatBRL(listing.price)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Taxa da plataforma (informativa)</dt>
              <dd className="text-ink">{formatBRL(fee)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-semibold">
              <dt className="text-ink">Total</dt>
              <dd>
                <PriceDisplay value={listing.price} size="sm" />
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-start gap-2 border border-emerald-400/30 bg-emerald-400/5 p-3 clip-chamfer-sm">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <p className="text-xs text-muted">
              Sua compra é protegida: o item é transferido automaticamente após
              a confirmação do pagamento. O valor do vendedor fica registrado e a
              plataforma retém apenas a taxa configurada.
            </p>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <Checkbox checked={accepted} onCheckedChange={setAccepted} />
            <span className="text-xs text-muted">
              Li e concordo com os termos do Market e com a intermediação da
              plataforma nesta transação.
            </span>
          </label>

          <div className="mt-5 flex flex-col gap-2">
            <Button
              disabled={!accepted || submitting}
              onClick={handleConfirm}
            >
              {submitting ? "Processando…" : "Confirmar compra protegida"}
            </Button>
            <Button variant="ghost" size="sm" onClick={runDemo}>
              <Play className="h-3.5 w-3.5" /> Ver fluxo da transação (demonstração)
            </Button>
          </div>
        </>
      )}

      {phase === "pending" && (
        <div className="mt-4">
          <div className="flex items-start gap-2 border border-cyan-magic/30 bg-cyan-magic/5 p-3 clip-chamfer-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-magic" />
            <p className="text-xs text-muted">
              <span className="font-semibold text-cyan-magic">
                Integração com servidor pendente.
              </span>{" "}
              O pagamento real e a transferência do item serão ativados quando as
              APIs de pagamento e do jogo forem conectadas. Nenhuma cobrança foi
              realizada.
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Entendi
            </Button>
          </div>
        </div>
      )}

      {phase === "demo" && (
        <div className="mt-4">
          <div className="mb-4 flex items-center gap-2 border border-gold/30 bg-gold/5 p-2.5 text-[11px] text-gold clip-chamfer-sm">
            <Info className="h-4 w-4 shrink-0" />
            Demonstração ilustrativa do fluxo — não representa uma transação real.
          </div>
          <TransactionTimeline current={demoStatus} />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPhase("review")}>
              Voltar
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
