/**
 * ---------------------------------------------------------------------------
 * OFFRES CATALOGUE — KITS SOLAIRES
 * ---------------------------------------------------------------------------
 * Reprise fidèle du dépliant terrain officiel (« Vos offres énergie &
 * autonomie solaire »). Ce sont les seuls montants publiés sur le site : ils
 * concernent des kits prêts à poser, vendus tels quels. Toute installation
 * dimensionnée sur mesure reste chiffrée après la descente technique.
 *
 * Les montants sont stockés en ariary, en nombres : l'avance et la mensualité
 * se contrôlent d'un coup d'œil (avance + mensualité × mois = prix comptant)
 * et l'affichage est formaté au même endroit pour tout le site.
 */

export type Kit = {
  slug: string;
  /** Nom commercial tel qu'annoncé sur le terrain. */
  name: string;
  /** Famille affichée en tête de carte. */
  family: string;
  /** Promesse courte, reprise dans le tableau récapitulatif. */
  ideal: string;
  icon: "bolt" | "sun" | "home" | "panel";
  composition: string[];
  /** Ce que le kit alimente réellement, sans promesse au-delà. */
  usages: string;
  /** Autonomie annoncée, dans les conditions d'usage décrites. */
  autonomy: string;
  /** Prix comptant, en ariary. */
  price: number;
  credit: {
    /** Nom commercial de la formule. */
    label: string;
    months: number;
    /** Avance versée à la commande. */
    deposit: number;
    /** Mensualité ensuite, arrondie comme annoncée sur le dépliant. */
    monthly: number;
  };
};

export const kits: Kit[] = [
  {
    slug: "mini-a2",
    name: "Kit Mini A2",
    family: "Éclairage & éco",
    ideal: "Éclairage & petits budgets",
    icon: "bolt",
    composition: [
      "Mini générateur robuste x1",
      "Mini plaque solaire HD x1",
      "Ampoules LED économiques x2",
    ],
    usages:
      "Éclairage d'une maisonnette et recharge complète de smartphones.",
    autonomy: "8 h à 10 h d'éclairage continu",
    price: 70_000,
    credit: { label: "Crédit Facile", months: 3, deposit: 42_000, monthly: 9_330 },
  },
  {
    slug: "mini-a2r",
    name: "Kit Mini A2R",
    family: "Divertissement éco",
    ideal: "Divertissement éco",
    icon: "sun",
    composition: [
      "Mini générateur Premium x1",
      "Radio FM haute fréquence intégrée",
      "Mini plaque solaire HD x1",
      "Ampoules LED x2 + câbles multi-embouts",
    ],
    usages:
      "Éclairage simultané jusqu'à 3 ampoules, écoute de la radio et recharge des téléphones.",
    autonomy: "6 h à 8 h (radio + lumière)",
    price: 150_000,
    credit: { label: "Financement souple", months: 3, deposit: 60_000, monthly: 30_000 },
  },
  {
    slug: "kit-300w",
    name: "Kit 300 W",
    family: "Confort familial",
    ideal: "Confort familial",
    icon: "home",
    composition: [
      "Générateur central 300 W x1",
      "Panneau solaire haute capacité x1",
      "Extension multi-ports intelligente",
      "Ampoules LED puissantes x2",
    ],
    usages:
      "Télévision 32\" maximum, décodeur, ordinateur portable, smartphones et jusqu'à 6 ampoules.",
    autonomy: "5 h à 7 h en usage multimédia complet",
    price: 520_000,
    credit: { label: "Grand Crédit Confort", months: 6, deposit: 208_000, monthly: 52_000 },
  },
  {
    slug: "kit-500w",
    name: "Kit 500 W",
    family: "Puissance pro",
    ideal: "Puissance totale",
    icon: "panel",
    composition: [
      "Générateur ultra-puissant 500 W",
      "Grand panneau solaire performance",
      "Kit complet d'ampoules de rechange",
    ],
    usages:
      "Grande TV jusqu'à 42\", décodeur, sono ou caisson de basses, ordinateur professionnel et éclairage complet.",
    autonomy: "4 h à 6 h à puissance maximale",
    price: 900_000,
    credit: { label: "Crédit Privilège", months: 6, deposit: 540_000, monthly: 60_000 },
  },
];

/**
 * Au-delà des kits, tout se construit sur mesure : c'est le cœur de la
 * promesse commerciale, la gamme catalogue n'en est que le point d'entrée.
 */
export const customPower = {
  range: "1000 W à 6 kVA",
  title: "Solutions sur mesure",
  audience: "Cliniques, grands bureaux, villas et ateliers.",
  scope:
    "Prise en charge complète des réfrigérateurs, congélateurs et outillages.",
  autonomy:
    "Autonomie continue établie sur devis technique, après évaluation par nos ingénieurs de terrain.",
  note: "Éligible uniquement au paiement comptant à la livraison.",
};

/**
 * Ce que nous garantissons quelle que soit la taille demandée : c'est le
 * message que les équipes portent sur le terrain, repris tel quel ici.
 */
export const promises: { title: string; text: string }[] = [
  {
    title: "Nous dimensionnons à votre demande",
    text: "Deux ampoules ou un atelier complet : nous partons de ce que vous voulez alimenter, pas d'une grille de produits. Un kit du catalogue se complète, se renforce ou se remplace par une installation calculée pour vous.",
  },
  {
    title: "Aucune taille refusée",
    text: "Du plus petit besoin d'éclairage jusqu'à 6 kVA, et au-delà sur étude. Si votre besoin dépasse nos kits, nos ingénieurs de terrain le chiffrent après visite plutôt que de vous orienter vers un kit trop juste.",
  },
  {
    title: "Une installation qui grandit avec vous",
    text: "Panneaux, stockage et puissance s'ajoutent plus tard sans tout refaire : nous prévoyons dès la pose ce qu'il faudra pour agrandir.",
  },
  {
    title: "Le paiement suit la taille du projet",
    text: "Crédit flexible sur 3 à 6 mois sur tous les kits — une avance, puis des mensualités douces. Pour les grandes puissances, le règlement se fait comptant à la livraison.",
  },
];

/** Arguments repris du dépliant, affichés en fin de page. */
export const reasons = [
  "Énergie garantie au meilleur prix.",
  "Facilités de paiement sur 3 à 6 mois.",
  "Matériel robuste, installation simple.",
  "Du simple éclairage aux grandes puissances.",
];

/**
 * Formatage des montants : espace insécable entre les milliers et devant
 * « Ar », pour qu'un prix ne se coupe jamais en fin de ligne.
 */
export function ariary(amount: number) {
  return `${amount.toLocaleString("fr-FR").replace(/[\u202f\u00a0\s]/g, "\u00a0")}\u00a0Ar`;
}
