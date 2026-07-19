import type { RuleCategory } from "@/lib/types";

// TODO(equipe): REVISAR TODO O CONTEÚDO com a moderação/jurídico antes de publicar.
// Este é um conteúdo inicial editável — não são regras jurídicas definitivas.
export const rulesLastUpdated = "2026-07-15T00:00:00.000Z";

export const ruleCategories: RuleCategory[] = [
  {
    id: "gerais",
    title: "Regras gerais",
    intro:
      "Diretrizes básicas para uma boa convivência no mundo de PokeMyth Online.",
    rules: [
      {
        id: "g1",
        title: "Respeite outros jogadores e a equipe",
        description:
          "Tratamento respeitoso é obrigatório em todos os canais do jogo e da comunidade.",
        severity: "moderada",
      },
      {
        id: "g2",
        title: "Idioma e comunicação",
        description:
          "Use os canais adequados para cada assunto. Evite spam e flood.",
        severity: "leve",
      },
    ],
  },
  {
    id: "conduta",
    title: "Conduta",
    rules: [
      {
        id: "cd1",
        title: "Proibido assédio e discurso de ódio",
        description:
          "Qualquer forma de assédio, discriminação ou discurso de ódio resulta em punição.",
        severity: "grave",
      },
      {
        id: "cd2",
        title: "Nomes apropriados",
        description:
          "Nomes de personagens e contas não podem ser ofensivos ou enganosos.",
        severity: "moderada",
      },
    ],
  },
  {
    id: "contas",
    title: "Contas",
    rules: [
      {
        id: "ct1",
        title: "Uma pessoa, responsabilidade pela conta",
        description:
          "Você é responsável pela segurança e uso da sua conta e credenciais.",
        severity: "moderada",
      },
      {
        id: "ct2",
        title: "Compartilhamento de conta",
        description:
          "O compartilhamento de conta é desencorajado e feito por sua conta e risco.",
        severity: "leve",
      },
    ],
  },
  {
    id: "comercio",
    title: "Comércio",
    rules: [
      {
        id: "cm1",
        title: "Negocie apenas itens permitidos",
        description:
          "Somente produtos permitidos pelo servidor podem ser comercializados.",
        severity: "moderada",
      },
    ],
  },
  {
    id: "market-rmt",
    title: "Market RMT",
    intro:
      "Regras específicas do Market de jogadores com intermediação da plataforma.",
    rules: [
      {
        id: "rmt1",
        title: "Use apenas o Market oficial",
        description:
          "Negociações com dinheiro real devem ocorrer pelo Market oficial, com compra protegida e transferência automática após confirmação.",
        severity: "grave",
      },
      {
        id: "rmt2",
        title: "Proibido burlar a intermediação",
        description:
          "Tentar contornar a intermediação da plataforma pode resultar em suspensão e perda de acesso ao Market.",
        severity: "grave",
      },
      {
        id: "rmt3",
        title: "Anúncios verdadeiros",
        description:
          "As informações do anúncio devem corresponder ao item real. Anúncios enganosos são removidos.",
        severity: "moderada",
      },
    ],
  },
  {
    id: "seguranca",
    title: "Segurança",
    rules: [
      {
        id: "sg1",
        title: "Nunca compartilhe senhas",
        description:
          "A equipe nunca pedirá sua senha. Desconfie de qualquer pedido nesse sentido.",
        severity: "grave",
      },
      {
        id: "sg2",
        title: "Cuidado com golpes",
        description:
          "Denuncie tentativas de golpe e phishing pelo suporte oficial.",
        severity: "moderada",
      },
    ],
  },
  {
    id: "bugs",
    title: "Bugs e exploração de falhas",
    rules: [
      {
        id: "bg1",
        title: "Reporte bugs, não os explore",
        description:
          "Explorar falhas para obter vantagem é infração grave. Reporte ao suporte.",
        severity: "critica",
      },
    ],
  },
  {
    id: "eventos",
    title: "Eventos",
    rules: [
      {
        id: "ev1",
        title: "Jogo limpo em eventos",
        description:
          "Trapaças em eventos e torneios resultam em desqualificação e punição.",
        severity: "grave",
      },
    ],
  },
  {
    id: "punicoes",
    title: "Punições",
    intro:
      "As punições variam conforme a gravidade e o histórico do jogador. A equipe decide caso a caso.",
    rules: [
      {
        id: "pn1",
        title: "Escalonamento",
        description:
          "Advertência, suspensão temporária e banimento permanente conforme a gravidade.",
        severity: "moderada",
      },
    ],
  },
  {
    id: "reembolso",
    title: "Política de reembolso",
    intro: "TODO(equipe): definir política oficial de reembolso.",
    rules: [
      {
        id: "rb1",
        title: "Compras na Loja PMO",
        description:
          "Reembolsos seguem a legislação aplicável e a política oficial (a definir pela equipe).",
        severity: "leve",
      },
    ],
  },
  {
    id: "suporte",
    title: "Suporte",
    rules: [
      {
        id: "sp1",
        title: "Canais oficiais",
        description:
          "Use a página de Suporte e o Discord oficial para atendimento. Guarde comprovantes de transações.",
        severity: "leve",
      },
    ],
  },
];

export const ruleSeverityMeta = {
  leve: { label: "Leve", tone: "info" as const },
  moderada: { label: "Moderada", tone: "warning" as const },
  grave: { label: "Grave", tone: "danger" as const },
  critica: { label: "Crítica", tone: "danger" as const },
};
