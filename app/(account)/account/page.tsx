import type { Metadata } from "next";
import { AccountDashboard } from "@/components/account/account-dashboard";
import { mockAccount } from "@/lib/data/account";
import { transactions } from "@/lib/data/transactions";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Painel do jogador PokeMyth Online.",
};

export default function AccountPage() {
  // TODO: substituir por account-service.getAccount() + dados reais (Supabase).
  return <AccountDashboard account={mockAccount} transactions={transactions} />;
}
