import type { GameEvent } from "@/lib/types";

// TODO: substituir por dados da API do servidor (getGameEvents()).
// Datas são ilustrativas — a equipe deve definir as datas oficiais.
export const events: GameEvent[] = [
  {
    id: "e1",
    name: "Festival da Lua Magenta",
    type: "sazonal",
    status: "ativo",
    date: "Durante todo o mês do evento",
    description:
      "Criaturas noturnas exclusivas surgem no mundo e desafios sazonais liberam recompensas cosméticas temáticas.",
    image: "/icons/event-1.svg",
    rewards: ["Cosméticos exclusivos", "Título 'Filho da Lua'", "Criatura sazonal"],
  },
  {
    id: "e2",
    name: "Despertar do Colosso",
    type: "boss",
    status: "em-breve",
    date: "Anunciado em breve",
    description:
      "Um boss mundial desperta nas Cavernas de Éter. Reúna sua comunidade para enfrentá-lo em batalhas de servidor inteiro.",
    image: "/icons/event-2.svg",
    rewards: ["Equipamento lendário", "Recursos raros", "Placa de honra"],
  },
  {
    id: "e3",
    name: "Torneio dos Domadores",
    type: "torneio",
    status: "encerrado",
    date: "Edição anterior encerrada",
    description:
      "Competição PvP da comunidade com fases eliminatórias, transmissões e premiações para os melhores treinadores.",
    image: "/icons/event-3.svg",
    rewards: ["Coroa do Campeão", "Moeda do evento", "Destaque no hall da fama"],
  },
];
