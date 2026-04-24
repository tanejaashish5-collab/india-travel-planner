import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

type Severity = "typo" | "factual" | "score-impact" | "safety";

type Correction = {
  id: string;
  published_at: string;
  error_published_at: string;
  fixed_at: string;
  page_url: string;
  element: string | null;
  what_we_said: string;
  what_is_correct: string;
  source_url: string | null;
  source_description: string | null;
  severity: Severity;
  editor_slug: string | null;
  reporter_note: string | null;
};

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Corrections log — NakshIQ",
    description:
      "Every correction we've run on NakshIQ, in public. When we got something wrong, when we fixed it, and who signed off. Accountability is non-negotiable.",
    ...localeAlternates(locale, "/corrections"),
  };
}

async function getCorrections(): Promise<Correction[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("corrections")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(200);
  return (data ?? []) as Correction[];
}

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

function gapDays(from: string, to: string): number {
  const ms = new Date(to).getTime() - new Date(from).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

const SEVERITY_STYLE: Record<Severity, string> = {
  typo: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
  factual: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  "score-impact": "border-amber-500/30 bg-amber-500/10 text-amber-300",
  safety: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  typo: "typo",
  factual: "factual",
  "score-impact": "score impact",
  safety: "safety",
};

export default async function CorrectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const corrections = await getCorrections();
  const pageUrl = `${BASE_URL}/${locale}/corrections`;

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Corrections log — NakshIQ",
    description: "Public record of every correction made on NakshIQ, with fix timestamps and editor attribution.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Corrections", item: pageUrl },
    ],
  };

  const bySeverity = corrections.reduce<Record<Severity, number>>((acc, c) => {
    acc[c.severity] = (acc[c.severity] ?? 0) + 1;
    return acc;
  }, { typo: 0, factual: 0, "score-impact": 0, safety: 0 });

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
          {" → "}
          <span className="text-foreground">Corrections</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Corrections log</h1>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Every correction we've run, in public. When we got something wrong, when we fixed it,
          what the source was, and the editor who signed off. No quiet edits, no unpublished retractions.
        </p>

        <div className="rounded-2xl border border-border bg-card/40 p-5 mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
            How this works
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>
                Spot something wrong? Use the{" "}
                <Link href={`/${locale}/contact`} className="underline hover:text-primary">contact form</Link>{" "}
                or reply to any newsletter. We read every message.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>
                <strong className="text-foreground">Score-impact</strong> and <strong className="text-foreground">safety</strong>{" "}
                corrections are published within 24 hours of verification. Typos and factual minor edits: within a week.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>Every entry names the editor who signed off. See our{" "}
                <Link href={`/${locale}/about/team`} className="underline hover:text-primary">masthead</Link>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary text-xs">●</span>
              <span>The correction process lives in our{" "}
                <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">editorial policy</Link>.
              </span>
            </li>
          </ul>
        </div>

        {corrections.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">
              The log is empty today — but it's here, live, and the moment we run our first correction
              it lands on this page. Being ready to be wrong matters more than claiming we're always right.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2 text-xs">
              {(Object.keys(bySeverity) as Severity[]).filter((s) => bySeverity[s] > 0).map((s) => (
                <span key={s} className={`rounded-full border px-3 py-1 ${SEVERITY_STYLE[s]}`}>
                  {bySeverity[s]} {SEVERITY_LABEL[s]}
                </span>
              ))}
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{corrections.length} total</span>
            </div>

            <div className="space-y-5">
              {corrections.map((c) => {
                const liveGap = gapDays(c.error_published_at, c.fixed_at);
                return (
                  <article key={c.id} className="rounded-2xl border border-border bg-card/40 p-5">
                    <header className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${SEVERITY_STYLE[c.severity]}`}>
                          {SEVERITY_LABEL[c.severity]}
                        </span>
                        <a href={c.page_url} className="text-sm font-semibold hover:text-primary underline-offset-2 hover:underline">
                          {c.element ?? c.page_url.replace(BASE_URL, "")}
                        </a>
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        published {formatDate(c.published_at)}
                      </span>
                    </header>

                    <div className="grid gap-3 sm:grid-cols-2 mb-3">
                      <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                        <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-rose-300/70 mb-1">
                          What we said
                        </div>
                        <p className="text-sm text-rose-200/90 leading-relaxed">{c.what_we_said}</p>
                      </div>
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                        <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-300/70 mb-1">
                          What is correct
                        </div>
                        <p className="text-sm text-emerald-200/90 leading-relaxed">{c.what_is_correct}</p>
                      </div>
                    </div>

                    <dl className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3 mb-3">
                      <div>
                        <dt className="font-medium uppercase tracking-[0.08em]">Error lived</dt>
                        <dd>{liveGap} day{liveGap === 1 ? "" : "s"}</dd>
                      </div>
                      <div>
                        <dt className="font-medium uppercase tracking-[0.08em]">Fixed</dt>
                        <dd>{formatDate(c.fixed_at)}</dd>
                      </div>
                      <div>
                        <dt className="font-medium uppercase tracking-[0.08em]">Editor</dt>
                        <dd>
                          {c.editor_slug ? (
                            <Link href={`/${locale}/about/team#${c.editor_slug}`} className="underline hover:text-foreground">
                              {c.editor_slug}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </dd>
                      </div>
                    </dl>

                    {(c.source_url || c.source_description) && (
                      <div className="text-xs text-muted-foreground border-t border-border/50 pt-3">
                        <span className="font-medium uppercase tracking-[0.08em]">Source:</span>{" "}
                        {c.source_url ? (
                          <a href={c.source_url} className="underline hover:text-foreground" rel="nofollow noopener">
                            {c.source_description ?? c.source_url}
                          </a>
                        ) : (
                          c.source_description
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
