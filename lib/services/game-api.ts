import type {
  Character,
  GameEvent,
  GameUpdate,
  ServerStatus,
} from "@/lib/types";
import { serverStatus } from "@/lib/data/server-status";
import { events } from "@/lib/data/events";
import { updates } from "@/lib/data/updates";
import { mockAccount } from "@/lib/data/account";
import { fail, ok, delay, type ServiceResult } from "./types";

// TODO: conectar à API do servidor do jogo.
// Leituras retornam mocks; ações sensíveis retornam erro controlado.

export async function getServerStatus(): Promise<ServiceResult<ServerStatus>> {
  await delay(200);
  return ok(serverStatus);
}

export async function getOnlinePlayers(): Promise<ServiceResult<number>> {
  await delay(200);
  return ok(serverStatus.playersOnline);
}

export async function getAccountCharacters(): Promise<ServiceResult<Character[]>> {
  await delay(300);
  return ok(mockAccount.characters);
}

export async function getCharacterDetails(
  id: string
): Promise<ServiceResult<Character>> {
  await delay(300);
  const character = mockAccount.characters.find((c) => c.id === id);
  if (!character) {
    return fail({ code: "NOT_FOUND", message: "Personagem não encontrado." });
  }
  return ok(character);
}

export async function getPlayerInventory(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: exige API do servidor.
  return fail();
}

export async function validateMarketItem(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: validar posse do item no servidor antes de anunciar.
  return fail();
}

export async function transferMarketItem(): Promise<ServiceResult<never>> {
  await delay();
  // TODO: transferência real ocorre apenas após confirmação de pagamento no servidor.
  return fail();
}

export async function getGameEvents(): Promise<ServiceResult<GameEvent[]>> {
  await delay(200);
  return ok(events);
}

export async function getGameUpdates(): Promise<ServiceResult<GameUpdate[]>> {
  await delay(200);
  return ok(updates);
}
