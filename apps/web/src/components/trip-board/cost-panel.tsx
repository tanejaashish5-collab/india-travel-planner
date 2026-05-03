"use client";

// CostPanel — right rail of the Trip Board (Phase 1 shell).
//
// Phase 1 shows a tier toggle + naive client-side estimate using the
// destination_costs columns embedded in the destinations[] prop (`daily_cost`
// — see trip page select). Numbers are approximate and don't yet hit the
// get_trip_logistics RPC.
//
// Phase 3 wires the real lib/cost-aggregator.ts (RPC-driven, dual-shape
// daily_cost handling, "Reviewed today" pip from section_reviews).
//
// Phase 3 also adds the ConflictsPanel below this — for now we surface a
// minimal permit alert per stop using the structured permit_type the
// destinations[] could be extended to carry (currently isn't — stub block).

import { useMemo, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";

type DestLite = {
  id: string;
  name: string;
  daily_cost?: Record<string, unknown> | null;
};

type Tier = "budget" | "mid" | "lux";

const TIERS: { id: Tier; label: string }[] = [
  { id: "budget", label: "Budget" },
  { id: "mid", label: "Mid" },
  { id: "lux", label: "Lux" },
];

const inrFmt = new Intl.NumberFormat("en-IN");

/**
 * Read a per-day estimate from `daily_cost` regardless of shape. The trust
 * sweep on 2026-05-03 surfaced two shapes in production:
 *   rich: { budget: { stay, food, transport, activities, total }, mid: {...}, ... }
 *   thin: { mid: 2000, budget: 800 }
 * We accept both. Anything we can't parse returns null (counted as "—").
 */
function dailyCostFor(daily_cost: unknown, tier: Tier): number | null {
  if (!daily_cost || typeof daily_cost !== "object") return null;
  const dc = daily_cost as Record<string, unknown>;
  const slotKey = tier === "lux" ? "splurge" : tier;
  const slot = dc[slotKey] ?? dc[tier];
  if (slot == null) return null;
  if (typeof slot === "number") return Number.isFinite(slot) ? slot : null;
  if (typeof slot === "object") {
    const s = slot as Record<string, unknown>;
    if (typeof s.total === "number") return s.total;
    // Sum the canonical line items if present.
    const sum = ["stay", "food", "transport", "activities", "activity"]
      .map((k) => (typeof s[k] === "number" ? (s[k] as number) : 0))
      .reduce((a, b) => a + b, 0);
    return sum > 0 ? sum : null;
  }
  return null;
}

export function CostPanel({
  state,
  destinations,
}: {
  state: TripStateV2;
  destinations: DestLite[];
}) {
  const [tier, setTier] = useState<Tier>("mid");
  const [collapsed, setCollapsed] = useState(false);

  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);

  const lines = useMemo(() => {
    return state.stops.map((s) => {
      const d = destMap.get(s.destinationId);
      const perDay = dailyCostFor(d?.daily_cost, tier);
      const subtotal = perDay != null ? perDay * Math.max(1, s.days || 1) : null;
      return { slug: s.destinationId, name: d?.name ?? s.destinationId, days: s.days, perDay, subtotal };
    });
  }, [state.stops, destMap, tier]);

  const total = useMemo(() => {
    return lines.reduce((acc, l) => acc + (l.subtotal ?? 0), 0);
  }, [lines]);

  const incomplete = lines.some((l) => l.subtotal == null);

  if (collapsed) {
    return (
      <div className="flex w-10 flex-col items-center justify-start border-l border-border bg-background py-4">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Expand cost panel"
          className="rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          ‹
        </button>
      </div>
    );
  }

  return (
    <aside
      className="flex h-full flex-col border-l border-border bg-background"
      data-trip-cost
      data-cost-aggregate
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">Live aggregator</p>
          <p className="text-[11px] text-muted-foreground">est. per traveller</p>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse cost panel"
          className="rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          ›
        </button>
      </div>

      {/* Tier toggle */}
      <div className="flex border-b border-border">
        {TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTier(t.id)}
            className={`flex-1 border-r border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] last:border-r-0 ${
              tier === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="border-b border-border px-4 py-5">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          What this trip costs · {tierLabel(tier)}
        </p>
        <p className="mt-2 font-mono text-3xl font-bold text-foreground">
          ₹{inrFmt.format(total)}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          per person · {totalDays(state)} day{totalDays(state) === 1 ? "" : "s"}
        </p>
        {incomplete && (
          <p className="mt-2 text-[10.5px] italic text-amber-700">
            Some stops missing cost data — total is a floor, real cost will be higher.
          </p>
        )}
      </div>

      {/* Per-stop breakdown */}
      <div className="flex-1 overflow-y-auto">
        {lines.length === 0 ? (
          <p className="p-4 font-serif text-sm italic text-muted-foreground">
            Add a destination from the library to see costs.
          </p>
        ) : (
          <ul>
            {lines.map((l) => (
              <li
                key={l.slug}
                className="flex items-baseline justify-between gap-2 border-b border-border px-4 py-2.5"
              >
                <span className="min-w-0 flex-1 truncate font-serif text-sm">{l.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{l.days}d</span>
                <span className="font-mono text-sm">
                  {l.subtotal != null ? `₹${inrFmt.format(l.subtotal)}` : "—"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Phase 3 will replace this with ConflictsPanel + permit dialog */}
      <div className="border-t border-border px-4 py-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
          Conflicts
        </p>
        <p className="mt-1 text-[11px] italic text-muted-foreground">
          Permit + pass + festival alerts arrive in the next update.
        </p>
      </div>
    </aside>
  );
}

function tierLabel(t: Tier) {
  return t === "budget" ? "Budget" : t === "mid" ? "Mid-range" : "Splurge";
}

function totalDays(state: TripStateV2): number {
  return state.stops.reduce((sum, s) => sum + (s.days || 0), 0);
}
