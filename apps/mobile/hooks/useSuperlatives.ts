import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Superlative {
  id: string;
  title: string;
  destination_id: string | null;
  name: string | null;
  detail: string | null;
  tags: string[];
  destinations: { name: string; tagline: string } | null;
}

export function useSuperlatives() {
  const [superlatives, setSuperlatives] = useState<Superlative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("superlatives")
      .select("*, destinations(name, tagline)")
      .order("title")
      .then(({ data }) => {
        setSuperlatives((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { superlatives, loading };
}
