import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Cost Index methodology",
    description:
      "How NakshIQ derives the 2026 India Travel Cost Index — base rates, region multipliers, season classification, destination overrides, and update cadence.",
    ...localeAlternates(locale, "/cost-index/methodology"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

const prose: React.CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  margin: "0 0 12px",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 28,
  lineHeight: 1.15,
  color: "var(--bone)",
  margin: "0 0 14px",
};

const h3Style: React.CSSProperties = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 19,
  lineHeight: 1.2,
  color: "var(--bone)",
  margin: "20px 0 8px",
};

const codeStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-mono)",
  fontSize: 13,
  color: "var(--bone)",
  background: "rgba(245, 241, 232, 0.05)",
  padding: "1px 6px",
};

const ulStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  paddingLeft: 24,
  margin: "0 0 12px",
};

export default async function CostIndexMethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${BASE_URL}/${locale}/cost-index/methodology`;

  const techArticleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#article`,
    headline: "NakshIQ India Travel Cost Index — methodology",
    description:
      "How the 2026 NakshIQ Cost Index is computed: base rates, region/altitude/season multipliers, destination-specific overrides, data provenance, and update cadence.",
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${BASE_URL}/${locale}/cost-index#dataset` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Cost Index", item: `${BASE_URL}/${locale}/cost-index` },
      { "@type": "ListItem", position: 3, name: "Methodology", item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 760, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            COST INDEX · METHODOLOGY
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
            Cost Index methodology.
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
            Every row in the NakshIQ India Travel Cost Index is either read off
            real listing prices or modelled from them, and each row says which.
            Here&apos;s how the model works, what has been checked so far, and
            what the data does and doesn&apos;t claim.
          </p>
        </header>

        <article style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <section>
            <h2 style={h2Style}>What the dataset covers</h2>
            <p style={prose}>
              The Cost Index publishes representative 2026 INR price points for nine travel-spend
              categories across all 525 NakshIQ-covered destinations. Each row is a{" "}
              <code style={codeStyle}>(destination, category, season)</code> triple with a median,
              a low-end (budget), and a high-end (splurge) figure, plus the unit{" "}
              (<code style={codeStyle}>per_night</code>,{" "}
              <code style={codeStyle}>per_day</code>,{" "}
              <code style={codeStyle}>per_unit</code>, or{" "}
              <code style={codeStyle}>one_time</code>).
            </p>
            <p style={prose}>
              Categories: homestay, hostel dorm, hotel (3★ mid-range), hotel (4–5★ splurge),
              food (3 meals), taxi (8-hour day hire), intercity transport (per leg), permits
              &amp; entry, activity / entry fee.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>What is observed and what is modelled</h2>
            <p style={prose}>
              The first version of this index was a formula with no per-place observations. In
              October 2026 we checked it against real listing prices in 33 destinations. The
              shoulder-season 3★ and homestay figures ran about 10–15% high after tax, the peak
              multiplier was slightly high, and individual places were off by as much as
              1.5–2.5×. Hotel rows also existed for places with no lodging at all.
            </p>
            <p style={prose}>
              Since then each row carries one of three tags in{" "}
              <code style={codeStyle}>source_ref</code>:
            </p>
            <ul style={ulStyle}>
              <li>
                <code style={codeStyle}>observed_listings_2026_10</code>: the median of listed
                prices for that place (Cleartrip, Kayak, Booking.com, Hostelworld and operator
                sites, fetched 8 October 2026), with an estimated 12% GST added. Peak is the
                shoulder price × 1.35, measured on the same hotels in five cities (late December
                against late October to mid November).
              </li>
              <li>
                <code style={codeStyle}>calibrated_model_2026_10</code>: modelled, with the stay
                baselines scaled to match the observed places. Not an observation of that
                place.
              </li>
              <li>
                <code style={codeStyle}>editorial_model_2026_Q2</code>: the original formula.
                Taxi, food, intercity, permit and activity rows are still here and have not yet
                been checked against observed prices.
              </li>
            </ul>
            <p style={prose}>
              We are replacing modelled rows with observed ones place by place, region by region,
              starting with North India. Low-season and May–June hill-station prices have not been
              measured and still follow the model.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>The model</h2>
            <p style={prose}>
              Each modelled row is computed as{" "}
              <code style={codeStyle}>base × state × altitude × difficulty × budget_tier × season</code>.
            </p>

            <h3 style={h3Style}>1. Base rates</h3>
            <p style={prose}>
              Nine category baselines for a generic mid-tier Indian destination in shoulder
              season, as originally set. The stay baselines have since been scaled down about 8–12%
              against observed listings (see above); the others are unchanged and unchecked.
            </p>
            <ul style={ulStyle}>
              <li>Homestay (per night): typical ₹2,200 · budget ₹1,000 · splurge ₹4,500</li>
              <li>Hotel mid (3★, per night): typical ₹3,800 · budget ₹2,200 · splurge ₹6,500</li>
              <li>Hotel splurge (4–5★, per night): typical ₹12,000 · budget ₹7,000 · splurge ₹30,000</li>
              <li>Hostel dorm bed (per night): typical ₹650 · budget ₹400 · splurge ₹1,100</li>
              <li>Food (per day, 3 meals): typical ₹800 · budget ₹400 · splurge ₹1,800</li>
              <li>Taxi (8-hour day hire): typical ₹3,000 · budget ₹1,800 · splurge ₹5,500</li>
              <li>Intercity transport (per leg): typical ₹1,400 · budget ₹600 · splurge ₹3,500</li>
              <li>Permits &amp; entry (one time): typical ₹400 · low ₹100 · high ₹1,800</li>
              <li>Activity / entry fee (per unit): typical ₹1,500 · budget ₹400 · splurge ₹4,500</li>
            </ul>

            <h3 style={h3Style}>2. State multiplier</h3>
            <p style={prose}>Each of the 36 states/UTs has a multiplier reflecting observed market premium:</p>
            <ul style={ulStyle}>
              <li>Lakshadweep ×1.65 · Andaman &amp; Nicobar ×1.50 · Ladakh ×1.40</li>
              <li>Arunachal Pradesh ×1.30 · Goa ×1.30 · Delhi ×1.25 · Sikkim ×1.20</li>
              <li>Karnataka / Tamil Nadu / Maharashtra / Kerala: ×0.95–1.10</li>
              <li>Odisha / Bihar / Chhattisgarh ×0.85 (lower market premium)</li>
            </ul>

            <h3 style={h3Style}>3. Altitude multiplier</h3>
            <p style={prose}>
              Destinations above 3,500m get +20% (remote logistics, short season). Destinations
              2,000–3,500m get +10%. Below 2,000m is baseline.
            </p>

            <h3 style={h3Style}>4. Difficulty multiplier</h3>
            <p style={prose}>
              Extreme-difficulty destinations get +20%, hard-difficulty +15%. Reflects
              expedition-grade logistics, specialised operators, and gear requirements.
            </p>

            <h3 style={h3Style}>5. Budget-tier multiplier</h3>
            <p style={prose}>
              The destination&apos;s overall budget-tier (1–4) scales the whole row: 0.75× for
              tier-1 budget destinations, 1.00× for tier-2 mid, 1.25× for tier-3 premium,
              1.60× for tier-4 luxury.
            </p>

            <h3 style={h3Style}>6. Season multiplier</h3>
            <p style={prose}>
              Each destination&apos;s <code style={codeStyle}>best_months</code> array classifies
              each month as:
            </p>
            <ul style={ulStyle}>
              <li><strong style={{ color: "var(--bone)" }}>Peak</strong> — in best_months window · default ×1.45</li>
              <li><strong style={{ color: "var(--bone)" }}>Shoulder</strong> — adjacent to best_months · ×1.00</li>
              <li><strong style={{ color: "var(--bone)" }}>Low</strong> — outside both · ×0.65 (off-season discounting or closures)</li>
            </ul>
            <p style={prose}>
              Some destinations carry a peak override — Goa&apos;s NYE window (×1.80), Rann Utsav
              (×1.55), Hornbill Festival Kohima (×1.55), Leh summer peak (×1.55), Pushkar Mela
              (×1.60).
            </p>

            <h3 style={h3Style}>7. Destination-specific overrides</h3>
            <p style={prose}>
              Some destinations carry category-specific overrides that sidestep the base-rate
              model — for example, Pangong Lake taxi day-hire is fixed at ₹5,500 because the
              Leh-Pangong-Leh circuit is a known flat rate, not a derivation. National-park
              safari fees (Corbett, Kaziranga, Kanha, Bandhavgarh) override the
              activity-sample category. Permit fees for Arunachal restricted zones and Hanle /
              Umling La are explicit.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Data provenance</h2>
            <p style={prose}>Observed rows come from:</p>
            <ul style={ulStyle}>
              <li>Hotel, homestay and hostel listing pages: Cleartrip, Kayak, Booking.com, Hostelworld</li>
              <li>Operator and state-tourism tariff pages where they exist (for example JKTDC, GMVN, HPTDC, camp and homestay operators)</li>
              <li>Taxi-union and operator rate lists and restaurant menus, for the taxi and food rows as they are researched</li>
            </ul>
            <p style={prose}>
              The listing sites show discounted single-night prices and mixed tax treatment, so
              observed figures are medians of several listings, not quotes for any one property.
              Every row carries a <code style={codeStyle}>source_ref</code> tag and a note saying
              how it was produced, and <code style={codeStyle}>recorded_at</code> shows when it was
              last written.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>Update cadence</h2>
            <p style={prose}>
              Rows are re-checked against observed listings region by region, starting with North
              India in October 2026. When a place is re-checked its rows are rewritten and the
              source tag and <code style={codeStyle}>recorded_at</code> stamp change with them.
              There is no fixed quarterly schedule yet.
            </p>
            <p style={prose}>
              Major events (annual Pushkar Mela date announcement, Rann Utsav calendar, Kerala
              tourism-board tariff revision) trigger a mid-quarter refresh of the specific
              destinations affected.
            </p>
          </section>

          <section>
            <h2 style={h2Style}>What this data doesn&apos;t claim</h2>
            <ul style={ulStyle}>
              <li>
                Every specific property will not match these numbers. A 5★ Marriott costs more
                than our hotel-splurge figure suggests; a roadside dhaba costs less than our
                food-per-day figure. The dataset is a <em>median signal</em>, not a quote.
              </li>
              <li>
                Seasonal spikes outside the model (election-year weddings, regional strikes,
                peak-season fuel surcharges) are not captured.
              </li>
              <li>
                Flight pricing is not in scope. Use IndiGo/Vistara fare search directly —
                dynamic pricing makes static figures misleading.
              </li>
              <li>
                Currency: all figures are Indian Rupees (INR). USD/EUR conversions depend on
                live rates and are not part of the dataset.
              </li>
            </ul>
          </section>

          <section
            style={{
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <h2 style={h2Style}>Citing the Cost Index</h2>
            <p style={prose}>When citing these figures in articles, AI answer summaries, or research:</p>
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 13,
                color: "var(--bone)",
                background: "rgba(245, 241, 232, 0.05)",
                padding: 16,
                margin: "0 0 12px",
                lineHeight: 1.6,
              }}
            >
              NakshIQ India Travel Cost Index 2026. Retrieved from
              <br />
              nakshiq.com/en/cost-index
            </p>
            <p style={prose}>
              Row-level provenance is available via the{" "}
              <code style={codeStyle}>source_ref</code> and{" "}
              <code style={codeStyle}>reviewed_at</code> fields. For bulk citation or
              derivative publishing, contact{" "}
              <Link
                href={`/${locale}/contact`}
                style={{
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                editor@nakshiq.com
              </Link>
              .
            </p>
          </section>
        </article>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
