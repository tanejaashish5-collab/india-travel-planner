import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { MembershipForm } from "@/components/membership-form";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ सदस्यता प्रतीक्षा सूची — ₹999/वर्ष"
      : "NakshIQ Membership waitlist — ₹999/year",
    description: isHindi
      ? "विज्ञापन रहित, प्रायोजन रहित। NakshIQ सदस्यता विशेष साप्ताहिक निबंध, पहले पहुँच, बिना-विज्ञापन पढ़ाई और परिवार-निर्मित संपादकीय को समर्थन देती है।"
      : "Ad-free, sponsor-free. Members get the weekly essay series early, offline-ready trip PDFs, exclusive Cost Index deep-dives, and direct editor Q&A. Join the waitlist — launch pricing ₹999/year.",
    ...localeAlternates(locale, "/membership"),
  };
}

const BENEFITS: { title: string; body: string }[] = [
  {
    title: "The Window — early + archive",
    body: "Weekly editorial essay in your inbox the Saturday before non-members see it on the site. Full archive always accessible, searchable.",
  },
  {
    title: "Offline trip PDFs",
    body: "Download your saved trips as a polished PDF with maps, emergency numbers, and week-by-week itinerary. Critical on Ladakh / Spiti where network drops.",
  },
  {
    title: "Cost Index deep-dives",
    body: "Members-only quarterly deep-dives — the story behind the numbers. Where prices are moving, which operators changed hands, what's still worth it.",
  },
  {
    title: "Editor Q&A",
    body: "Direct email access to the editorial team for specific trip questions. Reply within 2–5 working days.",
  },
  {
    title: "Member concierge rates",
    body: "When Sprint 16 launches the concierge tier, Members get discounted rates on human-reviewed itinerary-checking + DMC-vetted specialist introductions.",
  },
  {
    title: "No ads, ever",
    body: "NakshIQ doesn't run ads for non-members either. Membership is how we keep it that way — you're paying for editorial independence to stay editorial.",
  },
];

const WONT_DO = [
  "We will never run ads on NakshIQ, for Members or non-Members.",
  "We will never accept payment to score a destination higher.",
  "We will never share your email with partners, DMCs, or affiliates.",
  "You can unsubscribe in one click — the link is at the bottom of every email.",
];

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${BASE_URL}/${locale}/membership`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Membership", item: pageUrl },
    ],
  };

  const offerLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${pageUrl}#offer`,
    name: "NakshIQ Membership — waitlist",
    description: "Early-access waitlist for the ₹999/year NakshIQ Membership tier launching in 2026.",
    price: "999",
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
    url: pageUrl,
    seller: { "@id": `${BASE_URL}#organization` },
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLd) }} />
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
            MEMBERSHIP · WAITLIST · LAUNCH 2026
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
            NakshIQ Membership.
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
            Ad-free, sponsor-free. Built by the editors who write the destinations, for the people who
            actually travel.
          </p>

          {/* Price callout */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 14,
              marginTop: 24,
              padding: "12px 20px",
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: 0,
              }}
            >
              Launch
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: 1,
                color: "var(--bone)",
                margin: 0,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ₹999<span style={{ fontFamily: "var(--cinema-mono)", fontSize: 12, color: "var(--bone-faint)", letterSpacing: "0.14em", textTransform: "uppercase", marginLeft: 6 }}>/year</span>
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              · no card, no commitment
            </p>
          </div>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* What Members get */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              What Members get.
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ padding: 20, background: "var(--paper)" }}>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--vermillion)",
                      margin: "0 0 8px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 18,
                      lineHeight: 1.25,
                      color: "var(--bone)",
                      margin: "0 0 8px",
                    }}
                  >
                    {b.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Join the waitlist */}
          <section
            id="join"
            style={{
              marginBottom: 48,
              padding: 32,
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
                margin: "0 0 12px",
              }}
            >
              Join the waitlist
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(22px, 3vw, 28px)",
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 20px",
              }}
            >
              Be first in line when Membership opens.
            </p>
            <MembershipForm locale={locale} />
          </section>

          {/* What we won't do */}
          <section
            style={{
              marginBottom: 48,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "var(--paper)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 16px",
              }}
            >
              What we won&apos;t do.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {WONT_DO.map((line, i) => (
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
                  <span style={{ flexShrink: 0, color: "var(--vermillion)" }}>—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 12,
                lineHeight: 1.7,
                color: "var(--bone-faint)",
                margin: "16px 0 0",
              }}
            >
              Read the full{" "}
              <Link
                href={`/${locale}/editorial-policy`}
                style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                editorial policy
              </Link>{" "}
              — including how we handle corrections and why there are no sponsored posts.
            </p>
          </section>

          {/* When launching */}
          <section>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              When does Membership launch?
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              In 2026, once the Cost Index, NakshIQ 100, and the first newsletter cadence are running at
              scale. Waitlist signups get first access + locked-in launch pricing.
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
