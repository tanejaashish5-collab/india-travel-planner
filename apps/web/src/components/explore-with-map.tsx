"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ExploreGrid } from "./explore-grid";
import { ExploreFilters, type FilterState } from "./explore-filters";

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
  coords: { lat: number; lng: number } | null;
}

function getStateName(d: DestinationData): string {
  if (!d.state) return "";
  if (Array.isArray(d.state)) return d.state[0]?.name ?? "";
  return d.state.name ?? "";
}

export function ExploreWithMap({
  destinations,
  states,
}: {
  destinations: DestinationData[];
  states: Array<{ id: string; name: string }>;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const searchParams = useSearchParams();
  const currentMonth = new Date().getMonth() + 1;

  // Shared filter state — initialized from URL params
  const [filters, setFilters] = useState<FilterState>({
    stateId: searchParams.get("state") ?? "",
    month: Number(searchParams.get("month")) || currentMonth,
    kidsOnly: searchParams.get("kids") === "true",
    soloFemaleOnly: searchParams.get("solof") === "true",
    sort: searchParams.get("sort") ?? "",
    difficulty: searchParams.get("difficulty") ?? "",
    search: searchParams.get("q") ?? "",
  });

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
            Grid
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "map"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Map
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
        />
      )}

      {/* Content */}
      {viewMode === "grid" ? (
        <ExploreGrid
          destinations={destinations}
          states={states}
          sharedFilters={filters}
          onFiltersChange={setFilters}
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
