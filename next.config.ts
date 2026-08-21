import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Sortie autonome : `next build` produit `.next/standalone`, un serveur Node
  // qui embarque ses dépendances. C'est ce qui permet une image Docker légère,
  // sans `node_modules` de développement (voir Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
