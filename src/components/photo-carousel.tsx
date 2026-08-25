"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import type { Photo } from "@/lib/gallery";

/** Vitesse du ruban, en pixels par seconde. */
const SPEED = 40;

/**
 * Carrousel de photos de terrain.
 *
 * Bande à hauteur fixe qui défile en continu : chaque photo garde ses
 * proportions d'origine (portrait ou paysage), aucune n'est recadrée de
 * travers. La liste est affichée deux fois de suite ; dès que le défilement
 * atteint la seconde copie on retranche la largeur d'une copie, ce qui remet
 * le ruban au même point visuel — la boucle est donc invisible.
 *
 * Le défilement reste un scroll natif : la molette, le doigt et les flèches
 * du clavier continuent de fonctionner, et les boutons ne font que piloter ce
 * même défilement. L'avance automatique s'arrête au survol, au toucher, au
 * focus clavier et si le système demande de réduire les animations.
 */
export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  // Deux copies bout à bout : la seconde n'existe que pour masquer la couture,
  // elle est donc invisible pour les lecteurs d'écran.
  const slides = [...photos, ...photos];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = 0;
    // Position tenue en flottant : à cette vitesse chaque image n'avance que
    // d'une fraction de pixel, qu'un aller-retour par `scrollLeft` perdrait.
    let pos = trackRef.current?.scrollLeft ?? 0;

    const step = (now: number) => {
      const track = trackRef.current;
      if (!track) return;
      if (last) {
        // Largeur d'une copie, mesurée à chaque image : elle change avec la
        // taille de la fenêtre et le chargement des photos.
        const first = track.children[0] as HTMLElement | undefined;
        const clone = track.children[photos.length] as HTMLElement | undefined;
        const loop = first && clone ? clone.offsetLeft - first.offsetLeft : 0;

        pos += (SPEED * (now - last)) / 1000;
        if (loop > 0 && pos >= loop) pos -= loop;
        track.scrollLeft = pos;
      }
      last = now;
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, photos.length]);

  // Avance ou recule d'une photo, sans casser la boucle : le retour en arrière
  // depuis le tout début repart de la fin de la première copie.
  const nudge = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.children[0] as HTMLElement | undefined;
      const clone = track.children[photos.length] as HTMLElement | undefined;
      const loop = first && clone ? clone.offsetLeft - first.offsetLeft : 0;
      const card = (first?.offsetWidth ?? 0) + 16;

      let target = track.scrollLeft + direction * card;
      if (loop > 0) {
        if (target < 0) target += loop;
        if (target >= loop) target -= loop;
      }
      track.scrollTo({ left: target, behavior: "smooth" });
    },
    [photos.length],
  );

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carrousel"
      aria-label="Photos de nos interventions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Dégradés de bord : la bande semble sortir du noir de la page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-tone to-transparent sm:w-16"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-tone to-transparent sm:w-16"
      />

      <ul
        ref={trackRef}
        tabIndex={0}
        className="flex gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((photo, i) => {
          const isClone = i >= photos.length;
          return (
            <li
              key={`${photo.src}-${i}`}
              aria-hidden={isClone ? "true" : undefined}
              aria-label={isClone ? undefined : `${i + 1} sur ${photos.length}`}
              className="group relative h-[280px] shrink-0 overflow-hidden rounded-2xl border border-line shadow-sm transition-all duration-300 hover:border-accent/45 hover:shadow-glow sm:h-[380px]"
            >
              <Image
                src={photo.src}
                alt={isClone ? "" : photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 70vw, 520px"
                className="h-full w-auto object-cover"
                priority={i < 2}
              />

              {/* Légende posée sur un voile sombre, comme les cartes du site */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-10">
                <span className="num">
                  {String((i % photos.length) + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-bold text-white">{photo.caption}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Commandes : le ruban défile seul, les flèches servent à reprendre la main */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Photo précédente"
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-panel text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRightIcon width={15} height={15} className="rotate-180" />
        </button>

        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Photo suivante"
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-panel text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRightIcon width={15} height={15} />
        </button>
      </div>
    </div>
  );
}
