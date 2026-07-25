import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { featureFlags } from "@/lib/config/features";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie sua conta e comece sua jornada no PokeMyth Online.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  // Área de conta desligada durante a waitlist de fundadores.
  if (!featureFlags.accountsEnabled) notFound();

  return (
    <div>
      <h1 className="heading-display text-center text-2xl">Criar conta</h1>
      <p className="mb-6 mt-1 text-center text-sm text-muted">
        Comece a construir o seu próprio mito.
      </p>
      <AuthForm mode="register" />
    </div>
  );
}
