import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { METRO_ANCHORS, METRO_SLUGS, type MetroAnchor } from "@/lib/metro-anchors";
import { currentMonthIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { MagazineCardOrGrid } from "@/components/magazine-card-grid";

type Band = { label: string; sublabel: string; min: number; max: number };
const BANDS: Band[] = [
  { label: "Within 3 hours", sublabel: "0–150 km", min: 0, max: 150 },
  { label: "Half-day drive", sublabel: "150–300 km", min: 150, max: 300 },
  { label: "Long weekend", sublabel: "300–500 km", min: 300, max: 500 },
];

type NearbyRow = { destination_id: string; distance_km: number };

type DestRow = {
  id: string;
  name: string;
  tagline?: string | null;
  difficulty?: string | null;
  elevation_m?: number | null;
  tags?: string[] | null;
  best_months?: number[] | null;
  translations?: Record<string, unknown> | null;
  state_id?: string;
  budget_tier?: string | null;
  solo_female_score?: number | null;
  state?: { name?: string }[] | { name?: string } | null;
  kids_friendly?: { suitable?: boolean | null; rating?: number | null }[] | null;
  destination_months?: { month: number; score: number | null }[] | null;
};

type HydratedDest = DestRow & {
  distance_km: number;
  current_month_score: number | null;
};

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
  // Missing env is a config error, not a missing page — throw so it never bakes
  // a 404 into the 6h ISR cache.
  if (!supabase) throw new Error(`[weekend-from:${city}] Supabase env not configured`);

  // The PostGIS RPC can transiently fail (search_path/extension hiccups under
  // render bursts) and EVERY metro anchor is within 500 km of itself, so an
  // empty result is always a transient failure, never the truth. Swallowing
  // either an error into notFound() or an empty array bakes a 404 / "no
  // destinations" page into the 6h ISR cache — delhi did exactly this
  // (2026-06-14), same class as the /explore "0 places" bake (2026-06-10).
  // Retry, then throw so revalidation keeps the last good page (and a build
  // fails loudly) instead of caching a broken one.
  const callRpc = () =>
    supabase.rpc("find_nearby_destinations", {
      lat: anchor.lat,
      lng: anchor.lng,
      radius_km: 500,
    });
  let rpc = await callRpc();
  for (
    let attempt = 1;
    attempt < 3 && (rpc.error || !Array.isArray(rpc.data) || rpc.data.length === 0);
    attempt++
  ) {
    console.error(
      `[weekend-from:${city}] nearby RPC attempt ${attempt} failed: ${rpc.error?.message ?? "empty result"} — retrying`,
    );
    await new Promise((r) => setTimeout(r, attempt * 1000));
    rpc = await callRpc();
  }
  if (rpc.error || !Array.isArray(rpc.data) || rpc.data.length === 0) {
    throw new Error(
      `[weekend-from:${city}] nearby RPC failed after retries: ${rpc.error?.message ?? "empty result"}`,
    );
  }

  const nearby: NearbyRow[] = rpc.data;
  const ids = nearby.map((n) => n.destination_id);

  const currentMonth = currentMonthIST();

  // The destination_months join used to be embedded here, which pulled ALL 12
  // month rows per destination (~12x the rows) when only the CURRENT month's
  // score is ever read below. On 2026-08-11 that lateral join tipped over the
  // Postgres statement timeout and failed the whole production build on
  // /en/weekend-from-bangalore. Two narrow indexed queries beat one wide join.
  const [{ data: full, error: fullError }, { data: monthRows, error: monthError }] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, budget_tier, solo_female_score, state:states(name), kids_friendly(suitable, rating)")
      .in("id", ids),
    supabase
      .from("destination_months")
      .select("destination_id, score")
      .in("destination_id", ids)
      .eq("month", currentMonth),
  ]);
  // Don't swallow a hydrate error into `full ?? []` — that bakes an empty page.
  if (fullError) {
    throw new Error(`[weekend-from:${city}] destinations hydrate failed: ${fullError.message}`);
  }
  if (monthError) {
    throw new Error(`[weekend-from:${city}] month-score hydrate failed: ${monthError.message}`);
  }

  const scoreMap = new Map<string, number | null>(
    (monthRows ?? []).map((m: { destination_id: string; score: number | null }) => [m.destination_id, m.score]),
  );
  const distMap = new Map<string, number>(nearby.map((n) => [n.destination_id, n.distance_km]));
  const hydrated: HydratedDest[] = (full ?? [])
    .map((d: DestRow) => ({
      ...d,
      distance_km: Math.round(distMap.get(d.id) ?? 0),
      current_month_score: scoreMap.get(d.id) ?? null,
    }))
    .sort((a, b) => a.distance_km - b.distance_km);

  const banded: { band: Band; items: HydratedDest[] }[] = BANDS.map((band) => ({
    band,
    items: hydrated.filter((d) => d.distance_km >= band.min && d.distance_km < band.max),
  }));
  const totalCount = hydrated.length;

  const pageUrl = `https://www.nakshiq.com/${locale}/weekend-from-${city}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Weekend from", item: `https://www.nakshiq.com/${locale}/weekend-from` },
      { "@type": "ListItem", position: 3, name: anchor.name, item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            WEEKEND ESCAPE · {anchor.state.toUpperCase()} · {String(totalCount).padStart(3, "0")} DESTINATIONS
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Weekend from {anchor.name}.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 24,
              maxWidth: 720,
            }}
          >
            {totalCount} destinations within 500 km of {anchor.name}, grouped by
            drive time. Every one is scored for the current month — no hill
            station already closed for winter, no beach under monsoon water.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Sibling metros pills */}
          <div
            style={{
              marginBottom: 40,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              paddingBottom: 24,
              borderBottom: "1px solid var(--hair)",
            }}
          >
            {METRO_SLUGS.filter((s) => s !== city).map((s) => (
              <a
                key={s}
                href={`/${locale}/weekend-from-${s}`}
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  border: "1px solid var(--hair)",
                  color: "var(--bone-dim)",
                  textDecoration: "none",
                }}
              >
                {METRO_ANCHORS[s].name}
              </a>
            ))}
          </div>

          {banded.map(({ band, items }) => {
            if (items.length === 0) return null;
            return (
              <section key={band.label} style={{ marginBottom: 56 }}>
                <div
                  style={{
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: "1px solid var(--hair)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 28,
                      lineHeight: 1.1,
                      color: "var(--bone)",
                      margin: 0,
                    }}
                  >
                    {band.label}
                  </h2>
                  <span
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                    }}
                  >
                    {band.sublabel} · {items.length} {items.length === 1 ? "place" : "places"}
                  </span>
                </div>
                <MagazineCardOrGrid
                  items={items}
                  minCardWidth={280}
                  gap={16}
                  renderCard={(d) => {
                    const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
                    const hours = Math.max(1, Math.round(d.distance_km / 60));
                    return (
                      <div style={{ position: "relative", height: "100%" }}>
                        <DestinationCard
                          id={d.id}
                          name={d.name}
                          tagline={d.tagline ?? ""}
                          state={stateName ?? ""}
                          difficulty={d.difficulty ?? ""}
                          elevation_m={d.elevation_m ?? null}
                          tags={d.tags ?? []}
                          best_months={d.best_months ?? []}
                          kids_rating={d.kids_friendly?.[0]?.rating ?? null}
                          kids_suitable={d.kids_friendly?.[0]?.suitable ?? null}
                          current_month_score={d.current_month_score}
                          budget_tier={d.budget_tier ?? null}
                          translations={d.translations as Record<string, Record<string, string>> | undefined}
                          solo_female_score={d.solo_female_score ?? null}
                        />
                        <div
                          style={{
                            pointerEvents: "none",
                            position: "absolute",
                            bottom: 12,
                            right: 12,
                            zIndex: 10,
                            padding: "4px 10px",
                            background: "rgba(10, 10, 8, 0.85)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid var(--hair)",
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 10,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--bone-dim)",
                          }}
                        >
                          {d.distance_km} km · ~{hours} h
                        </div>
                      </div>
                    );
                  }}
                  renderGutter={(d) => {
                    const hours = Math.max(1, Math.round(d.distance_km / 60));
                    return (
                      <>
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "var(--vermillion)",
                            margin: "0 0 12px",
                          }}
                        >
                          {band.label.toUpperCase()} · {d.distance_km} KM · ~{hours} H
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: 22,
                            lineHeight: 1.25,
                            color: "var(--bone)",
                            margin: "0 0 16px",
                            textWrap: "balance",
                          }}
                        >
                          Only one option in this window — but it&apos;s a real one.
                        </p>
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "var(--bone-faint)",
                            margin: 0,
                          }}
                        >
                          {band.sublabel}
                        </p>
                      </>
                    );
                  }}
                />
              </section>
            );
          })}

          {totalCount === 0 && (
            <div
              style={{
                marginTop: 32,
                padding: "32px 24px",
                border: "1px solid var(--hair)",
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                color: "var(--bone-dim)",
              }}
            >
              No scored destinations within 500 km of {anchor.name} yet. Check
              back as our coverage grows.
            </div>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
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
