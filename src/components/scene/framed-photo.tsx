"use client";

import Image from "next/image";
import { useRef } from "react";
import { CloseIcon } from "@/components/icons";
import type { Photo } from "@/lib/gallery";

/**
 * Photo accrochée au mur dans un cadre. Un clic (ou Entrée / Espace) l'ouvre
 * en plein écran dans un `<dialog>` natif : focus piégé, Échap pour fermer,
 * retour du focus sur le cadre — sans aucune librairie.
 *
 * La vignette est chargée à la demande (`loading="lazy"` par défaut de
 * `next/image`), la grande version seulement à l'ouverture.
 */
export function FramedPhoto({ photo, tilt = 0 }: { photo: Photo; tilt?: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="frame group"
        style={{ rotate: `${tilt}deg` }}
        aria-label={`Agrandir la photo : ${photo.caption}`}
      >
        <span className="frame-wire" aria-hidden="true" />
        <span className="frame-mat">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="180px"
            className="h-[64px] w-[86px] object-cover sm:h-[112px] sm:w-[150px]"
          />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={photo.caption}
        onClick={(e) => {
          // Clic sur le fond (hors de l'image) : on ferme.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <figure className="relative">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="92vw"
            loading="lazy"
            className="max-h-[80svh] w-auto rounded-xl object-contain"
          />
          <figcaption className="mt-3 text-center text-sm font-semibold text-white">
            {photo.caption}
          </figcaption>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
            aria-label="Fermer la photo"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </figure>
      </dialog>
    </>
  );
}
