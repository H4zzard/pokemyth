# Services (placeholders)

Estes serviços são **placeholders tipados**. Nenhum retorna sucesso falso de operações
sensíveis (pagamento, transferência de item). Eles:

- retornam **mocks tipados** para leitura (listagens, updates, etc.), ou
- retornam um **erro controlado** (`ServiceUnavailable`) para operações que dependem de
  backend real (pagamento, autenticação real, transferência de item no servidor).

## Como conectar depois

- `auth-service.ts` → Supabase Auth
- `game-api.ts` → API do servidor do jogo
- `market-service.ts` → API/DB do Market
- `payment-service.ts` → gateway de pagamento + webhooks
- `account-service.ts` → Supabase (perfil, saldo, repasses)
- `updates-service.ts` → CMS/DB de atualizações

Todas as funções esperadas pelo backend estão declaradas em cada arquivo.
