"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "default" | "success" | "error" | "info";

interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const remove = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<Toast, "id">) => {
      const id = ++counter;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => remove(id), 4500);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3"
        aria-live="polite"
        role="region"
        aria-label="Notificações"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "pointer-events-auto panel clip-chamfer-sm border p-4 pr-10 shadow-card",
                t.tone === "success" && "border-emerald-400/40",
                t.tone === "error" && "border-destructive/50",
                t.tone === "info" && "border-cyan-magic/40",
                t.tone === "default" && "border-magenta/30"
              )}
            >
              <div className="flex items-start gap-3">
                <ToastIcon tone={t.tone} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs text-muted">{t.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => remove(t.id)}
                className="absolute right-2 top-2 rounded p-1 text-muted transition-colors hover:text-ink"
                aria-label="Fechar notificação"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastIcon({ tone }: { tone: ToastTone }) {
  const cls = "mt-0.5 h-5 w-5 shrink-0";
  if (tone === "success")
    return <CheckCircle2 className={cn(cls, "text-emerald-400")} />;
  if (tone === "error")
    return <TriangleAlert className={cn(cls, "text-destructive")} />;
  if (tone === "info") return <Info className={cn(cls, "text-cyan-magic")} />;
  return <Info className={cn(cls, "text-magenta")} />;
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    // Fallback silencioso caso o provider não esteja montado.
    return { toast: () => undefined };
  }
  return ctx;
}
