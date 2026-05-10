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

    if (type === "stays") {
      // Editor-curated stay picks joined with their parent destination name.
      // Only returns published picks with non-trivial why_nakshiq prose so the
      // social caption has a real differentiation hook.
      const { data } = await supabase
        .from("destination_stay_picks")
        .select("destination_id, slot, name, property_type, price_band, why_nakshiq, signature_experience, contact_only, destinations(name, state:states(name))")
        .eq("published", true)
        .not("why_nakshiq", "is", null)
        .order("refreshed_at", { ascending: false, nullsFirst: false })
        .limit(limit);
      const items = (data ?? []).map((s: any) => ({
        destination_id: s.destination_id,
        destination_name: s.destinations?.name,
        state: s.destinations?.state?.name,
        slot: s.slot,
        name: s.name,
        property_type: s.property_type,
        price_band: s.price_band,
        why_nakshiq: s.why_nakshiq,
        signature_experience: s.signature_experience,
        contact_only: s.contact_only,
        url: `${baseUrl}/en/destination/${s.destination_id}`,
        image: `${baseUrl}/images/destinations/${s.destination_id}.jpg`,
      }));
      return NextResponse.json({ type: "stays", count: items.length, data: items });
    }

    if (type === "emergency") {
      // Per-destination SOS data — only rows with a real local_helpers entry
      // (post the 2026-05-10 placeholder strip ~46 dests landed at `[]`).
      // Filter empties SQL-side via the JSONB length so the limit applies to
      // genuinely-populated rows. Helpers shape: [{name, role, contact, note}]
      const { data } = await supabase
        .from("emergency_sos")
        .select("destination_id, police, ambulance, nearest_hospital, nearest_hospital_km, women_helpline, tourist_helpline, mountain_rescue, rescue_contact, local_helpers, source_label, destinations(name, state:states(name))")
        .not("local_helpers", "is", null)
        .gt("local_helpers->>0", "")  // require at least one element in the JSONB array
        .order("verified_date", { ascending: false, nullsFirst: false })
        .limit(limit * 2);  // over-fetch since post-filter still drops `[]` rows
      const items = (data ?? [])
        .filter((e: any) => Array.isArray(e.local_helpers) && e.local_helpers.length > 0)
        .slice(0, limit)
        .map((e: any) => ({
          destination_id: e.destination_id,
          destination_name: e.destinations?.name,
          state: e.destinations?.state?.name,
          police: e.police,
          ambulance: e.ambulance,
          nearest_hospital: e.nearest_hospital,
          nearest_hospital_km: e.nearest_hospital_km,
          women_helpline: e.women_helpline,
          tourist_helpline: e.tourist_helpline,
          mountain_rescue: e.mountain_rescue,
          rescue_contact: e.rescue_contact,
          local_helpers: e.local_helpers,
          source_label: e.source_label,
          url: `${baseUrl}/en/destination/${e.destination_id}`,
          image: `${baseUrl}/images/destinations/${e.destination_id}.jpg`,
        }));
      return NextResponse.json({ type: "emergency", count: items.length, data: items });
    }

    if (type === "viral_eats") {
      // Eateries that have gone viral on social — different angle from local_eateries.
      // Caller can pass ?destination_id to scope.
      const destId = params.get("destination_id");
      let query = supabase
        .from("viral_eats")
        .select("id, destination_id, name, location, type, famous_for, viral_on, price_range, honest_review, destinations(name, state:states(name))")
        .order("name")
        .limit(limit);
      if (destId) {
        query = query.eq("destination_id", destId);
      }
      const { data } = await query;
      const items = (data ?? []).map((v: any) => ({
        id: v.id,
        destination_id: v.destination_id,
        destination_name: v.destinations?.name,
        state: v.destinations?.state?.name,
        name: v.name,
        location: v.location,
        type: v.type,
        famous_for: v.famous_for,
        viral_on: v.viral_on,
        price_range: v.price_range,
        honest_review: v.honest_review,
        url: `${baseUrl}/en/destination/${v.destination_id}`,
        image: `${baseUrl}/images/destinations/${v.destination_id}.jpg`,
      }));
      return NextResponse.json({ type: "viral_eats", count: items.length, data: items });
    }

    if (type === "camping") {
      // Camping spots filtered by current month in `open_months` (1-12 array).
      let query = supabase
        .from("camping_spots")
        .select("id, name, destination_id, elevation_m, open_months, permit_required, water_source, facilities, description, tags, destinations(name, state:states(name))")
        .order("name")
        .limit(limit);
      if (month) {
        query = query.contains("open_months", [month]);
      }
      const { data } = await query;
      const items = (data ?? []).map((c: any) => ({
        id: c.id,
        name: c.name,
        destination_id: c.destination_id,
        destination_name: c.destinations?.name,
        state: c.destinations?.state?.name,
        elevation_m: c.elevation_m,
        open_months: c.open_months,
        permit_required: c.permit_required,
        water_source: c.water_source,
        facilities: c.facilities,
        description: c.description,
        tags: c.tags,
        url: c.destination_id
          ? `${baseUrl}/en/destination/${c.destination_id}`
          : `${baseUrl}/en/camping`,
        image: c.destination_id
          ? `${baseUrl}/images/destinations/${c.destination_id}.jpg`
          : `${baseUrl}/images/collections/camping-india.jpg`,
      }));
      return NextResponse.json({ type: "camping", month, count: items.length, data: items });
    }

    if (type === "hidden_gems") {
      // High-confidence hidden gems — used for the "nobody talks about" reel angle.
      // confidence_score is INT 1-5 (NOT a 0-1 float). Filter >=4 so we only
      // post gems that survived editorial audit (high confidence).
      const { data } = await supabase
        .from("hidden_gems")
        .select("id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, social_proof, confidence_score, tags, destinations:destinations!hidden_gems_near_destination_id_fkey(name, state:states(name))")
        .gte("confidence_score", 4)
        .order("confidence_score", { ascending: false })
        .limit(limit);
      const items = (data ?? []).map((g: any) => ({
        id: g.id,
        near_destination_id: g.near_destination_id,
        near_destination_name: g.destinations?.name,
        state: g.destinations?.state?.name,
        name: g.name,
        distance_km: g.distance_km,
        drive_time: g.drive_time,
        why_unknown: g.why_unknown,
        why_go: g.why_go,
        difficulty: g.difficulty,
        social_proof: g.social_proof,
        confidence_score: g.confidence_score,
        tags: g.tags,
        url: g.near_destination_id ? `${baseUrl}/en/destination/${g.near_destination_id}` : `${baseUrl}/en/explore`,
        image: g.near_destination_id ? `${baseUrl}/images/destinations/${g.near_destination_id}.jpg` : null,
      }));
      return NextResponse.json({ type: "hidden_gems", count: items.length, data: items });
    }

    return NextResponse.json({ error: `Unknown type: ${type}. Valid: destinations, articles, stats, traps, collections, festivals, routes, treks, eateries, stays, emergency, viral_eats, camping, hidden_gems` }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
