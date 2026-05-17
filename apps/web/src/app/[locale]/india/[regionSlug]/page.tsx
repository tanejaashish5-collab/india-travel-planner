import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { REGION_GROUPS, STATE_MAP } from "@/lib/seo-maps";
import { macroRegionHeroSrc, hasMacroRegionHero } from "@/lib/landing-heroes";
import { videoObjectJsonLd } from "@/lib/video-schema";
import { destinationImage } from "@/lib/image-url";
import { currentMonthIST, formatScoreInline } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

const REGION_DESCRIPTIONS: Record<string, string> = {
  north: "From Himalayan passes to Thar desert dunes. Ten states spanning Jammu & Kashmir, Ladakh, Himachal, Uttarakhand, Punjab, Haryana, Delhi, Rajasthan, Uttar Pradesh and Chandigarh — India's highest mountains, its grandest palaces, and the Gangetic heartland.",
  south: "Beaches, backwaters, temple towns, hill stations. Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Telangana and Puducherry — the Dravidian south, where the monsoon arrives first and the coffee is brewed strongest.",
  east: "West Bengal, Bihar, Jharkhand, Odisha. The Gangetic plains meet the Bay of Bengal — Kolkata's colonial trams, Bodh Gaya's bodhi tree, Konark's sun temple, Sundarbans tigers.",
  west: "Gujarat, Maharashtra, Goa, Daman & Diu. Gandhi's birthplace, Mumbai's skyline, the Konkan coast, the white salt desert of Kutch.",
  central: "Madhya Pradesh and Chhattisgarh. India's tiger country — Bandhavgarh, Kanha, Pench — plus Khajuraho's erotic temples and Bastar's tribal heartland.",
  northeast: "Seven Sister states plus Sikkim. Monastery country, Hornbill festivals, world's wettest place, cleanest village. India that feels like somewhere else.",
  islands: "Andaman & Nicobar and Lakshadweep. Coral atolls, virgin beaches, tribal reserves. The India most Indians haven't been to.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regionSlug: string; locale: string }>;
}): Promise<Metadata> {
  const { regionSlug, locale } = await params;
  const region = REGION_GROUPS[regionSlug];
  if (!region) return {};
  return {
    title: `${region.name} — Destinations, Scores & Travel Guide`,
    description: `Explore every destination in ${region.name}. ${region.states.length} states, monthly scores, honest skip list, real travel intelligence.`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/india/${regionSlug}`,
      languages: {
        en: `https://www.nakshiq.com/en/india/${regionSlug}`,
        hi: `https://www.nakshiq.com/hi/india/${regionSlug}`,
        "x-default": `https://www.nakshiq.com/en/india/${regionSlug}`,
      },
    },
  };
}

type DestSummary = {
  id: string;
  state_id: string;
  destination_months?: { month: number; score: number | null }[] | null;
};

type StateSummary = {
  id: string;
  name: string;
  capital?: string | null;
  display_order?: number | null;
};

async function getRegionData(regionSlug: string) {
  const region = REGION_GROUPS[regionSlug];
  if (!region) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const [statesResult, destResult] = await Promise.all([
    supabase.from("states").select("id, name, capital, display_order").in("id", region.states as readonly string[]).order("display_order"),
    supabase
      .from("destinations")
      .select("id, state_id, destination_months(month, score)")
      .in("state_id", region.states as readonly string[]),
  ]);

  const currentMonth = currentMonthIST();
  const countMap: Record<string, number> = {};
  const allDestsByState: Record<string, string[]> = {};
  const scoreSum: Record<string, { total: number; count: number }> = {};

  (destResult.data ?? []).forEach((d: DestSummary) => {
    countMap[d.state_id] = (countMap[d.state_id] || 0) + 1;
    (allDestsByState[d.state_id] ??= []).push(d.id);
    const monthData = d.destination_months?.find((m) => m.month === currentMonth);
    if (monthData?.score) {
      if (!scoreSum[d.state_id]) scoreSum[d.state_id] = { total: 0, count: 0 };
      scoreSum[d.state_id].total += monthData.score;
      scoreSum[d.state_id].count++;
    }
  });

  const firstDestMap: Record<string, string> = {};
  for (const [stateId, dests] of Object.entries(allDestsByState)) {
    const sorted = [...dests].sort();
    const tokens = stateId.split("-");
    firstDestMap[stateId] = sorted.find((d) => tokens.includes(d)) ?? sorted[0];
  }

  const states = (statesResult.data ?? []).map((s: StateSummary) => ({
    ...s,
    destCount: countMap[s.id] ?? 0,
    heroDestId: firstDestMap[s.id] ?? s.id,
    avgScore: scoreSum[s.id] ? Math.round((scoreSum[s.id].total / scoreSum[s.id].count) * 10) / 10 : null,
  }));

  const totalDests = states.reduce((sum: number, s) => sum + s.destCount, 0);
  const heroDestId = states.find((s) => s.heroDestId)?.heroDestId ?? "manali";

  return { region, states, totalDests, heroDestId };
}

export default async function IndiaRegionPage({
  params,
}: {
  params: Promise<{ regionSlug: string; locale: string }>;
}) {
  const { regionSlug, locale } = await params;
  const region = REGION_GROUPS[regionSlug];
  if (!region) notFound();

  const data = await getRegionData(regionSlug);
  if (!data) notFound();

  const { states, totalDests, heroDestId } = data;
  const description = REGION_DESCRIPTIONS[regionSlug] ?? "";

  const videoLd = videoObjectJsonLd({
    id: hasMacroRegionHero(regionSlug) ? `region-${regionSlug}` : heroDestId,
    name: `${region.name} — NakshIQ regional travel reel`,
    description: `Travel footage from ${region.name} (${region.states.length} states). NakshIQ's regional coverage of India's ${regionSlug} cluster.`,
    thumbnailUrl: destinationImage(heroDestId),
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "India", item: `https://www.nakshiq.com/${locale}/states` },
      { "@type": "ListItem", position: 3, name: region.name, item: `https://www.nakshiq.com/${locale}/india/${regionSlug}` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      <Nav />

      <main id="main-content">
        {/* Cinematic hero with full-bleed video */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(56vh, 540px)",
            overflow: "hidden",
            background: "var(--paper-2)",
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
            <source src={macroRegionHeroSrc(regionSlug, heroDestId)} type="video/mp4" />
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
                INDIA · {region.name.toUpperCase()} · {region.states.length} STATES · {String(totalDests).padStart(3, "0")} DESTINATIONS
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
                {region.name}.
              </Title>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 64px" }}>
          {description && (
            <div style={{ marginBottom: 48, maxWidth: 760 }}>
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "var(--bone-dim)",
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          )}

          {/* States grid */}
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.18em",
            }}
          >
            STATES IN {region.name.toUpperCase()}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              marginBottom: 56,
            }}
          >
            {states.map((state) => (
              <Link
                key={state.id}
                href={`/${locale}/state/${state.id}`}
                style={{
                  display: "block",
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    height: 180,
                    backgroundImage: `url(/images/destinations/${state.heroDestId}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.85)",
                  }}
                />
                <div style={{ padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 22,
                        color: "var(--bone)",
                        margin: 0,
                      }}
                    >
                      {state.name}
                    </h3>
                    {state.avgScore && (
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          color: "var(--vermillion)",
                        }}
                      >
                        {formatScoreInline(state.avgScore)}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      margin: 0,
                    }}
                  >
                    {state.capital && `${state.capital} · `}
                    {state.destCount} destinations
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA strip */}
          <div
            style={{
              paddingTop: 32,
              borderTop: "1px solid var(--hair)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  color: "var(--bone-dim)",
                  margin: "0 0 4px",
                }}
              >
                Want the full map of India?
              </p>
              <Link
                href={`/${locale}/states`}
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 18,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Browse all {Object.keys(STATE_MAP).length} states →
              </Link>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(REGION_GROUPS)
                .filter(([k]) => k !== regionSlug)
                .slice(0, 3)
                .map(([k, r]) => (
                  <Link
                    key={k}
                    href={`/${locale}/india/${k}`}
                    prefetch={false}
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      border: "1px solid var(--hair)",
                      color: "var(--bone-dim)",
                      textDecoration: "none",
                    }}
                  >
                    {r.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
