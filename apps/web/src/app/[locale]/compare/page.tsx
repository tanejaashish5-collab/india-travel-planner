import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CompareView } from "@/components/compare-view";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Compare Destinations — Side by Side",
  description: "Compare up to 3 destinations on monthly score, kids rating, safety, network, medical access, budget, difficulty, and more.",

    ...localeAlternates(locale, "/compare"),
  };
}async function getDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, best_months, vehicle_fit, family_stress, daily_cost,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score),
      confidence_cards(safety_rating, network)
    `)
    .order("name");

  return data ?? [];
}

export default async function ComparePage() {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <CompareView destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
