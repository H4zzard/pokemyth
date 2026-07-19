import { Compass, Users, Gem, Coins } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const points = [
  {
    icon: Compass,
    title: "Explore regiões e desafios",
    text: "Do Bosque Cristalino às Cavernas de Éter — cada região esconde segredos, quests e criaturas.",
  },
  {
    icon: Users,
    title: "Desenvolva sua equipe",
    text: "Colecione, evolua e domine criaturas para montar a equipe ideal para cada desafio.",
  },
  {
    icon: Gem,
    title: "Conquiste itens raros",
    text: "Enfrente bosses e eventos para obter equipamentos épicos, lendários e míticos.",
  },
  {
    icon: Coins,
    title: "Faça parte de uma economia ativa",
    text: "Negocie no Market de jogadores e movimente a economia viva do servidor.",
  },
];

export function FeaturePath() {
  return (
    <section id="mundo" className="section cv-section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.5]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-arcane-radial" aria-hidden />
      <div className="container">
        <SectionHeading
          eyebrow="Um mundo vivo"
          title="Um mundo que continua evoluindo"
          description="PokeMyth Online foi criado para oferecer uma experiência viva, onde exploração, progressão, economia e comunidade caminham juntas."
        />

        <div className="relative mt-14">
          {/* Linha de caminho (desktop) */}
          <svg
            className="absolute left-0 top-16 hidden h-24 w-full lg:block"
            viewBox="0 0 1200 100"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M40 60 C 220 -10, 380 130, 600 50 S 980 -10, 1160 60"
              stroke="url(#pathgrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <defs>
              <linearGradient id="pathgrad" x1="0" y1="0" x2="1200" y2="0">
                <stop stopColor="#9333EA" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#D946EF" stopOpacity="0.7" />
                <stop offset="1" stopColor="#9333EA" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p, i) => (
              <li key={p.title} className="panel panel-hover relative p-6">
                <span className="absolute right-4 top-4 font-display text-4xl font-bold text-white/[0.04]">
                  0{i + 1}
                </span>
                <div className="relative flex h-12 w-12 items-center justify-center border border-magenta/30 bg-magenta/10 clip-chamfer-sm">
                  <p.icon className="h-6 w-6 text-magenta" />
                  <span className="absolute inset-0 animate-pulse-glow bg-magenta/10 blur-md" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
