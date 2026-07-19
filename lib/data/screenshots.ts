import type { Screenshot } from "@/lib/types";

// TODO: substituir os SVGs de placeholder por screenshots reais do servidor.
// Basta trocar o `src` por /screenshots/server-XX.webp e ajustar width/height.
export const screenshots: Screenshot[] = [
  {
    id: "s1",
    src: "/screenshots/server-01.svg",
    alt: "Cidade central de PokeMyth Online ao entardecer",
    caption: "Praça central da capital — ponto de encontro dos treinadores",
    width: 1600,
    height: 900,
  },
  {
    id: "s2",
    src: "/screenshots/server-02.svg",
    alt: "Floresta encantada com criaturas selvagens",
    caption: "Bosque Cristalino — habitat de criaturas raras",
    width: 1600,
    height: 900,
  },
  {
    id: "s3",
    src: "/screenshots/server-03.svg",
    alt: "Caverna profunda com veios mágicos",
    caption: "Cavernas de Éter — cuidado com os bosses",
    width: 1600,
    height: 900,
  },
  {
    id: "s4",
    src: "/screenshots/server-04.svg",
    alt: "Vila costeira com barcos e mercado",
    caption: "Porto de Maré — comércio e travessias marítimas",
    width: 1600,
    height: 900,
  },
  {
    id: "s5",
    src: "/screenshots/server-05.svg",
    alt: "Templo antigo no topo da montanha",
    caption: "Santuário do Mito — desafio de fim de jogo",
    width: 1600,
    height: 900,
  },
];
