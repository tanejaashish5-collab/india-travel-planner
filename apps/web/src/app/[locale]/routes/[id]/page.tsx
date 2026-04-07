import { Nav } from "@/components/nav";
import { RouteDetail } from "@/components/route-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

async function getRoute(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("routes")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const route = await getRoute(id);
  if (!route) notFound();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <RouteDetail route={route} />
      </main>
    </div>
  );
}
