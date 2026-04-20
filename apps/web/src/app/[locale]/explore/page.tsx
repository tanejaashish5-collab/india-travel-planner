import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreWithMap } from "@/components/explore-with-map";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

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
        id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id,
        hero_image_url, vehicle_fit, family_stress,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
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
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t("pageTitle")}</h1>
          <p className="mt-1 text-muted-foreground">
            {t("pageSubtitle", { count: destinations.length })}
          </p>
        </div>
        <ExploreWithMap destinations={destinationsWithCoords} states={states} />
      </main>
      <Footer />
    </div>
  );
}
