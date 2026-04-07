import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Destination,
  MonthlySuitability,
  KidsFriendly,
  ConfidenceCard,
  SubDestination,
  HiddenGem,
  LocalLegend,
  ViralEat,
  Route,
  Trek,
  CampingSpot,
  Collection,
  Superlative,
  State,
} from "../types";

// --- Destination Queries ---

/** Get all destinations with optional filters */
export async function getDestinations(
  supabase: SupabaseClient,
  filters?: {
    state_id?: string;
    difficulty?: string;
    month?: number;
    min_score?: number;
    kids_only?: boolean;
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
  },
) {
  let query = supabase
    .from("destinations")
    .select(`
      *,
      kids_friendly (*),
      destination_months (*)
    `)
    .order("name");

  if (filters?.state_id) {
    query = query.eq("state_id", filters.state_id);
  }
  if (filters?.difficulty) {
    query = query.eq("difficulty", filters.difficulty);
  }
  if (filters?.tags && filters.tags.length > 0) {
    query = query.overlaps("tags", filters.tags);
  }
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%,region.ilike.%${filters.search}%`,
    );
  }
  if (filters?.kids_only) {
    query = query.not("kids_friendly", "is", null);
  }
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.range(
      filters.offset,
      filters.offset + (filters?.limit ?? 50) - 1,
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  // Post-filter by month score if needed
  if (filters?.month && filters?.min_score) {
    return (data ?? []).filter((d: Destination & { destination_months: MonthlySuitability[] }) => {
      const monthData = d.destination_months?.find(
        (m: MonthlySuitability) => m.month === filters.month,
      );
      return monthData && monthData.score >= (filters.min_score ?? 3);
    });
  }

  return data ?? [];
}

/** Get a single destination with all related data */
export async function getDestination(
  supabase: SupabaseClient,
  id: string,
) {
  const { data, error } = await supabase
    .from("destinations")
    .select(`
      *,
      kids_friendly (*),
      confidence_cards (*),
      destination_months (*),
      sub_destinations (*),
      local_legends (*),
      viral_eats (*),
      permits (*),
      festivals (*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  // Fetch hidden gems separately (linked by near_destination_id)
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("*")
    .eq("near_destination_id", id);

  return { ...data, hidden_gems: gems ?? [] };
}

/** Get all states */
export async function getStates(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("states")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as State[];
}

/** Get destinations suitable for a specific month */
export async function getDestinationsByMonth(
  supabase: SupabaseClient,
  month: number,
  minScore: number = 4,
) {
  const { data, error } = await supabase
    .from("destination_months")
    .select(`
      *,
      destinations (*)
    `)
    .eq("month", month)
    .gte("score", minScore)
    .order("score", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// --- Routes ---

export async function getRoutes(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("days");
  if (error) throw error;
  return data as Route[];
}

export async function getRoute(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Route;
}

// --- Treks ---

export async function getTreks(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("treks")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Trek[];
}

// --- Collections ---

export async function getCollections(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Collection[];
}

export async function getCollection(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Collection;
}

// --- Superlatives ---

export async function getSuperlatives(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("superlatives")
    .select("*")
    .order("title");
  if (error) throw error;
  return data as Superlative[];
}

// --- Road Reports ---

export async function getActiveRoadReports(
  supabase: SupabaseClient,
  destinationId?: string,
) {
  let query = supabase
    .from("road_reports")
    .select("*")
    .gt("expires_at", new Date().toISOString())
    .order("reported_at", { ascending: false });

  if (destinationId) {
    query = query.eq("destination_id", destinationId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
