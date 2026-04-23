"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { m as motion } from "framer-motion";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

interface RegionDetailProps {
  region: {
    id: string;
    name: string;
    description: string;
    subregions: Array<{ id: string; name: string; description: string }>;
    best_months: number[];
    hero_tagline: string;
    popular_anchors: string[];
    destinations: any[];
    gems: any[];
    routes: any[];
  };
}

export function RegionDetail({ region }: RegionDetailProps) {
  const locale = useLocale();
  const [selectedSubregion, setSelectedSubregion] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  // Group destinations by subregion
  const bySubregion = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const dest of region.destinations) {
      const sr = dest.subregion || "Other";
      if (!groups[sr]) groups[sr] = [];
      groups[sr].push(dest);
    }
    return groups;
  }, [region.destinations]);

  // Filter destinations
  const filteredDests = useMemo(() => {
    let dests = region.destinations;
    if (selectedSubregion) {
      dests = dests.filter((d: any) => d.subregion === selectedSubregion);
    }
    if (showHidden) {
      dests = dests.filter((d: any) => (d.hiddenness ?? 0) >= 3);
    }
    return dests;
  }, [region.destinations, selectedSubregion, showHidden]);

  // Popular vs Quiet pairs
  const popularVsQuiet = useMemo(() => {
    const popular = region.destinations.filter((d: any) => d.crowd_level === "overrun" || d.crowd_level === "crowded");
    return popular.map((p: any) => {
      const quietAlt = region.destinations.find((d: any) =>
        p.compare_against?.includes(d.id) && (d.crowd_level === "quiet" || d.crowd_level === "empty")
      );
      return quietAlt ? { popular: p, quiet: quietAlt } : null;
    }).filter(Boolean);
  }, [region.destinations]);

  return (
    <>
      {/* Hero */}
      <SlideIn>
        <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-muted/30 p-8 sm:p-10">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.08em] mb-3">
            Mountain Region Guide
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{region.name}</h1>
          <p className="mt-2 text-lg text-primary/80 italic">{region.hero_tagline}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">{region.description}</p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-lg border border-border bg-background/50 px-3 py-2 text-sm">
              <span className="font-mono font-bold text-primary">{region.destinations.length}</span> destinations
            </div>
            <div className="rounded-lg border border-border bg-background/50 px-3 py-2 text-sm">
              <span className="font-mono font-bold text-primary">{region.gems.length}</span> off-radar spots
            </div>
            <div className="rounded-lg border border-border bg-background/50 px-3 py-2 text-sm">
              <span className="font-mono font-bold text-primary">{region.routes.length}</span> routes
            </div>
            <div className="rounded-lg border border-border bg-background/50 px-3 py-2 text-sm">
              <span className="font-mono font-bold text-primary">{region.subregions.length}</span> subregions
            </div>
          </div>
        </div>
      </SlideIn>

      {/* Subregion Clusters */}
      <FadeIn delay={0.2}>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Subregions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {region.subregions.map((sr: any) => {
              const count = bySubregion[sr.name]?.length ?? 0;
              return (
                <HoverCard key={sr.id}>
                  <button
                    onClick={() => setSelectedSubregion(selectedSubregion === sr.name ? null : sr.name)}
                    className={`block w-full text-left rounded-xl border p-4 transition-all ${
                      selectedSubregion === sr.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{sr.name}</h3>
                      <span className={`rounded-full px-2 py-1 text-xs font-mono font-bold ${
                        selectedSubregion === sr.name ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>{count}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{sr.description}</p>
                    <div className="mt-2 text-xs text-primary font-medium">
                      {selectedSubregion === sr.name ? "✕ Clear filter" : "Show destinations ↓"}
                    </div>
                  </button>
                </HoverCard>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* Popular vs Quiet Alternatives */}
      {popularVsQuiet.length > 0 && (
        <FadeIn delay={0.3}>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">Popular vs Quiet Alternatives</h2>
            <p className="text-muted-foreground mb-4">Everyone goes to the popular one. Here's what they miss.</p>
            <div className="space-y-3">
              {popularVsQuiet.map((pair: any) => (
                <div key={pair.popular.id} className="flex gap-3 items-center">
                  <Link
                    href={`/${locale}/destination/${pair.popular.id}`}
                    className="flex-1 rounded-xl border border-border p-4 hover:border-muted-foreground/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-orange-500/20 text-orange-400 rounded-full px-2 py-0.5">{pair.popular.crowd_level}</span>
                      <span className="font-semibold">{pair.popular.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{pair.popular.tagline}</p>
                  </Link>
                  <div className="text-muted-foreground text-lg shrink-0">→</div>
                  <Link
                    href={`/${locale}/destination/${pair.quiet.id}`}
                    className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5">{pair.quiet.crowd_level}</span>
                      <span className="font-semibold text-emerald-400">{pair.quiet.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{pair.quiet.tagline}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Filter controls */}
      <div className="mb-6 flex flex-wrap gap-2">
        {selectedSubregion && (
          <button
            onClick={() => setSelectedSubregion(null)}
            className="rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
          >
            {selectedSubregion} ✕
          </button>
        )}
        <button
          onClick={() => setShowHidden(!showHidden)}
          className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            showHidden
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {showHidden ? "Showing hidden only ✕" : "Show off-radar spots only"}
        </button>
      </div>

      {/* Destination Grid */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedSubregion ? `${selectedSubregion}` : "All Destinations"}
          <span className="text-muted-foreground font-normal text-lg ml-2">({filteredDests.length})</span>
        </h2>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.04}>
          {filteredDests.map((dest: any) => {
            const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
            const monthScore = dest.destination_months?.find((m: any) => m.month === currentMonth)?.score;

            return (
              <StaggerItem key={dest.id}>
                <HoverCard>
                  <Link
                    href={`/${locale}/destination/${dest.id}`}
                    className="block rounded-xl border border-border bg-card p-5 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  >
                    {/* Badges row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1.5">
                        {monthScore !== undefined && (
                          <span className={`rounded-full border px-2 py-1 text-xs font-medium ${SCORE_COLORS[monthScore] ?? SCORE_COLORS[0]}`}>
                            {monthScore}/5
                          </span>
                        )}
                        {dest.place_type && dest.place_type !== "destination" && dest.place_type !== "anchor" && (
                          <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground capitalize">
                            {dest.place_type.replace("_", " ")}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1.5">
                        {dest.hiddenness >= 4 && (
                          <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-0.5">Off-Radar</span>
                        )}
                        {kf?.suitable && (
                          <span className="text-xs">👶 {kf.rating}/5</span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold group-hover:text-primary transition-colors">{dest.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{dest.tagline}</p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      {dest.subregion && <span>{dest.subregion}</span>}
                      <span>·</span>
                      <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>{dest.difficulty}</span>
                      {dest.elevation_m && (
                        <><span>·</span><span className="font-mono">{dest.elevation_m}m</span></>
                      )}
                    </div>

                    {/* Crowd + Remoteness */}
                    {(dest.crowd_level || dest.remoteness) && (
                      <div className="mt-2 flex gap-2 text-xs">
                        {dest.crowd_level && (
                          <span className={`rounded-full px-2 py-0.5 ${
                            dest.crowd_level === "empty" ? "bg-emerald-500/10 text-emerald-400" :
                            dest.crowd_level === "quiet" ? "bg-blue-500/10 text-blue-400" :
                            dest.crowd_level === "moderate" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-red-500/10 text-red-400"
                          }`}>
                            {dest.crowd_level}
                          </span>
                        )}
                        {dest.remoteness >= 4 && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Remote</span>
                        )}
                      </div>
                    )}
                  </Link>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Routes in this region */}
      {region.routes.length > 0 && (
        <FadeIn>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Routes in {region.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {region.routes.map((route: any) => (
                <HoverCard key={route.id}>
                  <Link
                    href={`/${locale}/routes/${route.id}`}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
                  >
                    <div className="font-mono text-2xl font-bold text-primary">{route.days}d</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{route.name}</h3>
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <span className={DIFFICULTY_COLORS[route.difficulty] ?? ""}>{route.difficulty}</span>
                        {route.kids_suitable && <span>👶</span>}
                        {route.bike_route && <span>🏍</span>}
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Off-radar spots count */}
      {region.gems.length > 0 && (
        <FadeIn>
          <section className="mb-10 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
            <div className="font-mono text-3xl font-bold text-primary">{region.gems.length}</div>
            <div className="font-semibold mt-1">Off-Radar Spots</div>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Places most tourists don't know about — secret viewpoints, unmarked waterfalls,
              villages with zero phone signal, and the kind of spots only locals can show you.
            </p>
            <Link
              href={`/${locale}/explore`}
              className="inline-block mt-4 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore all destinations →
            </Link>
          </section>
        </FadeIn>
      )}
    </>
  );
}
