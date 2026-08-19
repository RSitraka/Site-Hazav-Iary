import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

/** Mêmes familles que l'application de gestion : Inter + JetBrains Mono. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  category: "Énergie solaire",
  keywords: [
    "énergie solaire Madagascar",
    "panneaux solaires Antananarivo",
    "installateur photovoltaïque Madagascar",
    "kit solaire",
    "batterie lithium solaire",
    "pompage solaire",
    "électrification rurale",
    "énergie verte Madagascar",
    site.name,
  ],
  alternates: {
    canonical: "/",
    languages: { "fr-MG": "/" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.bing ? { other: { "msvalidate.01": site.verification.bing } } : {}),
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  // Une seule balise theme-color, mise à jour par la bascule clair/sombre —
  // même fonctionnement que l'application.
  themeColor: "#F2F3F5",
  width: "device-width",
  initialScale: 1,
};

/**
 * Applique le mode clair/sombre AVANT le rendu, sinon la page clignoterait
 * en clair avant de passer en sombre. La clé de stockage est celle de
 * l'application (`hazaviary_theme`) : la préférence est donc partagée entre
 * le site et l'outil de gestion sur un même domaine.
 */
const themeScript = `(function(){try{var s=localStorage.getItem('hazaviary_theme');var d=s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#101417')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2.5 focus:font-bold focus:text-accent-on"
        >
          Aller au contenu principal
        </a>

        <JsonLd data={[organizationSchema(), websiteSchema()]} />

        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
