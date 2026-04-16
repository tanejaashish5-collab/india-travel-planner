"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { RegionFilterBar, RegionKey, getStateId, stateInRegion } from "./region-filter";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function CampingContent({ spots }: { spots: any[] }) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "permit-free" | "water" | "high-altitude">("all");
  const [activeRegion, setActiveRegion] = useState<RegionKey>(null);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      if (filter === "permit-free" && s.permit_required) return false;
      if (filter === "water" && !s.water_source) return false;
      if (filter === "high-altitude" && (!s.elevation_m || s.elevation_m < 3000)) return false;
      if (search) {
        const q = search.toLowerCase();
        const destName = Array.isArray(s.destinations) ? s.destinations[0]?.name : s.destinations?.name;
        if (
          !s.name.toLowerCase().includes(q) &&
          !(destName?.toLowerCase().includes(q)) &&
          !s.description?.toLowerCase().includes(q) &&
          !s.tags?.some((t: string) => t.toLowerCase().includes(q))
        ) return false;
      }
      if (activeRegion) {
        const stateId = getStateId(s);
        if (!stateInRegion(stateId, activeRegion)) return false;
      }
      return true;
    });
  }, [spots, search, filter, activeRegion]);

  return (
    <div className="space-y-6">
      <RegionFilterBar active={activeRegion} onChange={setActiveRegion} />
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search camping spots..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-2">
          {[
            { id: "all" as const, label: "All" },
            { id: "permit-free" as const, label: "No Permit" },
            { id: "water" as const, label: "Water Source" },
            { id: "high-altitude" as const, label: "3000m+" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                filter === f.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.04}>
        {filtered.map((spot) => {
          const destName = Array.isArray(spot.destinations) ? spot.destinations[0]?.name : spot.destinations?.name;
          return (
            <StaggerItem key={spot.id}>
              <HoverCard>
                <Link
                  href={spot.destination_id ? `/${locale}/destination/${spot.destination_id}` : "#"}
                  className="block rounded-xl border border-border bg-card overflow-hidden h-full hover:border-primary/40 hover:shadow-lg transition-all duration-200 group">
                  {/* Hero image from parent destination */}
                  {spot.destination_id && (
                    <div className="relative h-40 bg-muted/30 overflow-hidden film-grain">
                      <Image
                        src={`/images/destinations/${spot.destination_id}.jpg`}
                        alt={spot.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover ken-burns"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </div>
                  )}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{spot.name}</h3>
                    {spot.elevation_m && (
                      <span className="shrink-0 rounded bg-muted px-2 py-1 text-xs font-mono">
                        {spot.elevation_m.toLocaleString()}m
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{spot.description}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {spot.water_source && (
                      <span className="rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 text-xs">
                        💧 Water
                      </span>
                    )}
                    {spot.permit_required ? (
                      <span className="rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 text-xs">
                        📋 Permit
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 text-xs">
                        Free access
                      </span>
                    )}
                  </div>

                  {/* Facilities */}
                  {spot.facilities && (
                    <p className="text-sm text-muted-foreground/70 mb-2">{spot.facilities}</p>
                  )}

                  {/* Open months */}
                  {spot.open_months?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {spot.open_months.map((m: number) => (
                        <span key={m} className="rounded bg-muted px-1.5 py-1 text-xs text-muted-foreground">
                          {MONTH_SHORT[m]}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {spot.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {spot.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Destination name */}
                  {destName && (
                    <p className="text-xs text-primary font-medium">
                      📍 {destName}
                    </p>
                  )}
                </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg">No camping spots match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
