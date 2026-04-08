import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { RouteDetail } from "@/components/route-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase.from("routes").select("name, days, difficulty, highlights").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — ${data.days}-Day Road Trip`,
    description: `${data.days}-day ${data.difficulty} road trip. ${data.highlights?.slice(0, 3).join(", ") || ""}. Day-by-day itinerary with stops, distances, and tips.`,
  };
}

async function getRoute(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const [routeData, allRoutes] = await Promise.all([
    supabase.from("routes").select("*").eq("id", id).single(),
    supabase.from("routes").select("id, name").order("name"),
  ]);
  if (!routeData.data) return null;
  return { ...routeData.data, allRoutes: allRoutes.data ?? [] };
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
        <PrevNextNav
          items={route.allRoutes}
          currentId={id}
          basePath="routes"
          backLabel="All Routes"
          backHref="routes"
        />
      </main>
    </div>
  );
}
