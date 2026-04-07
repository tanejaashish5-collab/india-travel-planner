"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { DIFFICULTY_COLORS } from "@/lib/design-tokens";

const DIFFICULTY_ORDER: Record<string, number> = { easy: 1, moderate: 2, hard: 3, extreme: 4 };

export function TreksContent({ treks, trekDests }: { treks: any[]; trekDests: any[] }) {
  const locale = useLocale();

  // Group treks by difficulty
  const grouped = {
    "Easy (Day treks & beginners)": treks.filter((t) => t.difficulty === "easy"),
    "Moderate (2-5 days, some fitness needed)": treks.filter((t) => t.difficulty === "moderate"),
    "Hard (5+ days, high altitude, serious)": treks.filter((t) => t.difficulty === "hard"),
    "Extreme (Expert only)": treks.filter((t) => t.difficulty === "extreme"),
  };

  const MONTH_NAMES = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      {/* Real trek cards grouped by difficulty */}
      {Object.entries(grouped).map(([label, groupTreks]) =>
        groupTreks.length > 0 ? (
          <div key={label} className="mb-10">
            <h2 className="text-xl font-semibold text-muted-foreground mb-4">{label}</h2>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.05}>
              {groupTreks.map((trek: any) => (
                <StaggerItem key={trek.id}>
                  <HoverCard>
                    <Link
                      href={trek.destination_id ? `/${locale}/destination/${trek.destination_id}` : `/${locale}/treks`}
                      className="block rounded-xl border border-border bg-card p-5 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium capitalize rounded-md px-2 py-0.5 ${
                          trek.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400" :
                          trek.difficulty === "moderate" ? "bg-yellow-500/10 text-yellow-400" :
                          trek.difficulty === "hard" ? "bg-orange-500/10 text-orange-400" :
                          "bg-red-500/10 text-red-400"
                        }`}>
                          {trek.difficulty}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-mono font-bold">{trek.duration_days}d</span>
                          <span>·</span>
                          <span className="font-mono">{trek.max_altitude_m}m</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-semibold">{trek.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{trek.description}</p>

                      {/* Stats */}
                      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                        <div className="rounded-lg bg-muted/50 p-1.5 text-center">
                          <div className="font-mono font-bold text-foreground">{trek.distance_km ?? "?"}km</div>
                          <div className="text-muted-foreground">Distance</div>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-1.5 text-center">
                          <div className="font-mono font-bold text-foreground">{trek.fitness_level}</div>
                          <div className="text-muted-foreground">Fitness</div>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-1.5 text-center">
                          <div className="font-mono font-bold text-foreground">{trek.kids_suitable ? "👶 Yes" : "Adults"}</div>
                          <div className="text-muted-foreground">Kids</div>
                        </div>
                      </div>

                      {/* Best months */}
                      {trek.best_months?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {trek.best_months.map((m: number) => (
                            <span key={m} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {MONTH_NAMES[m]}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Warnings preview */}
                      {trek.warnings?.length > 0 && (
                        <div className="mt-2 text-[10px] text-red-400/70">
                          ⚠ {trek.warnings[0]}
                        </div>
                      )}
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : null
      )}

      {/* Trek destinations */}
      {trekDests.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Trek Base Destinations</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trekDests.map((d: any) => {
              const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
              return (
                <Link
                  key={d.id}
                  href={`/${locale}/destination/${d.id}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold text-sm">{d.name}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stateName} · {d.difficulty}
                    {d.elevation_m && <span className="font-mono"> · {d.elevation_m}m</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
