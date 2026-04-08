import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PermitsContent } from "@/components/permits-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Permits & Passes — Do I Need a Permit?",
  description: "Complete guide to Inner Line Permits, Protected Area Permits, national park entries, and trek registrations for North India. Costs, processing times, and pro tips.",
};

async function getPermits() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("permits")
    .select("*, destinations(name)")
    .order("destination_id");

  return data ?? [];
}

export default async function PermitsPage() {
  const permits = await getPermits();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Permits & Passes</h1>
          <p className="mt-1 text-muted-foreground">
            {permits.length} permits across North India — know before you go
          </p>
        </div>
        <PermitsContent permits={permits} />
      </main>
      <Footer />
    </div>
  );
}
