import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "More — every tool, guide, and policy in one place",
    description:
      "Trip planning tools, destination comparisons, editorial policy, press, corrections, and the rest of NakshIQ — all linked from a single hub.",
    // GSC: 14 sessions / 0 engaged in 7d. People land here from "site map"-style
    // queries, see a wall of links, bounce. Hub page useful from internal nav
    // but not a search-landing target — stop competing with destination pages.
    robots: { index: false, follow: true },
    ...localeAlternates(locale, "/more"),
  };
}

type Row = { href: string; label: string; desc: string };
type Group = { title: string; rows: Row[] };

export default async function MorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  const p = (path: string) => `/${locale}${path}`;

  const groups: Group[] = [
    {
      title: "Plan your trip",
      rows: [
        { href: p("/build-route"), label: tf("routeBuilder"), desc: "Sequence multiple destinations into one trip." },
        { href: p("/compare"), label: "Compare destinations", desc: "Side-by-side scores, costs, and difficulty." },
        { href: p("/cost-index"), label: "Cost Index", desc: "Real per-destination travel costs by season." },
        { href: p("/risk-quiz"), label: "Risk quiz", desc: "Quick self-assessment for your trip readiness." },
        { href: p("/weekend-from"), label: "Weekend from your city", desc: "Quick getaways from Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad." },
        { href: p("/arrival"), label: "Airport arrival guides", desc: "What to do in the first 4 hours at any major airport." },
        { href: p("/permits"), label: tn("permits"), desc: "Inner-line and protected-area permits, by destination." },
        { href: p("/road-conditions"), label: tf("roadStatus"), desc: "Pass closures and seasonal road status." },
      ],
    },
    {
      title: "Discover India",
      rows: [
        { href: p("/nakshiq-100"), label: "NakshIQ 100", desc: "The 100 best destination-months in India." },
        { href: p("/explore-by-persona"), label: "By persona", desc: "Filtered for solo, family, biker, photographer, and more." },
        { href: p("/india-vs"), label: "India vs the world", desc: "How India compares to Vietnam, Morocco, Peru, Egypt." },
        { href: p("/tourist-traps"), label: tn("touristTraps"), desc: "Overhyped places with honest alternatives — what we'd skip and what we'd do instead." },
        { href: p("/the-window"), label: "The Window", desc: "Our weekly newsletter, archived." },
        { href: p("/guide"), label: tn("guides"), desc: "Visa, food safety, etiquette, packing, transport." },
      ],
    },
    {
      title: "About NakshIQ",
      rows: [
        { href: p("/about"), label: tn("about"), desc: "Why this exists and who's building it." },
        { href: p("/methodology"), label: tf("howWeScore"), desc: "How we score every destination, every month." },
        { href: p("/editorial-policy"), label: tf("editorialPolicy"), desc: "Standards we hold every page to." },
        { href: p("/press"), label: "Press & research", desc: "Citation-ready datasets and media coverage." },
        { href: p("/newsletter"), label: "Newsletter", desc: "One honest spread, every Sunday." },
      ],
    },
    {
      title: "Help & legal",
      rows: [
        { href: p("/corrections"), label: "Corrections", desc: "Suggest an edit or report a mistake." },
        { href: p("/contact"), label: "Contact", desc: "Reach the editor directly." },
        { href: p("/sos"), label: tn("sos"), desc: "Emergency contacts and helplines, offline-ready." },
        { href: p("/terms"), label: tf("terms"), desc: "Terms of service." },
        { href: p("/privacy"), label: tf("privacy"), desc: "Privacy policy." },
        { href: p("/cookies"), label: tf("cookies"), desc: "Cookie policy." },
      ],
    },
  ];

  const totalLinks = groups.reduce((sum, g) => sum + g.rows.length, 0);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 900, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            SITEMAP · {String(totalLinks).padStart(2, "0")} SURFACES · {groups.length} SECTIONS
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
            More.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            Every NakshIQ tool, guide, and policy in one place.
          </p>
        </header>

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
        >
          {groups.map((group) => (
            <section key={group.title}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 16,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {group.title} · {String(group.rows.length).padStart(2, "0")}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid var(--hair)",
                }}
              >
                {group.rows.map((row, i) => (
                  <Link
                    key={row.href}
                    href={row.href}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                      padding: "14px 20px",
                      background: "var(--paper)",
                      textDecoration: "none",
                      borderTop: i === 0 ? "none" : "1px solid var(--hair)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 17,
                        lineHeight: 1.3,
                        color: "var(--bone)",
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        minWidth: 0,
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "var(--bone-dim)",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.desc}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 11,
                        color: "var(--vermillion)",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
