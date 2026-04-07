import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RegionDetail } from "@/components/region-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

async function getRegion(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  // Get region data
  const { data: region } = await supabase
    .from("regions")
    .select("*")
    .eq("id", id)
    .single();

  if (!region) return null;

  // Get all destinations in this state with new fields
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

  // Get hidden gems in this region
  const destIds = (destinations ?? []).map((d: any) => d.id);
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("id, name, near_destination_id, distance_km, why_go, difficulty, confidence_score, tags")
    .in("near_destination_id", destIds);

  // Get routes that pass through this region
  const { data: routes } = await supabase
    .from("routes")
    .select("id, name, days, difficulty, kids_suitable, bike_route, stops")
    .order("days");

  // Filter routes to ones that include destinations in this state
  const regionRoutes = (routes ?? []).filter((r: any) =>
    r.stops?.some((s: string) => destIds.includes(s))
  );

  return {
    ...region,
    destinations: destinations ?? [],
    gems: gems ?? [],
    routes: regionRoutes,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const region = await getRegion(id);
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
