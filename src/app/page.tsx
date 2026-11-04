import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { LogoMark } from "@/components/logo";
import { SectionBackdrop } from "@/components/section-backdrop";
import {
  ArrowRightIcon,
  AuditIcon,
  BoltIcon,
  MailIcon,
  PanelIcon,
  ShieldIcon,
  SunIcon,
  WrenchIcon,
} from "@/components/icons";
import { mainNav, site } from "@/lib/site";
import { backdrops } from "@/lib/backdrops";
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

/** Pictogramme de chaque cellule (onglet). */
const cellIcons: Record<string, typeof SunIcon> = {
  "/services": WrenchIcon,
  "/realisations": PanelIcon,
  "/offres": ShieldIcon,
  "/simulateur": BoltIcon,
  "/a-propos": AuditIcon,
  "/contact": MailIcon,
};

/**
 * ---------------------------------------------------------------------------
 * ACCUEIL — un panneau solaire
 * ---------------------------------------------------------------------------
 * En haut, le texte de présentation sur une plaque vitrée. En dessous, les
 * onglets du site sous forme de cellules photovoltaïques dans leur cadre
 * aluminium (3 × 2, une seule colonne sur mobile).
 *
 * Chaque cellule « bipe » à tour de rôle : une diode verte s'allume et une
 * onde lumineuse part de la cellule, pour inviter au clic. Les ondes sont
 * décalées d'une cellule à l'autre et s'arrêtent si le système demande de
 * réduire les animations (voir `.pv-*` dans `globals.css`).
 */
export default function HomePage() {
  return (
    <section className="relative isolate overflow-hidden">
      <SectionBackdrop {...backdrops.accueil[0]} />

      <div className="container pb-20 pt-10 md:pt-14">
        {/* --------------------------- Plaque de texte --------------------------- */}
        <div className="pv-glass animate-rise">
          <div className="flex items-center justify-center gap-2.5">
            <LogoMark className="h-11 w-11" priority />
            <span className="text-[1.15rem] font-extrabold tracking-title">
              <span className="text-ink-dim">HAZAV</span>
              <span className="text-accent">&rsquo;IARY</span>
            </span>
          </div>

          <p className="eyebrow mt-6">
            <SunIcon width={13} height={13} />
            Énergie solaire &amp; solutions vertes
          </p>

          <h1 className="h1 mx-auto mt-5 max-w-4xl">
            L&rsquo;énergie solaire qui <span className="text-accent">éclaire durablement</span>{" "}
            Madagascar
          </h1>

          <p className="lead mx-auto mt-5 max-w-2xl">
            Installateur de panneaux solaires basé à {site.address.city}, nous intervenons partout
            à {site.address.countryName}. Descente technique avant tout devis, dimensionnement
            écrit, contrat à montant fixé et paiement échelonné sur plusieurs mois.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary btn-lg">
              Demander une visite technique
              <ArrowRightIcon width={16} height={16} />
            </Link>
            <a href={`tel:${site.phoneHref}`} className="btn-secondary btn-lg">
              {site.phone}
            </a>
          </div>
        </div>

        {/* ---------------------- Panneau : les onglets ---------------------- */}
        <nav aria-label="Pages du site" className="pv-frame mt-8">
          <ul className="pv-grid">
            {mainNav.map((item, i) => {
              const Icon = cellIcons[item.href] ?? SunIcon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="pv-cell group"
                    style={{ "--i": i } as CSSProperties}
                  >
                    {/* Diode et onde du « bip » */}
                    <span className="pv-ping" aria-hidden="true" />
                    <span className="pv-led" aria-hidden="true" />

                    <span className="pv-icon" aria-hidden="true">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="pv-label">{item.label}</span>
                    {item.description && <span className="pv-desc">{item.description}</span>}
                    <span className="pv-go">
                      Ouvrir
                      <ArrowRightIcon
                        width={14}
                        height={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
