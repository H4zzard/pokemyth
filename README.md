# PokeMyth Online — Portal (PMO)

Portal oficial do MMORPG 2D **PokeMyth Online**, no estilo PokeTibia. Base visual e
estrutural completa: página inicial, Market de jogadores (RMT), atualizações,
Pokepedia, regras, conta do jogador, loja oficial e suporte.

> Esta versão **não conecta pagamento real nem servidor real**. Toda a UI, fluxos e
> dados são mockados e tipados, prontos para integração.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion ·
Embla Carousel · React Hook Form · Zod · lucide-react.

## Executar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir build
npm run lint     # ESLint
npm run typecheck
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (hero, screenshots, mundo vivo, Market, updates, comunidade, eventos, Pokepedia, CTA) |
| `/market` | Market RMT: filtros, ordenação, paginação, modal de anúncio, checkout, venda |
| `/updates` | Changelog com busca e filtros |
| `/pokepedia` + `/pokepedia/[slug]` | Enciclopédia + detalhes |
| `/rules` | Regras com sumário sticky e busca |
| `/login`, `/register` | Autenticação (validada, mockada) |
| `/account` | Painel do jogador |
| `/store` | Loja PMO com carrinho e checkout mockado |
| `/support` | Central de suporte |

## Assets

- Logo: `public/brand/pokemyth-logo.png` (fornecida — **não substituir a identidade**)
- Banner/hero: `public/hero/pokemyth-hero.png` (fornecido)
- Placeholders SVG (screenshots, itens, pokepedia, eventos, loja): gerados por
  `scripts/gen-placeholders.mjs`. **Substituir por imagens reais.**

### Trocar screenshots

Coloque as imagens em `public/screenshots/` e edite `lib/data/screenshots.ts`
(troque `src`, `width`, `height`, `alt`, `caption`).

## Configuração central

- `lib/config/site.ts` — nome, descrição, URL, aviso legal
- `lib/config/navigation.ts` — menus
- `lib/config/social-links.ts` — **redes sociais e link do Discord** (via env)

## Dados mockados

Tudo em `lib/data/*` marcado com `// TODO: substituir por dados da API…`.

## Integrações pendentes

Serviços placeholder tipados em `lib/services/` (ver `lib/services/README.md`):

- **Supabase Auth** → `auth-service.ts`
- **API do jogo** → `game-api.ts` (status, personagens, transferência de item)
- **Market** → `market-service.ts`
- **Pagamentos** → `payment-service.ts` (nenhuma função simula sucesso)
- **Conta** → `account-service.ts`
- **Atualizações** → `updates-service.ts`

Leituras retornam mocks; operações sensíveis retornam erro controlado
(`SERVICE_UNAVAILABLE`) — a UI mostra "Integração com servidor pendente."

## Variáveis de ambiente

Copie `.env.example` → `.env.local` e preencha (Supabase, API do jogo, gateway de
pagamento, Discord). **Nenhuma chave está no código.**
