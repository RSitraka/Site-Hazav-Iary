import type { Config } from "tailwindcss";

/**
 * Le thème reprend celui de l'application de gestion Hazav'Iary
 * (frontend/src/theme.css) : interface claire, plate et contrastée, accent
 * turquoise pétrole, angles courts, bordures fines.
 *
 * Toutes les couleurs passent par des variables CSS définies dans
 * globals.css, ce qui rend le mode sombre automatique : aucune classe
 * `dark:` n'est nécessaire dans les composants.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,md}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          deep: "rgb(var(--accent-deep) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          line: "rgb(var(--accent-line) / <alpha-value>)",
          on: "rgb(var(--on-accent) / <alpha-value>)",
        },
        // Couleurs de sens, reprises telles quelles de l'application.
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
      // Angles courts : l'application est volontairement plate.
      borderRadius: {
        DEFAULT: "4px",
        sm: "3px",
        md: "4px",
        lg: "4px",
        xl: "6px",
        "2xl": "6px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
      },
      letterSpacing: { title: "-.2px", label: ".7px" },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: { rise: "rise .3s ease both" },
    },
  },
  plugins: [],
};

export default config;
