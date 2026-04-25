import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getCached, TTL } from "../lib/cache";

export interface Route {
  id: string;
  name: string;
  days: number | null;
  difficulty: string | null;
  best_months: number[];
  stops: string[];
  description: string | null;
  kids_suitable: boolean;
  bike_route: boolean;
  budget_range: string | null;
  highlights: string[];
  logistics: string | null;
  day_by_day: any[];
}

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCached(
      "routes:all",
      async () => {
        const { data } = await supabase.from("routes").select("*").order("days");
        return data ?? [];
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setRoutes(((res.data as any[]) ?? []) as Route[]);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { routes, loading };
}

export function useRoute(id: string) {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!id) { setLoading(false); return; }
    getCached(
      `route:${id}`,
      async () => {
        const { data } = await supabase.from("routes").select("*").eq("id", id).single();
        return data;
      },
      TTL.long,
    ).then((res) => {
      if (!mounted) return;
      setRoute(res.data as Route | null);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id]);

  return { route, loading };
}
