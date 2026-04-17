import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StaysContent } from "@/components/stays-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Stay Intelligence — Where to Stay, Not Where to Book",
  description: "Decision-grade accommodation guidance for every destination. Best zones by traveler type, budget bands, stay types, and honest avoid-this warnings. Not a booking site.",

    ...localeAlternates(locale, "/stays"),
  };
}async function getStayData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, stay_zones, food_scene, workability, vehicle_fit, family_stress, difficulty, elevation_m, state:states(name)")
    .not("stay_zones", "eq", "{}")
    .not("vehicle_fit", "is", null)
    .order("name");

  return data ?? [];
}

export default async function StaysPage() {
  const destinations = await getStayData();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <Image src="/images/destinations/tirthan-valley.jpg" alt="Local Stays" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Where to Stay</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Local Stays</h1>
          <p className="mt-2 text-white/80 max-w-xl">Decision-grade accommodation intelligence. Best zones, budget reality, and honest warnings — not hotel listings.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <StaysContent destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
