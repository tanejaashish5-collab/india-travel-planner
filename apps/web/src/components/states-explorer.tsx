"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { m as motion, AnimatePresence } from "framer-motion";
import { REGION_GROUPS } from "@/lib/seo-maps";

const IndiaMap = lazy(() => import("./india-map").then((mod) => ({ default: mod.IndiaMap })));

interface StateData {
  id: string;
  name: string;
  region: string;
  description: string | null;
  capital: string | null;
  display_order: number;
  destCount: number;
  heroDestId: string;
  avgScore: number | null;
  regionDetail: {
    hero_tagline: string | null;
    tags: string[] | null;
    best_months: number[] | null;
    subregions: Array<{ id: string; name: string; description: string }> | null;
  } | null;
}

const REGION_TABS = [
  { id: "all", label: "All India" },
  ...Object.entries(REGION_GROUPS).map(([id, r]) => ({ id, label: r.name.replace(" India", "") })),
];

export function StatesExplorer({ states, locale }: { states: StateData[]; locale: string }) {
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get("region") ?? "all";
  const [activeRegion, setActiveRegion] = useState(initialRegion);
  // Show grid (not map) when a specific region is pre-selected via URL
  const [viewMode, setViewMode] = useState<"map" | "grid">(initialRegion !== "all" ? "grid" : "map");

  const filtered = useMemo(() => {
    if (activeRegion === "all") return states;
    const regionGroup = REGION_GROUPS[activeRegion];
    if (!regionGroup) return states;
    return states.filter((s) => regionGroup.states.includes(s.id));
  }, [states, activeRegion]);

  const regionStats = useMemo(() => {
    const stats: Record<string, { count: number; dests: number }> = {};
    states.forEach((s) => {
      const regionKey = Object.entries(REGION_GROUPS).find(([, r]) => r.states.includes(s.id))?.[0] ?? "other";
      if (!stats[regionKey]) stats[regionKey] = { count: 0, dests: 0 };
      stats[regionKey].count++;
      stats[regionKey].dests += s.destCount;
    });
    return stats;
  }, [states]);

  // Map data format
  const mapStates = useMemo(() =>
    states.map((s) => ({
      id: s.id,
      name: s.name,
      destCount: s.destCount,
      avgScore: s.avgScore,
      region: s.region,
    })),
  [states]);

  return (
    <>
      {/* View toggle + Region tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Region tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {REGION_TABS.map((tab) => {
            const stat = tab.id === "all"
              ? { count: states.length, dests: states.reduce((s, st) => s + st.destCount, 0) }
              : regionStats[tab.id] ?? { count: 0, dests: 0 };

            return (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id)}
                className={`relative shrink-0 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                  activeRegion === tab.id
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-2 text-xs font-mono ${activeRegion === tab.id ? "text-background/70" : "text-muted-foreground/50"}`}>
                  {stat.dests}
                </span>
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="hidden sm:flex gap-1 rounded-lg border border-border p-0.5 text-xs">
          <button
            onClick={() => setViewMode("map")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              viewMode === "map" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Map view (desktop only) */}
      {viewMode === "map" && (
        <div className="hidden sm:block mb-10">
          <Suspense fallback={
            <div className="w-full h-[500px] rounded-2xl border border-border bg-muted/20 flex items-center justify-center text-muted-foreground">
              Loading map...
            </div>
          }>
            <div className="rounded-2xl border border-border/50 bg-card/30 p-4 sm:p-6">
              <IndiaMap states={mapStates} locale={locale} activeRegion={activeRegion} />
            </div>
          </Suspense>
        </div>
      )}

      {/* State cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion + viewMode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((state, i) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.6), duration: 0.3 }}
            >
              <a
                href={`/${locale}/state/${state.id}`}
                className="group flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all h-full"
              >
                {/* Hero image */}
                <div
                  className="relative h-36 overflow-hidden"
                  style={{
                    backgroundImage: `url(/images/destinations/${state.heroDestId}.jpg), linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-mono font-bold text-white">
                      {state.destCount}
                    </span>
                    {state.avgScore !== null && (
                      <span className={`rounded-full px-3 py-1 text-xs font-mono font-bold backdrop-blur-sm ${
                        state.avgScore >= 4 ? "bg-emerald-500/60 text-white" :
                        state.avgScore >= 3 ? "bg-yellow-500/60 text-white" :
                        state.avgScore >= 2 ? "bg-orange-500/60 text-white" :
                        "bg-red-500/60 text-white"
                      }`}>
                        {state.avgScore.toFixed(1)}/5
                      </span>
                    )}
                  </div>
                  {/* State name */}
                  <div className="absolute bottom-3 left-4">
                    <h2 className="text-lg font-semibold text-foreground drop-shadow-md group-hover:text-primary transition-colors">
                      {state.name}
                    </h2>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col">
                  {state.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {state.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between text-[10px] text-muted-foreground/60">
                    <div className="flex items-center gap-3">
                      {state.capital && <span>Capital: {state.capital}</span>}
                      <span>{state.region}</span>
                    </div>
                    {state.regionDetail?.subregions && (
                      <span>{state.regionDetail.subregions.length} sub-regions</span>
                    )}
                  </div>

                  {/* Best months mini strip */}
                  {state.regionDetail?.best_months && (
                    <div className="mt-2 flex gap-[2px]">
                      {Array.from({ length: 12 }, (_, mi) => {
                        const isBest = state.regionDetail!.best_months!.includes(mi + 1);
                        return (
                          <div
                            key={mi}
                            className={`h-1 flex-1 rounded-full ${isBest ? "bg-emerald-400" : "bg-muted-foreground/15"}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-lg">No states in this region yet.</p>
          <p className="mt-1 text-sm">We&apos;re expanding coverage — check back soon.</p>
        </div>
      )}
    </>
  );
}
