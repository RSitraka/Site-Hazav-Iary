"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/**
 * ---------------------------------------------------------------------------
 * LIEN DE SCÈNE — « caméra » entre deux pièces de la maison
 * ---------------------------------------------------------------------------
 * Un `next/link` ordinaire (clic du milieu, Ctrl+clic, préchargement, SEO :
 * rien ne change), dont le clic simple joue d'abord une sortie de scène :
 *
 *   move="in"  → la porte la plus proche (`[data-door]`) s'ouvre, puis la
 *                caméra avance vers elle (zoom centré sur la porte) ;
 *   move="out" → la caméra recule et la scène s'éteint.
 *
 * La navigation n'a lieu qu'ensuite. La scène suivante lit le mouvement dans
 * `sessionStorage` (voir `SceneStage`) pour jouer l'entrée assortie — et, en
 * ressortant, refermer la porte par laquelle on vient de passer.
 *
 * Si le système demande de réduire les animations, tout devient un simple
 * fondu (voir `globals.css`, section « MAISON »).
 */
export type SceneMove = "in" | "out";

export const SCENE_KEY = "hz-scene";
const LEAVE_MS = 820;
const LEAVE_REDUCED_MS = 260;

/** Une seule transition à la fois : un double-clic ne relance rien. */
let busy = false;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  move: SceneMove;
};

export function SceneLink({ href, move, onClick, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    // Déjà sur place : la scène ne serait pas remontée, elle resterait éteinte.
    if (busy || href === pathname) return;

    const stage = document.getElementById("scene-stage");
    if (!stage) {
      router.push(href);
      return;
    }
    busy = true;

    const reduced = prefersReducedMotion();
    const door = (event.currentTarget.closest("[data-door]") as HTMLElement | null) ?? null;

    if (move === "in" && door && !reduced) {
      // La caméra avance vers le centre de la porte cliquée.
      const s = stage.getBoundingClientRect();
      const d = door.getBoundingClientRect();
      stage.style.transformOrigin = `${d.left - s.left + d.width / 2}px ${
        d.top - s.top + d.height / 2
      }px`;
      door.classList.add("is-opening");
    } else {
      // On recule depuis le centre de ce qui est à l'écran.
      const s = stage.getBoundingClientRect();
      stage.style.transformOrigin = `50% ${-s.top + window.innerHeight / 2}px`;
    }
    stage.classList.add(move === "in" ? "scene-leave-in" : "scene-leave-out");

    try {
      sessionStorage.setItem(SCENE_KEY, JSON.stringify({ move, from: pathname }));
    } catch {
      /* stockage indisponible : l'entrée sera simplement sans animation */
    }

    window.setTimeout(
      () => {
        busy = false;
        router.push(href);
      },
      reduced ? LEAVE_REDUCED_MS : LEAVE_MS,
    );
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
