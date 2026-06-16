import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AskNakshIQPage } from "@/components/ask-nakshiq-page";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Ask — AI Travel Assistant for India",
    description:
      "Ask anything about traveling in India. Get instant answers powered by 340+ destinations, 710+ POIs, monthly scores, kids ratings, and safety data.",
    ...localeAlternates(locale, "/ask"),
  };
}

export default async function AskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Ask NakshIQ", item: `${SITE}/${locale}/ask` },
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
        style={{ position: "relative", padding: "140px 24px 48px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 32px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            AI TRAVEL ASSISTANT · INDIA
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
            Ask NakshIQ.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 640,
            }}
          >
            Ask anything about destinations, best months, safety, or planning. Answers draw from
            505 destinations, monthly scores, kids ratings, and verified infra data.
          </p>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <AskNakshIQPage locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
