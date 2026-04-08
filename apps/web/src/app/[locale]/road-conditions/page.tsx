import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoadConditionsContent } from "@/components/road-conditions-content";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Road Conditions — Live Highway Status",
  description: "Current road conditions for major North India highway segments. Manali-Leh, Srinagar-Leh, Char Dham roads, Spiti circuit, and more. Updated regularly.",
};

async function getRoadReports() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("road_reports")
    .select("*, destinations(name)")
    .order("segment");

  return data ?? [];
}

export default async function RoadConditionsPage() {
  const reports = await getRoadReports();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Road Conditions</h1>
          <p className="mt-1 text-muted-foreground">
            {reports.length} highway segments — check before you drive
          </p>
        </div>
        <RoadConditionsContent reports={reports} />
      </main>
      <Footer />
    </div>
  );
}
