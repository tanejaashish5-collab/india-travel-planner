"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REGION_GROUPS } from "@/lib/seo-maps";

interface StateData {
  id: string;
  name: string;
  region: string;
  description: string | null;
  capital: string | null;
  display_order: number;
  destCount: number;
  heroDestId: string;
  regionDetail: {
    hero_tagline: string | null;
    tags: string[] | null;
    best_months: number[] | null;
    subregions: Array<{ id: string; name: string; description: string }> | null;
  } | null;
}

const REGION_TABS = [
  { id: "all", label: "All India" },
  { id: "north", label: "North" },
  { id: "northeast", label: "Northeast" },
  { id: "east", label: "East" },
  { id: "central", label: "Central" },
  // south & west will be added as destinations expand
];

export function StatesExplorer({ states, locale }: { states: StateData[]; locale: string }) {
  const [activeRegion, setActiveRegion] = useState("all");

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

  return (
    <>
      {/* Region tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-8 scrollbar-none">
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

      {/* State cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion}
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
                {/* Hero image — CSS background to avoid next/image crash on missing files */}
                <div
                  className="relative h-36 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))`,
                    backgroundImage: `url(/images/destinations/${state.heroDestId}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  {/* Destination count badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-mono font-bold text-white">
                    {state.destCount}
                  </div>
                  {/* State name overlay */}
                  <div className="absolute bottom-3 left-4">
                    <h2 className="text-lg font-bold text-foreground drop-shadow-md group-hover:text-primary transition-colors">
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
