import type { Metadata } from "next";

import { LogoMark } from "@/components/logo";
import { SceneLink } from "@/components/scene/scene-link";
import { Plant } from "@/components/scene/decor";
import { ArrowRightIcon, SunIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Installateur de panneaux solaires à Madagascar`,
  description:
    "Installateur de panneaux solaires partout à Madagascar, basé à Antananarivo : descente technique sur site, dimensionnement, contrat écrit, pose et suivi de chantier, avec paiement échelonné sur plusieurs mois.",
  path: "/",
  keywords: [
    "installateur panneaux solaires Antananarivo",
    "énergie solaire Madagascar",
    "pose plaque solaire Antananarivo",
    "batterie lithium onduleur solaire",
    "devis installation solaire Madagascar",
  ],
});

/** Panneaux du toit : 2 rangées, plus ou moins de colonnes selon l'écran (CSS). */
const PANEL_CELLS = Array.from({ length: 20 });

/**
 * ---------------------------------------------------------------------------
 * SCÈNE 1 — L'EXTÉRIEUR
 * ---------------------------------------------------------------------------
 * La façade de la maison, centrée sur la porte d'entrée. L'accueil du site est
 * affiché sur la porte, comme une plaque : logo, titre, accroche, présentation.
 * « Entrer » ouvre la porte et fait avancer la caméra jusqu'au couloir.
 *
 * Le toit porte des panneaux solaires : c'est le métier de la maison.
 */
export default function HomePage() {
  return (
    <section className="ext" aria-labelledby="accueil-titre">
      {/* Ciel : soleil le jour, lune et étoiles la nuit */}
      <div className="ext-sky" aria-hidden="true">
        <span className="ext-star-field" />
        <span className="ext-orb" />
        <span className="ext-hill ext-hill-back" />
        <span className="ext-hill ext-hill-front" />
      </div>

      <div className="ext-house">
        {/* Toit et panneaux solaires */}
        <div className="ext-roof" aria-hidden="true">
          <div className="ext-panels">
            {PANEL_CELLS.map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        {/* Façade */}
        <div className="ext-facade">
          <span className="ext-window" aria-hidden="true" />

          <div className="ext-door-wrap">
            <span className="ext-lamp ext-lamp-left" aria-hidden="true" />
            <span className="ext-lamp ext-lamp-right" aria-hidden="true" />

            <div className="door" data-door data-door-href="/couloir">
              {/* Ce que l'on aperçoit quand la porte s'ouvre : la lumière du couloir */}
              <span className="door-inside" aria-hidden="true" />

              <div className="door-leaf ext-door-leaf">
                {/* La plaque : la page d'accueil du site */}
                <div className="ext-plaque">
                  <div className="flex items-center justify-center gap-2.5">
                    <LogoMark className="h-11 w-11" priority />
                    <span className="text-[1.15rem] font-extrabold tracking-title">
                      <span className="text-ink-dim">HAZAV</span>
                      <span className="text-accent">&rsquo;IARY</span>
                    </span>
                  </div>

                  <p className="eyebrow mt-5">
                    <SunIcon width={13} height={13} />
                    Énergie solaire &amp; solutions vertes
                  </p>

                  <h1
                    id="accueil-titre"
                    className="mt-4 text-[1.55rem] font-extrabold leading-[1.12] tracking-title sm:text-[1.9rem]"
                  >
                    L&rsquo;énergie solaire qui{" "}
                    <span className="text-accent">éclaire durablement</span> Madagascar
                  </h1>

                  <p className="mt-4 text-[14.5px] leading-relaxed dim">
                    Installateur de panneaux solaires basé à {site.address.city}, nous intervenons
                    partout à {site.address.countryName}. Descente technique avant tout devis,
                    dimensionnement écrit, contrat à montant fixé et paiement échelonné sur
                    plusieurs mois.
                  </p>

                  <SceneLink href="/couloir" move="in" className="btn-primary btn-lg mt-6 w-full">
                    Entrer
                    <ArrowRightIcon width={16} height={16} />
                  </SceneLink>
                  <SceneLink
                    href="/contact"
                    move="in"
                    className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    Demander une visite technique
                  </SceneLink>
                </div>

                {/* Poignée */}
                <span className="door-knob" aria-hidden="true" />
              </div>
            </div>

            {/* Marche et paillasson — « Tonga soa » : bienvenue, en malgache */}
            <div className="ext-step" aria-hidden="true" />
            <p className="ext-mat">
              <span lang="mg">Tonga soa</span>
              <span className="sr-only"> — bienvenue</span>
            </p>
          </div>

          <span className="ext-window" aria-hidden="true" />
        </div>
      </div>

      {/* Jardin et allée */}
      <div className="ext-ground" aria-hidden="true">
        <span className="ext-path" />
        <Plant className="ext-bush ext-bush-left" />
        <Plant className="ext-bush ext-bush-right" />
      </div>
    </section>
  );
}
