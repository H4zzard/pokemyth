import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

export function Logo({
  className,
  width = 200,
  priority = false,
  href = "/",
}: {
  className?: string;
  width?: number;
  priority?: boolean;
  href?: string | null;
}) {
  const img = (
    <Image
      src="/brand/pokemyth-logo.png"
      alt={`${siteConfig.name} — logotipo oficial`}
      width={width}
      height={Math.round((width * 9) / 16)}
      priority={priority}
      className={cn("h-auto w-auto select-none object-contain", className)}
      style={{ width, height: "auto" }}
      sizes={`${width}px`}
    />
  );

  if (href === null) return img;

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — página inicial`}
      className="inline-flex transition-transform duration-300 hover:scale-[1.03]"
    >
      {img}
    </Link>
  );
}
