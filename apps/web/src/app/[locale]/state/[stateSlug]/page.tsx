import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StateDestinationGrid } from "@/components/state-destination-grid";
import { DestinationSectionNav } from "@/components/destination-section-nav";
import { createClient } from "@supabase/supabase-js";
import { STATE_MAP, getRegionNameForState, getRegionForState } from "@/lib/seo-maps";
import { videoSrc } from "@/lib/video-url";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const name = STATE_MAP[stateSlug];
  if (!name) return {};
  const region = getRegionNameForState(stateSlug);

  // Pull the curated state description for a unique meta description per state.
  // Falls back to a regional default if the row is thin.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let description = `Destinations across ${name}${region ? `, ${region}` : ""} — monthly scores, kids ratings, safety data, and honest travel intelligence.`;
  if (url && key) {
    const supabase = createClient(url, key);
    const { data } = await supabase.from("states").select("description").eq("id", stateSlug).single();
    if (data?.description && data.description.length > 80) {
      // Truncate to ~158 chars on a sentence boundary for SERP fit.
      const raw = data.description.replace(/\s+/g, " ").trim();
      description = raw.length <= 158 ? raw : raw.slice(0, 155).replace(/[\s,;—-]+\S*$/, "") + "…";
    }
  }

  return {
    title: `${name} — Destinations, Scores & Travel Guide`,
    description,
    ...localeAlternates(locale, `/state/${stateSlug}`),
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
      .select("id, name, tagline, difficulty, elevation_m, tags, translations, state_id, solo_female_score, kids_friendly(suitable, rating), destination_months(month, score, note)")
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

  const t = await getTranslations({ locale, namespace: "state" });

  const data = await getData(stateSlug);
  if (!data) notFound();

  const { state, region, destinations, allStates } = data;
  const regionGroup = getRegionNameForState(stateSlug);
  const regionSlug = getRegionForState(stateSlug);
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
        {/* Sticky back + breadcrumb bar — always-visible wayfinding, mirrors
            the pattern locked in on destination-month + where-to-go. */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div className="sticky top-20 z-30">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/85 backdrop-blur px-3 py-2 text-xs sm:text-sm shadow-sm">
              <Link
                href={regionGroup && regionSlug ? `/${locale}/india/${regionSlug}` : `/${locale}/states`}
                className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                <span aria-hidden>&larr;</span> Back
              </Link>
              <span className="text-border" aria-hidden>•</span>
              <nav
                className="flex items-center gap-1.5 text-muted-foreground min-w-0 overflow-hidden"
                aria-label="Breadcrumb"
              >
                <Link href={`/${locale}/states`} className="hover:text-foreground transition-colors truncate hidden sm:inline">India</Link>
                {regionGroup && regionSlug && (
                  <>
                    <span className="opacity-50 hidden sm:inline" aria-hidden>/</span>
                    <Link href={`/${locale}/india/${regionSlug}`} className="hover:text-foreground transition-colors truncate">{regionGroup}</Link>
                  </>
                )}
                <span className="opacity-50" aria-hidden>/</span>
                <span className="text-foreground truncate">{stateName}</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Hero — full-bleed cinematic video, bumped to lg:h-[32rem] to match
            the destination-month / where-to-go pattern. Breadcrumb lifted out
            into the sticky bar above so it doesn't scroll off-screen. */}
        <div
          className="relative h-64 sm:h-80 lg:h-[32rem] overflow-hidden mt-6"
          style={{ background: `linear-gradient(135deg, oklch(0.22 0.03 260), oklch(0.16 0.02 280))` }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`/images/destinations/${heroDestId}.jpg`}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc(heroDestId)} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl lg:tracking-tight font-semibold">{stateName}</h1>
              {state.capital && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("capital")}: {state.capital}
                </p>
              )}
              {/* Hero summary as prose, not a dashboard stat-row. Same
                  numbers, less chip-soup. `avgScore` omitted — too much
                  precision at this glance; the reader can see per-dest
                  scores below. */}
              <p className="mt-4 text-sm sm:text-base text-foreground/85 tabular-nums">
                {subregions.length > 0
                  ? t("heroProse", { count: totalDests, kids: kidsCount, regions: subregions.length })
                  : t("heroProseNoRegions", { count: totalDests, kids: kidsCount })}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {(() => {
            const sections = [
              { id: "overview", label: "Overview", show: !!(region?.hero_tagline || region?.description || (region?.famous_for && region.famous_for.length > 0)) },
              { id: "must-visit", label: t("dontMiss"), show: !!(region?.must_visit && (region.must_visit as any[]).length > 0) },
              { id: "regions", label: t("byRegion"), show: subregions.length > 0 },
              { id: "best-months", label: t("bestTimeToVisit"), show: !!(region?.best_months && region.best_months.length > 0) },
              { id: "destinations", label: `All ${totalDests}`, show: destinations.length > 0 },
              { id: "guides", label: "More guides", show: true },
            ].filter((s) => s.show);
            return (
              <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
                <div className="min-w-0">
          {/* Description */}
          {(region?.hero_tagline || region?.description) && (
            <section id="section-overview" className="mb-8 scroll-mt-32">
              {region.hero_tagline && (
                <p className="text-xl sm:text-2xl font-heading text-foreground/90 italic mb-3">
                  &ldquo;{region.hero_tagline}&rdquo;
                </p>
              )}
              {region.description && (
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-3xl">{region.description}</p>
              )}
            </section>
          )}

          {/* Famous For — what this state is known for */}
          {region?.famous_for && region.famous_for.length > 0 && (
            <div className="mb-8 rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-4">{t("knownFor")}</h2>
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
            <section id="section-must-visit" className="mb-8 scroll-mt-32">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-4">{t("dontMiss")}</h2>
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
            </section>
          )}

          {/* Subregion pills */}
          {subregions.length > 0 && (
            <section id="section-regions" className="mb-8 scroll-mt-32">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-3">{t("byRegion")}</h2>
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
            </section>
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
            <section id="section-best-months" className="mb-8 scroll-mt-32 rounded-xl border border-border/50 bg-card/50 p-4 inline-block">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mr-3">{t("bestTimeToVisit")}</span>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => {
                const isBest = region.best_months.includes(i + 1);
                return (
                  <span key={m} className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mr-1 ${isBest ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-muted-foreground/30"}`}>
                    {m}
                  </span>
                );
              })}
            </section>
          )}

          {/* Destination grid */}
          <section id="section-destinations" className="mb-12 scroll-mt-32">
            <h2 className="text-xl font-semibold mb-6">{t("allDestinations", { count: totalDests, state: stateName })}</h2>
            <StateDestinationGrid destinations={destinations} locale={locale} />
          </section>

          {/* Quick links */}
          <section id="section-guides" className="mb-12 scroll-mt-32 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href={`/${locale}/explore/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">{t("exploreState", { state: stateName })}</div>
              <div className="text-xs text-muted-foreground mt-1">{t("exploreStateHint")}</div>
            </Link>
            <Link href={`/${locale}/treks/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">{t("treksInState", { state: stateName })}</div>
              <div className="text-xs text-muted-foreground mt-1">{t("treksHint")}</div>
            </Link>
            <Link href={`/${locale}/festivals/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">{t("festivalsInState", { state: stateName })}</div>
              <div className="text-xs text-muted-foreground mt-1">{t("festivalsHint")}</div>
            </Link>
            <Link href={`/${locale}/stays/state/${stateSlug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all">
              <div className="text-sm font-semibold">{t("whereToStay")}</div>
              <div className="text-xs text-muted-foreground mt-1">{t("whereToStayHint")}</div>
            </Link>
          </section>

          {/* Prev / Next */}
          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            {prevState ? (
              <Link href={`/${locale}/state/${prevState.id}`} prefetch={false} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                <span>{prevState.name}</span>
              </Link>
            ) : <div />}
            <Link href={`/${locale}/states`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("allStates")}</Link>
            {nextState ? (
              <Link href={`/${locale}/state/${nextState.id}`} prefetch={false} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>{nextState.name}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            ) : <div />}
          </div>
                </div>

                {/* Sidebar ToC — sticky vertical rail at lg+ */}
                <aside className="hidden lg:block">
                  <DestinationSectionNav sections={sections} variant="sidebar" />
                </aside>
              </div>
            );
          })()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
