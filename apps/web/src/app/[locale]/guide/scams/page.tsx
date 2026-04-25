import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { howToJsonLd } from "@/lib/howto-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";

export const revalidate = 86400;

const REVIEWED = "2026-04-25";

const STEPS = [
  {
    name: "Pre-book your first transfer",
    text:
      "Pre-paid airport taxi counters (every major Indian airport has one inside arrivals) or your hotel's pickup are the only sane first-day moves. Skip the freelance offers at the exit. Cost is fixed and on a printed slip.",
  },
  {
    name: "Use Uber, Ola, or Rapido in cities",
    text:
      "App-based ride-share is the simplest defence — fares are transparent, drivers are tracked, and there's no haggling. Auto-rickshaws on the apps are cheaper than taxis. If you're getting an off-app rickshaw, agree the fare before getting in.",
  },
  {
    name: "Verify hotel bookings before paying",
    text:
      "If a tout at a station says your hotel 'closed/burned/relocated', it didn't. Ignore them. Walk in or call the hotel directly using a number from their official booking confirmation, not a number a stranger hands you.",
  },
  {
    name: "Cross-check 'official' tour offices",
    text:
      "Government tourism offices have IDs and signage you can verify online. If 'India Government Tourism' is on a back-alley shop sign, it isn't. Real ones are at known city addresses listed on the state tourism site or the India Tourism portal.",
  },
  {
    name: "Buy train tickets only via IRCTC or known apps",
    text:
      "irctc.co.in, the IRCTC app, ConfirmTKT, and ixigo are legitimate. A man at the station offering 'last-minute insider tickets' is selling either a duplicate or a forgery. Tatkal seats open exactly 24h before departure on the official site.",
  },
  {
    name: "Refuse pressured 'gem' or 'silk' purchases",
    text:
      "If a 'tour guide' diverts you to a shop where you'd be helping his cousin export valuables abroad — the discount, the export-quality stamp, the customs paperwork — leave. The export scam has been documented for decades and still runs.",
  },
  {
    name: "Carry small bills, count change",
    text:
      "Small-denomination notes (₹10, ₹20, ₹50, ₹100) for street vendors, autos, and tips. Count change at the time, not later. Damaged or torn notes are sometimes refused even by banks — set those aside for railway/government payments which accept them.",
  },
  {
    name: "When in doubt, ask the hotel front desk",
    text:
      "Hotels have a stake in your good experience and zero stake in scams against you. They'll know the realistic auto fare to a destination, which restaurants are actually open, what a fair guide rate is, and whether the unsolicited offer at your door is worth taking seriously.",
  },
];

const FAQS = [
  {
    question: "Is India dangerous for tourists?",
    answer:
      "Statistically less than common stereotypes suggest, but specific scam patterns are real and worth knowing. The vast majority of Indian travel is uneventful. Risks cluster around tourist nodes — major railway stations, tourist-circuit hotels, monument exits, and airport-arrivals areas — and are almost always financial, not violent. The fixes are mostly behavioural: pre-book the first transfer, use ride-share apps, verify any 'official' approach, ignore unsolicited offers.",
  },
  {
    question: "What's the most common scam to spot?",
    answer:
      "The 'your hotel is closed/relocated' tout at a busy station — Delhi (especially Paharganj/New Delhi station), Varanasi, Agra, Jaipur. They redirect you to a partner hotel that pays them a commission. Always go directly to the booked hotel; if anyone insists otherwise, call the hotel using a number from the original booking confirmation.",
  },
  {
    question: "Are taxi scams really common?",
    answer:
      "On the airport-to-city route they used to be — and are completely solved by the pre-paid-taxi counter (printed slip, fixed fare, official desk inside arrivals at every major airport) or the Uber/Ola app. Within cities, app-based rides remove the scam vector entirely. The only meter-related risk left is the rare auto-rickshaw with a tampered meter — agree the fare before getting in if you're not on the app.",
  },
  {
    question: "Should I avoid drinking water from anyone offering it?",
    answer:
      "Avoid sealed-bottle drinks from strangers at stations or on buses (a long-standing if rare drugging pattern). Tap water everywhere in India is unsafe to drink — buy sealed bottled water from established merchants only, and check the seal. Bisleri, Kinley, and Aquafina are universally safe. Refilling at a hotel reverse-osmosis station is fine and reduces plastic.",
  },
  {
    question: "What about the 'gem' or 'silk' export scam?",
    answer:
      "It still runs in tourist hubs (Jaipur, Agra, parts of Delhi). The pitch: a guide diverts you to a shop selling 'wholesale' valuables you can re-export at home for huge markup. The shop assistant has paperwork that looks official. The merchandise is overpriced costume material. Anyone who proactively offers this is running the scam. Buy only at established retailers if you actually want jewellery or textiles.",
  },
  {
    question: "Is solo female travel safe in India?",
    answer:
      "Yes for many travelers, with situational care. The major safety guidance: avoid arriving anywhere after dark on day one, use ride-share apps over street autos especially at night, dress modestly outside metro and beach destinations, and trust your instincts on unwanted attention — leave the situation. Many destinations on NakshIQ have a solo-female safety score so you can plan around them.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Common India scams and how to avoid them | NakshIQ",
    description:
      "The actual scam patterns travelers run into in India — airport touts, hotel-relocation, gem export, fake government offices — and the simple defences for each.",
    ...localeAlternates(locale, "/guide/scams"),
  };
}

export default async function ScamsGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/scams`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const howToLd = howToJsonLd({
    url,
    name: "Avoiding common scams in India",
    description:
      "Eight simple defences against the recurring scam patterns travelers run into in India.",
    inLanguage,
    steps: STEPS,
    dateModified: `${REVIEWED}T00:00:00Z`,
  });

  const faqLd = faqPageJsonLd({
    entries: FAQS,
    url,
    isPartOfId: "https://www.nakshiq.com#website",
    aboutId: `${url}#howto`,
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NakshIQ", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://www.nakshiq.com/${locale}/guide` },
      { "@type": "ListItem", position: 3, name: "Scams", item: url },
    ],
  };

  return (
    <div className="min-h-screen">
      {howToLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />}
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Practical · Safety · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India scams</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Common India scams — and the simple defences
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Almost every scam tourists encounter in India runs at predictable nodes — airport arrivals, big railway stations, monument exits, tourist-circuit hotels — and almost every one is solved by a small set of habits. None of this needs paranoia; it needs awareness.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Eight defences, in order
          </h2>
          <ol className="space-y-4 text-sm">
            {STEPS.map((s, i) => (
              <li key={i} className="rounded-xl border border-border bg-background/40 p-4 flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center font-mono text-xs font-semibold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold mb-1">{s.name}</p>
                  <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            What this isn&apos;t
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            India isn&apos;t one giant scam zone, and most of the country sees almost none of this. The patterns above cluster in tourist-hub nodes — large railway stations, the Delhi-Agra-Jaipur triangle&apos;s busiest cracks, monument exits at Taj Mahal and Hawa Mahal — because that&apos;s where the asymmetry of information is highest. Outside these nodes, in residential cities, in smaller towns, on most overland routes, you&apos;ll mostly experience ordinary kindness.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Treat this guide like seatbelts: standard kit, you put it on without thinking, and the trip goes fine.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/tourist-traps`} className="text-[#E55642] hover:underline">Specific tourist traps and the better alternatives →</Link></li>
            <li><Link href={`/${locale}/guide/currency`} className="text-[#E55642] hover:underline">Money in India →</Link></li>
            <li><Link href={`/${locale}/guide/transport-overview`} className="text-[#E55642] hover:underline">Trains, buses, flights — the right tool by route →</Link></li>
            <li><Link href={`/${locale}/sos`} className="text-[#E55642] hover:underline">SOS numbers by destination →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">Last reviewed {REVIEWED}.</aside>
      </main>
      <Footer />
    </div>
  );
}
