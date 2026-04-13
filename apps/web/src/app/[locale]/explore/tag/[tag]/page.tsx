import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const TAG_DISPLAY: Record<string, { title: string; desc: string }> = {
  "offbeat": { title: "Offbeat Destinations", desc: "Places most tourists haven't heard of — scored for the adventurous" },
  "trek": { title: "Trekking Destinations", desc: "Base camps, trail heads, and mountain towns for trekkers" },
  "spiritual": { title: "Spiritual Destinations", desc: "Temples, ashrams, and sacred sites across North India" },
  "heritage": { title: "Heritage Destinations", desc: "Forts, palaces, monuments, and UNESCO sites" },
  "wildlife": { title: "Wildlife Destinations", desc: "National parks, tiger reserves, and birding hotspots" },
  "lake": { title: "Lake Destinations", desc: "Hill station lakes, sacred lakes, and high-altitude water bodies" },
  "romantic": { title: "Romantic Destinations", desc: "Quiet valleys, lakeside retreats, and mountain escapes for couples" },
  "adventure": { title: "Adventure Destinations", desc: "Rafting, paragliding, skiing, and adrenaline-fueled destinations" },
  "family": { title: "Family Destinations", desc: "Kid-tested, parent-approved — with actual kids ratings" },
  "winter": { title: "Winter Destinations", desc: "Snow, skiing, and destinations that shine in December-February" },
  "monsoon": { title: "Monsoon Destinations", desc: "Waterfalls, green valleys, and places that come alive in rain" },
  "photography": { title: "Photography Destinations", desc: "The most photogenic destinations in North India" },
  "budget": { title: "Budget Destinations", desc: "Incredible experiences under ₹1,000 per day" },
  "pilgrimage": { title: "Pilgrimage Destinations", desc: "Sacred circuits and spiritual journeys across faiths" },
  "hill-station": { title: "Hill Stations", desc: "Classic and offbeat hill stations across the Himalayas" },
  "border": { title: "Border Destinations", desc: "International borders worth visiting — from Wagah to LOC viewpoints" },
  "desert": { title: "Desert Destinations", desc: "Thar desert, sand dunes, camel safaris, and stargazing" },
  "valley": { title: "Valley Destinations", desc: "Hidden valleys, flower meadows, and mountain passes" },
  "monastery": { title: "Monastery Destinations", desc: "Buddhist monasteries, Tibetan settlements, and meditation retreats" },
  "waterfall": { title: "Waterfall Destinations", desc: "India's most spectacular waterfalls and the best months to visit" },
};

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const info = TAG_DISPLAY[tag];
  if (!info) return { title: `${tag} Destinations | NakshIQ` };
  return {
    title: `${info.title} in India — Scored & Ranked | NakshIQ`,
    description: info.desc + " Every destination scored monthly with kids ratings and safety data.",
  };
}

export default async function ExploreByTagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  const info = TAG_DISPLAY[tag] ?? { title: `${tag} Destinations`, desc: "" };

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = new Date().getMonth() + 1;

  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .contains("tags", [tag])
    .order("name");

  if (!data || data.length === 0) notFound();

  const sorted = data.sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

  const states = [...new Set(data.map((d: any) => {
    const s = Array.isArray(d.state) ? d.state[0] : d.state;
    return s ? JSON.stringify({ id: d.state_id, name: s.name }) : null;
  }).filter(Boolean))].map(s => JSON.parse(s!));

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">{tag}</p>
          <h1 className="text-3xl font-bold">{info.title}</h1>
          <p className="mt-2 text-muted-foreground">{sorted.length} destinations — {info.desc}</p>
        </div>
        <ExploreGrid destinations={sorted} states={states} />
      </main>
      <Footer />
    </div>
  );
}
