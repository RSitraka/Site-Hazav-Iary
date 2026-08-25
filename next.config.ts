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
 *                       (Cloudflare Pages, GitHub Pages, Netlify…).
 *
 * En export statique, deux limites tenues par l'hébergeur et non par Next :
 *   - les images ne sont plus optimisées à la volée (`unoptimized`) ;
 *   - les en-têtes de sécurité ci-dessous sont ignorés, il faut les déclarer
 *     côté hébergeur (fichier `public/_headers` pour Cloudflare/Netlify).
 */
const exportStatique = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: exportStatique ? "export" : "standalone",
  images: exportStatique ? { unoptimized: true } : undefined,
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
