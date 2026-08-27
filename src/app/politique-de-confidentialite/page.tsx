import type { Metadata } from "next";

import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { backdrops } from "@/lib/backdrops";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${site.legalName} collecte, utilise et protège les données personnelles transmises via le site.`,
  path: "/politique-de-confidentialite",
});

export default function ConfidentialitePage() {
  const fonds = backdrops.legal;
  return (
    <>
      <PageHero
        eyebrow="Vos données"
        title="Politique de confidentialité"
        lead="Quelles données nous collectons, pourquoi, combien de temps nous les conservons et comment exercer vos droits."
        breadcrumbs={[
          { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
        ]}
        backdrop={fonds[0]}
      />

      <section className="section">
        <div className="container max-w-3xl prose-solar">
          <p className="rounded border border-sun-line bg-sun-soft p-4 text-sm">
            <strong>À adapter :</strong> ce texte décrit le fonctionnement par défaut du site. Si
            vous ajoutez un outil de mesure d&rsquo;audience, un pixel publicitaire ou un service
            tiers de formulaire, complétez les sections correspondantes.
          </p>

          <h2>Données collectées</h2>
          <p>
            Le site ne collecte aucune donnée à votre insu. Les seules informations traitées sont
            celles que vous saisissez volontairement dans le formulaire de contact : nom, adresse
            email, numéro de téléphone, ville, nature du projet, budget envisagé et description de
            votre besoin.
          </p>
          <p>
            Le simulateur solaire fonctionne intégralement dans votre navigateur. Les appareils que
            vous y saisissez ne sont transmis à aucun serveur.
          </p>

          <h2>Finalité du traitement</h2>
          <p>
            Ces données servent exclusivement à répondre à votre demande : vous recontacter,
            réaliser l&rsquo;étude de dimensionnement et établir un devis. Elles ne font
            l&rsquo;objet d&rsquo;aucune vente, location ou transmission à des tiers à des fins
            commerciales.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les demandes sans suite sont conservées douze mois. Les dossiers ayant donné lieu à un
            devis ou à un chantier sont conservés selon les obligations comptables et de garantie
            applicables.
          </p>

          <h2>Cookies et mesure d&rsquo;audience</h2>
          <p>
            Dans sa configuration actuelle, ce site ne dépose aucun cookie publicitaire ni traceur
            tiers. Seule votre préférence d&rsquo;affichage (thème clair ou sombre) est enregistrée
            localement dans votre navigateur, via le stockage local. Cette information ne quitte
            jamais votre appareil et peut être effacée à tout moment depuis les réglages de votre
            navigateur.
          </p>

          <h2>Vos droits</h2>
          <p>
            Vous pouvez à tout moment demander l&rsquo;accès, la rectification ou la suppression des
            données vous concernant en écrivant à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Nous répondons sous trente jours.
          </p>

          <h2>Sécurité</h2>
          <p>
            Le site est servi en HTTPS. Les demandes reçues sont accessibles uniquement aux
            personnes de {site.legalName} chargées du traitement commercial et technique des
            projets.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à cette politique :{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> ou {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
