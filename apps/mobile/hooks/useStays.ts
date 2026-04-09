import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface LocalStay {
  id: string;
  destination_id: string | null;
  name: string;
  type: string;
  location: string | null;
  why_special: string | null;
  price_range: string | null;
  contact: string | null;
  best_for: string | null;
  verified: boolean;
  tags: string[];
  destinations: { name: string } | null;
}

export function useStays() {
  const [stays, setStays] = useState<LocalStay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("local_stays")
      .select("*, destinations(name)")
      .order("type")
      .order("name")
      .then(({ data }) => {
        setStays((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { stays, loading };
}
