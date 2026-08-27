import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageHero, SectionHeading, TestimonialCard } from "@/components/ui";
import { SectionBackdrop } from "@/components/section-backdrop";
import { CheckIcon, MapPinIcon } from "@/components/icons";
import {
  equipmentCatalog,
  installedZones,
  processSteps,
  projects,
  provinces,
  testimonials,
} from "@/lib/content";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { backdrops } from "@/lib/backdrops";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations : nos chantiers solaires à Madagascar",
  description:
    "Zones d'intervention, matériel installé et déroulé d'un chantier solaire Hazav'Iary, partout à Madagascar : descente technique, contrat, pose et suivi.",
  path: "/realisations",
  keywords: [
    "chantier solaire Madagascar",
    "installation photovoltaïque Antananarivo",
    "zones intervention solaire Madagascar",
    "matériel solaire installé",
  ],
});

export default function RealisationsPage() {
  const fonds = backdrops.realisations;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Réalisations ${site.name}`,
          description:
            "Zones d'intervention, matériel installé et déroulé d'un chantier solaire Hazav'Iary.",
        }}
      />

      <PageHero
        eyebrow="Réalisations"
        title="Nos chantiers, partout à Madagascar"
        lead="Chaque installation part d'une descente sur site et se termine par un dossier complet : matériel posé, documents et avancement conservés."
        breadcrumbs={[{ name: "Réalisations", path: "/realisations" }]}
        backdrop={fonds[0]}
      />

      {/* -------------------------- Zones d'intervention --------------------
          Les zones affichées sont celles où des panneaux ont réellement été
          posés (`installedZones`). Tant que la liste n'est pas renseignée
          depuis l'application de suivi, la page se contente d'annoncer la
          couverture nationale — aucune zone n'est inventée. */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Où nous intervenons"
            title="Toute l'île, d'Antananarivo aux zones hors réseau"
            lead="Nos équipes partent d'Antananarivo et se déplacent dans les six provinces. Pour un site éloigné, les conditions de déplacement sont convenues avant la visite et chiffrées dans le devis."
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {(installedZones.length > 0 ? installedZones : provinces).map((zone) => (
              <li key={zone} className="card flex items-center gap-3 py-3.5">
                <MapPinIcon width={18} height={18} className="shrink-0 text-accent" />
                <span className="font-semibold">{zone}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------- Matériel ----------------------------- */}
      <section className="section border-t bg-surface relative isolate overflow-hidden">
        <SectionBackdrop {...fonds[1]} />
        <div className="container">
          <SectionHeading
            eyebrow="Ce que nous posons"
            title="Le matériel installé sur nos chantiers"
            lead="Références tenues en stock, affectées nominativement au chantier sur lequel elles partent."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentCatalog.map((group) => (
              <article key={group.title} className="card">
                <h3 className="label">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm">
                      <CheckIcon
                        width={15}
                        height={15}
                        strokeWidth={2.4}
                        className="mt-1 shrink-0 text-grow"
                      />
                      <span className="dim">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- Déroulé d'un chantier -------------------- */}
      <section className="section border-t relative isolate overflow-hidden">
        <SectionBackdrop {...fonds[2]} />
        <div className="container">
          <SectionHeading eyebrow="Déroulé" title="Comment se passe un chantier" align="center" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.step} className="card">
                <span className="text-2xl font-extrabold tracking-title text-sun">{step.step}</span>
                <h3 className="h3 mt-2 text-base">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------- Références client ------------------------ */}
      {projects.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container">
            <SectionHeading eyebrow="Références" title="Chantiers livrés" />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.code} className="card flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.category && (
                      <span className="badge badge-grow">{project.category}</span>
                    )}
                    <span className="label">{project.code}</span>
                    <span className="label">{project.year}</span>
                  </div>

                  {/* Sans titre rédigé à la main, la zone fait le titre : rien
                      n'est inventé à partir des données de l'application. */}
                  <h3 className="h3 mt-4 text-lg">
                    {project.title ?? `Installation solaire — ${project.location}`}
                  </h3>
                  {project.title && <p className="mt-1 text-sm muted">{project.location}</p>}
                  {project.summary && (
                    <p className="mt-4 leading-relaxed dim">{project.summary}</p>
                  )}

                  {project.equipment.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.equipment.map((item) => (
                        <li key={item} className="badge badge-sun">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.results && project.results.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t pt-5">
                      {project.results.map((result) => (
                        <li key={result} className="flex gap-2.5 text-sm">
                          <CheckIcon
                            width={15}
                            height={15}
                            strokeWidth={2.4}
                            className="mt-1 shrink-0 text-grow"
                          />
                          <span className="dim">{result}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container">
            <SectionHeading eyebrow="Témoignages" title="Ce que disent nos clients" align="center" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item.author} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Votre toiture peut-elle accueillir une installation ?"
        text="La descente technique répond à cette question. Décrivez-nous votre situation, nous convenons d'une visite."
      />
    </>
  );
}
