/**
 * ---------------------------------------------------------------------------
 * LA MAISON — plan des scènes
 * ---------------------------------------------------------------------------
 * Le site se visite comme une maison :
 *
 *   /            → l'extérieur : la façade, l'accueil est affiché sur la porte ;
 *   /couloir     → le couloir : une porte par page, c'est le menu du site ;
 *   /<page>      → une pièce : le contenu existant de la page, mis en scène.
 *
 * Ce fichier décrit les pièces (ordre des portes, couleur, mobilier, photos
 * accrochées au mur). Les libellés et descriptions viennent de `mainNav` : une
 * page ajoutée au menu principal reçoit automatiquement sa porte.
 *
 * Les transitions elles-mêmes vivent dans `src/components/scene/`.
 */
import { mainNav, type NavItem } from "@/lib/site";

/** Couleur de porte : uniquement des teintes de la charte. */
export type DoorTone = "accent" | "sun" | "grow" | "slate";

/** Meuble posé au sol de la pièce (illustration, purement décorative). */
export type Furniture = "desk" | "shelf" | "armchair" | "workbench" | "sideboard" | "lamp";

export type Room = NavItem & {
  tone: DoorTone;
  furniture: Furniture;
  /** Index des photos de terrain (`src/lib/gallery.ts`) accrochées au mur. */
  photos: number[];
};

const decor: Record<string, Pick<Room, "tone" | "furniture" | "photos">> = {
  "/services": { tone: "accent", furniture: "workbench", photos: [6, 0] },
  "/realisations": { tone: "grow", furniture: "sideboard", photos: [5, 7] },
  "/offres": { tone: "sun", furniture: "desk", photos: [3] },
  "/simulateur": { tone: "accent", furniture: "desk", photos: [1] },
  "/a-propos": { tone: "slate", furniture: "armchair", photos: [4, 2] },
  "/faq": { tone: "grow", furniture: "shelf", photos: [2] },
  "/contact": { tone: "sun", furniture: "desk", photos: [0] },
};

const fallback: Pick<Room, "tone" | "furniture" | "photos"> = {
  tone: "slate",
  furniture: "lamp",
  photos: [],
};

/** Les portes du couloir, dans l'ordre : le menu principal, puis la FAQ. */
export const rooms: Room[] = [
  ...mainNav.filter((item) => item.href !== "/contact"),
  { href: "/faq", label: "FAQ", description: "Les réponses aux questions les plus posées" },
  ...mainNav.filter((item) => item.href === "/contact"),
].map((item) => ({ ...item, ...(decor[item.href] ?? fallback) }));

/** Pièces qui n'ont pas de porte dans le couloir (pages légales, 404…). */
const annexes: Record<string, string> = {
  "/mentions-legales": "Mentions légales",
  "/politique-de-confidentialite": "Confidentialité",
};

export type SceneKind = "exterior" | "corridor" | "room";

export function sceneKind(pathname: string): SceneKind {
  if (pathname === "/") return "exterior";
  if (pathname === "/couloir") return "corridor";
  return "room";
}

/** Pièce correspondant à une URL (préfixe le plus long : /services/x → Services). */
export function roomFor(pathname: string): Room {
  const match = rooms
    .filter((room) => pathname === room.href || pathname.startsWith(`${room.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];
  if (match) return match;
  return {
    href: pathname,
    label: annexes[pathname] ?? "Pièce annexe",
    ...fallback,
  };
}

/**
 * Où mène le bouton « Sortir » d'une pièce : une sous-page ressort dans sa
 * pièce parente (/services/x → /services), une pièce ressort dans le couloir.
 */
export function exitFor(pathname: string): { href: string; label: string } {
  const room = rooms.find((r) => pathname.startsWith(`${r.href}/`));
  if (room) return { href: room.href, label: `Retour : ${room.label}` };
  return { href: "/couloir", label: "Sortir" };
}

/** Couleur CSS d'une teinte de porte (variables de `globals.css`). */
export const toneColor: Record<DoorTone, string> = {
  accent: "rgb(var(--accent-pure))",
  sun: "rgb(var(--orange))",
  grow: "rgb(var(--green))",
  slate: "rgb(var(--slate))",
};
