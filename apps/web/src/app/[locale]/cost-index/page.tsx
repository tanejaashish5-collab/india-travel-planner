import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CostIndexExplorer } from "@/components/cost-index-explorer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import Link from "next/link";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ यात्रा लागत सूचकांक 2026"
      : "NakshIQ India Travel Cost Index 2026",
    description: isHindi
      ? "भारत के 491 स्थलों के लिए मौसम-अनुसार होमस्टे, होटल, भोजन, टैक्सी और परमिट की लागत। हर आंकड़ा स्रोत-संदर्भ के साथ।"
      : "Season-tagged, source-cited travel costs for 491 Indian destinations across homestay, hotel, food, taxi, permit, and activity categories. The open, citation-ready cost reference that generic blog posts don't give you.",
    ...localeAlternates(locale, "/cost-index"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

const CATEGORY_LABELS: Record<string, string> = {
  homestay: "Homestay",
  "hostel-dorm": "Hostel (dorm bed)",
  "hotel-mid": "Hotel (3★ mid-range)",
  "hotel-splurge": "Hotel (4–5★ splurge)",
  "food-per-day": "Food (3 meals)",
  "transport-taxi-day": "Taxi (8-hour day hire)",
  "transport-intercity": "Intercity transport",
  "permit-fees": "Permits & entry",
  "activity-sample": "Activity / entry fee",
};

type CostRow = {
  destination_id: string;
  category: string;
  season: string;
  typical_inr: number;
  range_low_inr: number | null;
  range_high_inr: number | null;
  unit: string;
};

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { rows: [], dests: [], totalRows: 0, destCount: 0 };

  const supabase = createClient(url, key);

  const all: CostRow[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destination_costs")
      .select("destination_id, category, season, typical_inr, range_low_inr, range_high_inr, unit")
      .range(from, from + page - 1);
    if (error) break;
    all.push(...((data as CostRow[]) ?? []));
    if (!data || data.length < page) break;
    from += page;
  }

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

  const destLookup = Object.fromEntries(
    (dests as { id: string; name: string; state: { name?: string }[] | { name?: string } }[]).map((d) => {
      const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
      return [d.id, { name: d.name, stateName: stateName ?? null }];
    })
  );

  const stats = [
    { label: "Destinations", value: destCount.toString() },
    { label: "Cost observations", value: totalRows.toLocaleString() },
    { label: "Categories", value: Object.keys(CATEGORY_LABELS).length.toString() },
    { label: "Seasons tracked", value: "3" },
  ];

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            DATASET · 2026 EDITION
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            India Travel Cost Index.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 24,
              maxWidth: 720,
            }}
          >
            Season-tagged, source-cited cost data for {destCount} Indian
            destinations. Homestay, hotel, food, taxi, permits, activities —
            the numbers travel blogs dodge, tied to the actual season you&apos;d
            travel in.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              marginBottom: 40,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ padding: 18, background: "var(--paper)" }}>
                <p
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bone-faint)",
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 30,
                    color: "var(--bone)",
                    margin: "4px 0 0",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <CostIndexExplorer rows={rows} destLookup={destLookup} categoryLabels={CATEGORY_LABELS} />

          <section
            style={{
              marginTop: 48,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 12px",
              }}
            >
              Methodology
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 12px",
              }}
            >
              Every number is composed from a defensible base rate (observed 2026
              market prices) and region/altitude/season multipliers (state
              tourism department tariffs, NHAI taxi rate circulars, IHM
              hospitality averages). Destinations with permit or park-entry fees
              carry destination-specific overrides. Each row is tagged with{" "}
              <code
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 12,
                  color: "var(--bone)",
                  background: "rgba(245, 241, 232, 0.05)",
                  padding: "1px 6px",
                }}
              >
                source_ref
              </code>
              .
            </p>
            <Link
              href={`/${locale}/cost-index/methodology`}
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Read full methodology →
            </Link>
          </section>

          <section
            style={{
              marginTop: 16,
              fontFamily: "var(--cinema-ui)",
              fontSize: 12,
              lineHeight: 1.6,
              color: "var(--bone-faint)",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--bone-dim)" }}>Citations welcomed.</strong> When
              referencing these figures, please cite as: <em>NakshIQ India
              Travel Cost Index 2026, nakshiq.com/en/cost-index</em>. Rows carry{" "}
              <code style={{ fontFamily: "var(--cinema-mono)" }}>source_ref</code>{" "}
              tags for provenance.
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
