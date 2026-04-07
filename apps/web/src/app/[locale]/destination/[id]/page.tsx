import { Nav } from "@/components/nav";
import { DestinationDetail } from "@/components/destination-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

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

  return {
    ...data,
    hidden_gems: gems ?? [],
    trap_alternatives: trapAlts ?? [],
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
