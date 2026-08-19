import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";
import { generalFaq } from "@/lib/content";
import { services } from "@/lib/services";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ : prix, rentabilité et durée de vie d'une installation solaire",
  description:
    "Toutes les réponses sur l'énergie solaire à Madagascar : prix d'une installation, retour sur investissement, durée de vie des batteries, garanties, financement et zones d'intervention.",
  path: "/faq",
  keywords: [
    "prix installation solaire Madagascar",
    "rentabilité panneaux solaires",
    "durée de vie batterie solaire",
    "questions énergie solaire",
  ],
});

export default function FaqPage() {
  // Les questions propres à chaque service enrichissent la page et le balisage.
  const serviceFaq = services.flatMap((service) =>
    service.faq.map((item) => ({ ...item, service: service.short })),
  );

  return (
    <>
      <JsonLd data={faqSchema([...generalFaq, ...serviceFaq])} />

      <PageHero
        eyebrow="Questions fréquentes"
        title="Tout ce qu'il faut savoir avant d'installer du solaire"
        lead="Prix, rentabilité, entretien, garanties : les questions que nous posent le plus souvent nos clients, avec des réponses chiffrées."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <section className="section">
        <div className="container max-w-3xl">
          <FaqList items={generalFaq} />
        </div>
      </section>

      <section className="section border-t bg-[rgb(var(--bg-subtle))]">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="Par prestation"
            title="Questions techniques par service"
            lead="Des réponses plus précises selon le type d'installation envisagé."
          />
          <div className="mt-10 space-y-8">
            {services
              .filter((service) => service.faq.length > 0)
              .map((service) => (
                <div key={service.slug}>
                  <h2 className="h3 mb-3 text-base uppercase tracking-wider text-leaf-600 dark:text-leaf-400">
                    {service.short}
                  </h2>
                  <FaqList items={service.faq} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Votre question n'est pas là ?"
        text="Écrivez-nous : un ingénieur vous répond, sans obligation d'engagement."
      />
    </>
  );
}
