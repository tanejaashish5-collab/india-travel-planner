"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { RouteMap } from "./route-map";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

export function RouteDetail({ route }: { route: any }) {
  const locale = useLocale();
  const tm = useTranslations("months");
  const dayByDay = route.day_by_day ?? [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-muted-foreground">
        <Link href={`/${locale}/routes`} className="hover:text-foreground">
          Routes
        </Link>
        {" → "}
        <span className="text-foreground">{route.name}</span>
      </div>

      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-4xl font-bold text-primary">
            {route.days}d
          </span>
          <div className="flex gap-2">
            <span
              className={`rounded-lg px-2 py-1 text-sm font-medium capitalize ${DIFFICULTY_COLORS[route.difficulty] ?? ""}`}
            >
              {route.difficulty}
            </span>
            {route.kids_suitable && (
              <span className="rounded-lg bg-emerald-500/20 px-2 py-1 text-sm text-emerald-400">
                👶 Kids OK
              </span>
            )}
            {route.bike_route && (
              <span className="rounded-lg bg-orange-500/20 px-2 py-1 text-sm text-orange-400">
                🏍 Biker
              </span>
            )}
          </div>
        </div>
        <h1 className="text-3xl font-semibold">{route.name}</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {route.description}
        </p>
      </div>

      {/* Quick info */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {route.budget_range && (
          <div className="rounded-lg border border-border p-3">
            <div className="text-xs text-muted-foreground">Budget</div>
            <div className="mt-1 font-medium">{route.budget_range}</div>
          </div>
        )}
        {(route.best_months ?? []).length > 0 && (
          <div className="rounded-lg border border-border p-3">
            <div className="text-xs text-muted-foreground">Best Months</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {route.best_months.map((m: number) => (
                <span key={m} className="text-sm font-medium">
                  {tm(String(m)).slice(0, 3)}
                </span>
              ))}
            </div>
          </div>
        )}
        {(route.stops ?? []).length > 0 && (
          <div className="rounded-lg border border-border p-3">
            <div className="text-xs text-muted-foreground">Stops</div>
            <div className="mt-1 font-medium">
              {route.stops.length} destinations
            </div>
          </div>
        )}
      </div>

      {/* Highlights */}
      {(route.highlights ?? []).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {route.highlights.map((h: string) => (
              <span
                key={h}
                className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm text-primary"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Logistics */}
      {route.logistics && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Logistics</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {route.logistics}
          </p>
        </div>
      )}

      {/* Day by Day */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Day by Day</h2>
        {dayByDay.length > 0 ? (
          <div className="space-y-4">
            {dayByDay.map((day: any) => {
              const heading =
                day.title ||
                (day.from && day.to ? `${day.from} → ${day.to}` : null);
              const body = day.plan ?? day.description ?? day.notes ?? null;
              const stay = day.stay ?? null;
              const mapsHref = day.from && day.to
                ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(day.from)}&destination=${encodeURIComponent(day.to)}&travelmode=driving`
                : null;
              return (
                <div
                  key={day.day}
                  className="flex gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-lg font-bold text-primary">
                    {day.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    {heading && (
                      <div className="text-sm font-medium text-foreground mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span>{heading}</span>
                        {day.km > 0 && (
                          <span className="text-xs font-normal text-muted-foreground">
                            · {day.km}km
                          </span>
                        )}
                        {day.duration && (
                          <span className="text-xs font-normal text-muted-foreground">
                            · {day.duration}
                          </span>
                        )}
                      </div>
                    )}
                    {body && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {body}
                      </p>
                    )}
                    {(stay || mapsHref) && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {stay && (
                          <span>
                            Overnight: <span className="text-foreground">{stay}</span>
                          </span>
                        )}
                        {mapsHref && (
                          <a
                            href={mapsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2 py-1 text-[11px] font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            <span aria-hidden>📍</span>
                            <span>Open this leg in Maps</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            Day-by-day enrichment is in progress for this route. In the meantime,
            see the destination list below — each stop has its own confidence
            card with logistics, stays, and food.
          </div>
        )}
      </div>

      {/* Route Map */}
      {(route.stops ?? []).length >= 2 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Route Map</h2>
          <RouteMap stops={route.stops} />
        </div>
      )}

      {/* Stops — numbered sequence pills */}
      {(route.stops ?? []).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Destinations on this route
          </h2>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {route.stops.map((stop: string, idx: number) => {
              const label = stop
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase());
              const isLast = idx === route.stops.length - 1;
              return (
                <li key={stop} className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/destination/${stop}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-3 text-sm hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      {idx + 1}
                    </span>
                    <span>{label}</span>
                  </Link>
                  {!isLast && (
                    <span className="text-muted-foreground/60 select-none" aria-hidden>
                      →
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </>
  );
}
