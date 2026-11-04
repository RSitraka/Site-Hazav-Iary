import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { SceneLink } from "@/components/scene/scene-link";
import { PendantLamp } from "@/components/scene/decor";
import {
  AuditIcon,
  BoltIcon,
  HomeIcon,
  MailIcon,
  PanelIcon,
  QuoteIcon,
  ShieldIcon,
  WrenchIcon,
} from "@/components/icons";
import { rooms, toneColor } from "@/lib/scene";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Le couloir : toutes les pages du site",
  description:
    "Choisissez une pièce : nos services d'installation solaire, nos réalisations, nos offres et leurs prix, le simulateur, l'entreprise, les questions fréquentes et le contact.",
  path: "/couloir",
});

/** Pictogramme peint sur chaque porte. */
const doorIcons: Record<string, typeof HomeIcon> = {
  "/services": WrenchIcon,
  "/realisations": PanelIcon,
  "/offres": ShieldIcon,
  "/simulateur": BoltIcon,
  "/a-propos": AuditIcon,
  "/faq": QuoteIcon,
  "/contact": MailIcon,
};

/**
 * ---------------------------------------------------------------------------
 * SCÈNE 2 — LE COULOIR
 * ---------------------------------------------------------------------------
 * Le menu du site : une porte par page, le nom peint sur une plaque. Survol ou
 * focus clavier : la porte s'entrouvre et laisse passer la lumière de la
 * pièce. Clic : elle s'ouvre et la caméra entre.
 *
 * La rangée de portes défile horizontalement dès qu'elle ne tient plus dans
 * l'écran (glisser du doigt sur mobile, molette ou flèches ailleurs) ; sur un
 * grand écran elle tient en entier, centrée.
 */
export default function CouloirPage() {
  return (
    <section className="corridor" aria-labelledby="couloir-titre">
      <div className="corridor-ceiling" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <PendantLamp key={i} className="corridor-lamp" />
        ))}
      </div>

      <div className="container relative text-center">
        <p className="eyebrow">Le couloir</p>
        <h1 id="couloir-titre" className="h2 mt-4">
          Choisissez une pièce
        </h1>
        <p className="lead mx-auto mt-3 max-w-xl">
          Chaque porte ouvre une page du site. Entrez, lisez, puis ressortez par le bouton
          «&nbsp;Sortir&nbsp;» pour revenir ici.
        </p>
        <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-label muted sm:hidden">
          Glissez pour voir toutes les portes →
        </p>
      </div>

      <nav aria-label="Pages du site" className="corridor-doors-scroll">
        <ul className="corridor-doors">
          {rooms.map((room) => {
            const Icon = doorIcons[room.href] ?? HomeIcon;
            return (
              <li key={room.href} className="corridor-door-slot">
                <div
                  className="door c-door"
                  data-door
                  data-door-href={room.href}
                  style={{ "--door": toneColor[room.tone] } as CSSProperties}
                >
                  <span className="door-inside" aria-hidden="true" />
                  <SceneLink href={room.href} move="in" className="door-leaf c-door-leaf">
                    <span className="c-door-panel c-door-panel-top" aria-hidden="true" />
                    <span className="c-door-plaque">
                      <Icon width={20} height={20} className="mx-auto" aria-hidden="true" />
                      <span className="c-door-name">{room.label}</span>
                      {room.description && (
                        <span className="c-door-desc">{room.description}</span>
                      )}
                    </span>
                    <span className="c-door-panel c-door-panel-bottom" aria-hidden="true" />
                    <span className="door-knob" aria-hidden="true" />
                  </SceneLink>
                </div>
                <span className="c-door-spill" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="corridor-floor" aria-hidden="true">
        <span className="corridor-rug" />
      </div>
    </section>
  );
}
