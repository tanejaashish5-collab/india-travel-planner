import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  best_months: number[];
  state_id: string;
  vehicle_fit: string | null;
  family_stress: string | null;
  state: { name: string } | null;
  kids_friendly: { suitable: boolean; rating: number }[] | null;
  destination_months: { month: number; score: number; note: string }[] | null;
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("destinations")
        .select(`
          id, name, tagline, difficulty, elevation_m, tags, best_months, state_id,
          vehicle_fit, family_stress,
          state:states(name),
          kids_friendly(suitable, rating),
          destination_months(month, score, note)
        `)
        .order("name");

      setDestinations((data as any[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  return { destinations, loading };
}

export function useDestination(id: string) {
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("destinations")
        .select(`
          *,
          state:states(name),
          kids_friendly(*),
          confidence_cards(*),
          destination_months(*),
          sub_destinations(*),
          local_legends(*),
          viral_eats(*)
        `)
        .eq("id", id)
        .single();

      if (data) {
        // Also fetch related data
        const [gems, traps, festivals, stays, notes, coords] = await Promise.all([
          supabase.from("hidden_gems").select("*").eq("near_destination_id", id),
          supabase.from("tourist_trap_alternatives").select("*, destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name, tagline, difficulty, elevation_m)").eq("trap_destination_id", id).order("rank"),
          supabase.from("festivals").select("*").eq("destination_id", id).order("month"),
          supabase.from("local_stays").select("*").eq("destination_id", id).order("type"),
          supabase.from("traveler_notes").select("*").eq("destination_id", id).order("created_at", { ascending: false }),
          supabase.from("destinations_with_coords").select("lat, lng").eq("id", id).single(),
        ]);

        setDestination({
          ...data,
          hidden_gems: gems.data ?? [],
          trap_alternatives: traps.data ?? [],
          festivals: festivals.data ?? [],
          local_stays: stays.data ?? [],
          traveler_notes: notes.data ?? [],
          coords: coords.data ? { lat: coords.data.lat, lng: coords.data.lng } : null,
        });
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  return { destination, loading };
}

export function useFeaturedDestinations() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const currentMonth = new Date().getMonth() + 1;
      const { data } = await supabase
        .from("destination_months")
        .select("destination_id, score, destinations(id, name, tagline, difficulty, elevation_m, state:states(name))")
        .eq("month", currentMonth)
        .gte("score", 4)
        .order("score", { ascending: false })
        .limit(10);

      setFeatured((data as any[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  return { featured, loading };
}
