/**
 * Contenu éditorial du site (hors services et offres).
 *
 * Règle appliquée ici : rien d'inventé. Le matériel et le déroulé de chantier
 * proviennent de l'application de gestion (RSitraka/Hazav-Iary) ; les chantiers
 * livrés et les zones d'installation sont synchronisés chaque nuit depuis sa
 * base, via `ops/sync-realisations.sh`.
 *
 * Aucun montant n'est publié : le prix se fixe après la descente technique.
 */
import realisationsBrut from "@/data/realisations.json";

/**
 * Forme du fichier écrit par `ops/sync-realisations.sh`. Le typage est déclaré
 * ici : quand le fichier est vide, TypeScript déduirait sinon des tableaux de
 * `never` et le site ne compilerait plus.
 */
type FichierRealisations = {
  /** Horodatage de la dernière synchronisation, `null` si jamais lancée. */
  genere_le: string | null;
  chantiers: { code: string; zone: string; annee: number; materiel: string[] }[];
  zones: string[];
};

const realisations = realisationsBrut as FichierRealisations;

/* -------------------------------------------------------------------------- */
/*  Références client                                                          */
/* -------------------------------------------------------------------------- */

export type Project = {
  /** Code chantier interne, ex. « IVA-01 » (préfixe de la zone + numéro). */
  code: string;
  location: string;
  year: number;
  /** Matériel réellement posé, sans quantité chiffrée. */
  equipment: string[];
  /** Champs facultatifs : uniquement si quelqu'un les rédige à la main. */
  title?: string;
  summary?: string;
  results?: string[];
  category?: "Résidentiel" | "Professionnel";
};

/**
 * Chantiers livrés, repris de l'application de gestion.
 *
 * Le fichier `src/data/realisations.json` est réécrit chaque nuit par
 * `ops/sync-realisations.sh`, qui lit une copie de la base de l'application et
 * n'en extrait que ce qui est publiable : code chantier, zone, année et
 * matériel posé. Ni nom de bénéficiaire, ni téléphone, ni montant.
 *
 * Tant que l'application ne contient aucun chantier terminé, le tableau reste
 * vide et la section « Références » de /realisations n'apparaît pas.
 */
export const projects: Project[] = realisations.chantiers.map((chantier) => ({
  code: chantier.code,
  location: chantier.zone,
  year: chantier.annee,
  equipment: chantier.materiel,
}));

/* -------------------------------------------------------------------------- */
/*  Zones d'intervention                                                       */
/* -------------------------------------------------------------------------- */

/**
 * L'entreprise intervient dans toute l'île. Les six provinces servent à dire
 * cette couverture ; ce ne sont pas des chantiers déclarés.
 */
export const provinces = [
  "Antananarivo",
  "Antsiranana",
  "Fianarantsoa",
  "Mahajanga",
  "Toamasina",
  "Toliara",
];

/**
 * Zones où des panneaux ont réellement été installés — les emplacements de
 * l'application rattachés à au moins un chantier terminé.
 *
 * Synchronisées chaque nuit avec les chantiers (même fichier, même script).
 * Tant que la liste est vide, /realisations annonce la couverture nationale
 * plutôt que d'afficher des zones inventées.
 */
export const installedZones: string[] = realisations.zones;

/* -------------------------------------------------------------------------- */
/*  Matériel posé                                                              */
/* -------------------------------------------------------------------------- */

export type EquipmentGroup = {
  title: string;
  items: string[];
};

/**
 * Catégories de matériel posé. Volontairement sans puissances ni capacités :
 * les caractéristiques se fixent après la descente technique, à partir du
 * relevé — les annoncer d'avance reviendrait à dimensionner à l'aveugle.
 */
export const equipmentCatalog: EquipmentGroup[] = [
  {
    title: "Production",
    items: ["Plaques solaires", "Kits solaires complets", "Ampoules LED"],
  },
  {
    title: "Stockage et conversion",
    items: ["Batteries", "Générateurs solaires", "Onduleurs", "Régulateurs de charge"],
  },
  {
    title: "Câblage et protection",
    items: ["Câble solaire", "Connecteurs", "Disjoncteurs", "Coffrets de protection"],
  },
  {
    title: "Fixation",
    items: ["Structures de fixation", "Supports de toit", "Visserie inox"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Témoignages                                                                */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/**
 * VIDE VOLONTAIREMENT — à remplir uniquement avec de vrais retours clients,
 * recueillis avec leur accord. La section correspondante n'apparaît pas tant
 * que ce tableau est vide.
 */
export const testimonials: Testimonial[] = [];

/* -------------------------------------------------------------------------- */
/*  Déroulé d'un chantier                                                      */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  {
    step: "01",
    title: "Prise de contact",
    text: "Vous décrivez votre besoin et ce que vous souhaitez alimenter. Nous convenons d'une date de visite.",
  },
  {
    step: "02",
    title: "Descente technique",
    text: "Une équipe se déplace : relevé de la toiture, des ombrages, du tableau électrique et des appareils à alimenter. La visite est consignée et localisée.",
  },
  {
    step: "03",
    title: "Dimensionnement et devis",
    text: "Panneaux, capacité batterie et puissance d'onduleur sont calculés à partir du relevé, puis chiffrés dans une proposition écrite.",
  },
  {
    step: "04",
    title: "Contrat et avance",
    text: "Le contrat fixe le montant convenu et la durée de paiement. Une avance déclenche la préparation du matériel.",
  },
  {
    step: "05",
    title: "Installation",
    text: "Le matériel est sorti du stock et affecté à votre chantier. Pose, câblage, protections, essais et mise en service.",
  },
  {
    step: "06",
    title: "Suivi et mensualités",
    text: "Le dossier de chantier reste tenu à jour, les mensualités se poursuivent jusqu'au solde, et l'entretien prend le relais.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Engagements                                                                */
/* -------------------------------------------------------------------------- */

export const commitments = [
  {
    title: "Voir avant de chiffrer",
    text: "Aucun prix n'est annoncé sans descente technique. Un chiffre donné au téléphone est un chiffre faux.",
  },
  {
    title: "Écrire ce qui est convenu",
    text: "Montant, durée de paiement et matériel prévu figurent au contrat avant que le chantier ne démarre.",
  },
  {
    title: "Tracer chaque chantier",
    text: "Matériel posé, documents et avancement sont enregistrés : votre dossier reste consultable après les travaux.",
  },
  {
    title: "Étaler le paiement",
    text: "Une avance puis des mensualités : l'investissement solaire ne doit pas se jouer sur un seul versement.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Questions fréquentes                                                       */
/* -------------------------------------------------------------------------- */

export type FaqItem = { question: string; answer: string };

export const generalFaq: FaqItem[] = [
  {
    question: "Combien coûte une installation solaire ?",
    answer:
      "Le prix dépend de ce que vous voulez alimenter, de la durée pendant laquelle vous voulez le faire sans le réseau, et de votre toiture. Ces trois éléments ne se devinent pas à distance : nous les relevons lors de la descente technique, puis nous chiffrons. C'est pourquoi aucun tarif n'est affiché sur ce site.",
  },
  {
    question: "Peut-on payer en plusieurs fois ?",
    answer:
      "Oui, c'est notre fonctionnement habituel. Le contrat fixe un montant convenu et un nombre de mois : vous versez une avance à la commande, puis des mensualités calculées sur le solde restant, jusqu'au règlement complet.",
  },
  {
    question: "Que se passe-t-il lors de la descente technique ?",
    answer:
      "Une équipe se rend sur place pour relever la toiture, son orientation et ses ombrages, l'état du tableau électrique, le cheminement des câbles et la liste des appareils à alimenter. La visite fait l'objet d'une note écrite, qui sert de base au dimensionnement.",
  },
  {
    question: "Faut-il des batteries ?",
    answer:
      "Pas systématiquement. Si votre consommation est surtout diurne, l'énergie est utilisée au moment où elle est produite. Les batteries deviennent nécessaires dès qu'il faut couvrir la nuit ou sécuriser des équipements sensibles — et elles pèsent lourd dans le budget, d'où l'importance de ne pas les surdimensionner.",
  },
  {
    question: "Quelle est la durée de vie des équipements ?",
    answer:
      "Les panneaux photovoltaïques restent productifs pendant des décennies. Les onduleurs se remplacent au bout de plusieurs années d'usage. Les batteries sont la vraie pièce d'usure : le lithium tient plusieurs milliers de cycles, bien plus que le plomb.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "Partout à Madagascar. Notre base est à Antananarivo, mais nos équipes se déplacent dans les autres provinces, y compris pour des sites hors réseau. Pour un site éloigné, contactez-nous : les conditions de déplacement sont convenues avant la visite et chiffrées dans le devis.",
  },
  {
    question: "Quel matériel installez-vous ?",
    answer:
      "Toutes sortes de plaques solaires, ainsi que batteries, générateurs solaires, onduleurs et régulateurs de charge, avec le câblage, les connecteurs, les disjoncteurs et les coffrets de protection qui vont avec. Les références et les puissances sont choisies après la descente technique, selon ce que vous avez à alimenter. Le matériel posé chez vous est identifié et rattaché à votre dossier de chantier.",
  },
  {
    question: "Peut-on agrandir l'installation plus tard ?",
    answer:
      "Oui, à condition de l'avoir prévu dès la conception. Nous choisissons un onduleur et un schéma de câblage qui autorisent l'ajout de panneaux ou de batteries sans repartir de zéro.",
  },
];
