import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PermitsContent } from "@/components/permits-content";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Permits & Passes — Do I Need a Permit?",
  description: "Complete guide to Inner Line Permits, Protected Area Permits, national park entries, and trek registrations for North India. Costs, processing times, and pro tips.",
};

async function getPermits() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("permits")
    .select("*, destinations(name)")
    .order("destination_id");

  return data ?? [];
}

export default async function PermitsPage() {
  const permits = await getPermits();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <Image src="/images/destinations/pangong-lake.jpg" alt="Permits & Passes" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Know Before You Go</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Permits & Passes</h1>
          <p className="mt-2 text-white/80 max-w-xl">{permits.length} permits across India — know before you go</p>
        </div>
      </section>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <PermitsContent permits={permits} />
      </main>
      <Footer />
    </div>
  );
}
