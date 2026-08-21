/**
 * ---------------------------------------------------------------------------
 * CONFIGURATION CENTRALE DU SITE
 * ---------------------------------------------------------------------------
 * Les coordonnées sont celles fournies par l'entreprise. Ce qui reste marqué
 * « À VALIDER » n'a pas encore été confirmé : le reste du site (SEO, données
 * structurées, sitemap, pied de page, contact) se met à jour automatiquement
 * à partir de ce fichier.
 */

export const site = {
  name: "Hazav'Iary",
  legalName: "Hazav'Iary", // Forme juridique à préciser si elle doit apparaître
  shortName: "Hazav'Iary",
  /** Slogan affiché dans le hero et les partages sociaux. */
  tagline: "L'énergie solaire qui éclaire durablement Madagascar",
  description:
    "Hazav'Iary installe des panneaux solaires partout à Madagascar : descente technique sur site, dimensionnement, contrat écrit, pose et suivi de chantier, avec paiement échelonné sur plusieurs mois.",
  /** URL canonique de production. À VALIDER avant mise en ligne. */
  url: "https://www.hazaviary.mg",
  locale: "fr_MG",
  lang: "fr",
  email: "sitrakahers@gmail.com",
  phone: "038 59 440 87",
  phoneHref: "+261385944087",
  whatsapp: "261385944087",
  address: {
    street: "Lot Nanisana Iadiambola",
    city: "Antananarivo",
    region: "Analamanga",
    postalCode: "101",
    country: "MG",
    countryName: "Madagascar",
  },
  geo: { lat: -18.8907, lng: 47.5613 }, // Nanisana, Antananarivo — À VALIDER
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "12:00" },
  ],
  /**
   * Zone desservie : l'entreprise intervient dans toute l'île. Les provinces
   * sont listées pour les données structurées (`areaServed`) ; la base reste
   * Antananarivo, d'où partent les équipes.
   */
  areaServed: [
    "Madagascar",
    "Antananarivo",
    "Antsiranana",
    "Fianarantsoa",
    "Mahajanga",
    "Toamasina",
    "Toliara",
  ],
  social: {
    facebook: "", // À COMPLÉTER
    linkedin: "", // À COMPLÉTER
    youtube: "",
  },
  /** Codes de vérification moteurs de recherche — laisser vide si non utilisé. */
  verification: {
    google: "", // Google Search Console
    bing: "",
  },
} as const;

export type NavItem = { href: string; label: string; description?: string };

export const mainNav: NavItem[] = [
  { href: "/services", label: "Services", description: "De la descente au suivi de chantier" },
  { href: "/realisations", label: "Réalisations", description: "Zones et matériel installés" },
  { href: "/simulateur", label: "Simulateur", description: "Dimensionnez votre installation" },
  { href: "/a-propos", label: "À propos", description: "L'équipe et notre méthode" },
  { href: "/contact", label: "Contact", description: "Devis après visite technique" },
];

export const footerNav = {
  entreprise: [
    { href: "/a-propos", label: "À propos" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/contact", label: "Contact" },
  ],
  ressources: [
    { href: "/simulateur", label: "Simulateur solaire" },
    { href: "/faq", label: "Questions fréquentes" },
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-de-confidentialite", label: "Confidentialité" },
  ],
};

/**
 * Repères mis en avant sur l'accueil. Ce sont des engagements de méthode,
 * vérifiables — pas des statistiques commerciales.
 */
export const keyFigures = [
  {
    value: "Descente",
    label: "Visite de site avant tout devis",
    hint: "Relevé sur place, localisation et note de visite",
  },
  {
    value: "Contrat",
    label: "Montant et durée fixés par écrit",
    hint: "Rien ne démarre sans accord signé",
  },
  {
    value: "Mensualités",
    label: "Paiement échelonné sur plusieurs mois",
    hint: "Une avance, puis des mensualités régulières",
  },
  {
    value: "Suivi",
    label: "Chaque chantier tracé",
    hint: "Matériel posé, documents et avancement enregistrés",
  },
];
