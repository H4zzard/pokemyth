"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServerStatus } from "./server-status";

const stats = [
  { label: "100% gratuito" },
  { label: "Market RMT 24/7" },
  { label: "Atualizações semanais" },
  { label: "Eventos constantes" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/pokemyth-hero.png"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlays simétricos + vinheta (conteúdo central) */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,transparent,rgba(7,6,13,0.72))]" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_60px_rgba(5,4,12,0.9)]" />
      </div>

      {/* Partículas mágicas discretas */}
      <Particles />

      <div className="container relative pb-16 pt-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span variants={item} className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Um novo mundo está despertando
          </motion.span>

          <motion.h1
            variants={item}
            className="heading-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Seu mito <span className="text-arcane-gradient">começa aqui</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Explore um mundo vivo, desenvolva sua equipe, enfrente desafios e
            construa sua própria história no PokeMyth Online.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/register">
              <Button size="lg">
                <Play className="h-4 w-4" /> Jogar agora
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Criar conta
              </Button>
            </Link>
            <Link
              href="#mundo"
              className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              Conhecer o mundo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <ServerStatus />
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {stats.map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <span className="text-gold">◆</span>
                {s.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Conector com a próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}

function Particles() {
  // Partículas CSS leves (posições fixas, sem random para evitar hydration mismatch).
  const dots = [
    { l: "12%", t: "30%", d: "0s", s: 3 },
    { l: "22%", t: "60%", d: "1.2s", s: 2 },
    { l: "40%", t: "20%", d: "0.6s", s: 2 },
    { l: "63%", t: "40%", d: "2s", s: 3 },
    { l: "78%", t: "25%", d: "1.6s", s: 2 },
    { l: "85%", t: "62%", d: "0.9s", s: 3 },
    { l: "52%", t: "72%", d: "2.4s", s: 2 },
    { l: "33%", t: "48%", d: "1.8s", s: 2 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-magenta/70 blur-[1px] animate-float"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
            animationDelay: p.d,
            boxShadow: "0 0 8px 2px rgba(217,70,239,0.5)",
          }}
        />
      ))}
    </div>
  );
}
