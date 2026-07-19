import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta do PokeMyth Online.",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="heading-display text-center text-2xl">Entrar</h1>
      <p className="mb-6 mt-1 text-center text-sm text-muted">
        Bem-vindo de volta, treinador.
      </p>
      <AuthForm mode="login" />
    </div>
  );
}
