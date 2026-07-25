import type { NavigationItem } from "@/lib/types";

/**
 * NOTA: os links de "Entrar" / "Criar conta" / "Minha conta" foram removidos
 * durante a fase de waitlist de fundadores. As rotas continuam no repositório,
 * desligadas por `featureFlags.accountsEnabled` (lib/config/features.ts).
 * Para reativá-las, ligue a flag e devolva os itens abaixo.
 */

/** Itens principais (lado esquerdo da navbar no desktop). */
export const primaryNav: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "Market", href: "/market" },
  { label: "Atualizações", href: "/updates" },
  { label: "Pokepedia", href: "/pokepedia" },
  { label: "Regras", href: "/rules" },
];

/** Ações do lado direito da navbar. */
export const accountNav: NavigationItem[] = [
  { label: "Seja fundador", href: "/fundadores" },
  { label: "Loja PMO", href: "/store" },
];

/** Navegação do rodapé. */
export const footerNav = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Market", href: "/market" },
    { label: "Atualizações", href: "/updates" },
    { label: "Pokepedia", href: "/pokepedia" },
    { label: "Regras", href: "/rules" },
  ] satisfies NavigationItem[],
  participar: [
    { label: "Seja fundador", href: "/fundadores" },
    { label: "Loja PMO", href: "/store" },
    { label: "Suporte", href: "/support" },
  ] satisfies NavigationItem[],
  legal: [
    { label: "Termos de uso", href: "/rules#contas" },
    { label: "Política de privacidade", href: "/rules#seguranca" },
    { label: "Política do Market", href: "/rules#market-rmt" },
    { label: "Política de cookies", href: "/rules#seguranca" },
  ] satisfies NavigationItem[],
};
