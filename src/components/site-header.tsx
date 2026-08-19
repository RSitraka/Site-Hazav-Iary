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
    <header
      className={`sticky top-0 z-50 border-b bg-surface transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-[68px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-sm border px-3 py-2 text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? "border-accent-line bg-accent-soft text-accent"
                  : "border-transparent text-ink-dim hover:border-line hover:text-accent"
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
            <PhoneIcon width={15} height={15} className="text-sun" />
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
            className="grid h-[38px] w-[38px] place-items-center rounded-sm border border-line-strong bg-surface lg:hidden"
          >
            {open ? <CloseIcon width={19} height={19} /> : <MenuIcon width={19} height={19} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <div id="menu-mobile" hidden={!open} className="border-t bg-surface lg:hidden">
        <nav aria-label="Navigation mobile" className="container space-y-1 py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-sm border border-transparent px-3 py-2.5 transition-colors hover:border-line hover:bg-panel"
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
