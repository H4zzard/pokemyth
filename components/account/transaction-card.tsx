"use client";

import Image from "next/image";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { MarketTransaction } from "@/lib/types";
import { transactionStatusMeta } from "@/lib/data/transactions";
import { StatusBadge } from "@/components/shared/badges";
import { formatBRL, formatDate } from "@/lib/utils";

export function TransactionCard({
  transaction,
  onOpen,
}: {
  transaction: MarketTransaction;
  onOpen?: (t: MarketTransaction) => void;
}) {
  const meta = transactionStatusMeta[transaction.status];
  const isBuy = transaction.role === "compra";

  return (
    <button
      onClick={() => onOpen?.(transaction)}
      className="panel panel-hover flex w-full items-center gap-4 p-4 text-left"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border clip-chamfer-sm bg-bg">
        {transaction.listingImage && (
          <Image
            src={transaction.listingImage}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide ${
              isBuy ? "text-cyan-magic" : "text-emerald-300"
            }`}
          >
            {isBuy ? (
              <ArrowDownLeft className="h-3.5 w-3.5" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5" />
            )}
            {isBuy ? "Compra" : "Venda"}
          </span>
          <span className="text-xs text-muted">· {formatDate(transaction.createdAt)}</span>
        </div>
        <p className="mt-0.5 truncate text-sm font-medium text-ink">
          {transaction.listingTitle}
        </p>
        <p className="text-xs text-muted">
          {isBuy ? "Vendedor" : "Comprador"}: {transaction.counterpart}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="font-display text-sm font-semibold text-ink">
          {formatBRL(isBuy ? transaction.amount : transaction.netAmount)}
        </span>
        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
      </div>
    </button>
  );
}
