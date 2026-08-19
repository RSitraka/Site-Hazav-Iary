import Link from "next/link";
import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { mainNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-96 bg-sun-radial opacity-50 dark:opacity-30"
      />
      <div className="container relative py-24 text-center md:py-32">
        <p className="font-display text-7xl font-bold text-solar-500">404</p>
        <h1 className="h2 mt-6">Cette page a disparu du réseau</h1>
        <p className="lead mx-auto mt-4 max-w-xl">
          Le lien est peut-être obsolète, ou l&rsquo;adresse comporte une erreur. Voici par où
          reprendre.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Retour à l&rsquo;accueil
            <ArrowRightIcon width={16} height={16} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Nous contacter
          </Link>
        </div>

        <nav aria-label="Pages principales" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-leaf-500 hover:bg-leaf-500/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
