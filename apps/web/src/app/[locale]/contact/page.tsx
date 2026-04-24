import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { ContactForm } from "@/components/contact-form";

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
      { "@type": "ListItem", position: 2, name: "Contact", item: `${ORG_URL}/${locale}/contact` },
    ],
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-semibold mb-2">
          {isHindi ? "संपर्क करें" : "Contact NakshIQ"}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          {isHindi
            ? "हर ईमेल हम पढ़ते हैं। हमेशा।"
            : "Every message lands in the same inbox we read ourselves. No contact-centre."}
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              {isHindi ? "किस बारे में लिख रहे हैं?" : "What are you writing about?"}
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  {isHindi ? "सुधार या तथ्य-जाँच" : "Correction or fact-check"}
                </strong>{" "}
                —{" "}
                {isHindi
                  ? "कुछ गलत पाया? हम इसे खुले में ठीक करते हैं।"
                  : "Found something wrong? We fix it in the open — see the corrections log."}
              </li>
              <li>
                <strong className="text-foreground">
                  {isHindi ? "प्रेस और मीडिया" : "Press or media"}
                </strong>{" "}
                —{" "}
                {isHindi
                  ? "कहानियों, उद्धरणों, या रिपोर्ट्स के लिए — editor@nakshiq.com."
                  : "Stories, quotes, data requests — editor@nakshiq.com."}
              </li>
              <li>
                <strong className="text-foreground">
                  {isHindi ? "साझेदारी" : "Partnership or collaboration"}
                </strong>{" "}
                —{" "}
                {isHindi
                  ? "पर्यटन बोर्ड, रिसर्च, B2B डेटा लाइसेंस — hello@nakshiq.com."
                  : "Tourism boards, research, B2B data licensing — hello@nakshiq.com."}
              </li>
              <li>
                <strong className="text-foreground">
                  {isHindi ? "स्थानीय विशेषज्ञ" : "Local expert or contributor"}
                </strong>{" "}
                —{" "}
                {isHindi
                  ? "आप अपने क्षेत्र को अच्छे से जानते हैं? हम सुनना चाहेंगे।"
                  : "You know your region better than any guidebook? We'd like to hear from you."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              {isHindi ? "संदेश भेजें" : "Send us a note"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isHindi
                ? "नीचे का फॉर्म सीधे हमारे इनबॉक्स में जाता है। चाहें तो ईमेल पता भी दे सकते हैं।"
                : "The form below lands in our inbox. Leave your email if you want a reply — otherwise it's read either way."}
            </p>
            <ContactForm locale={locale} />
          </section>

          <section className="rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">
              {isHindi ? "सीधे ईमेल" : "Direct email"}
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-muted-foreground">
                  {isHindi ? "संपादकीय" : "Editorial"}
                </dt>
                <dd>
                  <a href="mailto:editor@nakshiq.com" className="underline hover:text-primary">
                    editor@nakshiq.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-muted-foreground">
                  {isHindi ? "सामान्य" : "General"}
                </dt>
                <dd>
                  <a href="mailto:hello@nakshiq.com" className="underline hover:text-primary">
                    hello@nakshiq.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-muted-foreground">
                  {isHindi ? "प्रेस" : "Press"}
                </dt>
                <dd>
                  <a href="mailto:press@nakshiq.com" className="underline hover:text-primary">
                    press@nakshiq.com
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground/80">
              {isHindi
                ? "सामान्य प्रतिक्रिया समय: 2–5 कार्यदिवस। प्रेस पूछताछ तेज़ हैंडल होती है।"
                : "Typical reply time: 2–5 working days. Press enquiries are handled faster."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              {isHindi ? "एक छोटी भरोसे की बात" : "A small trust note"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isHindi
                ? "NakshIQ एक परिवार-निर्मित प्रोजेक्ट है। कोई कॉल-सेंटर नहीं, कोई चैटबॉट नहीं। आपकी प्रतिक्रिया पढ़ी, सम्मानित, और जब संभव हो तब प्रकाशित की जाती है।"
                : "NakshIQ is family-built. No call-centre, no chatbot. What you write is read, respected, and — when it improves a page — published with credit. See our "}
              {!isHindi && (
                <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">
                  editorial policy
                </Link>
              )}
              {!isHindi && " for how corrections are handled."}
            </p>
          </section>

          <div className="flex items-center justify-center gap-3 pt-6">
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {isHindi ? "हमारे बारे में" : "About us"}
            </Link>
            <Link
              href={`/${locale}/editorial-policy`}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {isHindi ? "संपादकीय नीति" : "Editorial policy"}
            </Link>
            <Link
              href={`/${locale}/methodology`}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {isHindi ? "हम कैसे स्कोर करते हैं" : "How we score"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
