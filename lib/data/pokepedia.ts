import type { PokepediaCategory, PokepediaEntry } from "@/lib/types";

// TODO: substituir por dados oficiais da Pokepedia (API/CMS).
// Criaturas e nomes são originais do PokeMyth Online.
export const pokepediaCategoryLabels: Record<PokepediaCategory, string> = {
  criaturas: "Criaturas",
  itens: "Itens",
  regioes: "Regiões",
  quests: "Quests",
  bosses: "Bosses",
  npcs: "NPCs",
  sistemas: "Sistemas",
  profissoes: "Profissões",
};

export const pokepediaEntries: PokepediaEntry[] = [
  {
    id: "pk1",
    slug: "dracaurora",
    name: "Dracaurora",
    category: "criaturas",
    rarity: "lendario",
    region: "Santuário do Mito",
    type: "Arcano / Voador",
    summary:
      "Criatura lendária ligada à energia da aurora. Domina magias arcanas e voo prolongado.",
    image: "/pokepedia/entry-1.svg",
    details: [
      { label: "Habitat", value: "Picos do Santuário" },
      { label: "Dieta", value: "Cristais de éter" },
      { label: "Fraqueza", value: "Terra" },
    ],
    related: ["golem-de-musgo", "santuario-do-mito"],
  },
  {
    id: "pk2",
    slug: "golem-de-musgo",
    name: "Golem de Musgo",
    category: "criaturas",
    rarity: "raro",
    region: "Bosque Cristalino",
    type: "Terra",
    summary:
      "Guardião silencioso das florestas, resistente e leal quando domado com paciência.",
    image: "/pokepedia/entry-2.svg",
    details: [
      { label: "Habitat", value: "Bosque Cristalino" },
      { label: "Temperamento", value: "Defensivo" },
      { label: "Fraqueza", value: "Fogo" },
    ],
    related: ["bosque-cristalino"],
  },
  {
    id: "pk3",
    slug: "fragmento-de-eter",
    name: "Fragmento de Éter",
    category: "itens",
    rarity: "raro",
    type: "Recurso",
    summary:
      "Recurso mágico usado em encantamentos avançados e no refino de equipamentos de fim de jogo.",
    image: "/pokepedia/entry-3.svg",
    details: [
      { label: "Fonte", value: "Cavernas de Éter" },
      { label: "Uso", value: "Encantamento / Refino" },
    ],
    related: ["cavernas-de-eter"],
  },
  {
    id: "pk4",
    slug: "bosque-cristalino",
    name: "Bosque Cristalino",
    category: "regioes",
    region: "Zona Central",
    type: "Floresta",
    summary:
      "Região florestal repleta de cristais vivos, criaturas raras e trilhas de quests encadeadas.",
    image: "/pokepedia/entry-4.svg",
    details: [
      { label: "Nível recomendado", value: "35–55" },
      { label: "Sub-áreas", value: "3" },
    ],
    related: ["golem-de-musgo", "ecos-do-cristal"],
  },
  {
    id: "pk5",
    slug: "ecos-do-cristal",
    name: "Ecos do Cristal",
    category: "quests",
    type: "Linha de quests",
    summary:
      "Cadeia de 8 quests que revela a origem dos cristais do bosque e recompensa com equipamento raro.",
    image: "/pokepedia/entry-5.svg",
    details: [
      { label: "Etapas", value: "8" },
      { label: "Dificuldade", value: "Média" },
    ],
    related: ["bosque-cristalino"],
  },
  {
    id: "pk6",
    slug: "guardiao-de-quartzo",
    name: "Guardião de Quartzo",
    category: "bosses",
    rarity: "epico",
    region: "Bosque Cristalino",
    type: "Boss semanal",
    summary:
      "Mini-boss semanal que protege o coração do bosque. Recompensa recursos raros e cosméticos.",
    image: "/pokepedia/entry-6.svg",
    details: [
      { label: "Reaparecimento", value: "Semanal" },
      { label: "Grupo sugerido", value: "3–5 jogadores" },
    ],
    related: ["bosque-cristalino", "fragmento-de-eter"],
  },
  {
    id: "pk7",
    slug: "mestra-eldra",
    name: "Mestra Eldra",
    category: "npcs",
    region: "Capital",
    type: "NPC de quests",
    summary:
      "Mentora dos treinadores iniciantes; oferece as primeiras quests e orientações do mundo.",
    image: "/pokepedia/entry-7.svg",
    details: [
      { label: "Local", value: "Praça central da Capital" },
      { label: "Função", value: "Tutorial / Quests" },
    ],
  },
  {
    id: "pk8",
    slug: "sistema-de-conquistas",
    name: "Sistema de Conquistas",
    category: "sistemas",
    type: "Sistema",
    summary:
      "Trilhas de conquistas por exploração, coleção e combate, com títulos e recompensas.",
    image: "/pokepedia/entry-8.svg",
    details: [
      { label: "Categorias", value: "Exploração, Coleção, Combate" },
      { label: "Recompensas", value: "Títulos e cosméticos" },
    ],
  },
];
