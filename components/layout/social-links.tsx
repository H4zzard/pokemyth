import { Instagram, Youtube, MessageCircle, Music2 } from "lucide-react";
import { socialLinks } from "@/lib/config/social-links";
import type { SocialPlatform } from "@/lib/types";
import { cn } from "@/lib/utils";

const icons: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  discord: MessageCircle,
  tiktok: Music2,
  twitter: MessageCircle,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socialLinks.map((link) => {
        const Icon = icons[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center border border-border text-muted transition-all clip-chamfer-sm hover:border-magenta/50 hover:text-magenta hover:shadow-glow-soft"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
