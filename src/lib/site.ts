/**
 * ---------------------------------------------------------------------------
 * CONFIGURATION CENTRALE DU SITE
 * ---------------------------------------------------------------------------
 * Tout ce qui est marqué « À VALIDER » contient une valeur provisoire réaliste.
 * Remplacez-la par les informations réelles de Hazav'Iary : le reste du site
 * (SEO, données structurées, sitemap, pied de page, contact) se met à jour
 * automatiquement à partir de ce fichier.
 */

export const site = {
  name: "Hazav'Iary",
  legalName: "Hazav'Iary SARL", // À VALIDER
  shortName: "Hazav'Iary",
  /** Slogan affiché dans le hero et les partages sociaux. */
  tagline: "L'énergie solaire qui éclaire durablement Madagascar",
  description:
    "Hazav'Iary conçoit, installe et maintient des solutions solaires photovoltaïques à Madagascar : autoconsommation, systèmes hybrides, pompage solaire, stockage lithium et électrification rurale.",
  /** URL canonique de production. À VALIDER avant mise en ligne. */
  url: "https://www.hazaviary.mg",
  locale: "fr_MG",
  lang: "fr",
  foundingYear: 2018, // À VALIDER
  email: "contact@hazaviary.mg", // À VALIDER
  phone: "+261 34 00 000 00", // À VALIDER
  phoneHref: "+261340000000", // À VALIDER
  whatsapp: "261340000000", // À VALIDER
  address: {
    street: "Lot II M 24 Bis, Antanimena", // À VALIDER
    city: "Antananarivo",
    region: "Analamanga",
    postalCode: "101",
    country: "MG",
    countryName: "Madagascar",
  },
  geo: { lat: -18.8792, lng: 47.5079 }, // Antananarivo — À VALIDER
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "12:00" },
  ],
  areaServed: [
    "Antananarivo",
    "Toamasina",
    "Mahajanga",
    "Fianarantsoa",
    "Toliara",
    "Antsiranana",
    "Madagascar",
  ],
  social: {
    facebook: "https://www.facebook.com/hazaviary", // À VALIDER
    linkedin: "https://www.linkedin.com/company/hazaviary", // À VALIDER
    youtube: "", // optionnel
  },
  /** Codes de vérification moteurs de recherche — laisser vide si non utilisé. */
  verification: {
    google: "", // Google Search Console
    bing: "",
  },
} as const;

export type NavItem = { href: string; label: string; description?: string };

export const mainNav: NavItem[] = [
  { href: "/services", label: "Services", description: "Nos solutions solaires de A à Z" },
  { href: "/realisations", label: "Réalisations", description: "Chantiers livrés à Madagascar" },
  { href: "/simulateur", label: "Simulateur", description: "Dimensionnez votre installation" },
  { href: "/a-propos", label: "À propos", description: "L'équipe et nos engagements" },
  { href: "/blog", label: "Blog", description: "Conseils énergie solaire" },
  { href: "/contact", label: "Contact", description: "Devis gratuit sous 48 h" },
];

export const footerNav = {
  entreprise: [
    { href: "/a-propos", label: "À propos" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  ressources: [
    { href: "/simulateur", label: "Simulateur solaire" },
    { href: "/faq", label: "Questions fréquentes" },
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-de-confidentialite", label: "Confidentialité" },
  ],
};

/** Chiffres clés affichés en page d'accueil — À VALIDER. */
export const keyFigures = [
  { value: "450+", label: "Installations livrées", hint: "Résidentiel, tertiaire et rural" },
  { value: "3,2 MWc", label: "Puissance installée", hint: "Cumul du parc suivi par nos équipes" },
  { value: "−65 %", label: "Facture énergétique", hint: "Économie moyenne constatée chez nos clients" },
  { value: "48 h", label: "Délai de devis", hint: "Étude de dimensionnement incluse" },
];
