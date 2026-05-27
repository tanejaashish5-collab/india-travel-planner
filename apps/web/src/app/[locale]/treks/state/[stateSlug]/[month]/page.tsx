import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP, MONTH_MAP } from "@/lib/seo-maps";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string; month: string }> }): Promise<Metadata> {
  const { locale, stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) return {};
  return {
    title: `Treks in ${stateName} in ${m.name} — Best Trails This Month`,
    description: `Best treks in ${stateName} for ${m.name}. Trail conditions, weather, difficulty, and whether the route is open. Honest assessments.`,
    ...localeAlternates(locale, `/treks/state/${stateSlug}/${month}`),
  };
}

export default async function TreksStateMonthPage({ params }: { params: Promise<{ locale: string; stateSlug: string; month: string }> }) {
  const { locale, stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: treks } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .order("name");

  const filtered = (treks ?? []).filter((t: { destinations?: { state?: { name?: string } }; best_months?: number[] }) => {
    const trekState = t.destinations?.state?.name;
    if (trekState !== stateName) return false;
    if (t.best_months && Array.isArray(t.best_months)) {
      return t.best_months.includes(m.num);
    }
    return true;
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Treks", item: `https://www.nakshiq.com/${locale}/treks` },
      { "@type": "ListItem", position: 3, name: `${stateName}`, item: `https://www.nakshiq.com/${locale}/treks/state/${stateSlug}` },
      { "@type": "ListItem", position: 4, name: m.name, item: `https://www.nakshiq.com/${locale}/treks/state/${stateSlug}/${month}` },
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
            TREKS · {stateName.toUpperCase()} · {m.name.toUpperCase()}
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
            {stateName} treks in {m.name}.
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
            {filtered.length} treks open or recommended in {m.name}. Trail
            conditions and difficulty for the month.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <TreksContent treks={filtered} trekDests={[]} gearChecklists={[]} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
