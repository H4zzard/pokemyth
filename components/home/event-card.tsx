import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Trophy, ArrowRight } from "lucide-react";
import type { GameEvent } from "@/lib/types";
import { StatusBadge } from "@/components/shared/badges";
import { Button } from "@/components/ui/button";

const statusMeta: Record<
  GameEvent["status"],
  { label: string; tone: "pending" | "progress" | "success" | "error" }
> = {
  "em-breve": { label: "Em breve", tone: "pending" },
  ativo: { label: "Ativo", tone: "success" },
  encerrado: { label: "Encerrado", tone: "error" },
};

const typeLabels: Record<GameEvent["type"], string> = {
  sazonal: "Sazonal",
  boss: "Boss mundial",
  torneio: "Torneio",
  comunidade: "Comunidade",
};

export function EventCard({ event }: { event: GameEvent }) {
  const status = statusMeta[event.status];
  return (
    <article className="panel panel-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-bg">
        {event.image && (
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
        <span className="absolute right-3 top-3 border border-border bg-night/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted clip-chamfer-sm">
          {typeLabels[event.type]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink">
          {event.name}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <CalendarDays className="h-3.5 w-3.5" /> {event.date}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-muted">{event.description}</p>

        {event.rewards && event.rewards.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gold">
              <Trophy className="h-3.5 w-3.5" /> Recompensas
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {event.rewards.map((r) => (
                <li
                  key={r}
                  className="border border-border bg-bg/40 px-2 py-0.5 text-[11px] text-muted clip-chamfer-sm"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link href="/updates">
            <Button variant="secondary" size="sm" className="w-full">
              Ver evento
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
