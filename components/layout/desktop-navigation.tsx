"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/types";

export function DesktopNavigation({
  items,
  className,
}: {
  items: NavigationItem[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors",
                active ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-magenta to-arcane transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
