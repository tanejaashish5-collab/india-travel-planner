"use client";

// Cost aggregator for the Trip Board — Phase 3.
//
// Replaces the Phase-1 naive client-side estimate (which read raw
// destinations.daily_cost) with the RPC-driven `get_trip_logistics` call from
// migration 044. Server-side aggregation:
//   - sidesteps the Supabase 1000-row cap on destination_costs joins
//   - uses the canonical category-synthesized tier math (the RPC already
//     converts hostel-dorm + food + transport rows → budget total, etc.)
//   - includes month-aware seasonal pricing (the RPC's `p_travel_month` arg)
//
// What this file owns: the client-side wrapper around the RPC, day-multiplier
// math (RPC returns per-day; we multiply by stop.days), Indian locale
// formatting, and a "Reviewed today" pip from destinations.section_reviews.
//
// Dual-shape note: the legacy Phase-1 path read destinations.daily_cost which
// has both rich `{stay, food, transport, total}` and thin `{mid: 1500}`
// shapes. The RPC sidesteps both by reading destination_costs directly. The
// dual-shape compatibility lives only in the RPC SQL itself (covered by
// COALESCE + filter chain in 044).
//
// Why client-side fetch (vs. server prefetch): stops change interactively;
// SSR can't help. supabase-js anon role can call the RPC since it's marked
// SECURITY DEFINER + GRANT EXECUTE TO anon in 044.

import { useEffect, useMemo, useRef, useState } from "react";
import { getBrowserSupabase } from "./supabase-browser";
import type { TripStop } from "./trip-storage";

export type CostTier = "budget" | "mid" | "lux";

/** One row per requested destination_id from get_trip_logistics RPC. */
export type LogisticsRow = {
  destination_id: string;
  name: string;
  state_id: string | null;
  elevation_m: number | null;
  difficulty: string | null;
  permit_type: string | null;
  permit_lead_days: number | null;
  permit_required: string | null;
  monthly_score: number | null;
  monthly_note: string | null;
  monthly_solo_female_score: number | null;
  annual_solo_female_score: number | null;
  kids_rating: number | null;
  kids_min_age: number | null;
  cost_budget_inr: number | null;
  cost_mid_inr: number | null;
  cost_lux_inr: number | null;
  festivals: { name: string; approximate_date: string | null; description: string | null }[] | null;
  road_condition: string | null;
  cell_network: string | null;
  medical_facility: string | null;
};

export type CostLine = {
  destinationId: string;
  name: string;
  days: number;
  perDay: number | null;
  subtotal: number | null;
  /** True when destination_costs row's reviewed_at is within 30 days. Powers the "Reviewed today" pip. */
  recentlyReviewed: boolean;
};

export type CostAggregate = {
  total: number;
  totalDays: number;
  perStop: CostLine[];
  /** True when one or more stops returned no cost data — the total is a floor. */
  incomplete: boolean;
  /** RPC results indexed by destination_id — caller (ConflictsPanel) re-uses these. */
  logisticsByDest: Record<string, LogisticsRow>;
};

export const inrFmt = new Intl.NumberFormat("en-IN");

function pickTier(row: LogisticsRow, tier: CostTier): number | null {
  switch (tier) {
    case "budget":
      return row.cost_budget_inr;
    case "mid":
      return row.cost_mid_inr;
    case "lux":
      return row.cost_lux_inr;
  }
}

/**
 * Aggregate trip cost for a given tier.
 *
 * The "earliest stop's month" rule mirrors the RPC contract: one call covers
 * one month. Cross-month trips will under-count seasonally — Phase 4 may
 * batch by month and merge. For Phase 3 the single-month read is acceptable
 * because most board trips fit within one month and the cost UI surfaces a
 * "Some stops missing cost data" disclaimer when the total is a floor.
 */
export function aggregate(
  stops: TripStop[],
  tier: CostTier,
  rowsByDest: Record<string, LogisticsRow>,
): CostAggregate {
  let total = 0;
  let totalDays = 0;
  const perStop: CostLine[] = [];
  for (const s of stops) {
    const row = rowsByDest[s.destinationId];
    const perDay = row ? pickTier(row, tier) : null;
    const days = Math.max(1, s.days || 1);
    const subtotal = perDay != null ? perDay * days : null;
    if (subtotal != null) total += subtotal;
    totalDays += days;
    perStop.push({
      destinationId: s.destinationId,
      name: row?.name ?? s.destinationId,
      days,
      perDay,
      subtotal,
      // Phase 3 doesn't query destination_costs.reviewed_at directly — that
      // would mean a second round-trip. Approximated as "RPC returned a tier"
      // (i.e., destination has SOME cost data). The richer "reviewed within
      // 30 days" comes online when we extend the RPC to surface MAX(reviewed_at).
      recentlyReviewed: perDay != null,
    });
  }
  const incomplete = perStop.some((l) => l.subtotal == null);
  return { total, totalDays, perStop, incomplete, logisticsByDest: rowsByDest };
}

/**
 * useTripLogistics — fires the get_trip_logistics RPC whenever the stops list
 * (or the derived month) changes. Returns RPC rows indexed by destination_id
 * + loading + error flags.
 *
 * Debounced 250ms so a drag-resize that bumps multiple stops doesn't spam
 * the RPC. The RPC is cheap (< 50ms typical) but burst protection costs
 * nothing.
 */
export function useTripLogistics(stops: TripStop[], month: number) {
  const [rowsByDest, setRowsByDest] = useState<Record<string, LogisticsRow>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable key to detect change without re-creating the array on every render.
  const stopIds = useMemo(
    () =>
      stops
        .map((s) => s.destinationId)
        .sort()
        .join("|"),
    [stops],
  );

  // AbortController per fetch so a fast subsequent change cancels the prior
  // RPC. supabase-js doesn't expose AbortSignal on .rpc() so we use a guard
  // ref instead — the in-flight call still completes server-side, but its
  // result is dropped if a newer call has fired.
  const generationRef = useRef(0);

  useEffect(() => {
    if (!stopIds) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing on empty input, single render.
      setRowsByDest({});
      return;
    }
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    const myGen = ++generationRef.current;
    const ids = stopIds.split("|");
    setLoading(true);
    const t = setTimeout(async () => {
      const { data, error } = await supabase.rpc("get_trip_logistics", {
        p_destination_ids: ids,
        p_travel_month: month,
      });
      if (generationRef.current !== myGen) return; // stale, drop
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const next: Record<string, LogisticsRow> = {};
      for (const row of (data ?? []) as LogisticsRow[]) {
        next[row.destination_id] = row;
      }
      setRowsByDest(next);
      setError(null);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, [stopIds, month]);

  return { rowsByDest, loading, error };
}
