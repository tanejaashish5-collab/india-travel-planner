import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-utils";
import { articleJsonLd } from "@/lib/article-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import { CinematicGuide } from "@/components/cinematic-guide";
import {
  guideProse,
  GuideFaqList,
  GuideCardRow,
  GuideBullets,
} from "@/components/cinematic-guide-helpers";

export const revalidate = 86400;

const REVIEWED = "2026-04-25";

const FAQS = [
  {
    question: "Will I get sick eating in India?",
    answer:
      "Some travelers do, most don't. The risk is real but specific — it's almost always traced to water (tap water, ice from unfiltered sources), or to food that has been sitting at warm ambient temperature for hours. Hot, freshly cooked food at busy local restaurants is the safest category, more so than buffet spreads at over-stocked tourist hotels.",
  },
  {
    question: "Is street food safe?",
    answer:
      "Often safer than tourist-restaurant buffets. The signal is volume: a stall with high local turnover is making fresh food, frying it hard, and not letting it sit. Wait until you've seen 5-10 customers cycle through. Pani puri (the water-filled snack) is the one street item where water-source quality matters most — eat it from established sit-down places. Tawa-cooked items (dosa, chapati, kebabs) are very safe.",
  },
  {
    question: "Should I drink only bottled water?",
    answer:
      "Yes for tap water everywhere except hotel reverse-osmosis stations explicitly marked as filtered. Buy bottled water from established merchants — Bisleri, Kinley, Aquafina are the universal-safe brands; check the seal is intact before opening. A LifeStraw or SteriPen is a good backup for remote travel where bottled supply may be unreliable. Ice in restaurants varies by establishment quality — at upmarket places it's filtered; at modest places, ask.",
  },
  {
    question: "What about raw vegetables and salads?",
    answer:
      "Approach with attention to the venue. Cut fruit and salads at high-end hotels and clean restaurants are usually washed in filtered water. Salads at modest establishments and uncovered cut fruit on the street are higher risk. Cooked vegetables, lentils, rice, breads — all safe. Whole fruits you peel yourself (banana, papaya, oranges) are always safe.",
  },
  {
    question: "Should I take medication preventively for stomach issues?",
    answer:
      "Most travel doctors don't recommend prophylactic antibiotics — they kill protective gut flora. Carry an oral rehydration sachet (ORS), an over-the-counter loperamide for emergencies (long bus rides), and a course of azithromycin from your home doctor in case a more serious bout shows up. Drink more water than you think; eat lighter for 2-3 days when you arrive while your gut adjusts.",
  },
  {
    question: "What about the spice level?",
    answer:
      "Manageable with one rule — pace it. Indian cuisine is regional; not every dish is fiery. Punjabi and South Indian cooking range from mild to fierce; Kerala and Andhra are typically the spiciest. Start with mid-range dishes (dal, chicken curry, paneer) before working up to vindaloo or chettinad. Always pair with rice or roti and yogurt (lassi, raita) — they neutralise capsaicin far more than water does.",
  },
  {
    question: "Is the airport food safe and worth eating?",
    answer:
      "Yes, generally. Major Indian airports have national chains (Cafe Coffee Day, Costa, McDonald's, KFC) plus better-quality local restaurants in international terminals. Hygiene standards are inspected. Vegetarian options are abundant. Worst case it's expensive; rarely is it a health risk.",
  },
  {
    question: "Are there foods I should actively seek out?",
    answer:
      "Worth trying: dosa and idli for breakfast (south); chai from a glass tumbler at any railway station (if you have a clean glass — most travelers manage); paratha-with-pickle in Punjab; thali (set meal) at a busy local restaurant — gives you a survey of regional flavours; Rajasthani dal-baati-churma; Bengali fish curry; biryani from a city famous for it (Hyderabad, Lucknow). Avoid the chain restaurants you'd find anywhere — they're not worth the trip.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Eating safely in India — what to eat, what to skip",
    description:
      "Honest food safety guidance: water, street food, salads, spice, and the regional dishes worth seeking out. Without paranoia.",
    ...localeAlternates(locale, "/guide/food-safety"),
  };
}

export default async function FoodSafetyGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/food-safety`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "Eating safely in India — what to eat, what to skip",
    description:
      "Pragmatic food safety: water, street food, salads, spice, and regional dishes worth seeking.",
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
      { "@type": "ListItem", position: 3, name: "Food safety", item: url },
    ],
  };

  const sections = [
    {
      id: "three-filters",
      title: "The three filters",
      body: (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <GuideCardRow title="Water source">
            Tap water unsafe almost everywhere. Sealed bottled water from
            established brands (Bisleri, Kinley, Aquafina) — check the seal.
            Hotel RO-filtered stations — fine, refill. Ice — a question to ask
            at modest places.
          </GuideCardRow>
          <GuideCardRow title="Volume">
            The fewer customers a stall sees, the longer the food has been
            sitting. High local turnover is the strongest single signal — it
            means freshness.
          </GuideCardRow>
          <GuideCardRow title="Cooking temperature">
            Hot, fresh, freshly fried or tawa-cooked is safe almost regardless
            of venue. Lukewarm or cold prepared food, especially anything
            sitting on a buffet, deserves more scrutiny than the venue&apos;s
            star rating.
          </GuideCardRow>
        </ul>
      ),
    },
    {
      id: "what-to-order",
      title: "What to actually order",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={guideProse}>
            Day 1–2: pace yourself. Dal, rice, simple curries, paratha,
            dosa-idli, lassi, masala chai. Skip raw cut salads at modest places.
            By day 3 your gut is calibrating; you can branch out.
          </p>
          <p style={guideProse}>
            Worth seeking by region: <strong style={{ color: "var(--bone)" }}>Punjab</strong>{" "}
            for paratha, butter chicken; <strong style={{ color: "var(--bone)" }}>South India</strong>{" "}
            for dosa, idli, biryani, kerala fish curry;{" "}
            <strong style={{ color: "var(--bone)" }}>Bengal</strong> for fish,
            sweets; <strong style={{ color: "var(--bone)" }}>Gujarat</strong>{" "}
            for thalis; <strong style={{ color: "var(--bone)" }}>Rajasthan</strong>{" "}
            for dal-baati-churma; <strong style={{ color: "var(--bone)" }}>Hyderabad</strong>{" "}
            for biryani; <strong style={{ color: "var(--bone)" }}>Lucknow</strong>{" "}
            for kebabs and tunde-style cuisine.
          </p>
        </div>
      ),
    },
    {
      id: "what-to-carry",
      title: "What to carry",
      body: (
        <GuideBullets
          items={[
            "Oral rehydration sachets (ORS) — single best thing to have if anything goes wrong.",
            "Loperamide tablets (Imodium) — for emergencies on long bus / flight days.",
            "A 5-day course of azithromycin from your home doctor — for the rare worse case.",
            "Hand sanitiser — handwashing isn't universally available.",
            "Reusable water bottle with a filter (LifeStraw, GRAYL) — reduces single-use plastic dramatically.",
          ]}
        />
      ),
    },
    {
      id: "on-spice",
      title: "On spice",
      body: (
        <p style={guideProse}>
          Indian regional cooking varies dramatically — Kashmiri rogan josh
          isn&apos;t Kerala kallumakkaya — and most of it isn&apos;t the
          wall-of-heat the global stereotype suggests. Order &quot;medium&quot;
          the first day or two and you&apos;ll be fine; ask the restaurant.
          Yogurt-based drinks (lassi, chaas) and raita on the side neutralise
          heat far better than water.
        </p>
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
        kicker={`GUIDES · FOOD & SAFETY · REVIEWED ${REVIEWED}`}
        title="Eating safely in India — without missing what makes it great."
        dek="India is one of the great food cultures on the planet, and the standard advice — 'don't eat anything not in a five-star hotel' — costs you most of what makes the trip memorable. The actual signal is freshness, volume, and water source. Apply those filters and you can eat almost everywhere."
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide/etiquette`,
          title: "India etiquette — temples, dress, dining, gestures.",
        }}
      />
    </>
  );
}
