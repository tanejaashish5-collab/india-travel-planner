import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoutesGrid } from "@/components/routes-grid";
import { createClient } from "@supabase/supabase-js";

async function getRoutes() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase.from("routes").select("*").order("days");
  return data ?? [];
}

export default async function RoutesPage() {
  const routes = await getRoutes();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Routes</h1>
          <p className="mt-1 text-muted-foreground">
            {routes.length} curated itineraries from 3-day weekends to 12-day
            road trips
          </p>
        </div>
        <RoutesGrid routes={routes} />
      </main>
      <Footer />
    </div>
  );
}
