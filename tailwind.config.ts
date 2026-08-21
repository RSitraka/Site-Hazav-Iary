import type { Config } from "tailwindcss";

/**
 * Thème « produit sombre » : fond quasi noir, accent bleu #26A6CE (le bleu de l'emblème), grandes
 * cartes arrondies et halos colorés.
 *
 * Toutes les couleurs passent par des variables CSS définies dans
 * globals.css, ce qui rend le mode clair automatique : aucune classe
 * `dark:` n'est nécessaire dans les composants.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,md}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          deep: "rgb(var(--accent-deep) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          line: "rgb(var(--accent-line) / <alpha-value>)",
          /** #26A6CE tel quel — halos et traits lumineux, quel que soit le mode. */
          pure: "rgb(var(--accent-pure) / <alpha-value>)",
          on: "rgb(var(--on-accent) / <alpha-value>)",
        },
        // Couleurs de sens.
        sun: {
          DEFAULT: "rgb(var(--orange) / <alpha-value>)",
          deep: "rgb(var(--orange-deep) / <alpha-value>)",
          soft: "rgb(var(--orange-soft) / <alpha-value>)",
          line: "rgb(var(--orange-line) / <alpha-value>)",
          ink: "rgb(var(--orange-ink) / <alpha-value>)",
        },
        grow: {
          DEFAULT: "rgb(var(--green) / <alpha-value>)",
          deep: "rgb(var(--green-deep) / <alpha-value>)",
          soft: "rgb(var(--green-soft) / <alpha-value>)",
          line: "rgb(var(--green-line) / <alpha-value>)",
          ink: "rgb(var(--green-ink) / <alpha-value>)",
        },
        // Surfaces et texte
        tone: "rgb(var(--tone) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        panel: "rgb(var(--panel-2) / <alpha-value>)",
        "panel-3": "rgb(var(--panel-3) / <alpha-value>)",
        line: "rgb(var(--border) / <alpha-value>)",
        "line-strong": "rgb(var(--border-2) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
          dim: "rgb(var(--text-dim) / <alpha-value>)",
          mut: "rgb(var(--text-mut) / <alpha-value>)",
        },
        slate: { DEFAULT: "rgb(var(--slate) / <alpha-value>)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Segoe UI", "Roboto", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      // Angles généreux : l'interface est faite de cartes posées sur le noir.
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
        glow: "var(--glow-soft)",
        "glow-lg": "var(--glow-strong)",
      },
      letterSpacing: { title: "-.6px", label: ".9px" },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        rise: "rise .4s ease both",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
