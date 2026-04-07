import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/language-toggle";
import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import { createClient } from "@supabase/supabase-js";

async function getFeaturedData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], collections: [], routes: [] };

  const supabase = createClient(url, key);
  const currentMonth = new Date().getMonth() + 1;

  const [destResult, collResult, routeResult] = await Promise.all([
    supabase
      .from("destination_months")
      .select("destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))")
      .eq("month", currentMonth)
      .gte("score", 4)
      .order("score", { ascending: false })
      .limit(6),
    supabase.from("collections").select("id, name, description, tags").limit(6),
    supabase.from("routes").select("id, name, days, difficulty, kids_suitable, highlights").order("days").limit(6),
  ]);

  return {
    destinations: destResult.data ?? [],
    collections: collResult.data ?? [],
    routes: routeResult.data ?? [],
  };
}

export default async function Home() {
  const { destinations, collections, routes } = await getFeaturedData();

  return (
    <>
      <LandingHero
        featuredDestinations={destinations}
        collections={collections}
        routes={routes}
      />
      <Footer />
    </>
  );
}
