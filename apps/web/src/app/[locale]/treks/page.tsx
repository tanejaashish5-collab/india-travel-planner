import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";

async function getTrekData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { treks: [], trekDests: [] };

  const supabase = createClient(url, key);

  const [treksResult, destsResult, gearResult] = await Promise.all([
    supabase.from("treks").select("*").order("difficulty"),
    supabase
      .from("destinations")
      .select("id, name, tagline, difficulty, elevation_m, tags, state:states(name)")
      .contains("tags", ["trek"])
      .order("name"),
    supabase.from("gear_checklists").select("*").order("name"),
  ]);

  return {
    treks: treksResult.data ?? [],
    trekDests: destsResult.data ?? [],
    gearChecklists: gearResult.data ?? [],
  };
}

export default async function TreksPage() {
  const { treks, trekDests, gearChecklists } = await getTrekData();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Treks</h1>
          <p className="mt-1 text-muted-foreground">
            {treks.length} curated treks across North India — from easy day hikes to extreme multi-day expeditions
          </p>
        </div>
        <TreksContent treks={treks} trekDests={trekDests} gearChecklists={gearChecklists} />
      </main>
      <Footer />
    </div>
  );
}
