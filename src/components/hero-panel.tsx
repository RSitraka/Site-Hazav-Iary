"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Panneau du hero : la « console » de la maquette — barre d'onglets numérotés
 * en haut, texte à gauche, tuiles de chiffres à droite.
 *
 * Les onglets reprennent les quatre temps d'un chantier Hazav'Iary. Les
 * valeurs affichées sont celles du catalogue et de la méthode : rien n'est
 * inventé pour faire joli.
 */
type Tab = {
  id: string;
  label: string;
  title: string;
  text: string;
  href: string;
  tiles: { label: string; value: string }[];
};

const tabs: Tab[] = [
  {
    id: "descente",
    label: "Descente technique",
    title: "Nous venons voir avant de chiffrer",
    text: "Toiture, orientation, ombrages, tableau électrique et appareils à alimenter sont relevés sur place. La visite est consignée et localisée.",
    href: "/services",
    tiles: [
      { label: "Relevé", value: "Sur site" },
      { label: "Ombrages", value: "Mesurés" },
      { label: "Note de visite", value: "Écrite" },
      { label: "Devis", value: "Après visite" },
    ],
  },
  {
    id: "dimensionnement",
    label: "Dimensionnement",
    title: "Le bon système, ni plus gros, ni plus petit",
    text: "Panneaux, capacité de batterie et puissance d'onduleur sont calculés appareil par appareil, à partir du relevé.",
    href: "/simulateur",
    // Aucune puissance affichée : elle se fixe après le relevé, pas avant.
    tiles: [
      { label: "Panneaux", value: "Selon toiture" },
      { label: "Batteries", value: "Selon autonomie" },
      { label: "Onduleur", value: "Selon charge" },
      { label: "Calcul", value: "Écrit" },
    ],
  },
  {
    id: "contrat",
    label: "Contrat & paiement",
    title: "Le montant et la durée sont écrits",
    text: "Le contrat fixe le montant convenu et le nombre de mois. Une avance déclenche la préparation du matériel, le solde s'étale ensuite.",
    href: "/faq",
    tiles: [
      { label: "Montant", value: "Fixé" },
      { label: "Durée", value: "En mois" },
      { label: "Avance", value: "À la commande" },
      { label: "Solde", value: "Mensualités" },
    ],
  },
  {
    id: "suivi",
    label: "Suivi de chantier",
    title: "Chaque chantier reste tracé",
    text: "Matériel posé, documents et avancement sont enregistrés dans votre dossier ; l'entretien prend le relais après la mise en service.",
    href: "/realisations",
    tiles: [
      { label: "Matériel", value: "Affecté" },
      { label: "Dossier", value: "Conservé" },
      { label: "Mise en service", value: "Essais" },
      { label: "Entretien", value: "Programmé" },
    ],
  },
];

export function HeroPanel({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className={`panel overflow-hidden p-0 shadow-glow-lg ${className}`}>
      {/* Barre d'onglets numérotés */}
      <div
        role="tablist"
        aria-label="Étapes d'un chantier"
        className="flex gap-1 overflow-x-auto border-b border-line p-2"
      >
        {tabs.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`hero-tab-${item.id}`}
              aria-selected={on}
              aria-controls={`hero-panel-${item.id}`}
              onClick={() => setActive(i)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-label transition-all duration-200 ${
                on
                  ? "bg-accent text-accent-on shadow-glow"
                  : "text-ink-mut hover:bg-panel-3 hover:text-ink-dim"
              }`}
            >
              <span className={on ? "opacity-70" : "text-accent/70"}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Contenu de l'onglet actif */}
      <div
        role="tabpanel"
        id={`hero-panel-${tab.id}`}
        aria-labelledby={`hero-tab-${tab.id}`}
        className="grid gap-8 p-6 md:grid-cols-[1fr_1.05fr] md:items-center md:p-8"
      >
        <div key={tab.id} className="animate-rise">
          <h2 className="h3 text-[1.35rem] leading-snug">{tab.title}</h2>
          <p className="mt-3 text-sm leading-relaxed muted">{tab.text}</p>
          <Link
            href={tab.href}
            className="group mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-label text-accent"
          >
            En savoir plus
            <ArrowRightIcon
              width={14}
              height={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div key={`${tab.id}-tiles`} className="grid animate-rise grid-cols-2 gap-3">
          {tab.tiles.map((tile) => (
            <div key={tile.label} className="tile">
              <p className="label">{tile.label}</p>
              <p className="mt-3 text-[1.45rem] font-extrabold tracking-title text-ink">
                {tile.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
