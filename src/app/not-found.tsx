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
    <section className="border-b bg-surface">
      <div className="container py-24 text-center md:py-32">
        <p className="text-7xl font-bold text-sun">404</p>
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
                  className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:bg-panel"
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
