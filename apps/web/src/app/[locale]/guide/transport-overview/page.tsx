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
    name: "For long routes (500-2,000 km), book an overnight train",
    text:
      "The Indian Railways sleeper or 2AC class is the canonical long-haul option — cheaper than flights, more authentic than buses, and you wake up there. Book at irctc.co.in or via ConfirmTKT/ixigo apps. 2AC class (2-tier sleeper, A/C, curtained) is the foreigner-friendly default. Sleeper class (no A/C, 3-tier bunks) is cheaper but social.",
  },
  {
    name: "For short hops (50-300 km), buses or shared cabs",
    text:
      "State-run government buses (HRTC, KSRTC, RSRTC, etc.) are reliable. Private operators on RedBus and AbhiBus offer Volvo A/C sleeper/semi-sleeper. Shared SUVs work in hill states (Himachal, Uttarakhand, Sikkim, Northeast) for routes trains don't reach.",
  },
  {
    name: "For long-haul time-critical routes, fly",
    text:
      "IndiGo, Air India, Vistara (now Air India), Akasa, SpiceJet cover the major hub-to-hub network. Domestic fares typically ₹3,500-6,500 booked 2-4 weeks ahead. Same-day prices spike sharply. Book direct on the airline site — third-party fees are real.",
  },
  {
    name: "Within cities, ride-share apps",
    text:
      "Uber, Ola, and Rapido (auto-rickshaws + bikes) cover the top 30 cities. Fares are transparent, drivers tracked, no negotiation. Auto-rickshaws on the apps are typically half the cab fare for the same route.",
  },
  {
    name: "For unique route classes, the right special service",
    text:
      "Tatkal quota: emergency same-day train tickets, opens exactly 24h before departure. Foreign Tourist Quota (FTQ): a small reserved-quota of seats for foreign passport holders, bookable with passport at IRCTC zonal offices. Vande Bharat: India's premium high-speed inter-city service on select routes. Konkan Railway between Mumbai and Mangalore is a scenic must-experience leg.",
  },
  {
    name: "On highways, hire a car with driver — don't self-drive",
    text:
      "Self-driving as a tourist is rarely worth it: traffic norms differ, fuel logistics are foreign, and breakdown recovery off-grid is hard. A car with driver runs ₹2,500-4,500 per day for an A/C sedan or SUV in tourist circuits. Multi-day rates negotiate down. Use established operators (Savaari, Zoom, your hotel's preferred) over street agents.",
  },
];

const FAQS = [
  {
    question: "Train, bus, or flight — what's the rule of thumb?",
    answer:
      "Under 300km: bus or shared cab. 300-1500km: overnight train (saves a hotel night, you arrive rested). Over 1500km: fly, unless the train is the experience itself (Konkan, Darjeeling, Kalka-Shimla). Within cities: Uber/Ola/Rapido apps. The math is mostly about your time-vs-money trade-off and whether you want the train as a cultural experience.",
  },
  {
    question: "What's the safest train class for a foreigner?",
    answer:
      "2AC (Two-tier A/C) — air-conditioned, curtained bunks, two per bay, cleanest of the sleeper classes, well-lit at night. 3AC (three-tier A/C) is fine and cheaper but more crowded. Sleeper Class (SL) is the cheapest non-A/C option; experienced India travelers and budget backpackers do this, but it's a more social and unfiltered experience. Avoid Unreserved (general) class with luggage.",
  },
  {
    question: "How do I book a train? Is IRCTC English-friendly?",
    answer:
      "irctc.co.in works in English. Foreign tourists need to register with passport details — about 10 minutes once. ConfirmTKT and ixigo apps are easier interfaces over the same data. Book opens 120 days ahead for most trains. Tatkal (24-hour-out emergency quota) opens at 10am IST for AC classes, 11am for non-AC, and sells out in seconds. The Foreign Tourist Quota is the alternative for last-minute foreigners with passport.",
  },
  {
    question: "Are domestic flights worth it?",
    answer:
      "For coverage and time-saving, yes. India's six major domestic carriers (IndiGo, Air India, Vistara/AI, Akasa, SpiceJet, AIX Connect) cover 100+ airports. Tier-1 to tier-1 routes are well-priced 2-4 weeks ahead. Tier-2 to tier-1 routes can be expensive — sometimes a train is faster door-to-door once you factor airport time. IndiGo runs the most reliable schedule.",
  },
  {
    question: "How does Uber and Ola actually work in India?",
    answer:
      "Same as anywhere else with two notes. First, you can pay cash to the driver — useful if your card hasn't whitelisted India yet. Second, both apps offer auto-rickshaw rides at half the cab price for the same route — it's the smart-budget choice for short city hops. Rapido is bike-taxi (one passenger on the back of a motorbike) and shines in traffic, less so for luggage.",
  },
  {
    question: "What about overland border crossings?",
    answer:
      "India has open road borders to Nepal (Sunauli, Raxaul, Banbasa) and Bhutan (Phuentsholing). The land border with Pakistan at Wagah is open only to nationals of the two countries. Bangladesh borders are open at limited posts (Petrapole-Benapole, Akhaura, Dawki) but require pre-issued visas; check the most recent advisory. Myanmar's land border is intermittent. The land borders to China are closed.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Getting around India — trains, buses, flights, ride-share | NakshIQ",
    description:
      "The right transport mode by distance and route. IRCTC tactics, foreign-tourist quota, when to fly, when to bus, when to take a car-and-driver.",
    ...localeAlternates(locale, "/guide/transport-overview"),
  };
}

export default async function TransportGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/transport-overview`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const howToLd = howToJsonLd({
    url,
    name: "Choosing the right transport in India",
    description:
      "When to fly, train, bus, or take a car-with-driver in India. Step-by-step decision logic.",
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
      { "@type": "ListItem", position: 3, name: "Transport", item: url },
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
            Practical · Transport · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India transport</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Trains, buses, flights, ride-share — when to use what
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            India runs one of the largest passenger railway networks on the planet, six major domestic airlines, organised state-bus systems in every state, and full Uber/Ola/Rapido coverage in 30+ cities. The decision isn&apos;t which exists — it&apos;s which is right for the leg you&apos;re planning.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            The decision logic
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
            Things that catch first-timers out
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Train tickets sometimes show as &quot;waitlist&quot; at booking. Most clear by departure; check 4 hours before. Tatkal opens exactly 24h before — set an alarm.</li>
            <li>• Domestic flight gates close 25 minutes before departure. Indian airport security has separate domestic and international zones — make sure you&apos;re at the right one.</li>
            <li>• Long-distance bus arrival times are loose. Schedule a 2-3 hour buffer to your next leg.</li>
            <li>• A car-with-driver is paid by you per day; the driver is usually paid a small daily allowance plus tip — budget ₹500-1000/day for the latter.</li>
            <li>• Train station departure boards refresh slowly — confirm the platform on the station&apos;s announcement boards or via NTES app.</li>
          </ul>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/guide/book-indian-trains`} className="text-[#E55642] hover:underline">Booking Indian trains as a foreigner — full guide →</Link></li>
            <li><Link href={`/${locale}/arrival`} className="text-[#E55642] hover:underline">Arrival playbooks for 9 airports →</Link></li>
            <li><Link href={`/${locale}/guide/scams`} className="text-[#E55642] hover:underline">Common transport scams →</Link></li>
            <li><Link href={`/${locale}/road-conditions`} className="text-[#E55642] hover:underline">Road conditions, real-time →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">Last reviewed {REVIEWED}.</aside>
      </main>
      <Footer />
    </div>
  );
}
