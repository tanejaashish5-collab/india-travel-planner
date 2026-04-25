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
    question: "Should I bring cash or rely on cards in India?",
    answer:
      "Both. Card and UPI acceptance is excellent in cities and at any organised merchant — restaurants, hotels, supermarkets, ride-share. Cash is still essential for street food, tuk-tuks in smaller towns, temple offerings, tipping, and any rural travel. A typical traveler should plan 70-30 cards-to-cash in cities, 50-50 if heading to small towns, 30-70 if going seriously remote (Spiti, Northeast hills, A&N).",
  },
  {
    question: "Where do I get rupees? Should I exchange before flying?",
    answer:
      "Don&apos;t exchange before flying — Indian rupees are tightly regulated and you&apos;ll lose 5-8% on the round-trip. Use the airport ATM on arrival (they accept all major foreign cards; withdrawal limits ₹10,000 per transaction, often ₹40,000 per day). Airport money changers are convenient but charge worse rates than ATMs. Avoid back-alley changers entirely — the spread is opaque and counterfeit risk is real.",
  },
  {
    question: "Will my Visa or Mastercard work everywhere?",
    answer:
      "Visa and Mastercard work at any organised merchant — restaurants, hotels, supermarkets, fuel stations, malls. Amex acceptance is patchy outside chains. Discover and JCB: rare. Some banks decline international cards on the first attempt as a fraud-prevention default — call your bank before you fly to whitelist India. Contactless tap-to-pay is widely supported on POS terminals.",
  },
  {
    question: "What is UPI and can foreign tourists use it?",
    answer:
      "UPI (Unified Payments Interface) is India&apos;s instant-payment rail — basically QR code payments linked to a bank account. Locals pay everything from chai to airline tickets via Google Pay, PhonePe, or Paytm scanning a QR. Foreign visitors couldn&apos;t use UPI for years, but since 2024 NPCI&apos;s UPI One World wallet for inbound travelers is live. You preload it via partner banks (or at airport counters at major Indian airports) and scan QR codes like a local. Coverage is still limited — bring it as a supplement to cards and cash, not a replacement.",
  },
  {
    question: "Are ATMs safe to use? Any common scams?",
    answer:
      "Yes, in normal circumstances. Use ATMs inside bank branches or shopping malls — they&apos;re monitored and machine maintenance is reliable. Standalone ATMs in isolated places are a higher skim risk. Cover the keypad. Decline if the machine has obvious aftermarket attachments around the card slot. RBI requires every ATM to issue a printed transaction slip — keep it. Foreign-card withdrawal fee is typically ₹150-250 per transaction plus your home bank&apos;s overseas-ATM fee.",
  },
  {
    question: "How much should I tip?",
    answer:
      "Restaurants: 10% if a service charge isn&apos;t already on the bill (it often is in mid-range and up — read the bill). Hotel porters: ₹50-100 per bag. Tour guides for a half-day: ₹500-1000. Hotel housekeeping: ₹100-200/day in cash. Drivers on multi-day trips: ₹500-1000/day depending on region and standard. Don&apos;t tip in coins — small denomination notes (₹10, ₹20, ₹50) are appreciated.",
  },
  {
    question: "What about counterfeit notes — is this still a real risk?",
    answer:
      "Less than it used to be. The 2016 demonetisation and re-issue of ₹500 and ₹2000 notes, plus the 2023 withdrawal of ₹2000 notes, cleaned up most of the old counterfeit stock. Newer notes have visible security threads, raised printing, and a watermark portrait. Be cautious accepting ₹500 from informal money changers; check at a bank counter if unsure. Day-to-day at established merchants this isn&apos;t something you need to worry about.",
  },
  {
    question: "How much cash should I carry around?",
    answer:
      "Day-to-day in cities, ₹1,000-3,000 in your wallet handles small purchases and tipping. Carry the bulk of your cash in a money belt or hotel safe and replenish from the wallet daily. For overland trips into remote regions (Spiti, Northeast circuits, the Andamans), withdraw enough at the last large town — ATMs in remote areas run dry frequently and don&apos;t always restock for a week.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Money in India — UPI, ATMs, cards, cash | NakshIQ",
    description:
      "What works where, foreign-tourist UPI options, ATM tactics, tipping ranges, common pitfalls. Practical and current.",
    ...localeAlternates(locale, "/guide/currency"),
  };
}

export default async function CurrencyGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/currency`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "Money in India — UPI, ATMs, cards, cash",
    description: "Practical guide to paying for things in India: card vs UPI vs cash, ATM tactics, tipping.",
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
      { "@type": "ListItem", position: 3, name: "Money in India", item: url },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Practical · Money · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India money</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Paying for things in India — UPI, cards, ATMs, cash
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            India runs on UPI — instant QR-code bank transfers — for everything from chai to airline tickets. Foreign tourists couldn&apos;t use it for years; that&apos;s changing. Meanwhile cards work at any organised merchant, ATMs are reliable inside banks, and cash still matters for street food, autos, and rural travel.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            The four payment methods, ranked by usefulness
          </h2>
          <ol className="space-y-3 text-sm">
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">1. Visa / Mastercard contactless</p>
              <p className="text-muted-foreground leading-relaxed">
                Restaurants, hotels, supermarkets, malls, fuel stations, cabs (Uber, Ola, Rapido). Tap-to-pay is widely supported. Default for any purchase &gt;₹500.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">2. UPI via partner-bank wallet (foreign tourist)</p>
              <p className="text-muted-foreground leading-relaxed">
                Since 2024, NPCI&apos;s UPI One World wallet lets foreign visitors preload rupees and scan QR codes. Available at airport counters at Delhi, Mumbai, Bengaluru, and others, plus a handful of partner banks. Useful supplement; not yet a card replacement.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">3. Cash for small purchases and remote travel</p>
              <p className="text-muted-foreground leading-relaxed">
                Street food, autos in non-metro cities, temple offerings, tipping, anywhere off-grid. Carry small notes (₹10, ₹20, ₹50, ₹100) — most rural vendors can&apos;t change a ₹500.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">4. ATM withdrawals</p>
              <p className="text-muted-foreground leading-relaxed">
                Inside bank branches or malls only. ₹10,000 per transaction typical, ₹40,000 daily. Foreign-card fee is ~₹150-250 per pull plus your home bank&apos;s overseas-ATM fee — withdraw larger amounts less often.
              </p>
            </li>
          </ol>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Before you fly
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Tell your card-issuing bank you&apos;ll be in India. Some auto-decline international transactions on first try.</li>
            <li>• Bring two cards from different networks (Visa + Mastercard) on different banks. ATMs occasionally don&apos;t talk to one network.</li>
            <li>• Don&apos;t bother exchanging currency at home — round-trip you lose 5-8%.</li>
            <li>• Pack a money belt or low-profile travel pouch for the bulk of your cash. The hotel safe is fine for the rest.</li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Tipping ranges
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Restaurants without a service charge: 10%.</li>
            <li>• Hotel porter: ₹50-100 per bag.</li>
            <li>• Hotel housekeeping: ₹100-200 per night, in cash, in the room.</li>
            <li>• Half-day tour guide: ₹500-1,000. Full-day: ₹1,000-1,500.</li>
            <li>• Multi-day driver: ₹500-1,000/day depending on region and vehicle class.</li>
            <li>• Auto / taxi: round up to nearest ₹10. Not expected, appreciated.</li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Where this gets harder
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Spiti Valley (Himachal Pradesh), upper Ladakh circuits beyond Leh, the Northeast hill states, and parts of the Andaman &amp; Nicobar Islands have unreliable card and ATM coverage. Withdraw enough cash at the last reliable hub (Manali for Spiti; Leh for Ladakh circuits; Guwahati or Itanagar for Northeast hills; Port Blair for A&amp;N) and budget for it lasting the whole leg. Don&apos;t count on UPI in these zones either — even local merchants struggle with network drops.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Always verify card-network coverage with the official RBI guidance at{" "}
            <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="text-[#E55642] hover:underline">rbi.org.in</a> if anything in this guide looks dated.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/guide/visa`} className="text-[#E55642] hover:underline">India tourist visa →</Link></li>
            <li><Link href={`/${locale}/guide/sim-card`} className="text-[#E55642] hover:underline">Indian SIM card guide →</Link></li>
            <li><Link href={`/${locale}/guide/scams`} className="text-[#E55642] hover:underline">Common scams to spot →</Link></li>
            <li><Link href={`/${locale}/cost-index`} className="text-[#E55642] hover:underline">Cost index — what things actually cost →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">
          Last reviewed {REVIEWED}. Card and UPI coverage evolves quickly — defer to bank counters and the RBI portal for live policy.
        </aside>
      </main>
      <Footer />
    </div>
  );
}
