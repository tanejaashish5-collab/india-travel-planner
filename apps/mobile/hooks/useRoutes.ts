import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

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
    supabase
      .from("routes")
      .select("*")
      .order("days")
      .then(({ data }) => {
        setRoutes((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { routes, loading };
}

export function useRoute(id: string) {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("routes")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setRoute(data as any);
        setLoading(false);
      });
  }, [id]);

  return { route, loading };
}
