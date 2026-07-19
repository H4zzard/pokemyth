import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { pokepediaEntries, pokepediaCategoryLabels } from "@/lib/data/pokepedia";
import { RarityBadge } from "@/components/shared/badges";
import { PokepediaCard } from "@/components/pokepedia/pokepedia-card";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return pokepediaEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = pokepediaEntries.find((e) => e.slug === slug);
  if (!entry) return { title: "Pokepedia" };
  return { title: entry.name, description: entry.summary };
}

export default async function PokepediaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = pokepediaEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const related = (entry.related ?? [])
    .map((s) => pokepediaEntries.find((e) => e.slug === s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <section className="section pt-32">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Trilha" className="mb-6 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-ink">Início</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/pokepedia" className="hover:text-ink">Pokepedia</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{entry.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="relative aspect-square overflow-hidden border border-magenta/20 clip-chamfer bg-bg">
            {entry.image && (
              <Image
                src={entry.image}
                alt={entry.name}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
            )}
            {entry.rarity && (
              <div className="absolute left-3 top-3">
                <RarityBadge rarity={entry.rarity} />
              </div>
            )}
          </div>

          <div>
            <span className="eyebrow">{pokepediaCategoryLabels[entry.category]}</span>
            <h1 className="heading-display mt-2 text-4xl">{entry.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted">{entry.summary}</p>

            {entry.details && entry.details.length > 0 && (
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {entry.details.map((d) => (
                  <div key={d.label} className="border border-border bg-bg/40 p-3 clip-chamfer-sm">
                    <dt className="text-[11px] uppercase tracking-wide text-muted/70">
                      {d.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8">
              <Link href="/pokepedia">
                <Button variant="secondary" size="sm">
                  <ArrowLeft className="h-4 w-4" /> Voltar à Pokepedia
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Itens relacionados
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((e) => (
                <PokepediaCard key={e.id} entry={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
