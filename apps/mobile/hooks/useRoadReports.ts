import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface RoadReport {
  id: string;
  destination_id: string | null;
  segment: string | null;
  status: string | null;
  report: string | null;
  reported_at: string | null;
  verified: boolean;
  expires_at: string | null;
  destinations: { name: string } | null;
}

export function useRoadReports() {
  const [reports, setReports] = useState<RoadReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("road_reports")
      .select("*, destinations(name)")
      .order("reported_at", { ascending: false });
    setReports((data as any[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  return { reports, loading, refresh: fetchReports };
}
