import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { localeAlternates } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi ? "संपर्क करें — NakshIQ" : "Contact NakshIQ",
    description: isHindi
      ? "सुधार सुझाएं, प्रेस पूछताछ, या साझेदारी — हम पढ़ते हैं हर ईमेल। NakshIQ एक परिवार-निर्मित यात्रा बुद्धिमत्ता परियोजना है।"
      : "Corrections, press enquiries, partnerships, or a simple hello. Every message is read by the family behind NakshIQ — no contact-centre, no autoresponder.",
    ...localeAlternates(locale, "/contact"),
  };
}

const ORG_URL = "https://www.nakshiq.com";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isHindi = locale === "hi";
  const issueNum = getIssueNumber();

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${ORG_URL}/${locale}/contact#page`,
    url: `${ORG_URL}/${locale}/contact`,
    name: isHindi ? "NakshIQ से संपर्क करें" : "Contact NakshIQ",
    inLanguage: isHindi ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${ORG_URL}#website` },
    about: { "@id": `${ORG_URL}#organization` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${ORG_URL}#organization`,
      name: "NakshIQ",
      url: ORG_URL,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "editorial",
          email: "editor@nakshiq.com",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@nakshiq.com",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          contactType: "press",
          email: "press@nakshiq.com",
          availableLanguage: ["English"],
          areaServed: "IN",
        },
      ],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORG_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isHindi ? "संपर्क" : "Contact",
        item: `${ORG_URL}/${locale}/contact`,
      },
    ],
  };

  return (
    <div
      className="cinema-page"
      style={{
        background: "var(--paper)",
        color: "var(--bone)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main
        id="main-content"
        style={{
          padding: "140px 24px 96px",
        }}
      >
        {/* Masthead */}
        <header
          style={{
            maxWidth: 1100,
            margin: "0 auto 80px",
            textAlign: "left",
          }}
        >
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            {isHindi ? "संपर्क" : "CONTACT"} · ISSUE Nº {issueNum}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 116px)",
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {isHindi ? (
              <>
                हर ईमेल हम<br />
                पढ़ते हैं।<br />
                हमेशा।
              </>
            ) : (
              <>
                Every message<br />
                lands in the same<br />
                inbox we read.
              </>
            )}
          </h1>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 32,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
            }}
          >
            {isHindi
              ? "कोई कॉल-सेंटर नहीं। कोई चैटबॉट नहीं। NakshIQ बनाने वाले परिवार के पास सीधे आपका संदेश पहुँचता है।"
              : "No contact-centre. No autoresponder. Everything you write lands in the inbox of the family that builds NakshIQ — and gets read by name."}
          </p>
        </header>

        {/* I — Write to us */}
        <section style={sectionStyle}>
          <SectionLabel num="I" name={isHindi ? "सीधे ईमेल" : "WRITE TO US"} />
          <Prose>
            <p>
              {isHindi
                ? "तीन इनबॉक्स। तीन लोग जो वाकई पढ़ते हैं। आप जो लिख रहे हैं उसके अनुसार सही पते पर भेजें — सबसे तेज़ जवाब मिलेगा।"
                : "Three inboxes. Three real people reading them. Pick the one closest to what you're writing about — that's how you get the fastest reply."}
            </p>
          </Prose>

          <div
            style={{
              maxWidth: 720,
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <ContactEntry
              num="1"
              label={isHindi ? "संपादकीय" : "EDITORIAL"}
              email="editor@nakshiq.com"
              body={
                isHindi
                  ? "सुधार, तथ्य-जाँच, गलत जानकारी — कुछ गलत पाया? हम इसे खुले में ठीक करते हैं और सुधार-लॉग में दर्ज करते हैं।"
                  : "Corrections, fact-checks, anything that reads wrong on a destination page. We fix things in the open and log every change in the corrections log."
              }
            />
            <ContactEntry
              num="2"
              label={isHindi ? "सामान्य" : "GENERAL"}
              email="hello@nakshiq.com"
              body={
                isHindi
                  ? "साझेदारी, पर्यटन बोर्ड, B2B डेटा लाइसेंस, स्थानीय विशेषज्ञ बनना, या सिर्फ नमस्ते — सब यहाँ।"
                  : "Partnerships, tourism boards, research collaborations, B2B data licensing, becoming a local contributor, or just saying hello — all of it lives here."
              }
            />
            <ContactEntry
              num="3"
              label={isHindi ? "प्रेस" : "PRESS"}
              email="press@nakshiq.com"
              body={
                isHindi
                  ? "कहानियाँ, उद्धरण, डेटा अनुरोध, साक्षात्कार। प्रेस पूछताछ अन्य पतों से तेज़ हैंडल होती हैं।"
                  : "Stories, quotes, data requests, interviews. Press enquiries are handled faster than the other inboxes — usually within 24 hours."
              }
            />
          </div>

          <div
            style={{
              maxWidth: 720,
              margin: "28px auto 0",
              paddingTop: 20,
              borderTop: "1px solid var(--hair)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--bone-faint)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              {isHindi
                ? "सामान्य प्रतिक्रिया समय: 2–5 कार्यदिवस। प्रेस पूछताछ तेज़ हैंडल होती है।"
                : "Typical reply time: 2–5 working days. Press enquiries handled faster."}
            </p>
          </div>
        </section>

        {/* II — Inquiries & partnerships */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name={isHindi ? "किस बारे में लिख रहे हैं?" : "WHAT YOU'RE WRITING ABOUT"} />
          <Prose>
            <p>
              {isHindi
                ? "नीचे चार सबसे आम वजहें हैं जिनके लिए लोग संपर्क करते हैं। आपकी वजह इनमें से एक हो — या न हो। हम पढ़ते सब हैं।"
                : "These are the four reasons most people write in. Yours might be one of these, or it might not — either way it gets read."}
            </p>
          </Prose>
          <div
            style={{
              maxWidth: 720,
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <EditorialEntry
              num="1"
              title={isHindi ? "सुधार या तथ्य-जाँच" : "Correction or fact-check"}
              body={
                isHindi
                  ? "कुछ गलत पाया — एक फ़ोन नंबर, एक रास्ता, एक स्कोर? हम इसे खुले में ठीक करते हैं और सुधार-लॉग में दर्ज करते हैं ताकि कोई भी देख सके कि क्या बदला और क्यों।"
                  : "Found something wrong — a phone number, a road status, a score? We fix it in the open and log every change in the corrections log, so anyone can see what changed and why."
              }
            />
            <EditorialEntry
              num="2"
              title={isHindi ? "प्रेस और मीडिया" : "Press or media"}
              body={
                isHindi
                  ? "कहानियों, उद्धरणों, या डेटा अनुरोधों के लिए editor@nakshiq.com पर लिखें। हम पत्रकारों के साथ काम करते हैं और सबूत देते हैं — बिना PR-रैप के।"
                  : "Stories, quotes, data requests — write to editor@nakshiq.com. We work with journalists and supply receipts, not press-release-flavoured filler."
              }
            />
            <EditorialEntry
              num="3"
              title={isHindi ? "साझेदारी" : "Partnership or collaboration"}
              body={
                isHindi
                  ? "पर्यटन बोर्ड, रिसर्च, B2B डेटा लाइसेंस — hello@nakshiq.com पर लिखें। नियम सरल है: हम भुगतान के बदले गंतव्य की सिफारिश कभी नहीं करते। बाकी सब चर्चा योग्य है।"
                  : "Tourism boards, research, B2B data licensing — hello@nakshiq.com. The rule is simple: we don't take money to recommend a destination. Everything else is open to a conversation."
              }
            />
            <EditorialEntry
              num="4"
              title={isHindi ? "स्थानीय विशेषज्ञ" : "Local expert or contributor"}
              body={
                isHindi
                  ? "आप अपने क्षेत्र को किसी भी गाइडबुक से बेहतर जानते हैं? हम सुनना चाहेंगे। लोकल वॉइस ही NakshIQ को नकली विकिपीडिया-स्टब्स की भीड़ से अलग करती है।"
                  : "You know your region better than any guidebook can? We'd like to hear from you. Local voices are what separate NakshIQ from the wall of fake-Wikipedia stubs out there."
              }
            />
          </div>
        </section>

        {/* III — Leave a note (form) */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name={isHindi ? "संदेश भेजें" : "LEAVE A NOTE"} />
          <Prose>
            <p>
              {isHindi
                ? "नीचे का फॉर्म सीधे हमारे इनबॉक्स में जाता है। चाहें तो ईमेल दे सकते हैं ताकि हम जवाब दे सकें — न दें तो भी पढ़ा जाता है।"
                : "The form below lands in our inbox. Leave your email if you want a reply — otherwise it's read either way."}
            </p>
          </Prose>

          <div
            style={{
              maxWidth: 720,
              margin: "40px auto 0",
              padding: "40px 32px",
              background: "var(--film-2)",
              border: "1px solid var(--hair)",
              borderLeft: "4px solid var(--vermillion)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 8,
              }}
            >
              {isHindi ? "एक संदेश छोड़ें" : "DROP A NOTE"}
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.4,
                color: "var(--bone)",
                margin: "0 0 28px",
              }}
            >
              {isHindi
                ? "नीचे का फॉर्म सीधे हमारे इनबॉक्स में जाता है।"
                : "The form below lands in our inbox."}
            </p>
            <ContactForm locale={locale} />
          </div>
        </section>

        {/* IV — A small trust note (callout) */}
        <section style={{ ...sectionStyle, maxWidth: 1100, margin: "0 auto 100px" }}>
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "48px 40px",
              background: "var(--film-2)",
              border: "1px solid var(--vermillion)",
              borderLeftWidth: 4,
            }}
          >
            <p
              className="nq-kicker"
              style={{ color: "var(--vermillion)", marginBottom: 18 }}
            >
              IV · {isHindi ? "एक छोटी भरोसे की बात" : "A SMALL TRUST NOTE"}
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.55,
                color: "var(--bone)",
                marginBottom: 16,
              }}
            >
              {isHindi
                ? "NakshIQ एक परिवार-निर्मित प्रोजेक्ट है। कोई कॉल-सेंटर नहीं, कोई चैटबॉट नहीं।"
                : "NakshIQ is family-built. No call-centre, no chatbot."}
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              {isHindi ? (
                "आपकी प्रतिक्रिया पढ़ी, सम्मानित, और जब संभव हो तब प्रकाशित की जाती है।"
              ) : (
                <>
                  What you write is read, respected, and — when it improves a page — published with credit. See our{" "}
                  <Link
                    href={`/${locale}/editorial-policy`}
                    style={{ color: "var(--vermillion)", textDecoration: "underline" }}
                  >
                    editorial policy
                  </Link>{" "}
                  for how corrections are handled.
                </>
              )}
            </p>
          </div>
        </section>

        {/* CTAs */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Link href={`/${locale}/about`} style={ctaPrimary}>
            {isHindi ? "हमारे बारे में →" : "ABOUT US →"}
          </Link>
          <Link href={`/${locale}/editorial-policy`} style={ctaSecondary}>
            {isHindi ? "संपादकीय नीति" : "EDITORIAL POLICY"}
          </Link>
          <Link href={`/${locale}/methodology`} style={ctaSecondary}>
            {isHindi ? "हम कैसे स्कोर करते हैं" : "HOW WE SCORE"}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─── Editorial style helpers ───────────────────────────── */

const sectionStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto 100px",
};

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "var(--cinema-ui)",
        fontSize: 17,
        lineHeight: 1.75,
        color: "var(--bone-dim)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {children}
    </div>
  );
}

function EditorialEntry({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: 24,
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontSize: 14,
          color: "var(--vermillion)",
          letterSpacing: "0.18em",
          paddingTop: 4,
        }}
      >
        {num.padStart(2, "0")}
      </span>
      <div>
        <h3
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.25,
            letterSpacing: "-0.012em",
            color: "var(--bone)",
            margin: "0 0 10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function ContactEntry({
  num,
  label,
  email,
  body,
}: {
  num: string;
  label: string;
  email: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: 24,
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontSize: 14,
          color: "var(--vermillion)",
          letterSpacing: "0.18em",
          paddingTop: 4,
        }}
      >
        {num.padStart(2, "0")}
      </span>
      <div>
        <p
          className="nq-kicker"
          style={{
            color: "var(--bone-faint)",
            margin: "0 0 8px",
            fontSize: 11,
            letterSpacing: "0.22em",
          }}
        >
          {label}
        </p>
        <a
          href={`mailto:${email}`}
          className="nq-mono"
          style={{
            display: "inline-block",
            fontSize: 22,
            color: "var(--vermillion)",
            textDecoration: "none",
            letterSpacing: "-0.005em",
            marginBottom: 12,
            wordBreak: "break-all",
          }}
        >
          {email}
        </a>
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

const ctaPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "var(--bone)",
  color: "var(--paper)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};

const ctaSecondary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "transparent",
  color: "var(--bone)",
  border: "1px solid var(--hair)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};
