import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        // Marca
        magenta: {
          DEFAULT: "#D946EF",
          deep: "#C026D3",
        },
        arcane: {
          DEFAULT: "#9333EA", // roxo principal
          dark: "#581C87", // roxo escuro
        },
        night: "#080B16", // azul noturno
        gold: "#C9A96E", // dourado discreto
        cyan: {
          magic: "#22D3EE",
        },
        // Superfícies
        bg: {
          DEFAULT: "#07060D", // fundo principal
          soft: "#0E0B17", // fundo secundário
          card: "#12101C", // cards
        },
        // Texto
        ink: "#F8FAFC", // branco
        muted: "#A1A1AA", // texto secundário
        // shadcn-style tokens (semânticos)
        border: "rgba(217, 70, 239, 0.14)",
        input: "rgba(217, 70, 239, 0.18)",
        ring: "#D946EF",
        background: "#07060D",
        foreground: "#F8FAFC",
        primary: {
          DEFAULT: "#D946EF",
          foreground: "#0A0410",
        },
        secondary: {
          DEFAULT: "#12101C",
          foreground: "#F8FAFC",
        },
        destructive: {
          DEFAULT: "#F43F5E",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#9333EA",
          foreground: "#F8FAFC",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(217, 70, 239, 0.45)",
        "glow-soft": "0 0 60px -20px rgba(147, 51, 234, 0.4)",
        card: "0 12px 40px -18px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(217,70,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.05) 1px, transparent 1px)",
        "arcane-radial":
          "radial-gradient(ellipse at center, rgba(147,51,234,0.18), transparent 65%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
