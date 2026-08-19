import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";
import { generalFaq } from "@/lib/content";
import { services } from "@/lib/services";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ : prix, paiement et durée de vie d'une installation solaire",
  description:
    "Les réponses aux questions les plus posées : comment le prix se fixe, le paiement échelonné sur plusieurs mois, la descente technique, les batteries, le matériel posé et les zones d'intervention.",
  path: "/faq",
  keywords: [
    "prix installation solaire Antananarivo",
    "paiement échelonné solaire",
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
        lead="Comment le prix se fixe, comment se passe le paiement en plusieurs mois, ce que nous installons : les questions que nos clients posent le plus souvent."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <section className="section">
        <div className="container max-w-3xl">
          <FaqList items={generalFaq} />
        </div>
      </section>

      <section className="section border-t bg-surface">
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
                  <h2 className="h3 mb-3 text-base uppercase tracking-wider text-accent">
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
