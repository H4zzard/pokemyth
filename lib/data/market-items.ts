import type {
  MarketCategory,
  MarketListing,
  MarketSeller,
  Rarity,
} from "@/lib/types";

// TODO: substituir por dados da API/Market (getMarketListings()).

export const marketCategoryLabels: Record<MarketCategory, string> = {
  criaturas: "Criaturas",
  itens: "Itens",
  equipamentos: "Equipamentos",
  recursos: "Recursos",
  colecionaveis: "Colecionáveis",
  outros: "Outros",
};

export const rarityLabels: Record<Rarity, string> = {
  comum: "Comum",
  incomum: "Incomum",
  raro: "Raro",
  epico: "Épico",
  lendario: "Lendário",
  mitico: "Mítico",
};

const sellers: MarketSeller[] = [
  {
    id: "sel1",
    name: "AuroraMyst",
    online: true,
    rating: 4.9,
    totalSales: 214,
    memberSince: "2025-02-11T00:00:00.000Z",
  },
  {
    id: "sel2",
    name: "KaelDoTerreno",
    online: false,
    rating: 4.7,
    totalSales: 98,
    memberSince: "2025-06-03T00:00:00.000Z",
  },
  {
    id: "sel3",
    name: "LunaCristal",
    online: true,
    rating: 5.0,
    totalSales: 340,
    memberSince: "2024-11-20T00:00:00.000Z",
  },
  {
    id: "sel4",
    name: "VortexPMO",
    online: false,
    rating: 4.5,
    totalSales: 56,
    memberSince: "2026-01-15T00:00:00.000Z",
  },
];

export const marketListings: MarketListing[] = [
  {
    id: "m1",
    title: "Dracaurora Nv. 78",
    category: "criaturas",
    rarity: "lendario",
    quantity: 1,
    price: 189.9,
    images: ["/market/item-1.svg"],
    attributes: [
      { label: "Nível", value: "78" },
      { label: "Tipo", value: "Arcano / Voador" },
      { label: "Talentos", value: "4 desbloqueados" },
    ],
    description:
      "Criatura lendária Dracaurora, criada com foco em dano arcano. Inclui talentos raros já desbloqueados e cosmético de asas cintilantes.",
    seller: sellers[0],
    world: "Mythos",
    createdAt: "2026-07-18T09:30:00.000Z",
    salesCount: 0,
  },
  {
    id: "m2",
    title: "Lâmina do Crepúsculo",
    category: "equipamentos",
    rarity: "epico",
    quantity: 1,
    price: 74.5,
    images: ["/market/item-2.svg"],
    attributes: [
      { label: "Dano", value: "+142" },
      { label: "Atributo", value: "+8% crítico" },
      { label: "Slot", value: "Arma principal" },
    ],
    description:
      "Espada épica com bônus de crítico, ideal para vocações corpo a corpo no fim de jogo.",
    seller: sellers[1],
    world: "Mythos",
    createdAt: "2026-07-17T20:10:00.000Z",
    salesCount: 12,
  },
  {
    id: "m3",
    title: "Fragmento de Éter (x50)",
    category: "recursos",
    rarity: "raro",
    quantity: 50,
    price: 39.9,
    images: ["/market/item-3.svg"],
    attributes: [
      { label: "Quantidade", value: "50 unidades" },
      { label: "Uso", value: "Refino e encantamentos" },
    ],
    description:
      "Lote de fragmentos de éter usados em encantamentos avançados e refino de equipamentos.",
    seller: sellers[2],
    world: "Mythos",
    createdAt: "2026-07-17T15:45:00.000Z",
    salesCount: 87,
  },
  {
    id: "m4",
    title: "Amuleto do Guardião",
    category: "itens",
    rarity: "epico",
    quantity: 1,
    price: 58.0,
    images: ["/market/item-4.svg"],
    attributes: [
      { label: "Defesa", value: "+64" },
      { label: "Efeito", value: "Reduz dano recebido 6%" },
    ],
    description:
      "Amuleto defensivo procurado por tanks. Efeito de mitigação passiva de dano.",
    seller: sellers[0],
    world: "Aurora",
    createdAt: "2026-07-16T11:20:00.000Z",
    salesCount: 5,
  },
  {
    id: "m5",
    title: "Skin: Asas Prismáticas",
    category: "colecionaveis",
    rarity: "mitico",
    quantity: 1,
    price: 129.0,
    images: ["/market/item-5.svg"],
    attributes: [
      { label: "Tipo", value: "Cosmético" },
      { label: "Raridade", value: "Mítico" },
    ],
    description:
      "Cosmético mítico de edição limitada. Apenas visual — não altera atributos.",
    seller: sellers[2],
    world: "Mythos",
    createdAt: "2026-07-15T08:00:00.000Z",
    salesCount: 3,
  },
  {
    id: "m6",
    title: "Golem de Musgo Nv. 40",
    category: "criaturas",
    rarity: "raro",
    quantity: 1,
    price: 42.9,
    images: ["/market/item-6.svg"],
    attributes: [
      { label: "Nível", value: "40" },
      { label: "Tipo", value: "Terra" },
    ],
    description:
      "Criatura de terra resistente, ótima para iniciantes na progressão de meio de jogo.",
    seller: sellers[3],
    world: "Mythos",
    createdAt: "2026-07-14T19:00:00.000Z",
    salesCount: 21,
  },
  {
    id: "m7",
    title: "Poção de Renascimento (x10)",
    category: "recursos",
    rarity: "incomum",
    quantity: 10,
    price: 18.5,
    images: ["/market/item-7.svg"],
    attributes: [
      { label: "Quantidade", value: "10 unidades" },
      { label: "Efeito", value: "Revive com 50% de vida" },
    ],
    description: "Pacote de poções de renascimento para caçadas de alto risco.",
    seller: sellers[1],
    world: "Aurora",
    createdAt: "2026-07-13T13:30:00.000Z",
    salesCount: 140,
  },
  {
    id: "m8",
    title: "Elmo Rúnico",
    category: "equipamentos",
    rarity: "raro",
    quantity: 1,
    price: 33.0,
    images: ["/market/item-8.svg"],
    attributes: [
      { label: "Defesa", value: "+38" },
      { label: "Bônus", value: "+5% energia máxima" },
    ],
    description: "Elmo com runas de energia, bom custo-benefício para arcanistas.",
    seller: sellers[3],
    world: "Mythos",
    createdAt: "2026-07-12T10:15:00.000Z",
    salesCount: 9,
  },
];

/** Taxa da plataforma (informativa). TODO: mover para config do servidor. */
export const PLATFORM_FEE_RATE = 0.08;

export function calcPlatformFee(price: number): number {
  return Math.round(price * PLATFORM_FEE_RATE * 100) / 100;
}

export function calcNetAmount(price: number): number {
  return Math.round((price - calcPlatformFee(price)) * 100) / 100;
}
