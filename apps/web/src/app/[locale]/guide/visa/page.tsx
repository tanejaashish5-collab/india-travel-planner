import type { Metadata } from "next";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { articleJsonLd } from "@/lib/article-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import { CinematicGuide } from "@/components/cinematic-guide";
import { CinematicLedger } from "@/components/cinematic-ledger";

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
    title: "India tourist visa — what you actually need to know",
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

  const sections = [
    {
      id: "pick-variant",
      title: "Pick the right e-TV variant",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={proseStyle}>
            Three durations, all online, all multiple-entry except the shortest.
            Choose by total trip length and whether you&apos;ll re-enter.
          </p>
          <CinematicLedger
            rows={[
              {
                label: "30-day double",
                value:
                  "Calendar-based from issue date. Two entries — useful if you're flying to Nepal mid-trip.",
              },
              {
                label: "1-year multiple",
                value:
                  "Best balance for most. 365-day window, 90 days per visit (180 for US/UK/Canada/Japan).",
              },
              {
                label: "5-year multiple",
                value:
                  "Same 90-day cap, five-year window. Marginal cost over 1-year is small.",
              },
            ]}
          />
        </div>
      ),
    },
    {
      id: "apply-window",
      title: "Apply 4 to 120 days before arrival",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={proseStyle}>
            The portal won&apos;t accept earlier applications. Most travelers apply
            2–3 weeks ahead. Standard processing is 72 hours, but build in 5 working
            days as a buffer — high-volume periods around Diwali and Christmas can
            stretch the queue.
          </p>
          <p style={proseStyle}>
            You&apos;ll need: passport with 6+ months validity from arrival date
            and at least 2 blank pages, a recent digital photo on white
            background, a passport bio-page scan, a return or onward ticket
            reference, and a card to pay. The portal asks for an Indian address —
            book at least your first night and use that.
          </p>
        </div>
      ),
    },
    {
      id: "designated-airports",
      title: "Use designated airports only",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={proseStyle}>
            The e-TV is valid at 33 airports plus 6 seaports. The hubs are all on
            the list — Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad,
            Kochi — and so are Goa, Ahmedabad, Jaipur, Amritsar, Pune, Bagdogra,
            Guwahati, Trivandrum, and Varanasi. If you&apos;re flying into a
            smaller domestic-only airport, you&apos;ll need a regular sticker
            visa instead.
          </p>
          <p style={proseStyle}>
            Always cross-check the current designated-port list on the official
            portal before booking — it changes occasionally as new international
            gates open.
          </p>
        </div>
      ),
    },
    {
      id: "common-rejections",
      title: "Common rejections, easily avoided",
      body: (
        <ul style={{ ...proseStyle, paddingLeft: 24, margin: 0 }}>
          <li>Passport validity under 6 months from arrival — re-issue first.</li>
          <li>Photo too dark, with shadows, or wearing glasses — strict bio-spec required.</li>
          <li>Mismatch between scanned bio page and entered details (date format, middle names).</li>
          <li>No return or onward ticket evidence in the application.</li>
          <li>Applying with less than 4 days to arrival — system will reject.</li>
        </ul>
      ),
    },
    {
      id: "costs",
      title: "Costs change — verify before applying",
      body: (
        <p style={proseStyle}>
          Fees are tiered by nationality. SAARC and selected developing-country
          nationals pay roughly USD 25 short-stay; most others fall in the USD
          25–100 band depending on validity. Plus a ~2.5% bank-card surcharge.
          The current fee shows in your currency on the portal once you select
          nationality. Don&apos;t pay middlemen — there are many copycat sites
          that charge a markup; the only authoritative source is{" "}
          <a
            href="https://indianvisaonline.gov.in/evisa/tvoa.html"
            target="_blank"
            rel="noopener noreferrer"
            style={inlineLink}
          >
            indianvisaonline.gov.in
          </a>
          .
        </p>
      ),
    },
    {
      id: "permits",
      title: "Restricted-area permits are separate",
      body: (
        <p style={proseStyle}>
          Several Indian regions still require an additional Inner Line Permit
          or Protected Area Permit on top of your visa: Ladakh, parts of Sikkim,
          Arunachal Pradesh, Nagaland, Mizoram, Manipur, and the Andaman
          &amp; Nicobar Islands. Foreign nationals face stricter rules than
          Indian citizens. We cover them separately —{" "}
          <Link href={`/${locale}/guide/permits`} style={inlineLink}>
            see the permits guide
          </Link>
          .
        </p>
      ),
    },
    {
      id: "faqs",
      title: "Frequently asked",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                paddingTop: 16,
                borderTop: i === 0 ? "none" : "1px solid var(--hair)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 19,
                  lineHeight: 1.3,
                  color: "var(--bone)",
                  margin: "0 0 8px",
                }}
              >
                {faq.question}
              </h3>
              <p style={proseStyle}>{faq.answer}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CinematicGuide
        kicker={`GUIDES · INDIA VISA · REVIEWED ${REVIEWED}`}
        title="India tourist visa — what you actually need."
        dek="Most travellers entering India need a visa, and most use the e-Tourist Visa rather than a sticker visa from a consulate. The eTV is faster, cheaper, and works at the airports you're likely flying into anyway. Here's what to apply for, when, and what catches people out."
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide/permits`,
          title: "Inner Line Permit + Protected Area Permit, state by state.",
        }}
      />
    </>
  );
}

const proseStyle = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  margin: 0,
};

const inlineLink = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};
