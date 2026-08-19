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
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.85)] backdrop-blur-xl"
          : "border-transparent bg-[rgb(var(--bg)/0.6)] backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-leaf-500/10 text-leaf-600 dark:text-leaf-400"
                  : "hover:bg-leaf-500/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-medium xl:inline-flex"
          >
            <PhoneIcon width={16} height={16} className="text-solar-500" />
            {site.phone}
          </a>
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden md:inline-flex">
            Devis gratuit
            <ArrowRightIcon width={16} height={16} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            {open ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t bg-[rgb(var(--bg))] lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container space-y-1 py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-3 transition-colors hover:bg-leaf-500/10"
            >
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <span className="block text-sm muted">{item.description}</span>
              )}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-3 w-full">
            Demander un devis gratuit
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="btn-secondary mt-2 w-full"
          >
            <PhoneIcon width={16} height={16} />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
