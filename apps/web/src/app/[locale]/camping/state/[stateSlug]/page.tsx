import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  return {
    title: `Camping in ${stateName} — Scored Spots & Sites | NakshIQ`,
    description: `Every camping spot in ${stateName} with honest reviews, facilities, water access, permit requirements, and best months. No sponsored content.`,
  };
}

export default async function CampingByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: spots } = await supabase
    .from("camping_spots")
    .select("*, destination:destinations(name, state:states(name))")
    .order("name");

  const filtered = (spots ?? []).filter((s: any) => s.destination?.state?.name === stateName);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">Camping</p>
          <h1 className="text-3xl font-semibold">Camping in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} camping spots across {stateName} — facilities, water access, permits, and honest reviews
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((spot: any) => (
            <div key={spot.id} className="rounded-2xl border border-border/50 bg-card p-5 hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-foreground">{spot.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{spot.destination?.name}</p>
              {spot.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{spot.description}</p>}
              <div className="flex gap-2 mt-3 flex-wrap">
                {spot.water_available && <span className="text-[10px] rounded-full bg-blue-500/10 text-blue-400 px-2 py-0.5">Water</span>}
                {spot.permit_required && <span className="text-[10px] rounded-full bg-yellow-500/10 text-yellow-400 px-2 py-0.5">Permit</span>}
                {spot.fire_allowed && <span className="text-[10px] rounded-full bg-orange-500/10 text-orange-400 px-2 py-0.5">Campfire OK</span>}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>No camping spots listed for {stateName} yet.</p>
            <Link href={`/${locale}/camping`} className="text-primary hover:underline mt-2 inline-block">View all camping spots →</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
