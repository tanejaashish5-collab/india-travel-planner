import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RegionDetail } from "@/components/region-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

const VALID_MONTHS = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december",
] as const;

const MONTH_NAMES: Record<string, string> = {
  january: "January", february: "February", march: "March",
  april: "April", may: "May", june: "June",
  july: "July", august: "August", september: "September",
  october: "October", november: "November", december: "December",
};

const MONTH_NUMBER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string; month: string }> }): Promise<Metadata> {
  const { locale, id, month } = await params;

  if (!VALID_MONTHS.includes(month as typeof VALID_MONTHS[number])) return {};

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};

  const supabase = createClient(url, key);
  const { data: region } = await supabase.from("regions").select("id, name, state_id").eq("id", id).single();
  if (!region) return {};

  const monthName = MONTH_NAMES[month];
  const monthNum = MONTH_NUMBER[month];

  const { count: score5Count } = await supabase
    .from("destination_months")
    .select("destination_id, destination:destinations!inner(state_id)", { count: "exact", head: true })
    .eq("month", monthNum)
    .eq("score", 5)
    .eq("destination.state_id", region.state_id);

  const year = new Date().getFullYear();
  const count = score5Count ?? 0;
  const destWord = count === 1 ? "destination" : "destinations";
  const pickWord = count === 1 ? "pick" : "picks";

  const titleLong = count > 0
    ? `Where to go in ${region.name} in ${monthName} ${year} — ${count} 5/5 ${pickWord}`
    : `Where to go in ${region.name} in ${monthName} ${year} — ranked by month`;
  const titleShort = count > 0
    ? `${region.name} in ${monthName} ${year}: ${count} 5/5 ${pickWord}`
    : `${region.name} in ${monthName} ${year}: ranked picks`;
  const title = titleLong.length <= 50 ? titleLong : titleShort;

  const description = count > 0
    ? `${count} ${destWord} in ${region.name} scored 5/5 for ${monthName} ${year}. Ranked by weather, crowds, road conditions — see what actually works this month before you commit.`
    : `Every destination in ${region.name} scored for ${monthName} ${year} on weather, crowds, road conditions. The honest pick if anywhere works this month — and what to skip.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/region/${id}/${month}`,
      languages: {
        en: `https://www.nakshiq.com/en/region/${id}/${month}`,
        hi: `https://www.nakshiq.com/hi/region/${id}/${month}`,
        "x-default": `https://www.nakshiq.com/en/region/${id}/${month}`,
      },
    },
  };
}

type DestRow = {
  id: string;
  destination_months?: { month: number; score: number }[] | null;
};

type RouteRow = {
  stops?: string[];
};

async function getRegionForMonth(id: string, monthNum: number) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const { data: region } = await supabase
    .from("regions")
    .select("*")
    .eq("id", id)
    .single();

  if (!region) return null;

  const { data: destinations } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, subregion, place_type,
      crowd_level, hiddenness, remoteness, infrastructure_score, tags, best_months,
      biker_suitable, compare_against,
      kids_friendly(suitable, rating),
      destination_months(month, score)
    `)
    .eq("state_id", region.state_id)
    .order("name");

  const destIds = (destinations ?? []).map((d: DestRow) => d.id);
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("id, name, near_destination_id, distance_km, why_go, difficulty, confidence_score, tags")
    .in("near_destination_id", destIds);

  const { data: routes } = await supabase
    .from("routes")
    .select("id, name, days, difficulty, kids_suitable, bike_route, stops")
    .order("days");

  const regionRoutes = (routes ?? []).filter((r: RouteRow) =>
    r.stops?.some((s: string) => destIds.includes(s))
  );

  const sortedDestinations = (destinations ?? []).sort((a: DestRow, b: DestRow) => {
    const aScore = a.destination_months?.find((dm) => dm.month === monthNum)?.score ?? 0;
    const bScore = b.destination_months?.find((dm) => dm.month === monthNum)?.score ?? 0;
    return bScore - aScore;
  });

  return {
    ...region,
    destinations: sortedDestinations,
    gems: gems ?? [],
    routes: regionRoutes,
  };
}

export default async function RegionMonthPage({
  params,
}: {
  params: Promise<{ locale: string; id: string; month: string }>;
}) {
  const { locale, id, month } = await params;

  if (!VALID_MONTHS.includes(month as typeof VALID_MONTHS[number])) notFound();

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const region = await getRegionForMonth(id, monthNum);
  if (!region) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "States", item: `https://www.nakshiq.com/${locale}/states` },
      { "@type": "ListItem", position: 3, name: region.name, item: `https://www.nakshiq.com/${locale}/region/${id}` },
      { "@type": "ListItem", position: 4, name: monthName, item: `https://www.nakshiq.com/${locale}/region/${id}/${month}` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
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
            REGION · {region.name?.toUpperCase()} · {monthName.toUpperCase()}
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
            {region.name} in {monthName}.
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
            Destinations sorted by {monthName} score — weather, crowds, road
            conditions for the month.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RegionDetail region={region} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
