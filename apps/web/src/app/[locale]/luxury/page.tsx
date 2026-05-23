import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { LuxuryContent } from "@/components/luxury-content";
import { localeAlternates, breadcrumbSchema, collectionPageSchema } from "@/lib/seo-utils";
import { luxuryItemListJsonLd, type LuxuryRow } from "@/lib/luxury-schema";
import { videoSrc } from "@/lib/video-url";

// /luxury hub. Lists every published luxury_experiences row — trains,
// iconic stays, curated itineraries. Mirrors the /festivals hub.

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Ultra-luxury India trips — royal trains, palace hotels, iconic stays | NakshIQ",
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
    .select("id, name, category, tier, state_id, primary_destination_id, operator, tagline, hero_image_url, hero_video_slug, price_band_inr, duration, best_months, translations")
    .eq("published", true)
    .order("category")
    .order("tier")
    .order("name");
  return (data ?? []) as LuxuryRow[];
}

export default async function LuxuryHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const rows = await loadLuxury();
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
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(360px, 64vh, 720px)",
          background: "var(--paper-2)",
          overflow: "hidden",
          marginTop: 88,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={videoSrc("hub-master-montage")} type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,8,0.15) 0%, transparent 35%, rgba(10,10,8,0.82) 100%)",
          }}
        />
      </div>
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
              color: "var(--ink)",
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
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <LuxuryContent rows={rows} locale={locale} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
