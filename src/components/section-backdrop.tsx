import Image from "next/image";

/**
 * ---------------------------------------------------------------------------
 * FOND PHOTOGRAPHIQUE DE SECTION
 * ---------------------------------------------------------------------------
 * Pose une photo très atténuée derrière une section, sans jamais gêner la
 * lecture : l'image est volontairement peu contrastée (voir `.backdrop-photo`
 * dans `globals.css`, où l'opacité diffère entre le mode sombre et le mode
 * clair) et deux voiles la recouvrent :
 *
 *   1. un aplat de la couleur de fond de page, qui « éteint » la photo ;
 *   2. un dégradé vertical qui la fait naître et mourir dans le noir, pour
 *      qu'aucune arête franche ne coupe la page.
 *
 * La section hôte doit porter `relative isolate overflow-hidden` : `isolate`
 * crée le contexte d'empilement dans lequel le `-z-10` reste sous le contenu.
 *
 * Purement décoratif : `aria-hidden` et `pointer-events-none` le retirent de
 * l'arbre d'accessibilité et n'interceptent aucun clic. Le texte alternatif
 * vit dans le manifeste (`src/lib/backdrops.ts`) à titre documentaire.
 */
export function SectionBackdrop({
  src,
  position = "center",
  className = "",
}: {
  src: string;
  /** Sujet de la photo : documentaire seulement — le fond est décoratif, donc
   *  sans texte alternatif. Accepté ici pour que le manifeste puisse être
   *  étalé tel quel (`{...fonds[0]}`). */
  sujet?: string;
  /** Point d'intérêt à garder visible au recadrage (`object-position`). */
  position?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="backdrop-photo object-cover"
        style={{ objectPosition: position }}
      />
      {/* Voile de couleur de page : c'est lui qui rend la photo « pas claire ». */}
      <div className="absolute inset-0 backdrop-veil" />
      {/* Fondu haut et bas, pour raccorder la section au noir qui l'entoure. */}
      <div className="absolute inset-0 backdrop-fade" />
    </div>
  );
}
