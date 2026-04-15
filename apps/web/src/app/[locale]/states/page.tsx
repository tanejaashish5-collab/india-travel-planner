import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StatesExplorer } from "@/components/states-explorer";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Browse India by State — Every Destination Scored",
  description: "Explore India state by state. 290+ destinations across 26 states, each scored for every month. Find the best places to visit in any Indian state.",
};

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { states: [] };

  const supabase = createClient(url, key);

  const [statesResult, regionsResult, destResult] = await Promise.all([
    supabase.from("states").select("id, name, region, description, capital, display_order").order("display_order"),
    supabase.from("regions").select("id, name, state_id, hero_tagline, tags, best_months, subregions").order("id"),
    supabase.from("destinations").select("id, state_id, destination_months(month, score)"),
  ]);

  const currentMonth = new Date().getMonth() + 1;

  // Build per-state: dest count, first dest ID, avg score
  const countMap: Record<string, number> = {};
  const firstDestMap: Record<string, string> = {};
  const scoreSum: Record<string, { total: number; count: number }> = {};

  (destResult.data ?? []).forEach((d: any) => {
    countMap[d.state_id] = (countMap[d.state_id] || 0) + 1;
    if (!firstDestMap[d.state_id]) firstDestMap[d.state_id] = d.id;

    const monthData = d.destination_months?.find((m: any) => m.month === currentMonth);
    if (monthData?.score) {
      if (!scoreSum[d.state_id]) scoreSum[d.state_id] = { total: 0, count: 0 };
      scoreSum[d.state_id].total += monthData.score;
      scoreSum[d.state_id].count++;
    }
  });

  // Build region detail map
  const regionMap: Record<string, any> = {};
  (regionsResult.data ?? []).forEach((r: any) => {
    regionMap[r.state_id] = r;
  });

  const states = (statesResult.data ?? []).map((s: any) => ({
    ...s,
    destCount: countMap[s.id] ?? 0,
    heroDestId: firstDestMap[s.id] ?? s.id,
    avgScore: scoreSum[s.id] ? Math.round((scoreSum[s.id].total / scoreSum[s.id].count) * 10) / 10 : null,
    regionDetail: regionMap[s.id] ?? null,
  }));

  return { states };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { states } = await getData();
  const totalDests = states.reduce((sum: number, s: any) => sum + s.destCount, 0);

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Browse India</h1>
          <p className="mt-2 text-muted-foreground">
            {totalDests} destinations across {states.length} states — scored for every month
          </p>
        </div>
        <StatesExplorer states={states} locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
