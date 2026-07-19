import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/utils";

export function PriceDisplay({
  value,
  size = "default",
  className,
  fee,
}: {
  value: number;
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Taxa informativa opcional a exibir abaixo. */
  fee?: number;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-display font-semibold text-ink",
          size === "sm" && "text-base",
          size === "default" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        {formatBRL(value)}
      </span>
      {typeof fee === "number" && (
        <span className="text-[11px] text-muted">
          + taxa da plataforma {formatBRL(fee)}
        </span>
      )}
    </div>
  );
}
