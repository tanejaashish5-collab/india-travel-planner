import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { DIFFICULTY_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; level: string}> }): Promise<Metadata> {
  const { locale, level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) return {};
  return {
    title: `${name} Treks in India — Scored Trails`,
    description: `All ${name.toLowerCase()} treks across India with altitude, duration, best months, gear requirements, and fitness level needed.`,
    ...localeAlternates(locale, `/treks/difficulty/${level}`),
  };
}

export default async function TreksByDifficultyPage({ params }: { params: Promise<{ locale: string; level: string }> }) {
  const { locale, level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("difficulty", level)
    .order("name");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Treks", item: `https://www.nakshiq.com/${locale}/treks` },
      { "@type": "ListItem", position: 3, name: `${name} treks`, item: `https://www.nakshiq.com/${locale}/treks/difficulty/${level}` },
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
            TREKS · DIFFICULTY · {name.toUpperCase()}
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
            {name} treks.
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
            {(treks ?? []).length} {name.toLowerCase()} treks across India.
            Altitude, duration, best months, and fitness requirements for
            each trail.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <TreksContent treks={treks ?? []} trekDests={[]} gearChecklists={[]} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
