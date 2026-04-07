"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10",
  moderate: "text-yellow-400 bg-yellow-500/10",
  hard: "text-orange-400 bg-orange-500/10",
  extreme: "text-red-400 bg-red-500/10",
};

export function RoutesGrid({ routes }: { routes: any[] }) {
  const locale = useLocale();
  const tm = useTranslations("months");

  const grouped = {
    "Weekend Getaways (3-4 days)": routes.filter((r) => r.days <= 4),
    "Week Trips (7 days)": routes.filter((r) => r.days >= 5 && r.days <= 7),
    "Extended Adventures (8-12 days)": routes.filter((r) => r.days >= 8),
  };

  return (
    <>
      {Object.entries(grouped).map(
        ([label, groupRoutes]) =>
          groupRoutes.length > 0 && (
            <div key={label} className="mb-10">
              <h2 className="mb-4 text-xl font-semibold text-muted-foreground">
                {label}
              </h2>
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                {groupRoutes.map((route: any) => (
                  <StaggerItem key={route.id}>
                    <HoverCard>
                      <Link
                        href={`/${locale}/routes/${route.id}`}
                        className="block rounded-xl border border-border bg-card p-5 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-3xl font-bold text-primary">
                            {route.days}d
                          </span>
                          <div className="flex items-center gap-2">
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
                              <span key={m} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                {tm(String(m)).slice(0, 3)}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ),
      )}
    </>
  );
}
