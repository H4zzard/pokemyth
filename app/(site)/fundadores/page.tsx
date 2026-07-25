import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, Users, MessageCircle, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { waitlistConfig } from "@/lib/config/waitlist";
import { featureFlags } from "@/lib/config/features";
import { getWaitlistStatus } from "@/lib/server/waitlist-sheet";
import { discordInviteUrl } from "@/lib/config/social-links";

export const metadata: Metadata = {
  title: "Players Fundadores",
  description:
    "Apenas 10 vagas para o beta fechado do PokeMyth Online. Candidate-se e garanta itens exclusivos de fundador.",
};

// O contador de vagas vem da planilha a cada acesso.
export const dynamic = "force-dynamic";

export default async function FundadoresPage() {
  if (!featureFlags.waitlistEnabled) notFound();

  const status = await getWaitlistStatus();
  const { totalSpots } = waitlistConfig;
  const spotsLeft = status.spotsLeft;
  const isFull = spotsLeft === 0;

  return (
    <>
      <PageHeader
        eyebrow="Beta fechado · Acesso antecipado"
        title="Players Fundadores"
        description={`Estamos selecionando apenas ${totalSpots} jogadores para testar o PokeMyth Online antes de todo mundo. Quem entrar agora ajuda a moldar o jogo — e leva itens que não voltam.`}
      />

      <section className="section pt-12">
        <div className="container grid gap-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-start">
          {/* Coluna esquerda — proposta */}
          <div>
            {/* Contador de vagas */}
            <div className="panel flex flex-wrap items-center gap-x-6 gap-y-3 p-5">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-magenta" />
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {spotsLeft === null
                      ? `${totalSpots} vagas`
                      : `${spotsLeft} de ${totalSpots}`}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {spotsLeft === null
                      ? "Beta do beta tester"
                      : isFull
                        ? "Vagas preenchidas"
                        : "Vagas restantes"}
                  </p>
                </div>
              </div>

              {spotsLeft !== null && (
                <div className="min-w-[180px] flex-1">
                  <div
                    className="h-2 w-full overflow-hidden border border-border bg-bg/60"
                    role="progressbar"
                    aria-valuenow={totalSpots - spotsLeft}
                    aria-valuemin={0}
                    aria-valuemax={totalSpots}
                    aria-label="Vagas preenchidas"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-magenta to-arcane"
                      style={{
                        width: `${Math.min(100, ((totalSpots - spotsLeft) / totalSpots) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {totalSpots - spotsLeft} candidatura(s) confirmada(s).
                  </p>
                </div>
              )}
            </div>

            {/* Benefícios */}
            <h2 className="heading-display mt-10 text-xl">
              O que o fundador recebe
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {waitlistConfig.perks.map((perk) => (
                <li key={perk.title} className="panel p-5">
                  <Sparkles className="h-5 w-5 text-gold" />
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">
                    {perk.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {perk.description}
                  </p>
                </li>
              ))}
            </ul>

            {/* Como funciona */}
            <h2 className="heading-display mt-10 text-xl">Como funciona</h2>
            <ol className="mt-5 space-y-4">
              {[
                {
                  t: "Envie sua candidatura",
                  d: "Leva menos de um minuto — nome, nick desejado, e-mail e Discord.",
                },
                {
                  t: "Entre no Discord",
                  d: "Você é redirecionado automaticamente. É o nosso único canal de contato com os fundadores.",
                },
                {
                  t: "Aguarde a seleção",
                  d: `Anunciamos os ${totalSpots} selecionados no servidor e entregamos os itens exclusivos na criação da conta.`,
                },
              ].map((step, i) => (
                <li key={step.t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-magenta/40 bg-magenta/10 font-display text-sm font-semibold text-magenta clip-chamfer-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {step.t}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex items-start gap-2 border border-emerald-400/30 bg-emerald-400/5 p-3 clip-chamfer-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <p className="text-xs text-muted">
                Não pedimos senha, pagamento ou qualquer dado sensível para
                participar do beta. A criação de conta só existirá quando o
                servidor abrir.
              </p>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <div className="lg:sticky lg:top-28">
            <div className="panel border-magenta/20 p-6 shadow-card sm:p-8">
              {isFull ? (
                <div className="text-center">
                  <Users className="mx-auto h-10 w-10 text-magenta" />
                  <h2 className="heading-display mt-4 text-xl">
                    Vagas esgotadas
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    As {totalSpots} vagas de fundador já foram preenchidas. Entre
                    no Discord para acompanhar as próximas ondas de acesso
                    antecipado.
                  </p>
                  <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="mt-6 w-full">
                      <MessageCircle className="h-4 w-4" /> Entrar no Discord
                    </Button>
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="heading-display text-xl">
                    Candidatar-se ao beta
                  </h2>
                  <p className="mb-6 mt-1 text-sm text-muted">
                    Ao enviar, você é levado direto para o nosso Discord.
                  </p>
                  <WaitlistForm />
                </>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-muted/70">
              Já é da comunidade?{" "}
              <Link href="/updates" className="text-magenta hover:underline">
                Acompanhe as atualizações
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
