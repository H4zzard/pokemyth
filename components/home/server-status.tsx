import { serverStatus } from "@/lib/data/server-status";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

// TODO: consumir getServerStatus() da API do jogo. Hoje usa mock centralizado.
export function ServerStatus({ className }: { className?: string }) {
  const { online, playersOnline, version, worldName } = serverStatus;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 border border-border bg-night/50 px-4 py-2 backdrop-blur-sm clip-chamfer-sm",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "relative flex h-2.5 w-2.5",
            online ? "text-emerald-400" : "text-zinc-500"
          )}
        >
          {online && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
          )}
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink">
          {online ? "Servidor online" : "Servidor offline"}
        </span>
      </span>
      <span className="h-4 w-px bg-border" />
      <span className="text-xs text-muted">
        <span className="font-semibold text-ink">{formatNumber(playersOnline)}</span>{" "}
        online
      </span>
      <span className="h-4 w-px bg-border" />
      <span className="text-xs text-muted">
        {worldName} · {version}
      </span>
    </div>
  );
}
