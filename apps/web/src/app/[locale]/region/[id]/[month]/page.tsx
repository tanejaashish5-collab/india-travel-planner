import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RegionDetail } from "@/components/region-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

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

  if (!VALID_MONTHS.includes(month as any)) return {};

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};

  const supabase = createClient(url, key);
  const { data: region } = await supabase.from("regions").select("id, name").eq("id", id).single();
  if (!region) return {};

  const monthName = MONTH_NAMES[month];
  const monthNum = MONTH_NUMBER[month];

  // Count score-5 destinations for this region + month
  const { count: score5Count } = await supabase
    .from("destination_months")
    .select("destination_id", { count: "exact", head: true })
    .eq("month", monthNum)
    .eq("score", 5);

  return {
    title: `${region.name} in ${monthName}: Best Destinations Ranked | NakshIQ`,
    description: `${score5Count ?? 0} destinations in ${region.name} score 5/5 in ${monthName}. Ranked by weather, crowds, and road conditions. Data-backed travel intelligence.`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/region/${id}/${month}`,
      languages: {
        en: `https://www.nakshiq.com/en/region/${id}/${month}`,
        hi: `https://www.nakshiq.com/hi/region/${id}/${month}`,
      },
    },
  };
}

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

  const destIds = (destinations ?? []).map((d: any) => d.id);
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("id, name, near_destination_id, distance_km, why_go, difficulty, confidence_score, tags")
    .in("near_destination_id", destIds);

  const { data: routes } = await supabase
    .from("routes")
    .select("id, name, days, difficulty, kids_suitable, bike_route, stops")
    .order("days");

  const regionRoutes = (routes ?? []).filter((r: any) =>
    r.stops?.some((s: string) => destIds.includes(s))
  );

  // Sort destinations by the target month's score (descending)
  const sortedDestinations = (destinations ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === monthNum)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === monthNum)?.score ?? 0;
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
  params: Promise<{ id: string; month: string }>;
}) {
  const { id, month } = await params;

  if (!VALID_MONTHS.includes(month as any)) notFound();

  const monthNum = MONTH_NUMBER[month];
  const region = await getRegionForMonth(id, monthNum);
  if (!region) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <RegionDetail region={region} />
      </main>
      <Footer />
    </div>
  );
}
