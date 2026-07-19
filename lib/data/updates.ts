import type { GameUpdate, UpdateCategory } from "@/lib/types";

// TODO: substituir por dados da API do servidor (getGameUpdates()).
export const updateCategoryLabels: Record<UpdateCategory, string> = {
  conteudo: "Conteúdo",
  evento: "Evento",
  balanceamento: "Balanceamento",
  correcao: "Correção",
  sistema: "Sistema",
  market: "Market",
};

export const updates: GameUpdate[] = [
  {
    id: "u1",
    slug: "expansao-bosque-cristalino",
    version: "v1.14.2",
    title: "Expansão: Bosque Cristalino",
    summary:
      "Uma nova região aberta para exploração, com criaturas inéditas, quests encadeadas e um mini-boss semanal.",
    category: "conteudo",
    date: "2026-07-18T10:00:00.000Z",
    image: "/icons/update-1.svg",
    featured: true,
    changes: [
      {
        title: "Novidades",
        items: [
          "Nova região explorável: Bosque Cristalino, com 3 sub-áreas.",
          "6 novas criaturas colecionáveis, incluindo 1 lendária.",
          "Linha de quests 'Ecos do Cristal' com 8 etapas.",
          "Mini-boss semanal: Guardião de Quartzo.",
        ],
      },
      {
        title: "Melhorias",
        items: [
          "Novo sistema de rastros para criaturas raras.",
          "Ajustes no minimapa para regiões florestais.",
        ],
      },
    ],
  },
  {
    id: "u2",
    slug: "ajustes-economia-market",
    version: "v1.14.1",
    title: "Ajustes na economia e no Market",
    summary:
      "Refinamos taxas, listagens e filtros do Market para negociações mais claras e seguras.",
    category: "market",
    date: "2026-07-16T14:00:00.000Z",
    image: "/icons/update-2.svg",
    changes: [
      {
        title: "Market",
        items: [
          "Novo filtro por status do vendedor (online/offline).",
          "Exibição mais clara da taxa da plataforma no resumo da compra.",
          "Histórico de transações agora mostra a timeline completa.",
        ],
      },
      {
        title: "Correções",
        items: ["Corrigido cálculo do valor líquido em anúncios com quantidade."],
      },
    ],
  },
  {
    id: "u3",
    slug: "balanceamento-vocacoes",
    version: "v1.14.0",
    title: "Balanceamento de vocações",
    summary:
      "Rebalanceamento amplo de habilidades para tornar todas as vocações viáveis no fim de jogo.",
    category: "balanceamento",
    date: "2026-07-13T09:00:00.000Z",
    image: "/icons/update-3.svg",
    changes: [
      {
        title: "Balanceamento",
        items: [
          "Domador: aumento de resistência das criaturas invocadas.",
          "Arcanista: redução de custo de energia das magias de área.",
          "Guardião: novo talento defensivo no nível 60.",
        ],
      },
    ],
  },
  {
    id: "u4",
    slug: "evento-lua-magenta",
    version: "v1.13.9",
    title: "Evento sazonal: Lua Magenta",
    summary:
      "Durante a Lua Magenta, criaturas especiais surgem à noite e recompensas cosméticas são liberadas.",
    category: "evento",
    date: "2026-07-10T18:00:00.000Z",
    image: "/icons/update-4.svg",
    changes: [
      {
        title: "Evento",
        items: [
          "Criaturas noturnas exclusivas durante o período do evento.",
          "Cosméticos temáticos por conquistas.",
          "Ranking semanal com recompensas para os melhores caçadores.",
        ],
      },
    ],
  },
  {
    id: "u5",
    slug: "correcoes-estabilidade",
    version: "v1.13.8",
    title: "Correções e estabilidade",
    summary:
      "Diversas correções de bugs relatados pela comunidade e melhorias de performance do servidor.",
    category: "correcao",
    date: "2026-07-07T11:00:00.000Z",
    image: "/icons/update-1.svg",
    changes: [
      {
        title: "Correções",
        items: [
          "Corrigido travamento ao abrir o inventário em cavernas.",
          "Corrigida sincronização de posição em travessias de barco.",
          "Correção de textos e traduções em NPCs recentes.",
        ],
      },
    ],
  },
  {
    id: "u6",
    slug: "novo-sistema-conquistas",
    version: "v1.13.7",
    title: "Novo sistema de conquistas",
    summary:
      "Conquistas com trilhas de progresso, títulos e recompensas para exploração e coleção.",
    category: "sistema",
    date: "2026-07-04T16:00:00.000Z",
    image: "/icons/update-2.svg",
    changes: [
      {
        title: "Sistema",
        items: [
          "Painel de conquistas com categorias e progresso.",
          "Títulos exibíveis no personagem.",
          "Recompensas por marcos de coleção.",
        ],
      },
    ],
  },
];

export const featuredUpdate = updates.find((u) => u.featured) ?? updates[0];
