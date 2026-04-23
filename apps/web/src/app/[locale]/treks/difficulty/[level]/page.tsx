import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { DIFFICULTY_MAP } from "@/lib/seo-maps";

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ level: string}> }): Promise<Metadata> {
  const { level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) return {
  };
  return {
    title: `${name} Treks in India — Scored Trails | NakshIQ`,
    description: `All ${name.toLowerCase()} treks across India with altitude, duration, best months, gear requirements, and fitness level needed.`,
  };
}

export default async function TreksByDifficultyPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("difficulty", level)
    .order("name");

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Difficulty: {name}</p>
          <h1 className="text-3xl font-semibold">{name} Treks</h1>
          <p className="mt-2 text-muted-foreground">{(treks ?? []).length} {name.toLowerCase()} treks across India</p>
        </div>
        <TreksContent treks={treks ?? []} trekDests={[]} gearChecklists={[]} />
      </main>
      <Footer />
    </div>
  );
}
