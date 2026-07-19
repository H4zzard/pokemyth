import { ArrowBigUp, MessageSquare, LinkIcon } from "lucide-react";
import type { CommunitySuggestion } from "@/lib/types";
import { suggestionStatusMeta } from "@/lib/data/account";
import { StatusBadge } from "@/components/shared/badges";
import { formatNumber } from "@/lib/utils";

export function CommunitySuggestionCard({
  suggestion,
  featured = false,
}: {
  suggestion: CommunitySuggestion;
  featured?: boolean;
}) {
  const status = suggestionStatusMeta[suggestion.status];
  return (
    <article
      className={`panel panel-hover flex gap-4 p-4 ${
        featured ? "border-magenta/30" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-1 border-r border-border pr-4">
        <ArrowBigUp className="h-5 w-5 text-magenta" />
        <span className="font-display text-lg font-semibold text-ink">
          {formatNumber(suggestion.votes)}
        </span>
        <span className="text-[10px] uppercase tracking-wide text-muted">votos</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
          <span className="text-xs text-muted">por {suggestion.author}</span>
        </div>
        <h3 className="mt-2 font-display text-base font-semibold text-ink">
          {suggestion.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {suggestion.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {formatNumber(suggestion.comments)} comentários
          </span>
          {suggestion.relatedUpdate && (
            <span className="inline-flex items-center gap-1 text-cyan-magic">
              <LinkIcon className="h-3.5 w-3.5" /> Atualização relacionada
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
