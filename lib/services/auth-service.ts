import type { PlayerAccount } from "@/lib/types";
import type { LoginInput, RegisterInput } from "@/lib/schemas";
import { fail, ok, delay, type ServiceResult } from "./types";

// TODO: conectar ao Supabase Auth.
// Nenhuma destas funções finge um cadastro/login real bem-sucedido.

export async function signIn(
  _input: LoginInput
): Promise<ServiceResult<PlayerAccount>> {
  await delay();
  // TODO: supabase.auth.signInWithPassword(...)
  return fail();
}

export async function signUp(
  _input: RegisterInput
): Promise<ServiceResult<{ userId: string }>> {
  await delay();
  // TODO: supabase.auth.signUp(...)
  return fail();
}

export async function signOut(): Promise<ServiceResult<null>> {
  await delay(200);
  // TODO: supabase.auth.signOut()
  return ok(null);
}

export async function resetPassword(
  _email: string
): Promise<ServiceResult<null>> {
  await delay();
  // TODO: supabase.auth.resetPasswordForEmail(...)
  return fail();
}

export async function getCurrentUser(): Promise<ServiceResult<PlayerAccount | null>> {
  await delay(200);
  // TODO: supabase.auth.getUser() + perfil
  return ok(null);
}
