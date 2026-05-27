import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import Link from "next/link";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

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
    title: `${q.question.slice(0, 80)} — ${destName}`,
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
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 40px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {stateName ? `${stateName.toUpperCase()} · ` : ""}{destName.toUpperCase()} · Q&amp;A · {categoryLabel.toUpperCase()}
            {q.traveler_type ? ` · ${q.traveler_type.toUpperCase()}` : ""}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(32px, 5.5vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {q.question}
          </h1>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/destination/${id}`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← Back to {destName}
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <article
            style={{
              padding: "32px 0",
              borderTop: "1px solid var(--hair)",
              borderBottom: "1px solid var(--hair)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 16,
                lineHeight: 1.75,
                color: "var(--bone)",
                whiteSpace: "pre-wrap",
              }}
            >
              {q.answer}
            </div>
          </article>

          <div
            style={{
              marginTop: 20,
              padding: "14px 16px",
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.03)",
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
            }}
          >
            {editor ? (
              <p style={{ margin: 0 }}>
                Answered by{" "}
                <Link
                  href={`/${locale}/about/team`}
                  style={{ color: "var(--bone-dim)", textDecoration: "underline" }}
                >
                  {editor.name}
                </Link>
                {" · "}
                {answeredOn}
              </p>
            ) : (
              <p style={{ margin: 0 }}>Answered {answeredOn}</p>
            )}
          </div>

          {related.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 20,
                  letterSpacing: "0.22em",
                }}
              >
                MORE QUESTIONS · {destName.toUpperCase()}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/${locale}/destination/${id}/q/${r.slug}`}
                      style={{
                        display: "block",
                        padding: "16px 18px",
                        border: "1px solid var(--hair)",
                        background: "rgba(245, 241, 232, 0.02)",
                        textDecoration: "none",
                        color: "var(--bone)",
                      }}
                    >
                      <span
                        className="nq-mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          marginRight: 10,
                        }}
                      >
                        {CATEGORY_LABEL[r.category] ?? r.category}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 400,
                          fontSize: 17,
                          color: "var(--bone)",
                        }}
                      >
                        {r.question}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            style={{
              marginTop: 56,
              padding: 32,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.3,
                color: "var(--bone)",
                margin: "0 0 16px",
              }}
            >
              Got a different question about {destName}?
            </p>
            <Link
              href={`/${locale}/destination/${id}#section-questions`}
              className="nq-mono"
              style={{
                display: "inline-block",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "12px 22px",
                background: "var(--vermillion)",
                color: "var(--paper)",
                textDecoration: "none",
              }}
            >
              Ask a question →
            </Link>
          </section>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
