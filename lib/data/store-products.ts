import type { StoreCategory, StoreProduct } from "@/lib/types";

// TODO: substituir por dados da loja oficial (API/CMS).
export const storeCategoryLabels: Record<StoreCategory, string> = {
  premium: "Premium",
  cosmeticos: "Cosméticos",
  conveniencias: "Conveniências",
  servicos: "Serviços",
  pacotes: "Pacotes",
  especiais: "Especiais",
};

export const storeProducts: StoreProduct[] = [
  {
    id: "p1",
    name: "Passe Premium — 30 dias",
    category: "premium",
    description:
      "Acesso premium por 30 dias com bônus de progressão, slots extras e vantagens de conveniência.",
    price: 29.9,
    image: "/icons/store-1.svg",
    benefits: [
      "+20% de experiência",
      "Slots extras de personagem",
      "Fila prioritária de login",
    ],
    badge: "Mais popular",
    featured: true,
  },
  {
    id: "p2",
    name: "Baú de Cosméticos Sazonal",
    category: "cosmeticos",
    description:
      "Conjunto de cosméticos temáticos da temporada. Apenas visual — sem impacto em atributos.",
    price: 39.9,
    image: "/icons/store-2.svg",
    benefits: ["3 cosméticos temáticos", "Efeito visual exclusivo", "Título sazonal"],
  },
  {
    id: "p3",
    name: "Expansão de Mochila",
    category: "conveniencias",
    description: "Aumenta permanentemente o espaço de inventário da sua conta.",
    price: 14.9,
    image: "/icons/store-3.svg",
    benefits: ["+40 slots de inventário", "Permanente", "Compartilhado na conta"],
  },
  {
    id: "p4",
    name: "Renomear Personagem",
    category: "servicos",
    description: "Serviço para alterar o nome de um personagem, sujeito às regras de nomes.",
    price: 9.9,
    image: "/icons/store-4.svg",
    benefits: ["1 alteração de nome", "Sujeito às regras de conduta"],
  },
  {
    id: "p5",
    name: "Pacote Aventureiro",
    category: "pacotes",
    description:
      "Pacote inicial com passe premium, expansão de mochila e um cosmético de boas-vindas.",
    price: 49.9,
    image: "/icons/store-5.svg",
    benefits: ["Passe Premium 30 dias", "Expansão de mochila", "Cosmético exclusivo"],
    badge: "Melhor custo-benefício",
    featured: true,
  },
  {
    id: "p6",
    name: "Montaria: Corcel de Éter",
    category: "especiais",
    description:
      "Montaria especial com efeito de partículas magenta. Item de edição especial.",
    price: 59.9,
    image: "/icons/store-6.svg",
    benefits: ["Montaria exclusiva", "Efeito de partículas", "Velocidade cosmética"],
  },
];
