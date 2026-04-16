"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { RegionFilterBar, RegionKey } from "./region-filter";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10",
  moderate: "text-yellow-400 bg-yellow-500/10",
  hard: "text-orange-400 bg-orange-500/10",
  extreme: "text-red-400 bg-red-500/10",
};

const DIFFICULTY_BADGE_BG: Record<string, string> = {
  easy: "bg-emerald-600/90",
  moderate: "bg-yellow-600/90",
  hard: "bg-orange-600/90",
  extreme: "bg-red-600/90",
};

const REGION_KEYWORDS: Record<string, string[]> = {
  north: ["himalayan","ladakh","kashmir","spiti","uttarakhand","himachal","rajasthan","delhi","punjab","varanasi","lucknow","haridwar","rishikesh","manali","shimla","leh","nubra","pangong"],
  south: ["karnataka","kerala","tamil","coorg","nilgiri","deccan","kakatiya","hyderabad","vizag","visakhapatnam","godavari","konaseema","tirupati","ooty","munnar","hampi","goa","konkan","coastal-karnataka","bengaluru"],
  east: ["kolkata","bengal","bihar","jharkhand","sundarbans","darjeeling"],
  west: ["mumbai","maharashtra","gujarat","rajkot","kutch","pune","nashik","aurangabad"],
  central: ["madhya","bhopal","khajuraho","mandu","pachmarhi"],
  northeast: ["northeast","meghalaya","sikkim","assam","arunachal","nagaland","manipur","mizoram","tripura","tawang","kaziranga","cherrapunji"],
};

export function RoutesGrid({ routes }: { routes: any[] }) {
  const locale = useLocale();
  const tm = useTranslations("months");
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<RegionKey>(null);

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      if (search) {
        const q = search.toLowerCase();
        if (!r.name.toLowerCase().includes(q) && !r.description?.toLowerCase().includes(q) &&
            !(r.stops ?? []).some((s: string) => s.toLowerCase().includes(q))) return false;
      }
      if (activeRegion) {
        const text = [r.name, r.id, r.description, ...(r.stops ?? [])].join(" ").toLowerCase();
        const keywords = REGION_KEYWORDS[activeRegion] ?? [];
        if (!keywords.some((kw) => text.includes(kw))) return false;
      }
      return true;
    });
  }, [routes, search, activeRegion]);

  const grouped = {
    "Weekend Getaways (3-4 days)": filteredRoutes.filter((r) => r.days <= 4),
    "Week Trips (7 days)": filteredRoutes.filter((r) => r.days >= 5 && r.days <= 7),
    "Extended Adventures (8-12 days)": filteredRoutes.filter((r) => r.days >= 8),
  };

  return (
    <>
      <RegionFilterBar active={activeRegion} onChange={setActiveRegion} className="mb-4" />
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search routes..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      <p className="text-sm text-muted-foreground mb-6">{filteredRoutes.length} routes</p>
      {Object.entries(grouped).map(
        ([label, groupRoutes]) =>
          groupRoutes.length > 0 && (
            <div key={label} className="mb-10">
              <h2 className="mb-4 text-xl font-semibold text-muted-foreground">
                {label}
              </h2>
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {groupRoutes.map((route: any) => {
                  const firstStop = route.stops?.[0];
                  const imageSlug = firstStop
                    ? firstStop.toLowerCase().replace(/\s+/g, '-')
                    : null;

                  return (
                    <StaggerItem key={route.id}>
                      <HoverCard>
                        <Link
                          href={`/${locale}/routes/${route.id}`}
                          className="group block rounded-xl border border-border bg-card overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                        >
                          {/* Hero image area */}
                          <div className="h-32 relative overflow-hidden bg-muted/30">
                            {imageSlug && (
                              <Image
                                src={`/images/destinations/${imageSlug}.jpg`}
                                alt={firstStop ?? ""}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                            )}
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                            {/* Difficulty badge - top left */}
                            <span className={`absolute top-3 left-3 rounded-full backdrop-blur px-3 py-1.5 text-xs font-semibold text-white shadow-lg ${DIFFICULTY_BADGE_BG[route.difficulty] ?? "bg-muted/90"}`}>
                              {route.difficulty}
                            </span>

                            {/* Day count badge - top right */}
                            <span className="absolute top-3 right-3 rounded-full bg-primary/90 backdrop-blur px-3 py-1.5 text-sm font-mono font-bold text-primary-foreground shadow-lg">
                              {route.days}d
                            </span>
                          </div>

                          {/* Card body */}
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              {route.kids_suitable && (
                                <span className="text-xs bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5">
                                  👶 Kids
                                </span>
                              )}
                              {route.bike_route && (
                                <span className="text-xs bg-orange-500/20 text-orange-400 rounded-full px-2 py-0.5">
                                  🏍 Biker
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-semibold">
                              {route.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {route.description}
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className={`rounded px-1.5 py-0.5 ${DIFFICULTY_COLORS[route.difficulty] ?? ""}`}>
                                {route.difficulty}
                              </span>
                              {route.budget_range && (
                                <><span>·</span><span>{route.budget_range}</span></>
                              )}
                            </div>

                            {(route.best_months ?? []).length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {route.best_months.slice(0, 5).map((m: number) => (
                                  <span key={m} className="rounded bg-muted px-1.5 py-1 text-xs text-muted-foreground">
                                    {tm(String(m)).slice(0, 3)}
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
            </div>
          ),
      )}
    </>
  );
}
