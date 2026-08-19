/**
 * Injecte un bloc de données structurées schema.org.
 * Rendu côté serveur : lisible immédiatement par les robots d'indexation.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu provient exclusivement de nos propres données statiques.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
