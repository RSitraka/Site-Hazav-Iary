import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageHero, SectionHeading, TestimonialCard } from "@/components/ui";
import { CheckIcon } from "@/components/icons";
import { projects, testimonials } from "@/lib/content";
import { keyFigures } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations : nos installations solaires à Madagascar",
  description:
    "Villas hybrides, centrales en toiture, mini-réseaux ruraux, pompage solaire et éclairage public : découvrez des installations photovoltaïques livrées par Hazav'Iary à Madagascar.",
  path: "/realisations",
  keywords: [
    "réalisations solaires Madagascar",
    "chantier photovoltaïque Antananarivo",
    "mini-réseau solaire village",
    "référence installation solaire",
  ],
});

export default function RealisationsPage() {
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Réalisations Hazav'Iary",
          description:
            "Sélection d'installations solaires réalisées par Hazav'Iary à Madagascar.",
        }}
      />

      <PageHero
        eyebrow="Réalisations"
        title="Nos installations solaires à travers Madagascar"
        lead="Chaque projet a ses contraintes : toiture, budget, éloignement, criticité des équipements. Voici comment nous les avons traitées."
        breadcrumbs={[{ name: "Réalisations", path: "/realisations" }]}
      >
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li
              key={category}
              className="rounded-full border px-4 py-1.5 text-sm font-medium muted"
            >
              {category}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section">
        <div className="container grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="card card-hover flex flex-col">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <span className="rounded-full bg-leaf-500/15 px-3 py-1 text-leaf-600 dark:text-leaf-400">
                  {project.category}
                </span>
                <span className="rounded-full bg-solar-500/15 px-3 py-1 text-solar-700 dark:text-solar-300">
                  {project.power}
                </span>
                <span className="muted">{project.year}</span>
              </div>

              <h2 className="h3 mt-4 text-xl">{project.title}</h2>
              <p className="mt-1 text-sm muted">
                {project.client} — {project.location}
              </p>
              <p className="mt-4 leading-relaxed muted">{project.summary}</p>

              <ul className="mt-5 space-y-2 border-t pt-5">
                {project.results.map((result) => (
                  <li key={result} className="flex gap-2.5 text-sm">
                    <CheckIcon
                      width={16}
                      height={16}
                      strokeWidth={2.2}
                      className="mt-0.5 shrink-0 text-leaf-500"
                    />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t bg-[rgb(var(--bg-subtle))]">
        <div className="container">
          <SectionHeading eyebrow="En chiffres" title="Notre parc installé" align="center" />
          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keyFigures.map((figure) => (
              <div key={figure.label} className="card text-center">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="font-display text-4xl font-bold text-leaf-600 dark:text-leaf-400">
                    {figure.value}
                  </span>
                  <span className="mt-2 block font-medium">{figure.label}</span>
                  <span className="mt-1 block text-sm muted">{figure.hint}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.author} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Votre projet ressemble à l'un de ceux-ci ?"
        text="Nous vous mettons volontiers en relation avec un client d'un chantier comparable au vôtre."
      />
    </>
  );
}
