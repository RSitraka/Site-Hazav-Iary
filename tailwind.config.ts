import type { Config } from "tailwindcss";

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
        // Soleil : chaleur, production, rendement
        solar: {
          50: "#FFF9E8",
          100: "#FFEFC2",
          200: "#FFE08A",
          300: "#FFCE4D",
          400: "#FFBB1C",
          500: "#F5A200",
          600: "#D18300",
          700: "#A66200",
          800: "#7A4700",
          900: "#4D2C00",
        },
        // Vert : durabilite, energie propre
        leaf: {
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },
        // Nuit : fond des sections immersives
        night: {
          50: "#EFF5F2",
          100: "#D3E3DC",
          700: "#0F2E24",
          800: "#0A211A",
          900: "#061511",
          950: "#030B08",
        },
        sky: { 500: "#0A7EA4", 600: "#08657F" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(6,21,17,.04), 0 8px 24px -12px rgba(6,21,17,.18)",
        lift: "0 2px 4px rgba(6,21,17,.05), 0 24px 48px -24px rgba(6,21,17,.35)",
        glow: "0 0 0 1px rgba(245,162,0,.25), 0 20px 60px -20px rgba(245,162,0,.45)",
      },
      backgroundImage: {
        "sun-radial":
          "radial-gradient(circle at 50% 0%, rgba(255,187,28,.55), rgba(255,187,28,0) 60%)",
        "leaf-radial":
          "radial-gradient(circle at 80% 20%, rgba(18,183,106,.35), rgba(18,183,106,0) 55%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        pulseGlow: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.16,1,.3,1) both",
        "spin-slow": "spin-slow 60s linear infinite",
        "pulse-glow": "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
