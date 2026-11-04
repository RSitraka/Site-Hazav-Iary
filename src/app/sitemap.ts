import type { MetadataRoute } from "next";

import { services } from "@/lib/services";
import { site } from "@/lib/site";

// Générés au build : nécessaire pour l'export statique.
export const dynamic = "force-static";

/**
 * Sitemap XML généré au build — exposé sur /sitemap.xml et référencé
 * par robots.txt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/offres", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/simulateur", priority: 0.9, changeFrequency: "monthly" },
    { path: "/realisations", priority: 0.8, changeFrequency: "monthly" },
    { path: "/a-propos", priority: 0.7, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
    { path: "/politique-de-confidentialite", priority: 0.2, changeFrequency: "yearly" },
  ];

  const serviceRoutes = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));


  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
  ];
}
