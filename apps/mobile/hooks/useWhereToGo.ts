import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface MonthDestination {
  destination_id: string;
  month: number;
  score: number;
  note: string;
  destinations: {
    id: string;
    name: string;
    tagline: string;
    difficulty: string;
    elevation_m: number | null;
  } | null;
}

export function useWhereToGo(month: number) {
  const [destinations, setDestinations] = useState<MonthDestination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("destination_months")
      .select(
        "destination_id, month, score, note, destinations(id, name, tagline, difficulty, elevation_m)"
      )
      .eq("month", month)
      .order("score", { ascending: false });

    setDestinations((data as any[]) ?? []);
    setLoading(false);
  }, [month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { destinations, loading, refresh: fetchData };
}
