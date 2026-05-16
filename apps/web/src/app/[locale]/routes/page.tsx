import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoutesGrid } from "@/components/routes-grid";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { categoryHeroSrc } from "@/lib/landing-heroes";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Road Trip Routes — Driving Itineraries Across India",
  description: "Multi-day driving routes across India with day-by-day stops, distance, difficulty, kids suitability, and Google Maps links. From 3-day weekends to 14-day epics.",

    ...localeAlternates(locale, "/routes"),
  };
}async function getRoutes() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase.from("routes").select("*").order("days");
  return data ?? [];
}

export default async function RoutesPage() {
  const routes = await getRoutes();

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
          poster="/images/destinations/manali.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={categoryHeroSrc("routes")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">Road Trips</p>
          <h1 className="text-3xl font-semibold sm:text-4xl text-white drop-shadow-lg">Driving Routes</h1>
          <p className="mt-2 text-white/80 max-w-xl">{routes.length} driving itineraries from 3-day weekends to 12-day road trips</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <RoutesGrid routes={routes} />
      </main>
      <Footer />
    </div>
  );
}
