import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionDetail } from "@/components/collection-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase.from("collections").select("name, description").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — Curated Collection`,
    description: data.description,
  };
}

async function getCollection(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) return null;

  const destIds = (data.items ?? []).map((i: any) => i.destination_id);
  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, state:states(name)")
    .in("id", destIds);

  return { ...data, destinations: dests ?? [] };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await getCollection(id);
  if (!collection) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <CollectionDetail collection={collection} />
      </main>
      <Footer />
    </div>
  );
}
