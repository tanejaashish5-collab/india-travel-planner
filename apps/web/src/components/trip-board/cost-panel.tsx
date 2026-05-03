"use client";

// CostPanel — design-matched right rail (Live aggregator).
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx CostPanel
// + the rail's wrapping aside. Hosts:
//   - Live aggregator header (eyebrow + italic sub + Tier inline pills)
//   - Cost section (₹ in serif 36px + 4-up Stay/Food/Transit/Activity grid)
//     Phase 3 has total + tier per-stop; the 4-up breakdown is ESTIMATED
//     proportionally until the RPC surfaces per-category totals.
//   - ConflictsPanel
//   - Permit timeline (apply-by dates)
//   - Share trip CTA

import { useMemo, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import {
  aggregate,
  inrFmt,
  useTripLogistics,
  type CostTier,
  type LogisticsRow,
} from "@/lib/cost-aggregator";
import { ConflictsPanel } from "./conflicts-panel";
import { doyLabel } from "./atoms";

type DestLite = { id: string; name: string };

const TIERS: CostTier[] = ["budget", "mid", "lux"];
const TIER_LABEL: Record<CostTier, string> = {
  budget: "Budget",
  mid: "Mid",
  lux: "Lux",
};

// 4-up breakdown weights — naive proportional split until the RPC returns
// per-category totals. Roughly mirrors typical India travel cost mix.
const BREAKDOWN_WEIGHTS = { stay: 0.45, food: 0.2, transit: 0.25, activity: 0.1 };

export function CostPanel({
  state,
  rowsByDest: rowsByDestProp,
  onPermitClick,
}: {
  state: TripStateV2;
  /** Kept in the prop signature for API stability; not currently used now that the RPC returns names. */
  destinations?: DestLite[];
  rowsByDest?: Record<string, LogisticsRow>;
  onPermitClick: (destId: string, destName: string) => void;
}) {
  const [tier, setTier] = useState<CostTier>("mid");

  // Reuse parent RPC snapshot when provided; fallback hook makes CostPanel
  // usable in isolation (e.g., a future preview surface).
  const fallback = useTripLogistics(state.stops, rowsByDestProp ? -1 : state.month);
  const rowsByDest = rowsByDestProp ?? fallback.rowsByDest;

  const aggregateResult = useMemo(
    () => aggregate(state.stops, tier, rowsByDest),
    [state.stops, tier, rowsByDest],
  );

  const fmt = (n: number) => `₹${inrFmt.format(Math.round(n))}`;

  const breakdown = {
    stay: aggregateResult.total * BREAKDOWN_WEIGHTS.stay,
    food: aggregateResult.total * BREAKDOWN_WEIGHTS.food,
    transit: aggregateResult.total * BREAKDOWN_WEIGHTS.transit,
    activity: aggregateResult.total * BREAKDOWN_WEIGHTS.activity,
  };

  // Permit timeline — apply-by date for any stop with a permit.
  const permitItems = useMemo(() => {
    const out: { id: string; name: string; type: string; applyBy: string }[] = [];
    for (const stop of state.stops) {
      const row = rowsByDest[stop.destinationId];
      if (!row?.permit_type || row.permit_type === "none") continue;
      const lead = row.permit_lead_days ?? 7;
      const applyByDoy = Math.max(1, stop.startDay - lead);
      out.push({
        id: stop.destinationId,
        name: row.name,
        type: row.permit_type.toUpperCase(),
        applyBy: doyLabel(applyByDoy),
      });
    }
    return out;
  }, [state.stops, rowsByDest]);

  return (
    <aside
      data-trip-cost
      data-cost-aggregate
      style={{
        background: "var(--paper-2)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--rule)" }}>
        <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
          Live aggregator
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--ink-3)",
            fontStyle: "italic",
            fontFamily: "var(--serif)",
          }}
        >
          Updates as you change stops or dates.
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 6, fontSize: 11.5, alignItems: "center" }}>
          <span style={{ color: "var(--ink-3)" }}>Tier:</span>
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "2px 8px",
                borderRadius: 2,
                background: tier === t ? "var(--ink)" : "transparent",
                color: tier === t ? "var(--paper)" : "var(--ink-2)",
                border: `1px solid ${tier === t ? "var(--ink)" : "var(--rule-2)"}`,
              }}
            >
              {TIER_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Cost section */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--rule)" }}>
        <div className="nq-eyebrow" style={{ marginBottom: 10 }}>
          What this trip costs · {TIER_LABEL[tier]} · {aggregateResult.totalDays}d / pax
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1,
            marginBottom: 12,
            color: "var(--ink)",
          }}
        >
          {fmt(aggregateResult.total)}
          <span
            style={{
              fontSize: 13,
              fontFamily: "var(--sans)",
              color: "var(--ink-3)",
              marginLeft: 6,
            }}
          >
            per person
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, fontSize: 11 }}>
          {(["stay", "food", "transit", "activity"] as const).map((k) => (
            <div key={k}>
              <div
                style={{
                  color: "var(--ink-3)",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  fontSize: 9.5,
                  fontWeight: 600,
                }}
              >
                {k === "transit" ? "Transit" : k.charAt(0).toUpperCase() + k.slice(1)}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12.5,
                  marginTop: 3,
                  color: "var(--ink)",
                }}
              >
                {fmt(breakdown[k])}
              </div>
            </div>
          ))}
        </div>
        {aggregateResult.incomplete && (
          <p
            style={{
              marginTop: 10,
              fontSize: 10.5,
              fontStyle: "italic",
              color: "var(--score-3)",
              fontFamily: "var(--serif)",
            }}
          >
            Some stops missing cost data — total is a floor.
          </p>
        )}
      </div>

      {/* ConflictsPanel — same RPC snapshot, no second fetch */}
      <ConflictsPanel stops={state.stops} rowsByDest={rowsByDest} onPermitClick={onPermitClick} />

      {/* Permit timeline */}
      <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--rule)" }}>
        <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
          Permit timeline
        </div>
        {permitItems.length === 0 ? (
          <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>None for this itinerary.</div>
        ) : (
          permitItems.map((p) => (
            <div
              key={p.id}
              style={{ fontSize: 11.5, marginBottom: 6, color: "var(--ink-2)" }}
            >
              <strong style={{ color: "var(--ink)" }}>{p.name}</strong> · {p.type}
              <br />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "var(--ink-3)",
                }}
              >
                apply by {p.applyBy}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Share CTA — pinned bottom */}
      <div style={{ padding: "14px 22px", marginTop: "auto", borderTop: "1px solid var(--rule)" }}>
        <button
          type="button"
          className="nq-btn"
          onClick={() => alert("Share / Export — coming in Phase 5")}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Share trip · Export
        </button>
      </div>
    </aside>
  );
}
