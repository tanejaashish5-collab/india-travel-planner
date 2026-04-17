import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TripBoard } from "@/components/trip-board";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "My Trip Board — Plan, Organize, Share",
  description: "Build your trip board with destinations, routes, and notes. Share with friends, export as PDF, and get AI recommendations.",

    ...localeAlternates(locale, "/trip"),
  };
}async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, difficulty, elevation_m, daily_cost, vehicle_fit, family_stress, state:states(name), destination_months(month, score)")
    .order("name");

  return data ?? [];
}

export default async function TripPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <TripBoard destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
