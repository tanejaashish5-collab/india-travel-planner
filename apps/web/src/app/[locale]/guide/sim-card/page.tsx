import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-utils";
import { articleJsonLd } from "@/lib/article-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import { CinematicGuide } from "@/components/cinematic-guide";
import {
  guideProse,
  GuideCardRow,
  GuideBullets,
  GuideFaqList,
} from "@/components/cinematic-guide-helpers";

export const revalidate = 86400;

const REVIEWED = "2026-04-25";

const FAQS = [
  {
    question: "Can I get an Indian SIM card as a foreign tourist?",
    answer:
      "Yes. The three big networks — Airtel, Jio, and Vi — all sell tourist plans to foreign visitors with a valid passport, visa stamp, and one Indian address (a hotel works). Activation is typically same-day; in rare cases up to 24 hours, mostly because of the OTP-verification step. Pre-paid only — post-paid requires longer-term local documentation.",
  },
  {
    question: "Where should I buy my SIM card?",
    answer:
      "Three good options: 1) Airport kiosks at major arrivals (Delhi T3, Mumbai T2, Bengaluru, Hyderabad, Kochi) — fastest but most expensive. 2) Official network stores in any city — best plan range, English-speaking staff. 3) An authorised retailer where your hotel suggests — cheapest but documentation can be slower. Avoid pavement vendors; the SIM may not activate.",
  },
  {
    question: "How much data do tourist plans actually give you?",
    answer:
      "A typical 28-day pre-paid plan from any of the three majors offers 1.5-2 GB per day plus unlimited calls within India. That's enough to navigate, video-call, stream lightly, and use ride-share apps. If you're working remotely or live-streaming, look for the higher-tier plans (3 GB/day) or top up data packs. Coverage is good in cities and most of the southern and western states, patchier in the Northeast and remote Himalayas.",
  },
  {
    question: "Will my home SIM work in India?",
    answer:
      "International roaming works on most carriers but is expensive (often $5-15/day). Some travelers keep their home SIM for the OTP-verifications they need (banking, etc.) and add a cheap Indian SIM for daily data. Make sure your phone is unlocked before you fly — most modern phones are, but check.",
  },
  {
    question: "Which network has the best coverage where I'm going?",
    answer:
      "Jio has the broadest 4G/5G footprint, including most of Ladakh, Spiti, and the Northeast hill states — but coverage even there can drop in deep valleys. Airtel is comparable in cities, sometimes weaker in the remote Northeast. Vi is generally fine in cities but less reliable for remote travel. If you're heading high or far, Jio is the safer default; carry a sat-comm device for true wilderness.",
  },
  {
    question: "Do I need eSIM or physical SIM?",
    answer:
      "Both are available. Physical SIMs are easier to source at airport kiosks; eSIMs from Jio and Airtel are available via their apps but the activation flow can be unfriendly to foreign-passport users. If you have a single-SIM phone, an eSIM lets you keep your home line active. Most tourists go physical for simplicity.",
  },
  {
    question: "How long does activation take?",
    answer:
      "On the spot at airport kiosks (5-15 minutes). At a city store, 30-60 minutes for the documentation and OTP loop. In rare cases — usually a passport-name mismatch or a port-out-database flag — activation can take up to 24 hours. Always activate before you leave the city; remote networks won't complete the OTP step if your tower is patchy.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India SIM card and mobile data — how it actually works",
    description:
      "Airtel vs Jio vs Vi for tourists, where to buy, what plans give, OTP and activation gotchas, coverage in remote regions.",
    ...localeAlternates(locale, "/guide/sim-card"),
  };
}

export default async function SimCardGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/sim-card`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "India SIM card and mobile data — how it actually works",
    description:
      "Airtel vs Jio vs Vi for tourists, where to buy, plan ranges, activation gotchas.",
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
      { "@type": "ListItem", position: 3, name: "SIM card guide", item: url },
    ],
  };

  const sections = [
    {
      id: "networks",
      title: "The three networks",
      body: (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <GuideCardRow title="Jio">
            Broadest 4G/5G footprint, especially outside metros. Best default
            if you&apos;re heading to Ladakh, Spiti, or the Northeast hill
            states. Activation flow is decent. Tourist plans run 28–90 days.
          </GuideCardRow>
          <GuideCardRow title="Airtel">
            Comparable to Jio in cities, slightly more polished customer
            service. Coverage in remote NE / high-Himalaya is patchier. Their
            tourist-counter staff at major airports tend to be the most
            efficient.
          </GuideCardRow>
          <GuideCardRow title="Vi (Vodafone Idea)">
            Fine in cities, weaker outside. Pick this only if Jio and Airtel
            are sold out at your kiosk — rare.
          </GuideCardRow>
        </ul>
      ),
    },
    {
      id: "where-to-buy",
      title: "Where to buy",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            <strong style={{ color: "var(--bone)" }}>Airport kiosk on arrival.</strong>{" "}
            Fastest, most expensive. The networks all have counters at Delhi T3,
            Mumbai T2, Bengaluru, Hyderabad, Chennai, Kochi, Goa, and most
            other international gates. 5–15 minutes start to finish. You&apos;ll
            pay roughly 2x the city-store price for the same plan, but you
            walk out with data. Worth it for the first 28 days.
          </p>
          <p style={guideProse}>
            <strong style={{ color: "var(--bone)" }}>Official network store in a city.</strong>{" "}
            Best plan range, lowest price. Find the official-branded store
            (Airtel Stores, Jio Stores, etc.) — not a phone-repair shop with
            a poster. Documentation takes 30–60 minutes. Bring your passport,
            visa-stamped passport page, and one Indian address (your hotel works).
          </p>
          <p style={guideProse}>
            <strong style={{ color: "var(--bone)" }}>Hotel-recommended retailer.</strong>{" "}
            Cheapest. Slower because the retailer often relays paperwork to the
            formal channel. Acceptable if you have time; skip if you arrived
            after 8pm.
          </p>
        </div>
      ),
    },
    {
      id: "plans",
      title: "What plans actually give you",
      body: (
        <p style={guideProse}>
          A standard 28-day pre-paid plan from any of the three offers 1.5–2 GB
          of data per day plus unlimited calls within India and 100 SMS.
          That&apos;s plenty for navigation, ride-share apps, and video calls.
          If you&apos;re working remotely, look at the 3 GB/day variants.
          International calls and SMS are a separate top-up — and expensive.
        </p>
      ),
    },
    {
      id: "gotchas",
      title: "What catches people out",
      body: (
        <GuideBullets
          items={[
            "Activation OTP fails because the airport tower is patchy — wait until you're in a hotel before completing setup.",
            "Passport-name mismatch between visa and SIM form (extra middle name etc.) — fix on the form, not later.",
            "Pre-paid plans are calendar-based — they expire even if you didn't use the data.",
            "Some apps (banking, ride-share) require an Indian number for OTP — get the SIM in your first 24 hours.",
            "Jio in particular blocks WhatsApp calling on some plans — verify with the kiosk before paying.",
          ]}
        />
      ),
    },
    {
      id: "faqs",
      title: "Frequently asked",
      body: <GuideFaqList faqs={FAQS} />,
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
        kicker={`GUIDES · CONNECTIVITY · REVIEWED ${REVIEWED}`}
        title="Indian SIM card — what to buy and where to buy it."
        dek="India runs three big mobile networks. All three sell tourist SIMs. The choice that matters most isn't which network — it's where you buy it. Airport kiosk, city store, or hotel-recommended retailer all work; the trade-off is speed versus price."
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide/currency`,
          title: "Paying for things in India — UPI, cards, ATMs, cash.",
        }}
      />
    </>
  );
}
