import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FestivalsContent } from "@/components/festivals-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Festivals & Events — 168 Festivals Across India",
  description: "Time your trip around India's most spectacular festivals. Pushkar Camel Fair, Dev Deepawali, Hemis Festival, Tulip Festival, and 160+ more with dates and destinations.",
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
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Festivals & Events</h1>
          <p className="mt-2 text-muted-foreground text-lg">
            {festivals.length} festivals across North India — time your trip around something extraordinary
          </p>
        </div>
        <FestivalsContent festivals={festivals} />
      </main>
      <Footer />
    </div>
  );
}
