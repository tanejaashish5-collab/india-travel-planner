import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoadConditionsContent } from "@/components/road-conditions-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { categoryHeroSrc } from "@/lib/landing-heroes";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Road Conditions — Live Highway Status",
  description: "Current road conditions for major India highway segments. Manali-Leh, Srinagar-Leh, Char Dham roads, Spiti circuit, and more. Updated regularly.",

    ...localeAlternates(locale, "/road-conditions"),
  };
}async function getRoadReports() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("road_reports")
    .select("*, destinations(name)")
    .order("segment");

  return data ?? [];
}

export default async function RoadConditionsPage() {
  const reports = await getRoadReports();

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
          <source src={categoryHeroSrc("road-conditions")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.08em] mb-2">Live Updates</p>
          <h1 className="text-3xl font-semibold sm:text-4xl text-white drop-shadow-lg">Road Conditions</h1>
          <p className="mt-2 text-white/80 max-w-xl">{reports.length} highway segments — check before you drive</p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <RoadConditionsContent reports={reports} />
      </main>
      <Footer />
    </div>
  );
}
