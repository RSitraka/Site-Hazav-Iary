"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRightIcon, HomeIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * En-tête réduit au strict nécessaire : la navigation du site, c'est la maison
 * elle-même (le couloir et ses portes, voir `src/app/couloir`). L'en-tête garde
 * le logo (retour à la façade), un accès direct au couloir, le téléphone, la
 * bascule clair/sombre et la demande de devis.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inCorridor = pathname === "/couloir";

  return (
    // En haut de page l'en-tête est transparent : il laisse voir le ciel de la
    // scène. Au défilement seulement, un fond translucide et un filet apparaissent.
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b bg-tone/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-[74px] items-center justify-between gap-3">
        <Logo />

        <nav aria-label="Navigation principale" className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 font-mono text-[12.5px] font-bold text-ink-dim transition-colors hover:text-accent xl:inline-flex"
          >
            <PhoneIcon width={15} height={15} className="text-accent" />
            {site.phone}
          </a>
          <ThemeToggle />
          <Link
            href="/couloir"
            aria-current={inCorridor ? "page" : undefined}
            className={`btn ${inCorridor ? "border-accent text-accent shadow-glow" : ""}`}
          >
            <HomeIcon width={15} height={15} />
            {/* Sur petit écran l'icône seule tient la place ; le nom reste lu. */}
            <span className="sr-only sm:not-sr-only">Couloir</span>
            <span className="sr-only"> : toutes les pages du site</span>
          </Link>
          <Link href="/contact" className="btn-primary hidden md:inline-flex">
            Demander un devis
            <ArrowRightIcon width={15} height={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
