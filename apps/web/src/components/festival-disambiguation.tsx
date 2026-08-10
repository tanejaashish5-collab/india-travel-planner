import Link from "next/link";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";

// Served for a BARE festival slug that no longer resolves to one festival,
// because 2+ destinations host a festival of the same name (see
// lib/festival-slug.ts). Without this the URL 404s the moment a duplicate row
// lands — which is what grew the GSC "Not found (404)" bucket. A generic query
// ("ganesh chaturthi") wants the overview anyway, so this answers it and links
// out to every real variant.

export type FestivalVariant = {
  slug: string;
  name: string;
  destinationName: string | null;
  stateName: string | null;
  monthLabel: string | null;
  approximateDate: string | null;
  description: string | null;
};

export function FestivalDisambiguation({
  locale,
  name,
  variants,
  copy,
}: {
  locale: string;
  name: string;
  variants: FestivalVariant[];
  copy: { eyebrow: string; title: string; intro: string; heading: string };
}) {
  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
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
            {copy.eyebrow.toUpperCase()}
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
            {copy.title}
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
            {copy.intro}
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bone-dim)",
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid var(--hair)",
            }}
          >
            {copy.heading}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
            }}
          >
            {variants.map((v) => (
              <div
                key={v.slug}
                style={{
                  padding: 20,
                  background: "var(--paper)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: 1.2,
                    color: "var(--bone)",
                    margin: 0,
                  }}
                >
                  <Link
                    href={`/${locale}/festivals/${v.slug}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {v.destinationName ?? v.name}
                  </Link>
                </h3>
                {(v.destinationName || v.stateName) && (
                  <div
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                    }}
                  >
                    {v.destinationName}
                    {v.stateName && ` · ${v.stateName}`}
                  </div>
                )}
                {v.description && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--bone-dim)",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {v.description}
                  </p>
                )}
                {(v.approximateDate || v.monthLabel) && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "var(--vermillion)",
                      margin: 0,
                    }}
                  >
                    {v.approximateDate ?? v.monthLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
