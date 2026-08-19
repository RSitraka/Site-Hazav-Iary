import Link from "next/link";
import type { Metadata } from "next";

import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { ArrowRightIcon, LeafIcon, ShieldIcon, SunIcon } from "@/components/icons";
import { commitments, processSteps } from "@/lib/content";
import { keyFigures, site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "À propos : notre mission pour une énergie propre à Madagascar",
  description:
    "Hazav'Iary est une entreprise malgache spécialisée dans l'énergie solaire : notre histoire, notre méthode de dimensionnement, nos engagements et nos équipes techniques.",
  path: "/a-propos",
  keywords: [
    "entreprise énergie solaire Madagascar",
    "société photovoltaïque Antananarivo",
    "énergie verte Madagascar",
  ],
});

const values = [
  {
    icon: SunIcon,
    title: "Rendre le solaire atteignable",
    text: "Le paiement s'étale sur plusieurs mois : une avance, puis des mensualités. L'installation ne dépend pas d'un seul versement.",
  },
  {
    icon: ShieldIcon,
    title: "Tenir dans la durée",
    text: "Une installation n'a de valeur que si elle produit encore dans dix ans. Nous tenons notre stock pour que les pièces restent disponibles.",
  },
  {
    icon: LeafIcon,
    title: "Ne rien laisser au flou",
    text: "Descente écrite, dimensionnement calculé, contrat signé, matériel tracé : à chaque étape, ce qui est décidé est consigné.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une entreprise malgache au service de l'énergie propre"
        lead={`${site.name} installe des panneaux solaires dans l'agglomération d'Antananarivo. Notre différence tient à une chose simple : nous venons voir avant de chiffrer, et nous écrivons ce qui est convenu.`}
        breadcrumbs={[{ name: "À propos", path: "/a-propos" }]}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Notre méthode" title="Voir, calculer, écrire, poser" />
            <div className="mt-6 space-y-5 leading-relaxed muted">
              <p>
                Un système solaire se rate presque toujours de la même façon : des équipements
                achetés à l&rsquo;estime, trop petits pour l&rsquo;usage réel, ou au contraire
                surdimensionnés et payés pour rien.
              </p>
              <p>
                Nous prenons donc le problème par l&rsquo;autre bout. Une descente technique
                d&rsquo;abord : nous venons relever la toiture, les ombrages, le tableau électrique
                et les appareils que vous voulez alimenter. Le dimensionnement vient ensuite, et le
                prix seulement après.
              </p>
              <p>
                Ce qui est convenu est écrit : le contrat fixe le montant et le nombre de mois de
                paiement. Pendant le chantier, le matériel sorti du stock est rattaché à votre
                dossier, avec les documents et l&rsquo;avancement — un dossier qui reste consultable
                une fois les travaux terminés.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/realisations" className="btn-secondary">
                Voir nos réalisations
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {keyFigures.map((figure) => (
              <div key={figure.label} className="stat">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="text-[2rem] font-extrabold tracking-title text-accent">
                    {figure.value}
                  </span>
                  <span className="mt-1 block font-medium">{figure.label}</span>
                  <span className="mt-1 block text-sm muted">{figure.hint}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section border-t bg-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui guide nos choix techniques"
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded border border-accent-line bg-accent-soft text-accent">
                  <value.icon width={22} height={22} />
                </span>
                <h3 className="h3 mt-5 text-lg">{value.title}</h3>
                <p className="mt-2 leading-relaxed muted">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Nos engagements"
              title="Quatre promesses tenues sur chaque chantier"
            />
            <CheckList
              className="mt-8"
              items={commitments.map((c) => `${c.title} — ${c.text}`)}
            />
          </div>

          <div>
            <h2 className="h3">Notre façon de travailler</h2>
            <ol className="mt-6 space-y-4">
              {processSteps.map((step) => (
                <li key={step.step} className="card flex gap-5">
                  <span className="text-2xl font-bold text-sun">{step.step}</span>
                  <span>
                    <span className="block font-semibold">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed muted">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand
        title="Travaillons ensemble"
        text="Que vous soyez un particulier, une entreprise ou une organisation, la première étape est la même : comprendre votre besoin réel."
      />
    </>
  );
}
