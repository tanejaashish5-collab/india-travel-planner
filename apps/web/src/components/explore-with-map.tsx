"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import { ExploreGrid } from "./explore-grid";
import { ExploreFilters, type FilterState } from "./explore-filters";

// Lazy load map to avoid SSR issues with Leaflet
const ExploreMap = lazy(() =>
  import("./explore-map").then((mod) => ({ default: mod.ExploreMap }))
);

type ViewMode = "grid" | "map";

export function ExploreWithMap({
  destinations,
  states,
}: {
  destinations: any[];
  states: any[];
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const currentMonth = new Date().getMonth() + 1;

  // Prepare map data from destinations
  const mapDestinations = useMemo(() => {
    return destinations.map((d: any) => {
      const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
      const monthData = d.destination_months?.find((m: any) => m.month === currentMonth);
      const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;

      return {
        id: d.id,
        name: d.name,
        tagline: d.tagline,
        difficulty: d.difficulty,
        coords: d.coords,
        monthScore: monthData?.score ?? null,
        kidsRating: kf?.rating ?? null,
        kidsSuitable: kf?.suitable ?? null,
        stateName: stateName ?? "",
      };
    });
  }, [destinations, currentMonth]);

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
            Markers colored by this month's score
          </span>
        )}
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <ExploreGrid destinations={destinations} states={states} />
      ) : (
        <Suspense
          fallback={
            <div className="w-full h-[500px] rounded-xl border border-border bg-muted/30 flex items-center justify-center">
              <div className="text-muted-foreground">Loading map...</div>
            </div>
          }
        >
          <ExploreMap destinations={mapDestinations} />
        </Suspense>
      )}
    </div>
  );
}
