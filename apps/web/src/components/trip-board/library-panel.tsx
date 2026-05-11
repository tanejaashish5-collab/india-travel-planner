"use client";

// LibraryPanel — design-matched left rail.
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx Library.
//
// Editorial dark aside with:
//   - Header eyebrow: "Library · {N} loaded · 491 total"
//   - Search input (nq-input)
//   - Filter pills (All / {Month} GO / Kids 4+ / Permit-free)
//   - Scrollable list of LibraryItems — destination name (serif), state·elev·days,
//     ScoreChip + "+ add" / "✓ in trip" tag.
//
// Operates entirely on the destinations[] prop. NO direct destination_months
// queries (Supabase 1000-row cap per feedback_supabase_row_cap.md).

import { useMemo, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import { ScoreChip, MONTH_LABELS } from "./atoms";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
  family_stress?: string | null;
};

type FilterId = "all" | "go-month" | "kids" | "permit-free" | "multi-gen";

function scoreFor(d: DestLite, monthOneIndexed: number): number {
  const row = (d.destination_months ?? []).find((m) => m.month === monthOneIndexed);
  return row?.score ?? 0;
}

function nextStartDay(state: TripStateV2): number {
  if (state.stops.length === 0) {
    const m = state.month - 1;
    const offsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    return (offsets[m] ?? 0) + 5;
  }
  const last = state.stops[state.stops.length - 1];
  return Math.min(365 - 6, last.startDay + Math.max(1, last.days || 2));
}

function LibraryItem({
  d,
  monthIdx,
  added,
  onAdd,
}: {
  d: DestLite;
  monthIdx: number;
  added: boolean;
  onAdd: () => void;
}) {
  const score = scoreFor(d, monthIdx + 1);
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={added}
      style={{
        all: "unset",
        display: "block",
        cursor: added ? "default" : "pointer",
        padding: "11px 14px",
        borderTop: "1px solid var(--rule)",
        background: added ? "rgba(255,255,255,.02)" : "transparent",
        opacity: added ? 0.5 : 1,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 16,
              lineHeight: 1.2,
              marginBottom: 2,
              color: "var(--ink)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {d.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2 }}>
            {d.state?.name ?? "—"}
            {d.elevation_m ? ` · ${d.elevation_m}m` : ""}
            {d.difficulty ? ` · ${d.difficulty}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <ScoreChip s={score} />
          <span style={{ fontSize: 12, color: added ? "var(--score-5)" : "var(--accent)", fontWeight: 500 }}>{added ? "✓ in trip" : "+ add"}</span>
        </div>
      </div>
    </button>
  );
}

export function LibraryPanel({
  destinations,
  state,
  setState,
}: {
  destinations: DestLite[];
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");

  const inTrip = useMemo(() => new Set(state.stops.map((s) => s.destinationId)), [state.stops]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = destinations;
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.state?.name ?? "").toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q),
      );
    }
    if (filter === "go-month") list = list.filter((d) => scoreFor(d, state.month) >= 4);
    if (filter === "kids") list = list.filter((d) => (d.elevation_m ?? 0) < 2500);
    // permit-free filter requires the permit_type column from Phase 0; for now,
    // approximate as "easy + low altitude" since permit data isn't on DestLite.
    if (filter === "permit-free")
      list = list.filter((d) => d.difficulty === "easy" && (d.elevation_m ?? 0) < 2500);
    // multi-gen — safe for grandparents AND small kids in one trip. No
    // dedicated column; derived from low altitude (AMS risk at both age
    // extremes), easy difficulty, and family_stress that's not flagged hard.
    if (filter === "multi-gen")
      list = list.filter((d) => {
        const safeElev = (d.elevation_m ?? 0) < 2000;
        const easyEnough = !d.difficulty || d.difficulty === "easy";
        const fs = (d.family_stress ?? "").toLowerCase();
        const familyOk = !fs.includes("not recommended") && !fs.includes("high");
        return safeElev && easyEnough && familyOk;
      });
    return list
      .slice()
      .sort((a, b) => {
        const ai = inTrip.has(a.id) ? 1 : 0;
        const bi = inTrip.has(b.id) ? 1 : 0;
        if (ai !== bi) return bi - ai;
        return scoreFor(b, state.month) - scoreFor(a, state.month);
      })
      .slice(0, 200);
  }, [destinations, query, filter, state.month, inTrip]);

  function addStop(slug: string) {
    if (inTrip.has(slug)) return;
    setState((prev) => ({
      ...prev,
      stops: [
        ...prev.stops,
        {
          destinationId: slug,
          startDay: nextStartDay(prev),
          days: 3,
          notes: "",
          order: prev.stops.length,
        },
      ],
    }));
  }

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "go-month", label: `${MONTH_LABELS[state.month - 1]} GO` },
    { id: "kids", label: "👶 Kids 4+" },
    { id: "multi-gen", label: "👨‍👩‍👧 Multi-gen" },
    { id: "permit-free", label: "Permit-free" },
  ];

  return (
    <aside
      data-trip-library
      style={{
        borderRight: "1px solid var(--rule-2)",
        background: "var(--paper-2)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid var(--rule)" }}>
        <div className="nq-eyebrow" style={{ marginBottom: 8 }}>
          Library · {destinations.length} loaded
        </div>
        <input
          type="search"
          className="nq-input"
          placeholder="Search destinations…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className="nq-btn nq-btn-ghost"
              style={{
                padding: "5px 11px",
                background: filter === f.id ? "var(--ink)" : "transparent",
                color: filter === f.id ? "var(--paper)" : "var(--ink-2)",
                borderColor: filter === f.id ? "var(--ink)" : "var(--rule-2)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ overflow: "auto", flex: 1 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 24, color: "var(--ink-2)", fontSize: 14 }}>No matches.</div>
        ) : (
          filtered.map((d) => (
            <LibraryItem
              key={d.id}
              d={d}
              monthIdx={state.month - 1}
              added={inTrip.has(d.id)}
              onAdd={() => addStop(d.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
