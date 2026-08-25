import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Construit une URL absolue à partir d'un chemin interne.
 *
 * La concaténation est volontaire : `new URL("/contact", base)` ramènerait à la
 * racine du domaine et perdrait le sous-chemin quand le site est publié dans un
 * dossier (GitHub Pages sert `https://…github.io/Site-Hazav-Iary/`). Toutes les
 * canoniques, le sitemap et les données structurées passent par ici.
 */
export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/+$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeo = {
  title: string;
  description: string;
  /** Chemin interne, ex. "/services". Sert de canonique. */
  path: string;
  keywords?: string[];
  /** Image de partage personnalisée (chemin interne). */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Génère les métadonnées d'une page : titre, description, canonique,
 * Open Graph et Twitter Card. Utilisé par toutes les routes du site.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  // Dès qu'une route définit son propre bloc openGraph, Next cesse d'hériter
  // du fichier opengraph-image de la racine : on référence donc l'image
  // générée explicitement pour que chaque page en dispose.
  const ogImage = absoluteUrl(image ?? "/opengraph-image");
  const twitterImage = absoluteUrl(image ?? "/twitter-image");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Données structurées schema.org                                            */
/* -------------------------------------------------------------------------- */

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(site.social).filter(Boolean),
    knowsAbout: [
      "énergie solaire",
      "photovoltaïque",
      "autoconsommation",
      "stockage lithium",
      "pompage solaire",
      "électrification rurale",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "fr-MG",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType ?? input.name,
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/contact"),
      servicePhone: site.phone,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    inLanguage: "fr-MG",
    image: absoluteUrl("/opengraph-image"),
    author: { "@type": "Organization", name: input.author, url: site.url },
    publisher: { "@id": orgId },
  };
}
