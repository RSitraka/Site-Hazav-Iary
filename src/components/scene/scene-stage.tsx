"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { SCENE_KEY, SceneLink, type SceneMove } from "@/components/scene/scene-link";
import { RoomScene } from "@/components/scene/room";
import { ArrowRightIcon } from "@/components/icons";
import { exitFor, roomFor, sceneKind } from "@/lib/scene";

/**
 * ---------------------------------------------------------------------------
 * PLATEAU DE SCÈNE
 * ---------------------------------------------------------------------------
 * Monté par `src/app/template.tsx`, donc recréé à chaque changement d'URL.
 *
 *  - `#scene-stage` est l'élément que la « caméra » déplace (zoom, recul) ;
 *  - les pages de contenu y sont posées dans une pièce (`RoomScene`) ;
 *  - le bouton « Sortir » est rendu HORS du plateau : un élément `fixed` placé
 *    dans un parent transformé ne serait plus fixé à l'écran.
 *
 * À l'arrivée, le mouvement mémorisé par `SceneLink` choisit l'entrée :
 * avancer (`in`) ou reculer (`out`). En reculant, la porte d'où l'on sort est
 * affichée ouverte puis se referme. Sans mouvement mémorisé (premier
 * chargement, bouton « Précédent » du navigateur), la page s'affiche telle
 * quelle.
 */
export function SceneStage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);
  const kind = sceneKind(pathname);

  // Avant le premier affichage : sinon la page apparaîtrait une image pleine
  // avant que son animation d'entrée ne démarre.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let entry: { move?: SceneMove; from?: string } = {};
    try {
      entry = JSON.parse(sessionStorage.getItem(SCENE_KEY) || "{}");
      sessionStorage.removeItem(SCENE_KEY);
    } catch {
      return;
    }
    if (!entry.move) return;

    stage.classList.add(entry.move === "in" ? "scene-enter-in" : "scene-enter-out");
    const door =
      entry.move === "out" && entry.from
        ? (stage.querySelector(`[data-door-href="${CSS.escape(entry.from)}"]`) as HTMLElement | null)
        : null;
    door?.classList.add("is-closing");

    const done = () => {
      stage.classList.remove("scene-enter-in", "scene-enter-out");
      door?.classList.remove("is-closing");
    };
    const timer = window.setTimeout(done, 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const exit =
    kind === "corridor"
      ? { href: "/", label: "Retour" }
      : kind === "room"
        ? exitFor(pathname)
        : null;

  return (
    <>
      <div id="scene-stage" ref={stageRef} className="scene-stage">
        {kind === "room" ? <RoomScene room={roomFor(pathname)}>{children}</RoomScene> : children}
      </div>

      {exit && (
        <SceneLink
          href={exit.href}
          move="out"
          className="scene-exit btn-primary btn-lg"
          aria-label={
            kind === "corridor"
              ? "Retour : ressortir de la maison, vers l'accueil"
              : exit.href === "/couloir"
                ? "Sortir de la pièce : revenir au couloir"
                : exit.label
          }
        >
          <ArrowRightIcon width={16} height={16} className="rotate-180" />
          {exit.label}
        </SceneLink>
      )}
    </>
  );
}
