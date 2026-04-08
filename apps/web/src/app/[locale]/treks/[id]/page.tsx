import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TrekDetail } from "@/components/trek-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase.from("treks").select("name, difficulty, duration_days, max_altitude_m, distance_km").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — ${data.duration_days}-Day ${data.difficulty} Trek`,
    description: `${data.name}: ${data.duration_days} days, ${data.distance_km}km, max ${data.max_altitude_m}m. Day-by-day itinerary, campsites, gear list, costs, and safety info.`,
  };
}

async function getTrek(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  // Get all trek IDs for prev/next nav
  const { data: allTreks } = await supabase
    .from("treks")
    .select("id, name")
    .order("name");

  return { ...data, allTreks: allTreks ?? [] };
}

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trek = await getTrek(id);
  if (!trek) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <TrekDetail trek={trek} />
        <PrevNextNav
          items={trek.allTreks}
          currentId={id}
          basePath="treks"
          backLabel="All Treks"
          backHref="treks"
        />
      </main>
      <Footer />
    </div>
  );
}
