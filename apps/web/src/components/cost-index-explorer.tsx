"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

type Row = {
  destination_id: string;
  category: string;
  season: string;
  months: number[];
  typical_inr: number;
  range_low_inr: number | null;
  range_high_inr: number | null;
  unit: string;
  source_ref: string;
  notes: string | null;
};

type Props = {
  rows: Row[];
  destLookup: Record<string, { name: string; stateName: string | null }>;
  categoryLabels: Record<string, string>;
};

const UNIT_LABEL: Record<string, string> = {
  per_day: "/day",
  per_night: "/night",
  per_unit: "/leg",
  one_time: "one-time",
};

const SEASON_CHIP: Record<string, string> = {
  peak:     "bg-rose-500/10 border-rose-500/30 text-rose-200",
  shoulder: "bg-amber-500/10 border-amber-500/30 text-amber-200",
  low:      "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
};

function formatINR(n: number | null): string {
  if (n == null) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function CostIndexExplorer({ rows, destLookup, categoryLabels }: Props) {
  const locale = useLocale();
  const [category, setCategory] = useState<string>("homestay");
  const [season, setSeason] = useState<string>("peak");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-asc");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filteredRows = rows.filter((r) => {
      if (r.category !== category) return false;
      if (r.season !== season) return false;
      if (q) {
        const dest = destLookup[r.destination_id];
        if (!dest) return false;
        const hay = `${dest.name} ${dest.stateName ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    filteredRows.sort((a, b) => {
      if (sortBy === "price-asc") return a.typical_inr - b.typical_inr;
      if (sortBy === "price-desc") return b.typical_inr - a.typical_inr;
      const aName = destLookup[a.destination_id]?.name ?? a.destination_id;
      const bName = destLookup[b.destination_id]?.name ?? b.destination_id;
      return aName.localeCompare(bName);
    });

    return filteredRows;
  }, [rows, category, season, search, sortBy, destLookup]);

  // Quick stats on the filtered slice
  const stats = useMemo(() => {
    if (filtered.length === 0) return { median: 0, min: 0, max: 0, avg: 0 };
    const prices = filtered.map((r) => r.typical_inr).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    return { median, min: prices[0], max: prices[prices.length - 1], avg };
  }, [filtered]);

  const unitLabel = filtered.length > 0 ? UNIT_LABEL[filtered[0].unit] ?? "" : "";

  return (
    <div>
      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] mb-4">
        <div>
          <label className="block mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          >
            {Object.entries(categoryLabels).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
            Season
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          >
            <option value="peak">Peak</option>
            <option value="shoulder">Shoulder</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label className="block mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
            Sort
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          >
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by destination or state..."
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Stats bar for the filtered slice */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-muted-foreground/70">Median</div>
            <div className="text-lg font-semibold tabular-nums">{formatINR(stats.median)}<span className="text-xs font-normal text-muted-foreground ml-1">{unitLabel}</span></div>
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-muted-foreground/70">Average</div>
            <div className="text-lg font-semibold tabular-nums">{formatINR(stats.avg)}<span className="text-xs font-normal text-muted-foreground ml-1">{unitLabel}</span></div>
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-muted-foreground/70">Cheapest</div>
            <div className="text-lg font-semibold tabular-nums">{formatINR(stats.min)}<span className="text-xs font-normal text-muted-foreground ml-1">{unitLabel}</span></div>
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-[10px] font-mono tracking-[0.08em] uppercase text-muted-foreground/70">Most expensive</div>
            <div className="text-lg font-semibold tabular-nums">{formatINR(stats.max)}<span className="text-xs font-normal text-muted-foreground ml-1">{unitLabel}</span></div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-card/40">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Destination</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70 hidden sm:table-cell">State</th>
              <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Typical</th>
              <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70 hidden md:table-cell">Range</th>
              <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70 hidden md:table-cell">Season</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((r, i) => {
              const dest = destLookup[r.destination_id];
              const name = dest?.name ?? r.destination_id.replace(/-/g, " ");
              const stateName = dest?.stateName;
              return (
                <tr key={`${r.destination_id}-${r.category}-${r.season}-${i}`} className="border-b border-border/50 last:border-0 hover:bg-card/30 transition-colors">
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/${locale}/destination/${r.destination_id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{stateName ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                    {formatINR(r.typical_inr)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-muted-foreground tabular-nums hidden md:table-cell">
                    {formatINR(r.range_low_inr)} – {formatINR(r.range_high_inr)}
                  </td>
                  <td className="px-4 py-2.5 text-right hidden md:table-cell">
                    <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${SEASON_CHIP[r.season] ?? "border-border"}`}>
                      {r.season}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > 200 && (
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Showing 200 of {filtered.length.toLocaleString()} rows. Narrow with the search above, or open a destination page for full per-month detail.
        </p>
      )}
      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground text-center">
          No rows match this filter. Try another category or season.
        </p>
      )}
    </div>
  );
}
