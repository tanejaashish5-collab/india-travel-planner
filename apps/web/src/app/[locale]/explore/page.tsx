import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreWithMap } from "@/components/explore-with-map";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Explore Destinations — Filter by Month, Difficulty, Kids & More",
  description: "Browse 143+ destinations across India with monthly suitability scores. Filter by state, difficulty, kids-friendliness, and sort by elevation or score. Grid and map views.",
};

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [], coords: [] };

  const supabase = createClient(url, key);

  const [destResult, statesResult, coordsResult] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id,
        hero_image_url, vehicle_fit, family_stress,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
      `)
      .order("name"),
    supabase.from("states").select("id, name").order("name"),
    // Fetch coords from the view that extracts lat/lng
    supabase.from("destinations_with_coords").select("id, lat, lng"),
  ]);

  return {
    destinations: destResult.data ?? [],
    states: statesResult.data ?? [],
    coords: coordsResult.data ?? [],
  };
}

export default async function ExplorePage() {
  const { destinations, states, coords } = await getData();

  // Merge coords into destinations
  const coordsMap = Object.fromEntries(
    coords.map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const destinationsWithCoords = destinations.map((d: any) => ({
    ...d,
    coords: coordsMap[d.id] ?? null,
  }));

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Explore</h1>
          <h2 className="sr-only">Destinations</h2>
          <p className="mt-1 text-muted-foreground">
            {destinations.length} destinations · Filter or browse the map
          </p>
        </div>
        <ExploreWithMap destinations={destinationsWithCoords} states={states} />
      </main>
      <Footer />
    </div>
  );
}
