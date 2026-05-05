"use client";

// SimpleView — default landing for non-power-users after ColdStart.
//
// Replaces the dense 3-pane shell as the default post-ColdStart surface.
// Plain English dates ("Saturday June 6"), large serif type, one column,
// no year band, no glyph rail, no library sidebar. Two main CTAs:
//   - Generate full itinerary →  (opens AiModal — user never needs the
//     trip board to plan the trip end-to-end)
//   - Open trip board →          (switches to ShellWithLogistics + persists
//     the choice in localStorage so power users stay in 3-pane on revisits)
//
// Architecture: AiModal / ShareMenu / PermitDialog state lives at the
// TripBoard parent. SimpleView calls the open-callbacks via props.

import { useMemo } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import type { LogisticsRow } from "@/lib/cost-aggregator";
import { aggregate, inrFmt, type CostTier } from "@/lib/cost-aggregator";
import { formatScoreInline } from "@itp/shared";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Convert a 1-365 day-of-year to a "Saturday Jun 6" string for the *next*
 *  occurrence of that doy from the current calendar year. Plain English so
 *  a 65-year-old reads it cleanly. */
function doyToPlainDate(doy: number, year = new Date().getFullYear()): string {
  const safe = Math.max(1, Math.min(365, Math.floor(doy)));
  let remaining = safe;
  let monthIdx = 0;
  while (monthIdx < 12 && remaining > MONTH_DAYS[monthIdx]) {
    remaining -= MONTH_DAYS[monthIdx];
    monthIdx++;
  }
  const date = new Date(year, monthIdx, remaining);
  return `${DAY_NAMES[date.getDay()]} ${MONTH_LONG[monthIdx].slice(0, 3)} ${remaining}`;
}

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
};

const TIER_LABEL: Record<CostTier, string> = { budget: "Budget", mid: "Mid", lux: "Luxury" };

export function SimpleView({
  state,
  setState,
  destinations,
  rowsByDest,
  onGenerateItinerary,
  onShareClick,
  onSwitchToAdvanced,
  onStartOver,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestLite[];
  rowsByDest: Record<string, LogisticsRow>;
  onGenerateItinerary: () => void;
  onShareClick: () => void;
  /** Switches to the dense 3-pane and persists the preference. */
  onSwitchToAdvanced: () => void;
  onStartOver: () => void;
}) {
  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);

  const totalDays = state.stops.reduce((s, x) => s + Math.max(1, x.days || 1), 0);
  const tier: CostTier = "mid";
  const cost = useMemo(() => aggregate(state.stops, tier, rowsByDest), [state.stops, tier, rowsByDest]);

  function moveStop(idx: number, dir: -1 | 1) {
    setState((prev) => {
      const stops = [...prev.stops];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= stops.length) return prev;
      [stops[idx], stops[newIdx]] = [stops[newIdx], stops[idx]];
      return { ...prev, stops: stops.map((s, i) => ({ ...s, order: i })) };
    });
  }

  function removeStop(slug: string) {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.filter((s) => s.destinationId !== slug).map((s, i) => ({ ...s, order: i })),
    }));
  }

  function setDays(slug: string, days: number) {
    if (!Number.isFinite(days) || days < 1) return;
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.destinationId === slug ? { ...s, days } : s)),
    }));
  }

  function setName(name: string) {
    setState((prev) => ({ ...prev, name }));
  }

  return (
    <div
      data-trip-simple
      style={{
        minHeight: "calc(100vh - 4rem)",
        background: "var(--paper)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar — Start over (left) + Print/Share (right) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 32px",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <button
          type="button"
          className="nq-btn nq-btn-ghost"
          onClick={onStartOver}
          title="Start over — pick a different starting point"
        >
          ← Start over
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={() => window.print()}
          >
            Print
          </button>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onShareClick}
          >
            Share · Export
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: 720,
          width: "100%",
          margin: "0 auto",
          padding: "40px 32px 24px 32px",
        }}
      >
        {/* Trip header — editable name + summary line */}
        <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
          Your trip · {state.stops.length} {state.stops.length === 1 ? "stop" : "stops"} ·{" "}
          {totalDays} {totalDays === 1 ? "night" : "nights"}
        </div>
        <input
          type="text"
          value={state.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your trip"
          aria-label="Trip name"
          style={{
            all: "unset",
            display: "block",
            width: "100%",
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: 40,
            letterSpacing: "-0.015em",
            lineHeight: 1.05,
            color: "var(--ink)",
            marginBottom: 32,
          }}
        />

        {/* Stops — large readable cards */}
        {state.stops.length === 0 ? (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              border: "1px dashed var(--rule-2)",
              color: "var(--ink-2)",
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            <p style={{ margin: "0 0 14px 0" }}>No stops yet.</p>
            <button
              type="button"
              className="nq-btn nq-btn-primary"
              onClick={onStartOver}
            >
              ← Pick a starting point
            </button>
          </div>
        ) : (
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 32px 0",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {state.stops.map((stop, idx) => {
              const dest = destMap.get(stop.destinationId);
              const monthIdx = state.month - 1;
              const monthScore = dest?.destination_months?.find((m) => m.month === state.month)?.score ?? null;
              const startLabel = doyToPlainDate(stop.startDay);
              const endLabel = doyToPlainDate(stop.startDay + Math.max(1, stop.days) - 1);
              return (
                <li
                  key={`${stop.destinationId}-${idx}`}
                  data-stop-id={stop.destinationId}
                  style={{
                    border: "1px solid var(--rule-2)",
                    background: "var(--paper-2)",
                    padding: "20px 22px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  {/* Stop number */}
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 28,
                      fontWeight: 500,
                      color: "var(--ink-3)",
                      lineHeight: 1,
                      paddingTop: 6,
                      minWidth: 40,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Main */}
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "var(--serif)",
                        fontSize: 26,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.1,
                      }}
                    >
                      {dest?.name ?? stop.destinationId}
                    </h2>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--ink-2)",
                        marginTop: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {dest?.state?.name ?? "—"}
                      {dest?.elevation_m ? ` · ${dest.elevation_m.toLocaleString()} m` : ""}
                      {monthScore != null && ` · scores ${formatScoreInline(monthScore)} in ${MONTH_LONG[monthIdx]}`}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {startLabel} → {endLabel}
                    </div>

                    {/* Days input — bumped to 14px label + 15px input for legibility */}
                    <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
                      <label
                        htmlFor={`days-${idx}`}
                        style={{ fontSize: 14, color: "var(--ink-2)" }}
                      >
                        Nights
                      </label>
                      <input
                        id={`days-${idx}`}
                        type="number"
                        min={1}
                        max={30}
                        value={stop.days}
                        onChange={(e) => setDays(stop.destinationId, parseInt(e.target.value || "1", 10))}
                        className="nq-input"
                        style={{ width: 72, padding: "6px 10px" }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => moveStop(idx, -1)}
                      disabled={idx === 0}
                      className="nq-btn nq-btn-ghost"
                      style={{ padding: "6px 10px" }}
                      aria-label="Move up"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStop(idx, 1)}
                      disabled={idx === state.stops.length - 1}
                      className="nq-btn nq-btn-ghost"
                      style={{ padding: "6px 10px" }}
                      aria-label="Move down"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStop(stop.destinationId)}
                      className="nq-btn nq-btn-ghost"
                      style={{ padding: "6px 10px", color: "var(--score-1)" }}
                      aria-label="Remove stop"
                      title="Remove stop"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {/* Cost summary — single calm line */}
        {state.stops.length > 0 && (
          <div
            style={{
              border: "1px solid var(--rule-2)",
              background: "var(--paper-2)",
              padding: "18px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
            data-cost-aggregate
          >
            <div>
              <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
                Estimated cost · {TIER_LABEL[tier]} tier
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
                Based on stays + meals + local transit. Flights extra.
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 32,
                fontWeight: 500,
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              ₹{inrFmt.format(Math.round(cost.total))}
              <span
                style={{
                  fontSize: 14,
                  fontFamily: "var(--sans)",
                  color: "var(--ink-2)",
                  marginLeft: 8,
                  fontWeight: 400,
                }}
              >
                per person
              </span>
            </div>
          </div>
        )}

        {/* Primary CTA + power-user link */}
        {state.stops.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <button
              type="button"
              className="nq-btn nq-btn-primary"
              onClick={onGenerateItinerary}
              style={{
                fontSize: 16,
                padding: "14px 28px",
                width: "100%",
                maxWidth: 360,
                justifyContent: "center",
              }}
            >
              Generate full itinerary →
            </button>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--ink-2)",
                textAlign: "center",
                maxWidth: 460,
                lineHeight: 1.5,
              }}
            >
              We&rsquo;ll ask a few questions (ages, mobility, vehicle) and write a day-by-day plan.
            </p>
          </div>
        )}

        {/* Switch to advanced — subtle link, not a CTA */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid var(--rule)",
            textAlign: "center",
          }}
        >
          <button
            type="button"
            onClick={onSwitchToAdvanced}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: 14,
              color: "var(--ink-2)",
              textDecoration: "underline",
              textDecorationColor: "var(--accent)",
              textUnderlineOffset: 3,
            }}
          >
            Open trip board →
          </button>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: 13,
              color: "var(--ink-3)",
              lineHeight: 1.5,
            }}
          >
            For more detail — year band, drag-to-reschedule, map view, library, conflicts.
          </p>
        </div>
      </div>
    </div>
  );
}
