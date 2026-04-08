import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Travel Guides — Data-Driven Destination Intelligence",
  description: "In-depth travel guides for 124 North India destinations. Best time to visit, costs, family suitability, infrastructure reality, and honest opinions.",
};

async function getGuideData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], comparisons: [] };

  const supabase = createClient(url, key);

  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, difficulty, elevation_m, best_months, state:states(name)")
    .order("name");

  // Get popular comparison pairs from tourist_trap_alternatives
  const { data: pairs } = await supabase
    .from("tourist_trap_alternatives")
    .select("trap_destination_id, alternative_destination_id, destinations!tourist_trap_alternatives_trap_destination_id_fkey(name), destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)")
    .limit(20);

  return { destinations: dests ?? [], comparisons: pairs ?? [] };
}

const MONTH_NAMES = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

export default async function GuidesPage() {
  const { destinations, comparisons } = await getGuideData();

  // Generate "Best time to visit" guides
  const bestTimeGuides = destinations.slice(0, 30).map((d: any) => ({
    title: `Best Time to Visit ${d.name}`,
    href: `/en/destination/${d.id}`,
    desc: `Monthly scores, weather, crowds, and costs for ${d.name}${d.elevation_m ? ` (${d.elevation_m}m)` : ""}`,
    months: d.best_months?.slice(0, 3).map((m: number) => MONTH_NAMES[m]).join(", "),
  }));

  // Generate "vs" comparison guides
  const vsGuides = comparisons.map((c: any) => {
    const trapName = Array.isArray(c.destinations) ? c.destinations[0]?.name : c.destinations?.name;
    const altName = Array.isArray(c.destination) ? c.destination[0]?.name : c.destination?.name;
    return {
      title: `${trapName} vs ${altName}`,
      href: `/en/compare?compare=${c.trap_destination_id},${c.alternative_destination_id}`,
      desc: `Side-by-side comparison: score, difficulty, kids rating, safety, network, cost`,
    };
  }).filter((g: any) => g.title && !g.title.includes("undefined"));

  // Family guides
  const familyGuides = destinations
    .filter((d: any) => d.difficulty === "easy")
    .slice(0, 15)
    .map((d: any) => ({
      title: `${d.name} with Kids — Family Guide`,
      href: `/en/destination/${d.id}`,
      desc: `Kids rating, family stress level, infrastructure, medical access`,
    }));

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold">Travel Guides</h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Data-driven guides for {destinations.length} destinations. Not opinions — structured intelligence.
          </p>
        </div>

        {/* Best Time to Visit */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Best Time to Visit</h2>
          <p className="text-muted-foreground mb-6">Monthly suitability scores, crowd levels, and weather reality</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bestTimeGuides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
                {g.months && <p className="text-xs text-primary mt-2">Best: {g.months}</p>}
              </Link>
            ))}
          </div>
        </section>

        {/* Vs Comparisons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Destination Comparisons</h2>
          <p className="text-muted-foreground mb-6">Side-by-side on 11 dimensions — score, kids, safety, network, cost</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vsGuides.slice(0, 18).map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Family Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Family Travel Guides</h2>
          <p className="text-muted-foreground mb-6">Infrastructure-aware kids ratings, medical access, family stress levels</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {familyGuides.map((g) => (
              <Link
                key={g.href + "-family"}
                href={g.href}
                className="rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
