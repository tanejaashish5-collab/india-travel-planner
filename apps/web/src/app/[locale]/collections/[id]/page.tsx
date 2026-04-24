import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionDetail } from "@/components/collection-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string}> }): Promise<Metadata> {
  const { locale, id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {
  };
  const supabase = createClient(url, key);
  const { data } = await supabase.from("collections").select("name, description").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — Collection`,
    description: data.description,
    ...localeAlternates(locale, `/collections/${id}`),
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
  const contentType = data.content_type || "destinations";
  const showFood = ["food", "mixed"].includes(contentType);
  const showStays = ["stays", "mixed"].includes(contentType);
  const isCircuit = contentType === "circuit";

  const [destsResult, eatsResult, staysResult, coordsResult, allColls] = await Promise.all([
    supabase.from("destinations").select("id, name, tagline, difficulty, elevation_m, state:states(name)").in("id", destIds),
    showFood ? supabase.from("viral_eats").select("*").in("destination_id", destIds).order("name") : Promise.resolve({ data: [] }),
    showStays ? supabase.from("local_stays").select("*").in("destination_id", destIds).order("name") : Promise.resolve({ data: [] }),
    isCircuit ? supabase.from("destinations_with_coords").select("id, lat, lng").in("id", destIds) : Promise.resolve({ data: [] }),
    supabase.from("collections").select("id, name").order("name"),
  ]);

  const coordsMap = new Map<string, { lat: number; lng: number }>(
    (coordsResult.data ?? []).map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const destinationsEnriched = (destsResult.data ?? []).map((d: any) => ({
    ...d,
    coords: coordsMap.get(d.id) ?? null,
  }));

  return {
    ...data,
    destinations: destinationsEnriched,
    viral_eats: eatsResult.data ?? [],
    local_stays: staysResult.data ?? [],
    allCollections: allColls.data ?? [],
  };
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
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 md:pb-8">
        <CollectionDetail collection={collection} />
        <PrevNextNav
          items={collection.allCollections}
          currentId={id}
          basePath="collections"
          backLabel="All Collections"
          backHref="collections"
        />
      </main>
      <Footer />
    </div>
  );
}
