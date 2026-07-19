/** Resultado padrão dos services placeholders. */
export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export interface ServiceError {
  code:
    | "SERVICE_UNAVAILABLE"
    | "NOT_IMPLEMENTED"
    | "INVALID_INPUT"
    | "NOT_FOUND";
  message: string;
}

export const SERVICE_PENDING: ServiceError = {
  code: "SERVICE_UNAVAILABLE",
  message: "Integração com servidor pendente.",
};

export function ok<T>(data: T): ServiceResult<T> {
  return { ok: true, data };
}

export function fail<T = never>(error: ServiceError = SERVICE_PENDING): ServiceResult<T> {
  return { ok: false, error };
}

/** Simula latência de rede de forma determinística (sem Math.random). */
export function delay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
