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
      <nav aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-label muted">
          {full.map((item, i) => {
            const last = i === full.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink-dim">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-accent">
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
    <section className="border-b bg-surface">
      <div className="container py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl animate-rise">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 mt-4">{title}</h1>
          <p className="lead mt-4">{lead}</p>
          {children && <div className="mt-7">{children}</div>}
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
      <Tag className="h2 mt-3">{title}</Tag>
      {lead && <p className="lead mt-3">{lead}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Liste à puces cochées                                                      */
/* -------------------------------------------------------------------------- */

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[2px] border border-grow-line bg-grow-soft text-grow">
            <CheckIcon width={12} height={12} strokeWidth={2.6} />
          </span>
          <span className="dim">{item}</span>
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
    <div className="divide-y rounded border bg-surface shadow-sm">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
            <span className="h3 text-base">{item.question}</span>
            <ChevronDownIcon
              width={18}
              height={18}
              className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 leading-relaxed dim">{item.answer}</p>
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
    <figure className="card flex h-full flex-col">
      <QuoteIcon width={24} height={24} className="text-sun" />
      <blockquote className="mt-3 flex-1 leading-relaxed dim">« {item.quote} »</blockquote>
      <figcaption className="mt-5 border-t pt-4 text-sm">
        <span className="font-bold">{item.author}</span>
        <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-label muted">
          {item.role}
        </span>
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
        <div className="rounded border border-accent-line bg-accent-soft px-6 py-12 text-center sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="h2">{title}</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed dim">{text}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-primary btn-lg">
                {primaryLabel}
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href={secondaryHref} className="btn-secondary btn-lg">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
