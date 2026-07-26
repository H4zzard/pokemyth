import type { NavigationItem } from "@/lib/types";
import { featureFlags } from "./features";

/**
 * A navegação é montada a partir das feature flags (lib/config/features.ts).
 * Nenhum item foi apagado: os links de Market, Loja e área de conta voltam
 * sozinhos ao ligar a flag correspondente.
 */

/** Remove os itens cuja flag está desligada. */
function visible(items: Array<NavigationItem & { enabled?: boolean }>) {
  return items
    .filter((item) => item.enabled !== false)
    .map(({ label, href }) => ({ label, href }));
}

/** Itens principais (lado esquerdo da navbar no desktop). */
export const primaryNav: NavigationItem[] = visible([
  { label: "Início", href: "/" },
  { label: "Market", href: "/market", enabled: featureFlags.marketEnabled },
  { label: "Atualizações", href: "/updates" },
  { label: "Pokepedia", href: "/pokepedia" },
  { label: "Regras", href: "/rules" },
]);

/** Ações do lado direito da navbar. */
export const accountNav: NavigationItem[] = visible([
  { label: "Seja fundador", href: "/fundadores", enabled: featureFlags.waitlistEnabled },
  { label: "Loja PMO", href: "/store", enabled: featureFlags.storeEnabled },
  { label: "Entrar", href: "/login", enabled: featureFlags.accountsEnabled },
]);

/** Navegação do rodapé. */
export const footerNav = {
  navegacao: visible([
    { label: "Início", href: "/" },
    { label: "Market", href: "/market", enabled: featureFlags.marketEnabled },
    { label: "Atualizações", href: "/updates" },
    { label: "Pokepedia", href: "/pokepedia" },
    { label: "Regras", href: "/rules" },
  ]),
  participar: visible([
    {
      label: "Seja fundador",
      href: "/fundadores",
      enabled: featureFlags.waitlistEnabled,
    },
    { label: "Loja PMO", href: "/store", enabled: featureFlags.storeEnabled },
    { label: "Criar conta", href: "/register", enabled: featureFlags.accountsEnabled },
    { label: "Minha conta", href: "/account", enabled: featureFlags.accountsEnabled },
    { label: "Suporte", href: "/support" },
  ]),
  legal: visible([
    { label: "Termos de uso", href: "/rules#contas" },
    { label: "Política de privacidade", href: "/rules#seguranca" },
    {
      label: "Política do Market",
      href: "/rules#market-rmt",
      enabled: featureFlags.marketEnabled,
    },
    { label: "Política de cookies", href: "/rules#seguranca" },
  ]),
};
