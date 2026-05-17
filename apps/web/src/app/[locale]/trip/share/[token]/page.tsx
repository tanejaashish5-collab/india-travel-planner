// Read-only shared trip board — Phase 5.
//
// Anyone with a /trip/share/{token} URL hits this page. No auth required:
// migration 042 exposes a SECURITY DEFINER `get_shared_trip_board(token)`
// function that returns the payload jsonb without leaking the rest of the
// table. RLS still blocks `SELECT * FROM trip_boards` for anon.
//
// The page hydrates a `<TripBoardReadOnly>` shell that re-uses the same
// dark editorial design tokens (.nakshiq-trip-board scope), but disables
// every editing affordance: no LibraryPanel, no rename input on the trip
// header, no ↑↓✕ controls on stop cards, no AI modal, no drag on the
// year band.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { TripBoardReadOnly, type ReadOnlyDest } from "@/components/trip-board/read-only";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Shared Trip Board — NakshIQ",
    description: "View a NakshIQ trip board someone shared with you. Plan your own at nakshiq.com/trip.",
    ...localeAlternates(locale, "/trip/share"),
    robots: { index: false, follow: false },
  };
}

type SharedRow = {
  id: string;
  payload: {
    name?: string;
    month?: number;
    travelers?: number;
    budget?: string;
    stops?: { destinationId: string; days: number; notes: string; order: number; startDay: number }[];
    items?: { destinationId: string; days: number; notes: string; order: number }[];
    createdAt?: string;
    version?: number;
  };
  updated_at: string;
};

async function fetchSharedBoard(token: string): Promise<SharedRow | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data, error } = await supabase.rpc("get_shared_trip_board", { token });
  if (error || !data || (Array.isArray(data) && data.length === 0)) return null;
  // RPC returns a setof; supabase-js gives an array.
  return Array.isArray(data) ? (data[0] as SharedRow) : (data as SharedRow);
}

async function fetchDestsForStops(stopIds: string[]): Promise<ReadOnlyDest[]> {
  if (stopIds.length === 0) return [];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const [destResult, coordsResult] = await Promise.all([
    supabase
      .from("destinations")
      .select(
        "id, name, difficulty, elevation_m, state:states(name), destination_months(month, score), festivals(name, month)",
      )
      .in("id", stopIds),
    supabase.from("destinations_with_coords").select("id, lat, lng").in("id", stopIds),
  ]);
  const coordsById = new Map<string, { lat: number | null; lng: number | null }>(
    (coordsResult.data ?? []).map((c) => [c.id, { lat: c.lat, lng: c.lng }]),
  );
  type DestRow = NonNullable<typeof destResult.data>[number];
  return (destResult.data ?? []).map((d: DestRow) => {
    const stateName = Array.isArray(d.state)
      ? (d.state[0] as { name: string } | undefined)?.name ?? null
      : (d.state as { name: string } | null)?.name ?? null;
    const coords = coordsById.get(d.id);
    return {
      id: d.id,
      name: d.name,
      difficulty: d.difficulty,
      elevation_m: d.elevation_m,
      state: stateName ? { name: stateName } : null,
      destination_months: d.destination_months ?? null,
      festivals: d.festivals ?? null,
      lat: coords?.lat ?? null,
      lng: coords?.lng ?? null,
    };
  });
}

export default async function TripSharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // Sanitise — share tokens are 16-char hex, anything else is bot/probe noise.
  if (!token || !/^[a-f0-9]{8,32}$/i.test(token)) notFound();

  const board = await fetchSharedBoard(token);
  if (!board) notFound();

  const stops = (board.payload.stops ?? board.payload.items ?? []).map((s, idx) => ({
    destinationId: s.destinationId,
    days: s.days ?? 3,
    notes: s.notes ?? "",
    order: s.order ?? idx,
    startDay: "startDay" in s && typeof s.startDay === "number" ? s.startDay : 1 + idx * 3,
  }));

  const stopIds = stops.map((s) => s.destinationId);
  const destinations = await fetchDestsForStops(stopIds);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <main>
        <TripBoardReadOnly
          name={board.payload.name ?? "Shared trip board"}
          month={typeof board.payload.month === "number" ? board.payload.month : 1}
          stops={stops}
          destinations={destinations}
          updatedAt={board.updated_at}
        />
      </main>
      <Footer />
    </div>
  );
}
