import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie sua conta e comece sua jornada no PokeMyth Online.",
};

export default function RegisterPage() {
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
