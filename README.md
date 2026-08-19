# Hazav'Iary — site vitrine

Site de présentation de **Hazav'Iary**, entreprise malgache spécialisée dans l'énergie solaire
et les solutions vertes. Thème solaire / énergie verte, référencement technique complet,
simulateur de dimensionnement intégré.

Construit avec **Next.js 15 (App Router)**, **React 19**, **TypeScript** et **Tailwind CSS 3**.

---

## Démarrage

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (32 pages statiques)
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
| `src/lib/site.ts` | Nom, slogan, **URL du site**, email, téléphone, adresse, horaires, réseaux sociaux, chiffres clés | **Indispensable** |
| `src/lib/services.ts` | Les 8 services et leurs pages détaillées (textes, bénéfices, FAQ, prix) | Recommandé |
| `src/lib/content.ts` | Réalisations, témoignages, étapes du process, engagements, FAQ générale | Recommandé |
| `src/content/blog/*.md` | Articles de blog (Markdown + frontmatter) | Optionnel |
| `src/app/mentions-legales/page.tsx` | NIF, STAT, RCS, directeur de publication, hébergeur | **Obligation légale** |

Les valeurs provisoires sont signalées par un commentaire `À VALIDER` dans le code.

> ⚠️ **`site.url` doit impérativement être l'URL de production.** Elle alimente les balises
> canoniques, le sitemap, les données structurées et les images de partage.

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
- `sitemap.xml` généré au build (23 URL) — `src/app/sitemap.ts`
- `robots.txt` avec référence au sitemap — `src/app/robots.ts`
- Manifest PWA et favicon SVG
- 32 pages pré-rendues en statique (HTML complet servi aux robots)
- En-têtes de sécurité (`next.config.ts`)

**Données structurées (schema.org)**

| Type | Où |
| --- | --- |
| `Organization` + `LocalBusiness` | Toutes les pages (layout) |
| `WebSite` | Toutes les pages |
| `BreadcrumbList` | Toutes les pages internes |
| `Service` | Chaque page de service |
| `FAQPage` | Accueil, FAQ, pages de service, simulateur |
| `BlogPosting` | Chaque article |
| `ItemList` / `CollectionPage` | Services, réalisations |
| `WebApplication` | Simulateur |

**Partage social** — image Open Graph 1200×630 générée au build par `next/og`
(`src/lib/og.tsx`), appliquée à toutes les pages, plus Twitter Card `summary_large_image`.

**Contenu** — architecture pensée pour la longue traîne : 8 pages de service ciblant chacune ses
mots-clés, 5 articles de fond, une FAQ balisée, un simulateur (page à fort temps de session et
générateur de liens entrants naturels).

### Après la mise en ligne

1. Renseigner `site.verification.google` avec le code Google Search Console.
2. Soumettre `https://votre-domaine/sitemap.xml` dans la Search Console.
3. Créer la fiche **Google Business Profile** avec exactement les mêmes NAP
   (nom, adresse, téléphone) que `src/lib/site.ts` — la cohérence NAP est le premier facteur
   du référencement local.
4. Remplacer les témoignages et réalisations d'exemple par de vrais retours clients.
5. Publier un article par mois : c'est le levier le plus régulier sur la longue traîne.

---

## Structure

```
src/
├─ app/
│  ├─ layout.tsx                     en-tête, pied de page, SEO global, thème
│  ├─ page.tsx                       accueil
│  ├─ services/                      liste + 8 pages générées (generateStaticParams)
│  ├─ blog/                          liste + articles Markdown
│  ├─ simulateur/                    calculateur de dimensionnement
│  ├─ realisations/  a-propos/  faq/  contact/
│  ├─ mentions-legales/  politique-de-confidentialite/
│  ├─ sitemap.ts  robots.ts  manifest.ts
│  ├─ opengraph-image.tsx  twitter-image.tsx  icon.svg
│  └─ globals.css                    jetons de couleur, composants, typographie
├─ components/                       header, footer, UI, simulateur, formulaire, icônes
├─ lib/                              site, services, contenu, SEO, blog, image OG
└─ content/blog/                     articles Markdown
```

---

## Thème

Palette définie dans `tailwind.config.ts` :

- **`solar`** — jaune/orange, la production et le rendement
- **`leaf`** — vert, la durabilité et l'énergie propre
- **`night`** — vert très sombre, fond des sections immersives

Les couleurs de surface passent par des variables CSS (`--bg`, `--fg`, `--brand`…) définies dans
`globals.css`, ce qui donne un **mode sombre** complet. La préférence est mémorisée et appliquée
avant la première peinture, sans clignotement.

Aucune image bitmap : toutes les illustrations sont des SVG intégrés au HTML — pas de requête
réseau, pas de décalage de mise en page, rendu net sur tous les écrans.

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
