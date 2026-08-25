import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * Le site n'a aucune page dynamique : il peut donc être servi de deux façons,
 * choisies par la variable d'environnement `STATIC_EXPORT`.
 *
 *   (défaut)          → `output: "standalone"` : un serveur Node dans un
 *                       conteneur Docker (voir Dockerfile). C'est ce qui tourne
 *                       sur le serveur, à côté de l'application de gestion.
 *
 *   STATIC_EXPORT=1   → `output: "export"` : `next build` écrit un dossier
 *                       `out/` de pages HTML pures, hébergeable gratuitement
 *                       (GitHub Pages, Cloudflare Pages, Netlify…).
 *
 * En export statique, deux limites tenues par l'hébergeur et non par Next :
 *   - les images ne sont plus optimisées à la volée (`unoptimized`) ;
 *   - les en-têtes de sécurité ci-dessous sont ignorés, il faut les déclarer
 *     côté hébergeur (fichier `public/_headers` pour Cloudflare/Netlify).
 */
const exportStatique = process.env.STATIC_EXPORT === "1";

/**
 * Sous-chemin de publication, ex. `/Site-Hazav-Iary` sur GitHub Pages, où le
 * site n'est pas servi à la racine d'un domaine mais dans un dossier portant le
 * nom du dépôt. Vide partout ailleurs (domaine propre, Cloudflare Pages…).
 *
 * Next préfixe alors tout seul les liens `next/link`, les images `next/image`
 * et les fichiers `/_next/…`. Restent à notre charge les chemins écrits à la
 * main (manifeste, données structurées) : ils lisent `NEXT_PUBLIC_BASE_PATH`,
 * réexporté ici pour qu'une seule variable pilote les deux.
 */
const basePath = (process.env.BASE_PATH || "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: exportStatique ? "export" : "standalone",
  images: exportStatique ? { unoptimized: true } : undefined,
  ...(basePath ? { basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  ...(exportStatique
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
