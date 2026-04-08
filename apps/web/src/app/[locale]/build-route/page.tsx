import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RouteBuilder } from "@/components/route-builder";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Build Your Route — Custom Trip Builder",
  description: "Pick destinations, we'll sequence them by drive time and season fit. Build your perfect North India road trip.",
};

async function getDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state_id, difficulty, elevation_m, state:states(name), destination_months(month, score)")
    .order("name");

  return data ?? [];
}

export default async function BuildRoutePage() {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <RouteBuilder destinations={destinations} />
      </main>
      <Footer />
    </div>
  );
}
