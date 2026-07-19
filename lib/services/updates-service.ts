import type { GameUpdate } from "@/lib/types";
import { updates } from "@/lib/data/updates";
import { fail, ok, delay, type ServiceResult } from "./types";

// TODO: conectar ao CMS/DB de atualizações.

export async function getUpdates(): Promise<ServiceResult<GameUpdate[]>> {
  await delay(200);
  return ok(updates);
}

export async function getUpdate(
  slug: string
): Promise<ServiceResult<GameUpdate>> {
  await delay(200);
  const update = updates.find((u) => u.slug === slug);
  if (!update) {
    return fail({ code: "NOT_FOUND", message: "Atualização não encontrada." });
  }
  return ok(update);
}
