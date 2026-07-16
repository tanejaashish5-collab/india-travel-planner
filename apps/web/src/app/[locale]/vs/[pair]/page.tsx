import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { VsComparison } from "@/components/vs-comparison";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { VS_PAIRS } from "@/lib/vs-pairs";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 2592000; // 30d — comparison content is static; on-demand revalidate for rare edits. Was 24h.
export const dynamicParams = true;

const SITE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  const locales = ["en", "hi"];
  return VS_PAIRS.flatMap((p) =>
    locales.map((locale) => ({ locale, pair: `${p.id1}-vs-${p.id2}` }))
  );
}

function resolveState(state: unknown): string | null {
  if (!state) return null;
  if (Array.isArray(state)) return (state[0] as { name?: string })?.name ?? null;
  return (state as { name?: string }).name ?? null;
}

// Display name in the active locale — Hindi pages read translations.hi.name,
// falling back to the English name when a Hindi name is missing.
function localizedName(d: { name?: string; translations?: unknown }, locale: string): string {
  const fallback = d.name ?? "";
  if (locale !== "hi") return fallback;
  const hi = (d.translations as { hi?: { name?: string } } | null | undefined)?.hi?.name;
  return hi || fallback;
}

async function getVsData(id1: string, id2: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const [res1, res2] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, translations, tagline, difficulty, elevation_m, budget_tier, best_months, daily_cost, family_stress, tags,
        state:states(name),
        destination_months(month, score, note, verdict),
        kids_friendly(suitable, rating),
        confidence_cards(safety_rating, network)
      `)
      .eq("id", id1)
      .single(),
    supabase
      .from("destinations")
      .select(`
        id, name, translations, tagline, difficulty, elevation_m, budget_tier, best_months, daily_cost, family_stress, tags,
        state:states(name),
        destination_months(month, score, note, verdict),
        kids_friendly(suitable, rating),
        confidence_cards(safety_rating, network)
      `)
      .eq("id", id2)
      .single(),
  ]);

  if (!res1.data || !res2.data) return null;

  return { dest1: res1.data, dest2: res2.data };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string; locale: string }>;
}): Promise<Metadata> {
  const { pair, locale } = await params;
  const parts = pair.split("-vs-");
  if (parts.length !== 2) return {};

  const data = await getVsData(parts[0], parts[1]);
  if (!data) return {};

  const name1 = localizedName(data.dest1, locale);
  const name2 = localizedName(data.dest2, locale);
  const title = locale === "hi"
    ? `${name1} बनाम ${name2}: कौन बेहतर? मौसम, खर्च और परिवार के लिहाज़ से तुलना`
    : `${name1} vs ${name2}: Which Is Better? Weather, Cost & Kid-Friendliness Compared`;
  const description = (locale === "hi"
    ? `${name1} बनाम ${name2} — महीने-दर-महीने मौसम स्कोर, बजट, कठिनाई, बच्चों की सुरक्षा और सुविधाओं की आमने-सामने तुलना। सही चुनाव करें।`
    : `${name1} vs ${name2} — side-by-side data on monthly weather scores, budget, difficulty, kids safety, and infrastructure. Make the right choice, no sponsored spin.`).slice(0, 160);
  const canonicalUrl = `${SITE}/${locale}/vs/${pair}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE}/en/vs/${pair}`,
        hi: `${SITE}/hi/vs/${pair}`,
        "x-default": `${SITE}/en/vs/${pair}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [
        { url: `${SITE}/images/destinations/${parts[0]}.jpg`, width: 600, height: 400, alt: name1 },
        { url: `${SITE}/images/destinations/${parts[1]}.jpg`, width: 600, height: 400, alt: name2 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function VsPairPage({
  params,
}: {
  params: Promise<{ pair: string; locale: string }>;
}) {
  const { pair, locale } = await params;
  const parts = pair.split("-vs-");
  if (parts.length !== 2) notFound();

  const data = await getVsData(parts[0], parts[1]);
  if (!data) notFound();

  const { dest1, dest2 } = data;

  const name1 = localizedName(dest1, locale);
  const name2 = localizedName(dest2, locale);
  const state1 = resolveState(dest1.state);
  const state2 = resolveState(dest2.state);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "hi" ? "होम" : "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "hi" ? "तुलना" : "Compare", item: `${SITE}/${locale}/vs` },
      { "@type": "ListItem", position: 3, name: `${name1} ${locale === "hi" ? "बनाम" : "vs"} ${name2}`, item: `${SITE}/${locale}/vs/${pair}` },
    ],
  };

  const serialize = (d: Record<string, unknown>, displayName: string) => ({
    id: d.id as string,
    name: displayName,
    tagline: d.tagline as string,
    difficulty: d.difficulty as string,
    elevation_m: d.elevation_m as number | null,
    budget_tier: d.budget_tier as string | null,
    best_months: d.best_months as string | null,
    daily_cost: d.daily_cost,
    family_stress: d.family_stress as string | null,
    state: resolveState(d.state),
    months: ((d.destination_months as { month: number; score: number; note?: string | null; verdict?: string | null }[] | null) ?? []).slice().sort(
      (a, b) => a.month - b.month,
    ),
    kids: Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : (d.kids_friendly as { suitable: boolean; rating: number } | null),
    confidence: Array.isArray(d.confidence_cards) ? d.confidence_cards[0] : (d.confidence_cards as { safety_rating: number | string | null; network: unknown } | null),
  });

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
        style={{ position: "relative", padding: "140px 24px 0" }}
      >
        <header style={{ maxWidth: 900, margin: "0 auto 32px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {locale === "hi" ? "तुलना" : "COMPARISONS"} · {state1 ? state1.toUpperCase() : "INDIA"} {state2 && state2 !== state1 ? `× ${state2.toUpperCase()}` : ""}
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
            {name1}{" "}
            <span
              style={{
                fontFamily: "var(--cinema-mono)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "0.42em",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
                verticalAlign: "middle",
                margin: "0 0.3em",
              }}
            >
              vs
            </span>{" "}
            {name2}.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            {locale === "hi"
              ? "आमने-सामने का डेटा — महीने-दर-महीने मौसम, रोज़ का खर्च, कठिनाई, बच्चों के लिहाज़ और नेटवर्क। वही चुनें जो आपकी यात्रा में सही बैठे।"
              : "Side-by-side data — monthly weather, daily cost, difficulty, kids-friendliness, network. Pick the one that fits your trip."}
          </p>
        </header>
      </main>

      <VsComparison
        dest1={serialize(dest1 as unknown as Record<string, unknown>, name1)}
        dest2={serialize(dest2 as unknown as Record<string, unknown>, name2)}
        locale={locale}
      />

      {/* Cross-family links: each side's trip-cost calculator. daily_cost on
          the destinations row is what /cost/[slug] itself renders from, so a
          non-null value here means the cost page exists (audit #9: /vs pages
          linked neither side's /cost — 3,334 near-orphan URLs). */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[
            { d: dest1, label: name1 },
            { d: dest2, label: name2 },
          ]
            .filter(({ d }) => (d as { daily_cost?: unknown }).daily_cost != null)
            .map(({ d, label }) => (
              <Link
                key={(d as { id: string }).id}
                href={`/${locale}/cost/${(d as { id: string }).id}`}
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  color: "var(--bone)",
                  border: "1px solid var(--hair)",
                  padding: "12px 20px",
                  textDecoration: "none",
                }}
              >
                {locale === "hi" ? `${label} की यात्रा का बजट निकालें →` : `Budget a ${label} trip →`}
              </Link>
            ))}
        </div>
      </section>

      {/* Hill-station pairs → the decision quiz: same "which one?" intent,
          across the whole verified pool instead of just these two. Gated on
          BOTH sides carrying the hill-station tag (theme is too coarse —
          cross-region holds 67 hill pairs alongside non-hill ones), so this
          tracks the same tag the quiz pool queries. */}
      {((dest1 as { tags?: string[] | null }).tags ?? []).includes("hill-station") &&
        ((dest2 as { tags?: string[] | null }).tags ?? []).includes("hill-station") && (
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
          <Link
            href={`/${locale}/quiz/hill-station`}
            style={{
              display: "block",
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--bone)",
              border: "1px solid var(--hair)",
              padding: "16px 20px",
              textDecoration: "none",
            }}
          >
            {locale === "hi"
              ? `${name1} और ${name2} से आगे देखना चाहते हैं? 30-सेकंड की हिल-स्टेशन क्विज़ लें →`
              : `Still weighing ${name1} against ${name2}? Take the 30-second hill-station quiz →`}
          </Link>
        </section>
      )}

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
