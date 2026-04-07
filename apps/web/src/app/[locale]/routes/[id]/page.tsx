import { Nav } from "@/components/nav";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

async function getRoute(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("routes")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const route = await getRoute(id);
  if (!route) notFound();

  const tm = useTranslations("months");
  const dayByDay = route.day_by_day ?? [];

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
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
          <h1 className="text-3xl font-bold">{route.name}</h1>
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
              <div className="mt-1 font-medium">{route.stops.length} destinations</div>
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
        {dayByDay.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Day by Day</h2>
            <div className="space-y-4">
              {dayByDay.map((day: any) => (
                <div
                  key={day.day}
                  className="flex gap-4 rounded-lg border border-border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-lg font-bold text-primary">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>
                        {day.from} → {day.to}
                      </span>
                      {day.km > 0 && <span>· {day.km}km</span>}
                    </div>
                    <p className="text-sm leading-relaxed">{day.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stops */}
        {(route.stops ?? []).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Destinations on this route</h2>
            <div className="flex flex-wrap gap-2">
              {route.stops.map((stop: string) => (
                <Link
                  key={stop}
                  href={`/${locale}/destination/${stop}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {stop.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
