import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CheckList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { SectionBackdrop } from "@/components/section-backdrop";
import {
  ArrowRightIcon,
  BoltIcon,
  ClockIcon,
  FactoryIcon,
  HomeIcon,
  PanelIcon,
  SunIcon,
} from "@/components/icons";
import { ariary, customPower, kits, promises, reasons } from "@/lib/offers";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { backdrops } from "@/lib/backdrops";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Nos offres : kits solaires, prix et paiement en 3 à 6 mois",
  description:
    "Le catalogue Hazav'Iary : kits solaires de 70 000 Ar à 900 000 Ar, crédit sur 3 à 6 mois, et installations sur mesure de 1000 W à 6 kVA. Tout est dimensionné à la taille que vous voulez.",
  path: "/offres",
  keywords: [
    "prix kit solaire Madagascar",
    "kit solaire Antananarivo prix",
    "panneau solaire paiement en plusieurs fois",
    "kit solaire 300W 500W",
    "installation solaire sur mesure Madagascar",
  ],
});

/** Chaque kit porte son icône : c'est ce qui distingue les gammes, sans photo. */
const kitIcons = {
  bolt: BoltIcon,
  sun: SunIcon,
  home: HomeIcon,
  panel: PanelIcon,
};

export default function OffresPage() {
  const fonds = backdrops.offres;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Kits solaires — ${site.name}`,
          itemListElement: kits.map((kit, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: kit.name,
              description: kit.usages,
              category: kit.family,
              brand: { "@type": "Brand", name: site.name },
              offers: {
                "@type": "Offer",
                price: kit.price,
                priceCurrency: "MGA",
                availability: "https://schema.org/InStock",
                url: absoluteUrl("/offres"),
                seller: { "@type": "Organization", name: site.name },
              },
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Nos offres"
        title="Des kits prêts à poser, et tout le reste à votre mesure"
        lead="Voici nos offres du moment, prix affichés et paiement échelonné compris. Aucune de ces tailles ne vous correspond ? Nous montons l'installation à la dimension que vous voulez."
        breadcrumbs={[{ name: "Offres", path: "/offres" }]}
        backdrop={fonds[0]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Commander un kit
            <ArrowRightIcon width={15} height={15} />
          </Link>
          <Link href="/simulateur" className="btn-secondary">
            Estimer mon besoin
          </Link>
        </div>
      </PageHero>

      {/* ---------- Les kits du catalogue ----------------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Catalogue terrain"
            title="Nos kits en détail"
            lead="Composition exacte, usages garantis, autonomie annoncée et conditions de paiement. Ce sont les montants du dépliant officiel de nos équipes."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {kits.map((kit) => {
              const Icon = kitIcons[kit.icon];
              return (
                <article key={kit.slug} className="card card-hover flex flex-col">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-accent-line bg-accent-soft text-accent">
                      <Icon width={22} height={22} />
                    </span>
                    <div>
                      <p className="label">{kit.family}</p>
                      <h3 className="h3 mt-1 text-lg">{kit.name}</h3>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed dim">{kit.usages}</p>

                  <div className="mt-5">
                    <p className="label">Composition</p>
                    <CheckList items={kit.composition} className="mt-3" />
                  </div>

                  <p className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-line-strong bg-panel px-3 py-1.5 text-sm font-semibold">
                    <ClockIcon width={15} height={15} className="text-accent" />
                    {kit.autonomy}
                  </p>

                  {/* Le prix ferme la carte : c'est l'information qu'on vient chercher. */}
                  <div className="mt-6 flex-1" />
                  <div className="tile">
                    <p className="label">Prix comptant</p>
                    <p className="mt-1 text-[1.75rem] font-extrabold tracking-title text-accent">
                      {ariary(kit.price)}
                    </p>
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="text-sm font-bold">
                        {kit.credit.label} sur {kit.credit.months} mois
                      </p>
                      <p className="mt-1 text-sm dim">
                        Avance de {ariary(kit.credit.deposit)}, puis {ariary(kit.credit.monthly)}{" "}
                        par mois.
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Grandes puissances : le sur-mesure ----------------------- */}
      <section className="section pt-0 relative isolate overflow-hidden">
        <SectionBackdrop {...fonds[1]} />
        <div className="container">
          <div className="card-glow overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-[50%] bg-accent-pure/20 blur-3xl"
            />
            <div className="relative grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start">
              <div>
                <span className="corner-icon">
                  <FactoryIcon width={16} height={16} />
                </span>
                <p className="label mt-5">Grandes puissances — {customPower.range}</p>
                <h2 className="h2 mt-2">{customPower.title}</h2>
                <p className="lead mt-4">{customPower.audience}</p>
                <p className="mt-3 leading-relaxed dim">{customPower.scope}</p>
                <p className="mt-3 leading-relaxed dim">{customPower.autonomy}</p>
                <p className="mt-5 inline-flex rounded-full border border-line-strong bg-panel px-3 py-1.5 text-sm muted">
                  {customPower.note}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    Demander une évaluation
                    <ArrowRightIcon width={15} height={15} />
                  </Link>
                  <Link href="/services" className="btn-secondary">
                    Voir notre méthode
                  </Link>
                </div>
              </div>

              <div className="tile">
                <p className="label">Pourquoi Hazav&rsquo;Iary</p>
                <CheckList items={reasons} className="mt-4" />
                <p className="mt-6 border-t border-line pt-4 text-sm italic dim">
                  « Énergie garantie au meilleur prix, avec facilités de paiement. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Récapitulatif chiffré ------------------------------------ */}
      <section className="section pt-0">
        <div className="container">
          <SectionHeading
            eyebrow="En un coup d'œil"
            title="Tous les kits, tous les montants"
            lead="Crédit flexible sur 3 à 6 mois sur l'ensemble des kits : une avance, puis des mensualités douces."
          />

          <div className="card mt-10 overflow-x-auto p-0">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Prix comptant et conditions de crédit des kits solaires Hazav&rsquo;Iary
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="label px-6 py-4">
                    Kit
                  </th>
                  <th scope="col" className="label px-6 py-4">
                    Idéal pour
                  </th>
                  <th scope="col" className="label px-6 py-4">
                    Autonomie
                  </th>
                  <th scope="col" className="label px-6 py-4 text-right">
                    Prix comptant
                  </th>
                  <th scope="col" className="label px-6 py-4 text-right">
                    Crédit
                  </th>
                </tr>
              </thead>
              <tbody>
                {kits.map((kit) => (
                  <tr key={kit.slug} className="border-b border-line">
                    <th scope="row" className="px-6 py-4 font-bold">
                      {kit.name}
                    </th>
                    <td className="px-6 py-4 dim">{kit.ideal}</td>
                    <td className="px-6 py-4 dim">{kit.autonomy}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-accent">
                      {ariary(kit.price)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right dim">
                      {ariary(kit.credit.monthly)} / mois sur {kit.credit.months} mois
                    </td>
                  </tr>
                ))}
                {/* Le sur-mesure ferme le tableau : la gamme ne s'arrête pas aux kits. */}
                <tr>
                  <th scope="row" className="px-6 py-4 font-bold">
                    {customPower.range}
                  </th>
                  <td className="px-6 py-4 dim">Cliniques, bureaux, villas, ateliers</td>
                  <td className="px-6 py-4 dim">Établie sur devis</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-accent">
                    Sur devis
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right dim">
                    Comptant à la livraison
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm muted">
            Montants en ariary, pour les kits vendus tels quels. Une installation dimensionnée
            sur mesure est chiffrée après la descente technique, puis fixée par écrit dans le
            contrat.
          </p>
        </div>
      </section>

      {/* ---------- La promesse : tout se dimensionne au besoin du client ---- */}
      {/* Placée après le catalogue : on lit d'abord les offres, puis ce qui   */}
      {/* se passe quand aucune ne correspond exactement.                      */}
      <section className="section pt-0 relative isolate overflow-hidden">
        <SectionBackdrop {...fonds[2]} />
        <div className="container">
          <SectionHeading
            eyebrow="Notre engagement"
            title="Nous faisons tout à la taille de l'installation que vous voulez"
            lead="Les kits ci-dessus sont des points d'entrée, pas des limites. Ce que vous voulez alimenter décide de la taille — jamais l'inverse."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {promises.map((promise, i) => (
              <article key={promise.title} className="card card-hover">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-3 text-lg">{promise.title}</h3>
                <p className="mt-3 leading-relaxed dim">{promise.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Dites-nous ce que vous voulez alimenter"
        text="Un kit du catalogue, ou une installation calculée pour votre maison, votre atelier ou votre clinique : nous partons de votre besoin, puis nous chiffrons après l'avoir vu."
        primaryLabel="Parler de mon projet"
        secondaryLabel="Estimer mon installation"
      />
    </>
  );
}
