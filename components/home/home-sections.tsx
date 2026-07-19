import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FeaturedUpdate } from "@/components/updates/featured-update";
import { UpdateCard } from "@/components/updates/update-card";
import { CommunitySuggestionCard } from "./community-suggestion-card";
import { EventCard } from "./event-card";
import { ScreenshotCarousel } from "./screenshot-carousel";
import { PokepediaSearch } from "@/components/pokepedia/pokepedia-search";
import { updates, featuredUpdate } from "@/lib/data/updates";
import { events } from "@/lib/data/events";
import { communitySuggestions } from "@/lib/data/account";
import { screenshots } from "@/lib/data/screenshots";
import { pokepediaEntries } from "@/lib/data/pokepedia";
import { discordInviteUrl } from "@/lib/config/social-links";

// 8.2 — Carrossel de screenshots
export function ScreenshotsSection() {
  return (
    <section className="section cv-section">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Dentro do mundo de PMO"
          title="Dentro do mundo de PMO"
          description="Explore cidades, descubra novas regiões, enfrente desafios e participe de uma comunidade em constante evolução."
        />
      </div>
      <div className="mt-12">
        <ScreenshotCarousel screenshots={screenshots} />
      </div>
    </section>
  );
}

// 8.5 — Atualizações
export function UpdatesSection() {
  const others = updates.filter((u) => u.id !== featuredUpdate.id).slice(0, 3);
  return (
    <section className="section cv-section">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Atualizações"
            title="O mundo nunca para"
            description="Novas melhorias, conteúdos, correções e eventos chegam constantemente ao PokeMyth Online."
          />
          <span className="border border-gold/30 bg-gold/5 px-3 py-1.5 text-xs font-medium text-gold clip-chamfer-sm">
            Em média 2–3 atualizações por semana
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FeaturedUpdate update={featuredUpdate} />
          <div className="flex flex-col gap-4">
            {others.map((u) => (
              <UpdateCard key={u.id} update={u} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/updates">
            <Button variant="secondary">
              Ver todas as atualizações
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// 8.6 — Comunidade
export function CommunitySection() {
  const [featured, ...rest] = communitySuggestions;
  return (
    <section className="section cv-section relative overflow-hidden border-y border-border bg-bg-soft/40">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Comunidade"
              title="Construído ao lado da comunidade"
              description="A evolução de PMO também nasce das sugestões, opiniões e experiências dos jogadores."
            />
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {[
                "Sugestões e votações da comunidade",
                "Feedback sobre sistemas do jogo",
                "Eventos comunitários e novidades",
                "Suporte próximo e transparente",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-magenta">◆</span> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href={discordInviteUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <MessageCircle className="h-4 w-4" /> Entrar no Discord
                </Button>
              </a>
            </div>
          </div>

          {/* Janela de comunidade */}
          <div className="lg:col-span-7">
            <div className="panel p-1.5">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <span className="font-display text-sm font-semibold text-ink">
                  Painel da Comunidade
                </span>
                <span className="text-[11px] uppercase tracking-wide text-muted">
                  Sugestões em destaque
                </span>
              </div>
              <div className="space-y-3 p-3">
                <CommunitySuggestionCard suggestion={featured} featured />
                <div className="grid gap-3 sm:grid-cols-2">
                  {rest.slice(0, 2).map((s) => (
                    <CommunitySuggestionCard key={s.id} suggestion={s} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8.7 — Eventos
export function EventsSection() {
  return (
    <section className="section cv-section">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Eventos"
          title="Eventos que transformam o mundo"
          description="Eventos sazonais, bosses mundiais e competições da comunidade mantêm o mundo de PMO sempre em movimento."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 8.8 — Pokepedia em destaque
export function PokepediaSection() {
  return (
    <section className="section cv-section border-t border-border bg-bg-soft/40">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Pokepedia"
            title="Conhecimento também é poder"
            description="Consulte criaturas, itens, regiões, sistemas, quests e informações importantes do mundo de PMO."
          />
          <Link href="/pokepedia">
            <Button variant="secondary" size="sm">
              Abrir Pokepedia
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="mt-8">
          <PokepediaSearch entries={pokepediaEntries} compact />
        </div>
      </div>
    </section>
  );
}

// 8.9 — CTA final
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-arcane-radial" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/15 blur-[120px]" />
      <div className="container text-center">
        <h2 className="heading-display mx-auto max-w-3xl text-3xl leading-tight sm:text-5xl">
          Seu próximo capítulo <span className="text-arcane-gradient">começa agora</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted">
          Crie sua conta, entre no mundo de PokeMyth Online e comece a construir o
          seu próprio mito.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register">
            <Button size="lg">Criar conta</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              Jogar agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
