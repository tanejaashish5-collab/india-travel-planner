"use client";

// LibraryPanel — left rail of the Trip Board.
//
// Inline destination search + filter pills + add-to-trip list. Replaces the
// dead-end "go to /explore" pattern that was forcing users out of the
// planning funnel (PDF Failure #1 root cause).
//
// Operates entirely on the destinations[] prop (passed from server). NO calls
// against destination_months — that table has 5,892 rows and the Supabase
// 1000-row cap makes raw .select() unsafe (per feedback_supabase_row_cap.md).
// Month-score lookups happen on the embedded destination_months[] join.

import { useMemo, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
};

type FilterId = "all" | "go-this-month" | "easy" | "lowland" | "permit-free";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "go-this-month", label: "Go this month" },
  { id: "easy", label: "Easy" },
  { id: "lowland", label: "Under 2000m" },
];

function scoreFor(d: DestLite, monthOneIndexed: number): number {
  const row = (d.destination_months ?? []).find((m) => m.month === monthOneIndexed);
  return row?.score ?? 0;
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
  const [collapsed, setCollapsed] = useState(false);

  const inTrip = useMemo(() => new Set(state.stops.map((s) => s.destinationId)), [state.stops]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = destinations;
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.state?.name ?? "").toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q)
      );
    }
    if (filter === "go-this-month") {
      list = list.filter((d) => scoreFor(d, state.month) >= 4);
    } else if (filter === "easy") {
      list = list.filter((d) => d.difficulty === "easy");
    } else if (filter === "lowland") {
      list = list.filter((d) => (d.elevation_m ?? 0) < 2000);
    }
    // Sort: in-trip first (so user sees confirmation), then by month-score desc.
    return list
      .slice()
      .sort((a, b) => {
        const ai = inTrip.has(a.id) ? 1 : 0;
        const bi = inTrip.has(b.id) ? 1 : 0;
        if (ai !== bi) return bi - ai;
        return scoreFor(b, state.month) - scoreFor(a, state.month);
      })
      .slice(0, 200); // hard cap so the rail stays scrollable
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

  if (collapsed) {
    return (
      <div className="flex w-10 flex-col items-center justify-start border-r border-border bg-background py-4">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Expand library"
          className="rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          ›
        </button>
      </div>
    );
  }

  return (
    <aside
      className="flex h-full flex-col border-r border-border bg-background"
      data-trip-library
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">Library</p>
          <p className="text-[11px] text-muted-foreground">
            {destinations.length} loaded · {filtered.length} shown
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse library"
          className="rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          ‹
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-border px-4 py-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations…"
          className="w-full border border-border bg-background px-3 py-2 font-serif text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
              filter === f.id ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="p-4 font-serif text-sm italic text-muted-foreground">No destinations match.</p>
        )}
        {filtered.map((d) => {
          const score = scoreFor(d, state.month);
          const added = inTrip.has(d.id);
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => addStop(d.id)}
              disabled={added}
              className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors ${
                added ? "bg-muted/40 cursor-default" : "hover:bg-muted"
              }`}
            >
              <span
                className={`flex h-7 min-w-[34px] items-center justify-center font-mono text-[10.5px] font-bold ${
                  score >= 4
                    ? "bg-emerald-700 text-white"
                    : score >= 3
                      ? "bg-amber-600 text-white"
                      : score >= 1
                        ? "bg-rose-600 text-white"
                        : "bg-muted text-muted-foreground"
                }`}
              >
                {score || "—"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-sm">{d.name}</span>
                <span className="block truncate text-[10.5px] text-muted-foreground">
                  {d.state?.name ?? ""}{d.elevation_m ? ` · ${d.elevation_m}m` : ""}{d.difficulty ? ` · ${d.difficulty}` : ""}
                </span>
              </span>
              <span className="font-mono text-[10.5px] uppercase text-[var(--accent,#d36843)]">
                {added ? "✓ in trip" : "+ add"}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function nextStartDay(state: TripStateV2): number {
  if (state.stops.length === 0) {
    // Anchor first stop at the 5th of the trip month.
    const m = state.month - 1;
    const offsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    return (offsets[m] ?? 0) + 5;
  }
  const last = state.stops[state.stops.length - 1];
  return Math.min(365, last.startDay + Math.max(1, last.days || 2));
}
