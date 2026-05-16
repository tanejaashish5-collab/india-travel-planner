import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ExploreWithMap } from "@/components/explore-with-map";
import { TrendingMonthPages } from "@/components/trending-month-pages";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CategoryHero } from "@/components/category-hero";
import { categoryHeroSrc } from "@/lib/landing-heroes";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localeAlternates(locale, "/explore"),
  };
}async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [], coords: [] };

  const supabase = createClient(url, key);

  const [destResult, statesResult, coordsResult] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, budget_tier, eco_tier,
        hero_image_url, vehicle_fit, family_stress, solo_female_score,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note, solo_female_override)
      `)
      .order("name"),
    supabase.from("states").select("id, name, region").order("display_order"),
    // Fetch coords from the view that extracts lat/lng
    supabase.from("destinations_with_coords").select("id, lat, lng"),
  ]);

  return {
    destinations: destResult.data ?? [],
    states: statesResult.data ?? [],
    coords: coordsResult.data ?? [],
  };
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  const { destinations, states, coords } = await getData();

  const coordsMap = Object.fromEntries(
    coords.map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const destinationsWithCoords = destinations.map((d: any) => ({
    ...d,
    coords: coordsMap[d.id] ?? null,
  }));

  return (
    <div className="min-h-screen">
      <Nav />
      <CategoryHero
        videoSrc={categoryHeroSrc("explore")}
        posterSrc="/images/destinations/spiti-valley.jpg"
        posterAlt="Explore India"
        kicker="The Confidence Engine"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle", { count: destinations.length })}
      />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Start from
          </span>
          {["delhi","mumbai","bangalore","chennai","kolkata","hyderabad"].map((c) => (
            <a
              key={c}
              href={`/${locale}/weekend-from-${c}`}
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-foreground/80 hover:text-[#E55642] transition-colors"
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </a>
          ))}
          <span className="ml-auto font-mono text-[10px] tracking-[0.22em] uppercase text-[#E55642]">
            weekend trips →
          </span>
        </div>
        <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded bg-foreground/5" />}>
          <ExploreWithMap destinations={destinationsWithCoords} states={states} />
        </Suspense>
        <TrendingMonthPages locale={locale} />
        <div className="mt-16 max-w-2xl mx-auto">
          <NewsletterSignup
            source="explore-end"
            headline="Stop scrolling. Get the one that's worth it."
            subhead="Every Sunday: the single best India destination this week, the honest skip, and what changed on the road. Free. No spam."
            buttonLabel="Get Sunday's pick"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
