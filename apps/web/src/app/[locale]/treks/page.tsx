import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { categoryHeroSrc } from "@/lib/landing-heroes";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Treks — Scored Trails Across India",
  description: "From easy day hikes to extreme multi-day expeditions. Gear checklists, difficulty ratings, altitude data, best months, and fitness requirements for every trek.",

    ...localeAlternates(locale, "/treks"),
  };
}async function getTrekData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { treks: [], trekDests: [] };

  const supabase = createClient(url, key);

  const [treksResult, destsResult, gearResult] = await Promise.all([
    supabase.from("treks").select("*, destinations(name, state:states(name))").order("difficulty"),
    supabase
      .from("destinations")
      .select("id, name, tagline, difficulty, elevation_m, tags, state:states(name)")
      .contains("tags", ["trek"])
      .order("name"),
    supabase.from("gear_checklists").select("*").order("name"),
  ]);

  return {
    treks: treksResult.data ?? [],
    trekDests: destsResult.data ?? [],
    gearChecklists: gearResult.data ?? [],
  };
}

export default async function TreksPage() {
  const { treks, trekDests, gearChecklists } = await getTrekData();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-56 sm:h-72 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/destinations/valley-of-flowers.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={categoryHeroSrc("treks")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">Himalayan Trails</p>
          <h1 className="text-3xl font-semibold sm:text-4xl text-white drop-shadow-lg">Treks & Hikes</h1>
          <p className="mt-2 text-white/80 max-w-xl">{treks.length} treks across India — from easy day hikes to extreme multi-day expeditions</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <TreksContent treks={treks} trekDests={trekDests} gearChecklists={gearChecklists} />
      </main>
      <Footer />
    </div>
  );
}
