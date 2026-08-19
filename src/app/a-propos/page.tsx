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
    title: "Rendre le solaire accessible",
    text: "Des solutions calibrées pour les budgets malgaches, du kit d'appoint à la centrale industrielle, sans jamais sacrifier la sécurité électrique.",
  },
  {
    icon: ShieldIcon,
    title: "Tenir dans la durée",
    text: "Une installation n'a de valeur que si elle produit encore dans dix ans. Nous privilégions les composants réparables et les pièces disponibles localement.",
  },
  {
    icon: LeafIcon,
    title: "Réduire l'empreinte réelle",
    text: "Moins de gasoil brûlé, moins de batteries jetées : nous reprenons les batteries usagées et orientons vers les filières de recyclage.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une entreprise malgache au service de l'énergie propre"
        lead={`${site.name} accompagne foyers, entreprises et collectivités dans leur transition vers le solaire depuis ${site.foundingYear}. Notre différence tient à une chose simple : nous calculons avant de vendre.`}
        breadcrumbs={[{ name: "À propos", path: "/a-propos" }]}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Notre histoire" title="Née d'un constat de terrain" />
            <div className="mt-6 space-y-5 leading-relaxed muted">
              <p>
                Nos fondateurs ont passé des années à installer des systèmes solaires et à constater
                le même problème : des équipements achetés à l&rsquo;estime, trop petits pour
                l&rsquo;usage réel, ou au contraire surdimensionnés et jamais rentabilisés.
              </p>
              <p>
                Nous avons donc commencé par l&rsquo;autre bout : mesurer la consommation avant de
                proposer quoi que ce soit. Cette méthode, outillée par notre application de terrain
                EcoCalc, permet un relevé appareil par appareil, y compris dans les zones sans
                réseau mobile.
              </p>
              <p>
                Depuis, {site.name} a équipé des villas, des unités agroalimentaires, des
                coopératives agricoles et des villages entiers. Le principe est resté le même :
                partir du besoin réel, puis dimensionner.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/realisations" className="btn-secondary">
                Voir nos réalisations
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-3xl border bg-[rgb(var(--border))] sm:grid-cols-2">
            {keyFigures.map((figure) => (
              <div key={figure.label} className="bg-[rgb(var(--bg))] p-6">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="font-display text-3xl font-bold text-leaf-600 dark:text-leaf-400">
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

      <section className="section border-t bg-[rgb(var(--bg-subtle))]">
        <div className="container">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui guide nos choix techniques"
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="card card-hover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-solar-400/20 to-leaf-500/20 text-leaf-600 dark:text-leaf-400">
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
                  <span className="font-display text-2xl font-bold text-solar-500">{step.step}</span>
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
