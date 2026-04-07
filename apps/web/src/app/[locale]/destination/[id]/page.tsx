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

  return { ...data, hidden_gems: gems ?? [] };
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
      <DestinationDetail dest={dest} />
    </div>
  );
}
