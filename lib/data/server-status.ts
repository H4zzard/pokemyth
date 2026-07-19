import type { ServerStatus } from "@/lib/types";

// TODO: substituir por dados da API do servidor (getServerStatus()).
// Valores mockados, centralizados aqui para fácil edição.
export const serverStatus: ServerStatus = {
  online: true,
  playersOnline: 842,
  maxPlayers: 2000,
  version: "v1.14.2",
  worldName: "Mythos",
  lastChecked: "2026-07-19T12:00:00.000Z",
};

export const currentVersion = serverStatus.version;
