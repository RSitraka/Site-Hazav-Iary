"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

/** Même clé de stockage que l'application de gestion. */
const KEY = "hazaviary_theme";

/**
 * Bascule clair/sombre. Le mode est porté par la classe `dark` sur <html> :
 * tout le thème n'étant qu'un jeu de tokens CSS, rien d'autre n'a besoin de
 * connaître le mode courant. Le script inline du layout l'applique avant la
 * première peinture.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);

    // Barre d'adresse des navigateurs mobiles assortie au fond de page.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next ? "#050706" : "#F1F4F2");

    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* stockage indisponible : la préférence n'est simplement pas mémorisée */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Activer le thème clair" : "Activer le thème sombre"}
      aria-pressed={mounted ? dark : undefined}
      className={`grid h-[38px] w-[38px] place-items-center rounded-full border border-line-strong bg-panel text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {dark ? <MoonIcon width={17} height={17} /> : <SunIcon width={17} height={17} />}
    </button>
  );
}
