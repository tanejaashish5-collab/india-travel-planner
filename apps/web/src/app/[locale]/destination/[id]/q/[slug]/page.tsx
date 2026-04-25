import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import Link from "next/link";

export const revalidate = 86400;
export const dynamicParams = true;

const CATEGORY_LABEL: Record<string, string> = {
  safety: "Safety",
  cost: "Cost",
  permits: "Permits",
  family: "Family",
  transport: "Transport",
  timing: "Timing",
  practical: "Practical",
  weather: "Weather",
};

type Question = {
  id: string;
  destination_id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  traveler_type: string | null;
  editor_handle: string | null;
  answered_at: string;
  destination: { name: string; state_id: string | null; state: { name: string } | { name: string }[] | null } | null;
};

async function getQuestion(id: string, slug: string): Promise<Question | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("questions")
    .select(`
      id, destination_id, slug, question, answer, category, traveler_type,
      editor_handle, answered_at,
      destination:destinations(name, state_id, state:states(name))
    `)
    .eq("destination_id", id)
    .eq("slug", slug)
    .eq("status", "answered")
    .single();
  return (data as Question | null) ?? null;
}

async function getRelatedQuestions(destinationId: string, excludeId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("questions")
    .select("id, slug, question, category, answered_at")
    .eq("destination_id", destinationId)
    .eq("status", "answered")
    .neq("id", excludeId)
    .order("answered_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string; locale: string }>;
}): Promise<Metadata> {
  const { id, slug, locale } = await params;
  const q = await getQuestion(id, slug);
  if (!q) return {};
  const destName = q.destination?.name ?? id;
  return {
    title: `${q.question.slice(0, 80)} — ${destName} | NakshIQ`,
    description: q.answer.slice(0, 160),
    ...localeAlternates(locale, `/destination/${id}/q/${slug}`),
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string; slug: string; locale: string }>;
}) {
  const { id, slug, locale } = await params;
  const q = await getQuestion(id, slug);
  if (!q) notFound();

  const [related, editor] = await Promise.all([
    getRelatedQuestions(q.destination_id, q.id),
    getPrimaryEditor(),
  ]);

  const destName = q.destination?.name ?? id;
  const stateName = Array.isArray(q.destination?.state)
    ? q.destination?.state[0]?.name
    : q.destination?.state?.name;
  const categoryLabel = CATEGORY_LABEL[q.category] ?? q.category;
  const url = `https://www.nakshiq.com/${locale}/destination/${id}/q/${slug}`;
  const destUrl = `https://www.nakshiq.com/${locale}/destination/${id}`;

  const faqLd = faqPageJsonLd({
    entries: [{ question: q.question, answer: q.answer }],
    url,
    isPartOfId: "https://www.nakshiq.com#website",
  });

  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: q.question,
    description: q.answer.slice(0, 300),
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    datePublished: q.answered_at,
    dateModified: q.answered_at,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    mainEntityOfPage: url,
  };
  if (editor) {
    articleLd.author = {
      "@type": "Person",
      "@id": `https://www.nakshiq.com/${locale}/about/team#${editor.slug}`,
      name: editor.name,
      ...(editor.same_as && editor.same_as.length > 0 && { sameAs: editor.same_as }),
    };
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: destName, item: destUrl },
      { "@type": "ListItem", position: 3, name: "Q&A", item: `${destUrl}#section-questions` },
      { "@type": "ListItem", position: 4, name: q.question.slice(0, 80), item: url },
    ],
  };

  const answeredOn = new Date(q.answered_at).toLocaleDateString(
    locale === "hi" ? "hi-IN" : "en-IN",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <div className="min-h-screen">
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <Link href={`/${locale}/destination/${id}`} className="hover:text-foreground">{destName}</Link>
          {" → "}
          <span className="text-foreground">Q&amp;A</span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
            {categoryLabel}
          </span>
          {q.traveler_type && (
            <span className="rounded-full border border-border bg-background/40 px-2 py-0.5">
              {q.traveler_type}
            </span>
          )}
          {stateName && <span>{stateName}</span>}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
          {q.question}
        </h1>

        <article className="prose prose-invert max-w-none mb-10">
          <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
            {q.answer}
          </div>
        </article>

        <div className="rounded-xl border border-border/60 bg-background/40 p-4 text-xs text-muted-foreground mb-10">
          {editor && (
            <p>
              Answered by{" "}
              <Link href={`/${locale}/about/team`} className="underline hover:text-foreground">
                {editor.name}
              </Link>
              {" — "}
              {answeredOn}
            </p>
          )}
          {!editor && <p>Answered {answeredOn}</p>}
        </div>

        {related.length > 0 && (
          <section className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold mb-4">More questions about {destName}</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/${locale}/destination/${id}/q/${r.slug}`}
                    className="block rounded-xl border border-border bg-background/40 px-4 py-3 text-sm hover:border-primary/40 transition-colors"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mr-2">
                      {CATEGORY_LABEL[r.category] ?? r.category}
                    </span>
                    <span>{r.question}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 rounded-2xl border border-border bg-background/30 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Got a different question about {destName}?
          </p>
          <Link
            href={`/${locale}/destination/${id}#section-questions`}
            className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ask a question
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
