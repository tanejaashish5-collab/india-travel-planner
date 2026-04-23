import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { notFound } from "next/navigation";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ stateSlug: string}> }): Promise<Metadata> {
  const { stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  const currentMonth = new Date().toLocaleString("en", { month: "long" });
  return {
    title: `Places to Visit in ${stateName} — Every Destination Scored | NakshIQ`,
    description: `All destinations in ${stateName} scored 1-5 for ${currentMonth}. Kids ratings, safety data, infrastructure reality, and honest assessments. No sponsored content.`,
  };
}

export default async function ExploreByStatePage({ params }: { params: Promise<{ stateSlug: string }> }) {
  const { stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = new Date().getMonth() + 1;

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("state_id", stateSlug)
    .order("name");

  // Sort by current month score descending
  const sorted = (destinations ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">{stateName}</p>
          <h1 className="text-3xl font-semibold">Places to Visit in {stateName}</h1>
          <p className="mt-2 text-muted-foreground">
            {sorted.length} destinations scored for every month — sorted by this month's score
          </p>
        </div>
        <ExploreGrid destinations={sorted} states={[{ id: stateSlug, name: stateName }]} />
      </main>
      <Footer />
    </div>
  );
}
