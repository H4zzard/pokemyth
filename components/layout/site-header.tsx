"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/config/navigation";
import { Logo } from "./logo";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-magenta/15 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container">
        <div
          className={cn(
            "relative flex items-center justify-between transition-all duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          {/* Esquerda — navegação principal (desktop) */}
          <div className="flex flex-1 items-center">
            <DesktopNavigation items={primaryNav} className="hidden lg:flex" />
            {/* Logo mobile (esquerda) */}
            <div className="lg:hidden">
              <Logo width={120} priority />
            </div>
          </div>

          {/* Centro — logo centralizada na PÁGINA (posição absoluta), transbordando p/ baixo */}
          <div className="pointer-events-none absolute left-1/2 top-2 hidden -translate-x-1/2 lg:block">
            <div className="pointer-events-auto relative">
              {/* Brilho rosa atrás da logo */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-24 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/45 blur-3xl"
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-16 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/50 blur-2xl"
              />
              <Logo
                width={scrolled ? 156 : 184}
                priority
                className="relative drop-shadow-[0_6px_20px_rgba(217,70,239,0.35)]"
              />
            </div>
          </div>

          {/* Direita — conta + loja (desktop) / menu (mobile) */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/login"
                className="px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Entrar
              </Link>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 border border-magenta/50 bg-magenta/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition-all clip-chamfer-sm hover:bg-magenta/20 hover:shadow-glow"
              >
                <ShoppingBag className="h-4 w-4 text-magenta" />
                Loja PMO
              </Link>
            </div>
            <div className="lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
