import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { LuxuryContent } from "@/components/luxury-content";
import { LuxuryHeroCarousel } from "@/components/luxury-hero-carousel";
import { LuxuryFeatures } from "@/components/luxury-features";
import { localeAlternates, breadcrumbSchema, collectionPageSchema } from "@/lib/seo-utils";
import { luxuryItemListJsonLd, type LuxuryRow } from "@/lib/luxury-schema";
import { currentMonthIST, currentDayIST, currentMonthLocalisedIST } from "@itp/shared";

// /luxury hub. Lists every published luxury_experiences row — trains,
// iconic stays, curated itineraries. Mirrors the /festivals hub.

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Ultra-luxury India trips — royal trains, palace hotels, iconic stays",
    description: "Palace on Wheels, Maharajas' Express, Taj Lake Palace, Umaid Bhawan, Aman-i-Khas. The trips you save for once in a lifetime — verified rates, real itineraries, no hype.",
    ...localeAlternates(locale, "/luxury"),
  };
}

async function loadLuxury(): Promise<LuxuryRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("luxury_experiences")
    .select("id, name, category, tier, state_id, primary_destination_id, operator, tagline, editorial, hero_image_url, hero_video_slug, price_band_inr, duration, best_months, translations")
    .eq("published", true)
    .order("category")
    .order("tier")
    .order("name");
  return (data ?? []) as LuxuryRow[];
}

// Features picker — surfaces 5 properties relevant to the current IST
// month, rotating weekly within the month so return visitors see fresh
// picks. Aims for category variety: 3 stays + 1 train + 1 itinerary.
// Falls back to out-of-season rows from each category if the in-season
// pool is empty for that category (most palaces/trains/itineraries are
// operationally year-round; best_months is editorial guidance, not a
// hard close).
function pickMonthFeatures(rows: LuxuryRow[], month: number, day: number): LuxuryRow[] {
  const inSeason = (r: LuxuryRow) => r.best_months?.includes(month) ?? false;
  const tierRank = (r: LuxuryRow) =>
    r.tier === "iconic" ? 0 : r.tier === "ultra_luxury" ? 1 : 2;
  const rank = (a: LuxuryRow, b: LuxuryRow) => {
    const seasonDiff = (inSeason(b) ? 1 : 0) - (inSeason(a) ? 1 : 0);
    if (seasonDiff) return seasonDiff;
    return tierRank(a) - tierRank(b);
  };
  const byCat = (cat: LuxuryRow["category"]) =>
    rows.filter((r) => r.category === cat).sort(rank);

  const stays = byCat("stay");
  const trains = byCat("train");
  const itineraries = byCat("itinerary");

  const weekOffset = Math.floor(day / 7);
  const pick = <T,>(arr: T[], n: number): T[] =>
    arr.length === 0
      ? []
      : Array.from({ length: Math.min(n, arr.length) }, (_, i) => arr[(weekOffset + i) % arr.length]);

  const [s1, s2, s3] = pick(stays, 3);
  const [t1] = pick(trains, 1);
  const [i1] = pick(itineraries, 1);
  // Display order zigzags via the alternating-side layout in LuxuryFeatures.
  return [s1, t1, s2, i1, s3].filter((r): r is LuxuryRow => Boolean(r));
}

// Hero carousel picks rows with the strongest visual draw — prefers
// iconic-tier with a hero_video_slug, then falls back to ultra_luxury
// stays with video. Caps at 5 to keep the carousel snappy.
function pickHeroes(rows: LuxuryRow[]): LuxuryRow[] {
  const withVideo = rows.filter((r) => r.hero_video_slug);
  const iconic = withVideo.filter((r) => r.tier === "iconic");
  const ultraStays = withVideo.filter((r) => r.tier === "ultra_luxury" && r.category === "stay");
  const trains = withVideo.filter((r) => r.category === "train");
  // Mix: 2 iconic stays, 1 train, 1 ultra-luxury stay — gives 4 distinct moods.
  return [
    iconic[0],
    trains[0],
    iconic[1],
    ultraStays[0],
  ].filter((r): r is LuxuryRow => Boolean(r)).slice(0, 5);
}

export default async function LuxuryHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const rows = await loadLuxury();
  const heroes = pickHeroes(rows);
  const featureRows = pickMonthFeatures(rows, currentMonthIST(), currentDayIST());
  const monthLabel = currentMonthLocalisedIST(locale === "hi" ? "hi-IN" : "en-US");
  const pageUrl = `https://www.nakshiq.com/${locale}/luxury`;
  const itemListLd = luxuryItemListJsonLd(rows, pageUrl, locale);
  const breadcrumbLd = breadcrumbSchema(locale, [{ name: "Luxury", path: "/luxury" }]);
  const collectionLd = collectionPageSchema({
    locale,
    path: "/luxury",
    name: "Ultra-luxury India trips",
    description: "Royal trains, palace hotels, iconic stays and curated multi-property itineraries — the trips you save for once in a lifetime.",
  });

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <LuxuryHeroCarousel heroes={heroes} locale={locale} />
      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "72px 24px 64px" }}>
        <header style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
          <p className="nq-kicker" style={{ color: "var(--vermillion)", marginBottom: 24, letterSpacing: "0.22em" }}>
            ULTRA-LUXURY · {String(rows.length).padStart(2, "0")} TRIPS
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 6.5vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              marginBottom: 28,
              color: "var(--bone)",
            }}
          >
            The trips you save<br />for once in a lifetime
          </Title>
          <p style={{ maxWidth: 720, fontSize: 17, lineHeight: 1.65, color: "var(--bone-dim)" }}>
            Royal trains across Rajasthan and the Deccan, palace hotels older than the United States,
            tented camps that put you twenty paces from a tigress at dawn. Every entry below carries a
            verified rate band, an operator URL, and at least two independent sources — nothing here is
            invented. Book Oct–Mar where possible, six months out, and read each page before you wire money.
          </p>
        </header>
        <LuxuryFeatures rows={featureRows} locale={locale} monthLabel={monthLabel} />
        <div style={{ maxWidth: 1280, margin: "0 auto", paddingTop: 32 }}>
          <LuxuryContent rows={rows} locale={locale} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
