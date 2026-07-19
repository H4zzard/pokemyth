import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/lib/types";
import {
  transactionStatusMeta,
  transactionTimeline,
} from "@/lib/data/transactions";

export function TransactionTimeline({
  current,
  className,
}: {
  current: TransactionStatus;
  className?: string;
}) {
  const isFailure =
    current === "cancelada" ||
    current === "erro-transferencia" ||
    current === "disputa";

  const currentIndex = transactionTimeline.indexOf(current);

  return (
    <ol className={cn("space-y-0", className)}>
      {transactionTimeline.map((status, i) => {
        const done = !isFailure && i < currentIndex;
        const active = !isFailure && i === currentIndex;
        const meta = transactionStatusMeta[status];
        const isLast = i === transactionTimeline.length - 1;

        return (
          <li key={status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
                  done && "border-emerald-400/50 bg-emerald-400/15 text-emerald-300",
                  active && "border-magenta bg-magenta/20 text-magenta",
                  !done && !active && "border-border text-muted"
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Circle className="h-2 w-2 fill-current" />
                )}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "my-0.5 w-px flex-1",
                    done ? "bg-emerald-400/40" : "bg-border"
                  )}
                />
              )}
            </div>
            <div className={cn("pb-5", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium",
                  done && "text-ink/80",
                  active && "text-ink",
                  !done && !active && "text-muted"
                )}
              >
                {meta.label}
              </p>
              {active && (
                <p className="mt-0.5 text-xs text-magenta">Em andamento…</p>
              )}
            </div>
          </li>
        );
      })}

      {isFailure && (
        <li className="mt-2 flex items-center gap-3 border border-destructive/40 bg-destructive/10 p-3 clip-chamfer-sm">
          <span className="text-sm font-medium text-rose-300">
            {transactionStatusMeta[current].label}
          </span>
        </li>
      )}
    </ol>
  );
}
