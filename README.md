# Hazav'Iary — site vitrine

Site de présentation de **Hazav'Iary**, installateur de panneaux solaires **partout à
Madagascar**, basé à Antananarivo. Référencement technique complet, simulateur de
dimensionnement intégré.

Construit avec **Next.js 15 (App Router)**, **React 19**, **TypeScript** et **Tailwind CSS 3**.

La charte est celle du logo Hazav'Iary — bleu `#26A6CE`, orange solaire, gris ardoise — déclinée
en interface sombre (voir [Thème](#thème--interface-sombre-à-accent-bleu-couleurs-du-logo)). Le
logo et la clé de préférence clair/sombre restent partagés avec l'application de gestion
`RSitraka/Hazav-Iary`. La stack diffère volontairement — Next.js rend les pages en statique, ce
dont dépend tout le référencement.

---

## Démarrage

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (24 pages statiques)
npm start       # sert le build
npm run lint
```

Node.js 18.18+ requis.

---

## À personnaliser avant mise en ligne

Tout le contenu éditorial est centralisé dans `src/lib/`. Aucune information n'est codée en dur
dans les pages.

| Fichier | Contenu | Priorité |
| --- | --- | --- |
| `src/lib/site.ts` | Nom, slogan, **URL du site**, email, téléphone, adresse, horaires, réseaux sociaux, zone desservie | **Indispensable** |
| `src/lib/services.ts` | Les 6 prestations et leurs pages détaillées (textes, bénéfices, FAQ) | Recommandé |
| `src/lib/content.ts` | Références client, zones, matériel, déroulé de chantier, engagements, FAQ générale | Recommandé |
| `src/lib/gallery.ts` | Photos de terrain du carrousel d'accueil (fichiers dans `public/photos/`) | Recommandé |
| `src/app/mentions-legales/page.tsx` | NIF, STAT, RCS, directeur de publication, hébergeur | **Obligation légale** |

Les valeurs provisoires sont signalées par un commentaire `À VALIDER` dans le code.

> ⚠️ **`site.url` doit impérativement être l'URL de production.** Elle alimente les balises
> canoniques, le sitemap, les données structurées et les images de partage.

### D'où vient le contenu

Services, matériel et déroulé de chantier viennent des flux métier de l'application de gestion
`RSitraka/Hazav-Iary` (`backend/models.go`, son README) : descente sur site, montant convenu,
nombre de mois, avance puis mensualités, matériel affecté au chantier.

**`projects` et `installedZones` sont synchronisés, pas saisis à la main.** Le script
`ops/sync-realisations.sh`, lancé une fois par jour sur le serveur, lit une copie de la base de
l'application (`sqlite3 .backup`, en lecture seule) et réécrit `src/data/realisations.json` :
chantiers **terminés** (code, zone, année, matériel posé) et zones réellement équipées. Le
fichier est poussé s'il a changé, ce qui redéclenche la mise en ligne. Détails et mise en place
dans [DEPLOY.md](DEPLOY.md).

**Ne sortent jamais de l'application** : le nom du bénéficiaire, son téléphone, le montant
convenu, les notes et les descriptions — la requête ne lit même pas ces colonnes.

Tant que l'application ne contient aucun chantier terminé, le fichier reste vide : la section
« Références » de `/realisations` n'apparaît pas et la page annonce la couverture nationale (les
six provinces) plutôt que des zones inventées. L'ancienne liste de quartiers d'Antananarivo a été
retirée : elle venait du jeu de démonstration (`backend/cmd/seed/main.go`).

`testimonials` reste vide dans `src/lib/content.ts` : à remplir uniquement avec de vrais retours
clients, recueillis avec leur accord. La section correspondante n'apparaît pas tant qu'il l'est.

### Politique de description du matériel

**Aucune caractéristique chiffrée n'est publiée** : ni wattage de panneau, ni ampère-heure de
batterie, ni kVA d'onduleur. Le matériel est listé par catégories (`equipmentCatalog` dans
`src/lib/content.ts`) — plaques solaires, batteries, générateurs solaires, onduleurs,
régulateurs, câblage, protections, fixation. Les puissances se fixent après la descente
technique, à partir du relevé ; les annoncer d'avance reviendrait à dimensionner à l'aveugle.
Seul le simulateur manipule des puissances, parce que c'est l'internaute qui les choisit.

### Photos de terrain

Les photos affichées dans le carrousel de l'accueil sont dans `public/photos/`, décrites dans
`src/lib/gallery.ts` (chemin, texte alternatif, légende, dimensions réelles). Pour en ajouter :
déposez le fichier, ajoutez une entrée — l'ordre du tableau est l'ordre d'affichage, et la
section disparaît si le tableau est vide.

### Blog

Le blog a été retiré du site : plus d'onglet, plus de routes `/blog`, plus d'entrées dans le
sitemap. Les quatre articles restent dans `src/content/blog/` et leur bibliothèque de lecture
dans `src/lib/posts.ts` — pour le réactiver, il suffit de restaurer le dossier `src/app/blog/`
depuis l'historique Git et de remettre les entrées de navigation dans `src/lib/site.ts`.

### Politique de prix

**Aucun montant n'est publié sur le site.** Le prix se fixe après la descente technique et figure
au contrat. Ce choix est appliqué partout : pas de tarif sur les pages de service, pas de
fourchette dans la FAQ ni dans les articles, pas de champ « budget » dans le formulaire (remplacé
par une échéance souhaitée), et pas de `priceRange` dans les données structurées. Le paiement
échelonné — avance puis mensualités — est en revanche mis en avant comme argument.

### Recevoir les demandes de devis

Par défaut, le formulaire de contact ouvre le client de messagerie du visiteur (aucun backend
requis). Pour recevoir les demandes automatiquement, créez un fichier `.env.local` :

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/VOTRE_ID
```

Le formulaire enverra alors un `POST` JSON vers cette URL. Tout service acceptant du JSON
convient (Formspree, Getform, Basin, ou votre propre route API).

---

## Référencement

Le socle SEO est en place et se met à jour automatiquement à partir des données.

**Technique**
- Balises `title` / `description` uniques sur chaque page, via `buildMetadata()` (`src/lib/seo.ts`)
- URL canonique sur toutes les routes
- `sitemap.xml` généré au build (15 URL) — `src/app/sitemap.ts`
- `robots.txt` avec référence au sitemap — `src/app/robots.ts`
- Manifest PWA et favicon dérivé du logo officiel
- 24 pages pré-rendues en statique (HTML complet servi aux robots)
- En-têtes de sécurité (`next.config.ts`)

**Données structurées (schema.org)**

| Type | Où |
| --- | --- |
| `Organization` + `LocalBusiness` | Toutes les pages (layout) |
| `WebSite` | Toutes les pages |
| `BreadcrumbList` | Toutes les pages internes |
| `Service` | Chaque page de service |
| `FAQPage` | Accueil, FAQ, pages de service, simulateur |
| `ItemList` / `CollectionPage` | Services, réalisations |
| `WebApplication` | Simulateur |

**Partage social** — image Open Graph 1200×630 générée au build par `next/og`
(`src/lib/og.tsx`), appliquée à toutes les pages, plus Twitter Card `summary_large_image`.

**Contenu** — architecture pensée pour la longue traîne : 6 pages de service ciblant chacune leurs
mots-clés, une FAQ balisée, un simulateur (page à fort temps de session et
générateur de liens entrants naturels).

### Après la mise en ligne

1. Renseigner `site.verification.google` avec le code Google Search Console.
2. Soumettre `https://votre-domaine/sitemap.xml` dans la Search Console.
3. Créer la fiche **Google Business Profile** avec exactement les mêmes NAP
   (nom, adresse, téléphone) que `src/lib/site.ts` — la cohérence NAP est le premier facteur
   du référencement local.
4. Renseigner les vrais chantiers et témoignages dans `src/lib/content.ts` (voir « D'où vient le contenu »).
5. Alimenter `installedZones` et le carrousel photos au fil des chantiers : ce sont les deux
   signaux les plus concrets pour les visiteurs comme pour le référencement local.

---

## Structure

```
src/
├─ app/
│  ├─ layout.tsx                     en-tête, pied de page, SEO global, thème
│  ├─ page.tsx                       accueil
│  ├─ services/                      liste + 6 pages générées (generateStaticParams)
│  ├─ simulateur/                    calculateur de dimensionnement
│  ├─ realisations/  a-propos/  faq/  contact/
│  ├─ mentions-legales/  politique-de-confidentialite/
│  ├─ sitemap.ts  robots.ts  manifest.ts
│  ├─ opengraph-image.tsx  twitter-image.tsx  icon.png
│  └─ globals.css                    jetons de couleur, composants, typographie
├─ components/                       header, footer, UI, simulateur, formulaire, icônes
├─ lib/                              site, services, contenu, galerie photos, SEO
└─ content/blog/                     articles Markdown (blog désactivé, voir « Blog »)
```

---

## Thème — interface sombre à accent bleu (couleurs du logo)

Le site est **sombre par défaut** : fond quasi noir, halo d'accent diffusé depuis le haut de
page, grandes cartes arrondies posées sur le noir, libellés et numérotations en monospace
capitales. L'accent unique est **`#26A6CE`**, le bleu de l'emblème (rose des vents et lémurien),
relevé directement dans `public/logo-mark.png` ; l'orange `sun` est celui de ses rayons et le
gris `slate` (`#465057`) celui de ses aplats.

| Jeton | Sombre (défaut) | Clair | Usage |
| --- | --- | --- | --- |
| `accent` | `#26A6CE` | `#1780A2` | Interface, liens, boutons primaires, halos |
| `accent-pure` | `#26A6CE` | `#26A6CE` | La couleur de marque telle quelle : halos, arc du hero |
| `sun` | `#EBA54A` | `#D68A20` | Le soleil, la production |
| `grow` | `#2DD881` | `#119E5C` | Validation, énergie propre |
| `slate` | `#6A7882` | `#465057` | Le gris ardoise du logo |
| `surface` | `#0B0E10` | `#FFFFFF` | Cartes, panneaux |
| `tone` | `#050708` | `#F1F4F5` | Fond de page |
| `ink` | `#E9EFF2` | `#101619` | Texte courant |

Le bleu du logo est repris tel quel en mode sombre ; en mode clair il est assombri (`#1780A2`)
pour rester lisible sur blanc, `accent-pure` conservant `#26A6CE` pour les halos.

Toutes les couleurs passent par des variables CSS définies dans `globals.css` et exposées à
Tailwind : **aucune classe `dark:` n'est nécessaire dans les composants**, le mode clair suit
automatiquement.

Règles de forme :

- Rayons de **14 à 32 px** sur les cartes, **gélules** pour boutons, pastilles et onglets
- Bordures de 1 px très sombres : c'est le **halo** (`--glow-soft` / `--glow-strong`), pas le
  trait, qui détache les blocs
- **Inter** pour le texte, **JetBrains Mono** pour les libellés, badges, numéros et fils
  d'Ariane (10,5 px, gras, majuscules, interlettrage `.9px`)
- Titres en graisse 800, interlettrage `-.6px`
- Tuiles de chiffres avec filet d'accent dégradé en haut (`.stat`) ; pastille d'icône d'angle
  (`.corner-icon`) sur les cartes mises en avant
- Arc lumineux du hero : `.glow-arc` — une ellipse débordant de l'écran, dont seule la calotte
  éclairée est visible
- Mode clair porté par l'absence de la classe `dark` sur `<html>`, mémorisé sous la clé
  **`hazaviary_theme`** — la même que l'application de gestion, donc la préférence est partagée
  entre les deux sur un même domaine
- Fond de page en halo radial fixe, bleu au sommet puis noir

Écart assumé : le corps de texte passe de 14 px à 15 px, un site de lecture n'ayant pas la
densité d'un outil de gestion.

### Logo

`public/logo-mark.png` (emblème), `public/logo.png` (verrou complet) et `src/app/icon.png`
(favicon) sont dérivés du `logo.png` officiel de l'application. Le fond blanc d'origine a été
rendu transparent par remplissage depuis les bords, ce qui préserve les blancs internes de
l'emblème. En mode sombre, la marque est posée sur une pastille claire — même traitement que
`html.dark .brand-logo` dans l'application.

Hors logo, aucune image bitmap : les icônes et décors sont des SVG intégrés au HTML, colorés par les
variables du thème — pas de requête réseau, pas de décalage de mise en page.

---

## Le simulateur

`src/components/solar-simulator.tsx` reprend la méthode de dimensionnement de l'application de
terrain EcoCalc :

```
Consommation mensuelle (kWh) = P(W) × heures/jour × quantité × 30 ÷ 1000
Puissance crête (Wc)         = Wh/jour ÷ (heures plein soleil × rendement système)
Capacité batterie (kWh)      = Wh/jour × jours d'autonomie ÷ profondeur de décharge
Puissance onduleur (kVA)     = Σ puissances × simultanéité × marge
```

Hypothèses par défaut (constantes en haut du fichier) : 5 h d'ensoleillement équivalent plein
soleil, 75 % de rendement système, 65 % de simultanéité, 30 % de marge onduleur, décharge à 85 %
en lithium ou 50 % en plomb, parc en 48 V. Tout le calcul s'exécute dans le navigateur.

---

## Déploiement

**Vercel** (le plus direct) — importer le dépôt, aucune configuration nécessaire.

**Serveur Node** — `npm run build && npm start` derrière un reverse proxy.

**Hébergement statique** (GitHub Pages, Netlify…) — ajouter `output: "export"` dans
`next.config.ts`. Les pages sont déjà toutes statiques ; seul le formulaire nécessitera alors un
service externe via `NEXT_PUBLIC_CONTACT_ENDPOINT`.
