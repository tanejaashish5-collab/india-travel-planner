import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP, MONTH_MAP } from "@/lib/seo-maps";

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
  if (!stateName || !m) return {};
  return {
    title: `Treks in ${stateName} in ${m.name} — Best Trails This Month | NakshIQ`,
    description: `Best treks in ${stateName} for ${m.name}. Trail conditions, weather, difficulty, and whether the route is open. Honest assessments.`,
  };
}

export default async function TreksStateMonthPage({ params }: { params: Promise<{ stateSlug: string; month: string }> }) {
  const { stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .order("name");

  const filtered = (treks ?? []).filter((t: any) => {
    const trekState = t.destinations?.state?.name;
    if (trekState !== stateName) return false;
    if (t.best_months && Array.isArray(t.best_months)) {
      return t.best_months.includes(m.num);
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">{stateName} · {m.name}</p>
          <h1 className="text-3xl font-bold">Treks in {stateName} in {m.name}</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} treks open or recommended in {m.name}</p>
        </div>
        <TreksContent treks={filtered} trekDests={[]} gearChecklists={[]} />
      </main>
      <Footer />
    </div>
  );
}
