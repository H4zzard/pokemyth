"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Screenshot } from "@/lib/types";

export function ScreenshotLightbox({
  screenshots,
  index,
  onClose,
  onNavigate,
}: {
  screenshots: Screenshot[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const open = index !== null;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null)
        onNavigate((index + 1) % screenshots.length);
      if (e.key === "ArrowLeft" && index !== null)
        onNavigate((index - 1 + screenshots.length) % screenshots.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, onClose, onNavigate, screenshots.length]);

  if (!mounted) return null;

  const shot = index !== null ? screenshots[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && shot && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-night/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={shot.alt}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors clip-chamfer-sm hover:border-magenta/50"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! - 1 + screenshots.length) % screenshots.length);
            }}
            aria-label="Anterior"
            className="absolute left-4 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors clip-chamfer-sm hover:border-magenta/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <motion.figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden border border-magenta/30 clip-chamfer">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {shot.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted">
                {shot.caption}
              </figcaption>
            )}
          </motion.figure>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! + 1) % screenshots.length);
            }}
            aria-label="Próxima"
            className="absolute right-4 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors clip-chamfer-sm hover:border-magenta/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
