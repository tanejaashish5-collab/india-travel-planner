"use client";

// BoardCanvas — center pane of the Trip Board.
//
// Phase 1 ships a functional stop list (add / reorder / remove / edit days)
// so the user can manipulate stops the moment they leave ColdStart.
//
// Phase 2 replaces the simple list with the year band + draggable stop pills.
// Phase 5 adds a Map toggle (Atlas variant) using the existing Leaflet setup.
//
// Until then, the list is the canvas. It already gives the user reordering
// + day-tweaks, which the legacy trip-board.tsx had — no regression.

import type { TripStateV2 } from "@/lib/trip-storage";
import { ColdStartReplayLink } from "./cold-start-replay-link";
import { useLocale } from "next-intl";

const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
};

function scoreFor(d: DestLite | undefined, monthOneIndexed: number): number {
  if (!d) return 0;
  const row = (d.destination_months ?? []).find((m) => m.month === monthOneIndexed);
  return row?.score ?? 0;
}

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

  function setMonth(month: number) {
    setState((prev) => ({ ...prev, month }));
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

      {/* Stops (Phase 2 will replace with YearBand + StopCard grid) */}
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
            {state.stops.map((stop, idx) => {
              const d = destMap.get(stop.destinationId);
              const score = scoreFor(d, state.month);
              return (
                <li
                  key={stop.destinationId}
                  className="border border-border bg-card p-4"
                  data-stop-card
                  data-stop-id={stop.destinationId}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">#{String(idx + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif text-xl font-medium">{d?.name ?? stop.destinationId}</h3>
                        <span className="text-[11px] text-muted-foreground">
                          {d?.state?.name ?? ""}{d?.elevation_m ? ` · ${d.elevation_m}m` : ""}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <label className="flex items-center gap-1.5">
                          <span>Days</span>
                          <input
                            type="number"
                            min={1}
                            max={30}
                            value={stop.days}
                            onChange={(e) => setDays(stop.destinationId, Number(e.target.value))}
                            className="w-14 border border-border bg-background px-1.5 py-0.5 font-mono text-xs"
                          />
                        </label>
                        <span>·</span>
                        <span className="font-mono">starts day {stop.startDay}</span>
                      </div>
                      <input
                        type="text"
                        value={stop.notes}
                        onChange={(e) => setNotes(stop.destinationId, e.target.value)}
                        placeholder="Notes for this stop…"
                        className="mt-2 w-full border-b border-border bg-transparent py-1 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <span
                      className={`flex h-9 min-w-[40px] items-center justify-center font-mono text-xs font-bold ${
                        score >= 4
                          ? "bg-emerald-700 text-white"
                          : score >= 3
                            ? "bg-amber-600 text-white"
                            : score >= 1
                              ? "bg-rose-600 text-white"
                              : "bg-muted text-muted-foreground"
                      }`}
                      title={`Month ${state.month} score`}
                    >
                      {score || "—"}/5
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => moveStop(idx, -1)}
                      disabled={idx === 0}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStop(idx, 1)}
                      disabled={idx === state.stops.length - 1}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStop(stop.destinationId)}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-rose-600 hover:border-rose-600"
                      aria-label="Remove stop"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Phase-2 marker so a curl test can confirm the new shell shipped. */}
        <div data-yearband-placeholder hidden />
      </div>
    </section>
  );
}

function totalDays(state: TripStateV2): number {
  return state.stops.reduce((sum, s) => sum + (s.days || 0), 0);
}
