import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { DIFFICULTY_MAP } from "@/lib/seo-maps";

export const revalidate = 86400;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const DIFF_DESC: Record<string, string> = {
  easy: "Paved roads, good infrastructure, suitable for all ages and fitness levels.",
  moderate: "Some rough roads, moderate altitude, basic fitness required.",
  hard: "High altitude, rough terrain, limited infrastructure. Experience recommended.",
  extreme: "Remote, dangerous roads, extreme altitude. Only for experienced travelers.",
};

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) return {};
  return {
    title: `${name} Destinations in India — Scored & Ranked | NakshIQ`,
    description: `All ${name.toLowerCase()} destinations in North India. ${DIFF_DESC[level]} Scored for every month with kids ratings and safety data.`,
  };
}

export default async function ExploreByDifficultyPage({ params }: { params: Promise<{ locale: string; level: string }> }) {
  const { locale, level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = new Date().getMonth() + 1;

  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("difficulty", level)
    .order("name");

  const sorted = (data ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

  const states = [...new Set((data ?? []).map((d: any) => {
    const s = Array.isArray(d.state) ? d.state[0] : d.state;
    return s ? JSON.stringify({ id: d.state_id, name: s.name }) : null;
  }).filter(Boolean))].map(s => JSON.parse(s!));

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Difficulty: {name}</p>
          <h1 className="text-3xl font-bold">{name} Destinations</h1>
          <p className="mt-2 text-muted-foreground">{sorted.length} destinations — {DIFF_DESC[level]}</p>
        </div>
        <ExploreGrid destinations={sorted} states={states} />
      </main>
      <Footer />
    </div>
  );
}
