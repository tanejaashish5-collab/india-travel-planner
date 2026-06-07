import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates, breadcrumbSchema, faqPageSchema, articleSchema } from "@/lib/seo-utils";
import {
  type PilgrimageRow,
  localizePilgrimage,
  formatMonths,
  formatKm,
  modeLabel,
  MONTH_NAMES_EN,
  MONTH_NAMES_HI,
} from "@/lib/pilgrimage-guide";
import { currentMonthSlugIST } from "@itp/shared";

export const revalidate = 604800; // 7d — yatra routing shifts slowly; /api/admin/revalidate covers edits.
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  return [];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getRoute(slug: string): Promise<PilgrimageRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("pilgrimage_routes")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as PilgrimageRow) ?? null;
}

function durationLabel(r: PilgrimageRow, isHindi: boolean): string | null {
  const { duration_days_min: lo, duration_days_max: hi } = r;
  if (!lo && !hi) return null;
  const days = isHindi ? "दिन" : lo === 1 && !hi ? "day" : "days";
  if (lo && hi && lo !== hi) return `${lo}–${hi} ${days}`;
  return `${lo ?? hi} ${days}`;
}

// The single headline metric — circuits lead with total km, parikramas with the
// loop length, step-shrines with the step count.
function headlineMetric(r: PilgrimageRow, isHindi: boolean): string | null {
  if (r.kind === "parikrama" && r.parikrama_km) return `${formatKm(r.parikrama_km, isHindi ? "hi" : "en")} ${isHindi ? "परिक्रमा" : "parikrama"}`;
  if (r.step_count) return `${r.step_count.toLocaleString("en-IN")} ${isHindi ? "सीढ़ियाँ" : "steps"}`;
  if (r.total_distance_km) return `${formatKm(r.total_distance_km, isHindi ? "hi" : "en")} ${isHindi ? "कुल" : "total"}`;
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const raw = await getRoute(slug);
  if (!raw) return {};
  const isHindi = locale === "hi";
  const r = localizePilgrimage(raw, locale);
  const metric = headlineMetric(r, isHindi);

  const title = isHindi
    ? `${r.name} — दूरी, मार्ग और योजना (2026) | NakshIQ`
    : `${r.name} — distances, route & planning (2026) | NakshIQ`;
  const description = isHindi
    ? `${r.name} की पूरी योजना — ${metric ? `${metric}, ` : ""}चरण-दर-चरण दूरियाँ, पहुँचने के तरीके (पैदल/घोड़ा/हेली), सबसे अच्छा समय और असली दिक्कतें। हर दूरी आधिकारिक स्रोत से सत्यापित।`
    : `Plan the ${r.name} — ${metric ? `${metric}, ` : ""}leg-by-leg distances, how pilgrims cover each stage (foot/pony/heli), the best window and the real gotchas. Every distance source-verified, not blog guesswork.`;

  return {
    title,
    description: description.slice(0, 200),
    ...localeAlternates(locale, `/pilgrimage/${slug}`),
    openGraph: {
      title,
      description,
      type: "article",
      url: `${BASE}/${locale}/pilgrimage/${slug}`,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PilgrimagePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const raw = await getRoute(slug);
  if (!raw) notFound();

  const isHindi = locale === "hi";
  const r = localizePilgrimage(raw, locale);
  const names = isHindi ? MONTH_NAMES_HI : MONTH_NAMES_EN;
  const monthSlug = currentMonthSlugIST();

  const openLabel = formatMonths(r.open_months, names, isHindi ? "पूरे साल" : "year-round");
  const bestLabel = formatMonths(r.best_months, names, "");
  const duration = durationLabel(r, isHindi);
  const metric = headlineMetric(r, isHindi);
  const pageUrl = `${BASE}/${locale}/pilgrimage/${slug}`;

  // FAQ built from the live row so the rich-snippet answer matches the page.
  const faq = (
    isHindi
      ? [
          metric && {
            question: `${r.name} कितनी लंबी है?`,
            answer: `${metric}${duration ? `, सामान्यतः ${duration} में पूरी होती है` : ""}। चरण-दर-चरण दूरियाँ ऊपर दी गई हैं।`,
          },
          bestLabel && { question: `${r.name} के लिए सबसे अच्छा समय?`, answer: `सबसे अच्छा समय ${bestLabel}।${openLabel ? ` मार्ग खुला रहता है: ${openLabel}।` : ""}` },
          r.access_modes.length > 0 && {
            question: `${r.name} कैसे तय करें?`,
            answer: r.access_modes.map((a) => `${a.mode}: ${a.detail}`).join(" "),
          },
        ]
      : [
          metric && {
            question: `How long is the ${r.name}?`,
            answer: `${metric}${duration ? `, typically done over ${duration}` : ""}. The leg-by-leg distances are listed above.`,
          },
          bestLabel && { question: `When is the best time for the ${r.name}?`, answer: `The best window is ${bestLabel}.${openLabel ? ` The route is open ${openLabel}.` : ""}` },
          r.access_modes.length > 0 && {
            question: `How do you cover the ${r.name}?`,
            answer: r.access_modes.map((a) => `${a.mode}: ${a.detail}`).join(" "),
          },
        ]
  ).filter(Boolean) as { question: string; answer: string }[];

  const breadcrumbLd = breadcrumbSchema(locale, [
    { name: isHindi ? "तीर्थयात्रा" : "Pilgrimage", path: `/pilgrimage` },
    { name: r.name, path: `/pilgrimage/${slug}` },
  ]);
  const faqLd = faqPageSchema({ locale, path: `/pilgrimage/${slug}`, qa: faq });
  const articleLd = articleSchema({
    locale,
    path: `/pilgrimage/${slug}`,
    headline: isHindi ? `${r.name} — मार्ग और दूरी गाइड` : `${r.name} — route & distance guide`,
    description: isHindi
      ? `${r.name} की चरण-दर-चरण दूरियाँ, पहुँचने के तरीके और योजना।`
      : `Leg-by-leg distances, access modes and planning for the ${r.name}.`,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Nav />

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {isHindi ? "तीर्थयात्रा मार्ग · 2026" : "Pilgrimage route · 2026"}
          {r.region ? ` · ${r.region}` : ""}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">{r.name}</h1>
        {r.summary && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{r.summary}</p>
        )}

        {/* At-a-glance facts */}
        <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-xl font-bold">{isHindi ? "एक नज़र में" : "At a glance"}</h2>
            {r.last_verified && (
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {isHindi ? "सत्यापित" : "Verified"} {r.last_verified}
              </span>
            )}
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <Fact label={isHindi ? "कुल दूरी" : metric && r.kind === "parikrama" ? "Parikrama" : "Distance"} value={metric} />
            <Fact label={isHindi ? "अवधि" : "Duration"} value={duration} />
            <Fact label={isHindi ? "आधार" : "Base"} value={r.base_town} />
            <Fact label={isHindi ? "सबसे अच्छा समय" : "Best window"} value={bestLabel} />
            {openLabel && <Fact label={isHindi ? "खुला रहता है" : "Open"} value={openLabel} />}
          </dl>
        </section>

        {/* Legs — the verified leg-by-leg distances (the moat) */}
        {r.legs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "चरण-दर-चरण दूरियाँ" : "Leg-by-leg distances"}</h2>
            <ol className="mt-4 space-y-3">
              {r.legs
                .slice()
                .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
                .map((leg, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-border p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                      {leg.seq ?? i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="font-semibold">
                          {leg.from} <span aria-hidden className="text-muted-foreground">→</span> {leg.to}
                        </span>
                        <span className="text-sm font-medium text-foreground/80">{formatKm(leg.distance_km, locale)}</span>
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">{modeLabel(leg.mode, locale)}</span>
                        {typeof leg.elevation_m === "number" && (
                          <span className="text-xs text-muted-foreground">{leg.elevation_m.toLocaleString("en-IN")} m</span>
                        )}
                      </div>
                      {leg.notes && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{leg.notes}</p>}
                    </div>
                  </li>
                ))}
            </ol>
          </section>
        )}

        {/* How pilgrims cover the hard legs */}
        {r.access_modes.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "पहुँचने के तरीके" : "How to cover it"}</h2>
            <ul className="mt-4 space-y-3">
              {r.access_modes.map((a, i) => (
                <li key={i} className="rounded-xl border border-border p-4">
                  <span className="font-semibold">{a.mode}</span>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Phased itinerary */}
        {r.stages.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "चरण" : "Stage by stage"}</h2>
            <ol className="mt-4 space-y-2.5">
              {r.stages.map((st, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground/80">{st.name}: </span>{st.detail}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {(r.crowd_note || r.cost_note) && (
          <section className="mt-10 grid gap-3 sm:grid-cols-2">
            {r.crowd_note && (
              <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{isHindi ? "भीड़" : "Crowds"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{r.crowd_note}</p>
              </div>
            )}
            {r.cost_note && (
              <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{isHindi ? "खर्च" : "Cost"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{r.cost_note}</p>
              </div>
            )}
          </section>
        )}

        {/* Pitfalls — the moat */}
        {r.pitfalls.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "किन बातों का ध्यान रखें" : "What trips pilgrims up"}</h2>
            <ul className="mt-4 space-y-3">
              {r.pitfalls.map((p, i) => (
                <li key={i} className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="flex items-start gap-2 font-semibold">
                    <span aria-hidden="true" className="text-amber-400">⚠</span>
                    {p.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Common questions"}</h2>
            <dl className="mt-4 divide-y divide-border">
              {faq.map((q) => (
                <div key={q.question} className="py-4">
                  <dt className="font-semibold">{q.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{q.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Sources — the verifiability that is the whole point */}
        {r.sources.length > 0 && (
          <section className="mt-10 border-t border-border pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{isHindi ? "स्रोत" : "Sources"}</h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {r.sources.map((src, i) => (
                <li key={i}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline underline-offset-2 hover:text-foreground">
                    {src.label} →
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Internal links */}
        <nav className="mt-12 flex flex-wrap gap-2.5 border-t border-border pt-6 text-sm">
          <RelatedLink href={`/${locale}/pilgrimage`}>{isHindi ? "सभी तीर्थयात्रा मार्ग" : "All pilgrimage routes"}</RelatedLink>
          {r.destination_id && (
            <RelatedLink href={`/${locale}/destination/${r.destination_id}`}>
              {isHindi ? `${r.name} गाइड` : `${r.name} guide`}
            </RelatedLink>
          )}
          {r.destination_id && (
            <RelatedLink href={`/${locale}/destination/${r.destination_id}/${monthSlug}`}>
              {isHindi ? "इस महीने" : "This month"}
            </RelatedLink>
          )}
          <RelatedLink href={`/${locale}/where-to-go/${monthSlug}`}>{isHindi ? "इस महीने कहाँ जाएँ" : "Where to go now"}</RelatedLink>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}

function RelatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full border border-border px-4 py-2 font-medium transition-colors hover:border-foreground/40 hover:bg-muted/40">
      {children} →
    </Link>
  );
}
