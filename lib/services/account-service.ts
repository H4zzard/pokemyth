import type { PlayerAccount } from "@/lib/types";
import { mockAccount } from "@/lib/data/account";
import { ok, delay, type ServiceResult } from "./types";

// TODO: conectar ao Supabase (perfil, saldo, anúncios do jogador).

export async function getAccount(): Promise<ServiceResult<PlayerAccount>> {
  await delay(300);
  // Leitura mockada para exibir a UI da conta.
  return ok(mockAccount);
}
