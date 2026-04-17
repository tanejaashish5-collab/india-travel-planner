import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP, MONTH_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ stateSlug: string; month: string }> }): Promise<Metadata> {
  const { stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) return {
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/explore/state/${stateSlug}/${month}`,
      languages: {
        en: `https://www.nakshiq.com/en/explore/state/${stateSlug}/${month}`,
        hi: `https://www.nakshiq.com/hi/explore/state/${stateSlug}/${month}`,
      },
    },
  };
  return {
    title: `Places to Visit in ${stateName} in ${m.name} — Scored & Ranked | NakshIQ`,
    description: `Best destinations in ${stateName} for ${m.name}, scored 1-5 based on weather, crowds, and accessibility. See which score 5/5 and which to avoid.`,
  };
}

export default async function ExploreStateMonthPage({ params }: { params: Promise<{ locale: string; stateSlug: string; month: string }> }) {
  const { locale, stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("state_id", stateSlug)
    .order("name");

  const sorted = (destinations ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === m.num)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === m.num)?.score ?? 0;
    return bScore - aScore;
  });

  const score5 = sorted.filter((d: any) => d.destination_months?.find((dm: any) => dm.month === m.num)?.score === 5).length;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">{stateName} in {m.name}</p>
          <h1 className="text-3xl font-bold">Places to Visit in {stateName} in {m.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {sorted.length} destinations — {score5} score 5/5 this month. Sorted by {m.name} suitability.
          </p>
        </div>
        <ExploreGrid destinations={sorted} states={[{ id: stateSlug, name: stateName }]} />
      </main>
      <Footer />
    </div>
  );
}
