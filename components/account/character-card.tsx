import Image from "next/image";
import { Shield } from "lucide-react";
import type { Character } from "@/lib/types";
import { OnlineDot } from "@/components/shared/badges";
import { timeAgo } from "@/lib/utils";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="panel panel-hover flex items-center gap-4 p-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-magenta/30 clip-chamfer-sm bg-bg">
        {character.avatar ? (
          <Image
            src={character.avatar}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Shield className="h-6 w-6 text-magenta" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-display text-base font-semibold text-ink">
            {character.name}
          </h3>
          <OnlineDot online={character.online} />
        </div>
        <p className="text-xs text-muted">
          {character.vocation} · Nível {character.level} · Mundo {character.world}
        </p>
        <p className="mt-0.5 text-[11px] text-muted/70">
          Último acesso {timeAgo(character.lastLogin, new Date("2026-07-19T12:00:00Z"))}
        </p>
      </div>
    </article>
  );
}
