import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Générés au build : nécessaire pour l'export statique.
export const dynamic = "force-static";

/**
 * Sous-chemin de publication (`/Site-Hazav-Iary` sur GitHub Pages, vide sur un
 * domaine propre). Les chemins du manifeste sont écrits à la main : contrairement
 * aux liens et aux images, Next ne les préfixe pas.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.shortName,
    description: site.description,
    start_url: `${base}/`,
    display: "standalone",
    background_color: "#050708",
    theme_color: "#26A6CE",
    lang: "fr",
    categories: ["business", "utilities"],
    icons: [
      { src: `${base}/icon.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${base}/logo-mark.png`, sizes: "256x256", type: "image/png", purpose: "maskable" },
    ],
  };
}
