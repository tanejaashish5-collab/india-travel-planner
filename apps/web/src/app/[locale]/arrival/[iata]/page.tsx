import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARRIVAL, IATA_SLUGS } from "@/lib/arrival-data";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["en", "hi"];
  return IATA_SLUGS.flatMap((iata) => locales.map((locale) => ({ locale, iata })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; iata: string }>;
}): Promise<Metadata> {
  const { locale, iata } = await params;
  const info = ARRIVAL[iata];
  if (!info) return {};
  return {
    title: `Arriving at ${info.iata} (${info.city}) — Prepaid Taxi, SIM, ATM, Scams | NakshIQ`,
    description: `Step-by-step arrival guide for ${info.name}, ${info.city}. Prepaid taxi counter, Uber zone, SIM activation, ATM guidance, and the one scam to watch for. Updated 2026.`,
    ...localeAlternates(locale, `/arrival/${iata}`),
  };
}

const SECTIONS: Array<{ key: keyof typeof ARRIVAL.del; label: string }> = [
  { key: "arrivalHall", label: "Arrival hall" },
  { key: "prepaidTaxi", label: "Prepaid taxi counter" },
  { key: "appCab", label: "Uber / Ola pickup" },
  { key: "publicTransport", label: "Metro / rail / bus" },
  { key: "simCounters", label: "SIM activation" },
  { key: "atmNotes", label: "ATM / forex" },
  { key: "scamWarning", label: "The scam to watch for" },
  { key: "afterMidnight", label: "After midnight" },
];

export default async function ArrivalPage({
  params,
}: {
  params: Promise<{ locale: string; iata: string }>;
}) {
  const { locale, iata } = await params;
  const info = ARRIVAL[iata];
  if (!info) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Arrival", item: `https://www.nakshiq.com/${locale}/arrival` },
      { "@type": "ListItem", position: 3, name: info.city, item: `https://www.nakshiq.com/${locale}/arrival/${iata}` },
    ],
  };

  const reviewedLabel = new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase();

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
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            ARRIVAL PLAYBOOK · {info.iata} · {info.state.toUpperCase()} · REVIEWED {reviewedLabel}
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
            Arriving at {info.city}.
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
            {info.name}. Here is what happens in the 30 minutes between you
            clearing immigration and being in the city — counters, fares, the
            one scam to avoid, and what to do if you land at 2am.
          </p>
          <a
            href={info.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 16,
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--vermillion)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Official airport site →
          </a>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {SECTIONS.map((s) => {
              const isScam = s.key === "scamWarning";
              return (
                <section key={s.key}>
                  <h2
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 26,
                      lineHeight: 1.15,
                      color: isScam ? "var(--vermillion)" : "var(--bone)",
                      margin: "0 0 12px",
                    }}
                  >
                    {s.label}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {info[s.key]}
                  </p>
                </section>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 48,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <h2
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
              Other airports
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {IATA_SLUGS.filter((s) => s !== iata).map((s) => (
                <Link
                  key={s}
                  href={`/${locale}/arrival/${s}`}
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: "1px solid var(--hair)",
                    color: "var(--bone-dim)",
                    textDecoration: "none",
                  }}
                >
                  {ARRIVAL[s].iata} · {ARRIVAL[s].city}
                </Link>
              ))}
            </div>
            <div
              style={{
                paddingTop: 16,
                borderTop: "1px solid var(--hair)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Link
                href={`/${locale}/guide/permits`}
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                India permits — ILP, PAP, RAP state by state →
              </Link>
              <Link
                href={`/${locale}/guide/book-indian-trains`}
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                How to book Indian trains as a foreigner →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
