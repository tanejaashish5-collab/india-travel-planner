import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PlanContent } from "@/components/plan-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

// ISR — cache the RSC payload for an hour so navigation prefetch hits Vercel's
// edge cache instead of regenerating per-hover (mitigates the intermittent
// 503s on _rsc= prefetch requests called out in BUG-002).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Plan Your Trip — Smart Destination Matcher",
  description: "Tell us when you're going, who's coming, and your budget. We'll match you to the best destinations from 480+ destinations with itinerary suggestions and honest warnings.",

    ...localeAlternates(locale, "/plan"),
  };
}async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [] };

  const supabase = createClient(url, key);
  const [destRes, stateRes] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, budget_tier, tags, best_months, state_id,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
      `)
      .order("name"),
    supabase
      .from("states")
      .select("id, name, region")
      .order("name"),
  ]);

  return {
    destinations: destRes.data ?? [],
    states: stateRes.data ?? [],
  };
}

export default async function PlanTripPage() {
  const { destinations, states } = await getAllDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <PlanContent destinations={destinations} states={states} />
      </main>
      <Footer />
    </div>
  );
}
