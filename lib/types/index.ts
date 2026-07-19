// ==========================================================================
// PokeMyth Online — Tipagens centrais
// ==========================================================================

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "discord"
  | "youtube"
  | "tiktok"
  | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Servidor / jogo
// ---------------------------------------------------------------------------

export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  maxPlayers: number;
  version: string;
  worldName: string;
  lastChecked: string; // ISO
}

export interface Screenshot {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

// ---------------------------------------------------------------------------
// Atualizações
// ---------------------------------------------------------------------------

export type UpdateCategory =
  | "conteudo"
  | "evento"
  | "balanceamento"
  | "correcao"
  | "sistema"
  | "market";

export interface UpdateChangeGroup {
  title: string;
  items: string[];
}

export interface GameUpdate {
  id: string;
  slug: string;
  version: string;
  title: string;
  summary: string;
  category: UpdateCategory;
  date: string; // ISO
  image?: string;
  featured?: boolean;
  changes: UpdateChangeGroup[];
}

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------

export type EventStatus = "em-breve" | "ativo" | "encerrado";
export type EventType = "sazonal" | "boss" | "torneio" | "comunidade";

export interface GameEvent {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  date: string; // ISO ou período textual
  description: string;
  image?: string;
  rewards?: string[];
}

// ---------------------------------------------------------------------------
// Raridade compartilhada
// ---------------------------------------------------------------------------

export type Rarity =
  | "comum"
  | "incomum"
  | "raro"
  | "epico"
  | "lendario"
  | "mitico";

// ---------------------------------------------------------------------------
// Market RMT
// ---------------------------------------------------------------------------

export type MarketCategory =
  | "criaturas"
  | "itens"
  | "equipamentos"
  | "recursos"
  | "colecionaveis"
  | "outros";

export interface MarketSeller {
  id: string;
  name: string;
  online: boolean;
  rating: number; // 0-5
  totalSales: number;
  memberSince: string; // ISO
}

export interface MarketListing {
  id: string;
  title: string;
  category: MarketCategory;
  rarity: Rarity;
  quantity: number;
  price: number; // em reais
  images: string[];
  attributes: { label: string; value: string }[];
  description: string;
  seller: MarketSeller;
  world: string;
  createdAt: string; // ISO
  salesCount: number;
}

export type TransactionStatus =
  | "aguardando-pagamento"
  | "pagamento-em-analise"
  | "pagamento-confirmado"
  | "transferindo-item"
  | "item-transferido"
  | "repasse-pendente"
  | "concluida"
  | "cancelada"
  | "erro-transferencia"
  | "disputa";

export interface MarketTransaction {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage?: string;
  role: "compra" | "venda";
  counterpart: string; // nome do outro jogador
  amount: number;
  platformFee: number;
  netAmount: number;
  status: TransactionStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// ---------------------------------------------------------------------------
// Conta do jogador
// ---------------------------------------------------------------------------

export interface Character {
  id: string;
  name: string;
  world: string;
  level: number;
  vocation: string;
  lastLogin: string; // ISO
  online: boolean;
  avatar?: string;
}

export interface PlayerAccount {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: "ativa" | "suspensa" | "verificacao";
  createdAt: string; // ISO
  availableBalance: number;
  pendingBalance: number;
  activeListings: number;
  characters: Character[];
}

// ---------------------------------------------------------------------------
// Loja oficial
// ---------------------------------------------------------------------------

export type StoreCategory =
  | "premium"
  | "cosmeticos"
  | "conveniencias"
  | "servicos"
  | "pacotes"
  | "especiais";

export interface StoreProduct {
  id: string;
  name: string;
  category: StoreCategory;
  description: string;
  price: number;
  image?: string;
  benefits: string[];
  badge?: string;
  featured?: boolean;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Pokepedia
// ---------------------------------------------------------------------------

export type PokepediaCategory =
  | "criaturas"
  | "itens"
  | "regioes"
  | "quests"
  | "bosses"
  | "npcs"
  | "sistemas"
  | "profissoes";

export interface PokepediaEntry {
  id: string;
  slug: string;
  name: string;
  category: PokepediaCategory;
  rarity?: Rarity;
  region?: string;
  type?: string;
  summary: string;
  image?: string;
  details?: { label: string; value: string }[];
  related?: string[]; // slugs
}

// ---------------------------------------------------------------------------
// Regras
// ---------------------------------------------------------------------------

export type RuleSeverity = "leve" | "moderada" | "grave" | "critica";

export interface RuleItem {
  id: string;
  title: string;
  description: string;
  severity?: RuleSeverity;
}

export interface RuleCategory {
  id: string;
  title: string;
  intro?: string;
  rules: RuleItem[];
}

// ---------------------------------------------------------------------------
// Comunidade
// ---------------------------------------------------------------------------

export type SuggestionStatus =
  | "em-analise"
  | "planejada"
  | "em-desenvolvimento"
  | "concluida";

export interface CommunitySuggestion {
  id: string;
  title: string;
  description: string;
  status: SuggestionStatus;
  votes: number;
  comments: number;
  author: string;
  relatedUpdate?: string;
}

// ---------------------------------------------------------------------------
// Suporte
// ---------------------------------------------------------------------------

export type SupportCategory =
  | "conta"
  | "pagamento"
  | "market"
  | "bug"
  | "denuncia"
  | "outro";

export interface SupportTicket {
  subject: string;
  category: SupportCategory;
  email: string;
  message: string;
}
