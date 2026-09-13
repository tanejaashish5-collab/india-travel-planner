import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoadConditionsContent } from "@/components/road-conditions-content";
import { RoadUpdatesFeed, CiteBlock } from "@/components/road-updates-feed";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { ROAD_REGIONS, getRoadUpdates, getRoadReports, summarise, fmtDate } from "@/lib/road-updates";

// Was 86400. The dated feed is written daily by the road-updates routine, so
// an hour is the longest a fresh entry should wait to appear.
export const revalidate = 3600;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === "hi";
  return {
    title: hi
      ? "भारत की सड़कों का हाल: रोज़ाना अपडेट, तारीख और स्रोत के साथ"
      : "India road conditions: dated daily updates with sources",
    description: hi
      ? "मनाली-लेह, श्रीनगर-लेह, चारधाम, स्पीति, किन्नौर, सिक्किम: हर बंद, हर खुलने की तारीख और आधिकारिक स्रोत। रोज़ाना सत्यापित।"
      : "Manali–Leh, Srinagar–Leh, Char Dham, Spiti, Kinnaur, Sikkim: every closure and reopening logged by date with its official source. Verified daily.",
    ...localeAlternates(locale, "/road-conditions"),
  };
}

export default async function RoadConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hi = locale === "hi";
  const [updates, reports] = await Promise.all([getRoadUpdates({ days: 30 }), getRoadReports()]);
  const sum = summarise(updates);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: hi ? "सड़कों का हाल" : "Road conditions", item: `${SITE}/${locale}/road-conditions` },
    ],
  };
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "NakshIQ India road conditions tracker",
    description: "Dated, sourced log of road closures, restrictions and reopenings on Indian mountain and desert corridors, one entry per verified event.",
    url: `${SITE}/en/road-conditions`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", name: "NakshIQ", url: SITE },
    temporalCoverage: sum.latest ? `2026-09-13/${sum.latest}` : "2026-09-13/..",
    spatialCoverage: ROAD_REGIONS.map((r) => r.en).join(", "),
    dateModified: sum.latest ?? undefined,
    distribution: [
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE}/api/road-updates?format=csv` },
      { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE}/api/road-updates` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <Nav />

      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "140px 24px 64px" }}>
        <header style={{ maxWidth: 1100, margin: "0 auto 40px" }}>
          <p className="nq-kicker" style={{ color: "var(--vermillion)", marginBottom: 20, letterSpacing: "0.22em" }}>
            {hi ? "रोज़ाना लॉग" : "DAILY LOG"} · {sum.latest ? (hi ? `${fmtDate(sum.latest, "hi")} तक` : `AS OF ${fmtDate(sum.latest, "en").toUpperCase()}`) : (hi ? "पहली प्रविष्टि जल्द" : "FIRST ENTRIES PENDING")}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px, 6vw, 76px)", lineHeight: 1.0, letterSpacing: "-0.022em", margin: 0, textWrap: "balance" }}
          >
            {hi ? "भारत की सड़कों का हाल, तारीख के साथ." : "India road conditions, by date."}
          </Title>
          <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.4, color: "var(--bone-dim)", marginTop: 24, maxWidth: 760 }}>
            {hi
              ? `${ROAD_REGIONS.length} क्षेत्र, ${reports.length} कॉरिडोर। हर बंद, प्रतिबंध और खुलने की प्रविष्टि उस दिन की तारीख और आधिकारिक स्रोत के साथ। पिछले 30 दिनों में ${sum.total} प्रविष्टियाँ, ${sum.closures} बंद।`
              : `${ROAD_REGIONS.length} regions, ${reports.length} corridors. Every closure, restriction and reopening logged on the day, with the authority that said it. ${sum.total} entries in the last 30 days, ${sum.closures} closures.`}
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Region grid */}
          <section aria-label={hi ? "क्षेत्र" : "Regions"} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, background: "var(--hair)", border: "1px solid var(--hair)", marginBottom: 40 }}>
            {ROAD_REGIONS.map((r) => {
              const s = sum.byRegion[r.id];
              return (
                <Link key={r.id} href={`/${locale}/road-conditions/${r.id}`} style={{ display: "block", padding: 18, background: "var(--paper)", textDecoration: "none" }}>
                  <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontSize: 19, color: "var(--bone)", margin: "0 0 4px" }}>{hi ? r.hi : r.en} →</p>
                  <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone-dim)", margin: "0 0 8px", lineHeight: 1.5 }}>{r.blurb}</p>
                  <p style={{ fontFamily: "var(--cinema-mono)", fontSize: 11, letterSpacing: "0.1em", color: s ? "var(--bone-dim)" : "var(--bone-faint)", margin: 0 }}>
                    {s ? `${s.total} ${hi ? "प्रविष्टियाँ" : "entries"} · ${s.closures} ${hi ? "बंद" : "closures"} · ${s.latest}` : (hi ? "30 दिन में कोई प्रविष्टि नहीं" : "no entries in 30 days")}
                  </p>
                </Link>
              );
            })}
          </section>

          {/* Dated feed */}
          <section aria-labelledby="feed-h">
            <h2 id="feed-h" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 8px" }}>
              {hi ? "पिछले 30 दिन" : "The last 30 days"}
            </h2>
            <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-dim)", margin: "0 0 12px", lineHeight: 1.6 }}>
              {hi
                ? "हर प्रविष्टि किसी आधिकारिक सूचना या दिनांकित समाचार से आती है और स्रोत की अपनी तारीख जाँची जाती है। पुरानी खबर को आज का हाल बताकर नहीं छापा जाता।"
                : "Each entry comes from an official notice or a dated news report, and the source's own date is checked before it is logged. Old news is never published as today's status."}
            </p>
            <RoadUpdatesFeed updates={updates} locale={locale} />
          </section>

          <CiteBlock locale={locale} latest={sum.latest} total={sum.total} closures={sum.closures} />

          <section style={{ margin: "40px 0 0" }}>
            <NewsletterSignup
              source="road-conditions"
              headline={hi ? "सड़क बंद होने की खबर पहले चाहिए? रविवार की एक ईमेल।" : "Want the closures before you drive? One email, Sundays."}
              subhead={hi ? "एक स्कोर, एक स्किप, एक सड़क अपडेट। मुफ़्त।" : "One score, one skip, one road update. Free."}
            />
          </section>

          {/* Current corridor snapshot (the older component, kept) */}
          <section aria-labelledby="corridors-h" style={{ marginTop: 56 }}>
            <h2 id="corridors-h" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 16px" }}>
              {hi ? `${reports.length} कॉरिडोर, वर्तमान स्थिति` : `${reports.length} corridors, current status`}
            </h2>
            <RoadConditionsContent reports={reports} />
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
