import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GameUpdate } from "@/lib/types";
import { updateCategoryLabels } from "@/lib/data/updates";
import { StatusBadge } from "@/components/shared/badges";
import { formatDate } from "@/lib/utils";

const categoryTone: Record<
  GameUpdate["category"],
  "pending" | "progress" | "success" | "error" | "info"
> = {
  conteudo: "info",
  evento: "progress",
  balanceamento: "pending",
  correcao: "error",
  sistema: "info",
  market: "success",
};

export function UpdateCard({ update }: { update: GameUpdate }) {
  return (
    <Link
      href={`/updates#${update.slug}`}
      className="panel panel-hover group flex gap-4 overflow-hidden p-3"
    >
      {update.image && (
        <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden border border-border clip-chamfer-sm sm:block">
          <Image
            src={update.image}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={categoryTone[update.category]} dot={false}>
            {updateCategoryLabels[update.category]}
          </StatusBadge>
          <span className="text-xs text-muted">{update.version}</span>
          <span className="text-xs text-muted">· {formatDate(update.date)}</span>
        </div>
        <h3 className="mt-2 line-clamp-1 font-display text-base font-semibold text-ink">
          {update.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{update.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-magenta">
          Ver changelog
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
