import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "PokeMyth Online",
  shortName: "PMO",
  title: "PokeMyth Online — MMORPG 2D",
  description:
    "Explore um mundo vivo, desenvolva sua equipe, participe de eventos e negocie com jogadores no PokeMyth Online.",
  // TODO: ajustar para o domínio oficial de produção
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pokemyth.online",
  ogImage: "/hero/pokemyth-hero.png",
};

/** Aviso legal / propriedade intelectual — revisar com a equipe/jurídico. */
export const legalNotice = {
  // TODO(equipe): revisar texto de propriedade intelectual e projeto independente
  independentProject:
    "PokeMyth Online é um projeto independente feito por fãs. Não possui vínculo, patrocínio ou endosso oficial de detentores de marcas de terceiros.",
  copyrightHolder: "Equipe PokeMyth Online",
};
