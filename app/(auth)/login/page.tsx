import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { featureFlags } from "@/lib/config/features";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta do PokeMyth Online.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  // Área de conta desligada durante a waitlist de fundadores.
  if (!featureFlags.accountsEnabled) notFound();

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
