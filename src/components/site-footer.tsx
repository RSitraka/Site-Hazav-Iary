import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "@/components/icons";
import { footerNav, site } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t bg-night-900 text-night-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-glow" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 bg-sun-radial opacity-40"
      />

      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-bold">
              <LogoMark />
              <span>
                Hazav<span className="text-solar-400">&rsquo;</span>Iary
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-night-100/70">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium transition-colors hover:border-solar-400 hover:text-solar-400"
                >
                  Facebook
                </a>
              )}
              {site.social.linkedin && (
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium transition-colors hover:border-solar-400 hover:text-solar-400"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="text-sm font-semibold uppercase tracking-wider text-solar-400">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-night-100/70 transition-colors hover:text-white"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-entreprise">
            <h2 id="footer-entreprise" className="text-sm font-semibold uppercase tracking-wider text-solar-400">
              Entreprise
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...footerNav.entreprise, ...footerNav.ressources].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-night-100/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-solar-400">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-night-100/80">
              <li className="flex gap-3">
                <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0 text-leaf-400" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}, {site.address.countryName}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 text-leaf-400" />
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon width={18} height={18} className="mt-0.5 shrink-0 text-leaf-400" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon width={18} height={18} className="mt-0.5 shrink-0 text-leaf-400" />
                <span>
                  Lun. – Ven. 8 h – 17 h
                  <br />
                  Sam. 8 h – 12 h
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-night-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <p>
            Énergie solaire et solutions vertes à {site.address.city} et dans toute {" "}
            {site.address.countryName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
