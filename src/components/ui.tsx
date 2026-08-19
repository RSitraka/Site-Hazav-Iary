import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, QuoteIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import type { Testimonial } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/*  Fil d'Ariane (visuel + données structurées)                                */
/* -------------------------------------------------------------------------- */

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const full = [{ name: "Accueil", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Fil d'Ariane" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 muted">
          {full.map((item, i) => {
            const last = i === full.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-medium">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-leaf-600">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  En-tête de page interne                                                    */
/* -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-sun-radial opacity-50 dark:opacity-30"
      />
      <div className="container relative py-14 md:py-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl animate-fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 mt-5">{title}</h1>
          <p className="lead mt-5">{lead}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Titre de section                                                           */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="h2 mt-4">{title}</Tag>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Liste à puces cochées                                                      */
/* -------------------------------------------------------------------------- */

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-500/15 text-leaf-600 dark:text-leaf-400">
            <CheckIcon width={13} height={13} strokeWidth={2.4} />
          </span>
          <span className="muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accordéon FAQ — <details> natif : accessible et sans JavaScript            */
/* -------------------------------------------------------------------------- */

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y rounded-2xl border">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-medium marker:hidden">
            <span className="h3 text-base sm:text-lg">{item.question}</span>
            <ChevronDownIcon
              width={20}
              height={20}
              className="shrink-0 text-leaf-600 transition-transform duration-300 group-open:rotate-180 dark:text-leaf-400"
            />
          </summary>
          <p className="mt-3 leading-relaxed muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Témoignages                                                                */
/* -------------------------------------------------------------------------- */

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="card card-hover flex h-full flex-col">
      <QuoteIcon width={28} height={28} className="text-solar-400" />
      <blockquote className="mt-4 flex-1 leading-relaxed">« {item.quote} »</blockquote>
      <figcaption className="mt-6 border-t pt-4 text-sm">
        <span className="font-semibold">{item.author}</span>
        <span className="block muted">{item.role}</span>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bandeau d'appel à l'action                                                 */
/* -------------------------------------------------------------------------- */

export function CtaBand({
  title = "Prêt à passer au solaire ?",
  text = "Décrivez-nous votre projet : nous réalisons l'étude de dimensionnement et vous remettons un devis détaillé sous 48 heures.",
  primaryLabel = "Demander un devis gratuit",
  primaryHref = "/contact",
  secondaryLabel = "Estimer mon installation",
  secondaryHref = "/simulateur",
}: {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border bg-night-900 px-6 py-14 text-center text-night-100 sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-glow" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 bg-sun-radial opacity-60 animate-pulse-glow"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="h2">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-night-100/75">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link
                href={secondaryHref}
                className="btn rounded-full border border-white/20 text-night-100 transition-colors hover:border-solar-400 hover:text-solar-400"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
