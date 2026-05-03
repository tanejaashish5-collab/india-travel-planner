"use client";

// BoardCanvas — design-matched.
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx main column.
//
// Vertical layout:
//   1. Top toolbar — SidebarPill (left) + "Library" label when collapsed +
//      Start over button | Print + Share + SidebarPill (right).
//   2. Conflict bar — only when issues > 0 (rose tint, ⚠ + count + Review).
//   3. Trip header — eyebrow (stops/days/range), List/Map toggle (List only
//      for now; Map view is Phase 5), contentEditable h1, year band below
//      with caption "Drag a stop to shift dates · pins = festivals · hatched
//      bands = pass-open windows".
//   4. Body — list of StopCards (or empty state).
//   5. Sticky action footer — Generate itinerary CTA + italic copy.
//
// Phase 4 (AI Modal) and Phase 5 (Map view + Share menu) hook into the
// existing buttons via props. Print is window.print() — no setup needed.

import { useMemo, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import type { LogisticsRow } from "@/lib/cost-aggregator";
import { scan, type Conflict } from "@/lib/permit-checker";
import { YearBand } from "./year-band";
import { StopCard } from "./stop-card";
import { SidebarPill } from "./sidebar-pill";
import { MapView } from "./map-view";
import { doyLabel } from "./atoms";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
  festivals?: { name: string; month: number | null }[] | null;
  lat?: number | null;
  lng?: number | null;
};

const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

export function BoardCanvas({
  state,
  setState,
  destinations,
  rowsByDest,
  onPermitClick,
  onGenerateItinerary,
  onShareClick,
  view,
  onToggleView,
  leftCollapsed,
  rightCollapsed,
  onToggleLeft,
  onToggleRight,
  onStartOver,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestLite[];
  rowsByDest: Record<string, LogisticsRow>;
  onPermitClick: (destId: string, destName: string) => void;
  onGenerateItinerary: () => void;
  onShareClick: () => void;
  view: "list" | "map";
  onToggleView: (next: "list" | "map") => void;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onStartOver: () => void;
}) {
  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);
  const [selectedStopIdx, setSelectedStopIdx] = useState<number | null>(null);

  const conflictsByDest = useMemo(() => {
    const all: Conflict[] = scan(state.stops, rowsByDest);
    const grouped: Record<string, Conflict[]> = {};
    for (const c of all) {
      (grouped[c.destinationId] ??= []).push(c);
    }
    return { all, grouped };
  }, [state.stops, rowsByDest]);

  // ---- mutation handlers ----------------------------------------------------

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

  function setNotes(slug: string, notes: string) {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((s) => (s.destinationId === slug ? { ...s, notes } : s)),
    }));
  }

  function setName(name: string) {
    setState((prev) => ({ ...prev, name }));
  }

  // ---- derived display values ----------------------------------------------

  const totalDays = state.stops.reduce((sum, s) => sum + (s.days || 0), 0);
  const dateRange =
    state.stops.length > 0
      ? `${doyLabel(Math.min(...state.stops.map((s) => s.startDay)))} – ${doyLabel(
          Math.max(...state.stops.map((s) => s.startDay + Math.max(1, s.days) - 1)),
        )}`
      : "—";
  const conflictCount = conflictsByDest.all.length;

  return (
    <main
      data-trip-canvas
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--paper)",
      }}
    >
      {/* Top toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid var(--rule)",
          background: "var(--paper)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SidebarPill side="left" collapsed={leftCollapsed} onClick={onToggleLeft} />
          <span style={{ fontSize: 13, color: "var(--ink-2)", marginLeft: 4 }}>
            {leftCollapsed ? "Library" : ""}
          </span>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onStartOver}
            style={{ marginLeft: 8 }}
            title="Back to start screen — pick by month / profile / theme / curated"
          >
            ← Start over
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
          <SidebarPill side="right" collapsed={rightCollapsed} onClick={onToggleRight} />
        </div>
      </div>

      {/* Conflict bar — only when issues > 0 */}
      {conflictCount > 0 && (
        <div
          style={{
            background: "rgba(217,96,80,.10)",
            borderBottom: "1px solid rgba(217,96,80,.3)",
            padding: "10px 26px",
            fontSize: 14,
            color: "var(--score-1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>
            ⚠ {conflictCount} {conflictCount === 1 ? "issue" : "issues"} on this trip — permits,
            closed passes, or festival overlaps
          </span>
          {rightCollapsed && (
            <button
              type="button"
              className="nq-btn nq-btn-ghost"
              onClick={onToggleRight}
              style={{
                color: "var(--score-1)",
                borderColor: "rgba(217,96,80,.4)",
              }}
            >
              Review →
            </button>
          )}
        </div>
      )}

      {/* Trip header — editable name + List/Map (Map deferred to Phase 5) */}
      <header style={{ padding: "18px 26px 12px", borderBottom: "1px solid var(--rule-2)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 4,
          }}
        >
          <div className="nq-eyebrow">
            My Trip · {state.stops.length} stops · {totalDays} {totalDays === 1 ? "night" : "nights"} · {dateRange}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              type="button"
              className="nq-btn nq-btn-ghost"
              onClick={() => onToggleView("list")}
              style={view === "list" ? { background: "var(--paper-3)", borderColor: "var(--ink-3)" } : {}}
            >
              List
            </button>
            <button
              type="button"
              className="nq-btn nq-btn-ghost"
              onClick={() => onToggleView("map")}
              style={view === "map" ? { background: "var(--paper-3)", borderColor: "var(--ink-3)" } : {}}
              title="Atlas view — your stops on India outline"
              disabled={state.stops.length === 0}
            >
              Map
            </button>
          </div>
        </div>
        <input
          type="text"
          value={state.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your trip"
          style={{
            all: "unset",
            display: "block",
            width: "100%",
            fontSize: 32,
            margin: "0 0 12px 0",
            fontFamily: "var(--serif)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            color: "var(--ink)",
          }}
          aria-label="Trip name"
        />

        {/* Year band caption + band */}
        <div>
          <div className="nq-eyebrow" style={{ marginBottom: 4, color: "var(--ink-3)" }}>
            Drag a stop to shift dates · pins = festivals · hatched bands = pass-open windows
          </div>
          {state.stops.length > 0 ? (
            <YearBand
              state={state}
              setState={setState}
              destinations={destinations}
              selectedStopIdx={selectedStopIdx}
              onSelectStop={setSelectedStopIdx}
            />
          ) : (
            <div
              style={{
                padding: 24,
                fontSize: 14,
                color: "var(--ink-2)",
                lineHeight: 1.5,
              }}
            >
              Year band activates when you add your first stop.
            </div>
          )}
        </div>
      </header>

      {/* Body — stop cards OR map view */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0, display: "flex", flexDirection: "column" }}>
        {state.stops.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center", color: "var(--ink-2)" }}>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontStyle: "italic",
                margin: "0 0 12px 0",
                color: "var(--ink)",
              }}
            >
              An empty board, but not a cold start.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>Pick from the Library on the left.</p>
          </div>
        ) : view === "map" ? (
          <MapView
            state={state}
            destinations={destinations}
            onPinClick={(destId) => {
              // Switch to list view + scroll to the matching stop card on next paint.
              onToggleView("list");
              requestAnimationFrame(() => {
                const el = document.querySelector(`[data-stop-id="${destId}"]`);
                if (el && "scrollIntoView" in el) {
                  (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
                }
              });
            }}
          />
        ) : (
          <div data-stops-list>
            {state.stops.map((stop, idx) => {
              const dest = destMap.get(stop.destinationId);
              return (
                <StopCard
                  key={`${stop.destinationId}-${idx}`}
                  stop={stop}
                  idx={idx}
                  totalStops={state.stops.length}
                  dest={dest}
                  conflicts={conflictsByDest.grouped[stop.destinationId] ?? []}
                  isSelected={selectedStopIdx === idx}
                  onSelect={() => setSelectedStopIdx(idx)}
                  onMoveUp={() => moveStop(idx, -1)}
                  onMoveDown={() => moveStop(idx, 1)}
                  onRemove={() => removeStop(stop.destinationId)}
                  onSetDays={(days) => setDays(stop.destinationId, days)}
                  onSetNotes={(notes) => setNotes(stop.destinationId, notes)}
                  onPermitClick={() =>
                    onPermitClick(stop.destinationId, dest?.name ?? stop.destinationId)
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky footer — Generate itinerary CTA */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          padding: "14px 26px",
          borderTop: "1px solid var(--rule-2)",
          background: "rgba(0,0,0,.92)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          className="nq-btn nq-btn-primary"
          onClick={onGenerateItinerary}
          disabled={state.stops.length === 0}
          title={state.stops.length === 0 ? "Add a stop first" : "Open the AI itinerary planner"}
        >
          Generate itinerary →
        </button>
        <span
          style={{
            fontSize: 14,
            color: "var(--ink-2)",
            maxWidth: 480,
            lineHeight: 1.5,
          }}
        >
          Builds a day-by-day plan from your stops, dates, ages, mobility, vehicle, risk, pace, tier — not a generic article.
        </span>
      </div>
    </main>
  );
}

// Re-export so other files importing TripStateV2 from board-canvas keep working.
// (atoms re-exports MONTH_STARTS for the no-band fallback, so leaving here.)
export { MONTH_STARTS };
