import type { MarketTransaction, TransactionStatus } from "@/lib/types";

// TODO: substituir por dados da API do Market (getMarketTransactions()).

export const transactionStatusMeta: Record<
  TransactionStatus,
  { label: string; tone: "pending" | "progress" | "success" | "error" }
> = {
  "aguardando-pagamento": { label: "Aguardando pagamento", tone: "pending" },
  "pagamento-em-analise": { label: "Pagamento em análise", tone: "pending" },
  "pagamento-confirmado": { label: "Pagamento confirmado", tone: "progress" },
  "transferindo-item": { label: "Transferindo item", tone: "progress" },
  "item-transferido": { label: "Item transferido", tone: "progress" },
  "repasse-pendente": { label: "Repasse ao vendedor pendente", tone: "pending" },
  concluida: { label: "Transação concluída", tone: "success" },
  cancelada: { label: "Transação cancelada", tone: "error" },
  "erro-transferencia": { label: "Erro na transferência", tone: "error" },
  disputa: { label: "Em disputa / suporte", tone: "error" },
};

/** Ordem canônica da timeline de uma compra protegida bem-sucedida. */
export const transactionTimeline: TransactionStatus[] = [
  "aguardando-pagamento",
  "pagamento-em-analise",
  "pagamento-confirmado",
  "transferindo-item",
  "item-transferido",
  "repasse-pendente",
  "concluida",
];

export const transactions: MarketTransaction[] = [
  {
    id: "t1",
    listingId: "m3",
    listingTitle: "Fragmento de Éter (x50)",
    listingImage: "/market/item-3.svg",
    role: "compra",
    counterpart: "LunaCristal",
    amount: 39.9,
    platformFee: 3.19,
    netAmount: 36.71,
    status: "concluida",
    createdAt: "2026-07-16T10:00:00.000Z",
    updatedAt: "2026-07-16T10:12:00.000Z",
  },
  {
    id: "t2",
    listingId: "m2",
    listingTitle: "Lâmina do Crepúsculo",
    listingImage: "/market/item-2.svg",
    role: "compra",
    counterpart: "KaelDoTerreno",
    amount: 74.5,
    platformFee: 5.96,
    netAmount: 68.54,
    status: "transferindo-item",
    createdAt: "2026-07-19T09:40:00.000Z",
    updatedAt: "2026-07-19T09:45:00.000Z",
  },
  {
    id: "t3",
    listingId: "m6",
    listingTitle: "Golem de Musgo Nv. 40",
    listingImage: "/market/item-6.svg",
    role: "venda",
    counterpart: "VortexPMO",
    amount: 42.9,
    platformFee: 3.43,
    netAmount: 39.47,
    status: "repasse-pendente",
    createdAt: "2026-07-18T21:00:00.000Z",
    updatedAt: "2026-07-18T21:08:00.000Z",
  },
  {
    id: "t4",
    listingId: "m7",
    listingTitle: "Poção de Renascimento (x10)",
    listingImage: "/market/item-7.svg",
    role: "venda",
    counterpart: "AuroraMyst",
    amount: 18.5,
    platformFee: 1.48,
    netAmount: 17.02,
    status: "aguardando-pagamento",
    createdAt: "2026-07-19T11:30:00.000Z",
    updatedAt: "2026-07-19T11:30:00.000Z",
  },
];
