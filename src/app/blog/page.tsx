import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { CtaBand, PageHero } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { formatDate, getAllPosts } from "@/lib/posts";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Blog : guides et conseils sur l'énergie solaire",
  description:
    "Prix, dimensionnement, batteries, entretien, pompage : nos guides pratiques pour investir sereinement dans une installation solaire à Madagascar.",
  path: "/blog",
  keywords: [
    "blog énergie solaire Madagascar",
    "guide panneaux solaires",
    "conseils installation photovoltaïque",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `Blog ${site.name}`,
          description:
            "Guides pratiques sur l'énergie solaire, le dimensionnement et l'entretien des installations photovoltaïques à Madagascar.",
          url: absoluteUrl("/blog"),
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: post.date,
          })),
        }}
      />

      <PageHero
        eyebrow="Blog"
        title="Comprendre le solaire avant d'investir"
        lead="Des guides écrits par nos techniciens, avec des chiffres et des ordres de grandeur applicables au contexte malgache."
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
      />

      {posts.length === 0 ? (
        <section className="section">
          <div className="container">
            <p className="muted">Les premiers articles arrivent très bientôt.</p>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container">
            {/* Article mis en avant */}
            <article className="card card-hover relative grid gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:items-center md:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs muted">
                  <span className="rounded-sm bg-accent-soft px-3 py-1 font-semibold uppercase tracking-wider text-accent">
                    {featured.category}
                  </span>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingTime} min de lecture</span>
                </div>
                <h2 className="h2 mt-4 text-2xl sm:text-3xl">
                  <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p className="lead mt-4 text-base sm:text-lg">{featured.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent">
                  Lire l&rsquo;article
                  <ArrowRightIcon width={16} height={16} />
                </span>
              </div>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {featured.keywords.slice(0, 4).map((keyword) => (
                  <li key={keyword} className="rounded-sm border px-3 py-1 text-xs muted">
                    {keyword}
                  </li>
                ))}
              </ul>
            </article>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <article key={post.slug} className="card card-hover relative flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-xs muted">
                    <span className="font-semibold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h2 className="h3 mt-3 text-lg">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{post.description}</p>
                  <p className="mt-4 border-t pt-4 text-sm muted">
                    {post.readingTime} min de lecture
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Une question que nos articles ne couvrent pas ?"
        text="Nos techniciens répondent volontiers, même si vous n'êtes pas encore prêt à lancer un projet."
      />
    </>
  );
}
