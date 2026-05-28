import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FestivalsContent } from "@/components/festivals-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { festivalsItemListJsonLd } from "@/lib/festival-schema";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Festivals & Events — 183 Festivals Across India",
    description: "Time your trip around India's most spectacular festivals. Pushkar Camel Fair, Dev Deepawali, Hemis Festival, Tulip Festival, and 180+ more with dates and destinations.",
    ...localeAlternates(locale, "/festivals"),
  };
}

async function getFestivals() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("festivals")
    .select("*, destinations(name, state_id)")
    .order("month")
    .order("name");

  return data ?? [];
}

export default async function FestivalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const festivals = await getFestivals();
  const pageUrl = `https://www.nakshiq.com/${locale}/festivals`;
  const eventListLd = festivalsItemListJsonLd(festivals as Parameters<typeof festivalsItemListJsonLd>[0], null, pageUrl);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Festivals", item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListLd) }}
      />
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
        <header style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            CULTURAL CALENDAR · {String(festivals.length).padStart(3, "0")} FESTIVALS
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
            }}
          >
            Festivals &amp; events.
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
            {festivals.length} festivals across India — time your trip around
            something extraordinary. Pushkar Camel Fair, Dev Deepawali, Hemis
            Festival, Tulip Festival, and many more with dates and host
            destinations.
          </p>
          <p
            className="nq-mono"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
              marginTop: 28,
            }}
          >
            Filter by month, state, category, kids-friendly
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FestivalsContent festivals={festivals} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
