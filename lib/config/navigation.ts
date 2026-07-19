import type { NavigationItem } from "@/lib/types";

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
  { label: "Entrar", href: "/login" },
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
  conta: [
    { label: "Entrar", href: "/login" },
    { label: "Criar conta", href: "/register" },
    { label: "Minha conta", href: "/account" },
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
