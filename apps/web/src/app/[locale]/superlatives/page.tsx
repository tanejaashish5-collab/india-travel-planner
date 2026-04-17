import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SuperlativesContent } from "@/components/superlatives-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "India's Records & Firsts — Superlatives",
  description: "The highest, oldest, most dangerous, and most unique places in India. 25 superlative records with destinations and details.",

    ...localeAlternates(locale, "/superlatives"),
  };
}async function getSuperlatives() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("superlatives")
    .select("*, destinations(name, tagline, difficulty, elevation_m)")
    .order("title");

  return data ?? [];
}

export default async function SuperlativesPage() {
  const superlatives = await getSuperlatives();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <Image src="/images/destinations/leh.jpg" alt="Superlatives & Records" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">India's Records</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Superlatives & Records</h1>
          <p className="mt-2 text-white/80 max-w-xl">{superlatives.length} superlatives — the highest, oldest, most dangerous, and most unique places in India</p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <SuperlativesContent superlatives={superlatives} />
      </main>
      <Footer />
    </div>
  );
}
