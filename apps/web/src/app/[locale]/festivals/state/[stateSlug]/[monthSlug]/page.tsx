import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
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

export async function generateMetadata({ params }: { params: Promise<{ stateSlug: string; monthSlug: string }> }): Promise<Metadata> {
  const { stateSlug, monthSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[monthSlug];
  if (!stateName || !m) return {};
  return {
    title: `Festivals in ${stateName} in ${m.name} | NakshIQ`,
    description: `Festivals happening in ${stateName} during ${m.name} — dates, locations, and travel tips. Plan your trip around these celebrations.`,
  };
}

export default async function FestivalsStateMonthPage({ params }: { params: Promise<{ locale: string; stateSlug: string; monthSlug: string }> }) {
  const { locale, stateSlug, monthSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[monthSlug];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations!inner(name, state_id, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .eq("month", m.num)
    .order("name");

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">{stateName} · {m.name}</p>
          <h1 className="text-3xl font-bold">Festivals in {stateName} in {m.name}</h1>
          <p className="mt-2 text-muted-foreground">{(festivals ?? []).length} festivals this month</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(festivals ?? []).map((f: any) => (
            <div key={f.id} className="rounded-2xl border border-border/50 bg-card p-5">
              <h3 className="font-semibold text-foreground">{f.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.destinations?.name}</p>
              {f.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{f.description}</p>}
              {f.dates && <p className="text-xs font-medium text-primary mt-2">{f.dates}</p>}
            </div>
          ))}
        </div>
        {(festivals ?? []).length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No festivals in {stateName} during {m.name}.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
