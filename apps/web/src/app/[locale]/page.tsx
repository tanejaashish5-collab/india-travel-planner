import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import { createClient } from "@supabase/supabase-js";
import { getAppStats } from "@/lib/stats";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}`,
      languages: {
        en: "https://www.nakshiq.com/en",
        hi: "https://www.nakshiq.com/hi",
      },
    },
  };
}

async function getFeaturedData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], collections: [], routes: [], festivals: [], mapPins: [] as any[], stats: { places: 0, destinations: 0, states: 0, routes: 0, festivals: 0, collections: 0, treks: 0, traps: 0, permits: 0, campingSpots: 0 } };

  const supabase = createClient(url, key);
  const currentMonth = new Date().getMonth() + 1;

  const [destResult, collResult, routeResult, destCount, subCount, gemCount, stateCount, routeCount, festResult, coordsResult, allMonthScores, allDestsResult] = await Promise.all([
    supabase
      .from("destination_months")
      .select("destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))")
      .eq("month", currentMonth)
      .gte("score", 4)
      .order("score", { ascending: false })
      .limit(6),
    supabase.from("collections").select("id, name, description, tags").limit(6),
    supabase.from("routes").select("id, name, days, difficulty, kids_suitable, highlights").order("days").limit(6),
    // Real counts
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
    supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
    supabase.from("states").select("*", { count: "exact", head: true }),
    supabase.from("routes").select("*", { count: "exact", head: true }),
    // Upcoming festivals (current month + next 3 months)
    supabase
      .from("festivals")
      .select("*, destinations(name)")
      .or(`month.eq.${currentMonth},month.eq.${(currentMonth % 12) + 1},month.eq.${((currentMonth + 1) % 12) + 1}`)
      .order("month")
      .limit(8),
    // Destination coordinates + month scores for homepage map
    supabase.from("destinations_with_coords").select("id, lat, lng"),
    supabase
      .from("destination_months")
      .select("destination_id, score")
      .eq("month", currentMonth),
    supabase.from("destinations").select("id, name").order("name"),
  ]);

  const totalPlaces = (destCount.count ?? 0) + (subCount.count ?? 0) + (gemCount.count ?? 0);

  // Build map pins: merge coords + names + month scores
  const coordsMap = Object.fromEntries(
    (coordsResult.data ?? []).map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const scoresMap = Object.fromEntries(
    (allMonthScores.data ?? []).map((s: any) => [s.destination_id, s.score])
  );
  const mapPins = (allDestsResult.data ?? [])
    .filter((d: any) => coordsMap[d.id])
    .map((d: any) => ({
      id: d.id,
      name: d.name,
      lat: coordsMap[d.id].lat,
      lng: coordsMap[d.id].lng,
      score: scoresMap[d.id] ?? null,
    }));

  return {
    destinations: destResult.data ?? [],
    collections: collResult.data ?? [],
    routes: routeResult.data ?? [],
    festivals: festResult.data ?? [],
    mapPins,
    stats: await getAppStats(),
  };
}

export default async function Home() {
  const { destinations, collections, routes, stats, festivals, mapPins } = await getFeaturedData();

  return (
    <>
      <Nav />
      <LandingHero
        featuredDestinations={destinations}
        collections={collections}
        routes={routes}
        stats={stats}
        festivals={festivals}
        mapPins={mapPins}
      />
      <Footer stats={stats} />
    </>
  );
}
