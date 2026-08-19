import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CheckList, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/ui";
import { ArrowRightIcon, serviceIcons } from "@/components/icons";
import { getService, services } from "@/lib/services";
import { buildMetadata, faqSchema, serviceSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

/** Génère les 8 pages de service au build : elles sont servies en statique. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service introuvable" };

  return buildMetadata({
    title: service.title,
    description: service.excerpt,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.excerpt,
            path: `/services/${service.slug}`,
          }),
          ...(service.faq.length ? [faqSchema(service.faq)] : []),
        ]}
      />

      <PageHero
        eyebrow={service.short}
        title={service.title}
        lead={service.excerpt}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.short, path: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn-primary">
            Demander un devis
            <ArrowRightIcon width={16} height={16} />
          </Link>
          <Link href="/simulateur" className="btn-secondary">
            Estimer mon besoin
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded border border-accent-line bg-accent-soft text-accent">
              <Icon width={26} height={26} />
            </span>
            <h2 className="h2 mt-6">En quoi consiste cette prestation</h2>
            <p className="lead mt-4">{service.intro}</p>

            <h3 className="h3 mt-12">Ce que vous y gagnez</h3>
            <CheckList className="mt-5" items={service.benefits} />
          </div>

          <aside className="card lg:sticky lg:top-24">
            <h2 className="h3">Ce que nous livrons</h2>
            <ol className="mt-5 space-y-5">
              {service.deliverables.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed muted">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/contact" className="btn-primary mt-7 w-full">
              Parler de mon projet
            </Link>
          </aside>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container">
            <SectionHeading
              eyebrow="Questions fréquentes"
              title={`${service.short} : ce qu'on nous demande le plus`}
            />
            <div className="mt-10 max-w-3xl">
              <FaqList items={service.faq} />
            </div>
          </div>
        </section>
      )}

      <section className="section border-t">
        <div className="container">
          <SectionHeading eyebrow="Aller plus loin" title="Nos autres prestations" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="card card-hover group"
              >
                <h3 className="h3 text-base">{other.short}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{other.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Découvrir
                  <ArrowRightIcon
                    width={15}
                    height={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
