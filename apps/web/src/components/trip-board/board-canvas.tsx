"use client";

// BoardCanvas — center pane of the Trip Board.
//
// Phase 2: replaces the simple stop list with the YearBand + StopCard grid.
//   - Desktop (≥ md): YearBand visible above StopCard list. Drag pills to
//     reschedule; cards reflect the new dates instantly.
//   - Mobile (< md): YearBand hidden; a month picker stands in. StopCards
//     stack as before. Drag-on-touch is out of scope for Phase 2.
//
// State + persistence routes through the parent useTripBoard hook (lib/trip-storage).

import { useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import { ColdStartReplayLink } from "./cold-start-replay-link";
import { YearBand } from "./year-band";
import { StopCard } from "./stop-card";
import { useLocale } from "next-intl";

const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// First-of-month day-of-year (non-leap). Used by mobile month-picker fallback
// to update startDay when a stop's month is changed without a year band.
const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
  festivals?: { name: string; month: number | null }[] | null;
};

export function BoardCanvas({
  state,
  setState,
  destinations,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestLite[];
}) {
  const locale = useLocale();
  const destMap = new Map(destinations.map((d) => [d.id, d]));
  const [selectedStopIdx, setSelectedStopIdx] = useState<number | null>(null);

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

  // Mobile fallback: when the month picker changes, shift every stop by the
  // delta so their relative spacing is preserved. Beats blowing away the user's
  // current dates just because they picked a new month.
  function setMonth(month: number) {
    setState((prev) => {
      const newFirstDoy = MONTH_STARTS[month - 1];
      const earliest = prev.stops.length > 0 ? Math.min(...prev.stops.map((s) => s.startDay)) : newFirstDoy;
      const delta = newFirstDoy - earliest;
      const stops = prev.stops.map((s) => {
        const shifted = s.startDay + delta;
        const maxStart = Math.max(1, 365 - s.days + 1);
        return { ...s, startDay: Math.max(1, Math.min(maxStart, shifted)) };
      });
      return { ...prev, month, stops };
    });
  }

  function setTravelers(travelers: number) {
    if (!Number.isFinite(travelers) || travelers < 1) return;
    setState((prev) => ({ ...prev, travelers }));
  }

  return (
    <section className="flex h-full flex-col bg-background" data-trip-canvas>
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={state.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name your trip"
            className="w-full bg-transparent font-serif text-2xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            {state.stops.length} stop{state.stops.length === 1 ? "" : "s"} · {totalDays(state)} days · {state.travelers} traveller{state.travelers === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Month picker — visible on mobile (where the year band hides) and
              kept on desktop as a quick-shift control. The setMonth handler
              preserves relative stop spacing rather than blowing away dates. */}
          <select
            value={state.month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border border-border bg-background px-3 py-1.5 font-mono text-xs"
            aria-label="Trip month"
          >
            {MONTHS_LONG.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={20}
            value={state.travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-16 border border-border bg-background px-2 py-1.5 font-mono text-xs"
            aria-label="Travellers"
          />
          <ColdStartReplayLink
            locale={locale}
            label="Start over"
            className="border border-border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground hover:border-foreground hover:text-foreground"
          />
        </div>
      </div>

      {/* YearBand — desktop only. Hidden on < md so the touch-no-drag UX isn't
          confusing on phones; the month picker above stands in for date
          control. data-yearband marker is the verify-after-deploy gate. */}
      {state.stops.length > 0 && (
        <div className="hidden border-b border-border bg-card/30 px-6 py-4 md:block">
          <YearBand
            state={state}
            setState={setState}
            destinations={destinations}
            selectedStopIdx={selectedStopIdx}
            onSelectStop={setSelectedStopIdx}
          />
        </div>
      )}

      {/* Stop cards (or empty state) */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {state.stops.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className="font-serif text-lg text-muted-foreground">No stops yet.</p>
            <p className="text-xs text-muted-foreground">
              Pick destinations from the library on the left, or hit &ldquo;Start over&rdquo; to reopen the wizard.
            </p>
          </div>
        ) : (
          <ul className="space-y-3" data-stops-list>
            {state.stops.map((stop, idx) => (
              <StopCard
                key={`${stop.destinationId}-${idx}`}
                stop={stop}
                idx={idx}
                totalStops={state.stops.length}
                dest={destMap.get(stop.destinationId)}
                isSelected={selectedStopIdx === idx}
                onSelect={() => setSelectedStopIdx(idx)}
                onMoveUp={() => moveStop(idx, -1)}
                onMoveDown={() => moveStop(idx, 1)}
                onRemove={() => removeStop(stop.destinationId)}
                onSetDays={(days) => setDays(stop.destinationId, days)}
                onSetNotes={(notes) => setNotes(stop.destinationId, notes)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function totalDays(state: TripStateV2): number {
  return state.stops.reduce((sum, s) => sum + (s.days || 0), 0);
}
