"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import type { Photo } from "@/lib/gallery";

/**
 * Carrousel de photos de terrain.
 *
 * Bande défilante à hauteur fixe : chaque photo garde ses proportions
 * d'origine (portrait ou paysage), aucune n'est recadrée de travers. Le
 * défilement est un `scroll-snap` natif — la molette, le doigt et les flèches
 * du clavier fonctionnent sans code supplémentaire ; les boutons ne font que
 * piloter ce même défilement.
 *
 * L'avance automatique s'arrête au survol, au focus clavier et si le système
 * demande de réduire les animations.
 */
export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Position courante : déduite du défilement réel, jamais d'un compteur
  // parallèle — les deux ne peuvent donc pas se désynchroniser.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const slide = slides[(index + slides.length) % slides.length];
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - 16, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % photos.length;
        goTo(next);
        return next;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, photos.length, goTo]);

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
        onScroll={onScroll}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className="group relative h-[280px] shrink-0 snap-center overflow-hidden rounded-2xl border border-line shadow-sm transition-all duration-300 hover:border-accent/45 hover:shadow-glow sm:h-[380px]"
            aria-label={`${i + 1} sur ${photos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 70vw, 520px"
              className="h-full w-auto object-cover"
              priority={i < 2}
            />

            {/* Légende posée sur un voile sombre, comme les cartes du site */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-10">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 text-sm font-bold text-white">{photo.caption}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Commandes : pastilles de position + flèches */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Photo précédente"
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-panel text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRightIcon width={15} height={15} className="rotate-180" />
        </button>

        <ul className="flex items-center gap-2">
          {photos.map((photo, i) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller à la photo ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-accent shadow-glow" : "w-1.5 bg-line-strong hover:bg-accent/50"
                }`}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Photo suivante"
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-panel text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRightIcon width={15} height={15} />
        </button>
      </div>
    </div>
  );
}
