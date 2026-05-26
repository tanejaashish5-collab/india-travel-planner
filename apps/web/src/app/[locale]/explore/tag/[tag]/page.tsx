import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Pre-render the 8 highest-traffic tag pages at build time (× 2 locales = 16).
// Other tag combos fall back to on-demand ISR.
export function generateStaticParams() {
  const topTags = ["offbeat", "trek", "spiritual", "heritage", "wildlife", "family", "winter", "adventure"];
  const locales = ["en", "hi"];
  return locales.flatMap((locale) => topTags.map((tag) => ({ locale, tag })));
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const TAG_DISPLAY: Record<string, { title: string; desc: string }> = {
  "offbeat": { title: "Offbeat Destinations", desc: "Places most tourists haven't heard of — scored for the adventurous" },
  "trek": { title: "Trekking Destinations", desc: "Base camps, trail heads, and mountain towns for trekkers" },
  "spiritual": { title: "Spiritual Destinations", desc: "Temples, ashrams, and sacred sites across India" },
  "heritage": { title: "Heritage Destinations", desc: "Forts, palaces, monuments, and UNESCO sites" },
  "wildlife": { title: "Wildlife Destinations", desc: "National parks, tiger reserves, and birding hotspots" },
  "lake": { title: "Lake Destinations", desc: "Hill station lakes, sacred lakes, and high-altitude water bodies" },
  "romantic": { title: "Romantic Destinations", desc: "Quiet valleys, lakeside retreats, and mountain escapes for couples" },
  "adventure": { title: "Adventure Destinations", desc: "Rafting, paragliding, skiing, and adrenaline-fueled destinations" },
  "family": { title: "Family Destinations", desc: "Kid-tested, parent-approved — with actual kids ratings" },
  "winter": { title: "Winter Destinations", desc: "Snow, skiing, and destinations that shine in December-February" },
  "monsoon": { title: "Monsoon Destinations", desc: "Waterfalls, green valleys, and places that come alive in rain" },
  "photography": { title: "Photography Destinations", desc: "The most photogenic destinations in India" },
  "budget": { title: "Budget Destinations", desc: "Incredible experiences under ₹1,000 per day" },
  "pilgrimage": { title: "Pilgrimage Destinations", desc: "Sacred circuits and spiritual journeys across faiths" },
  "hill-station": { title: "Hill Stations", desc: "Classic and offbeat hill stations across the Himalayas" },
  "border": { title: "Border Destinations", desc: "International borders worth visiting — from Wagah to LOC viewpoints" },
  "desert": { title: "Desert Destinations", desc: "Thar desert, sand dunes, camel safaris, and stargazing" },
  "valley": { title: "Valley Destinations", desc: "Hidden valleys, flower meadows, and mountain passes" },
  "monastery": { title: "Monastery Destinations", desc: "Buddhist monasteries, Tibetan settlements, and meditation retreats" },
  "waterfall": { title: "Waterfall Destinations", desc: "India's most spectacular waterfalls and the best months to visit" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; tag: string }> }): Promise<Metadata> {
  const { locale, tag } = await params;
  const info = TAG_DISPLAY[tag];
  if (!info) return {
    title: `${tag} Destinations`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/explore/tag/${tag}`,
      languages: {
        en: `https://www.nakshiq.com/en/explore/tag/${tag}`,
        hi: `https://www.nakshiq.com/hi/explore/tag/${tag}`,
        "x-default": `https://www.nakshiq.com/en/explore/tag/${tag}`,
      },
    },
  };
  return {
    title: `${info.title} in India — Scored & Ranked`,
    description: info.desc + " Every destination scored monthly with kids ratings and safety data.",
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/explore/tag/${tag}`,
      languages: {
        en: `https://www.nakshiq.com/en/explore/tag/${tag}`,
        hi: `https://www.nakshiq.com/hi/explore/tag/${tag}`,
        "x-default": `https://www.nakshiq.com/en/explore/tag/${tag}`,
      },
    },
  };
}

export default async function ExploreByTagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  const info = TAG_DISPLAY[tag] ?? { title: `${tag} Destinations`, desc: "" };

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = currentMonthIST();

  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .contains("tags", [tag])
    .order("name");

  if (!data || data.length === 0) notFound();

  const sorted = data.sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

  const states = [...new Set(data.map((d: any) => {
    const s = Array.isArray(d.state) ? d.state[0] : d.state;
    return s ? JSON.stringify({ id: d.state_id, name: s.name }) : null;
  }).filter(Boolean))].map(s => JSON.parse(s!));

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
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
            EXPLORE · TAG · {tag.toUpperCase()} · {String(sorted.length).padStart(3, "0")}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--bone)",
            }}
          >
            {info.title}.
          </h1>
          {info.desc && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.4,
                color: "var(--bone-dim)",
                margin: "24px 0 0",
                maxWidth: 720,
              }}
            >
              {sorted.length} destinations — {info.desc}
            </p>
          )}
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/explore`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← All destinations
            </Link>
          </div>
        </header>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense fallback={<div style={{ minHeight: 400, background: "rgba(245, 241, 232, 0.03)" }} />}>
            <ExploreGrid destinations={sorted} states={states} />
          </Suspense>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
