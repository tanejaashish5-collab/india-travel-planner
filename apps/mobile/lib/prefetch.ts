/**
 * Sprint 13b — first-launch prefetch.
 * Pre-warms the cache with the user's most-likely-needed data so the app
 * keeps working when 4G drops mid-trip. Mirrors the web PWA's
 * PRECACHE_ROUTES pattern from sw.js.
 */
import { supabase } from "./supabase";
import { prefetch, TTL } from "./cache";

export async function prefetchCoreContent(): Promise<void> {
  const currentMonth = new Date().getMonth() + 1;

  await prefetch([
    // Home — featured destinations for current month
    {
      key: `home:featured:${currentMonth}`,
      fetcher: async () => {
        const { data } = await supabase
          .from("destination_months")
          .select(
            "destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))",
          )
          .eq("month", currentMonth)
          .gte("score", 4)
          .order("score", { ascending: false })
          .limit(12);
        return data ?? [];
      },
    },
    // SOS reference data — emergency numbers + nearest hospitals (rarely changes)
    {
      key: "sos:national",
      fetcher: async () => {
        const { data } = await supabase
          .from("emergency_sos")
          .select("destination_id, police, ambulance, fire, hospital_name, hospital_phone, hospital_distance_km")
          .limit(50);
        return data ?? [];
      },
    },
    // Active road reports — short TTL (1h) but worth pre-warming
    {
      key: "road-conditions:active",
      fetcher: async () => {
        const { data } = await supabase
          .from("road_reports")
          .select("*")
          .eq("status", "active")
          .order("updated_at", { ascending: false })
          .limit(50);
        return data ?? [];
      },
    },
    // Top 30 destinations (overall list)
    {
      key: "destinations:top30",
      fetcher: async () => {
        const { data } = await supabase
          .from("destinations")
          .select("id, name, tagline, difficulty, elevation_m, tags, best_months, state_id, state:states(name)")
          .order("name")
          .limit(30);
        return data ?? [];
      },
    },
    // States list (rare changes — long TTL)
    {
      key: "states:all",
      fetcher: async () => {
        const { data } = await supabase
          .from("states")
          .select("id, name, region, capital, description, hero_image_url, display_order")
          .order("display_order");
        return data ?? [];
      },
    },
  ]);
}

/**
 * Drain any queued offline mutations. Called from _layout when a
 * disconnected → connected transition is detected.
 */
import { drain, Dispatch } from "./offline-queue";

export async function drainOfflineQueue(): Promise<{ succeeded: number; remaining: number }> {
  const dispatch: Dispatch = {
    "save_destination": async (args) => {
      const userId = args.userId as string;
      const destinationId = args.destinationId as string;
      const { error } = await supabase
        .from("saved_destinations")
        .insert({ user_id: userId, destination_id: destinationId });
      if (error && error.code !== "23505") throw error; // ignore duplicates
    },
    "unsave_destination": async (args) => {
      const userId = args.userId as string;
      const destinationId = args.destinationId as string;
      const { error } = await supabase
        .from("saved_destinations")
        .delete()
        .eq("user_id", userId)
        .eq("destination_id", destinationId);
      if (error) throw error;
    },
    "mark_visited": async (args) => {
      const userId = args.userId as string;
      const destinationId = args.destinationId as string;
      const visitedAt = (args.visitedAt as string) ?? new Date().toISOString();
      const { error } = await supabase
        .from("visited_destinations")
        .insert({ user_id: userId, destination_id: destinationId, visited_at: visitedAt });
      if (error && error.code !== "23505") throw error;
    },
  };

  const result = await drain(dispatch);
  return { succeeded: result.succeeded, remaining: result.remaining };
}
