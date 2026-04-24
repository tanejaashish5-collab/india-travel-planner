/**
 * /api/weather-advisory — Sprint 6 live-data stub.
 *
 * Currently returns a structured stub response. Once IMD + CPCB API keys
 * are provisioned, this route will pull real-time:
 *   - IMD weather advisories (storms, heatwaves, floods, landslides)
 *   - CPCB AQI for the nearest monitoring station
 *   - Active state-advisory scrapes (Kerala tourism, Uttarakhand police)
 *
 * The shape is frozen so destination pages can bind to it today — the live
 * feed plugs into this contract without page-level changes.
 *
 * Setup (future):
 *   IMD_API_KEY=<key>                 (imd.gov.in public-API keys)
 *   CPCB_API_KEY=<data.gov.in key>    (data.gov.in CPCB datasets)
 *
 * Usage:
 *   GET /api/weather-advisory?dest=kaza
 *   GET /api/weather-advisory?lat=32.226&lon=78.072
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const revalidate = 1800; // 30 min — AQI changes by the hour, advisories less often

type Advisory = {
  source: "imd" | "cpcb" | "state";
  severity: "info" | "yellow" | "orange" | "red";
  kind: string;
  headline: string;
  detail: string;
  issued_at: string | null;
  valid_until: string | null;
};

type Response = {
  ok: true;
  destination_id: string | null;
  coords: { lat: number; lng: number } | null;
  advisories: Advisory[];
  aqi: {
    value: number | null;
    category: "good" | "satisfactory" | "moderate" | "poor" | "very-poor" | "severe" | null;
    station: string | null;
    measured_at: string | null;
  };
  source_note: string;
};

type ErrResponse = { ok: false; error: string };

function aqiCategory(v: number): Response["aqi"]["category"] {
  if (v <= 50)  return "good";
  if (v <= 100) return "satisfactory";
  if (v <= 200) return "moderate";
  if (v <= 300) return "poor";
  if (v <= 400) return "very-poor";
  return "severe";
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const destId = searchParams.get("dest");
  const latStr = searchParams.get("lat");
  const lonStr = searchParams.get("lon");

  let coords: { lat: number; lng: number } | null = null;
  let destinationId: string | null = null;

  if (destId) {
    destinationId = destId;
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("destinations")
        .select("id, coords")
        .eq("id", destId)
        .single();
      if (data?.coords) coords = data.coords as { lat: number; lng: number };
    }
  } else if (latStr && lonStr) {
    const lat = Number(latStr);
    const lon = Number(lonStr);
    if (!Number.isNaN(lat) && !Number.isNaN(lon)) coords = { lat, lng: lon };
  }

  // Live data branch — only active when env keys are provisioned
  const hasIMD = typeof process.env.IMD_API_KEY === "string" && process.env.IMD_API_KEY.length > 0;
  const hasCPCB = typeof process.env.CPCB_API_KEY === "string" && process.env.CPCB_API_KEY.length > 0;

  const advisories: Advisory[] = [];
  let aqi: Response["aqi"] = { value: null, category: null, station: null, measured_at: null };

  if (hasIMD && coords) {
    // TODO: replace with real IMD SMS / warning fetch once key provisioned
    // Example shape so destination UI can bind today:
    // const r = await fetch(`https://mausam.imd.gov.in/api/warnings?lat=${coords.lat}&lon=${coords.lng}`, {
    //   headers: { "x-api-key": process.env.IMD_API_KEY! },
    //   next: { revalidate: 1800 },
    // });
    // advisories.push(...parsed);
  }

  if (hasCPCB && coords) {
    // TODO: replace with data.gov.in CPCB nearest-station query
    // const r = await fetch(`https://api.data.gov.in/resource/cpcb-air-quality?...`, {
    //   headers: { "x-api-key": process.env.CPCB_API_KEY! },
    //   next: { revalidate: 1800 },
    // });
    // aqi = { value: parsed.aqi, category: aqiCategory(parsed.aqi), station: parsed.station, measured_at: parsed.measured_at };
  }

  const response: Response = {
    ok: true,
    destination_id: destinationId,
    coords,
    advisories,
    aqi,
    source_note: hasIMD && hasCPCB
      ? "Live: IMD + CPCB"
      : "Stub — IMD_API_KEY and/or CPCB_API_KEY not provisioned. Shape frozen; wire keys to activate live feed.",
  };

  return NextResponse.json(response, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}

// Unused but re-exported for potential POST from admin (manual advisory inject)
export async function POST(): Promise<NextResponse<ErrResponse>> {
  return NextResponse.json({ ok: false, error: "not_implemented" }, { status: 501 });
}
