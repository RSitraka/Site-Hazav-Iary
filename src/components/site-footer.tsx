import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "@/components/icons";
import { footerNav, site } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t bg-surface">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-10 w-10" />
              <span className="text-[1.05rem] font-extrabold tracking-title">
                <span className="text-ink-dim">HAZAV</span>
                <span className="text-accent">&rsquo;IARY</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed dim">{site.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="rounded-sm border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink-dim transition-colors hover:border-accent hover:text-accent"
                >
                  Facebook
                </a>
              )}
              {site.social.linkedin && (
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="rounded-sm border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-label text-ink-dim transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="label">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-ink-dim transition-colors hover:text-accent"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-entreprise">
            <h2 id="footer-entreprise" className="label">
              Entreprise
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...footerNav.entreprise, ...footerNav.ressources].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-dim transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-dim">
              <li className="flex gap-3">
                <MapPinIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}, {site.address.countryName}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  Lun. – Ven. 8 h – 17 h
                  <br />
                  Sam. 8 h – 12 h
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t pt-6 font-mono text-[11px] uppercase tracking-label muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} — Tous droits réservés
          </p>
          <p>
            Énergie solaire à {site.address.city} et dans toute {site.address.countryName}
          </p>
        </div>
      </div>
    </footer>
  );
}
