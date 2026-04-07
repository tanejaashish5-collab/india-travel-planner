"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ExploreFilters, type FilterState } from "./explore-filters";

interface DestinationData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  best_months: number[];
  translations: Record<string, Record<string, string>> | null;
  state: { name: string } | Array<{ name: string }> | null;
  state_id: string;
  kids_friendly:
    | { suitable: boolean; rating: number }
    | Array<{ suitable: boolean; rating: number }>
    | null;
  destination_months:
    | Array<{ month: number; score: number; note: string }>
    | null;
}

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

export function ExploreGrid({
  destinations,
  states,
}: {
  destinations: DestinationData[];
  states: Array<{ id: string; name: string }>;
}) {
  const locale = useLocale();
  const ts = useTranslations("score");
  const tm = useTranslations("months");

  const currentMonth = new Date().getMonth() + 1;

  const [filters, setFilters] = useState<FilterState>({
    stateId: "",
    month: currentMonth,
    kidsOnly: false,
    difficulty: "",
    search: "",
  });

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      // State filter
      if (filters.stateId && d.state_id !== filters.stateId) return false;

      // Difficulty filter
      if (filters.difficulty && d.difficulty !== filters.difficulty) return false;

      // Kids filter
      if (filters.kidsOnly) {
        const kf = Array.isArray(d.kids_friendly)
          ? d.kids_friendly[0]
          : d.kids_friendly;
        if (!kf?.suitable) return false;
      }

      // Month score filter (only show score 3+ for selected month)
      if (filters.month > 0 && d.destination_months) {
        const monthData = d.destination_months.find(
          (m) => m.month === filters.month,
        );
        // Don't filter out — just used for display. Let all destinations show.
      }

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const stateName = getStateName(d);
        if (
          !d.name.toLowerCase().includes(q) &&
          !d.tagline.toLowerCase().includes(q) &&
          !(stateName?.toLowerCase().includes(q)) &&
          !d.tags?.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }

      return true;
    });
  }, [destinations, filters]);

  // Sort by month score if a month is selected
  const sorted = useMemo(() => {
    if (filters.month === 0) return filtered;

    return [...filtered].sort((a, b) => {
      const aScore =
        a.destination_months?.find((m) => m.month === filters.month)?.score ?? -1;
      const bScore =
        b.destination_months?.find((m) => m.month === filters.month)?.score ?? -1;
      return bScore - aScore; // highest score first
    });
  }, [filtered, filters.month]);

  return (
    <>
      <ExploreFilters
        states={states}
        filters={filters}
        onChange={setFilters}
        resultCount={sorted.length}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((dest) => (
          <DestinationCard
            key={dest.id}
            dest={dest}
            locale={locale}
            selectedMonth={filters.month}
            ts={ts}
            tm={tm}
          />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No destinations match your filters</p>
          <p className="mt-1 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </>
  );
}

function getStateName(d: DestinationData): string {
  if (!d.state) return "";
  if (Array.isArray(d.state)) return d.state[0]?.name ?? "";
  return d.state.name ?? "";
}

function DestinationCard({
  dest,
  locale,
  selectedMonth,
  ts,
  tm,
}: {
  dest: DestinationData;
  locale: string;
  selectedMonth: number;
  ts: (key: string) => string;
  tm: (key: string) => string;
}) {
  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const stateName = getStateName(dest);
  const monthData =
    selectedMonth > 0
      ? dest.destination_months?.find((m) => m.month === selectedMonth)
      : null;
  const score = monthData?.score ?? null;

  return (
    <Link
      href={`/${locale}/destination/${dest.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Score + Kids */}
      <div className="mb-3 flex items-center justify-between">
        {score !== null ? (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${SCORE_COLORS[score] ?? SCORE_COLORS[0]}`}
          >
            {score}/5 — {ts(String(score))}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {selectedMonth > 0
              ? `No ${tm(String(selectedMonth))} data`
              : "Select month for scores"}
          </span>
        )}
        {kf && (
          <span className="text-xs text-muted-foreground">
            {kf.suitable ? `👶 ${kf.rating}/5` : "Adults only"}
          </span>
        )}
      </div>

      {/* Name & tagline */}
      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
        {dest.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
        {dest.tagline}
      </p>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {stateName && <span>{stateName}</span>}
        <span>·</span>
        <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>
          {dest.difficulty}
        </span>
        {dest.elevation_m && (
          <>
            <span>·</span>
            <span className="font-mono">
              {dest.elevation_m.toLocaleString()}m
            </span>
          </>
        )}
      </div>

      {/* Best months */}
      {dest.best_months?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {dest.best_months.slice(0, 4).map((m: number) => (
            <span
              key={m}
              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                m === selectedMonth
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tm(String(m)).slice(0, 3)}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {dest.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {dest.tags.slice(0, 4).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Month note */}
      {monthData?.note && (
        <p className="mt-2 text-[11px] text-muted-foreground/70 line-clamp-1 italic">
          {monthData.note}
        </p>
      )}
    </Link>
  );
}
