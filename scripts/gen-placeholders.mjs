// Gera placeholders SVG branded para o PokeMyth Online.
// Rode: node scripts/gen-placeholders.mjs
// TODO(equipe): substituir estes SVGs por screenshots/artes reais do servidor.
import { writeFileSync, mkdirSync } from "node:fs";

function svg({ w, h, label, sub = "PLACEHOLDER — substituir", hue = 292 }) {
  const c1 = `hsl(${hue} 85% 60%)`;
  const c2 = `hsl(${hue - 30} 70% 40%)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0E0B17"/>
      <stop offset="1" stop-color="#07060D"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${c1}" stroke-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${c2}" stroke-opacity="0.5" stroke-dasharray="6 8"/>
  <text x="50%" y="47%" fill="#F8FAFC" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) / 9)}" font-weight="700" text-anchor="middle">${label}</text>
  <text x="50%" y="59%" fill="#A1A1AA" font-family="monospace" font-size="${Math.round(Math.min(w, h) / 24)}" text-anchor="middle">${sub}</text>
</svg>`;
}

const jobs = [
  // Screenshots do servidor (16:9)
  ...[1, 2, 3, 4, 5].map((n) => ({
    dir: "public/screenshots",
    file: `server-0${n}.svg`,
    w: 1600,
    h: 900,
    label: `Screenshot ${n}`,
    hue: 292 - n * 8,
  })),
  // Market itens (quadrado)
  ...Array.from({ length: 8 }, (_, i) => ({
    dir: "public/market",
    file: `item-${i + 1}.svg`,
    w: 600,
    h: 600,
    label: `Item ${i + 1}`,
    hue: 300 - i * 10,
  })),
  // Pokepedia (quadrado)
  ...Array.from({ length: 8 }, (_, i) => ({
    dir: "public/pokepedia",
    file: `entry-${i + 1}.svg`,
    w: 600,
    h: 600,
    label: `Entrada ${i + 1}`,
    hue: 280 + i * 6,
  })),
  // Eventos (paisagem)
  ...Array.from({ length: 3 }, (_, i) => ({
    dir: "public/icons",
    file: `event-${i + 1}.svg`,
    w: 800,
    h: 500,
    label: `Evento ${i + 1}`,
    hue: 292 - i * 20,
  })),
  // Updates
  ...Array.from({ length: 4 }, (_, i) => ({
    dir: "public/icons",
    file: `update-${i + 1}.svg`,
    w: 900,
    h: 500,
    label: `Update ${i + 1}`,
    hue: 270 + i * 10,
  })),
  // Loja
  ...Array.from({ length: 6 }, (_, i) => ({
    dir: "public/icons",
    file: `store-${i + 1}.svg`,
    w: 600,
    h: 600,
    label: `Produto ${i + 1}`,
    hue: 300 - i * 8,
  })),
  // Avatar padrão
  {
    dir: "public/icons",
    file: "avatar.svg",
    w: 300,
    h: 300,
    label: "PMO",
    sub: "avatar",
    hue: 292,
  },
];

for (const j of jobs) {
  mkdirSync(j.dir, { recursive: true });
  writeFileSync(`${j.dir}/${j.file}`, svg(j));
}
console.log(`Gerados ${jobs.length} placeholders SVG.`);
