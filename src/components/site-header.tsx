"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Referme le menu mobile à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  // Empêche le défilement de l'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    // En haut de page l'en-tête est transparent : il laisse voir le halo vert.
    // Au défilement seulement, un fond translucide et un filet apparaissent.
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b bg-tone/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-[74px] items-center justify-between gap-4">
        <Logo />

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 px-1.5 py-1.5 backdrop-blur-md lg:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-accent-soft text-accent shadow-glow"
                  : "text-ink-dim hover:bg-panel-3 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 font-mono text-[12.5px] font-bold text-ink-dim transition-colors hover:text-accent xl:inline-flex"
          >
            <PhoneIcon width={15} height={15} className="text-accent" />
            {site.phone}
          </a>
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden md:inline-flex">
            Demander un devis
            <ArrowRightIcon width={15} height={15} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line-strong bg-panel lg:hidden"
          >
            {open ? <CloseIcon width={19} height={19} /> : <MenuIcon width={19} height={19} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t bg-tone/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container space-y-1 py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-line hover:bg-panel"
            >
              <span className="font-semibold">{item.label}</span>
              {item.description && (
                <span className="block text-sm muted">{item.description}</span>
              )}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-3 w-full">
            Demander une visite technique
          </Link>
          <a href={`tel:${site.phoneHref}`} className="btn-secondary mt-2 w-full">
            <PhoneIcon width={15} height={15} />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
