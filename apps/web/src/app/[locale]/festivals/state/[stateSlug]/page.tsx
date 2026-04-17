import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const MONTH_NAMES = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  return {
    title: `Festivals in ${stateName} — Complete Calendar | NakshIQ`,
    description: `Every festival in ${stateName} by month — dates, locations, and what to expect. Time your trip around ${stateName}'s celebrations.`,
  };
}

export default async function FestivalsByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations!inner(name, state_id, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .order("month");

  const grouped = (festivals ?? []).reduce((acc: Record<number, any[]>, f: any) => {
    const m = f.month || 0;
    if (!acc[m]) acc[m] = [];
    acc[m].push(f);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Festival Calendar</p>
          <h1 className="text-3xl font-bold">Festivals in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {(festivals ?? []).length} festivals across {stateName} — organized by month
          </p>
        </div>
        {Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b)).map(([month, fests]) => (
          <div key={month} className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">{MONTH_NAMES[Number(month)] || "Unknown"}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(fests as any[]).map((f: any) => (
                <div key={f.id} className="rounded-xl border border-border/50 bg-card p-4">
                  <h3 className="font-medium text-foreground text-sm">{f.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.destinations?.name}</p>
                  {f.description && <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{f.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {(festivals ?? []).length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No festivals listed for {stateName} yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
