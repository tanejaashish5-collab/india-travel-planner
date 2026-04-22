import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { METRO_ANCHORS, METRO_SLUGS, type MetroAnchor } from "@/lib/metro-anchors";

type Band = { label: string; sublabel: string; min: number; max: number };
const BANDS: Band[] = [
  { label: "Within 3 hours", sublabel: "0–150 km", min: 0, max: 150 },
  { label: "Half-day drive", sublabel: "150–300 km", min: 150, max: 300 },
  { label: "Long weekend", sublabel: "300–500 km", min: 300, max: 500 },
];

// Month in IST — matches the /guide pattern. Vercel runs in UTC; without this,
// the page flips to the new month at 05:30 IST (UTC midnight) — up to ~5.5h
// after Indian users' phones say it's the new month.
function currentMonthIST(): number {
  return Number(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "numeric" }),
  );
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function WeekendFromView({ locale, city }: { locale: string; city: string }) {
  const anchor: MetroAnchor | undefined = METRO_ANCHORS[city];
  if (!anchor) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: rpcData, error } = await supabase.rpc("find_nearby_destinations", {
    lat: anchor.lat,
    lng: anchor.lng,
    radius_km: 500,
  });
  if (error) notFound();

  const nearby = Array.isArray(rpcData) ? rpcData : [];
  const ids = nearby.map((n: any) => n.destination_id);

  const { data: full } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, budget_tier, solo_female_score, state:states(name), kids_friendly(suitable, rating), destination_months(month, score)")
    .in("id", ids);

  const currentMonth = currentMonthIST();
  const distMap = new Map<string, number>(nearby.map((n: any) => [n.destination_id, n.distance_km]));
  const hydrated = (full ?? [])
    .map((d: any) => ({
      ...d,
      distance_km: Math.round(distMap.get(d.id) ?? 0),
      current_month_score: d.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? null,
    }))
    .sort((a: any, b: any) => a.distance_km - b.distance_km);

  const banded: { band: Band; items: any[] }[] = BANDS.map((band) => ({
    band,
    items: hydrated.filter((d: any) => d.distance_km >= band.min && d.distance_km < band.max),
  }));
  const totalCount = hydrated.length;

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            Weekend escape
          </p>
          <h1
            className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Weekend from {anchor.name}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {totalCount} destinations within 500 km of {anchor.name}, grouped by drive time. Every one is scored for the current month — no hill station that has already closed for winter, no beach that's under monsoon water.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {METRO_SLUGS.filter((s) => s !== city).map((s) => (
            <a
              key={s}
              href={`/${locale}/weekend-from-${s}`}
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {METRO_ANCHORS[s].name}
            </a>
          ))}
        </div>

        {banded.map(({ band, items }) => {
          if (items.length === 0) return null;
          return (
            <section key={band.label} className="mb-12">
              <div className="mb-4 flex items-baseline gap-3 border-b border-border pb-2">
                <h2
                  className="font-serif italic font-medium text-xl sm:text-2xl"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {band.label}
                </h2>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  {band.sublabel} · {items.length} {items.length === 1 ? "place" : "places"}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((d: any) => {
                  const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
                  const hours = Math.max(1, Math.round(d.distance_km / 60));
                  return (
                    <div key={d.id} className="relative">
                      <DestinationCard
                        id={d.id}
                        name={d.name}
                        tagline={d.tagline}
                        state={stateName ?? ""}
                        difficulty={d.difficulty}
                        elevation_m={d.elevation_m}
                        tags={d.tags ?? []}
                        best_months={d.best_months ?? []}
                        kids_rating={d.kids_friendly?.[0]?.rating ?? null}
                        kids_suitable={d.kids_friendly?.[0]?.suitable ?? null}
                        current_month_score={d.current_month_score}
                        budget_tier={d.budget_tier}
                        translations={d.translations}
                        solo_female_score={d.solo_female_score ?? null}
                      />
                      {/* Distance pill — bottom-right corner so it doesn't collide
                          with the score / kids / solo-female chips at the top of
                          the card. pointer-events-none lets the whole card remain
                          one click target. */}
                      <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground backdrop-blur-sm">
                        {d.distance_km} km · ~{hours} h
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {totalCount === 0 && (
          <div className="mt-8 rounded-xl border border-border/50 bg-card/40 px-5 py-6 text-sm text-muted-foreground">
            No scored destinations within 500 km of {anchor.name} yet. Check back as our coverage grows.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export function weekendFromMetadata({ locale, city }: { locale: string; city: string }) {
  const anchor = METRO_ANCHORS[city];
  if (!anchor) return {};
  return {
    title: `Weekend Trips from ${anchor.name} — Destinations Within 500 km, Scored | NakshIQ`,
    description: `Places to visit on a weekend from ${anchor.name}. Sorted by drive time — within 3 hours, half-day, and long-weekend bands. Monthly scores + kids ratings.`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/weekend-from-${city}`,
      languages: {
        en: `https://www.nakshiq.com/en/weekend-from-${city}`,
        hi: `https://www.nakshiq.com/hi/weekend-from-${city}`,
      },
    },
  };
}
