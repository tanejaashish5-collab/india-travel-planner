import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PlanContent } from "@/components/plan-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Plan Your Trip — Smart Destination Matcher",
  description: "Tell us when you're going, who's coming, and your budget. We'll match you to the best destinations from 105+ places with itinerary suggestions and honest warnings.",
};

async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, tags, best_months, state_id,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score, note)
    `)
    .order("name");

  return data ?? [];
}

export default async function PlanTripPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <PlanContent destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
