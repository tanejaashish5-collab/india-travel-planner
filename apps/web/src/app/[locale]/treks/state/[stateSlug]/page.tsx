import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { notFound } from "next/navigation";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Treks in ${stateName} — Scored Trails & Routes | NakshIQ`,
    description: `Every trek in ${stateName} scored by difficulty, altitude, best months, and fitness level. Gear checklists, route maps, and honest assessments.`,
    ...localeAlternates(locale, `/treks/state/${stateSlug}`),
  };
}

export default async function TreksByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .order("difficulty");

  const filteredTreks = (treks ?? []).filter((t: { destinations?: { state?: { name?: string } } }) => t.destinations?.state?.name === stateName);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Treks", item: `https://www.nakshiq.com/${locale}/treks` },
      { "@type": "ListItem", position: 3, name: `Treks in ${stateName}`, item: `https://www.nakshiq.com/${locale}/treks/state/${stateSlug}` },
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
            TREKS · {stateName.toUpperCase()} · {String(filteredTreks.length).padStart(3, "0")} TRAILS
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
            Treks in {stateName}.
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
            {filteredTreks.length} scored trails across {stateName} — from
            easy day hikes to serious expeditions.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <TreksContent treks={filteredTreks} trekDests={[]} gearChecklists={[]} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
