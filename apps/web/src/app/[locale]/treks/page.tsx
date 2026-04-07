import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";

async function getTrekDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, state:states(name)")
    .contains("tags", ["trek"])
    .order("name");
  return data ?? [];
}

export default async function TreksPage() {
  const trekDests = await getTrekDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Treks</h1>
          <p className="mt-1 text-muted-foreground">
            Trekking destinations across North India
          </p>
        </div>
        <TreksContent trekDests={trekDests} />
      </main>
      <Footer />
    </div>
  );
}
