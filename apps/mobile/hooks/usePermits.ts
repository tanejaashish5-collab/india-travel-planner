import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Permit {
  id: string;
  destination_id: string | null;
  type: string;
  who_needs: string | null;
  foreigners: string | null;
  how_to_get: string | null;
  documents_needed: string[];
  cost_inr: number;
  processing_time: string | null;
  validity: string | null;
  government_link: string | null;
  pro_tip: string | null;
  destinations: { name: string } | null;
}

export function usePermits() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("permits")
      .select("*, destinations(name)")
      .order("type")
      .then(({ data }) => {
        setPermits((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { permits, loading };
}
