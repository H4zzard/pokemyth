/**
 * Feature flags do portal.
 *
 * Mantêm áreas inteiras do site ligadas/desligadas em um único lugar, sem
 * apagar código. Para reativar algo, basta trocar `false` por `true`.
 */
export const featureFlags = {
  /**
   * Área de conta do jogador: /login, /register e /account.
   *
   * Desligada durante a fase de waitlist de fundadores — as rotas respondem
   * 404 e os links somem da navegação. Reativar quando o Supabase Auth e o
   * servidor do jogo estiverem conectados.
   */
  accountsEnabled: false,

  /**
   * Market entre jogadores (/market).
   *
   * Desligado durante a waitlist — não faz sentido negociar itens antes do
   * servidor abrir. Reativar junto com o gateway de pagamento (lib/payments/).
   */
  marketEnabled: false,

  /**
   * Loja oficial (/store).
   *
   * Desligada durante a waitlist. Reativar quando houver o que vender e o
   * gateway de pagamento estiver conectado.
   */
  storeEnabled: false,

  /** Waitlist de players fundadores (/fundadores). */
  waitlistEnabled: true,
} as const;
