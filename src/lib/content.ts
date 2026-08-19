/**
 * Contenu éditorial du site (hors services et blog).
 *
 * Règle appliquée ici : rien d'inventé. Les zones d'intervention, le matériel
 * et le déroulé de chantier proviennent de l'application de gestion
 * (RSitraka/Hazav-Iary) ; les références client restent vides tant que de vrais
 * chantiers n'auront pas été fournis.
 *
 * Aucun montant n'est publié : le prix se fixe après la descente technique.
 */

/* -------------------------------------------------------------------------- */
/*  Références client                                                          */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  title: string;
  /** Code chantier interne, ex. « IVA-01 » (préfixe de la zone + numéro). */
  code: string;
  location: string;
  year: number;
  category: "Résidentiel" | "Professionnel";
  /** Matériel réellement posé, sans quantité chiffrée si non confirmée. */
  equipment: string[];
  summary: string;
  results: string[];
};

/**
 * VIDE VOLONTAIREMENT.
 *
 * L'application de gestion ne contient aucun chantier client réel : sa table
 * `projects` est remplie par un jeu de démonstration aléatoire
 * (`backend/cmd/seed/main.go`). Publier ces projets reviendrait à inventer des
 * références.
 *
 * Pour les ajouter, reprenez de vrais chantiers depuis l'écran « Projets » et
 * complétez ce tableau. La page /realisations affichera automatiquement la
 * section correspondante. Ne publiez ni le nom du bénéficiaire, ni son
 * téléphone, ni le montant convenu — le code chantier, la zone et le matériel
 * posé suffisent.
 */
export const projects: Project[] = [];

/* -------------------------------------------------------------------------- */
/*  Zones d'intervention                                                       */
/* -------------------------------------------------------------------------- */

/** Quartiers et communes suivis dans l'application de gestion. */
export const interventionZones = [
  "Nanisana",
  "Ivato",
  "Ankorondrano",
  "Analakely",
  "Itaosy",
  "Ambohibao",
  "Tanjombato",
  "Andoharanofotsy",
  "Ambatobe",
  "Talatamaty",
];

/* -------------------------------------------------------------------------- */
/*  Matériel posé                                                              */
/* -------------------------------------------------------------------------- */

export type EquipmentGroup = {
  title: string;
  items: string[];
};

/** Catalogue réellement tenu en stock par l'entreprise. */
export const equipmentCatalog: EquipmentGroup[] = [
  {
    title: "Production",
    items: ["Panneau solaire 450 W", "Panneau solaire 300 W"],
  },
  {
    title: "Stockage et conversion",
    items: ["Batterie lithium 200 Ah", "Onduleur 5 kVA", "Régulateur MPPT 60 A"],
  },
  {
    title: "Câblage et protection",
    items: [
      "Câble solaire 6 mm²",
      "Connecteur MC4",
      "Disjoncteur DC",
      "Coffret de protection",
    ],
  },
  {
    title: "Fixation",
    items: ["Structure de fixation", "Support de toit", "Visserie inox"],
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
      "Nous suivons des chantiers dans l'agglomération d'Antananarivo : Nanisana, Ivato, Ankorondrano, Analakely, Itaosy, Ambohibao, Tanjombato, Andoharanofotsy, Ambatobe et Talatamaty. Pour un site plus éloigné, contactez-nous : les conditions de déplacement sont convenues avant la visite.",
  },
  {
    question: "Quel matériel installez-vous ?",
    answer:
      "Des panneaux de 300 W et 450 W, des batteries lithium 200 Ah, des onduleurs 5 kVA et des régulateurs MPPT 60 A, avec câble solaire 6 mm², connecteurs MC4, disjoncteurs DC et coffrets de protection. Le matériel posé chez vous est identifié et rattaché à votre dossier de chantier.",
  },
  {
    question: "Peut-on agrandir l'installation plus tard ?",
    answer:
      "Oui, à condition de l'avoir prévu dès la conception. Nous choisissons un onduleur et un schéma de câblage qui autorisent l'ajout de panneaux ou de batteries sans repartir de zéro.",
  },
];
