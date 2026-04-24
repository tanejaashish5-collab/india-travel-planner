import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { RiskQuiz } from "@/components/risk-quiz";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi ? "यात्रा मिलान प्रश्नोत्तरी — NakshIQ" : "Find your trip — NakshIQ's 5-question matcher",
    description: isHindi
      ? "5 प्रश्न, 60 सेकंड। आपके लिए 5 सर्वश्रेष्ठ स्थल — आपके महीने, आराम स्तर, और यात्रा समूह के लिए।"
      : "Five questions, sixty seconds. Get the 5 best India destinations for your month, comfort level, and travel group. No email required, no account.",
    ...localeAlternates(locale, "/risk-quiz"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function RiskQuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${BASE_URL}/${locale}/risk-quiz`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Find your trip", item: pageUrl },
    ],
  };

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#app`,
    name: "NakshIQ trip matcher",
    url: pageUrl,
    description: "A five-question matcher that recommends five India destinations tailored to the user's travel group, month, duration, priorities, and comfort tolerance.",
    applicationCategory: "TravelApplication",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <span className="text-foreground">Find your trip</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">Find your trip — in five questions</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
          Five questions, sixty seconds. We'll map your answers to the NakshIQ
          destination-month scoring and hand back the five best matches. No email, no account.
        </p>

        <RiskQuiz locale={locale} />

        <section className="mt-12 rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-2">How it maps</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your answers are mapped to a persona (family / solo / couple / adventure / wellness),
            then queried against the 5,856-row destination-month score table filtered by the month
            and comfort tier you selected. The top 5 highest-scored matches land here. No remote
            API call — the matcher runs on the live NakshIQ scoring database.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
