export type Service = {
  slug: string;
  title: string;
  /** Titre court pour la navigation et les cartes. */
  short: string;
  icon: "sun" | "factory" | "home" | "water" | "battery" | "audit" | "wrench" | "streetlight";
  excerpt: string;
  /** Mots-clés ciblés pour le référencement de la page dédiée. */
  keywords: string[];
  intro: string;
  benefits: string[];
  deliverables: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  priceFrom?: string;
};

export const services: Service[] = [
  {
    slug: "installation-panneaux-solaires-maison",
    title: "Installation de panneaux solaires pour la maison",
    short: "Solaire résidentiel",
    icon: "home",
    excerpt:
      "Autoconsommation et systèmes hybrides pour les foyers : fini les délestages, votre facture d'électricité fond durablement.",
    keywords: [
      "installation panneaux solaires Madagascar",
      "kit solaire maison Antananarivo",
      "autoconsommation solaire résidentielle",
      "prix panneau solaire Madagascar",
    ],
    intro:
      "Nous équipons les foyers malgaches de systèmes photovoltaïques dimensionnés au plus juste : assez de production pour couvrir les usages réels, sans surdimensionnement inutile. Chaque projet démarre par un relevé de consommation appareil par appareil, puis un dimensionnement panneaux / batteries / onduleur validé avec vous avant tout achat.",
    benefits: [
      "Continuité de service pendant les coupures réseau",
      "Jusqu'à 70 % de réduction sur la facture d'électricité",
      "Matériel garanti : panneaux 25 ans de rendement, onduleurs 5 à 10 ans",
      "Installation propre, câblage normalisé et mise à la terre",
    ],
    deliverables: [
      {
        title: "Audit de consommation",
        text: "Inventaire des appareils, puissances et heures d'usage pour un besoin en kWh/mois fiable.",
      },
      {
        title: "Note de dimensionnement",
        text: "Nombre de panneaux, capacité batterie (profondeur de décharge 50 %), puissance d'onduleur.",
      },
      {
        title: "Pose et mise en service",
        text: "Structure toiture, câblage DC/AC, protections, paramétrage et test de charge.",
      },
      {
        title: "Formation du client",
        text: "Prise en main de l'onduleur, bons réflexes d'usage, entretien courant.",
      },
    ],
    faq: [
      {
        question: "Combien de panneaux faut-il pour une maison à Antananarivo ?",
        answer:
          "Pour un foyer consommant 150 kWh par mois, il faut généralement 6 à 8 panneaux de 550 Wc, un parc batterie de 5 à 10 kWh et un onduleur hybride de 3 à 5 kVA. Le simulateur en ligne vous donne un premier ordre de grandeur en deux minutes.",
      },
      {
        question: "Peut-on garder le réseau public en complément ?",
        answer:
          "Oui. Nos configurations hybrides basculent automatiquement entre solaire, batterie et réseau. Le solaire reste prioritaire, le réseau ne sert que d'appoint : c'est la formule la plus rentable en zone urbaine.",
      },
    ],
    priceFrom: "À partir de 4 500 000 Ar", // À VALIDER
  },
  {
    slug: "solaire-entreprise-industrie",
    title: "Solaire pour entreprises et industries",
    short: "Solaire professionnel",
    icon: "factory",
    excerpt:
      "Centrales en toiture ou au sol, pilotage de charge et suivi de production pour sécuriser votre outil de travail.",
    keywords: [
      "centrale solaire entreprise Madagascar",
      "photovoltaïque industriel",
      "solaire tertiaire Antananarivo",
      "réduire le coût de l'énergie en entreprise",
    ],
    intro:
      "Groupes électrogènes coûteux, coupures qui arrêtent la production : le solaire professionnel apporte une énergie prévisible. Nous concevons des centrales de 10 kWc à plusieurs centaines de kWc, en autoconsommation avec ou sans stockage, intégrées à vos contraintes d'exploitation.",
    benefits: [
      "Coût du kWh solaire jusqu'à 4 fois inférieur à celui du groupe électrogène",
      "Retour sur investissement typique de 3 à 5 ans",
      "Supervision à distance de la production et des alarmes",
      "Chantier planifié sans arrêt de votre activité",
    ],
    deliverables: [
      {
        title: "Étude technico-économique",
        text: "Courbe de charge, taux d'autoconsommation, TRI et plan de financement.",
      },
      {
        title: "Ingénierie et plans",
        text: "Schémas unifilaires, notes de calcul, dossier de conformité.",
      },
      {
        title: "Réalisation clé en main",
        text: "Approvisionnement, génie civil, pose, raccordement et essais.",
      },
      {
        title: "Contrat d'exploitation",
        text: "Monitoring, maintenance préventive et garantie de performance.",
      },
    ],
    faq: [
      {
        question: "Le solaire peut-il remplacer totalement le groupe électrogène ?",
        answer:
          "Le plus souvent il le relève plutôt qu'il ne le remplace : le solaire couvre la journée, le stockage lisse les pointes et le groupe reste en ultime secours. Le gasoil consommé chute alors de 60 à 90 %.",
      },
      {
        question: "Quelle surface de toiture faut-il ?",
        answer:
          "Comptez environ 6 à 7 m² par kWc installé. Une centrale de 100 kWc demande donc à peu près 650 m² de toiture exploitable, ou un terrain équivalent pour une pose au sol.",
      },
    ],
  },
  {
    slug: "kit-solaire-autonome-electrification-rurale",
    title: "Kits solaires autonomes et électrification rurale",
    short: "Électrification rurale",
    icon: "sun",
    excerpt:
      "Kits individuels, mini-réseaux et équipements communautaires pour les zones hors réseau.",
    keywords: [
      "électrification rurale Madagascar",
      "kit solaire autonome",
      "mini-réseau solaire",
      "solaire hors réseau",
    ],
    intro:
      "Une large part de la population malgache vit sans accès fiable à l'électricité. Nous déployons des kits solaires individuels, des mini-réseaux de village et des équipements collectifs (écoles, centres de santé), avec formation des relais locaux pour la maintenance de premier niveau.",
    benefits: [
      "Solutions robustes pensées pour l'usage en zone enclavée",
      "Recensement énergétique numérique des ménages",
      "Formation d'un technicien relais par site",
      "Compatible avec les financements bailleurs et ONG",
    ],
    deliverables: [
      {
        title: "Recensement terrain",
        text: "Collecte hors-ligne des besoins, ménage par ménage.",
      },
      {
        title: "Schéma de déploiement",
        text: "Arbitrage entre kits individuels, mini-réseau ou solution mixte.",
      },
      {
        title: "Installation et formation",
        text: "Pose, mise en service et transfert de compétences local.",
      },
      {
        title: "Suivi post-installation",
        text: "Visites de contrôle et pièces de rechange disponibles.",
      },
    ],
    faq: [
      {
        question: "Intervenez-vous en dehors d'Antananarivo ?",
        answer:
          "Oui, nos équipes se déplacent sur l'ensemble des régions de Madagascar. Les projets ruraux sont organisés par campagnes afin de mutualiser la logistique.",
      },
    ],
  },
  {
    slug: "pompage-solaire-agriculture",
    title: "Pompage solaire pour l'agriculture et l'eau potable",
    short: "Pompage solaire",
    icon: "water",
    excerpt:
      "Irrigation et adduction d'eau sans carburant : la pompe tourne tant que le soleil brille.",
    keywords: [
      "pompage solaire Madagascar",
      "pompe immergée solaire",
      "irrigation solaire",
      "adduction eau potable solaire",
    ],
    intro:
      "Une pompe solaire supprime la ligne gasoil du budget d'exploitation et fonctionne sans surveillance. Nous dimensionnons l'ensemble forage, pompe, panneaux et réservoir tampon en fonction du débit journalier visé et de la hauteur manométrique totale.",
    benefits: [
      "Zéro carburant, aucun moteur thermique à entretenir",
      "Débit calculé pour la saison sèche, pas pour la moyenne annuelle",
      "Réservoir tampon plutôt que batteries : moins cher, plus durable",
      "Adapté au maraîchage, au riz et à l'abreuvement du cheptel",
    ],
    deliverables: [
      {
        title: "Étude hydraulique",
        text: "Débit, hauteur manométrique totale, profondeur de forage et besoin journalier.",
      },
      {
        title: "Choix de la pompe",
        text: "Immergée ou de surface, courbe de rendement adaptée au champ photovoltaïque.",
      },
      {
        title: "Installation complète",
        text: "Structure PV, variateur, câblage, protections et réservoir.",
      },
      { title: "Garantie et SAV", text: "Pièces disponibles et intervention sur site." },
    ],
    faq: [
      {
        question: "Faut-il des batteries pour une pompe solaire ?",
        answer:
          "Rarement. On stocke l'eau plutôt que l'électricité : un réservoir surélevé coûte moins cher qu'un parc batterie et dure bien plus longtemps.",
      },
    ],
  },
  {
    slug: "stockage-batteries-onduleurs",
    title: "Stockage, batteries lithium et onduleurs hybrides",
    short: "Stockage et batteries",
    icon: "battery",
    excerpt:
      "LiFePO4, GEL, onduleurs hybrides : le bon couple stockage/onduleur pour votre profil de consommation.",
    keywords: [
      "batterie lithium solaire Madagascar",
      "prix batterie LiFePO4",
      "onduleur hybride solaire",
      "stockage énergie solaire",
    ],
    intro:
      "Le stockage représente souvent la moitié du budget d'une installation : c'est là que se jouent la rentabilité et la durée de vie du système. Nous comparons systématiquement lithium LiFePO4, GEL et AGM sur le coût du kWh restitué, et non sur le prix d'achat affiché.",
    benefits: [
      "Dimensionnement à 50 % de profondeur de décharge pour le plomb, 80 à 90 % pour le lithium",
      "Onduleurs hybrides avec priorité solaire paramétrable",
      "Extension possible du parc batterie sans tout remplacer",
      "Reprise et recyclage des anciennes batteries",
    ],
    deliverables: [
      {
        title: "Analyse du profil de charge",
        text: "Consommation jour/nuit, pointes, autonomie souhaitée.",
      },
      {
        title: "Comparatif chiffré",
        text: "Coût total de possession sur 10 ans, par technologie.",
      },
      {
        title: "Intégration",
        text: "Armoire, protections, BMS, communication onduleur-batterie.",
      },
      { title: "Suivi d'état de santé", text: "Contrôle périodique de la capacité réelle." },
    ],
    faq: [
      {
        question: "Lithium ou GEL : qu'est-ce qui revient le moins cher ?",
        answer:
          "Sur la durée, le lithium. Une batterie LiFePO4 tient 4 000 à 6 000 cycles contre 500 à 1 200 pour du plomb : le coût par kWh restitué est généralement deux fois plus bas, malgré un prix d'achat supérieur.",
      },
    ],
  },
  {
    slug: "audit-energetique-dimensionnement",
    title: "Audit énergétique et dimensionnement solaire",
    short: "Audit et dimensionnement",
    icon: "audit",
    excerpt:
      "Un relevé de consommation rigoureux avant tout achat : c'est ce qui évite de payer un système surdimensionné.",
    keywords: [
      "audit énergétique Madagascar",
      "dimensionnement installation solaire",
      "calcul consommation électrique foyer",
      "étude solaire photovoltaïque",
    ],
    intro:
      "Nos ingénieurs réalisent le relevé appareil par appareil (puissance, durée d'usage, quantité) pour établir la consommation mensuelle réelle en kWh, puis en déduisent le nombre de panneaux, la capacité batterie et la puissance d'onduleur nécessaires. Cette méthode, issue de notre outil de terrain EcoCalc, est appliquée sur tous nos projets.",
    benefits: [
      "Un besoin réel chiffré, pas une estimation approximative",
      "Détection des postes énergivores à corriger avant d'investir",
      "Note de dimensionnement remise même sans commande",
      "Base solide pour comparer objectivement plusieurs devis",
    ],
    deliverables: [
      {
        title: "Relevé sur site",
        text: "Inventaire complet des usages, mesures de puissance si nécessaire.",
      },
      {
        title: "Rapport de consommation",
        text: "kWh/mois par poste, profil jour/nuit, saisonnalité.",
      },
      {
        title: "Scénarios chiffrés",
        text: "2 à 3 configurations avec coût, production et économies attendues.",
      },
      {
        title: "Recommandations d'efficacité",
        text: "Actions à gain rapide, à mener avant tout investissement solaire.",
      },
    ],
    faq: [
      {
        question: "L'audit est-il payant ?",
        answer:
          "L'audit initial est offert pour les projets résidentiels dans l'agglomération d'Antananarivo. Pour les sites industriels ou éloignés, il est facturé puis déduit de la commande.",
      },
    ],
  },
  {
    slug: "maintenance-monitoring-solaire",
    title: "Maintenance et monitoring d'installations solaires",
    short: "Maintenance",
    icon: "wrench",
    excerpt:
      "Contrats d'entretien, nettoyage, contrôle des batteries et supervision de la production à distance.",
    keywords: [
      "maintenance panneaux solaires Madagascar",
      "entretien installation photovoltaïque",
      "monitoring production solaire",
      "dépannage solaire Antananarivo",
    ],
    intro:
      "Une installation mal entretenue perd 10 à 25 % de production en deux ans : poussière, connexions oxydées, batteries déséquilibrées. Nos contrats couvrent le nettoyage, les contrôles électriques, le test de capacité des batteries et le suivi à distance des alarmes.",
    benefits: [
      "Production maintenue au niveau prévu au contrat",
      "Durée de vie du parc batterie préservée",
      "Intervention prioritaire en cas de panne",
      "Rapport annuel de performance",
    ],
    deliverables: [
      { title: "Visite préventive", text: "1 à 4 passages par an selon le contrat." },
      {
        title: "Contrôle électrique",
        text: "Serrage, isolement, protections, mise à la terre.",
      },
      {
        title: "Santé des batteries",
        text: "Tension par élément, capacité restituée, équilibrage.",
      },
      {
        title: "Supervision",
        text: "Alertes de production et défauts remontés automatiquement.",
      },
    ],
    faq: [
      {
        question: "À quelle fréquence faut-il nettoyer les panneaux ?",
        answer:
          "Deux à quatre fois par an selon l'environnement. En zone poussiéreuse ou proche d'une route en terre, un nettoyage trimestriel est justifié : l'écart de production se voit immédiatement.",
      },
    ],
  },
  {
    slug: "eclairage-public-solaire",
    title: "Éclairage public solaire et lampadaires autonomes",
    short: "Éclairage public",
    icon: "streetlight",
    excerpt:
      "Lampadaires solaires autonomes pour communes, lotissements, sites industriels et voiries.",
    keywords: [
      "lampadaire solaire Madagascar",
      "éclairage public solaire",
      "candélabre solaire autonome",
      "éclairage de sécurité site industriel",
    ],
    intro:
      "Chaque mât est autonome : panneau, batterie lithium, LED et détecteur de présence intégrés. Aucune tranchée, aucun raccordement réseau, aucune facture d'électricité — un coût d'exploitation quasi nul après la pose.",
    benefits: [
      "Installation rapide, sans génie civil lourd",
      "Autonomie de 3 à 5 nuits sans soleil",
      "Gradation automatique pour économiser la batterie",
      "Sécurisation des accès et des voiries",
    ],
    deliverables: [
      {
        title: "Étude photométrique",
        text: "Hauteur de mât, interdistance et niveau d'éclairement visé.",
      },
      {
        title: "Fourniture",
        text: "Mâts galvanisés, batteries lithium, LED haute efficacité.",
      },
      { title: "Pose", text: "Massifs béton, levage, orientation des modules." },
      { title: "Garantie", text: "2 à 5 ans selon les composants." },
    ],
    faq: [
      {
        question: "Que se passe-t-il après plusieurs jours de pluie ?",
        answer:
          "Le régulateur réduit progressivement l'intensité lumineuse pour prolonger l'autonomie. Nos mâts sont dimensionnés pour tenir au minimum trois nuits sans recharge significative.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
