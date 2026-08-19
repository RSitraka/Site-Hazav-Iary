/**
 * Contenu éditorial du site (hors services et blog).
 * Les chiffres et références client sont des exemples réalistes — À VALIDER.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  category: "Résidentiel" | "Entreprise" | "Rural" | "Agricole" | "Collectivité";
  power: string;
  summary: string;
  results: string[];
};

export const projects: Project[] = [
  {
    slug: "villa-hybride-ivandry",
    title: "Villa hybride 5 kVA à Ivandry",
    client: "Particulier",
    location: "Ivandry, Antananarivo",
    year: 2025,
    category: "Résidentiel",
    power: "4,4 kWc · 10 kWh",
    summary:
      "Installation hybride avec priorité solaire et bascule automatique sur le réseau, pour une famille de six personnes soumise à des délestages quotidiens.",
    results: [
      "Autonomie complète en journée et jusqu'à 8 h de nuit",
      "Facture d'électricité réduite de 68 %",
      "Zéro coupure ressentie depuis la mise en service",
    ],
  },
  {
    slug: "centrale-toiture-agroalimentaire",
    title: "Centrale en toiture pour une unité agroalimentaire",
    client: "PME agroalimentaire", // À VALIDER
    location: "Tanjombato, Antananarivo",
    year: 2025,
    category: "Entreprise",
    power: "120 kWc",
    summary:
      "Autoconsommation en journée sur une chaîne de froid fonctionnant en continu, avec supervision de production et maintien du groupe électrogène en secours.",
    results: [
      "−72 % de consommation de gasoil",
      "Retour sur investissement estimé à 3,8 ans",
      "Supervision temps réel de la production",
    ],
  },
  {
    slug: "mini-reseau-village-vakinankaratra",
    title: "Mini-réseau solaire de village",
    client: "Programme d'électrification rurale", // À VALIDER
    location: "Région Vakinankaratra",
    year: 2024,
    category: "Rural",
    power: "36 kWc · 90 kWh",
    summary:
      "Mini-réseau alimentant 140 foyers, une école et un centre de santé, avec compteurs prépayés et technicien relais formé sur place.",
    results: [
      "140 foyers raccordés pour la première fois",
      "Éclairage nocturne du centre de santé garanti",
      "Maintenance de premier niveau assurée localement",
    ],
  },
  {
    slug: "pompage-solaire-maraichage",
    title: "Pompage solaire pour périmètre maraîcher",
    client: "Coopérative agricole", // À VALIDER
    location: "Région Itasy",
    year: 2024,
    category: "Agricole",
    power: "5,5 kWc · 40 m³/jour",
    summary:
      "Remplacement d'une motopompe thermique par une pompe immergée solaire avec réservoir tampon de 20 m³ sur 6 hectares irrigués.",
    results: [
      "Budget carburant supprimé",
      "40 m³ d'eau par jour en saison sèche",
      "Deux cycles de culture supplémentaires par an",
    ],
  },
  {
    slug: "eclairage-public-commune",
    title: "Éclairage public solaire d'une commune",
    client: "Commune urbaine", // À VALIDER
    location: "Région Atsinanana",
    year: 2025,
    category: "Collectivité",
    power: "48 mâts LED",
    summary:
      "Pose de 48 candélabres solaires autonomes sur 3,2 km de voirie, sans tranchée ni raccordement réseau.",
    results: [
      "3,2 km de voirie éclairés",
      "Aucune facture d'électricité pour la commune",
      "Chantier livré en 5 semaines",
    ],
  },
  {
    slug: "backup-lithium-clinique",
    title: "Secours lithium pour une clinique",
    client: "Établissement de santé privé", // À VALIDER
    location: "Antananarivo",
    year: 2023,
    category: "Entreprise",
    power: "18 kWc · 45 kWh",
    summary:
      "Alimentation sécurisée du bloc technique et de la chaîne du froid vaccinale, avec bascule sans coupure et alarme à distance.",
    results: [
      "Bascule sans micro-coupure sur les équipements critiques",
      "Chaîne du froid maintenue lors de coupures de 6 h",
      "Alertes automatiques envoyées à l'astreinte",
    ],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/** Témoignages d'illustration — À REMPLACER par de vrais retours clients. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "L'étude de dimensionnement nous a évité d'acheter deux panneaux et une batterie de trop. Le devis était le plus détaillé des trois que nous avions reçus.",
    author: "Hery R.",
    role: "Propriétaire à Ivandry",
  },
  {
    quote:
      "Notre chaîne de froid ne s'arrête plus. Le suivi de production nous permet de vérifier chaque mois ce que la centrale a réellement produit.",
    author: "Directrice d'exploitation",
    role: "PME agroalimentaire, Tanjombato",
  },
  {
    quote:
      "Le technicien du village a été formé et sait intervenir seul sur les pannes courantes. C'est ce qui fait tenir l'installation dans la durée.",
    author: "Chef de projet",
    role: "Programme d'électrification rurale",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Écoute et relevé",
    text: "Nous notons vos usages réels, appareil par appareil, et vos contraintes (budget, toiture, coupures, évolution prévue).",
  },
  {
    step: "02",
    title: "Dimensionnement chiffré",
    text: "Consommation en kWh/mois, nombre de panneaux, capacité batterie et puissance d'onduleur : tout est justifié par le calcul.",
  },
  {
    step: "03",
    title: "Devis transparent",
    text: "Marques, garanties, quantités et prestations détaillées ligne par ligne. Remis sous 48 h après la visite.",
  },
  {
    step: "04",
    title: "Installation soignée",
    text: "Pose par nos équipes salariées, câblage normalisé, protections et mise à la terre, puis tests de charge.",
  },
  {
    step: "05",
    title: "Formation et suivi",
    text: "Prise en main de votre système, puis maintenance préventive et supervision selon le contrat choisi.",
  },
];

export const commitments = [
  {
    title: "Dimensionner juste",
    text: "Un système surdimensionné coûte cher et ne se rentabilise jamais. Nous partons toujours du besoin réel mesuré.",
  },
  {
    title: "Matériel traçable",
    text: "Marques, références et garanties écrites sur le devis. Aucun composant anonyme sur nos chantiers.",
  },
  {
    title: "Compétences locales",
    text: "Techniciens malgaches formés en interne et relais locaux sur les projets ruraux : la maintenance reste possible sur place.",
  },
  {
    title: "Cycle de vie complet",
    text: "Reprise des batteries usagées et filière de recyclage : l'énergie propre le reste jusqu'au bout.",
  },
];

export type FaqItem = { question: string; answer: string };

export const generalFaq: FaqItem[] = [
  {
    question: "Combien coûte une installation solaire à Madagascar ?",
    answer:
      "Le prix dépend surtout de la consommation à couvrir et du stockage. Un kit résidentiel de base démarre autour de 4 500 000 Ar, une installation hybride complète pour une villa se situe fréquemment entre 15 et 40 millions d'Ariary, et une centrale professionnelle se chiffre au kWc installé. Seul un relevé de consommation permet d'annoncer un montant fiable — c'est pourquoi notre audit précède toujours le devis.",
  },
  {
    question: "En combien de temps l'installation est-elle rentabilisée ?",
    answer:
      "Pour un foyer qui subit des délestages, le retour se compte en confort autant qu'en argent : la facture baisse en général de 50 à 70 %. Pour une entreprise qui remplace du groupe électrogène, le retour sur investissement se situe le plus souvent entre 3 et 5 ans.",
  },
  {
    question: "Quelle est la durée de vie des équipements ?",
    answer:
      "Les panneaux photovoltaïques conservent plus de 80 % de leur rendement après 25 ans. Les onduleurs durent 8 à 12 ans. Les batteries sont la pièce d'usure : 3 à 5 ans pour du plomb GEL, 8 à 12 ans pour du lithium LiFePO4 correctement dimensionné.",
  },
  {
    question: "Faut-il des batteries pour une installation solaire ?",
    answer:
      "Pas systématiquement. Si votre consommation est surtout diurne (bureau, atelier, pompage), l'énergie est utilisée au moment où elle est produite et le stockage n'est pas nécessaire. Les batteries deviennent indispensables dès qu'il faut couvrir la nuit ou sécuriser des équipements critiques.",
  },
  {
    question: "Intervenez-vous en dehors d'Antananarivo ?",
    answer:
      "Oui. Nous intervenons sur l'ensemble du territoire malgache. Les frais de déplacement sont annoncés à l'avance dans le devis, et les projets éloignés sont regroupés en campagnes pour limiter leur coût.",
  },
  {
    question: "Proposez-vous un paiement échelonné ?",
    answer:
      "Le paiement est généralement échelonné selon l'avancement : acompte à la commande, solde à la mise en service. Nous étudions les dossiers de financement avec votre banque ou votre bailleur pour les projets professionnels et institutionnels.",
  },
  {
    question: "Que couvre la garantie ?",
    answer:
      "La garantie constructeur s'applique sur chaque composant (25 ans de rendement sur les panneaux, 5 à 10 ans sur les onduleurs, 2 à 10 ans sur les batteries selon la technologie), et notre garantie de pose couvre l'installation pendant 2 ans.",
  },
  {
    question: "Puis-je faire évoluer mon installation plus tard ?",
    answer:
      "Oui, à condition de l'avoir prévu dès la conception. Nous choisissons systématiquement des onduleurs et des schémas de câblage qui autorisent l'ajout de panneaux ou de batteries sans repartir de zéro.",
  },
];
