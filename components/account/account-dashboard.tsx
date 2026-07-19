"use client";

import * as React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  Tag,
  Wallet,
  History,
  ShieldCheck,
  Bell,
  LifeBuoy,
  Info,
} from "lucide-react";
import type { MarketTransaction, PlayerAccount } from "@/lib/types";
import { CharacterCard } from "./character-card";
import { TransactionCard } from "./transaction-card";
import { StatusBadge } from "@/components/shared/badges";
import { EmptyState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TransactionTimeline } from "@/components/market/transaction-timeline";
import { formatBRL, formatDate, cn } from "@/lib/utils";

type SectionId =
  | "visao"
  | "personagens"
  | "market"
  | "compras"
  | "vendas"
  | "carteira"
  | "historico"
  | "seguranca"
  | "notificacoes"
  | "suporte";

const sections: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: "visao", label: "Visão geral", icon: LayoutDashboard },
    { id: "personagens", label: "Personagens", icon: Users },
    { id: "market", label: "Market", icon: Store },
    { id: "compras", label: "Compras", icon: ShoppingCart },
    { id: "vendas", label: "Vendas", icon: Tag },
    { id: "carteira", label: "Carteira e repasses", icon: Wallet },
    { id: "historico", label: "Histórico", icon: History },
    { id: "seguranca", label: "Segurança", icon: ShieldCheck },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "suporte", label: "Suporte", icon: LifeBuoy },
  ];

export function AccountDashboard({
  account,
  transactions,
}: {
  account: PlayerAccount;
  transactions: MarketTransaction[];
}) {
  const [section, setSection] = React.useState<SectionId>("visao");
  const [openTx, setOpenTx] = React.useState<MarketTransaction | null>(null);

  const purchases = transactions.filter((t) => t.role === "compra");
  const sales = transactions.filter((t) => t.role === "venda");

  return (
    <div className="container pb-24">
      {/* Cabeçalho da conta */}
      <div className="panel mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-magenta/30 clip-chamfer-sm bg-bg">
          {account.avatar && (
            <Image src={account.avatar} alt="" fill sizes="64px" className="object-cover" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="heading-display text-2xl">{account.username}</h1>
            <StatusBadge tone={account.status === "ativa" ? "success" : "pending"}>
              {account.status === "ativa" ? "Conta ativa" : "Verificação"}
            </StatusBadge>
          </div>
          <p className="text-sm text-muted">
            {account.email} · Membro desde {formatDate(account.createdAt)}
          </p>
        </div>
        <AccountBalance account={account} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <AccountSidebar current={section} onChange={setSection} />

        <div>
          {section === "visao" && (
            <Overview account={account} transactions={transactions} onOpenTx={setOpenTx} />
          )}
          {section === "personagens" && (
            <SectionWrap title="Personagens">
              <div className="grid gap-4 sm:grid-cols-2">
                {account.characters.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
              </div>
            </SectionWrap>
          )}
          {section === "market" && (
            <SectionWrap title="Meus anúncios no Market">
              {account.activeListings > 0 ? (
                <div className="panel p-6">
                  <p className="text-sm text-muted">
                    Você tem{" "}
                    <span className="font-semibold text-ink">
                      {account.activeListings} anúncios ativos
                    </span>
                    . O gerenciamento completo será ativado ao conectar o Market.
                  </p>
                </div>
              ) : (
                <EmptyState title="Nenhum anúncio ativo" description="Crie um anúncio no Market." />
              )}
            </SectionWrap>
          )}
          {section === "compras" && (
            <TransactionList title="Compras" items={purchases} onOpen={setOpenTx} />
          )}
          {section === "vendas" && (
            <TransactionList title="Vendas" items={sales} onOpen={setOpenTx} />
          )}
          {section === "carteira" && <Wallet_ account={account} />}
          {section === "historico" && (
            <TransactionList title="Histórico de transações" items={transactions} onOpen={setOpenTx} />
          )}
          {section === "seguranca" && <Security />}
          {section === "notificacoes" && <Notifications />}
          {section === "suporte" && <SupportSection />}
        </div>
      </div>

      {/* Detalhe de transação */}
      <Dialog
        open={!!openTx}
        onClose={() => setOpenTx(null)}
        title={openTx?.listingTitle}
        size="md"
      >
        {openTx && (
          <div>
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <Field label="Tipo" value={openTx.role === "compra" ? "Compra" : "Venda"} />
              <Field label="Contraparte" value={openTx.counterpart} />
              <Field label="Valor" value={formatBRL(openTx.amount)} />
              <Field label="Taxa" value={formatBRL(openTx.platformFee)} />
              <Field label="Valor líquido" value={formatBRL(openTx.netAmount)} />
              <Field label="Data" value={formatDate(openTx.createdAt)} />
            </div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Andamento</h3>
            <TransactionTimeline current={openTx.status} />
          </div>
        )}
      </Dialog>
    </div>
  );
}

function AccountBalance({ account }: { account: PlayerAccount }) {
  return (
    <div className="flex gap-6 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted">Disponível</p>
        <p className="font-display text-lg font-semibold text-emerald-300">
          {formatBRL(account.availableBalance)}
        </p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted">Pendente</p>
        <p className="font-display text-lg font-semibold text-gold">
          {formatBRL(account.pendingBalance)}
        </p>
      </div>
    </div>
  );
}

function AccountSidebar({
  current,
  onChange,
}: {
  current: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <aside>
      <nav
        className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
        aria-label="Seções da conta"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            aria-current={current === s.id ? "true" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 border-l-2 px-3 py-2 text-sm transition-colors lg:w-full",
              current === s.id
                ? "border-magenta bg-magenta/10 text-ink"
                : "border-transparent text-muted hover:border-magenta/40 hover:text-ink"
            )}
          >
            <s.icon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">{s.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Overview({
  account,
  transactions,
  onOpenTx,
}: {
  account: PlayerAccount;
  transactions: MarketTransaction[];
  onOpenTx: (t: MarketTransaction) => void;
}) {
  const stats = [
    { label: "Anúncios ativos", value: account.activeListings },
    { label: "Personagens", value: account.characters.length },
    { label: "Compras", value: transactions.filter((t) => t.role === "compra").length },
    { label: "Vendas", value: transactions.filter((t) => t.role === "venda").length },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="panel p-4">
            <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 border border-gold/25 bg-gold/5 p-3 clip-chamfer-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <p className="text-xs text-muted">
          Dados exibidos são de demonstração. A conexão com o servidor e o Market
          está pendente de integração.
        </p>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-ink">
          Atividade recente
        </h3>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((t) => (
            <TransactionCard key={t.id} transaction={t} onOpen={onOpenTx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionList({
  title,
  items,
  onOpen,
}: {
  title: string;
  items: MarketTransaction[];
  onOpen: (t: MarketTransaction) => void;
}) {
  return (
    <SectionWrap title={title}>
      {items.length === 0 ? (
        <EmptyState title={`Nenhuma ${title.toLowerCase()}`} description="Ainda não há registros aqui." />
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <TransactionCard key={t.id} transaction={t} onOpen={onOpen} />
          ))}
        </div>
      )}
    </SectionWrap>
  );
}

function Wallet_({ account }: { account: PlayerAccount }) {
  return (
    <SectionWrap title="Carteira e repasses">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="panel p-6">
          <p className="text-xs uppercase tracking-wide text-muted">Saldo disponível</p>
          <p className="mt-1 font-display text-3xl font-semibold text-emerald-300">
            {formatBRL(account.availableBalance)}
          </p>
          <Button className="mt-4 w-full" disabled>
            Solicitar repasse
          </Button>
          <p className="mt-2 text-[11px] text-muted/70">
            Repasse indisponível — integração de pagamentos pendente.
          </p>
        </div>
        <div className="panel p-6">
          <p className="text-xs uppercase tracking-wide text-muted">Saldo pendente</p>
          <p className="mt-1 font-display text-3xl font-semibold text-gold">
            {formatBRL(account.pendingBalance)}
          </p>
          <p className="mt-4 text-sm text-muted">
            Valores de vendas ficam pendentes até a confirmação e liberação da
            transação.
          </p>
        </div>
      </div>
    </SectionWrap>
  );
}

function Security() {
  return (
    <SectionWrap title="Segurança">
      <div className="space-y-3">
        {[
          { title: "Senha", desc: "Altere sua senha periodicamente.", cta: "Alterar senha" },
          { title: "Verificação em duas etapas", desc: "Adicione uma camada extra de proteção.", cta: "Configurar" },
          { title: "Sessões ativas", desc: "Gerencie dispositivos conectados.", cta: "Ver sessões" },
        ].map((item) => (
          <div key={item.title} className="panel flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-ink">{item.title}</p>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
            <Button variant="secondary" size="sm" disabled>
              {item.cta}
            </Button>
          </div>
        ))}
        <p className="text-[11px] text-muted/70">Ações desabilitadas — integração de conta pendente.</p>
      </div>
    </SectionWrap>
  );
}

function Notifications() {
  return (
    <SectionWrap title="Notificações">
      <EmptyState
        icon={Bell}
        title="Sem notificações"
        description="Você está em dia! Alertas de transações e do servidor aparecerão aqui."
      />
    </SectionWrap>
  );
}

function SupportSection() {
  return (
    <SectionWrap title="Suporte">
      <div className="panel p-6">
        <p className="text-sm text-muted">
          Precisa de ajuda com sua conta ou uma transação? Abra uma solicitação
          na central de suporte.
        </p>
        <a href="/support">
          <Button className="mt-4">
            <LifeBuoy className="h-4 w-4" /> Ir para o suporte
          </Button>
        </a>
      </div>
    </SectionWrap>
  );
}

function SectionWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 heading-display text-xl">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-bg/40 p-2.5 clip-chamfer-sm">
      <p className="text-[11px] uppercase tracking-wide text-muted/70">{label}</p>
      <p className="text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
