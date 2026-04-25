import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { articleJsonLd } from "@/lib/article-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";

export const revalidate = 86400;

const REVIEWED = "2026-04-25";

const FAQS = [
  {
    question: "Do I need a visa to visit India as a tourist?",
    answer:
      "Almost certainly yes. India does not offer visa-free entry for most nationalities. Bhutan, Nepal, and the Maldives are the principal exceptions (Maldives nationals get visa-on-arrival). For everyone else — including all EU, UK, US, Canada, Australia, and most of Asia — you need a visa before you fly.",
  },
  {
    question: "What's the difference between e-Tourist Visa and a regular Tourist Visa?",
    answer:
      "Most travelers use the e-Tourist Visa (eTV): apply online at indianvisaonline.gov.in, get an electronic authorisation emailed to you, print it, present at immigration. The regular sticker visa is granted by Indian consulates abroad — slower, requires a passport submission, but valid at every Indian port of entry. eTV is restricted to 33 designated airports plus a handful of seaports.",
  },
  {
    question: "How far in advance can I apply for an e-Tourist Visa?",
    answer:
      "The application window is 4 to 120 days before your intended arrival. Earlier than 120 days, the system will reject you; closer than 4 days, you may not get processed in time. Standard processing is 72 hours, but plan for 5 working days as a buffer.",
  },
  {
    question: "How long can I stay in India on an e-Tourist Visa?",
    answer:
      "Three options: 30-day double-entry, 1-year multiple-entry (max 90 days per visit for most nationalities; some get 180), or 5-year multiple-entry (max 90 days per visit). Pick the variant that matches your travel pattern. The 30-day visa is calendar-based — the clock starts on date of issue, not arrival.",
  },
  {
    question: "Can I extend my tourist visa once I'm in India?",
    answer:
      "Tourist visas — including all e-Tourist variants — are not extendable inside India. Once your validity window ends, you must leave. Overstaying triggers an exit fine and a future entry block. If you need longer than 180 days, look at the 5-year e-TV (still capped at 90 days per visit) or apply for a fresh visa from your home country.",
  },
  {
    question: "Which Indian airports accept the e-Tourist Visa?",
    answer:
      "33 international airports as of the most recent MHA notification: the major hubs (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Kochi, Goa-Dabolim, Goa-Mopa, Ahmedabad), plus tier-2 entry points like Amritsar, Bagdogra, Bhubaneswar, Calicut, Chandigarh, Coimbatore, Gaya, Guwahati, Indore, Jaipur, Lucknow, Madurai, Mangalore, Nagpur, Pune, Tiruchirappalli, Trivandrum, Varanasi, Vishakhapatnam. Plus 6 designated seaports. The MHA list is the authoritative source — always cross-check before booking domestic transit.",
  },
  {
    question: "What documents do I need for the e-TV application?",
    answer:
      "Passport with 6+ months validity from arrival date and 2 blank pages, a recent passport-style photo (digital, white background), the bio page of your passport (digital scan), a return-trip itinerary (or onward ticket), and a credit/debit card for the fee. Some nationalities have additional yellow-fever-certificate requirements if arriving from listed countries.",
  },
  {
    question: "What does an e-Tourist Visa cost?",
    answer:
      "Fees are tiered by nationality and validity. Most travelers pay between roughly USD 25 (short-stay, SAARC and select developing-country nationals) and USD 80-100 (UK, US, EU, peak season). The official site shows your exact fee once you select your nationality. A bank-card surcharge of ~2.5% applies. We don't quote live numbers because the rate card changes — always verify on indianvisaonline.gov.in.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India tourist visa — what you actually need to know | NakshIQ",
    description:
      "e-Tourist Visa categories, application window, designated airports, costs, common rejection reasons. With links to the official Indian government portal.",
    ...localeAlternates(locale, "/guide/visa"),
  };
}

export default async function VisaGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/visa`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "India tourist visa — what you actually need to know",
    description:
      "e-Tourist Visa categories, application window, designated airports, costs, common rejection reasons.",
    inLanguage,
    datePublished: `${REVIEWED}T00:00:00Z`,
    dateModified: `${REVIEWED}T00:00:00Z`,
    author: editor,
  });

  const faqLd = faqPageJsonLd({
    entries: FAQS,
    url,
    isPartOfId: "https://www.nakshiq.com#website",
    aboutId: `${url}#article`,
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NakshIQ", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://www.nakshiq.com/${locale}/guide` },
      { "@type": "ListItem", position: 3, name: "Visa guide", item: url },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Practical · e-Tourist Visa · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">
            India visa
          </p>
          <h1
            className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            India tourist visa — what you actually need to know
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Most travelers entering India need a visa, and most use the e-Tourist Visa rather than a sticker visa from a consulate. The eTV is faster, cheaper, and works at the airports you&apos;re likely flying into anyway. Here&apos;s what to apply for, when, and what catches people out.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Pick the right e-TV variant
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Three durations, all online, all multiple-entry except the shortest. Choose by total trip length and whether you&apos;ll re-enter.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">30-day double entry</p>
              <p className="text-muted-foreground leading-relaxed">
                Calendar-based from date of issue. Works for short single trips. Two entries allowed (useful if you&apos;re flying out to Sri Lanka or Nepal mid-trip and back).
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">1-year multiple entry</p>
              <p className="text-muted-foreground leading-relaxed">
                Best balance for most. 365-day window, 90 days continuous stay per visit (180 days for some nationalities including USA, UK, Canada, Japan). Re-enter as many times as you like.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">5-year multiple entry</p>
              <p className="text-muted-foreground leading-relaxed">
                Same 90-day-per-visit cap but a five-year window. Worth it if you expect to come back. Marginal cost over the 1-year is small.
              </p>
            </li>
          </ul>

          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Apply 4 to 120 days before arrival
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The portal won&apos;t accept earlier applications. Most travelers apply 2-3 weeks ahead. Standard processing is 72 hours, but build in 5 working days as a buffer — high-volume periods around Diwali and Christmas can stretch the queue.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You&apos;ll need: passport with 6+ months validity from arrival date and at least 2 blank pages, a recent digital photo on white background, a passport bio-page scan, a return or onward ticket reference, and a card to pay. The portal asks for an Indian address — book at least your first night and use that.
          </p>

          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Use designated airports only
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The e-TV is valid at 33 airports plus 6 seaports. The hubs are all on the list — Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Kochi — and so are Goa, Ahmedabad, Jaipur, Amritsar, Pune, Bagdogra, Guwahati, Trivandrum, and Varanasi. If you&apos;re flying into a smaller domestic-only airport, you&apos;ll need a regular sticker visa instead.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Always cross-check the current designated-port list on the official portal before booking — it changes occasionally as new international gates open.
          </p>

          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Common rejections, easily avoided
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Passport validity under 6 months from arrival — re-issue first.</li>
            <li>• Photo too dark, with shadows, or wearing glasses — strict bio-spec photo required.</li>
            <li>• Mismatch between scanned bio page and entered details (date format, middle names).</li>
            <li>• No return or onward ticket evidence in the application.</li>
            <li>• Applying with less than 4 days to arrival — system will reject.</li>
          </ul>

          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Costs change — verify before applying
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Fees are tiered by nationality. SAARC and selected developing-country nationals pay roughly USD 25 short-stay; most others fall in the USD 25-100 band depending on validity. Plus a ~2.5% bank-card surcharge. The current fee shows in your currency on the portal once you select nationality. Don&apos;t pay middlemen — there are many copycat sites that charge a markup; the only authoritative source is{" "}
            <a
              href="https://indianvisaonline.gov.in/evisa/tvoa.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E55642] hover:underline"
            >
              indianvisaonline.gov.in
            </a>
            .
          </p>

          <h2
            className="font-serif italic text-2xl mb-3 mt-10"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Restricted-area permits are separate
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Several Indian regions still require an additional Inner Line Permit or Protected Area Permit on top of your visa: Ladakh, parts of Sikkim, Arunachal Pradesh, Nagaland, Mizoram, Manipur, and the Andaman &amp; Nicobar Islands. Foreign nationals face stricter rules than Indian citizens. We cover them separately — see the permits guide.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2
            className="font-serif italic font-medium text-xl sm:text-2xl mb-3"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Related
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${locale}/guide/permits`} className="text-[#E55642] hover:underline">
                Inner Line Permit, Protected Area Permit — state by state →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/guide/sim-card`} className="text-[#E55642] hover:underline">
                Indian SIM card and connectivity guide →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/guide/currency`} className="text-[#E55642] hover:underline">
                Money in India — UPI, ATMs, cards, cash →
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/arrival`} className="text-[#E55642] hover:underline">
                Arrival playbooks for 9 Indian airports →
              </Link>
            </li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">
          Last reviewed {REVIEWED}. Visa rules and fees change frequently — always confirm with the official Indian government portal at indianvisaonline.gov.in before you travel.
        </aside>
      </main>
      <Footer />
    </div>
  );
}
