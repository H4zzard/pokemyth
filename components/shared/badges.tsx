import { cn } from "@/lib/utils";
import type { Rarity } from "@/lib/types";
import { rarityLabels } from "@/lib/data/market-items";

const rarityStyles: Record<Rarity, string> = {
  comum: "border-zinc-500/40 text-zinc-300 bg-zinc-500/10",
  incomum: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  raro: "border-sky-500/40 text-sky-300 bg-sky-500/10",
  epico: "border-arcane/50 text-fuchsia-200 bg-arcane/15",
  lendario: "border-gold/50 text-gold bg-gold/10",
  mitico: "border-magenta/60 text-magenta bg-magenta/15",
};

export function RarityBadge({
  rarity,
  className,
}: {
  rarity: Rarity;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider clip-chamfer-sm",
        rarityStyles[rarity],
        className
      )}
    >
      {rarityLabels[rarity]}
    </span>
  );
}

type StatusTone = "pending" | "progress" | "success" | "error" | "info";

const toneStyles: Record<StatusTone, string> = {
  pending: "border-gold/40 text-gold bg-gold/10",
  progress: "border-cyan-magic/40 text-cyan-magic bg-cyan-magic/10",
  success: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  error: "border-destructive/50 text-rose-300 bg-destructive/10",
  info: "border-arcane/40 text-fuchsia-200 bg-arcane/10",
};

export function StatusBadge({
  children,
  tone = "info",
  className,
  dot = true,
}: {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide clip-chamfer-sm",
        toneStyles[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function OnlineDot({ online }: { online: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        online ? "text-emerald-400" : "text-muted"
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          online ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-zinc-600"
        )}
        aria-hidden
      />
      {online ? "Online" : "Offline"}
    </span>
  );
}
