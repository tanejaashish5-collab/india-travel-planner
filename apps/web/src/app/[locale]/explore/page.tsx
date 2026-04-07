import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreWithMap } from "@/components/explore-with-map";
import { createClient } from "@supabase/supabase-js";

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [] };

  const supabase = createClient(url, key);

  const [destResult, statesResult] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, coords,
        hero_image_url,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
      `)
      .order("name"),
    supabase.from("states").select("id, name").order("name"),
  ]);

  return {
    destinations: destResult.data ?? [],
    states: statesResult.data ?? [],
  };
}

export default async function ExplorePage() {
  const { destinations, states } = await getData();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="mt-1 text-muted-foreground">
            {destinations.length} destinations · Filter or browse the map
          </p>
        </div>
        <ExploreWithMap destinations={destinations} states={states} />
      </main>
      <Footer />
    </div>
  );
}
