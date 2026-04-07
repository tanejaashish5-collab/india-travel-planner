import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SuperlativesContent } from "@/components/superlatives-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "India's Records & Firsts — Superlatives",
  description: "The highest, oldest, most dangerous, and most unique places in North India. 25 superlative records with destinations and details.",
};

async function getSuperlatives() {
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
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">India's Records & Firsts</h1>
          <p className="mt-1 text-muted-foreground">
            {superlatives.length} superlatives — the highest, oldest, most dangerous, and most unique places in North India
          </p>
        </div>
        <SuperlativesContent superlatives={superlatives} />
      </main>
      <Footer />
    </div>
  );
}
