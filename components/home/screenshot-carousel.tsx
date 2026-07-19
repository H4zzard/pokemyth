"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { Screenshot } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScreenshotLightbox } from "./screenshot-lightbox";

export function ScreenshotCarousel({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplay.current]
  );
  const [selected, setSelected] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [loaded, setLoaded] = React.useState<Record<number, boolean>>({});

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {screenshots.map((shot, i) => (
            <div
              key={shot.id}
              className="relative min-w-0 shrink-0 grow-0 basis-[86%] px-2 sm:basis-[72%] lg:basis-[64%]"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className={cn(
                  "group relative block aspect-video w-full overflow-hidden border transition-all clip-chamfer",
                  i === selected
                    ? "border-magenta/40 shadow-glow"
                    : "border-border opacity-50"
                )}
                aria-label={`Ampliar screenshot: ${shot.alt}`}
              >
                {!loaded[i] && (
                  <span className="absolute inset-0 skeleton" aria-hidden />
                )}
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 86vw, 64vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-white/20 bg-night/60 text-white opacity-0 backdrop-blur-sm transition-opacity clip-chamfer-sm group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
                {shot.caption && i === selected && (
                  <p className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-ink">
                    {shot.caption}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Setas */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Screenshot anterior"
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-night/70 text-ink backdrop-blur-sm transition-colors clip-chamfer-sm hover:border-magenta/50 hover:text-magenta sm:left-4"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Próxima screenshot"
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-night/70 text-ink backdrop-blur-sm transition-colors clip-chamfer-sm hover:border-magenta/50 hover:text-magenta sm:right-4"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir para screenshot ${i + 1}`}
            aria-current={i === selected}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected
                ? "w-8 bg-gradient-to-r from-magenta to-arcane"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>

      <ScreenshotLightbox
        screenshots={screenshots}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
