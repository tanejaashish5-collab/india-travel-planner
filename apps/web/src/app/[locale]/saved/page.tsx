import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SavedContent } from "@/components/saved-content";
import { createClient } from "@supabase/supabase-js";

async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, tags, best_months, state_id, solo_female_score,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score, note),
      confidence_cards(safety_rating, network)
    `)
    .order("name");

  return data ?? [];
}

export default async function SavedPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <SavedContent destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
