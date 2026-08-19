import type { Metadata } from "next";

import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url} édité par ${site.legalName}.`,
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions légales"
        lead="Informations relatives à l'éditeur, à l'hébergement et à la propriété intellectuelle du présent site."
        breadcrumbs={[{ name: "Mentions légales", path: "/mentions-legales" }]}
      />

      <section className="section">
        <div className="container max-w-3xl prose-solar">
          <p className="rounded-xl border border-solar-500/40 bg-solar-500/10 p-4 text-sm">
            <strong>À compléter avant mise en ligne :</strong> forme juridique, capital social,
            numéro RCS / NIF / STAT, nom du directeur de publication et coordonnées exactes de
            l&rsquo;hébergeur.
          </p>

          <h2>Éditeur du site</h2>
          <p>
            <strong>{site.legalName}</strong>
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}, {site.address.countryName}
            <br />
            Téléphone : {site.phone}
            <br />
            Email : {site.email}
          </p>
          <p>
            Numéro d&rsquo;identification fiscale (NIF) : <em>à compléter</em>
            <br />
            Numéro statistique (STAT) : <em>à compléter</em>
            <br />
            Registre du commerce (RCS) : <em>à compléter</em>
          </p>

          <h2>Directeur de la publication</h2>
          <p>
            <em>Nom et qualité du représentant légal à compléter.</em>
          </p>

          <h2>Hébergement</h2>
          <p>
            <em>Nom, adresse et téléphone de l&rsquo;hébergeur à compléter.</em>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&rsquo;ensemble des contenus présents sur ce site — textes, illustrations, schémas,
            marques et logos — est la propriété de {site.legalName}, sauf mention contraire. Toute
            reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite
            préalable est interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations techniques, dimensionnements et ordres de grandeur budgétaires publiés
            sur ce site sont donnés à titre indicatif. Ils ne constituent pas un engagement
            contractuel et ne remplacent pas une étude réalisée sur site. Seul un devis signé
            engage {site.legalName}.
          </p>

          <h2>Liens externes</h2>
          <p>
            Ce site peut renvoyer vers des sites tiers. {site.legalName} n&rsquo;exerce aucun
            contrôle sur ces ressources et décline toute responsabilité quant à leur contenu.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Le présent site est soumis au droit malgache. Tout litige relatif à son utilisation
            relève de la compétence des tribunaux d&rsquo;{site.address.city}.
          </p>
        </div>
      </section>
    </>
  );
}
