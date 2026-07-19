import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span
            className={cn(
              "h-px w-6 bg-magenta/60",
              align === "center" && "hidden"
            )}
            aria-hidden
          />
          {eyebrow}
        </span>
      )}
      <Tag
        className={cn(
          "heading-display mt-3 text-3xl leading-tight sm:text-4xl",
          Tag === "h1" && "text-4xl sm:text-5xl lg:text-6xl"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

export function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="divider-arcane w-full max-w-[120px] flex-1" />
      <span className="text-gold/70 text-sm">◆</span>
      <span className="divider-arcane w-full max-w-[120px] flex-1" />
    </div>
  );
}
