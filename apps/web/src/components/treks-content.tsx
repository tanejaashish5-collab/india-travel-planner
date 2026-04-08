"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { DIFFICULTY_COLORS } from "@/lib/design-tokens";

const DIFFICULTY_ORDER: Record<string, number> = { easy: 1, moderate: 2, hard: 3, extreme: 4 };

export function TreksContent({ treks, trekDests, gearChecklists }: { treks: any[]; trekDests: any[]; gearChecklists?: any[] }) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("");

  const filteredTreks = treks.filter((t) => {
    if (diffFilter && t.difficulty !== diffFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t.name.toLowerCase().includes(q) && !t.description?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Group filtered treks by difficulty
  const grouped = {
    "Easy (Day treks & beginners)": filteredTreks.filter((t) => t.difficulty === "easy"),
    "Moderate (2-5 days, some fitness needed)": filteredTreks.filter((t) => t.difficulty === "moderate"),
    "Hard (5+ days, high altitude, serious)": filteredTreks.filter((t) => t.difficulty === "hard"),
    "Extreme (Expert only)": filteredTreks.filter((t) => t.difficulty === "extreme"),
  };

  const MONTH_NAMES = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      {/* Search + difficulty filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search treks..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-2">
          {["", "easy", "moderate", "hard", "extreme"].map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-all ${
                diffFilter === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {d || "All"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">{filteredTreks.length} treks found</p>

      {/* Trek cards grouped by difficulty */}
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
                      className="group block rounded-2xl border border-border/50 bg-card overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
                    >
                      {/* Hero image */}
                      {trek.destination_id && (
                        <div className="relative h-32 bg-muted/30 overflow-hidden">
                          <img
                            src={`/images/destinations/${trek.destination_id}.jpg`}
                            alt={trek.name}
                            className="w-full h-full object-cover ken-burns"
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                        </div>
                      )}
                      <div className="p-5">
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
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : null
      )}

      {/* Gear Checklists */}
      {gearChecklists && gearChecklists.length > 0 && (
        <GearChecklists checklists={gearChecklists} />
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

function GearChecklists({ checklists }: { checklists: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const CATEGORY_ICONS: Record<string, string> = {
    clothing: "👕",
    footwear: "🥾",
    gear: "🎒",
    health: "💊",
    food: "🍫",
    electronics: "🔋",
    essentials: "💰",
    documents: "📄",
    vehicle: "🚗",
    comfort: "🎮",
    accessories: "🕶️",
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-2">Gear Checklists</h2>
      <p className="text-sm text-muted-foreground mb-4">What to pack for your trip type</p>
      <div className="space-y-3">
        {checklists.map((cl) => {
          const isOpen = openId === cl.id;
          const items = cl.items ?? [];
          const essentialCount = items.filter((i: any) => i.essential).length;

          return (
            <div key={cl.id} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : cl.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-sm">{cl.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {items.length} items · {essentialCount} essential
                  </p>
                </div>
                <span className="text-muted-foreground text-lg">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border p-4">
                  {/* Group by category */}
                  {Object.entries(
                    items.reduce((acc: Record<string, any[]>, item: any) => {
                      const cat = item.category ?? "other";
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(item);
                      return acc;
                    }, {} as Record<string, any[]>)
                  ).map(([category, catItems]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {CATEGORY_ICONS[category] ?? "📦"} {category}
                      </h4>
                      <div className="space-y-1.5">
                        {(catItems as any[]).map((item: any, i: number) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className={`mt-0.5 text-xs ${item.essential ? "text-primary" : "text-muted-foreground/50"}`}>
                              {item.essential ? "●" : "○"}
                            </span>
                            <div className="flex-1">
                              <span className={item.essential ? "font-medium" : "text-muted-foreground"}>
                                {item.item}
                              </span>
                              {item.note && (
                                <span className="text-xs text-muted-foreground/70 ml-1">— {item.note}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
