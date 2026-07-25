import { discordInviteUrl } from "./social-links";

/**
 * Waitlist de Players Fundadores.
 *
 * O envio do formulário é feito pela rota `/api/waitlist`, que repassa os dados
 * a um Web App do Google Apps Script (ver `scripts/apps-script/waitlist.gs`).
 * A URL e o segredo ficam **apenas no servidor** — sem `NEXT_PUBLIC_`.
 */
export const waitlistConfig = {
  /** Total de vagas do beta fechado. */
  totalSpots: 10,

  /** Para onde o jogador é redirecionado após o cadastro. */
  redirectUrl: discordInviteUrl,

  /** Segundos de espera antes do redirecionamento automático. */
  redirectDelaySeconds: 5,

  /** Benefícios exibidos na página. TODO(equipe): ajustar a lista final. */
  perks: [
    {
      title: "Tag de Fundador permanente",
      description:
        "Título exclusivo no personagem e cargo próprio no Discord — não será distribuído novamente.",
    },
    {
      title: "Itens cosméticos exclusivos",
      description:
        "Conjunto de cosméticos do beta fechado, aposentado no lançamento oficial.",
    },
    {
      title: "Voz direta no desenvolvimento",
      description:
        "Canal privado com a equipe para sugerir, testar e priorizar sistemas do jogo.",
    },
    {
      title: "Progresso reconhecido",
      description:
        "Recompensas de reconhecimento na conta ao migrar para o servidor oficial.",
    },
  ],
} as const;

/** Configuração do Apps Script — lida somente no servidor. */
export function getWaitlistEndpoint() {
  return {
    url: process.env.WAITLIST_SHEETS_URL ?? "",
    secret: process.env.WAITLIST_SHARED_SECRET ?? "",
  };
}

export function isWaitlistConfigured() {
  const { url, secret } = getWaitlistEndpoint();
  return Boolean(url && secret);
}
