import type { CommunitySuggestion, PlayerAccount } from "@/lib/types";

// TODO: substituir por dados reais (Supabase + getAccountCharacters()).
export const mockAccount: PlayerAccount = {
  id: "acc_001",
  username: "TreinadorMito",
  email: "jogador@exemplo.com",
  avatar: "/icons/avatar.svg",
  status: "ativa",
  createdAt: "2025-03-22T00:00:00.000Z",
  availableBalance: 152.3,
  pendingBalance: 39.47,
  activeListings: 3,
  characters: [
    {
      id: "c1",
      name: "Aurelius",
      world: "Mythos",
      level: 82,
      vocation: "Arcanista",
      lastLogin: "2026-07-19T08:12:00.000Z",
      online: true,
      avatar: "/icons/avatar.svg",
    },
    {
      id: "c2",
      name: "Bruma",
      world: "Mythos",
      level: 47,
      vocation: "Domadora",
      lastLogin: "2026-07-17T22:40:00.000Z",
      online: false,
      avatar: "/icons/avatar.svg",
    },
    {
      id: "c3",
      name: "Ferrus",
      world: "Aurora",
      level: 33,
      vocation: "Guardião",
      lastLogin: "2026-07-10T19:05:00.000Z",
      online: false,
      avatar: "/icons/avatar.svg",
    },
  ],
};

// TODO: substituir por dados da comunidade (API/CMS).
export const communitySuggestions: CommunitySuggestion[] = [
  {
    id: "cs1",
    title: "Sistema de guildas com território",
    description:
      "Permitir que guildas dominem regiões e recebam bônus de recursos por controle de território.",
    status: "em-desenvolvimento",
    votes: 1284,
    comments: 213,
    author: "Comunidade PMO",
    relatedUpdate: "expansao-bosque-cristalino",
  },
  {
    id: "cs2",
    title: "Filtro de raridade no inventário",
    description:
      "Adicionar filtros rápidos por raridade e categoria dentro do inventário do jogo.",
    status: "planejada",
    votes: 862,
    comments: 97,
    author: "AuroraMyst",
  },
  {
    id: "cs3",
    title: "Modo espectador em torneios",
    description:
      "Permitir assistir partidas de torneios da comunidade diretamente pelo cliente.",
    status: "em-analise",
    votes: 540,
    comments: 61,
    author: "VortexPMO",
  },
  {
    id: "cs4",
    title: "Reorganização das mochilas",
    description: "Botão de auto-organizar itens por tipo e raridade.",
    status: "concluida",
    votes: 1750,
    comments: 302,
    author: "LunaCristal",
    relatedUpdate: "novo-sistema-conquistas",
  },
];

export const suggestionStatusMeta: Record<
  CommunitySuggestion["status"],
  { label: string; tone: "pending" | "progress" | "success" }
> = {
  "em-analise": { label: "Em análise", tone: "pending" },
  planejada: { label: "Planejada", tone: "pending" },
  "em-desenvolvimento": { label: "Em desenvolvimento", tone: "progress" },
  concluida: { label: "Concluída", tone: "success" },
};
