import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { articleSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article introuvable" };

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          date: post.date,
          updated: post.updated,
          author: post.author,
        })}
      />

      <article>
        <header className="border-b bg-surface">
          <div className="container max-w-3xl py-12 md:py-16">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm muted">
              <span className="rounded-sm bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {post.category}
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min de lecture</span>
            </div>

            <h1 className="h1 mt-5 text-3xl sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="lead mt-5">{post.description}</p>
            <p className="mt-6 text-sm muted">
              Par {post.author}, {site.address.city}
            </p>
          </div>
        </header>

        <div className="container max-w-3xl py-12 md:py-16">
          {/* Le HTML provient de nos propres fichiers Markdown versionnés. */}
          <div className="prose-solar" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="card mt-14 bg-surface">
            <h2 className="h3 text-base">Envie de chiffrer votre propre installation ?</h2>
            <p className="mt-2 text-sm leading-relaxed muted">
              Le simulateur calcule votre consommation mensuelle et le matériel nécessaire en deux
              minutes, gratuitement.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/simulateur" className="btn-primary">
                Ouvrir le simulateur
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Demander un devis
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section border-t bg-surface">
          <div className="container">
            <h2 className="h2">À lire également</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="card card-hover relative flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <h3 className="h3 mt-3 text-lg">
                    <Link href={`/blog/${item.slug}`} className="after:absolute after:inset-0">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed muted">{item.description}</p>
                  <p className="mt-4 text-sm muted">{item.readingTime} min de lecture</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
