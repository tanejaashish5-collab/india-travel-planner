import Link from "next/link";
import { Title } from "./landing-cinema/editorial";
import type { LuxuryRow } from "@/lib/luxury-schema";

const MONTH_LONG = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type Labels = {
  kicker: string;
  category_train: string;
  category_stay: string;
  category_itinerary: string;
  tier_luxury: string;
  tier_ultra_luxury: string;
  tier_iconic: string;
  whyIconic: string;
  signatureExperience: string;
  routeLegs: string;
  included: string;
  priceBand: string;
  duration: string;
  bestMonths: string;
  bookViaOperator: string;
  verifiedSources: string;
  viewHostDestination: string;
  disclaimer: string;
};

type Props = {
  row: LuxuryRow;
  locale: string;
  primaryDestName: string | null;
  labels: Labels;
};

const SECTION_HEADING: React.CSSProperties = {
  fontFamily: "var(--cinema-mono)",
  fontSize: 12,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--bone-dim)",
  marginBottom: 20,
  paddingBottom: 16,
  borderBottom: "1px solid var(--hair)",
};

const SECTION_WRAP: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto 56px",
};

function pickLocalized(row: LuxuryRow, locale: string, field: "name" | "tagline" | "editorial" | "signature_experience"): string | null {
  if (locale === "hi") {
    const hi = row.translations?.hi?.[field];
    if (hi) return hi;
  }
  return (row as unknown as Record<string, string | null>)[field] ?? null;
}

export function LuxuryDetail({ row, locale, primaryDestName, labels }: Props) {
  const name = pickLocalized(row, locale, "name") || row.name;
  const tagline = pickLocalized(row, locale, "tagline");
  const editorial = pickLocalized(row, locale, "editorial");
  const signature = pickLocalized(row, locale, "signature_experience");

  const categoryLabel = labels[`category_${row.category}` as keyof Labels];
  const tierLabel = labels[`tier_${row.tier}` as keyof Labels];

  return (
    <>
      <header style={{ maxWidth: 980, margin: "0 auto 48px" }}>
        <p className="nq-kicker" style={{ color: "var(--vermillion)", marginBottom: 20, letterSpacing: "0.22em" }}>
          {labels.kicker} · {categoryLabel} · {tierLabel}
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
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {name}
        </Title>
        {tagline && (
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.55, color: "var(--bone-dim)", maxWidth: 720 }}>
            {tagline}
          </p>
        )}
        {row.operator && (
          <p style={{ marginTop: 16, fontFamily: "var(--cinema-mono)", fontSize: 12, color: "var(--bone-dim)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {row.operator}
          </p>
        )}
      </header>

      {/* Quick facts row */}
      <section style={SECTION_WRAP}>
        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, margin: 0 }}>
          {row.price_band_inr && (
            <Fact label={labels.priceBand} value={row.price_band_inr} />
          )}
          {row.duration && (
            <Fact label={labels.duration} value={row.duration} />
          )}
          {row.best_months && row.best_months.length > 0 && (
            <Fact
              label={labels.bestMonths}
              value={row.best_months.map((m) => MONTH_LONG[m]?.slice(0, 3)).filter(Boolean).join(", ")}
            />
          )}
          {primaryDestName && row.primary_destination_id && (
            <div>
              <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 11, color: "var(--bone-dim)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}>
                {labels.viewHostDestination}
              </dt>
              <dd style={{ margin: 0, fontSize: 16 }}>
                <Link href={`/${locale}/destination/${row.primary_destination_id}`} style={{ color: "var(--ink)", borderBottom: "1px solid var(--hair)" }}>
                  {primaryDestName} →
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Editorial */}
      {editorial && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.whyIconic}</h2>
          <div style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink)", whiteSpace: "pre-wrap" }}>
            {editorial}
          </div>
        </section>
      )}

      {/* Signature experience */}
      {signature && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.signatureExperience}</h2>
          <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.4, color: "var(--ink)", margin: 0 }}>
            {signature}
          </p>
        </section>
      )}

      {/* Route legs (trains + itineraries) */}
      {row.route_legs && row.route_legs.length > 0 && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.routeLegs}</h2>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 18 }}>
            {row.route_legs.map((leg, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, paddingTop: 18, borderTop: "1px solid var(--hair)" }}>
                <div style={{ fontFamily: "var(--cinema-mono)", fontSize: 12, color: "var(--bone-dim)", letterSpacing: "0.16em" }}>
                  D{String(leg.day ?? i + 1).padStart(2, "0")}
                </div>
                <div>
                  {leg.city && (
                    <div style={{ fontFamily: "var(--cinema-display)", fontSize: 20, fontStyle: "italic", marginBottom: 6 }}>{leg.city}</div>
                  )}
                  {leg.highlight && (
                    <div style={{ fontSize: 15, lineHeight: 1.55, color: "var(--bone-dim)" }}>{leg.highlight}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Included */}
      {row.included && row.included.length > 0 && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.included}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {row.included.map((item, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink)", paddingLeft: 18, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "var(--vermillion)" }}>·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Booking */}
      {(row.official_url || row.booking_links?.official) && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.bookViaOperator}</h2>
          <a
            href={row.booking_links?.official ?? row.official_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "var(--ink)",
              color: "var(--paper)",
              fontSize: 15,
              textDecoration: "none",
              fontFamily: "var(--cinema-sans)",
            }}
          >
            {row.operator ? `${row.operator} →` : "Book →"}
          </a>
          <p style={{ marginTop: 16, fontSize: 12, color: "var(--bone-dim)", maxWidth: 640 }}>
            {labels.disclaimer}
          </p>
        </section>
      )}

      {/* Sources */}
      {row.sources && row.sources.length > 0 && (
        <section style={SECTION_WRAP}>
          <h2 style={SECTION_HEADING}>{labels.verifiedSources}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {row.sources.map((s, i) => (
              <li key={i} style={{ fontSize: 14 }}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", borderBottom: "1px solid var(--hair)" }}>
                    {s.label || s.url}
                  </a>
                ) : (
                  <span>{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 11, color: "var(--bone-dim)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}>{value}</dd>
    </div>
  );
}
