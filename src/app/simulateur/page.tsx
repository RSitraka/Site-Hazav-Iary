import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { SolarSimulator } from "@/components/solar-simulator";
import { CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const simulatorFaq = [
  {
    question: "Le résultat du simulateur remplace-t-il une étude ?",
    answer:
      "Non. Il donne un ordre de grandeur fiable pour préparer votre budget, mais une étude sur site tient compte de l'orientation de la toiture, des ombrages, de la longueur des câbles et des pointes de démarrage des moteurs.",
  },
  {
    question: "Sur quelles hypothèses repose le calcul ?",
    answer:
      "Cinq heures d'ensoleillement équivalent plein soleil (moyenne malgache), 75 % de rendement système pour tenir compte des pertes de câblage, d'onduleur et de température, et une profondeur de décharge de 85 % en lithium ou 50 % en plomb.",
  },
  {
    question: "Pourquoi le nombre de panneaux augmente-t-il si vite ?",
    answer:
      "Parce que la consommation se calcule en watts multipliés par les heures d'usage. Un climatiseur de 1 200 W utilisé 6 heures pèse à lui seul autant que quarante ampoules LED : ce sont les gros consommateurs qui dimensionnent l'installation.",
  },
  {
    question: "Faut-il prévoir plusieurs jours d'autonomie ?",
    answer:
      "Rarement au-delà d'un jour en zone urbaine : chaque journée d'autonomie supplémentaire multiplie le coût du parc batterie. Pour des équipements critiques, on préfère généralement un secours réseau ou un groupe d'appoint.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Simulateur solaire gratuit : calculez votre consommation et vos panneaux",
  description:
    "Calculez gratuitement votre consommation mensuelle en kWh, le nombre de panneaux solaires, la capacité de batterie et la puissance d'onduleur nécessaires à votre installation à Madagascar.",
  path: "/simulateur",
  keywords: [
    "simulateur solaire gratuit",
    "calcul consommation électrique kWh",
    "combien de panneaux solaires",
    "dimensionnement batterie solaire",
    "calculateur solaire Madagascar",
  ],
});

export default function SimulateurPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(simulatorFaq),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Simulateur solaire Hazav'Iary",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            url: `${site.url}/simulateur`,
            description:
              "Outil gratuit de calcul de consommation et de pré-dimensionnement d'une installation solaire.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "MGA" },
          },
        ]}
      />

      <PageHero
        eyebrow="Outil gratuit"
        title="Dimensionnez votre installation solaire en deux minutes"
        lead="Listez vos appareils, ajustez les hypothèses et obtenez immédiatement votre consommation mensuelle, le nombre de panneaux, la capacité batterie et la puissance d'onduleur."
        breadcrumbs={[{ name: "Simulateur", path: "/simulateur" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <SolarSimulator />
        </div>
      </section>

      <section className="section border-t bg-surface">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Méthode de calcul"
            title="Comment lire vos résultats"
            lead="Les formules utilisées ici sont celles que nos techniciens appliquent sur le terrain."
          />
          <FaqList items={simulatorFaq} />
        </div>
      </section>

      <CtaBand
        title="Faites valider votre dimensionnement"
        text="Envoyez-nous vos résultats : nous vérifions les hypothèses, affinons le calcul selon votre toiture et vous remettons un devis détaillé."
        secondaryLabel="Voir nos services"
        secondaryHref="/services"
      />
    </>
  );
}
