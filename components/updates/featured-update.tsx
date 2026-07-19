import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GameUpdate } from "@/lib/types";
import { updateCategoryLabels } from "@/lib/data/updates";
import { StatusBadge } from "@/components/shared/badges";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function FeaturedUpdate({ update }: { update: GameUpdate }) {
  return (
    <article className="panel panel-hover group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-bg sm:aspect-[16/8]">
        {update.image && (
          <Image
            src={update.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <StatusBadge tone="progress" dot={false}>
            {updateCategoryLabels[update.category]}
          </StatusBadge>
          <span className="border border-gold/40 bg-night/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold clip-chamfer-sm">
            Destaque
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{update.version}</span>
          <span>· {formatDate(update.date)}</span>
        </div>
        <h3 className="mt-2 heading-display text-2xl">{update.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {update.summary}
        </p>
        <div className="mt-5">
          <Link href={`/updates#${update.slug}`}>
            <Button variant="outline" size="sm">
              Ver changelog completo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
