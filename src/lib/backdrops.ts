/**
 * ---------------------------------------------------------------------------
 * FONDS PHOTOGRAPHIQUES DES PAGES
 * ---------------------------------------------------------------------------
 * Chaque page pose des photos atténuées derrière son texte (voir
 * `<SectionBackdrop />` et la section « FONDS PHOTOGRAPHIQUES » de
 * `globals.css`). Le sujet est toujours le même : des installations solaires
 * réelles — toitures, balcons, stations portables — pour que le discours soit
 * porté par ce dont il parle.
 *
 * Ces images-ci viennent d'Unsplash (licence gratuite, usage commercial
 * autorisé, sans attribution obligatoire) et sont stockées dans
 * `public/photos/fonds/`. Elles sont volontairement séparées de
 * `public/photos/`, qui ne contient que les photos des équipes Hazav'Iary —
 * celles-ci alimentent les carrousels (`src/lib/gallery.ts`), jamais les fonds.
 *
 * Les originaux faisaient jusqu'à 6720 px et 5 Mo ; ils ont été ramenés à
 * 2200 px sur le plus grand côté, ce qui reste très au-delà de ce qu'un fond
 * voilé demande.
 *
 * Règle de composition : jamais deux fois la même photo dans une même page.
 */
export type Backdrop = {
  src: string;
  /** Sujet de la photo — sert la relecture, pas le rendu (le fond est décoratif). */
  sujet: string;
  /** Point d'intérêt à préserver au recadrage (`object-position`). */
  position?: string;
};

/**
 * Sous-chemin de publication, vide sur un domaine propre. Même raison que dans
 * `gallery.ts` : en export statique Next laisse le `src` tel quel.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const p = (src: string, sujet: string, position = "center"): Backdrop => ({
  src: `${base}/photos/fonds/${src}`,
  sujet,
  position,
});

const catalogue = {
  /** Vue plongeante sur un champ de panneaux posé sur une toiture en tuiles. */
  toiture: p("toiture-tuiles-panneaux.jpg", "Panneaux sur une toiture en tuiles", "center 45%"),
  /** Un installateur visse un panneau, corde de sécurité et ciel franc. */
  pose: p("pose-panneau-toiture.jpg", "Pose d'un panneau sur un toit", "center 40%"),
  /** Deux panneaux inclinés sur un toit-terrasse, lumière d'automne. */
  terrasse: p("panneaux-toit-terrasse.jpg", "Panneaux sur un toit-terrasse", "center 55%"),
  /** Panneaux alignés sur le toit d'une maison en briques (photo verticale). */
  maison: p("maison-briques-panneaux.jpg", "Panneaux sur une maison en briques", "center 35%"),
  /** Un panneau accroché au garde-corps d'un balcon : le solaire en ville. */
  balcon: p("panneau-balcon.jpg", "Panneau accroché à un balcon", "center 60%"),
  /** Station portable en charge dans un intérieur : l'autonomie à la maison. */
  interieur: p("station-portable-interieur.jpg", "Station portable en charge à la maison", "center 55%"),
  /** Station portable qui alimente un campement à la nuit tombée. */
  campement: p("station-portable-campement.jpg", "Station portable alimentant un campement", "center 50%"),
} as const;

/**
 * Les fonds d'une page, dans l'ordre où ils apparaissent en descendant.
 */
export const backdrops = {
  accueil: [catalogue.toiture, catalogue.pose, catalogue.terrasse],
  services: [catalogue.pose, catalogue.toiture, catalogue.maison],
  serviceDetail: [catalogue.maison, catalogue.terrasse, catalogue.pose],
  offres: [catalogue.interieur, catalogue.campement, catalogue.balcon],
  realisations: [catalogue.toiture, catalogue.maison, catalogue.terrasse],
  simulateur: [catalogue.balcon, catalogue.interieur, catalogue.toiture],
  aPropos: [catalogue.pose, catalogue.terrasse, catalogue.campement],
  faq: [catalogue.campement, catalogue.balcon, catalogue.maison],
  contact: [catalogue.maison, catalogue.interieur],
  /** Pages légales : un seul fond, très en retrait — ce sont des pages de lecture. */
  legal: [catalogue.terrasse],
} satisfies Record<string, readonly Backdrop[]>;
