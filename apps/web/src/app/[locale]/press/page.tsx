import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Press & research — NakshIQ",
    description:
      "Citable datasets on India travel: the NakshIQ Cost Index (7,000+ verified cost rows across 488 destinations), month-by-month scoring on 5,856 destination-months, and the Tourist Trap Atlas. Attribution, methodology, and a direct line to the newsroom.",
    ...localeAlternates(locale, "/press"),
  };
}

async function getCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { rows: 7449, destinations: 488, goCount: 2720, skipCount: 1893, waitCount: 1058, totalDm: 5856, traps: 109 };
  }
  const supabase = createClient(url, key);
  const [costs, goCnt, skipCnt, waitCnt, totalDm, traps] = await Promise.all([
    supabase.from("destination_costs").select("id", { count: "exact", head: true }),
    supabase.from("destination_months").select("id", { count: "exact", head: true }).eq("verdict", "go"),
    supabase.from("destination_months").select("id", { count: "exact", head: true }).eq("verdict", "skip"),
    supabase.from("destination_months").select("id", { count: "exact", head: true }).eq("verdict", "wait"),
    supabase.from("destination_months").select("id", { count: "exact", head: true }),
    supabase.from("tourist_trap_alternatives").select("id", { count: "exact", head: true }),
  ]);
  return {
    rows: costs.count ?? 7449,
    destinations: 488,
    goCount: goCnt.count ?? 2720,
    skipCount: skipCnt.count ?? 1893,
    waitCount: waitCnt.count ?? 1058,
    totalDm: totalDm.count ?? 5856,
    traps: traps.count ?? 109,
  };
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const counts = await getCounts();
  const pageUrl = `${BASE_URL}/${locale}/press`;

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Press & research — NakshIQ",
    description:
      "Citable datasets on India travel: Cost Index, monthly scoring, tourist trap alternatives, and trip reports.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
  };

  const costIndexDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/cost-index#dataset`,
    name: "NakshIQ Cost Index 2026",
    description: `${counts.rows.toLocaleString()} verified cost data points across ${counts.destinations} Indian destinations — homestay, hotel, transport, food, permit, and activity costs for every major tier from budget to luxury, surfaced by season.`,
    url: `${BASE_URL}/${locale}/cost-index`,
    keywords: ["India travel costs", "homestay prices India", "travel budget India", "NakshIQ Cost Index"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    variableMeasured: [
      "typical_inr",
      "range_low_inr",
      "range_high_inr",
      "budget_tier",
      "season",
      "category",
    ],
    spatialCoverage: { "@type": "Place", name: "India" },
    temporalCoverage: "2026-01/..",
  };

  const scoringDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/methodology#scoring-dataset`,
    name: "NakshIQ Monthly Scoring Matrix",
    description: `${counts.totalDm.toLocaleString()} destination-month scores across ${counts.destinations} Indian destinations — weather suitability, infrastructure, crowd level, safety, and a verdict band (GO / WAIT / SKIP).`,
    url: `${BASE_URL}/${locale}/methodology`,
    keywords: ["India destination scores", "best time to visit India", "NakshIQ verdict", "month scoring India"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    variableMeasured: ["score", "verdict", "prose_lead", "who_should_go", "who_should_avoid"],
    spatialCoverage: { "@type": "Place", name: "India" },
  };

  const trapsDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/tourist-traps#dataset`,
    name: "NakshIQ Tourist Trap Atlas",
    description: `${counts.traps} popular Indian destinations NakshIQ scores as overrated, each paired with a verified alternative within driving distance and a sourced explanation of the difference.`,
    url: `${BASE_URL}/${locale}/tourist-traps`,
    keywords: ["tourist traps India", "overrated destinations India", "India travel alternatives"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Press", item: pageUrl },
    ],
  };

  const citeApa = `NakshIQ. (2026). NakshIQ Cost Index 2026 [Data set]. NakshIQ. ${BASE_URL}/${locale}/cost-index`;
  const citeMla = `NakshIQ. "NakshIQ Cost Index 2026." NakshIQ, 2026, ${BASE_URL}/${locale}/cost-index. Dataset.`;
  const citeInline = `Source: NakshIQ Cost Index 2026 (${BASE_URL}/${locale}/cost-index)`;

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(costIndexDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scoringDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trapsDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
          {" → "}
          <span className="text-foreground">Press & research</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Press & research</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          NakshIQ scores, costs, and verdicts on India travel are built to be cited. Journalists, researchers,
          and travel operators use this data every week. Here's what's available, how to cite it, and where to
          reach us.
        </p>

        {/* Stats strip */}
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            The NakshIQ dataset — at a glance
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div>
              <div className="text-3xl font-mono font-bold text-primary">{counts.destinations}</div>
              <div className="text-xs text-muted-foreground mt-1">destinations scored</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-primary">{counts.totalDm.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">destination-months rated</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-primary">{counts.rows.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Cost Index rows</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-primary">{counts.traps}</div>
              <div className="text-xs text-muted-foreground mt-1">tourist traps with alternatives</div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> {counts.goCount.toLocaleString()} GO verdicts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> {counts.waitCount.toLocaleString()} WAIT verdicts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400" /> {counts.skipCount.toLocaleString()} SKIP verdicts
            </span>
          </div>
        </section>

        {/* Key datasets */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Datasets</h2>
          <div className="space-y-5">
            {/* Cost Index */}
            <article className="rounded-2xl border border-border bg-card/40 p-6">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h3 className="text-xl font-semibold">NakshIQ Cost Index 2026</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {counts.rows.toLocaleString()} verified cost data points — homestay, hotel, food, transport,
                    permit, and activity rates across {counts.destinations} destinations and three seasonal bands.
                  </p>
                </div>
                <Link
                  href={`/${locale}/cost-index`}
                  className="shrink-0 rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Explore →
                </Link>
              </header>
              <dl className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3 border-t border-border/50 pt-3">
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Coverage</dt>
                  <dd>All India, 6 categories</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Update cadence</dt>
                  <dd>Quarterly (next: July 2026)</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">License</dt>
                  <dd>CC BY 4.0</dd>
                </div>
              </dl>
              <div className="mt-3 text-xs">
                <Link href={`/${locale}/cost-index/methodology`} className="text-primary hover:underline">
                  Methodology & derivation →
                </Link>
              </div>
            </article>

            {/* Scoring */}
            <article className="rounded-2xl border border-border bg-card/40 p-6">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Monthly Scoring Matrix</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {counts.totalDm.toLocaleString()} destination-month scores — weather, crowds, infrastructure,
                    safety — with a verdict band (GO / WAIT / SKIP) for every combination of destination and calendar month.
                  </p>
                </div>
                <Link
                  href={`/${locale}/methodology`}
                  className="shrink-0 rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Methodology →
                </Link>
              </header>
              <dl className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3 border-t border-border/50 pt-3">
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Verdicts</dt>
                  <dd>{counts.goCount.toLocaleString()} GO / {counts.waitCount.toLocaleString()} WAIT / {counts.skipCount.toLocaleString()} SKIP</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Granularity</dt>
                  <dd>Destination × month</dd>
                </div>
                <div>
                  <dt className="font-medium uppercase tracking-[0.08em]">Refresh</dt>
                  <dd>Monthly on the 1st (IST)</dd>
                </div>
              </dl>
            </article>

            {/* Tourist traps */}
            <article className="rounded-2xl border border-border bg-card/40 p-6">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h3 className="text-xl font-semibold">Tourist Trap Atlas</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {counts.traps} popular Indian destinations NakshIQ scores as overrated, each paired with a
                    verified alternative within driving distance and a sourced explanation of why.
                  </p>
                </div>
                <Link
                  href={`/${locale}/tourist-traps`}
                  className="shrink-0 rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Atlas →
                </Link>
              </header>
            </article>
          </div>
        </section>

        {/* Citation */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">How to cite NakshIQ</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            NakshIQ data is CC BY 4.0 — free to use, remix, and republish with attribution. Please link back to
            the source page so readers can verify the current version.
          </p>
          <div className="space-y-3">
            <CiteBlock label="Inline / caption" text={citeInline} />
            <CiteBlock label="APA 7" text={citeApa} />
            <CiteBlock label="MLA 9" text={citeMla} />
          </div>
        </section>

        {/* Press contact */}
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Press contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            For interviews, commissioned research, or custom data pulls for a feature, reach out directly.
            We respond to editorial queries within one business day.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-primary px-5 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact newsroom
            </Link>
            <Link
              href={`/${locale}/about/team`}
              className="rounded-full border border-border px-5 py-2 hover:border-primary/50 transition-colors"
            >
              Masthead →
            </Link>
            <Link
              href={`/${locale}/corrections`}
              className="rounded-full border border-border px-5 py-2 hover:border-primary/50 transition-colors"
            >
              Corrections log →
            </Link>
          </div>
        </section>

        {/* Editorial independence */}
        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-2">Editorial independence</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            NakshIQ accepts no paid placements, no sponsored content, and no tourism board promotion packages.
            Scoring and cost data are built independently of any commercial relationship with a destination,
            operator, or partner. See our{" "}
            <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">editorial policy</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CiteBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
        {label}
      </div>
      <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono leading-relaxed">
        {text}
      </pre>
    </div>
  );
}
