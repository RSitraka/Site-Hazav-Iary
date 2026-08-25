/**
 * ---------------------------------------------------------------------------
 * PHOTOS DE TERRAIN
 * ---------------------------------------------------------------------------
 * Photos réelles des équipes Hazav'Iary, stockées dans `public/photos/`.
 * Elles alimentent le carrousel de l'accueil (`<PhotoCarousel />`).
 *
 * Pour en ajouter : déposez le fichier dans `public/photos/`, puis ajoutez une
 * entrée ici avec ses dimensions réelles (elles évitent tout décalage de mise
 * en page au chargement) et une légende courte. L'ordre du tableau est l'ordre
 * d'affichage.
 */
export type Photo = {
  src: string;
  /** Description pour les lecteurs d'écran et le référencement images. */
  alt: string;
  /** Légende affichée en bas de la vignette. */
  caption: string;
  width: number;
  height: number;
};

/**
 * Sous-chemin de publication (`/Site-Hazav-Iary` sur GitHub Pages, vide sur un
 * domaine propre). En export statique les images ne sont pas optimisées, et
 * Next laisse alors le `src` tel quel : le préfixe est ajouté ici, une fois
 * pour toutes, sinon les photos pointeraient à côté du site.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const fichiers: Photo[] = [
  {
    src: "/photos/equipe-hazaviary.jpg",
    alt: "L'équipe Hazav'Iary sur le terrain avec un panneau solaire et un générateur portable",
    caption: "L'équipe sur le terrain",
    width: 1280,
    height: 960,
  },
  {
    src: "/photos/demonstration-kit-solaire.jpg",
    alt: "Démonstration d'un kit solaire : panneau, générateur, ampoules et téléviseur alimentés",
    caption: "Le kit complet en démonstration",
    width: 960,
    height: 1280,
  },
  {
    src: "/photos/presentation-village.jpg",
    alt: "Présentation d'une installation solaire devant les habitants d'un village",
    caption: "Présentation aux habitants",
    width: 1280,
    height: 960,
  },
  {
    src: "/photos/explication-ampoule-famille.jpg",
    alt: "Une technicienne Hazav'Iary explique le fonctionnement d'une ampoule solaire à une famille",
    caption: "Prise en main, famille par famille",
    width: 960,
    height: 1280,
  },
  {
    src: "/photos/prospectus-hazaviary.jpg",
    alt: "Un habitant lit le prospectus Hazav'Iary présentant l'offre d'électrification solaire",
    caption: "L'offre expliquée sur place",
    width: 960,
    height: 1280,
  },
  {
    src: "/photos/logo-equipe.jpg",
    alt: "Le logo Hazav'Iary brodé sur le t-shirt de l'équipe d'intervention",
    caption: "Des équipes identifiables",
    width: 963,
    height: 1280,
  },
];

export const photos: Photo[] = fichiers.map((photo) => ({
  ...photo,
  src: `${base}${photo.src}`,
}));
