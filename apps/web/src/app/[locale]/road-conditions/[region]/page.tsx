import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoadConditionsContent } from "@/components/road-conditions-content";
import { RoadUpdatesFeed, CiteBlock } from "@/components/road-updates-feed";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { ROAD_REGIONS, getRoadUpdates, getRoadReports, summarise, fmtDate, daysAgoISO } from "@/lib/road-updates";

export const revalidate = 3600;
const SITE = "https://www.nakshiq.com";

export function generateStaticParams() {
  return ROAD_REGIONS.flatMap((r) => ["en", "hi"].map((locale) => ({ locale, region: r.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; region: string }> }): Promise<Metadata> {
  const { locale, region } = await params;
  const r = ROAD_REGIONS.find((x) => x.id === region);
  if (!r) return {};
  const hi = locale === "hi";
  return {
    title: hi
      ? `${r.hi} की सड़कों का हाल आज: रोज़ाना अपडेट, स्रोत के साथ`
      : `${r.en} road conditions today: dated updates with sources`,
    description: hi
      ? `${r.hi}: ${r.blurb}. हर बंद और खुलने की तारीख, आधिकारिक स्रोत के साथ। रोज़ाना सत्यापित।`
      : `${r.en}: ${r.blurb}. Every closure and reopening logged by date with the authority that announced it. Verified daily.`,
    ...localeAlternates(locale, `/road-conditions/${region}`),
  };
}

export default async function RoadRegionPage({ params }: { params: Promise<{ locale: string; region: string }> }) {
  const { locale, region } = await params;
  const r = ROAD_REGIONS.find((x) => x.id === region);
  if (!r) notFound();
  const hi = locale === "hi";
  const [updates, reports] = await Promise.all([getRoadUpdates({ region, days: 60 }), getRoadReports(region)]);
  const cutoff = daysAgoISO(30);
  const sum = summarise(updates.filter((u) => u.update_date >= cutoff));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: hi ? "सड़कों का हाल" : "Road conditions", item: `${SITE}/${locale}/road-conditions` },
      { "@type": "ListItem", position: 3, name: hi ? r.hi : r.en, item: `${SITE}/${locale}/road-conditions/${region}` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "140px 24px 64px" }}>
        <header style={{ maxWidth: 1100, margin: "0 auto 40px" }}>
          <p className="nq-kicker" style={{ color: "var(--vermillion)", marginBottom: 20, letterSpacing: "0.22em" }}>
            <Link href={`/${locale}/road-conditions`} style={{ color: "inherit", textDecoration: "none" }}>{hi ? "सड़कों का हाल" : "ROAD CONDITIONS"}</Link>
            {" · "}
            {sum.latest ? (hi ? `${fmtDate(sum.latest, "hi")} तक` : `AS OF ${fmtDate(sum.latest, "en").toUpperCase()}`) : (hi ? "पहली प्रविष्टि जल्द" : "FIRST ENTRIES PENDING")}
          </p>
          <Title as="h1" className="nq-display" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px, 6vw, 76px)", lineHeight: 1.0, letterSpacing: "-0.022em", margin: 0, textWrap: "balance" }}>
            {hi ? `${r.hi} की सड़कें.` : `${r.en} roads.`}
          </Title>
          <p style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.4, color: "var(--bone-dim)", marginTop: 24, maxWidth: 760 }}>
            {r.blurb}. {hi ? `पिछले 30 दिनों में ${sum.total} प्रविष्टियाँ, ${sum.closures} बंद।` : `${sum.total} entries in the last 30 days, ${sum.closures} closures.`}
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <section aria-labelledby="feed-h">
            <h2 id="feed-h" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 12px" }}>
              {hi ? "पिछले 60 दिन" : "The last 60 days"}
            </h2>
            <RoadUpdatesFeed updates={updates} locale={locale} showRegion={false} />
          </section>

          <CiteBlock locale={locale} latest={sum.latest} total={sum.total} closures={sum.closures} region={{ id: r.id, en: r.en }} />

          <section style={{ margin: "40px 0 0" }}>
            <NewsletterSignup
              source={`road-conditions-${r.id}`}
              headline={hi ? `${r.hi} की सड़क बंद होने की खबर पहले चाहिए? रविवार की एक ईमेल।` : `Want ${r.en} closures before you drive? One email, Sundays.`}
              subhead={hi ? "एक स्कोर, एक स्किप, एक सड़क अपडेट। मुफ़्त।" : "One score, one skip, one road update. Free."}
            />
          </section>

          {reports.length > 0 && (
            <section aria-labelledby="corridors-h" style={{ marginTop: 56 }}>
              <h2 id="corridors-h" style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", color: "var(--bone)", margin: "0 0 16px" }}>
                {hi ? `${reports.length} कॉरिडोर, वर्तमान स्थिति` : `${reports.length} corridors, current status`}
              </h2>
              <RoadConditionsContent reports={reports} />
            </section>
          )}

          <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-faint)", marginTop: 40 }}>
            {hi ? "अन्य क्षेत्र: " : "Other regions: "}
            {ROAD_REGIONS.filter((x) => x.id !== r.id).map((x, i) => (
              <span key={x.id}>{i > 0 ? " · " : ""}<Link href={`/${locale}/road-conditions/${x.id}`} style={{ color: "var(--bone-dim)" }}>{hi ? x.hi : x.en}</Link></span>
            ))}
          </p>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
