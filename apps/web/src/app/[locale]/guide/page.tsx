import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { GuideContent } from "@/components/guide-content";
import { localeAlternates } from "@/lib/seo-utils";

// 1-hour ISR window so the month rollover flips within ~1h after IST
// midnight instead of up to ~24h. Combined with IST-aware currentMonth
// below, May 1 visitors see May content within the first hour.
export const revalidate = 3600;

// Month in IST, not UTC. Vercel runs in UTC; without this, the page flips
// to the new month at 05:30 IST (midnight UTC) — ~5.5h after Indian users'
// phones say it's the new month.
function currentMonthIST(): number {
  return Number(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "numeric" }),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Travel Guides — Data-Driven Destination Intelligence",
  description: "In-depth travel guides for 340+ India destinations. Best time to visit, costs, family suitability, infrastructure reality, and honest opinions.",

    ...localeAlternates(locale, "/guide"),
  };
}

async function getGuideData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], comparisons: [], monthScores: [], currentMonth: currentMonthIST() };

  const supabase = createClient(url, key);
  const currentMonth = currentMonthIST();

  const [{ data: dests }, { data: pairs }, { data: monthScores }] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, difficulty, elevation_m, best_months, state:states(name), kids_friendly(suitable, rating, min_recommended_age, reasons)")
      .order("name"),
    // Popular comparison pairs from tourist_trap_alternatives
    supabase
      .from("tourist_trap_alternatives")
      .select("trap_destination_id, alternative_destination_id, destinations!tourist_trap_alternatives_trap_destination_id_fkey(name), destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)")
      .limit(20),
    // Current-month scores for the "Best Time to Visit" section. One row
    // per destination for this month — used to surface destinations where
    // NOW is genuinely 4-5/5 instead of the old alphabetical slice.
    supabase
      .from("destination_months")
      .select("destination_id, score, note")
      .eq("month", currentMonth),
  ]);

  return {
    destinations: dests ?? [],
    comparisons: pairs ?? [],
    monthScores: monthScores ?? [],
    currentMonth,
  };
}

export default async function GuidesPage() {
  const { destinations, comparisons, monthScores, currentMonth } = await getGuideData();

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-64 overflow-hidden mb-8">
        <Image
          src="/images/destinations/spiti-valley.jpg"
          alt="Travel guides hero"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-5xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
            Travel Intelligence
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl text-white drop-shadow-lg">
            Travel Guides
          </h1>
          <p className="mt-2 text-white/80">
            Data-driven guides for {destinations.length} destinations.
          </p>
        </div>
      </section>

      <main>
        <GuideContent destinations={destinations} comparisons={comparisons} monthScores={monthScores} currentMonth={currentMonth} />
      </main>

      <Footer />
    </div>
  );
}
