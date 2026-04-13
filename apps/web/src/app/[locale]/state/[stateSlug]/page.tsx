import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StateDestinationGrid } from "@/components/state-destination-grid";
import { createClient } from "@supabase/supabase-js";
import { STATE_MAP, getRegionNameForState } from "@/lib/seo-maps";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string; locale: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const name = STATE_MAP[stateSlug];
  if (!name) return {};
  const region = getRegionNameForState(stateSlug);
  return {
    title: `${name} — Destinations, Scores & Travel Guide`,
    description: `Explore destinations in ${name}${region ? `, ${region}` : ""}. Monthly scores, kids ratings, safety data, and honest travel intelligence.`,
  };
}

async function getData(stateSlug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  // Run all queries in parallel — use try/catch to prevent any single failure from crashing
  const [stateResult, regionResult, destResult, allStatesResult] = await Promise.all([
    supabase.from("states").select("id, name, region, description, capital, display_order").eq("id", stateSlug).single(),
    supabase.from("regions").select("id, name, state_id, hero_tagline, description, subregions, tags, best_months, popular_anchors, famous_for, must_visit").eq("state_id", stateSlug).maybeSingle(),
    supabase
      .from("destinations")
      .select("id, name, tagline, difficulty, elevation_m, tags, translations, state_id, kids_friendly(suitable, rating), destination_months(month, score, note)")
      .eq("state_id", stateSlug)
      .order("name"),
    supabase.from("states").select("id, name, display_order").order("display_order"),
  ]);

  if (!stateResult.data) return null;

  return {
    state: stateResult.data,
    region: regionResult.data,
    destinations: destResult.data ?? [],
    allStates: allStatesResult.data ?? [],
  };
}

export default async function StateHubPage({
  params,
}: {
  params: Promise<{ stateSlug: string; locale: string }>;
}) {
  const { stateSlug, locale } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const data = await getData(stateSlug);
  if (!data) notFound();

  const { state, region, destinations, allStates } = data;
  const regionGroup = getRegionNameForState(stateSlug);
  const currentMonth = new Date().getMonth() + 1;

  // Use first destination's image as hero
  const heroDestId = destinations[0]?.id ?? "manali";

  const totalDests = destinations.length;
  const avgScore = totalDests > 0
    ? (destinations.reduce((sum: number, d: any) => {
        const md = d.destination_months?.find((m: any) => m.month === currentMonth);
        return sum + (md?.score ?? 0);
      }, 0) / totalDests).toFixed(1)
    : "0";

  const kidsCount = destinations.filter((d: any) => {
    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
    return kf?.suitable;
  }).length;

  // Prev/Next
  const stateIdx = allStates.findIndex((s: any) => s.id === stateSlug);
  const prevState = stateIdx > 0 ? allStates[stateIdx - 1] : null;
  const nextState = stateIdx < allStates.length - 1 ? allStates[stateIdx + 1] : null;

  const subregions: any[] = region?.subregions ?? [];

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content">
        {/* Hero — gradient background, no Image component to avoid crashes */}
        <div
          className="relative h-64 sm:h-80 lg:h-96 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))`,
            backgroundImage: `url(/images/destinations/${heroDestId}.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl">
              <div className="text-sm text-muted-foreground/70 mb-2">
                <Link href={`/${locale}/states`} className="hover:text-foreground transition-colors">India</Link>
                {regionGroup && <> {" → "} <span>{regionGroup}</span></>}
                {" → "}
                <span className="text-foreground">{stateName}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{stateName}</h1>
              {state.capital && (
                <p className="mt-1 text-sm text-muted-foreground">Capital: {state.capital}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <div className="text-2xl font-mono font-bold">{totalDests}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/70">Destinations</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold">{avgScore}/5</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/70">Avg Score Now</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold">{kidsCount}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/70">Kids Friendly</div>
                </div>
                {subregions.length > 0 && (
                  <div>
                    <div className="text-2xl font-mono font-bold">{subregions.length}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground/70">Sub-regions</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Description */}
          {(region?.hero_tagline || region?.description) && (
            <div className="mb-8">
              {region.hero_tagline && (
                <p className="text-xl sm:text-2xl font-heading text-foreground/90 italic mb-3">
                  &ldquo;{region.hero_tagline}&rdquo;
                </p>
              )}
              {region.description && (
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-3xl">{region.description}</p>
              )}
            </div>
          )}

          {/* Famous For — what this state is known for */}
          {region?.famous_for && region.famous_for.length > 0 && (
            <div className="mb-8 rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-4">What {stateName} is known for</h2>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {region.famous_for.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Must Visit — top picks if you have limited time */}
          {region?.must_visit && (region.must_visit as any[]).length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-4">Must visit in {stateName}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(region.must_visit as any[]).map((mv: any) => (
                  <a
                    key={mv.id}
                    href={`/${locale}/destination/${mv.id}`}
                    className="group rounded-xl border border-border/50 bg-card p-4 hover:border-primary/40 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-primary text-lg">&#9733;</span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{mv.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{mv.why}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Subregion pills */}
          {subregions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-3">Regions within {stateName}</h2>
              <div className="flex flex-wrap gap-2">
                {subregions.map((sr: any) => (
                  <div key={sr.id} className="group relative">
                    <span className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-default inline-block">
                      {sr.name}
                    </span>
                    {sr.description && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-64">
                        <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground shadow-xl">{sr.description}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {region?.tags && region.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {region.tags.map((tag: string) => (
                <Link key={tag} href={`/${locale}/explore/tag/${tag}`} className="rounded-full bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all capitalize">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Best months */}
          {region?.best_months && region.best_months.length > 0 && (
            <div className="mb-8 rounded-xl border border-border/50 bg-card/50 p-4 inline-block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50 mr-3">Best months:</span>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => {
                const isBest = region.best_months.includes(i + 1);
                return (
                  <span key={m} className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mr-1 ${isBest ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-muted-foreground/30"}`}>
                    {m}
                  </span>
                );
              })}
            </div>
          )}

          {/* Destination grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">All {totalDests} Destinations in {stateName}</h2>
            <StateDestinationGrid destinations={destinations} locale={locale} />
          </div>

          {/* Quick links */}
          <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href={`/${locale}/explore/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">Explore {stateName}</div>
              <div className="text-xs text-muted-foreground mt-1">Filter by month, difficulty, kids</div>
            </Link>
            <Link href={`/${locale}/treks/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">Treks in {stateName}</div>
              <div className="text-xs text-muted-foreground mt-1">Hiking trails by difficulty</div>
            </Link>
            <Link href={`/${locale}/festivals/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">Festivals in {stateName}</div>
              <div className="text-xs text-muted-foreground mt-1">Cultural celebrations by month</div>
            </Link>
            <Link href={`/${locale}/stays/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">Where to Stay</div>
              <div className="text-xs text-muted-foreground mt-1">Lodges, homestays, camps</div>
            </Link>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            {prevState ? (
              <Link href={`/${locale}/state/${prevState.id}`} prefetch={false} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                <span>{prevState.name}</span>
              </Link>
            ) : <div />}
            <Link href={`/${locale}/states`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">All States</Link>
            {nextState ? (
              <Link href={`/${locale}/state/${nextState.id}`} prefetch={false} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>{nextState.name}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
