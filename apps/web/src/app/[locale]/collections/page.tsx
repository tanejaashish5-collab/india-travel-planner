import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionsGrid } from "@/components/collections-grid";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Collections — Themed Destination Lists",
  description: "Themed collections: best family destinations, frozen wonders, most dangerous roads, zero-signal zones, ancient monasteries, and more. Hand-picked from 700+ places.",

    ...localeAlternates(locale, "/collections"),
  };
}async function getCollections() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase.from("collections").select("*").order("name");
  return data ?? [];
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="mt-1 text-muted-foreground">
            {collections.length} themed lists of India's most special places
          </p>
        </div>
        <CollectionsGrid collections={collections} />
      </main>
      <Footer />
    </div>
  );
}
