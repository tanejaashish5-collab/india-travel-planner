"use client";

import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { ExploreGrid } from "./explore-grid";
import { ExploreFilters, type FilterState } from "./explore-filters";
import { currentMonthIST } from "@itp/shared";

// Lazy load map to avoid SSR issues with Leaflet
const ExploreMap = lazy(() =>
  import("./explore-map").then((mod) => ({ default: mod.ExploreMap }))
);

type ViewMode = "grid" | "map";

interface DestinationData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  translations: Record<string, Record<string, string>> | null;
  state: { name: string } | Array<{ name: string }> | null;
  state_id: string;
  kids_friendly:
    | { suitable: boolean; rating: number }
    | Array<{ suitable: boolean; rating: number }>
    | null;
  destination_months:
    | Array<{ month: number; score: number; note: string; solo_female_override?: number | null }>
    | null;
  coords: { lat: number; lng: number } | null;
}

/**
 * Wire shape from explore/page.tsx (lib/explore-catalog compactMonths): 12
 * scores Jan..Dec in `ms`, optional per-month solo-female overrides in `sfo`,
 * and only the `notesMonth` note in `n`. Expanded back to destination_months
 * below so ExploreGrid / the map keep their existing shape.
 */
type CompactDestination = Omit<DestinationData, "destination_months"> & {
  ms: (number | null)[];
  sfo?: (number | null)[];
  n?: string;
};

function getStateName(d: DestinationData): string {
  if (!d.state) return "";
  if (Array.isArray(d.state)) return d.state[0]?.name ?? "";
  return d.state.name ?? "";
}

export function ExploreWithMap({
  destinations: compact,
  states,
  notesMonth,
}: {
  destinations: CompactDestination[];
  states: Array<{ id: string; name: string }>;
  notesMonth: number;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const t = useTranslations("nav");
  const currentMonth = currentMonthIST();

  // Shared filter state. NOT initialized via useSearchParams: reading query
  // params through that hook forces this whole subtree out of static
  // rendering on the ISR page (Next ships only the Suspense fallback), so
  // the 2MB explore HTML contained ZERO crawlable destination links
  // (2026-07-15 audit). Defaults render statically; deep-link params are
  // applied in the mount effect below.
  const [filters, setFilters] = useState<FilterState>({
    stateId: "",
    month: currentMonth,
    kidsOnly: false,
    soloFemaleOnly: false,
    ecoOnly: false,
    sort: "",
    difficulty: "",
    search: "",
  });

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if ([...sp.keys()].length === 0) return;
    setFilters({
      stateId: sp.get("state") ?? "",
      month: Number(sp.get("month")) || currentMonth,
      kidsOnly: sp.get("kids") === "true",
      soloFemaleOnly: sp.get("solof") === "true",
      ecoOnly: sp.get("eco") === "true",
      sort: sp.get("sort") ?? "",
      difficulty: sp.get("difficulty") ?? "",
      search: sp.get("q") ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notes for months other than notesMonth, fetched on demand (month → id → note).
  const [extraNotes, setExtraNotes] = useState<Record<number, Record<string, string>>>({});
  useEffect(() => {
    const m = filters.month;
    if (!m || m === notesMonth || extraNotes[m]) return;
    let cancelled = false;
    fetch(`/api/explore-notes?month=${m}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled && j?.notes) setExtraNotes((prev) => ({ ...prev, [m]: j.notes }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [filters.month, notesMonth, extraNotes]);

  const destinations: DestinationData[] = useMemo(
    () =>
      compact.map(({ ms, sfo, n, ...d }) => ({
        ...d,
        destination_months: ms.flatMap((score, i) => {
          if (score == null) return [];
          const month = i + 1;
          const note = month === notesMonth ? n : extraNotes[month]?.[d.id];
          return [{ month, score, solo_female_override: sfo?.[i] ?? null, note: note ?? "" }];
        }),
      })),
    [compact, notesMonth, extraNotes],
  );

  const ecoCount = useMemo(
    () => destinations.filter((d) => {
      const tier = (d as any).eco_tier;
      return tier === "high" || tier === "mid";
    }).length,
    [destinations],
  );

  // Apply filters to destinations (shared between grid + map)
  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (filters.stateId && d.state_id !== filters.stateId) return false;
      if (filters.difficulty && d.difficulty !== filters.difficulty) return false;

      if (filters.kidsOnly) {
        const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
        if (!kf?.suitable) return false;
      }

      if (filters.soloFemaleOnly) {
        const override = filters.month > 0
          ? (d as any).destination_months?.find((m: any) => m.month === filters.month)?.solo_female_override ?? null
          : null;
        const effective = override != null ? override : ((d as any).solo_female_score ?? null);
        if (effective == null || effective < 4) return false;
      }

      if (filters.ecoOnly) {
        const tier = (d as any).eco_tier;
        if (tier !== "high" && tier !== "mid") return false;
      }

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

  // Prepare map data from filtered destinations
  const mapDestinations = useMemo(() => {
    return filtered.map((d) => {
      const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
      const monthData = d.destination_months?.find((m) => m.month === filters.month);
      const stateName = getStateName(d);

      return {
        id: d.id,
        name: d.name,
        tagline: d.tagline,
        difficulty: d.difficulty,
        coords: d.coords,
        monthScore: monthData?.score ?? null,
        kidsRating: kf?.rating ?? null,
        kidsSuitable: kf?.suitable ?? null,
        stateName,
      };
    });
  }, [filtered, filters.month]);

  return (
    <div>
      {/* View Toggle */}
      <div className="mb-4 flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-border p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("viewGrid")}
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "map"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("viewMap")}
          </button>
        </div>
        {viewMode === "map" && (
          <span className="text-xs text-muted-foreground">
            {mapDestinations.filter((d) => d.coords).length} markers · colored by score
          </span>
        )}
      </div>

      {/* Shared filters — always visible */}
      {viewMode === "map" && (
        <ExploreFilters
          states={states}
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
          ecoCount={ecoCount}
        />
      )}

      {/* Content */}
      {viewMode === "grid" ? (
        <ExploreGrid
          priorityCount={0}
          destinations={destinations}
          states={states}
          sharedFilters={filters}
          onFiltersChange={setFilters}
          ecoCount={ecoCount}
        />
      ) : (
        <Suspense
          fallback={
            <div className="w-full h-[500px] rounded-xl border border-border bg-muted/30 flex items-center justify-center mt-6">
              <div className="text-muted-foreground">Loading map...</div>
            </div>
          }
        >
          <div className="mt-6">
            <ExploreMap destinations={mapDestinations} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
