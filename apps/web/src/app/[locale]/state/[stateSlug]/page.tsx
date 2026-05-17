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
import { stateHeroSrc, hasStateHero } from "@/lib/landing-heroes";
import { videoObjectJsonLd } from "@/lib/video-schema";
import { destinationImage } from "@/lib/image-url";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let description = `Destinations across ${name}${region ? `, ${region}` : ""} — monthly scores, kids ratings, safety data, and honest travel intelligence.`;
  if (url && key) {
    const supabase = createClient(url, key);
    const { data } = await supabase.from("states").select("description").eq("id", stateSlug).single();
    if (data?.description && data.description.length > 80) {
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

type DestRow = {
  id: string;
  name: string;
  tagline?: string | null;
  difficulty?: string | null;
  elevation_m?: number | null;
  tags?: string[] | null;
  translations?: Record<string, unknown> | null;
  state_id: string;
  solo_female_score?: number | null;
  kids_friendly?: { suitable?: boolean; rating?: number } | { suitable?: boolean; rating?: number }[] | null;
  destination_months?: { month: number; score: number; note?: string | null }[] | null;
};

type StateBrief = { id: string; name: string; display_order?: number | null };

type MustVisitRow = { id: string; name: string; why?: string };
type SubregionRow = { id: string; name: string; description?: string | null };

async function getData(stateSlug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

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
  const currentMonth = currentMonthIST();

  const heroDestId = destinations[0]?.id ?? "manali";

  const totalDests = destinations.length;
  const kidsCount = destinations.filter((d: DestRow) => {
    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
    return kf?.suitable;
  }).length;

  const stateIdx = allStates.findIndex((s: StateBrief) => s.id === stateSlug);
  const prevState = stateIdx > 0 ? allStates[stateIdx - 1] : null;
  const nextState = stateIdx < allStates.length - 1 ? allStates[stateIdx + 1] : null;

  const subregions: SubregionRow[] = (region?.subregions as SubregionRow[]) ?? [];

  const stateVideoLd = videoObjectJsonLd({
    id: hasStateHero(stateSlug) ? `state-${stateSlug}` : heroDestId,
    name: `${stateName} — NakshIQ travel reel`,
    description: `Hero footage from NakshIQ's ${stateName} coverage. ${totalDests} scored destinations across ${stateName}.`,
    thumbnailUrl: destinationImage(heroDestId),
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "India", item: `https://www.nakshiq.com/${locale}/states` },
      ...(regionGroup && regionSlug
        ? [{ "@type": "ListItem", position: 3, name: regionGroup, item: `https://www.nakshiq.com/${locale}/india/${regionSlug}` }]
        : []),
      {
        "@type": "ListItem",
        position: regionGroup && regionSlug ? 4 : 3,
        name: stateName,
        item: `https://www.nakshiq.com/${locale}/state/${stateSlug}`,
      },
    ],
  };

  const sections = [
    { id: "overview", label: "Overview", show: !!(region?.hero_tagline || region?.description || (region?.famous_for && (region.famous_for as string[]).length > 0)) },
    { id: "must-visit", label: t("dontMiss"), show: !!(region?.must_visit && (region.must_visit as MustVisitRow[]).length > 0) },
    { id: "regions", label: t("byRegion"), show: subregions.length > 0 },
    { id: "best-months", label: t("bestTimeToVisit"), show: !!(region?.best_months && (region.best_months as number[]).length > 0) },
    { id: "destinations", label: `All ${totalDests}`, show: destinations.length > 0 },
    { id: "guides", label: "More guides", show: true },
  ].filter((s) => s.show);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {stateVideoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(stateVideoLd) }}
        />
      )}
      <Nav />

      <main id="main-content">
        {/* Cinematic hero — full-bleed video with paper-tinted veil */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(60vh, 600px)",
            overflow: "hidden",
            background: "var(--paper-2)",
            marginTop: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`/images/destinations/${heroDestId}.jpg`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={stateHeroSrc(stateSlug, heroDestId)} type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,10,8,0.35) 0%, rgba(10,10,8,0.75) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "32px 24px",
            }}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 16,
                  letterSpacing: "0.22em",
                }}
              >
                {regionGroup ? regionGroup.toUpperCase() : "INDIA"} · {String(totalDests).padStart(3, "0")} DESTINATIONS
              </p>
              <Title
                as="h1"
                className="nq-display"
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 7vw, 88px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.025em",
                  margin: 0,
                  textWrap: "balance",
                  color: "var(--bone)",
                }}
              >
                {stateName}.
              </Title>
              {state.capital && (
                <p
                  className="nq-mono"
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bone-faint)",
                    marginTop: 16,
                  }}
                >
                  {t("capital")} · {state.capital}
                </p>
              )}
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  lineHeight: 1.45,
                  color: "var(--bone-dim)",
                  marginTop: 12,
                  maxWidth: 720,
                }}
              >
                {subregions.length > 0
                  ? t("heroProse", { count: totalDests, kids: kidsCount, regions: subregions.length })
                  : t("heroProseNoRegions", { count: totalDests, kids: kidsCount })}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky breadcrumb bar — cream-on-paper */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px 0" }}>
          <div
            style={{
              position: "sticky",
              top: 80,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              border: "1px solid var(--hair)",
              background: "rgba(10, 10, 8, 0.85)",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            <Link
              href={regionGroup && regionSlug ? `/${locale}/india/${regionSlug}` : `/${locale}/states`}
              style={{ color: "var(--bone-dim)", textDecoration: "none" }}
            >
              ← Back
            </Link>
            <span style={{ color: "var(--hair)" }} aria-hidden>•</span>
            <Link href={`/${locale}/states`} style={{ color: "var(--bone-dim)", textDecoration: "none" }}>
              India
            </Link>
            {regionGroup && regionSlug && (
              <>
                <span style={{ color: "var(--hair)" }} aria-hidden>/</span>
                <Link href={`/${locale}/india/${regionSlug}`} style={{ color: "var(--bone-dim)", textDecoration: "none" }}>
                  {regionGroup}
                </Link>
              </>
            )}
            <span style={{ color: "var(--hair)" }} aria-hidden>/</span>
            <span style={{ color: "var(--bone)" }}>{stateName}</span>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 64px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 220px",
              gap: 40,
            }}
            className="state-grid"
          >
            <div style={{ minWidth: 0 }}>
              {/* Overview / hero tagline */}
              {(region?.hero_tagline || region?.description) && (
                <section id="section-overview" style={{ marginBottom: 40, scrollMarginTop: 128 }}>
                  {region.hero_tagline && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(22px, 2.4vw, 28px)",
                        lineHeight: 1.3,
                        color: "var(--bone)",
                        margin: "0 0 14px",
                      }}
                    >
                      &ldquo;{region.hero_tagline}&rdquo;
                    </p>
                  )}
                  {region.description && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--bone-dim)",
                        margin: 0,
                        maxWidth: 720,
                      }}
                    >
                      {region.description}
                    </p>
                  )}
                </section>
              )}

              {/* Famous for */}
              {region?.famous_for && (region.famous_for as string[]).length > 0 && (
                <div style={{ marginBottom: 40, padding: 24, border: "1px solid var(--hair)", background: "rgba(245, 241, 232, 0.02)" }}>
                  <p
                    className="nq-kicker"
                    style={{
                      color: "var(--vermillion)",
                      marginBottom: 18,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {t("knownFor")}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {(region.famous_for as string[]).map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ width: 6, height: 6, marginTop: 8, borderRadius: "50%", background: "var(--vermillion)", flexShrink: 0 }} />
                        <span
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 14,
                            lineHeight: 1.5,
                            color: "var(--bone)",
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Must visit */}
              {region?.must_visit && (region.must_visit as MustVisitRow[]).length > 0 && (
                <section id="section-must-visit" style={{ marginBottom: 40, scrollMarginTop: 128 }}>
                  <p
                    className="nq-kicker"
                    style={{
                      color: "var(--vermillion)",
                      marginBottom: 18,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {t("dontMiss")}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: 1,
                      background: "var(--hair)",
                      border: "1px solid var(--hair)",
                    }}
                  >
                    {(region.must_visit as MustVisitRow[]).map((mv) => (
                      <Link
                        key={mv.id}
                        href={`/${locale}/destination/${mv.id}`}
                        style={{
                          display: "block",
                          padding: 16,
                          background: "var(--paper)",
                          textDecoration: "none",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 19,
                            color: "var(--bone)",
                            margin: "0 0 6px",
                          }}
                        >
                          {mv.name}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: "var(--bone-dim)",
                            margin: 0,
                          }}
                        >
                          {mv.why}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Subregions */}
              {subregions.length > 0 && (
                <section id="section-regions" style={{ marginBottom: 40, scrollMarginTop: 128 }}>
                  <p
                    className="nq-kicker"
                    style={{
                      color: "var(--vermillion)",
                      marginBottom: 14,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {t("byRegion")}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {subregions.map((sr) => (
                      <span
                        key={sr.id}
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 14,
                          padding: "8px 16px",
                          border: "1px solid var(--hair)",
                          color: "var(--bone-dim)",
                        }}
                      >
                        {sr.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Best months */}
              {region?.best_months && (region.best_months as number[]).length > 0 && (
                <section id="section-best-months" style={{ marginBottom: 40, scrollMarginTop: 128, padding: 20, border: "1px solid var(--hair)", display: "inline-block" }}>
                  <p
                    className="nq-kicker"
                    style={{
                      color: "var(--vermillion)",
                      marginBottom: 14,
                      letterSpacing: "0.18em",
                    }}
                  >
                    {t("bestTimeToVisit")}
                  </p>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => {
                      const isBest = (region.best_months as number[]).includes(i + 1);
                      return (
                        <span
                          key={m}
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 11,
                            letterSpacing: "0.06em",
                            padding: "4px 8px",
                            color: isBest ? "var(--vermillion)" : "var(--bone-faint)",
                            border: `1px solid ${isBest ? "var(--vermillion)" : "var(--hair)"}`,
                          }}
                        >
                          {m}
                        </span>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Destinations grid */}
              <section id="section-destinations" style={{ marginBottom: 56, scrollMarginTop: 128 }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                    letterSpacing: "0.18em",
                  }}
                >
                  ALL DESTINATIONS · {String(totalDests).padStart(3, "0")}
                </p>
                <StateDestinationGrid destinations={destinations} locale={locale} />
              </section>

              {/* Quick links */}
              <section
                id="section-guides"
                style={{
                  marginBottom: 56,
                  scrollMarginTop: 128,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 1,
                  background: "var(--hair)",
                  border: "1px solid var(--hair)",
                }}
              >
                {[
                  { href: `/${locale}/explore/state/${stateSlug}`, label: t("exploreState", { state: stateName }), hint: t("exploreStateHint") },
                  { href: `/${locale}/treks/state/${stateSlug}`, label: t("treksInState", { state: stateName }), hint: t("treksHint") },
                  { href: `/${locale}/festivals/state/${stateSlug}`, label: t("festivalsInState", { state: stateName }), hint: t("festivalsHint") },
                  { href: `/${locale}/stays/state/${stateSlug}`, label: t("whereToStay"), hint: t("whereToStayHint") },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "block",
                      padding: 18,
                      background: "var(--paper)",
                      textDecoration: "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 17,
                        color: "var(--bone)",
                        margin: "0 0 6px",
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 12,
                        lineHeight: 1.4,
                        color: "var(--bone-dim)",
                        margin: 0,
                      }}
                    >
                      {link.hint}
                    </p>
                  </Link>
                ))}
              </section>

              {/* Prev / Next */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 24,
                  borderTop: "1px solid var(--hair)",
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                }}
              >
                {prevState ? (
                  <Link href={`/${locale}/state/${prevState.id}`} prefetch={false} style={{ color: "var(--bone-dim)", textDecoration: "none" }}>
                    ← {prevState.name}
                  </Link>
                ) : <div />}
                <Link href={`/${locale}/states`} style={{ color: "var(--bone-dim)", textDecoration: "none" }}>
                  {t("allStates")}
                </Link>
                {nextState ? (
                  <Link href={`/${locale}/state/${nextState.id}`} prefetch={false} style={{ color: "var(--bone-dim)", textDecoration: "none" }}>
                    {nextState.name} →
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* Sidebar ToC */}
            <aside className="state-sidebar" style={{ display: "block" }}>
              <DestinationSectionNav sections={sections} variant="sidebar" />
            </aside>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .state-grid { grid-template-columns: 1fr !important; }
            .state-sidebar { display: none !important; }
          }
        `}</style>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
