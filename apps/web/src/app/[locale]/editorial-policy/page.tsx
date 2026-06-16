import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

// Static content — cache aggressively so prefetches served from CDN, not
// regenerated (fixes intermittent 503s on _rsc= reported in BUG-002).
export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Editorial Policy",
    description:
      "No paid placements. No sponsored content. No tourism board deals. How NakshIQ scores destinations, identifies tourist traps, and keeps editorial independent from revenue.",
    ...localeAlternates(locale, "/editorial-policy"),
  };
}

const h2Style = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic" as const,
  fontWeight: 500,
  fontSize: 28,
  lineHeight: 1.15,
  color: "var(--bone)",
  margin: "0 0 18px",
};

const proseStyle = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 15,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  margin: 0,
};

const inlineLinkStyle = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

const sourceBullets = [
  "Monthly weather data — historical temperature, precipitation, and seasonal patterns for each destination",
  "Road condition reports — route accessibility, closure periods, surface quality, and alternative access routes",
  "Infrastructure surveys — ATM availability, phone signal coverage by carrier, fuel stations, medical facilities, card acceptance",
  "Kids safety assessments — altitude risk, medical access time, road safety, terrain difficulty, phone connectivity",
  "Local verification — ground-truthing data against local knowledge and recent traveller reports",
];

export default async function EditorialPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Editorial policy", item: `${SITE}/${locale}/editorial-policy` },
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
        <header style={{ maxWidth: 720, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            POLICY · REVIEWED ROLLING
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
            Editorial policy.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
            }}
          >
            Reviewed on a rolling cadence. The principles below are permanent.
          </p>
        </header>

        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 56 }}>
          {/* Sacred rule */}
          <section>
            <h2 style={h2Style}>The sacred rule.</h2>
            <p style={proseStyle}>
              No paid placements. No sponsored content. No tourism board promotion packages. No destination
              pays for better visibility, higher scores, or preferential treatment on any page.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              This is not a policy we adopted because it sounds good. It is the reason NakshIQ exists. The
              moment we accept money to promote a destination, every score on this site becomes meaningless.
              So we don&apos;t. Ever.
            </p>
          </section>

          {/* Scoring */}
          <section>
            <h2 style={h2Style}>How scores work.</h2>
            <p style={proseStyle}>
              400+ destinations. Each one scored 0 to 10 for every month of the year. Scores are based on five
              factors: weather conditions, road access and connectivity, crowd levels, infrastructure quality,
              and safety considerations.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              A score of 5 means conditions are excellent across all factors for that month. A score of 1
              means we actively recommend against visiting — dangerous roads, extreme weather, closed routes,
              or serious infrastructure gaps.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              We do not average these factors into a single number and call it a day. A destination can have
              perfect weather but deadly roads. That shows in the data. See our{" "}
              <Link href={`/${locale}/methodology`} style={inlineLinkStyle}>full methodology</Link>{" "}
              for scoring criteria, weights, and data sources.
            </p>
          </section>

          {/* Traps */}
          <section>
            <h2 style={h2Style}>How we identify tourist traps.</h2>
            <p style={proseStyle}>
              A tourist trap is not a bad place. It is an overcrowded, overpriced, or under-delivering place
              when a better alternative exists within a 2-hour drive.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              We identify them through data: crowd levels relative to infrastructure capacity, pricing
              relative to comparable destinations, and quality of experience relative to alternatives in the
              same region and season. If a destination draws 10x the crowds of a nearby alternative with
              comparable scenery and better infrastructure — and the only reason is brand recognition — we
              flag it.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              We are not trying to stop anyone from visiting popular places. We are trying to make sure you
              know what else exists before you default to the same destination everyone else picks.
            </p>
          </section>

          {/* Affiliate disclosure */}
          <section>
            <h2 style={h2Style}>Affiliate disclosure.</h2>
            <p style={proseStyle}>
              We earn a small commission if you book through our links — at no cost to you. This is how we
              fund the site. Affiliate links appear on destination pages and itinerary suggestions, linking
              to booking platforms such as Booking.com and Agoda.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              Affiliate revenue never affects our scores or recommendations. Not partially. Not indirectly.
              Not through &quot;editorial partnerships&quot; or &quot;preferred listings&quot; or any other
              euphemism for paid influence.
            </p>
          </section>

          {/* Chinese wall */}
          <section>
            <h2 style={h2Style}>The Chinese wall.</h2>
            <p style={proseStyle}>
              Scoring and editorial content are independent of affiliate revenue. A destination that generates
              significant booking commissions and a destination that generates zero commissions are scored
              identically — same criteria, same weights, same data sources.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              A destination can score 2.0/10 for a given month and still have booking links on its page. The
              link is there because hotels exist there. The score is there because conditions are poor. These
              are independent facts and we treat them independently.
            </p>
          </section>

          {/* Sources */}
          <section>
            <h2 style={h2Style}>Data sources.</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {sourceBullets.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--bone-dim)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ ...proseStyle, marginTop: 20 }}>
              When a primary source can&apos;t confirm a field, we leave it blank rather than fill it with a
              plausible-looking number. See{" "}
              <Link href={`/${locale}/why-we-say-no-data`} style={inlineLinkStyle}>why we say no data</Link>{" "}
              for what a dash on this site actually means.
            </p>
          </section>

          {/* Update cadence */}
          <section>
            <h2 style={h2Style}>How often we update.</h2>
            <p style={proseStyle}>
              Scores are reviewed seasonally. Destination pages are updated when conditions change materially
              — a new road opens, infrastructure improves or degrades, safety conditions shift, or we receive
              verified reports that contradict our current data.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              We do not update scores for the sake of appearing fresh. If nothing has changed, the data stays
              as it is.
            </p>
          </section>

          {/* Errors */}
          <section
            style={{
              padding: 24,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: "0 0 14px",
              }}
            >
              If we get something wrong
            </p>
            <p style={{ ...proseStyle, color: "var(--bone)" }}>
              We will. Conditions change faster than any editorial team can track. If you find data that is
              outdated, incorrect, or misleading, email{" "}
              <a href="mailto:hello@nakshiq.com" style={inlineLinkStyle}>hello@nakshiq.com</a>{" "}
              with specifics. We verify and correct. No defensiveness, no delay.
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
