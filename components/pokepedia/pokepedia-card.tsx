import Image from "next/image";
import Link from "next/link";
import type { PokepediaEntry } from "@/lib/types";
import { pokepediaCategoryLabels } from "@/lib/data/pokepedia";
import { RarityBadge } from "@/components/shared/badges";

export function PokepediaCard({ entry }: { entry: PokepediaEntry }) {
  return (
    <Link
      href={`/pokepedia/${entry.slug}`}
      className="panel panel-hover group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg">
        {entry.image && (
          <Image
            src={entry.image}
            alt={entry.name}
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {entry.rarity && (
          <div className="absolute left-2 top-2">
            <RarityBadge rarity={entry.rarity} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[11px] uppercase tracking-wide text-magenta">
          {pokepediaCategoryLabels[entry.category]}
        </span>
        <h3 className="mt-1 font-display text-sm font-semibold text-ink">
          {entry.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted">{entry.summary}</p>
        {(entry.region || entry.type) && (
          <div className="mt-2 flex flex-wrap gap-1.5 border-t border-border pt-2 text-[10px] text-muted">
            {entry.type && (
              <span className="border border-border px-1.5 py-0.5 clip-chamfer-sm">
                {entry.type}
              </span>
            )}
            {entry.region && (
              <span className="border border-border px-1.5 py-0.5 clip-chamfer-sm">
                {entry.region}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
