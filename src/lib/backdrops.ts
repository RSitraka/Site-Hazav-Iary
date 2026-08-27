/**
 * ---------------------------------------------------------------------------
 * FONDS PHOTOGRAPHIQUES DES PAGES
 * ---------------------------------------------------------------------------
 * Chaque page pose trois photos très atténuées derrière son texte (voir
 * `<SectionBackdrop />` et la section « FONDS PHOTOGRAPHIQUES » de
 * `globals.css`). Le but est d'ancrer le discours dans le réel — terrain
 * malgache, matériel, installations — sans jamais gêner la lecture.
 *
 * Toutes les images viennent de `public/photos/` : ce sont les photos des
 * équipes Hazav'Iary, pas du stock. Pour en ajouter une, déposez le fichier,
 * décrivez-la dans `catalogue`, puis placez-la dans la page voulue.
 *
 * Règle de composition : jamais deux fois la même photo dans une même page,
 * et l'on évite de reprendre en fond une photo déjà affichée en grand sur la
 * page (le carrousel de l'accueil, la galerie des réalisations).
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
  src: `${base}/photos/${src}`,
  sujet,
  position,
});

const catalogue = {
  /** Présentation d'un kit devant les habitants d'un village, latérite et ciel chargé. */
  village: p("presentation-village.jpg", "Présentation devant les habitants d'un village", "center 40%"),
  /** L'équipe au complet, panneau et générateur en main, plein ciel. */
  equipe: p("equipe-hazaviary.jpg", "L'équipe Hazav'Iary sur le terrain", "center 35%"),
  /** Le panneau et le générateur en démonstration, paysage de brousse au fond. */
  kit: p("demonstration-kit-solaire.jpg", "Panneau et générateur en démonstration", "center 30%"),
  /** Explication d'une ampoule solaire à une famille, devant une maison en terre. */
  famille: p("explication-ampoule-famille.jpg", "Explication à une famille", "center 25%"),
  /** Un prospectus lu de près : le geste commercial, au plus près des gens. */
  prospectus: p("prospectus-hazaviary.jpg", "Un habitant lit le prospectus", "center 35%"),
  /** L'emblème brodé sur un tee-shirt : une texture, plus qu'une scène. */
  embleme: p("logo-equipe.jpg", "L'emblème Hazav'Iary sur les tee-shirts", "center 40%"),
} as const;

/**
 * Trois fonds par page, dans l'ordre où ils apparaissent en descendant.
 */
export const backdrops = {
  accueil: [catalogue.village, catalogue.kit, catalogue.famille],
  services: [catalogue.kit, catalogue.equipe, catalogue.village],
  serviceDetail: [catalogue.equipe, catalogue.kit, catalogue.famille],
  offres: [catalogue.famille, catalogue.prospectus, catalogue.kit],
  realisations: [catalogue.village, catalogue.equipe, catalogue.embleme],
  simulateur: [catalogue.kit, catalogue.village, catalogue.equipe],
  aPropos: [catalogue.equipe, catalogue.famille, catalogue.embleme],
  faq: [catalogue.famille, catalogue.village, catalogue.prospectus],
  contact: [catalogue.prospectus, catalogue.equipe, catalogue.village],
  /** Pages légales : un seul fond, très en retrait — ce sont des pages de lecture. */
  legal: [catalogue.embleme],
} satisfies Record<string, readonly Backdrop[]>;
