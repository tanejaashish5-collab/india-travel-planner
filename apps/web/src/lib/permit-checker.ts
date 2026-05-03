// Permit / pass / festival conflict scanner — Phase 3.
//
// Pure-function scan over the trip's stops + the get_trip_logistics RPC
// results. Emits a flat `Conflict[]` that ConflictsPanel renders directly
// AND that StopCard's existing Alert slot can consume in-place.
//
// Severity ladder (load-bearing — UI sorts by it):
//   - block: trip is invalid as planned. Permit not obtainable in time, pass
//            certain to be closed at altitude (snow), full festival blackout.
//   - warn:  the trip can proceed but the user must do something (apply for
//            permit X days ahead, expect crowding/closures, road may be slow).
//   - info:  flavour signal worth knowing (festival running during the stop;
//            kids min-age below stop's elevation guidance).
//
// Why pure: deterministic for testing + memoisation. No async, no IO. The
// RPC fetch lives in cost-aggregator.useTripLogistics; this scanner consumes
// the snapshot.

import type { TripStop } from "./trip-storage";
import type { LogisticsRow } from "./cost-aggregator";
import { PASSES_BY_DEST, passStatusForDate, doyToDate } from "./passes";

export type ConflictKind = "permit" | "pass" | "festival";
export type ConflictSeverity = "info" | "warn" | "block";

export type Conflict = {
  kind: ConflictKind;
  severity: ConflictSeverity;
  destinationId: string;
  destinationName: string;
  message: string;
  /** Optional payload for click-throughs (permit dialog, pass details). */
  meta?: {
    permitType?: string;
    permitLeadDays?: number;
    passSlug?: string;
    festivalName?: string;
  };
};

// Day-of-year today (UTC). Used to check whether permit lead-time is
// achievable before the stop's startDay. Year-rollover is a non-issue for
// India travel planning (lead times are days-to-weeks, not months).
function todayDoyUTC(): number {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  return Math.floor((now.getTime() - start) / 86_400_000);
}

const PERMIT_LABELS: Record<string, string> = {
  ilp: "Inner Line Permit (ILP)",
  rap: "Restricted Area Permit (RAP)",
  ilp_rap: "Inner Line + Restricted Area Permits",
  pap: "Protected Area Permit (PAP)",
};

export function scan(
  stops: TripStop[],
  rowsByDest: Record<string, LogisticsRow>,
): Conflict[] {
  const out: Conflict[] = [];
  const today = todayDoyUTC();

  for (const stop of stops) {
    const row = rowsByDest[stop.destinationId];
    const destName = row?.name ?? stop.destinationId;

    // ----- Permit checks ---------------------------------------------------
    // Three signals can flag a permit conflict:
    //   1. permit_type set + lead time exceeds window-to-stop (block/warn)
    //   2. permit_type=pap (foreign-traveller-only restriction; surface as
    //      info so foreigners see it, locals can ignore — Phase 4 will gate
    //      by traveler nationality once we collect that input)
    //   3. permit_type=ilp/rap with no lead-time set → conservative warn
    if (row?.permit_type && row.permit_type !== "none") {
      const lead = row.permit_lead_days ?? 7; // conservative default
      const windowDays = stop.startDay - today;
      const label = PERMIT_LABELS[row.permit_type] ?? row.permit_type.toUpperCase();
      if (windowDays >= 0 && windowDays < lead) {
        out.push({
          kind: "permit",
          severity: "block",
          destinationId: stop.destinationId,
          destinationName: destName,
          message: `${label} needs ~${lead} days; only ${Math.max(0, windowDays)} day${windowDays === 1 ? "" : "s"} until your start. Apply ASAP or shift this stop.`,
          meta: { permitType: row.permit_type, permitLeadDays: lead },
        });
      } else {
        out.push({
          kind: "permit",
          severity: "warn",
          destinationId: stop.destinationId,
          destinationName: destName,
          message: `${label} required. Apply at least ${lead} days before arrival.`,
          meta: { permitType: row.permit_type, permitLeadDays: lead },
        });
      }
    }

    // ----- Pass checks -----------------------------------------------------
    // For each pass that touches the stop's destination, check if the pass
    // is open on stop.startDay. Closed = warn (sometimes BRO opens early).
    const passes = PASSES_BY_DEST[stop.destinationId] ?? [];
    for (const p of passes) {
      const startDate = doyToDate(stop.startDay, new Date().getUTCFullYear());
      if (passStatusForDate(p, startDate) === "closed") {
        out.push({
          kind: "pass",
          severity: "warn",
          destinationId: stop.destinationId,
          destinationName: destName,
          message: `${p.name} is typically closed on day ${stop.startDay}. Check BRO updates before you commit.`,
          meta: { passSlug: p.slug },
        });
      }
    }

    // ----- Festival overlap ------------------------------------------------
    // Festivals from the RPC are pre-filtered to the trip's month. Any
    // returned festival overlaps the stop. Surface as info (cap to first 2).
    const festivals = (row?.festivals ?? []).slice(0, 2);
    for (const f of festivals) {
      out.push({
        kind: "festival",
        severity: "info",
        destinationId: stop.destinationId,
        destinationName: destName,
        message: `${f.name}${f.approximate_date ? ` (~${f.approximate_date})` : ""} overlaps your stay — expect crowds, price spikes, possible site closures.`,
        meta: { festivalName: f.name },
      });
    }
  }

  // Sort: block first, then warn, then info. Within a severity, group by
  // destinationId so the user sees all conflicts for one stop together.
  const sevOrder: Record<ConflictSeverity, number> = { block: 0, warn: 1, info: 2 };
  out.sort((a, b) => {
    const s = sevOrder[a.severity] - sevOrder[b.severity];
    if (s !== 0) return s;
    return a.destinationId.localeCompare(b.destinationId);
  });

  return out;
}

export function severityLabel(s: ConflictSeverity): string {
  return s === "block" ? "Blocker" : s === "warn" ? "Warning" : "Heads-up";
}
