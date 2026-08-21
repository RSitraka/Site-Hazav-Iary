import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageHero } from "@/components/ui";
import { ArrowRightIcon, serviceIcons } from "@/components/icons";
import { services } from "@/lib/services";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Nos services : installation solaire, stockage, maintenance",
  description:
    "Les prestations Hazav'Iary à Antananarivo : descente technique, dimensionnement et contrat, installation de panneaux solaires, batteries lithium et onduleurs, fourniture de matériel, suivi et maintenance.",
  path: "/services",
  keywords: [
    "services énergie solaire Antananarivo",
    "installation photovoltaïque Madagascar",
    "batterie lithium onduleur",
    "maintenance panneaux solaires",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Services solaires — ${site.name}`,
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: service.title,
            url: absoluteUrl(`/services/${service.slug}`),
          })),
        }}
      />

      <PageHero
        eyebrow="Nos services"
        title="Toute la chaîne, de la visite de site à la maintenance"
        lead="Six prestations complémentaires : nous relevons, nous calculons, nous écrivons, nous posons, puis nous entretenons."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />

      <section className="section">
        <div className="container grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article key={service.slug} className="card card-hover relative flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-accent-line bg-accent-soft text-accent">
                    <Icon width={22} height={22} />
                  </span>
                  <div>
                    <h2 className="h3 text-lg">
                      <Link
                        href={`/services/${service.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {service.title}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="mt-4 flex-1 leading-relaxed muted">{service.excerpt}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.benefits.slice(0, 2).map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-full border px-3 py-1 text-xs font-medium muted"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Détail de la prestation
                  <ArrowRightIcon width={15} height={15} />
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Un besoin qui ne rentre dans aucune case ?"
        text="Décrivez votre situation : nos techniciens vous répondent avec une proposition adaptée, même pour les configurations atypiques."
      />
    </>
  );
}
