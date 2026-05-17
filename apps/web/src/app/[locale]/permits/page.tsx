import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PermitsContent } from "@/components/permits-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Permits & Passes — Do I Need a Permit?",
    description: "Complete guide to Inner Line Permits, Protected Area Permits, national park entries, and trek registrations for North India. Costs, processing times, and pro tips.",
    ...localeAlternates(locale, "/permits"),
  };
}

async function getPermits() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("permits")
    .select("*, destinations(name)")
    .order("destination_id");

  return data ?? [];
}

export default async function PermitsPage() {
  const permits = await getPermits();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Permits", item: "https://www.nakshiq.com/en/permits" },
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
            KNOW BEFORE YOU GO · {String(permits.length).padStart(3, "0")} PERMITS
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
            Permits &amp; passes.
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
            {permits.length} permits across India. Inner Line Permits,
            Protected Area Permits, national-park entries, trek registrations
            — costs, processing times, and pro tips.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <PermitsContent permits={permits} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
