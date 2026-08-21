import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

import logoMark from "../../public/logo-mark.png";

/**
 * Emblème officiel Hazav'Iary (lémurien / ampoule, rose des vents, rayons
 * solaires), repris du logo de l'application de gestion. Le fond blanc du
 * fichier d'origine a été rendu transparent : la marque se pose donc aussi
 * bien sur les surfaces claires que sombres.
 */
export function LogoMark({
  className = "h-10 w-10",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  // L'emblème comporte des aplats gris foncé : en mode sombre il est posé sur
  // une pastille claire, comme le fait l'application (`html.dark .brand-logo`).
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-lg dark:bg-[#E9EDF0] dark:p-[3px]">
      <Image
        src={logoMark}
        alt=""
        aria-hidden="true"
        className={`${className} object-contain`}
        sizes="80px"
        priority={priority}
      />
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} — accueil`}
    >
      <LogoMark priority />
      <span className="text-[1.05rem] font-extrabold tracking-title">
        <span className="text-ink-dim">HAZAV</span>
        <span className="text-accent">&rsquo;IARY</span>
      </span>
    </Link>
  );
}
