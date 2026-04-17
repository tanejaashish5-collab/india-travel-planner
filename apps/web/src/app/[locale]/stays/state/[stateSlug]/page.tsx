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

const TYPE_COLORS: Record<string, string> = {
  homestay: "bg-green-500/10 text-green-400",
  hotel: "bg-blue-500/10 text-blue-400",
  camp: "bg-orange-500/10 text-orange-400",
  resort: "bg-purple-500/10 text-purple-400",
  hostel: "bg-yellow-500/10 text-yellow-400",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  return {
    title: `Where to Stay in ${stateName} — Verified Accommodations | NakshIQ`,
    description: `Hotels, homestays, camps, and hostels across ${stateName}. Honest reviews, real prices, no sponsored placements.`,
  };
}

export default async function StaysByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: stays } = await supabase
    .from("local_stays")
    .select("*, destination:destinations!inner(name, state_id, state:states(name))")
    .eq("destination.state_id", stateSlug)
    .order("name");

  const grouped = (stays ?? []).reduce((acc: Record<string, any[]>, s: any) => {
    const destName = s.destination?.name || "Other";
    if (!acc[destName]) acc[destName] = [];
    acc[destName].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Accommodation</p>
          <h1 className="text-3xl font-bold">Where to Stay in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {(stays ?? []).length} verified accommodations across {stateName} — no sponsored listings
          </p>
        </div>
        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([destName, destStays]) => (
          <div key={destName} className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">{destName}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(destStays as any[]).map((s: any) => (
                <div key={s.id} className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground text-sm flex-1">{s.name}</h3>
                    {s.type && <span className={`text-[10px] rounded-full px-2 py-0.5 ${TYPE_COLORS[s.type] ?? "bg-muted text-muted-foreground"}`}>{s.type}</span>}
                  </div>
                  {s.price_range && <p className="text-xs text-primary font-mono mt-1">{s.price_range}</p>}
                  {s.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {(stays ?? []).length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No stays listed for {stateName} yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
