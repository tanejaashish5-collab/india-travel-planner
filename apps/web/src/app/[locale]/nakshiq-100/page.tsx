import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ 100 — 2026 के भारत के सर्वश्रेष्ठ यात्रा महीने"
      : "NakshIQ 100 — India's 100 best destination-months, 2026",
    description: isHindi
      ? "भारत के 5,856 स्थल × महीना संयोजनों में से शीर्ष 100 — मौसम, पहुँच, भीड़ और सुरक्षा पर आधारित। प्रत्येक वर्ष अद्यतन।"
      : "The 100 highest-scored destination × month combinations for India, ranked across weather, access, crowd, and safety. Drawn from 5,856 scored rows across 488 destinations. An annual index.",
    ...localeAlternates(locale, "/nakshiq-100"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SLUGS = [
  "", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

type ScoredRow = {
  destination_id: string;
  month: number;
  score: number;
  verdict: string;
  why_go: string;
  destinations: {
    name: string;
    state: { name: string } | { name: string }[] | null;
  } | null;
};

async function getTop100() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { rows: [] as ScoredRow[], totalRows: 0 };

  const supabase = createClient(url, key);

  // Top 100 destination-month rows by score, where verdict = 'go' and prose
  // exists. Paginates past 1000 if needed.
  const all: ScoredRow[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destination_months")
      .select(`
        destination_id, month, score, verdict, why_go,
        destinations!inner(name, state:states(name))
      `)
      .eq("verdict", "go")
      .order("score", { ascending: false })
      .range(from, from + page - 1);
    if (error) break;
    all.push(...((data as unknown as ScoredRow[]) ?? []));
    if (!data || data.length < page || all.length >= 200) break;
    from += page;
  }

  // De-duplicate by destination — keep only the highest-scored month for each
  const byDest = new Map<string, ScoredRow>();
  for (const r of all) {
    const existing = byDest.get(r.destination_id);
    if (!existing || r.score > existing.score) byDest.set(r.destination_id, r);
  }
  const deduped = Array.from(byDest.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  return { rows: deduped, totalRows: all.length };
}

export default async function NakshIQ100Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { rows } = await getTop100();

  const pageUrl = `${BASE_URL}/${locale}/nakshiq-100`;

  // ItemList schema — the canonical ranked 100
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#top100`,
    name: "NakshIQ 100 — India's best destination-months, 2026",
    description: "The 100 highest-scored destination × month combinations across all of India, ranked across weather, access, crowd, and safety.",
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rows.map((r, idx) => {
      const destUrl = `${BASE_URL}/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`;
      const destName = r.destinations?.name ?? r.destination_id;
      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristDestination",
          name: `${destName} in ${MONTH_NAMES[r.month]}`,
          url: destUrl,
          description: (r.why_go || "").slice(0, 280),
        },
      };
    }),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "NakshIQ 100 — India's 100 best destination-months, 2026",
    description:
      "An annual ranked index of India's 100 highest-scored destination × month combinations, drawn from 5,856 scored rows across 488 destinations.",
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    isPartOf: { "@id": `${BASE_URL}#website` },
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    dateModified: new Date().toISOString(),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "NakshIQ 100", item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <span className="text-foreground">NakshIQ 100</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">
          NakshIQ 100 — India's 100 best destination-months, 2026
        </h1>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-3xl">
          The 100 highest-scored destination × month combinations across all of India, ranked
          across weather, access, crowd, and safety. Drawn from 5,856 scored rows across 488
          destinations — one ranked pick per destination, top 100 by score.
        </p>
        <p className="text-sm text-muted-foreground/80 mb-10 max-w-3xl leading-relaxed">
          An annual index. This edition reflects 2026 editorial review as of{" "}
          {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
        </p>

        {/* Top 10 hero rail */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Top 10</h2>
          <div className="space-y-3">
            {rows.slice(0, 10).map((r, i) => {
              const stateData = r.destinations?.state;
              const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;
              return (
                <Link
                  key={`${r.destination_id}-${r.month}`}
                  href={`/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`}
                  className="block rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 font-mono text-3xl font-bold tabular-nums text-primary/80 w-12">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          {r.destinations?.name} in {MONTH_NAMES[r.month]}
                        </h3>
                        <span className="font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground">
                          {stateName} · {r.score}/10
                        </span>
                      </div>
                      {r.why_go && (
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                          {r.why_go}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* The rest — compact numbered table */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">11–100</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-card/40">
                <tr>
                  <th className="px-4 py-3 text-left w-14 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">#</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Destination</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70 hidden sm:table-cell">State</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Best month</th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(10).map((r, i) => {
                  const stateData = r.destinations?.state;
                  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;
                  return (
                    <tr key={`${r.destination_id}-${r.month}`} className="border-b border-border/50 last:border-0 hover:bg-card/30 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-sm text-muted-foreground tabular-nums">{i + 11}</td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {r.destinations?.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{stateName ?? "—"}</td>
                      <td className="px-4 py-2.5 text-sm">{MONTH_NAMES[r.month]}</td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-sm">{r.score}/10</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Context */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">How the 100 is chosen</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Every destination × month pair in the NakshIQ database carries a 0–10 suitability
            score combining weather (IMD data), access (road/pass/flight status), crowd math,
            local festival calendars, and risk flags. The NakshIQ 100 takes the single best
            month for each destination, ranks across all 488 destinations, and publishes the
            top 100. One destination never appears twice; the ranking is the destination at
            its best, not a month-by-month scan.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See <Link href={`/${locale}/methodology`} className="underline hover:text-primary">how we score</Link> for the
            full rubric. An updated edition is published annually.
          </p>
        </section>

        {/* Embed badge — for tourism boards + destination operators whose
            marquee month is on the list. The image link is the canonical
            artefact; the rel="noopener" + the entire <a> wrapping makes the
            attribution requirement explicit at the markup level. */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Embed the badge</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            For tourism boards, destination operators, and editors whose region appears on
            this list — embed the NakshIQ 100 badge on your site. Free to use, attribution
            required (the snippet handles it).
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <img
              src="/badges/nakshiq-100.svg"
              alt="Featured in NakshIQ 100 — 2026 Annual Index"
              width={240}
              height={80}
              className="rounded-md border border-border/50"
            />
            <a
              href="/badges/nakshiq-100.svg"
              download
              className="text-xs uppercase tracking-[0.16em] text-primary hover:underline"
            >
              Download SVG ↓
            </a>
          </div>
          <pre className="bg-background/50 border border-border/50 rounded-lg p-3 text-[11px] font-mono overflow-x-auto leading-relaxed">{`<a href="https://www.nakshiq.com/${locale}/nakshiq-100" rel="noopener" target="_blank">
  <img src="https://www.nakshiq.com/badges/nakshiq-100.svg"
       alt="Featured in NakshIQ 100 — 2026 Annual Index"
       width="240" height="80" />
</a>`}</pre>
          <p className="text-xs text-muted-foreground/70 mt-3 leading-relaxed">
            The badge links back to this page. We re-issue annually; the file URL stays
            stable. Editorial badges are unconditional — no fee, no agreement required.
          </p>
        </section>

        {/* Citation + press */}
        <section className="text-xs text-muted-foreground/70 leading-relaxed">
          <p className="mb-1">
            <strong className="text-foreground/80">Citations welcomed.</strong> Cite as:{" "}
            <em>NakshIQ 100 — India's best destination-months, 2026. nakshiq.com/en/nakshiq-100</em>.
          </p>
          <p>
            Press &amp; research queries: <Link href={`/${locale}/contact`} className="underline hover:text-foreground">editor@nakshiq.com</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
