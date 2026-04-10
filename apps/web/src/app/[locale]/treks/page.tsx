import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Treks — 25 Curated Treks Across North India",
  description: "From easy day hikes to extreme multi-day expeditions. Gear checklists, difficulty ratings, altitude data, best months, and fitness requirements for every trek.",
};

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
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <img src="/images/destinations/valley-of-flowers.jpg" alt="Treks & Hikes" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Himalayan Trails</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Treks & Hikes</h1>
          <p className="mt-2 text-white/80 max-w-xl">{treks.length} curated treks across North India — from easy day hikes to extreme multi-day expeditions</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <TreksContent treks={treks} trekDests={trekDests} gearChecklists={gearChecklists} />
      </main>
      <Footer />
    </div>
  );
}
