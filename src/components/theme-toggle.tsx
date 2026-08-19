"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Bascule clair/sombre. La préférence est persistée dans localStorage et
 * appliquée avant la peinture par le script inline du layout (pas de flash).
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
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
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
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-leaf-500/10 ${className}`}
    >
      {dark ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
    </button>
  );
}
