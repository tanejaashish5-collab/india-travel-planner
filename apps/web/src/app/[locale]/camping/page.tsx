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
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Camping Spots</h1>
          <p className="mt-1 text-muted-foreground">
            {spots.length} curated campsites — from riverside to high-altitude
          </p>
        </div>
        <CampingContent spots={spots} />
      </main>
      <Footer />
    </div>
  );
}
