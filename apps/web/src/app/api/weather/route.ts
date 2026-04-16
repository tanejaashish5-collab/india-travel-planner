import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Cache weather data for 30 minutes
const cache = new Map<string, { data: any; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 min

export async function GET(req: NextRequest) {
  const destId = req.nextUrl.searchParams.get("id");
  if (!destId) {
    return NextResponse.json({ error: "Missing destination id" }, { status: 400 });
  }

  // Check cache
  const cached = cache.get(destId);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.data);
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Weather API not configured. Add OPENWEATHER_API_KEY." }, { status: 503 });
  }

  // Get coords from Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);
  const { data: coordData } = await supabase
    .from("destinations_with_coords")
    .select("lat, lng")
    .eq("id", destId)
    .single();

  if (!coordData?.lat || !coordData?.lng) {
    return NextResponse.json({ error: "No coordinates for this destination" }, { status: 404 });
  }

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordData.lat}&lon=${coordData.lng}&units=metric&appid=${apiKey}`
    );

    if (!weatherRes.ok) {
      return NextResponse.json({ error: "Weather API error" }, { status: 502 });
    }

    const weather = await weatherRes.json();

    const result = {
      temp: Math.round(weather.main?.temp),
      feels_like: Math.round(weather.main?.feels_like),
      humidity: weather.main?.humidity,
      description: weather.weather?.[0]?.description,
      icon: weather.weather?.[0]?.icon,
      wind_speed: Math.round(weather.wind?.speed * 3.6), // m/s to km/h
      visibility: weather.visibility ? Math.round(weather.visibility / 1000) : null,
      clouds: weather.clouds?.all,
      updated: new Date().toISOString(),
    };

    // Cache
    cache.set(destId, { data: result, expires: Date.now() + CACHE_TTL });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
