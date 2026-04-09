import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface CampingSpot {
  id: string;
  name: string;
  destination_id: string | null;
  elevation_m: number | null;
  open_months: number[];
  permit_required: boolean;
  water_source: boolean;
  facilities: string | null;
  description: string | null;
  tags: string[];
  destinations: { name: string } | null;
}

export function useCamping() {
  const [spots, setSpots] = useState<CampingSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("camping_spots")
      .select("*, destinations(name)")
      .order("name")
      .then(({ data }) => {
        setSpots((data as any[]) ?? []);
        setLoading(false);
      });
  }, []);

  return { spots, loading };
}
