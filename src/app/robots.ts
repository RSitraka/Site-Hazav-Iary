import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Générés au build : nécessaire pour l'export statique.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Rien de sensible ici : on écarte seulement les routes techniques.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
