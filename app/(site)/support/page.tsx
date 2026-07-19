import type { Metadata } from "next";
import { MessageCircle, BookOpen, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SupportForm } from "@/components/support/support-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { discordInviteUrl } from "@/lib/config/social-links";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de suporte do PokeMyth Online. Abra uma solicitação ou fale com a comunidade no Discord.",
};

const quickLinks = [
  {
    icon: BookOpen,
    title: "Regras do servidor",
    text: "Consulte as diretrizes antes de reportar.",
    href: "/rules",
    cta: "Ver regras",
  },
  {
    icon: ShieldCheck,
    title: "Política do Market",
    text: "Como funcionam compra protegida e repasses.",
    href: "/rules#market-rmt",
    cta: "Ler política",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Suporte"
        title="Central de suporte"
        description="Precisa de ajuda com sua conta, uma transação do Market ou reportar algo? Estamos aqui."
      />
      <section className="section pt-12">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="panel p-6 sm:p-8">
            <h2 className="heading-display text-xl">Abrir solicitação</h2>
            <p className="mt-1 text-sm text-muted">
              Preencha o formulário e nossa equipe retornará pelos canais oficiais.
            </p>
            <div className="mt-6">
              <SupportForm />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="panel p-6 text-center">
              <MessageCircle className="mx-auto h-8 w-8 text-magenta" />
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                Comunidade no Discord
              </h3>
              <p className="mt-1 text-sm text-muted">
                Tire dúvidas rápidas e acompanhe avisos da equipe.
              </p>
              <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
                <Button className="mt-4 w-full">
                  <MessageCircle className="h-4 w-4" /> Entrar no Discord
                </Button>
              </a>
            </div>

            {quickLinks.map((l) => (
              <div key={l.title} className="panel p-5">
                <l.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-2 font-display text-base font-semibold text-ink">
                  {l.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{l.text}</p>
                <Link href={l.href}>
                  <Button variant="ghost" size="sm" className="mt-2 px-0">
                    {l.cta} →
                  </Button>
                </Link>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
