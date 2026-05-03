"use client";

// StopCard — Phase 2.
//
// Per-stop card rendered below the YearBand. Replaces the bare list rows in
// the previous board-canvas with a richer card that:
//   - shows the stop's projected date window (startDay → startDay + days - 1)
//   - exposes days/notes inline editors (same as before)
//   - reserves a structured `alerts` slot that Phase 3's permit-checker /
//     conflict-aggregator will populate with permit / pass-closed / festival
//     overlap warnings. Phase 2 wires the obvious ones (pass status from
//     lib/passes.ts; festival overlap from the joined `festivals` row) so the
//     UX shows real signal already.
//
// The Phase 3 lib (lib/permit-checker.ts) will reuse this `Alert` shape so
// merging the rich conflict feed in is a one-line swap.

import { useMemo } from "react";
import type { TripStateV2, TripStop } from "@/lib/trip-storage";
import { PASSES_BY_DEST, passStatusForDate, doyToDate } from "@/lib/passes";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
  festivals?: { name: string; month: number | null }[] | null;
};

type AlertSeverity = "info" | "warn" | "block";
type Alert = { kind: "pass" | "festival" | "permit"; severity: AlertSeverity; message: string };

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

function doyToMonth(doy: number): number {
  for (let m = 1; m <= 12; m++) {
    if (doy < MONTH_STARTS[m]) return m;
  }
  return 12;
}

function doyLabel(doy: number): string {
  const month = doyToMonth(doy);
  const day = doy - MONTH_STARTS[month - 1] + 1;
  return `${MONTH_LABELS[month - 1]} ${day}`;
}

function scoreFor(d: DestLite | undefined, monthOneIndexed: number): number {
  if (!d) return 0;
  const row = (d.destination_months ?? []).find((m) => m.month === monthOneIndexed);
  return row?.score ?? 0;
}

export function StopCard({
  stop,
  idx,
  totalStops,
  dest,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onRemove,
  onSetDays,
  onSetNotes,
}: {
  stop: TripStop;
  idx: number;
  totalStops: number;
  dest: DestLite | undefined;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onSetDays: (days: number) => void;
  onSetNotes: (notes: string) => void;
}) {
  // Project the stop onto absolute dates using the current year. The year-band
  // also uses this in its drag math so the two stay aligned.
  const startMonth = doyToMonth(stop.startDay);
  const endDoy = Math.min(365, stop.startDay + Math.max(1, stop.days) - 1);
  const score = scoreFor(dest, startMonth);

  // Phase 2 alerts: pass status for the date, festivals overlapping the month.
  // Phase 3 will replace this with the full lib/permit-checker scan.
  const alerts = useMemo<Alert[]>(() => {
    const out: Alert[] = [];

    // Pass status — only for stops whose destination touches a pass.
    const passes = PASSES_BY_DEST[stop.destinationId] ?? [];
    for (const p of passes) {
      const startDate = doyToDate(stop.startDay, new Date().getUTCFullYear());
      const status = passStatusForDate(p, startDate);
      if (status === "closed") {
        out.push({
          kind: "pass",
          severity: "warn",
          message: `${p.name} likely closed on ${doyLabel(stop.startDay)} — typical window ${doyLabel(p.season_open_doy)} → ${doyLabel(p.season_close_doy)}.`,
        });
      }
    }

    // Festival overlap — surface festivals in the stop's start month so the
    // user sees crowds/closures coming. Caps at first 2 to keep cards short.
    const festivals = (dest?.festivals ?? [])
      .filter((f) => f.month === startMonth)
      .slice(0, 2);
    for (const f of festivals) {
      out.push({
        kind: "festival",
        severity: "info",
        message: `${f.name} falls in ${MONTH_LABELS[startMonth - 1]} — expect crowds + price spikes.`,
      });
    }

    return out;
  }, [stop.startDay, stop.destinationId, dest, startMonth]);

  return (
    <li
      className={`border ${isSelected ? "border-amber-500" : "border-border"} bg-card p-4 transition-colors`}
      data-stop-card
      data-stop-id={stop.destinationId}
      onMouseEnter={onSelect}
    >
      <div className="flex items-start gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          #{String(idx + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h3 className="font-serif text-xl font-medium">{dest?.name ?? stop.destinationId}</h3>
            <span className="text-[11px] text-muted-foreground">
              {dest?.state?.name ?? ""}
              {dest?.elevation_m ? ` · ${dest.elevation_m}m` : ""}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <label className="flex items-center gap-1.5">
              <span>Days</span>
              <input
                type="number"
                min={1}
                max={30}
                value={stop.days}
                onChange={(e) => onSetDays(Number(e.target.value))}
                className="w-14 border border-border bg-background px-1.5 py-0.5 font-mono text-xs"
              />
            </label>
            <span>·</span>
            <span className="font-mono">
              {doyLabel(stop.startDay)} → {doyLabel(endDoy)}
            </span>
          </div>
          <input
            type="text"
            value={stop.notes}
            onChange={(e) => onSetNotes(e.target.value)}
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
          title={`${MONTH_LABELS[startMonth - 1]} score`}
        >
          {score || "—"}/5
        </span>
      </div>

      {/* Alert slot — Phase 3 fills with structured conflicts from lib/permit-checker.
          Phase 2 surfaces the obvious ones (pass closures, festival overlap)
          so the year band doesn't look decorative. */}
      {alerts.length > 0 && (
        <ul className="mt-3 space-y-1.5" data-stop-alerts>
          {alerts.map((a, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 border-l-2 px-3 py-1.5 text-[11.5px] ${
                a.severity === "block"
                  ? "border-rose-600 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
                  : a.severity === "warn"
                    ? "border-amber-600 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
                    : "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
              }`}
              data-alert-kind={a.kind}
              data-alert-severity={a.severity}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">{a.kind}</span>
              <span className="flex-1">{a.message}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={idx === 0}
          className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30"
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={idx === totalStops - 1}
          className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30"
          aria-label="Move down"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10.5px] uppercase text-rose-600 hover:border-rose-600"
          aria-label="Remove stop"
        >
          Remove
        </button>
      </div>
    </li>
  );
}

// Re-export TripStateV2 for the callers that import from one place.
export type { TripStateV2 };
