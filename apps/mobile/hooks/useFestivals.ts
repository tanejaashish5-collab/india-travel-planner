import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Festival {
  id: string;
  name: string;
  month: number | null;
  approximate_date: string | null;
  description: string | null;
  significance: string | null;
  destination_id: string | null;
  destinations: { name: string } | null;
}

export function useFestivals() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("festivals")
      .select("*, destinations(name)")
      .order("month")
      .order("name")
      .then(({ data }) => {
        setFestivals((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { festivals, loading };
}
