import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TripBoard } from "@/components/trip-board";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "My Trip Board — Plan, Organize, Share",
    description:
      "Build your trip board with destinations, routes, and notes. Share with friends, export as PDF, and get AI recommendations.",
    ...localeAlternates(locale, "/trip"),
  };
}

async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  // 491 destinations fits well under the Supabase 1000-row cap (per
  // feedback_supabase_row_cap.md). The destination_months join returns
  // 12 rows per dest = ~5,892 nested rows total — Supabase returns these
  // inside the parent rows so the cap doesn't apply per-child. If the
  // destination count crosses 1000, switch to RPC-driven fetch.
  const { data } = await supabase
    .from("destinations")
    .select(
      "id, name, difficulty, elevation_m, daily_cost, vehicle_fit, family_stress, state:states(name), destination_months(month, score), festivals(name, month)"
    )
    .order("name");

  return data ?? [];
}

export default async function TripPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Suspense required because TripBoard's index.tsx calls useSearchParams() —
            Next.js bails static generation otherwise. */}
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          <TripBoard destinations={destinations as unknown as TripBoardDest[]} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Local type — mirrors what the destinations select returns. The component
// has its own internal lite type; this is just for the cast.
type TripBoardDest = {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  festivals: { name: string; month: number | null }[] | null;
  daily_cost?: Record<string, unknown> | null;
};
