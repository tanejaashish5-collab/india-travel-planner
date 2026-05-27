import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { formatScoreInline } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { MagazineCardOrGrid } from "@/components/magazine-card-grid";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Family-Friendly Destinations in ${stateName} — Kids Ratings`,
    description: `Every family-friendly destination in ${stateName} with kids ratings, age suitability, medical access, altitude warnings, and honest assessments. Written by parents.`,
    ...localeAlternates(locale, `/family/${stateSlug}`),
  };
}

type KidsInfo = {
  suitable?: boolean | null;
  rating?: number | null;
  min_age?: number | null;
  reasons?: string[] | null;
};

type DestRow = {
  id: string;
  name: string;
  tagline?: string | null;
  difficulty?: string | null;
  elevation_m?: number | null;
  kids_friendly?: KidsInfo[] | KidsInfo | null;
};

export default async function FamilyByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, state:states(name), kids_friendly(suitable, rating, min_age, reasons)")
    .eq("state_id", stateSlug)
    .order("name");

  const familyDests: DestRow[] = (destinations ?? [])
    .filter((d: DestRow) => {
      const arr = Array.isArray(d.kids_friendly) ? d.kids_friendly : (d.kids_friendly ? [d.kids_friendly] : []);
      return arr.some((k) => k.suitable);
    })
    .sort((a: DestRow, b: DestRow) => {
      const aArr = Array.isArray(a.kids_friendly) ? a.kids_friendly : (a.kids_friendly ? [a.kids_friendly] : []);
      const bArr = Array.isArray(b.kids_friendly) ? b.kids_friendly : (b.kids_friendly ? [b.kids_friendly] : []);
      const aRating = aArr[0]?.rating ?? 0;
      const bRating = bArr[0]?.rating ?? 0;
      return bRating - aRating;
    });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: stateName, item: `https://www.nakshiq.com/${locale}/state/${stateSlug}` },
      { "@type": "ListItem", position: 3, name: "Family", item: `https://www.nakshiq.com/${locale}/family/${stateSlug}` },
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
            FAMILY TRAVEL · {stateName.toUpperCase()} · {String(familyDests.length).padStart(3, "0")}
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
            {stateName} with kids.
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
            {familyDests.length} kid-friendly destinations — rated for age
            suitability, medical access, and safety. Written by parents.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {familyDests.length > 0 ? (
            <MagazineCardOrGrid
              items={familyDests}
              minCardWidth={280}
              gap={1}
              renderCard={(d: DestRow) => {
                const arr = Array.isArray(d.kids_friendly) ? d.kids_friendly : (d.kids_friendly ? [d.kids_friendly] : []);
                const kids = arr[0];
                const rating = kids?.rating ?? 0;
                return (
                  <Link
                    href={`/${locale}/with-kids/${d.id}`}
                    style={{
                      display: "block",
                      background: "var(--paper)",
                      textDecoration: "none",
                      color: "var(--bone)",
                      height: "100%",
                    }}
                  >
                    <div style={{ position: "relative", height: 160, background: "var(--paper-2)" }}>
                      <Image
                        src={`/images/destinations/${d.id}.jpg`}
                        alt={d.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(10, 10, 8, 0.7)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid var(--vermillion)",
                          color: "var(--vermillion)",
                          padding: "4px 10px",
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Kids {formatScoreInline(rating)}
                      </div>
                    </div>
                    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
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
                        {d.name}
                      </h3>
                      {d.tagline && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: "var(--bone-dim)",
                            margin: 0,
                          }}
                        >
                          {d.tagline}
                        </p>
                      )}
                      {kids?.min_age && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 10,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--bone-faint)",
                            margin: "4px 0 0",
                          }}
                        >
                          Suitable for ages {kids.min_age}+
                        </p>
                      )}
                      {kids?.reasons?.[0] && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 12,
                            lineHeight: 1.45,
                            color: "var(--bone-dim)",
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {kids.reasons[0]}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              }}
              renderGutter={(d: DestRow) => {
                const arr = Array.isArray(d.kids_friendly) ? d.kids_friendly : (d.kids_friendly ? [d.kids_friendly] : []);
                const kids = arr[0];
                return (
                  <>
                    <p
                      className="nq-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--vermillion)",
                        margin: "0 0 12px",
                      }}
                    >
                      {stateName.toUpperCase()} · FAMILY · ONE PICK
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: 22,
                        lineHeight: 1.25,
                        color: "var(--bone)",
                        margin: "0 0 16px",
                        textWrap: "balance",
                      }}
                    >
                      Only one kid-friendly stop here — but it earns it.
                    </p>
                    {kids?.reasons?.[0] && (
                      <p
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 13,
                          lineHeight: 1.55,
                          color: "var(--bone-dim)",
                          margin: "0 0 16px",
                        }}
                      >
                        {kids.reasons[0]}
                      </p>
                    )}
                    <Link
                      href={`/${locale}/with-kids/${d.id}`}
                      className="nq-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--vermillion)",
                        textDecoration: "none",
                      }}
                    >
                      Open {d.name} →
                    </Link>
                  </>
                );
              }}
            />
          ) : (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "var(--cinema-ui)",
                color: "var(--bone-dim)",
              }}
            >
              <p>No family-rated destinations in {stateName} yet.</p>
              <Link
                href={`/${locale}/explore/state/${stateSlug}`}
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                View all {stateName} destinations →
              </Link>
            </div>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
