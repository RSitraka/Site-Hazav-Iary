import Link from "next/link";
import type { Metadata } from "next";

import { HeroPanel } from "@/components/hero-panel";
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
import {
  commitments,
  equipmentCatalog,
  generalFaq,
  interventionZones,
  processSteps,
  testimonials,
} from "@/lib/content";
import { getAllPosts, formatDate } from "@/lib/posts";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Installateur de panneaux solaires à Antananarivo`,
  description:
    "Installateur de panneaux solaires à Antananarivo : descente technique sur site, dimensionnement, contrat écrit, pose et suivi de chantier, avec paiement échelonné sur plusieurs mois.",
  path: "/",
  keywords: [
    "installateur panneaux solaires Antananarivo",
    "énergie solaire Madagascar",
    "pose plaque solaire Antananarivo",
    "batterie lithium onduleur solaire",
    "devis installation solaire Madagascar",
  ],
});

export default function HomePage() {
  const homeFaq = generalFaq.slice(0, 5);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      {/* ------------------------------- HERO -------------------------------
          Composition de la maquette : titre centré au-dessus d'un halo bleu,
          puis la « console » d'onglets posée sur l'arc lumineux. */}
      <section className="relative overflow-hidden">
        {/* Arc lumineux — l'horizon bleu derrière le panneau */}
        <div
          className="glow-arc top-[620px] h-[760px] animate-pulse-glow md:top-[780px]"
          aria-hidden="true"
        />

        <div className="container relative pt-14 text-center md:pt-20">
          <div className="mx-auto max-w-4xl animate-rise">
            <p className="eyebrow">
              <SunIcon width={13} height={13} />
              Énergie solaire &amp; solutions vertes
            </p>

            <h1 className="h1 mt-7">
              L&rsquo;énergie solaire qui <span className="text-accent">éclaire durablement</span>{" "}
              Madagascar
            </h1>

            <p className="mx-auto mt-7 max-w-2xl font-mono text-[11.5px] font-bold uppercase leading-relaxed tracking-label muted">
              Descente technique avant tout devis — dimensionnement écrit —
              <br className="hidden sm:block" /> contrat à montant et durée fixés — paiement
              échelonné sur plusieurs mois
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary btn-lg">
                Demander une visite technique
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/simulateur" className="btn-secondary btn-lg">
                Simuler mon installation
              </Link>
            </div>
          </div>

          {/* Console : les quatre temps d'un chantier */}
          <HeroPanel className="mx-auto mt-14 max-w-5xl text-left" />

          {/* Bandeau des zones suivies — équivalent de la barre de logos */}
          <div className="mt-14 pb-16">
            <p className="label">Chantiers suivis dans l&rsquo;agglomération d&rsquo;Antananarivo</p>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {interventionZones.map((zone) => (
                <li
                  key={zone}
                  className="font-mono text-[12.5px] font-bold uppercase tracking-label text-ink-mut transition-colors hover:text-accent"
                >
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------- CHIFFRES CLÉS ------------------------- */}
      <section className="container">
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
      </section>

      {/* ------------------------------ SERVICES ---------------------------- */}
      <section className="section" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="Nos services"
            title="De la visite de site au suivi de l'installation"
            lead="Six prestations qui couvrent la chaîne complète : descente technique, dimensionnement, contrat, fourniture, pose et entretien."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="card card-hover group flex flex-col"
                >
                  {/* Pastille d'icône en angle, comme sur la maquette */}
                  <div className="flex items-start justify-between">
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="corner-icon">
                      <Icon width={16} height={16} />
                    </span>
                  </div>
                  <h3 className="h3 mt-6 text-lg">{service.short}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{service.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-label text-accent">
                    En savoir plus
                    <ArrowRightIcon
                      width={14}
                      height={14}
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
      <section className="section">
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
                "Descente sur site : toiture, ombrages, tableau électrique et appareils à alimenter",
                "Relevé appareil par appareil, pas une estimation donnée au téléphone",
                "Dimensionnement écrit : panneaux, capacité batterie, puissance d'onduleur",
                "Contrat qui fixe le montant convenu et la durée de paiement",
                "Matériel sorti du stock et rattaché nominativement à votre chantier",
                "Dossier de chantier conservé, puis entretien pour tenir la production",
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
            {commitments.map((item, i) => {
              const Icon = [ShieldIcon, BoltIcon, LeafIcon, SunIcon][i % 4];
              return (
                <li key={item.title} className="card card-hover">
                  <span className="corner-icon">
                    <Icon width={16} height={16} />
                  </span>
                  <h3 className="h3 mt-5 text-base">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed muted">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------ PROCESSUS ---------------------------
          Étapes numérotées reliées par un filet lumineux, comme la section
          « How it works » de la maquette. */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Comment ça se passe"
            title="Six étapes, du premier appel au dernier versement"
            align="center"
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.step} className="card card-hover pt-8">
                {/* Filet lumineux + numéro en tête de carte */}
                <div className="absolute inset-x-6 top-0 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/60" />
                  <span className="num rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1">
                    {step.step}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/60" />
                </div>
                <h3 className="h3 mt-6 text-base">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------- SIMULATEUR --------------------------- */}
      <section className="section">
        <div className="container">
          <div className="card-glow grid items-center gap-10 p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
            <div>
              <p className="eyebrow">
                <BoltIcon width={13} height={13} />
                Outil gratuit
              </p>
              <h2 className="h2 mt-5">Combien de panneaux vous faut-il ?</h2>
              <p className="lead mt-4">
                Listez vos appareils, ajustez les hypothèses : le simulateur estime votre
                consommation mensuelle, le nombre de panneaux, la capacité de batterie et la
                puissance d&rsquo;onduleur nécessaires. La même méthode que nos ingénieurs sur le
                terrain.
              </p>
              <Link href="/simulateur" className="btn-primary btn-lg mt-8">
                Lancer le simulateur
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <div className="grid gap-3 text-sm">
              {[
                { label: "Consommation mensuelle", value: "kWh/mois" },
                { label: "Nombre de panneaux", value: "× 450 Wc" },
                { label: "Capacité batterie", value: "kWh / Ah" },
                { label: "Puissance onduleur", value: "kVA" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl border border-line bg-panel-3/60 px-4 py-3"
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="font-mono text-[12px] font-bold uppercase tracking-label text-accent">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------- ZONES ET MATÉRIEL ----------------------- */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Réalisations"
              title="Nos chantiers autour d'Antananarivo"
              lead="Dix quartiers et communes suivis, et un matériel identifié chantier par chantier."
            />
            <Link href="/realisations" className="btn-secondary">
              Voir les réalisations
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="card">
              <h3 className="label">Zones d&rsquo;intervention</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {interventionZones.map((zone) => (
                  <li key={zone} className="badge badge-grow">
                    {zone}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {equipmentCatalog.map((group) => (
                <article key={group.title} className="card">
                  <h3 className="label">{group.title}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm dim">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- TÉMOIGNAGES --------------------------- */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Témoignages"
              title="Ce que disent nos clients"
              align="center"
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item.author} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------- BLOG ------------------------------ */}
      {posts.length > 0 && (
        <section className="section">
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
                  <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-label muted">
                    <span className="font-bold text-accent">{post.category}</span>
                    <span aria-hidden="true">/</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h3 className="h3 mt-4 text-lg">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{post.description}</p>
                  <p className="mt-5 font-mono text-[10.5px] uppercase tracking-label muted">
                    {post.readingTime} min de lecture
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------- FAQ ------------------------------ */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Vos questions avant de vous lancer"
            lead="Prix, rentabilité, durée de vie, garanties : les réponses les plus demandées."
          />
          <div>
            <FaqList items={homeFaq} />
            <Link href="/faq" className="btn-ghost mt-5">
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
