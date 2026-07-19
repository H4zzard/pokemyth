"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Paginação"
    >
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Página anterior"
        className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors clip-chamfer-sm hover:border-magenta/50 hover:text-ink disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-medium transition-colors clip-chamfer-sm",
            p === page
              ? "border-magenta bg-magenta/15 text-ink"
              : "border-border text-muted hover:border-magenta/50 hover:text-ink"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Próxima página"
        className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors clip-chamfer-sm hover:border-magenta/50 hover:text-ink disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
