import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/ui";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — devis solaire gratuit sous 48 h",
  description: `Contactez ${site.name} à ${site.address.city} : étude de dimensionnement offerte et devis détaillé sous 48 heures pour votre installation solaire à Madagascar.`,
  path: "/contact",
  keywords: [
    "devis installation solaire Madagascar",
    "contact installateur solaire Antananarivo",
    "demande étude solaire",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.name}`,
          description: `Formulaire de demande de devis pour une installation solaire à ${site.address.city} et dans toute ${site.address.countryName}.`,
        }}
      />

      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet solaire"
        lead="Décrivez-nous votre situation en quelques lignes. Nous revenons vers vous sous 48 heures ouvrées avec une première estimation et une proposition de visite technique."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <ContactForm />

          <div className="space-y-5 lg:sticky lg:top-24">
            <div className="card">
              <h2 className="h3">Nous joindre directement</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <PhoneIcon width={20} height={20} className="mt-0.5 shrink-0 text-sun" />
                  <span>
                    <span className="block font-medium">Téléphone</span>
                    <a href={`tel:${site.phoneHref}`} className="link-underline">
                      {site.phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MailIcon width={20} height={20} className="mt-0.5 shrink-0 text-sun" />
                  <span>
                    <span className="block font-medium">Email</span>
                    <a href={`mailto:${site.email}`} className="link-underline">
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPinIcon width={20} height={20} className="mt-0.5 shrink-0 text-sun" />
                  <span>
                    <span className="block font-medium">Adresse</span>
                    <span className="muted">
                      {site.address.street}
                      <br />
                      {site.address.postalCode} {site.address.city}, {site.address.countryName}
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <ClockIcon width={20} height={20} className="mt-0.5 shrink-0 text-sun" />
                  <span>
                    <span className="block font-medium">Horaires</span>
                    <span className="muted">
                      Lundi – vendredi : 8 h – 17 h
                      <br />
                      Samedi : 8 h – 12 h
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="card bg-surface">
              <h2 className="h3 text-base">Zones d&rsquo;intervention</h2>
              <p className="mt-2 text-sm leading-relaxed muted">
                Nous intervenons dans toute {site.address.countryName}. Les déplacements hors de
                l&rsquo;agglomération d&rsquo;{site.address.city} sont chiffrés à l&rsquo;avance
                dans le devis.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areaServed.map((area) => (
                  <li key={area} className="rounded-sm border px-3 py-1 text-xs font-medium muted">
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="h3 text-base">Préparez votre demande</h2>
              <p className="mt-2 text-sm leading-relaxed muted">
                Pour une réponse plus précise dès le premier échange, indiquez si possible : les
                appareils à alimenter, la surface de toiture disponible, la fréquence des coupures
                et votre échéance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
