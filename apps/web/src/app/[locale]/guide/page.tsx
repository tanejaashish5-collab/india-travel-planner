import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { GuideContent } from "@/components/guide-content";

export const metadata: Metadata = {
  title: "Travel Guides — Data-Driven Destination Intelligence",
  description: "In-depth travel guides for 124 North India destinations. Best time to visit, costs, family suitability, infrastructure reality, and honest opinions.",
};

async function getGuideData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], comparisons: [] };

  const supabase = createClient(url, key);

  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, difficulty, elevation_m, best_months, state:states(name)")
    .order("name");

  // Get popular comparison pairs from tourist_trap_alternatives
  const { data: pairs } = await supabase
    .from("tourist_trap_alternatives")
    .select("trap_destination_id, alternative_destination_id, destinations!tourist_trap_alternatives_trap_destination_id_fkey(name), destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)")
    .limit(20);

  return { destinations: dests ?? [], comparisons: pairs ?? [] };
}

export default async function GuidesPage() {
  const { destinations, comparisons } = await getGuideData();

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-64 overflow-hidden mb-8">
        <Image
          src="/images/destinations/spiti-valley.jpg"
          alt="Travel guides hero"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-5xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
            Travel Intelligence
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">
            Travel Guides
          </h1>
          <p className="mt-2 text-white/80">
            Data-driven guides for {destinations.length} destinations.
          </p>
        </div>
      </section>

      <main>
        <GuideContent destinations={destinations} comparisons={comparisons} />
      </main>

      <Footer />
    </div>
  );
}
