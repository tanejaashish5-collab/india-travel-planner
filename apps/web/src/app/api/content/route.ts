import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveCover } from "@/lib/collection-covers";
import { videoSrc } from "@/lib/video-url";
import { currentMonthIST } from "@itp/shared";

export const runtime = "edge";

/**
 * Public content API for the NakshIQ Social Media Agent.
 *
 * GET /api/content
 *   Returns a feed of recent/updated content for social media repurposing.
 *
 * Query params:
 *   ?type=destinations|articles|stats|traps|collections|festivals
 *   ?since=2026-04-10  (ISO date — only items updated/published after this)
 *   ?limit=20           (default 20, max 100)
 *   ?month=4            (filter destinations by current-month score)
 *   ?min_score=4        (only destinations scoring >= this in given month)
 *   ?max_score=2        (only destinations scoring <= this in given month)
 */
export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);
  const params = req.nextUrl.searchParams;
  const type = params.get("type") || "destinations";
  const since = params.get("since");
  const limit = Math.min(Number(params.get("limit") || 20), 100);
  const month = Number(params.get("month") || currentMonthIST());
  const minScore = Number(params.get("min_score") || 0);
  const maxScore = Number(params.get("max_score") || 0);

  const baseUrl = "https://www.nakshiq.com";

  try {
    if (type === "stats") {
      const [dests, subs, gems, routes, fests, colls, treks, states, traps, permits, camping] =
        await Promise.all([
          supabase.from("destinations").select("*", { count: "exact", head: true }),
          supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
          supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
          supabase.from("routes").select("*", { count: "exact", head: true }),
          supabase.from("festivals").select("*", { count: "exact", head: true }),
          supabase.from("collections").select("*", { count: "exact", head: true }),
          supabase.from("treks").select("*", { count: "exact", head: true }),
          supabase.from("states").select("*", { count: "exact", head: true }),
          supabase.from("tourist_trap_alternatives").select("*", { count: "exact", head: true }),
          supabase.from("permits").select("*", { count: "exact", head: true }),
          supabase.from("camping_spots").select("*", { count: "exact", head: true }),
        ]);

      return NextResponse.json({
        type: "stats",
        data: {
          destinations: dests.count ?? 0,
          places: (dests.count ?? 0) + (subs.count ?? 0) + (gems.count ?? 0),
          routes: routes.count ?? 0,
          festivals: fests.count ?? 0,
          collections: colls.count ?? 0,
          treks: treks.count ?? 0,
          states: states.count ?? 0,
          traps: traps.count ?? 0,
          permits: permits.count ?? 0,
          campingSpots: camping.count ?? 0,
        },
      });
    }

    if (type === "destinations") {
      // Get destinations with their current-month score
      let query = supabase
        .from("destination_months")
        .select(
          "month, score, note, destination_id, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))"
        )
        .eq("month", month)
        .order("score", { ascending: false })
        .limit(limit);

      if (minScore > 0) {
        query = query.gte("score", minScore);
      }
      if (maxScore > 0) {
        query = query.lte("score", maxScore);
      }

      const { data } = await query;

      const items = (data ?? []).map((dm: any) => {
        const d = dm.destinations;
        return {
          id: d.id,
          name: d.name,
          tagline: d.tagline,
          difficulty: d.difficulty,
          elevation_m: d.elevation_m,
          state: d.state?.name,
          month,
          score: dm.score,
          note: dm.note,
          url: `${baseUrl}/en/destination/${d.id}`,
          image: `${baseUrl}/images/destinations/${d.id}.jpg`,
          video: videoSrc(d.id),
        };
      });

      return NextResponse.json({ type: "destinations", month, count: items.length, data: items });
    }

    if (type === "articles") {
      let query = supabase
        .from("articles")
        .select("slug, title, category, excerpt, reading_time, published_at, cover_image_url, tags, destinations")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (since) {
        query = query.gte("published_at", since);
      }

      const { data } = await query;

      const items = (data ?? []).map((a: any) => ({
        ...a,
        url: `${baseUrl}/en/blog/${a.slug}`,
        image: a.cover_image_url ? `${baseUrl}${a.cover_image_url}` : null,
      }));

      return NextResponse.json({ type: "articles", count: items.length, data: items });
    }

    if (type === "traps") {
      const { data } = await supabase
        .from("tourist_trap_alternatives")
        .select(
          "trap_destination_id, reason, alternative_destination_id, alternative_reason, rank, destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)"
        )
        .order("rank")
        .limit(limit);

      // Also get trap destination names
      const trapIds = [...new Set((data ?? []).map((t: any) => t.trap_destination_id))];
      const { data: trapDests } = await supabase
        .from("destinations")
        .select("id, name")
        .in("id", trapIds);

      const trapNames = Object.fromEntries((trapDests ?? []).map((d: any) => [d.id, d.name]));

      const items = (data ?? []).map((t: any) => ({
        trap: { id: t.trap_destination_id, name: trapNames[t.trap_destination_id] ?? t.trap_destination_id },
        reason: t.reason,
        alternative: {
          id: t.alternative_destination_id,
          name: t.destination?.name ?? t.alternative_destination_id,
          reason: t.alternative_reason,
        },
        url: `${baseUrl}/en/tourist-traps`,
        image: `${baseUrl}/images/destinations/${t.alternative_destination_id}.jpg`,
      }));

      return NextResponse.json({ type: "traps", count: items.length, data: items });
    }

    if (type === "collections") {
      const { data } = await supabase
        .from("collections")
        .select("id, name, description, items, tags")
        .order("name")
        .limit(limit);

      const items = (data ?? []).map((c: any) => ({
        ...c,
        itemCount: (c.items ?? []).length,
        url: `${baseUrl}/en/collections/${c.id}`,
        image: `${baseUrl}${resolveCover(c)}`,
      }));

      return NextResponse.json({ type: "collections", count: items.length, data: items });
    }

    if (type === "festivals") {
      let query = supabase
        .from("festivals")
        .select("id, name, month, description, destination_id, destinations(name)")
        .order("month")
        .limit(limit);

      if (month) {
        query = query.eq("month", month);
      }

      const { data } = await query;

      const items = (data ?? []).map((f: any) => ({
        ...f,
        destination_name: f.destinations?.name,
        url: `${baseUrl}/en/festivals`,
      }));

      return NextResponse.json({ type: "festivals", month, count: items.length, data: items });
    }

    if (type === "routes") {
      // Multi-destination road trip routes (e.g. Manali-Leh, Char Dham).
      // Filter by month — routes with the current month in best_months are surfaced first.
      let query = supabase
        .from("routes")
        .select("id, name, days, difficulty, best_months, stops, description, kids_suitable, bike_route, budget_range, highlights")
        .order("days")
        .limit(limit);
      if (month) {
        query = query.contains("best_months", [month]);
      }
      const { data } = await query;
      const items = (data ?? []).map((r: any) => ({
        ...r,
        url: `${baseUrl}/en/build-route?route=${r.id}`,
        image: `${baseUrl}/images/routes/${r.id}.jpg`,
      }));
      return NextResponse.json({ type: "routes", month, count: items.length, data: items });
    }

    if (type === "treks") {
      // Solo/group treks. Filter by month and difficulty similar to routes.
      const difficulty = params.get("difficulty");
      let query = supabase
        .from("treks")
        .select("id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, permits_required, kids_suitable, fitness_level, description, highlights, destinations(name)")
        .order("max_altitude_m", { ascending: false })
        .limit(limit);
      if (month) {
        query = query.contains("best_months", [month]);
      }
      if (difficulty) {
        query = query.eq("difficulty", difficulty);
      }
      const { data } = await query;
      const items = (data ?? []).map((t: any) => ({
        id: t.id,
        name: t.name,
        destination_id: t.destination_id,
        destination_name: t.destinations?.name,
        difficulty: t.difficulty,
        duration_days: t.duration_days,
        max_altitude_m: t.max_altitude_m,
        distance_km: t.distance_km,
        best_months: t.best_months,
        permits_required: t.permits_required,
        kids_suitable: t.kids_suitable,
        fitness_level: t.fitness_level,
        description: t.description,
        highlights: t.highlights,
        url: t.destination_id
          ? `${baseUrl}/en/destination/${t.destination_id}`
          : `${baseUrl}/en/explore`,
        image: `${baseUrl}/images/treks/${t.id}.jpg`,
      }));
      return NextResponse.json({ type: "treks", month, count: items.length, data: items });
    }

    if (type === "eateries") {
      // Surfaces only legendary / well-verified eateries by default. Caller can
      // pass ?destination_id=<id> to scope to one place.
      const destId = params.get("destination_id");
      let query = supabase
        .from("local_eateries")
        .select("id, destination_id, name, area, cuisine, category, signature_dish, must_try, price_range, vegetarian, kid_friendly, established_year, why_it_matters, insider_tip, is_legendary, last_verified")
        .eq("is_active", true)
        .order("is_legendary", { ascending: false })
        .order("established_year", { nullsFirst: false })
        .limit(limit);
      if (destId) {
        query = query.eq("destination_id", destId);
      }
      const { data } = await query;
      const items = (data ?? []).map((e: any) => ({
        ...e,
        url: e.destination_id ? `${baseUrl}/en/destination/${e.destination_id}` : `${baseUrl}/en`,
      }));
      return NextResponse.json({ type: "eateries", count: items.length, data: items });
    }

    return NextResponse.json({ error: `Unknown type: ${type}. Valid: destinations, articles, stats, traps, collections, festivals, routes, treks, eateries` }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
