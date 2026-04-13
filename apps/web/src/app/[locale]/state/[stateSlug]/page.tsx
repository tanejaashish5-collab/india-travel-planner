import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StateDestinationGrid } from "@/components/state-destination-grid";
import { createClient } from "@supabase/supabase-js";
import { STATE_MAP, getRegionNameForState, ALL_STATE_SLUGS } from "@/lib/seo-maps";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string; locale: string }>;
}): Promise<Metadata> {
  const { stateSlug, locale } = await params;
  const name = STATE_MAP[stateSlug];
  if (!name) return {};
  const region = getRegionNameForState(stateSlug);
  return {
    title: `${name} — Destinations, Scores & Travel Guide`,
    description: `Explore destinations in ${name}${region ? `, ${region}` : ""}. Monthly scores, kids ratings, safety data, and honest travel intelligence for every place worth visiting.`,
    openGraph: {
      title: `${name} — NakshIQ Travel Guide`,
      description: `Every destination in ${name}, scored for every month.`,
      images: [`/images/destinations/${stateSlug}.jpg`],
    },
  };
}

async function getData(stateSlug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const [stateResult, regionResult, destResult, allStatesResult] = await Promise.all([
    supabase.from("states").select("*").eq("id", stateSlug).single(),
    supabase.from("regions").select("*").eq("state_id", stateSlug).maybeSingle(),
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
      `)
      .eq("state_id", stateSlug)
      .order("name"),
    supabase.from("states").select("id, name, display_order, region").order("display_order"),
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

  // Use first destination's image as state hero (state-level images don't exist)
  const heroDestId = destinations[0]?.id ?? stateSlug;

  // Calculate state-level stats
  const totalDests = destinations.length;
  const avgScore = destinations.length > 0
    ? (destinations.reduce((sum: number, d: any) => {
        const monthData = d.destination_months?.find((m: any) => m.month === currentMonth);
        return sum + (monthData?.score ?? 0);
      }, 0) / destinations.length).toFixed(1)
    : "0";

  const kidsCount = destinations.filter((d: any) => {
    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
    return kf?.suitable;
  }).length;

  // Prev/Next state navigation
  const stateIdx = allStates.findIndex((s: any) => s.id === stateSlug);
  const prevState = stateIdx > 0 ? allStates[stateIdx - 1] : null;
  const nextState = stateIdx < allStates.length - 1 ? allStates[stateIdx + 1] : null;

  // Subregions from regions table
  const subregions = region?.subregions ?? [];

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    name: stateName,
    description: state.description || region?.description,
    containedInPlace: { "@type": "Country", name: "India" },
    url: `https://nakshiq.com/${locale}/state/${stateSlug}`,
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.25 0.02 260), oklch(0.18 0.01 280))" }}>
          <Image
            src={`/images/destinations/${heroDestId}.jpg`}
            alt={stateName}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-7xl">
              {/* Breadcrumb */}
              <div className="text-sm text-muted-foreground/70 mb-2">
                <Link href={`/${locale}/states`} className="hover:text-foreground transition-colors">India</Link>
                {regionGroup && (
                  <>
                    {" → "}
                    <span>{regionGroup}</span>
                  </>
                )}
                {" → "}
                <span className="text-foreground">{stateName}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{stateName}</h1>
              {state.capital && (
                <p className="mt-1 text-sm text-muted-foreground">Capital: {state.capital}</p>
              )}
              {/* Stats strip */}
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
          {/* Description + tagline */}
          {(region?.hero_tagline || region?.description) && (
            <div className="mb-8">
              {region.hero_tagline && (
                <p className="text-xl sm:text-2xl font-heading text-foreground/90 italic mb-3">
                  &ldquo;{region.hero_tagline}&rdquo;
                </p>
              )}
              {region.description && (
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
                  {region.description}
                </p>
              )}
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
                        <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground shadow-xl">
                          {sr.description}
                        </div>
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
                <Link
                  key={tag}
                  href={`/${locale}/explore/tag/${tag}`}
                  className="rounded-full bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all capitalize"
                >
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
                  <span
                    key={m}
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mr-1 ${isBest ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-muted-foreground/30"}`}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
          )}

          {/* Destination grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">
              All {totalDests} Destinations in {stateName}
            </h2>
            <StateDestinationGrid destinations={destinations} locale={locale} />
          </div>

          {/* Quick links to related pages */}
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

          {/* Prev / Next State Navigation */}
          <div className="flex items-center justify-between border-t border-border/50 pt-6">
            {prevState ? (
              <Link href={`/${locale}/state/${prevState.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                <span>{prevState.name}</span>
              </Link>
            ) : <div />}
            <Link href={`/${locale}/states`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              All States
            </Link>
            {nextState ? (
              <Link href={`/${locale}/state/${nextState.id}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
