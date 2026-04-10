import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CampingContent } from "@/components/camping-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Camping Spots — Best Campsites Across North India",
  description: "Curated camping spots from riverside sites in Rishikesh to high-altitude camps near Pangong. Facilities, elevation, best months, and permit requirements.",
};

async function getCampingData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("camping_spots")
    .select("*, destinations(name)")
    .order("name");

  return data ?? [];
}

export default async function CampingPage() {
  const spots = await getCampingData();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <img src="/images/destinations/chopta-tungnath.jpg" alt="Camping Spots" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Wild & Free</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Camping Spots</h1>
          <p className="mt-2 text-white/80 max-w-xl">{spots.length} curated campsites — from riverside to high-altitude</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <CampingContent spots={spots} />
      </main>
      <Footer />
    </div>
  );
}
