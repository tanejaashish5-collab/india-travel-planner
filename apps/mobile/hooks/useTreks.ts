import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getCached, TTL } from "../lib/cache";

export function useTreks() {
  const [treks, setTreks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCached(
      "treks:all",
      async () => {
        const { data } = await supabase
          .from("treks")
          .select("id, name, destination_id, difficulty, duration_days, max_altitude_m, distance_km, best_months, kids_suitable, fitness_level, description, highlights, warnings, destinations(name, state:states(name))")
          .order("name");
        return data ?? [];
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setTreks((res.data as any[]) ?? []);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { treks, loading };
}

export function useTrek(id: string) {
  const [trek, setTrek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!id) { setLoading(false); return; }
    getCached(
      `trek:${id}`,
      async () => {
        const { data } = await supabase
          .from("treks")
          .select("*, destinations(name, state:states(name))")
          .eq("id", id)
          .single();
        return data;
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setTrek(res.data);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id]);

  return { trek, loading };
}
