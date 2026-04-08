import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StaysContent } from "@/components/stays-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Stay Intelligence — Where to Stay, Not Where to Book",
  description: "Decision-grade accommodation guidance for every destination. Best zones by traveler type, budget bands, stay types, and honest avoid-this warnings. Not a booking site.",
};

async function getStayData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, stay_zones, food_scene, workability, vehicle_fit, family_stress, difficulty, elevation_m, state:states(name)")
    .not("stay_zones", "eq", "{}")
    .not("vehicle_fit", "is", null)
    .order("name");

  return data ?? [];
}

export default async function StaysPage() {
  const destinations = await getStayData();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Where to Stay</h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Decision-grade accommodation intelligence. Best zones, budget reality, and honest warnings — not hotel listings.
          </p>
        </div>
        <StaysContent destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
