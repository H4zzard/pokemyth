"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav, accountNav } from "@/lib/config/navigation";
import { Logo } from "./logo";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Fecha ao navegar.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center border border-border text-ink transition-colors clip-chamfer-sm hover:border-magenta/50"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-night/85 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-magenta/20 bg-bg-soft p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              role="dialog"
              aria-label="Menu de navegação"
            >
              <div className="flex items-center justify-between">
                <Logo width={130} href={null} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="flex h-10 w-10 items-center justify-center border border-border text-ink clip-chamfer-sm hover:border-magenta/50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {primaryNav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "border-l-2 px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "border-magenta bg-magenta/10 text-ink"
                          : "border-transparent text-muted hover:border-magenta/50 hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-3 border-t border-border pt-6">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 border border-magenta/40 py-3 text-sm font-semibold uppercase tracking-wide text-ink clip-chamfer-sm hover:bg-magenta/10"
                >
                  <LogIn className="h-4 w-4" /> Entrar
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 border border-border py-3 text-sm font-semibold uppercase tracking-wide text-muted clip-chamfer-sm hover:text-ink"
                >
                  <UserPlus className="h-4 w-4" /> Criar conta
                </Link>
                <Link
                  href="/store"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-magenta to-arcane py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow clip-chamfer-sm"
                >
                  <ShoppingBag className="h-4 w-4" /> {accountNav[1].label}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
