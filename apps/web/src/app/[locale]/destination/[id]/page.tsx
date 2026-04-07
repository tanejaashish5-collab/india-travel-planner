import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationDetail } from "@/components/destination-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("name, tagline, difficulty, elevation_m, translations, state:states(name)")
    .eq("id", id)
    .single();

  if (!data) return {};

  const name = (locale !== "en" && (data.translations as any)?.[locale]?.name) || data.name;
  const tagline = (locale !== "en" && (data.translations as any)?.[locale]?.tagline) || data.tagline;
  const stateData = data.state as any;
  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;

  const title = `${name} — ${stateName || "India"} Travel Guide`;
  const description = `${tagline} | ${data.difficulty} difficulty${data.elevation_m ? ` · ${data.elevation_m}m` : ""}. Monthly scores, kids ratings, safety data & more.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/images/destinations/${id}.jpg`],
    },
  };
}

async function getDestination(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("destinations")
    .select(`
      *,
      state:states(name),
      kids_friendly(*),
      confidence_cards(*),
      destination_months(*),
      sub_destinations(*),
      local_legends(*),
      viral_eats(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("*")
    .eq("near_destination_id", id);

  const { data: trapAlts } = await supabase
    .from("tourist_trap_alternatives")
    .select(`
      *,
      destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(
        name, tagline, difficulty, elevation_m
      )
    `)
    .eq("trap_destination_id", id)
    .order("rank");

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*")
    .eq("destination_id", id)
    .order("month");

  return {
    ...data,
    hidden_gems: gems ?? [],
    trap_alternatives: trapAlts ?? [],
    festivals: festivals ?? [],
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const dest = await getDestination(id);
  if (!dest) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Tourist Trap now rendered INSIDE DestinationDetail as assistive section */}
        <DestinationDetail dest={dest} />
      </main>
    </div>
  );
}
