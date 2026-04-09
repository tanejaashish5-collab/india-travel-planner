import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useTreks() {
  const [treks, setTreks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("treks")
        .select("id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, kids_suitable, fitness_level, description, highlights, warnings")
        .order("name");
      setTreks(data ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  return { treks, loading };
}

export function useTrek(id: string) {
  const [trek, setTrek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("treks")
        .select("*, destinations(name, state:states(name))")
        .eq("id", id)
        .single();
      setTrek(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  return { trek, loading };
}
