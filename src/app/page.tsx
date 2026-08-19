import Link from "next/link";
import type { Metadata } from "next";

import { HeroArt } from "@/components/hero-art";
import { JsonLd } from "@/components/json-ld";
import { CheckList, CtaBand, FaqList, SectionHeading, TestimonialCard } from "@/components/ui";
import {
  ArrowRightIcon,
  BoltIcon,
  LeafIcon,
  PhoneIcon,
  serviceIcons,
  ShieldIcon,
  SunIcon,
} from "@/components/icons";
import { keyFigures, site } from "@/lib/site";
import { services } from "@/lib/services";
import { commitments, generalFaq, processSteps, projects, testimonials } from "@/lib/content";
import { getAllPosts, formatDate } from "@/lib/posts";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Installateur solaire à Madagascar`,
  description:
    "Installateur de panneaux solaires dans toute Madagascar : autoconsommation, systèmes hybrides, batteries lithium, pompage solaire et électrification rurale. Étude de dimensionnement offerte, devis sous 48 h.",
  path: "/",
  keywords: [
    "installateur panneaux solaires Madagascar",
    "énergie solaire Antananarivo",
    "kit solaire Madagascar",
    "entreprise énergie verte Madagascar",
    "devis installation solaire",
  ],
});

export default function HomePage() {
  const homeFaq = generalFaq.slice(0, 5);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      {/* ------------------------------- HERO ------------------------------- */}
      <section className="border-b bg-surface">
        <div className="container grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="animate-rise">
            <p className="eyebrow">
              <SunIcon width={14} height={14} />
              Énergie solaire &amp; solutions vertes
            </p>

            <h1 className="h1 mt-6">
              L&rsquo;énergie solaire qui{" "}
              <span className="text-accent">
                éclaire durablement
              </span>{" "}
              Madagascar
            </h1>

            <p className="lead mt-6 max-w-xl">
              {site.name} conçoit, installe et entretient vos installations photovoltaïques :
              maisons, entreprises, exploitations agricoles et villages hors réseau. Un
              dimensionnement calculé au plus juste, du matériel garanti, des équipes locales.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Devis gratuit sous 48 h
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/simulateur" className="btn-secondary">
                Simuler mon installation
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm muted">
              <li className="flex items-center gap-2">
                <ShieldIcon width={18} height={18} className="text-accent" />
                Matériel garanti jusqu&rsquo;à 25 ans
              </li>
              <li className="flex items-center gap-2">
                <BoltIcon width={18} height={18} className="text-sun" />
                Étude de dimensionnement offerte
              </li>
              <li className="flex items-center gap-2">
                <LeafIcon width={18} height={18} className="text-accent" />
                Équipes 100 % malgaches
              </li>
            </ul>
          </div>

          <div className="relative">
            <HeroArt className="mx-auto w-full max-w-lg" />
          </div>
        </div>

        {/* Chiffres clés */}
        <div className="container pb-14">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyFigures.map((figure) => (
              <div key={figure.label} className="stat">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="text-[2rem] font-extrabold tracking-title text-accent">
                    {figure.value}
                  </span>
                  <span className="mt-1 block font-semibold">{figure.label}</span>
                  <span className="mt-1 block text-sm muted">{figure.hint}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------ SERVICES ---------------------------- */}
      <section className="section border-t" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="Nos services"
            title="Des solutions solaires pour chaque usage"
            lead="Du kit domestique à la centrale industrielle, nous couvrons l'ensemble de la chaîne : étude, fourniture, installation et maintenance."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="card card-hover group flex flex-col"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded border border-accent-line bg-accent-soft text-accent">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="h3 mt-5 text-lg">{service.short}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{service.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    En savoir plus
                    <ArrowRightIcon
                      width={15}
                      height={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------- POURQUOI NOUS -------------------------- */}
      <section className="section border-t bg-surface">
        <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Notre méthode"
              title="Le bon système, ni plus gros, ni plus petit"
              lead="Un système surdimensionné coûte inutilement cher ; sous-dimensionné, il déçoit dès la première semaine. Notre travail consiste à trouver le point juste."
            />
            <CheckList
              className="mt-8"
              items={[
                "Relevé de consommation appareil par appareil, pas d'estimation approximative",
                "Note de dimensionnement écrite : panneaux, batteries, onduleur, justifiés par le calcul",
                "Devis détaillé ligne par ligne avec marques et garanties",
                "Installation par des salariés formés, jamais sous-traitée à l'aveugle",
                "Maintenance et supervision pour tenir la production dans la durée",
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/a-propos" className="btn-secondary">
                Découvrir l&rsquo;entreprise
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn-ghost">
                <PhoneIcon width={16} height={16} />
                {site.phone}
              </a>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {commitments.map((item) => (
              <li key={item.title} className="card">
                <h3 className="h3 text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------ PROCESSUS --------------------------- */}
      <section className="section border-t">
        <div className="container">
          <SectionHeading
            eyebrow="Comment ça se passe"
            title="Cinq étapes, de la première visite à la mise en service"
            align="center"
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.step} className="card card-hover">
                <span className="text-3xl font-bold text-sun">{step.step}</span>
                <h3 className="h3 mt-3 text-base">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------- SIMULATEUR --------------------------- */}
      <section className="section border-t bg-surface">
        <div className="container">
          <div className="card grid items-center gap-8 border-sun-line p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
            <div>
              <p className="eyebrow">
                <BoltIcon width={14} height={14} />
                Outil gratuit
              </p>
              <h2 className="h2 mt-4">Combien de panneaux vous faut-il ?</h2>
              <p className="lead mt-4">
                Listez vos appareils, ajustez les hypothèses : le simulateur estime votre
                consommation mensuelle, le nombre de panneaux, la capacité de batterie et la
                puissance d&rsquo;onduleur nécessaires. La même méthode que nos ingénieurs sur le
                terrain.
              </p>
              <Link href="/simulateur" className="btn-primary mt-8">
                Lancer le simulateur
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <div className="grid gap-3 text-sm">
              {[
                { label: "Consommation mensuelle", value: "kWh/mois" },
                { label: "Nombre de panneaux", value: "× 550 Wc" },
                { label: "Capacité batterie", value: "kWh / Ah" },
                { label: "Puissance onduleur", value: "kVA" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded border bg-surface px-4 py-3"
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="muted">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- RÉALISATIONS -------------------------- */}
      <section className="section border-t">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Réalisations"
              title="Des chantiers livrés partout à Madagascar"
              lead="Villas, industries, coopératives agricoles, villages hors réseau : chaque contexte impose ses contraintes."
            />
            <Link href="/realisations" className="btn-secondary">
              Voir toutes les réalisations
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <article key={project.slug} className="card card-hover flex flex-col">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <span>{project.category}</span>
                  <span aria-hidden="true" className="muted">
                    ·
                  </span>
                  <span className="muted">{project.year}</span>
                </div>
                <h3 className="h3 mt-3 text-lg">{project.title}</h3>
                <p className="mt-1 text-sm font-medium text-sun">{project.power}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed muted">{project.summary}</p>
                <p className="mt-4 border-t pt-4 text-sm font-medium">{project.location}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- TÉMOIGNAGES --------------------------- */}
      <section className="section border-t bg-surface">
        <div className="container">
          <SectionHeading eyebrow="Témoignages" title="Ce que disent nos clients" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.author} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- BLOG ------------------------------ */}
      {posts.length > 0 && (
        <section className="section border-t">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Blog"
                title="Comprendre le solaire avant d'investir"
                lead="Nos guides pratiques pour choisir, dimensionner et entretenir une installation photovoltaïque."
              />
              <Link href="/blog" className="btn-secondary">
                Tous les articles
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="card card-hover relative flex flex-col">
                  <div className="flex items-center gap-2 text-xs muted">
                    <span className="font-semibold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h3 className="h3 mt-3 text-lg">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{post.description}</p>
                  <p className="mt-4 text-sm muted">{post.readingTime} min de lecture</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------- FAQ ------------------------------ */}
      <section className="section border-t bg-surface">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Vos questions avant de vous lancer"
            lead="Prix, rentabilité, durée de vie, garanties : les réponses les plus demandées."
          />
          <div>
            <FaqList items={homeFaq} />
            <Link href="/faq" className="btn-ghost mt-4">
              Voir toutes les questions
              <ArrowRightIcon width={15} height={15} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
