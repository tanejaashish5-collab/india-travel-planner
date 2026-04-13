import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FestivalsContent } from "@/components/festivals-content";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Festivals & Events — 183 Festivals Across India",
  description: "Time your trip around India's most spectacular festivals. Pushkar Camel Fair, Dev Deepawali, Hemis Festival, Tulip Festival, and 180+ more with dates and destinations.",
};

async function getFestivals() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("festivals")
    .select("*, destinations(name)")
    .order("month")
    .order("name");

  return data ?? [];
}

export default async function FestivalsPage() {
  const festivals = await getFestivals();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <Image src="/images/destinations/pushkar.jpg" alt="Festivals & Events" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Cultural Calendar</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Festivals & Events</h1>
          <p className="mt-2 text-white/80 max-w-xl">{festivals.length} festivals across India — time your trip around something extraordinary</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <FestivalsContent festivals={festivals} />
      </main>
      <Footer />
    </div>
  );
}
