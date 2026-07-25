import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountDashboard } from "@/components/account/account-dashboard";
import { mockAccount } from "@/lib/data/account";
import { transactions } from "@/lib/data/transactions";
import { featureFlags } from "@/lib/config/features";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Painel do jogador PokeMyth Online.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  // Área de conta desligada durante a waitlist de fundadores.
  if (!featureFlags.accountsEnabled) notFound();

  // TODO: substituir por account-service.getAccount() + dados reais (Supabase).
  return <AccountDashboard account={mockAccount} transactions={transactions} />;
}
