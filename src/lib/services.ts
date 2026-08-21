/**
 * Les six prestations correspondent au métier décrit dans l'application de
 * gestion (RSitraka/Hazav-Iary) : descente sur site, projet avec montant
 * convenu et durée, matériel sorti du stock, contrats et documents, suivi de
 * paiement échelonné.
 *
 * Aucun montant n'est publié sur le site : le prix se fixe après la descente
 * technique, dans le contrat.
 */

export type Service = {
  slug: string;
  title: string;
  /** Titre court pour la navigation et les cartes. */
  short: string;
  icon: "panel" | "map" | "audit" | "battery" | "factory" | "wrench";
  excerpt: string;
  /** Mots-clés ciblés pour le référencement de la page dédiée. */
  keywords: string[];
  intro: string;
  benefits: string[];
  deliverables: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "installation-panneaux-solaires",
    title: "Installation de panneaux solaires",
    short: "Installation solaire",
    icon: "panel",
    excerpt:
      "Pose complète de votre installation photovoltaïque : panneaux, structure, câblage et protections, par nos techniciens.",
    keywords: [
      "installation panneaux solaires Antananarivo",
      "installateur solaire Madagascar",
      "pose plaque solaire",
      "plaque solaire Madagascar",
    ],
    intro:
      "C'est notre cœur de métier : installer des plaques solaires chez des particuliers et des professionnels, à Antananarivo comme ailleurs à Madagascar. Nous posons toutes sortes de panneaux, choisis selon la place disponible en toiture et le besoin relevé lors de la descente, avec structure de fixation, supports de toit, câble solaire et connecteurs.",
    benefits: [
      "Continuité de service assurée pendant le délai de garantie",
      "Pose réalisée par nos propres techniciens, jamais sous-traitée à l'aveugle",
      "Câblage normalisé, coffret de protection et disjoncteur DC systématiques",
      "Chaque matériel posé est enregistré et rattaché à votre dossier de chantier",
    ],
    deliverables: [
      {
        title: "Préparation du chantier",
        text: "Matériel sorti du stock et affecté nominativement à votre projet avant le départ des équipes.",
      },
      {
        title: "Structure et pose",
        text: "Supports de toit, structure de fixation, orientation des modules et fixation inox.",
      },
      {
        title: "Câblage et protections",
        text: "Câble solaire, connecteurs, disjoncteur, coffret de protection et mise à la terre.",
      },
      {
        title: "Mise en service",
        text: "Paramétrage, essais de charge et prise en main de l'installation avec vous.",
      },
    ],
    faq: [
      {
        question: "Combien de temps dure une installation ?",
        answer:
          "Une installation résidentielle courante se pose en une à trois journées de chantier, selon la taille du système, l'accès à la toiture et la longueur de câblage à tirer. La date est fixée avec vous après la signature du contrat.",
      },
      {
        question: "Faut-il être présent pendant les travaux ?",
        answer:
          "Une présence est nécessaire à l'arrivée de l'équipe et à la mise en service, pour la prise en main. Entre les deux, le chantier avance sans que vous ayez à rester sur place.",
      },
    ],
  },
  {
    slug: "descente-technique-etude-site",
    title: "Descente technique et étude de site",
    short: "Descente technique",
    icon: "map",
    excerpt:
      "Une visite sur place avant toute proposition : c'est elle qui détermine ce qui est réellement installable chez vous.",
    keywords: [
      "visite technique solaire Antananarivo",
      "étude de site photovoltaïque",
      "relevé installation solaire",
      "diagnostic solaire Madagascar",
    ],
    intro:
      "Nous ne chiffrons jamais une installation à distance. Une équipe se déplace chez vous — la descente est enregistrée avec sa date, son lieu et sa localisation cartographique — pour relever la toiture, les ombrages, le tableau électrique, les distances de câblage et les appareils à alimenter. La note de visite sert ensuite de base au dimensionnement et au devis.",
    benefits: [
      "Un besoin établi sur des mesures, pas sur une estimation au téléphone",
      "Détection des contraintes réelles : ombrage, état de la toiture, accès, longueur de câbles",
      "Repérage des appareils énergivores à corriger avant d'investir",
      "Visite localisée et consignée : rien ne se perd entre le relevé et le chantier",
    ],
    deliverables: [
      {
        title: "Prise de rendez-vous",
        text: "Date et lieu convenus, équipe technique affectée à la visite.",
      },
      {
        title: "Relevé sur place",
        text: "Toiture, orientation, ombrages, tableau électrique, cheminement des câbles.",
      },
      {
        title: "Inventaire des usages",
        text: "Appareils à alimenter, puissances et durées d'utilisation quotidiennes.",
      },
      {
        title: "Note de visite",
        text: "Compte rendu écrit et localisé, conservé dans votre dossier et repris dans le devis.",
      },
    ],
    faq: [
      {
        question: "La descente est-elle facturée ?",
        answer:
          "Contactez-nous pour convenir de la visite : nous vous indiquons à ce moment-là les conditions, qui dépendent de la distance et de la nature du site. Rien n'est engagé avant votre accord.",
      },
      {
        question: "Que faut-il préparer avant la visite ?",
        answer:
          "Un accès à la toiture et au tableau électrique, et si possible la liste des appareils que vous voulez alimenter. Le simulateur en ligne vous aide à la préparer en quelques minutes.",
      },
    ],
  },
  {
    slug: "dimensionnement-devis-contrat",
    title: "Dimensionnement, devis et contrat",
    short: "Devis et contrat",
    icon: "audit",
    excerpt:
      "Le système est calculé à partir du relevé, puis inscrit dans un contrat qui fixe le montant convenu et la durée.",
    keywords: [
      "devis installation solaire Antananarivo",
      "dimensionnement solaire Madagascar",
      "contrat installation photovoltaïque",
      "paiement échelonné solaire",
    ],
    intro:
      "À partir de la descente, nous calculons la puissance photovoltaïque, la capacité de batterie et la puissance d'onduleur nécessaires — assez pour couvrir vos usages réels, sans surdimensionnement inutile. Le résultat est traduit en une proposition écrite, puis en contrat : montant convenu, durée de paiement et matériel prévu y figurent noir sur blanc avant que le chantier ne démarre.",
    benefits: [
      "Un dimensionnement justifié par le calcul, pas par le catalogue",
      "Un contrat écrit qui fixe le montant et la durée dès le départ",
      "Un paiement réparti sur plusieurs mois : une avance, puis des mensualités",
      "Contrats et documents conservés et consultables tout au long du chantier",
    ],
    deliverables: [
      {
        title: "Note de dimensionnement",
        text: "Nombre et puissance des panneaux, capacité batterie, puissance d'onduleur.",
      },
      {
        title: "Proposition détaillée",
        text: "Matériel prévu, prestations incluses et durée de chantier estimée.",
      },
      {
        title: "Contrat",
        text: "Montant convenu, durée de paiement et engagements des deux parties.",
      },
      {
        title: "Échéancier",
        text: "Avance à la commande puis mensualités régulières jusqu'au solde.",
      },
    ],
    faq: [
      {
        question: "Peut-on payer en plusieurs fois ?",
        answer:
          "Oui, c'est notre fonctionnement habituel. Le contrat fixe un montant convenu et un nombre de mois : vous réglez une avance à la commande, puis des mensualités calculées sur le solde restant. Le suivi des versements est tenu à jour de notre côté.",
      },
      {
        question: "Le devis peut-il évoluer après signature ?",
        answer:
          "Le montant convenu est celui du contrat. Un changement ne peut venir que d'une demande de votre part qui modifie le périmètre — dans ce cas, il fait l'objet d'un accord écrit avant d'être engagé.",
      },
      {
        question: "Pourquoi les prix ne sont-ils pas affichés sur le site ?",
        answer:
          "Parce qu'ils dépendent entièrement de ce que vous voulez alimenter, de votre toiture et de l'autonomie souhaitée. Annoncer un tarif sans avoir vu le site reviendrait à annoncer un chiffre faux. Le prix se fixe après la descente technique.",
      },
    ],
  },
  {
    slug: "stockage-batteries-onduleurs",
    title: "Stockage, batteries lithium et onduleurs",
    short: "Stockage et batteries",
    icon: "battery",
    excerpt:
      "Batteries, générateurs solaires, onduleurs et régulateurs de charge : le couple stockage/conversion adapté à votre usage.",
    keywords: [
      "batterie solaire Madagascar",
      "onduleur solaire Madagascar",
      "régulateur de charge MPPT",
      "stockage énergie solaire Antananarivo",
    ],
    intro:
      "Le stockage détermine ce que vous pourrez faire fonctionner la nuit. Nous installons batteries, générateurs solaires, onduleurs et régulateurs de charge MPPT, dont les capacités sont arrêtées après le relevé, selon votre consommation nocturne et l'autonomie que vous souhaitez réellement couvrir.",
    benefits: [
      "Capacité calculée sur votre consommation de nuit, pas sur une moyenne",
      "Lithium : décharge profonde admissible et durée de vie très supérieure au plomb",
      "Régulation MPPT pour tirer le maximum des panneaux par temps couvert",
      "Parc extensible : l'installation est conçue pour pouvoir grandir",
    ],
    deliverables: [
      {
        title: "Analyse du profil de charge",
        text: "Consommation jour/nuit, pointes et autonomie souhaitée.",
      },
      {
        title: "Choix du couple stockage/onduleur",
        text: "Capacité batterie, puissance d'onduleur et calibre du régulateur MPPT.",
      },
      {
        title: "Intégration",
        text: "Armoire, protections, raccordement et paramétrage des priorités de charge.",
      },
      {
        title: "Prise en main",
        text: "Lecture des indicateurs, bons réflexes d'usage et limites à ne pas dépasser.",
      },
    ],
    faq: [
      {
        question: "Faut-il forcément des batteries ?",
        answer:
          "Non. Si votre consommation est surtout diurne, l'énergie est utilisée au moment où elle est produite et le stockage n'est pas indispensable. Les batteries deviennent nécessaires dès qu'il faut couvrir la nuit ou sécuriser des équipements sensibles.",
      },
      {
        question: "Combien de temps dure une batterie lithium ?",
        answer:
          "Correctement dimensionnée et pas systématiquement vidée à fond, une batterie lithium tient plusieurs milliers de cycles — soit une durée de vie très supérieure à celle d'une batterie au plomb, qui reste la pièce d'usure d'une installation.",
      },
    ],
  },
  {
    slug: "fourniture-materiel-solaire",
    title: "Fourniture de matériel solaire",
    short: "Fourniture de matériel",
    icon: "factory",
    excerpt:
      "Panneaux, batteries, onduleurs, régulateurs, câbles et protections : du matériel identifié, tracé et disponible.",
    keywords: [
      "matériel solaire Madagascar",
      "vente panneau solaire Antananarivo",
      "câble solaire connecteur MC4",
      "coffret protection solaire",
    ],
    intro:
      "Nous tenons notre propre stock, ce qui évite les chantiers arrêtés faute d'une pièce. Chaque référence est suivie à l'unité et affectée nominativement au chantier sur lequel elle part : vous savez exactement quel matériel a été posé chez vous.",
    benefits: [
      "Références connues et tracées, aucun composant anonyme",
      "Stock suivi en continu, avec seuils d'alerte pour éviter les ruptures",
      "Matériel affecté à votre chantier et consigné dans votre dossier",
      "Accessoires et pièces de rechange disponibles pour les interventions",
    ],
    deliverables: [
      {
        title: "Modules photovoltaïques",
        text: "Plaques solaires, kits solaires complets et ampoules LED.",
      },
      {
        title: "Stockage et conversion",
        text: "Batteries, générateurs solaires, onduleurs, régulateurs de charge.",
      },
      {
        title: "Câblage et connectique",
        text: "Câble solaire, connecteurs, disjoncteurs, coffrets de protection.",
      },
      {
        title: "Fixation",
        text: "Structures de fixation, supports de toit, visserie inox.",
      },
    ],
    faq: [
      {
        question: "Vendez-vous du matériel sans installation ?",
        answer:
          "Nous privilégions les installations complètes, car la sécurité d'un système dépend autant du câblage et des protections que des composants eux-mêmes. Pour un besoin de fourniture seule, contactez-nous : nous examinons la demande au cas par cas.",
      },
      {
        question: "Puis-je ajouter des panneaux plus tard ?",
        answer:
          "Oui, à condition que l'installation ait été conçue pour. C'est pourquoi nous choisissons dès le départ un onduleur et un schéma de câblage qui autorisent l'extension sans tout reprendre.",
      },
    ],
  },
  {
    slug: "suivi-chantier-maintenance",
    title: "Suivi de chantier et maintenance",
    short: "Suivi et maintenance",
    icon: "wrench",
    excerpt:
      "Un responsable identifié pendant les travaux, puis l'entretien qui maintient la production dans la durée.",
    keywords: [
      "maintenance panneaux solaires Antananarivo",
      "entretien installation photovoltaïque Madagascar",
      "dépannage solaire",
      "suivi chantier solaire",
    ],
    intro:
      "Chaque chantier a un responsable désigné, et tout ce qui s'y passe est consigné : matériel posé, documents, contrats, avancement. Une fois l'installation en service, l'entretien prend le relais — une installation négligée perd de la production année après année, par encrassement des modules, connexions oxydées ou batteries déséquilibrées.",
    benefits: [
      "Un interlocuteur identifié à chaque étape du chantier",
      "Dossier complet conservé : matériel, documents, contrats, avancement",
      "Nettoyage et contrôles électriques réguliers pour tenir la production",
      "Intervention sur les pannes, avec pièces disponibles en stock",
    ],
    deliverables: [
      {
        title: "Responsable de chantier",
        text: "Un technicien désigné, et à tout moment un point clair sur qui doit faire avancer quoi.",
      },
      {
        title: "Dossier de chantier",
        text: "Matériel posé, documents et contrats rattachés à votre installation.",
      },
      {
        title: "Entretien périodique",
        text: "Nettoyage des modules, serrage, contrôle des protections et de la mise à la terre.",
      },
      {
        title: "Contrôle des batteries",
        text: "Tension par élément, capacité réelle restituée, équilibrage.",
      },
    ],
    faq: [
      {
        question: "À quelle fréquence faut-il nettoyer les panneaux ?",
        answer:
          "Deux à quatre fois par an selon l'environnement. En zone poussiéreuse ou à proximité d'une route en terre, un passage trimestriel se justifie : l'écart de production se voit immédiatement.",
      },
      {
        question: "Intervenez-vous sur une installation posée par quelqu'un d'autre ?",
        answer:
          "Oui, après un diagnostic préalable. Nous vérifions le câblage, les protections et l'état des batteries avant de nous engager sur un entretien régulier.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
