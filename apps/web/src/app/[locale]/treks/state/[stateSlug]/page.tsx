import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;

const STATE_MAP: Record<string, string> = {
  "himachal-pradesh": "Himachal Pradesh", "uttarakhand": "Uttarakhand",
  "jammu-kashmir": "Jammu & Kashmir", "ladakh": "Ladakh",
  "sikkim": "Sikkim", "arunachal-pradesh": "Arunachal Pradesh",
  "meghalaya": "Meghalaya", "nagaland": "Nagaland",
  "west-bengal": "West Bengal", "rajasthan": "Rajasthan",
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ stateSlug: string }> }): Promise<Metadata> {
  const { stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Treks in ${stateName} — Scored Trails & Routes | NakshIQ`,
    description: `Every trek in ${stateName} scored by difficulty, altitude, best months, and fitness level. Gear checklists, route maps, and honest assessments.`,
  };
}

export default async function TreksByStatePage({ params }: { params: Promise<{ stateSlug: string }> }) {
  const { stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .order("difficulty");

  const filteredTreks = (treks ?? []).filter((t: any) => t.destinations?.state?.name === stateName);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Treks</p>
          <h1 className="text-3xl font-bold">Treks in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {filteredTreks.length} scored trails across {stateName} — from easy day hikes to serious expeditions
          </p>
        </div>
        <TreksContent treks={filteredTreks} trekDests={[]} gearChecklists={[]} />
      </main>
      <Footer />
    </div>
  );
}
