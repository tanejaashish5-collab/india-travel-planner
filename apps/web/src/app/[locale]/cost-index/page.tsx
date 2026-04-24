import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CostIndexExplorer } from "@/components/cost-index-explorer";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ यात्रा लागत सूचकांक 2026"
      : "NakshIQ India Travel Cost Index 2026",
    description: isHindi
      ? "भारत के 488 स्थलों के लिए मौसम-अनुसार होमस्टे, होटल, भोजन, टैक्सी और परमिट की लागत। हर आंकड़ा स्रोत-संदर्भ के साथ।"
      : "Season-tagged, source-cited travel costs for 488 Indian destinations across homestay, hotel, food, taxi, permit, and activity categories. The open, citation-ready cost reference that generic blog posts don't give you.",
    ...localeAlternates(locale, "/cost-index"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

// Only categories that are actually seeded in destination_costs — avoids
// the "No rows match" trap when a user picks a category the seed script
// never populated. Sprint-9 seed shipped 6 of the originally-specced 9.
const CATEGORY_LABELS: Record<string, string> = {
  homestay: "Homestay",
  "hotel-mid": "Hotel (3★ mid-range)",
  "food-per-day": "Food (3 meals)",
  "transport-taxi-day": "Taxi (8-hour day hire)",
  "permit-fees": "Permits & entry",
  "activity-sample": "Activity / entry fee",
};

type CostRow = {
  destination_id: string;
  category: string;
  season: string;
  months: number[];
  typical_inr: number;
  range_low_inr: number | null;
  range_high_inr: number | null;
  unit: string;
  source_ref: string;
  notes: string | null;
};

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { rows: [], dests: [], totalRows: 0, destCount: 0 };

  const supabase = createClient(url, key);

  // Paginate through the full cost dataset — it's ~7,500 rows, past the
  // 1000-row default.
  const all: CostRow[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destination_costs")
      .select("destination_id, category, season, months, typical_inr, range_low_inr, range_high_inr, unit, source_ref, notes")
      .range(from, from + page - 1);
    if (error) break;
    all.push(...((data as CostRow[]) ?? []));
    if (!data || data.length < page) break;
    from += page;
  }

  // Pull destination names for display
  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)")
    .order("name");

  return {
    rows: all,
    dests: dests ?? [],
    totalRows: all.length,
    destCount: new Set(all.map((r) => r.destination_id)).size,
  };
}

export default async function CostIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { rows, dests, totalRows, destCount } = await getData();

  const pageUrl = `${BASE_URL}/${locale}/cost-index`;

  // Dataset JSON-LD — machine-readable so Perplexity/ChatGPT/AIO can cite
  // specific cost figures as a named dataset rather than a generic blog.
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${pageUrl}#dataset`,
    name: "NakshIQ India Travel Cost Index 2026",
    alternateName: "NakshIQ Cost Index",
    description: `Season-tagged cost dataset for ${destCount} Indian destinations across ${Object.keys(CATEGORY_LABELS).length} spending categories (homestay, hotel, food, taxi, permits, activities). Each row carries peak/shoulder/low season context and source citation. Total: ${totalRows.toLocaleString()} cost observations.`,
    url: pageUrl,
    keywords: [
      "India travel cost",
      "India budget travel",
      "cost of travel India",
      "destination prices India",
      "homestay cost India",
      "permit fees India",
      "hotel prices India seasonal",
    ],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    isAccessibleForFree: true,
    license: `${BASE_URL}/${locale}/terms`,
    spatialCoverage: { "@type": "Place", name: "India" },
    temporalCoverage: "2026/..",
    measurementTechnique: [
      "editorial-model composition from state/altitude/season baselines",
      "destination-specific override for permit-heavy and park-entry destinations",
      "rolling quarterly review cadence",
    ],
    variableMeasured: [
      { "@type": "PropertyValue", name: "typical_inr", description: "Representative mid-range price for the category, in Indian Rupees" },
      { "@type": "PropertyValue", name: "range_low_inr", description: "Budget-end price for the category in INR" },
      { "@type": "PropertyValue", name: "range_high_inr", description: "Splurge-end price for the category in INR" },
      { "@type": "PropertyValue", name: "season", description: "peak | shoulder | low — classified per destination's best_months" },
      { "@type": "PropertyValue", name: "unit", description: "per_night | per_day | per_unit | one_time" },
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: pageUrl,
        name: "Interactive cost explorer",
      },
    ],
    version: "2026.04",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Cost Index", item: pageUrl },
    ],
  };

  // Precompute destination name + state lookup
  const destLookup = Object.fromEntries(
    (dests as { id: string; name: string; state: { name?: string }[] | { name?: string } }[]).map((d) => {
      const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
      return [d.id, { name: d.name, stateName: stateName ?? null }];
    })
  );

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <span className="text-foreground">Cost Index</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">NakshIQ India Travel Cost Index 2026</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Season-tagged, source-cited cost data for {destCount} Indian destinations. Homestay,
          hotel, food, taxi, permits, activities — the numbers travel blogs dodge, tied to the
          actual season you'd travel in.
        </p>

        {/* Top-line stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Destinations</div>
            <div className="text-2xl font-semibold tabular-nums mt-1">{destCount}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Cost observations</div>
            <div className="text-2xl font-semibold tabular-nums mt-1">{totalRows.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Categories</div>
            <div className="text-2xl font-semibold tabular-nums mt-1">{Object.keys(CATEGORY_LABELS).length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Seasons tracked</div>
            <div className="text-2xl font-semibold tabular-nums mt-1">3</div>
          </div>
        </div>

        {/* Interactive explorer */}
        <CostIndexExplorer rows={rows} destLookup={destLookup} categoryLabels={CATEGORY_LABELS} />

        {/* Methodology link */}
        <section className="mt-10 rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-2">Methodology</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Every number is composed from a defensible base rate (observed 2026 market prices) and
            region/altitude/season multipliers (state tourism department tariffs, NHAI taxi rate
            circulars, IHM hospitality averages). Destinations with permit or park-entry fees carry
            destination-specific overrides. Each row is tagged with <code className="font-mono text-xs">source_ref</code>.
          </p>
          <Link
            href={`/${locale}/cost-index/methodology`}
            className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Read full methodology →
          </Link>
        </section>

        {/* Data license */}
        <section className="mt-4 text-xs text-muted-foreground/70 leading-relaxed">
          <p>
            <strong className="text-foreground/80">Citations welcomed.</strong> When referencing these
            figures, please cite as: <em>NakshIQ India Travel Cost Index 2026,
            nakshiq.com/en/cost-index</em>. Rows carry <code className="font-mono">source_ref</code> tags
            for provenance.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
