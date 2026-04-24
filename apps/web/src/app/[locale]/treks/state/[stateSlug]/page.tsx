import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { notFound } from "next/navigation";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  return {
    title: `Treks in ${stateName} — Scored Trails & Routes | NakshIQ`,
    description: `Every trek in ${stateName} scored by difficulty, altitude, best months, and fitness level. Gear checklists, route maps, and honest assessments.`,
    ...localeAlternates(locale, `/treks/state/${stateSlug}`),
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
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">Treks</p>
          <h1 className="text-3xl font-semibold">Treks in {stateName}</h1>
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
