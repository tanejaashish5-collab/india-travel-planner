import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Cost Index methodology — NakshIQ",
    description:
      "How NakshIQ derives the 2026 India Travel Cost Index — base rates, region multipliers, season classification, destination overrides, and update cadence.",
    ...localeAlternates(locale, "/cost-index/methodology"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

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
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}/cost-index`} className="hover:text-foreground">Cost Index</Link>
          {" → "}
          <span className="text-foreground">Methodology</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Cost Index methodology</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Every number in the NakshIQ India Travel Cost Index is derived, not guessed.
          Here's how the model works, where the baselines come from, and what the
          data does and doesn't claim.
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3">What the dataset covers</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-3">
              The Cost Index publishes representative 2026 INR price points for nine travel-spend
              categories across all 488 NakshIQ-covered destinations. Each row is a{" "}
              <code className="font-mono text-xs">(destination, category, season)</code> triple with
              a median, a low-end (budget), and a high-end (splurge) figure, plus the unit
              ({" "}<code className="font-mono text-xs">per_night</code>,
              {" "}<code className="font-mono text-xs">per_day</code>,
              {" "}<code className="font-mono text-xs">per_unit</code>, or
              {" "}<code className="font-mono text-xs">one_time</code>).
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Categories: homestay, hostel dorm, hotel (3★ mid-range), hotel (4–5★ splurge),
              food (3 meals), taxi (8-hour day hire), intercity transport (per leg), permits
              &amp; entry, activity / entry fee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">The model</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-3">
              Each row is computed as <code className="font-mono text-xs">base × state × altitude × difficulty × budget_tier × season</code>:
            </p>

            <h3 className="text-base font-semibold mt-6 mb-2">1. Base rates</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-2">
              Nine category baselines calibrated against observed 2026 market prices across
              a generic mid-tier Indian destination in shoulder season. These are the
              starting points before any multiplier is applied.
            </p>
            <ul className="text-sm leading-relaxed text-muted-foreground space-y-1 pl-5 list-disc">
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

            <h3 className="text-base font-semibold mt-6 mb-2">2. State multiplier</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-2">
              Each of the 36 states/UTs has a multiplier reflecting observed market premium:
            </p>
            <ul className="text-sm leading-relaxed text-muted-foreground space-y-1 pl-5 list-disc">
              <li>Lakshadweep ×1.65 · Andaman &amp; Nicobar ×1.50 · Ladakh ×1.40</li>
              <li>Arunachal Pradesh ×1.30 · Goa ×1.30 · Delhi ×1.25 · Sikkim ×1.20</li>
              <li>Karnataka / Tamil Nadu / Maharashtra / Kerala: ×0.95–1.10</li>
              <li>Odisha / Bihar / Chhattisgarh ×0.85 (lower market premium)</li>
            </ul>

            <h3 className="text-base font-semibold mt-6 mb-2">3. Altitude multiplier</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Destinations above 3,500m get +20% (remote logistics, short season).
              Destinations 2,000–3,500m get +10%. Below 2,000m is baseline.
            </p>

            <h3 className="text-base font-semibold mt-6 mb-2">4. Difficulty multiplier</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Extreme-difficulty destinations get +20%, hard-difficulty +15%. Reflects
              expedition-grade logistics, specialised operators, and gear requirements.
            </p>

            <h3 className="text-base font-semibold mt-6 mb-2">5. Budget-tier multiplier</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The destination's overall budget-tier (1–4) scales the whole row: 0.75× for
              tier-1 budget destinations, 1.00× for tier-2 mid, 1.25× for tier-3 premium,
              1.60× for tier-4 luxury.
            </p>

            <h3 className="text-base font-semibold mt-6 mb-2">6. Season multiplier</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-2">
              Each destination's <code className="font-mono text-xs">best_months</code> array classifies each month as:
            </p>
            <ul className="text-sm leading-relaxed text-muted-foreground space-y-1 pl-5 list-disc">
              <li><strong>Peak</strong> — in best_months window · default ×1.45</li>
              <li><strong>Shoulder</strong> — adjacent to best_months · ×1.00</li>
              <li><strong>Low</strong> — outside both · ×0.65 (reflects off-season discounting or closures)</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">
              Some destinations carry a peak override — Goa's NYE window (×1.80), Rann
              Utsav (×1.55), Hornbill Festival Kohima (×1.55), Leh summer peak (×1.55),
              Pushkar Mela (×1.60).
            </p>

            <h3 className="text-base font-semibold mt-6 mb-2">7. Destination-specific overrides</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some destinations carry category-specific overrides that sidestep the
              base-rate model — for example, Pangong Lake taxi day-hire is fixed at
              ₹5,500 because the Leh-Pangong-Leh circuit is a known flat rate, not a
              derivation. National-park safari fees (Corbett, Kaziranga, Kanha, Bandhavgarh)
              override the activity-sample category. Permit fees for Arunachal restricted
              zones and Hanle / Umling La are explicit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Data provenance</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-3">
              Baselines trace to:
            </p>
            <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 pl-5 list-disc">
              <li>State-tourism-department tariff circulars (Himachal, Uttarakhand, Rajasthan, Kerala, Gujarat, and all permit-issuing states)</li>
              <li>IHM and IATO hospitality-average benchmarks for mid-range and 3★ hotel pricing</li>
              <li>NHAI and state-transport-authority taxi rate circulars (published fare charts)</li>
              <li>NakshIQ editorial field surveys (2026 Q2) for homestay and hostel-dorm typical rates</li>
              <li>Published park-entry fees from Project Tiger and state forest departments</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground mt-4">
              Every row in the dataset carries a <code className="font-mono text-xs">source_ref</code> tag.
              The current corpus tag is <code className="font-mono text-xs">editorial_model_2026_Q2</code>.
              Rows refreshed against new source data get a newer tag and are timestamped via
              <code className="font-mono text-xs"> reviewed_at</code>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Update cadence</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-3">
              Quarterly refresh. The base rates, state multipliers, and destination
              overrides are re-evaluated against observed market data each quarter. When
              a category drifts by more than ±10% against the published baseline,
              affected rows are re-derived and the <code className="font-mono text-xs">reviewed_at</code> stamp is updated.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Major events (annual Pushkar Mela date announcement, Rann Utsav calendar,
              Kerala tourism-board tariff revision) trigger a mid-quarter refresh of
              the specific destinations affected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What this data doesn't claim</h2>
            <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 pl-5 list-disc">
              <li>
                Every specific property will not match these numbers. A 5★ Marriott
                costs more than our hotel-splurge figure suggests; a roadside dhaba
                costs less than our food-per-day figure. The dataset is a <em>median
                signal</em>, not a quote.
              </li>
              <li>
                Seasonal spikes outside the model (election-year weddings, regional
                strikes, peak-season fuel surcharges) are not captured.
              </li>
              <li>
                Flight pricing is not in scope. Use IndiGo/Vistara fare search directly —
                dynamic pricing makes static figures misleading.
              </li>
              <li>
                Currency: all figures are Indian Rupees (INR). USD/EUR conversions
                depend on live rates and are not part of the dataset.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card/40 p-6">
            <h2 className="text-xl font-semibold mb-2">Citing the Cost Index</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-3">
              When citing these figures in articles, AI answer summaries, or research:
            </p>
            <p className="text-sm font-mono bg-background/40 rounded-xl p-4 leading-relaxed">
              NakshIQ India Travel Cost Index 2026. Retrieved from
              <br />
              nakshiq.com/en/cost-index
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">
              Row-level provenance is available via the <code className="font-mono text-xs">source_ref</code>
              {" "}and <code className="font-mono text-xs">reviewed_at</code> fields. For bulk citation
              or derivative publishing, contact <Link href={`/${locale}/contact`} className="underline hover:text-primary">editor@nakshiq.com</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
