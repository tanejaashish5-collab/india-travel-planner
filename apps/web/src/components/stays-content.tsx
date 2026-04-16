"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { RegionFilterBar, RegionKey, getStateId, stateInRegion } from "./region-filter";

export function StaysContent({ destinations }: { destinations: any[] }) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "budget" | "workable" | "family">("all");
  const [activeRegion, setActiveRegion] = useState<RegionKey>(null);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (activeRegion) {
        const stateId = getStateId(d);
        if (stateId && !stateInRegion(stateId, activeRegion)) return false;
      }
      if (filter === "budget") {
        const budget = d.stay_zones?.budget_range?.off_season;
        if (!budget || !budget.includes("₹")) return false;
        // Show places with off-season under ₹1500
        const match = budget.match(/₹(\d+)/);
        if (match && parseInt(match[1]) > 1500) return false;
      }
      if (filter === "workable" && (!d.workability || d.workability.remote_work_rating < 3)) return false;
      if (filter === "family" && d.family_stress?.includes("not recommended")) return false;

      if (search) {
        const q = search.toLowerCase();
        const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
        if (
          !d.name.toLowerCase().includes(q) &&
          !(stateName?.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [destinations, search, filter, activeRegion]);

  return (
    <div className="space-y-6">
      <RegionFilterBar active={activeRegion} onChange={setActiveRegion} />
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-2">
          {[
            { id: "all" as const, label: "All" },
            { id: "budget" as const, label: "Budget-friendly" },
            { id: "workable" as const, label: "Remote work" },
            { id: "family" as const, label: "Family-safe" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
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

      <p className="text-sm text-muted-foreground">{filtered.length} destinations with stay intelligence</p>

      {/* Grid */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2" staggerDelay={0.05}>
        {filtered.map((dest) => {
          const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
          const sz = dest.stay_zones || {};

          return (
            <StaggerItem key={dest.id}>
            <HoverCard>
            <Link
              href={`/${locale}/destination/${dest.id}`}
              className="group block rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              {/* Hero */}
              <div className="relative h-36 bg-muted/30 overflow-hidden">
                <Image
                  src={`/images/destinations/${dest.id}.jpg`}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover ken-burns"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                {dest.vehicle_fit && (
                  <span className={`absolute top-2 right-2 rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${
                    dest.vehicle_fit.includes("hatchback") ? "border-emerald-500/30 text-emerald-300 bg-black/40" :
                    dest.vehicle_fit.includes("SUV") ? "border-yellow-500/30 text-yellow-300 bg-black/40" :
                    "border-red-500/30 text-red-300 bg-black/40"
                  }`}>
                    🚗 {dest.vehicle_fit}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground">{stateName}</p>
                  </div>
                  {dest.family_stress && (
                    <span className="text-xs text-muted-foreground/70 max-w-[120px] text-right">
                      👨‍👩‍👧 {dest.family_stress}
                    </span>
                  )}
                </div>

                {/* Stay zones */}
                <div className="space-y-1.5 mt-3">
                  {sz.best_for_families && (
                    <p className="text-sm"><span className="text-emerald-400 font-medium">Families:</span> <span className="text-muted-foreground">{sz.best_for_families}</span></p>
                  )}
                  {sz.best_for_backpackers && (
                    <p className="text-sm"><span className="text-blue-400 font-medium">Backpackers:</span> <span className="text-muted-foreground">{sz.best_for_backpackers}</span></p>
                  )}
                  {sz.best_for_quiet && (
                    <p className="text-sm"><span className="text-purple-400 font-medium">Peace:</span> <span className="text-muted-foreground">{sz.best_for_quiet}</span></p>
                  )}
                </div>

                {/* Budget + Stay types */}
                <div className="mt-3 flex items-center justify-between">
                  {sz.budget_range && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {sz.budget_range.off_season && `Off: ${sz.budget_range.off_season}`}
                      {sz.budget_range.peak && ` · Peak: ${sz.budget_range.peak}`}
                    </span>
                  )}
                  {dest.workability?.remote_work_rating >= 3 && (
                    <span className="rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 text-xs font-medium">
                      💻 WFH {dest.workability.remote_work_rating}/5
                    </span>
                  )}
                </div>

                {/* Stay types */}
                {sz.stay_types?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sz.stay_types.map((type: string) => (
                      <span key={type} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground capitalize">
                        {type}
                      </span>
                    ))}
                  </div>
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
          <p className="text-lg">No destinations match your filters</p>
        </div>
      )}
    </div>
  );
}
