import type { SocialLink } from "@/lib/types";

// TODO(equipe): substituir pelos links reais das redes sociais e Discord.
export const discordInviteUrl =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.gg/pokemyth";

export const socialLinks: SocialLink[] = [
  {
    platform: "discord",
    label: "Discord",
    href: discordInviteUrl,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://instagram.com/pokemythonline",
  },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@pokemythonline",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@pokemythonline",
  },
];
