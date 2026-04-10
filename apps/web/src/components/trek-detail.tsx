"use client";

import { useState, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ShareButton } from "./share-button";

const TrekTrailMap = lazy(() => import("./trek-trail-map").then((mod) => ({ default: mod.TrekTrailMap })));

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  moderate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  hard: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  extreme: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function TrekDetail({ trek }: { trek: any }) {
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState("overview");
  const destName = Array.isArray(trek.destinations) ? trek.destinations[0]?.name : trek.destinations?.name;
  const stateName = Array.isArray(trek.destinations) ? (Array.isArray(trek.destinations[0]?.state) ? trek.destinations[0]?.state[0]?.name : trek.destinations[0]?.state?.name) : null;
  const days = trek.day_by_day ?? [];

  const sections = [
    { id: "overview", label: "Overview" },
    ...(days.length > 0 ? [{ id: "itinerary", label: "Day by Day" }] : []),
    ...(trek.gear_essentials?.length > 0 ? [{ id: "gear", label: "Gear" }] : []),
    { id: "practical", label: "Practical Info" },
  ];

  // Calculate elevation profile from day_by_day
  const elevationPoints = days.map((d: any) => ({ day: d.day, altitude: d.altitude_m }));
  const maxAlt = Math.max(...elevationPoints.map((p: any) => p.altitude || 0), trek.max_altitude_m || 0);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden bg-muted/30">
        {trek.destination_id && (
          <Image
            src={`/images/destinations/${trek.destination_id}.jpg`}
            alt={trek.name}
            fill
            sizes="100vw"
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize backdrop-blur-md ${DIFFICULTY_COLORS[trek.difficulty] ?? ""}`}>
            {trek.difficulty}
          </span>
        </div>
      </div>

      {/* Title card */}
      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 -mt-20 relative z-10 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{trek.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {destName && <Link href={`/${locale}/destination/${trek.destination_id}`} className="hover:text-primary transition-colors">{destName}</Link>}
              {stateName && <span> · {stateName}</span>}
            </p>
          </div>
          <ShareButton title={trek.name} text={`${trek.duration_days}-day ${trek.difficulty} trek · ${trek.max_altitude_m}m`} />
        </div>

        {/* Key stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-center">
            <div className="text-lg font-mono font-bold text-primary">{trek.duration_days}</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </div>
          <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-center">
            <div className="text-lg font-mono font-bold">{trek.distance_km}km</div>
            <div className="text-xs text-muted-foreground">Distance</div>
          </div>
          <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-center">
            <div className="text-lg font-mono font-bold">{trek.max_altitude_m?.toLocaleString()}m</div>
            <div className="text-xs text-muted-foreground">Max Altitude</div>
          </div>
          <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-center">
            <div className="text-lg font-mono font-bold capitalize">{trek.fitness_level}</div>
            <div className="text-xs text-muted-foreground">Fitness</div>
          </div>
          <div className="rounded-xl border border-border/30 bg-muted/20 p-3 text-center">
            <div className="text-lg font-mono font-bold">{trek.kids_suitable ? `${trek.min_age}+` : "Adults"}</div>
            <div className="text-xs text-muted-foreground">Age</div>
          </div>
        </div>

        {/* Best months */}
        {trek.best_months?.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Best months:</span>
            <div className="flex gap-1">
              {trek.best_months.map((m: number) => (
                <span key={m} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium">{MONTH_SHORT[m]}</span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{trek.description}</p>

        {/* Highlights */}
        {trek.highlights?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {trek.highlights.map((h: string, i: number) => (
              <span key={i} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">{h}</span>
            ))}
          </div>
        )}

        {/* Warnings */}
        {trek.warnings?.length > 0 && (
          <div className="mt-4 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <h3 className="text-sm font-semibold text-orange-300 mb-2">Warnings</h3>
            {trek.warnings.map((w: string, i: number) => (
              <p key={i} className="text-sm text-orange-200/80 flex items-start gap-2"><span>⚠</span>{w}</p>
            ))}
          </div>
        )}
      </div>

      {/* Interactive trail map */}
      {trek.trail_points && (trek.trail_points as any[]).length > 0 && (
        <Suspense fallback={<div className="h-64 rounded-2xl bg-muted/30 flex items-center justify-center text-muted-foreground">Loading trail map...</div>}>
          <TrekTrailMap points={trek.trail_points} trekName={trek.name} />
        </Suspense>
      )}

      {/* Section nav */}
      <div className="sticky top-[64px] z-40">
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-background/95 p-1 backdrop-blur-md shadow-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === s.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section content */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          {/* Campsites */}
          {trek.campsites && (trek.campsites as any[]).length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Campsites</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(trek.campsites as any[]).map((camp: any, i: number) => (
                  <div key={i} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{camp.name}</h3>
                      {camp.altitude_m && <span className="text-xs font-mono text-muted-foreground">{camp.altitude_m.toLocaleString()}m</span>}
                    </div>
                    {camp.facilities && <p className="text-sm text-muted-foreground">{camp.facilities}</p>}
                    <div className="mt-2 flex gap-2">
                      {camp.water && <span className="rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 text-xs">💧 Water</span>}
                      {camp.flat_ground && <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 text-xs">⛺ Flat ground</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cost */}
          {trek.cost_estimate && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Cost Estimate</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {trek.cost_estimate.budget && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Self-organized</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">₹{trek.cost_estimate.budget.toLocaleString()}</div>
                  </div>
                )}
                {trek.cost_estimate.with_guide && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">With Guide</div>
                    <div className="text-xl font-mono font-bold text-blue-400">₹{trek.cost_estimate.with_guide.toLocaleString()}</div>
                  </div>
                )}
                {trek.cost_estimate.with_operator && (
                  <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Full operator</div>
                    <div className="text-xl font-mono font-bold text-purple-400">₹{trek.cost_estimate.with_operator.toLocaleString()}</div>
                  </div>
                )}
              </div>
              {trek.cost_estimate.note && <p className="mt-2 text-sm text-muted-foreground italic">{trek.cost_estimate.note}</p>}
            </section>
          )}
        </div>
      )}

      {/* Day by Day itinerary */}
      {activeSection === "itinerary" && days.length > 0 && (
        <div className="space-y-4">
          {days.map((day: any, idx: number) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border border-border overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-border p-4 bg-muted/20">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-mono font-bold text-primary">
                  D{day.day}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{day.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                    {day.distance_km && <span>{day.distance_km}km</span>}
                    {day.altitude_m && <span>↑ {day.altitude_m.toLocaleString()}m</span>}
                    {day.hours && <span>~{day.hours}h</span>}
                    {day.terrain && <span>{day.terrain}</span>}
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {day.campsite && <span>⛺ Camp: {day.campsite}</span>}
                  {day.meals && <span>🍽️ {day.meals}</span>}
                  {day.water && <span>💧 {day.water}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Gear list */}
      {activeSection === "gear" && trek.gear_essentials?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Essential Gear</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {trek.gear_essentials.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-3">
                <span className="text-primary text-xs">●</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practical info */}
      {activeSection === "practical" && (
        <div className="space-y-4">
          {trek.how_to_reach && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-2">🚗 How to Reach</h3>
              <p className="text-sm text-muted-foreground">{trek.how_to_reach}</p>
            </div>
          )}
          {trek.permit_details && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-2">📋 Permits</h3>
              <p className="text-sm text-muted-foreground">{trek.permit_details}</p>
            </div>
          )}
          {trek.water_sources && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-2">💧 Water Sources</h3>
              <p className="text-sm text-muted-foreground">{trek.water_sources}</p>
            </div>
          )}
          {trek.network_coverage && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-2">📶 Network</h3>
              <p className="text-sm text-muted-foreground">{trek.network_coverage}</p>
            </div>
          )}
          {trek.nearest_hospital && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-2">🏥 Medical</h3>
              <p className="text-sm text-muted-foreground">{trek.nearest_hospital}</p>
            </div>
          )}
          {trek.emergency_contacts && (
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
              <h3 className="text-sm font-semibold text-orange-300 mb-2">🆘 Emergency</h3>
              <p className="text-sm text-orange-200/80">{trek.emergency_contacts}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
