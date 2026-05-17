import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-utils";
import { articleJsonLd } from "@/lib/article-schema";
import { faqPageJsonLd } from "@/lib/faq-schema";
import { getPrimaryEditor } from "@/lib/editor";
import { CinematicGuide } from "@/components/cinematic-guide";
import {
  guideProse,
  GuideBullets,
  GuideCardRow,
  GuideFaqList,
} from "@/components/cinematic-guide-helpers";

export const revalidate = 86400;

const REVIEWED = "2026-04-25";

const FAQS = [
  {
    question: "What should I pack for India in summer (March-June)?",
    answer:
      "Lightweight cotton or linen shirts and trousers — not synthetic. Loose, breathable, sun-protective. A long scarf or shawl for temple cover, A/C buses, and chilly evenings in hill destinations. A wide-brim sun hat. Reef-safe sunscreen (SPF 30+) and re-applicable lip balm. Sunglasses with UV protection. A reusable water bottle. Hand sanitiser. ORS sachets. If heading to the desert (Rajasthan), add a lightweight headwrap.",
  },
  {
    question: "What about monsoon (July-September)?",
    answer:
      "Quick-dry pants and tops over cotton (which stays damp for days). A compact rain jacket or poncho — far more useful than an umbrella because of wind. Waterproof or quick-dry shoes (sandals are popular but slippery on wet stone). A dry-bag for electronics. Mosquito repellent (DEET-based). Moisture-wicking socks. The hill stations stay cool; pack at least one warm layer if heading to Manali, Munnar, Coorg.",
  },
  {
    question: "And winter (October-February)?",
    answer:
      "Highly region-dependent. Plains (Delhi, Rajasthan): A jacket for early morning and evening, layers for midday warmth. Hills (Manali, Mussoorie, Darjeeling): A proper down or fleece insulation layer, gloves, warm hat. Ladakh in winter (December-February): Expedition-grade — down to -25C is normal; serious thermal base layers, insulated boots, balaclava. The South stays warm year-round; pack as for summer.",
  },
  {
    question: "Are there altitude-specific considerations?",
    answer:
      "Yes. Above 3,000m (Ladakh, Spiti, Sikkim trek bases, Nathu La), pack thermal base layers regardless of season — it's cold morning and night. Sunscreen at altitude is critical because UV is amplified. A diamox-eligible blister pack from your home doctor (consult them first) handles AMS prevention. Lip balm with sun protection. A headlamp for power-cut evenings.",
  },
  {
    question: "What footwear works best?",
    answer:
      "Two pairs is usually right: comfortable walking shoes (sneakers or trail runners) for daily wear, and slip-on sandals for temple visits and bathroom trips. Hiking boots only if you're trekking; they're heavy otherwise. Avoid heels — Indian streets are uneven. Flip-flops for hotel showers (cleanliness varies). Whatever you pick, break it in before you fly.",
  },
  {
    question: "What about medications and a first-aid kit?",
    answer:
      "Bring: ORS sachets, loperamide (Imodium), painkillers (paracetamol/acetaminophen), antihistamines, motion-sickness tablets, antibiotic ointment, plasters, blister care, tweezers. From your home doctor: a 5-day course of azithromycin, diamox if heading high, malaria prophylaxis only if going to specific high-risk regions (most tourist circuits don't require it). Indian pharmacies stock most over-the-counter equivalents and many prescription drugs are available without a script — but starting with what you know is simpler.",
  },
  {
    question: "Will my electronics work? What about adapters?",
    answer:
      "India uses Type C, D, and M plugs at 230V/50Hz. A universal travel adapter is the safe bet. Most modern phone, laptop, and camera chargers handle 100-240V — check the label. Power banks (under 100Wh) are allowed in carry-on; larger ones may not fly. Surge protection isn't guaranteed at modest hotels — a small surge protector on a multi-week trip pays for itself once. eSIM-capable phone is a small bonus given how easy domestic SIMs are.",
  },
  {
    question: "What's worth NOT packing?",
    answer:
      "Heavy denim — too hot, too slow to dry. Bulky toiletries — buy locally cheap and avoid liquid-restriction hassles. Towels — most hotels provide, the rare hostel exception is easy to handle with a quick-dry travel towel. A formal shirt/dress unless you have a specific event. Drone (unless you have advance DGCA permission). Disposable plastic — increasingly restricted. Walking poles unless you're trekking.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Packing for India by region and season",
    description:
      "What to pack for India: summer, monsoon, winter, by region. Plus altitude considerations, electronics, footwear, medications.",
    ...localeAlternates(locale, "/guide/packing"),
  };
}

export default async function PackingGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/packing`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "Packing for India by region and season",
    description:
      "Region-specific and season-specific packing for India, with altitude and monsoon considerations.",
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
      { "@type": "ListItem", position: 3, name: "Packing", item: url },
    ],
  };

  const sections = [
    {
      id: "universal-kit",
      title: "Universal kit (any trip)",
      body: (
        <GuideBullets
          items={[
            <><strong style={{ color: "var(--bone)" }}>Clothing core:</strong> 4-5 cotton/linen tops, 2 pairs trousers, 1 dressy outfit, modesty layer (long scarf or shawl).</>,
            <><strong style={{ color: "var(--bone)" }}>Footwear:</strong> Comfortable walking shoes, slip-on sandals for temples, flip-flops for hotel showers.</>,
            <><strong style={{ color: "var(--bone)" }}>Toiletries:</strong> Reef-safe sunscreen SPF 30+, lip balm with SPF, hand sanitiser, basic toiletries (buy bulk locally).</>,
            <><strong style={{ color: "var(--bone)" }}>Health kit:</strong> ORS, loperamide, paracetamol, motion-sickness tablets, antihistamine, plasters. From doctor: 5-day azithromycin course.</>,
            <><strong style={{ color: "var(--bone)" }}>Electronics:</strong> Universal travel adapter (Type C/D/M, 230V), power bank (under 100Wh), reusable water bottle.</>,
            <><strong style={{ color: "var(--bone)" }}>Documents:</strong> Passport with visa, photocopy of bio page (separate), travel insurance details, hotel confirmations.</>,
            <><strong style={{ color: "var(--bone)" }}>Comfort:</strong> Sleep mask + earplugs (overnight trains, hotels with thin walls), small daypack, packing cubes if you like them.</>,
          ]}
        />
      ),
    },
    {
      id: "by-region",
      title: "By region",
      body: (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <GuideCardRow title="North plains (Delhi, Agra, Jaipur, Varanasi)">
            Summer (Apr–Jun): hottest in India, 40–45°C. Sun protection critical.
            Winter (Dec–Feb): cold mornings (5–10°C), warm midday — pack layers.
            Monsoon (Jul–Sep): humid, sticky, occasional flooding.
          </GuideCardRow>
          <GuideCardRow title="Himalayas (Himachal, Uttarakhand, Sikkim, Northeast hills)">
            Summer (Apr–Jun): cool to warm, perfect weather, 15–25°C.
            Monsoon (Jul–Sep): heavy rain, landslide risk.
            Winter (Dec–Mar): properly cold, snow at higher elevations. Pack
            layers always; the temperature swing morning-to-noon is dramatic.
          </GuideCardRow>
          <GuideCardRow title="Ladakh and Spiti (high altitude desert)">
            Summer (May–Sep, the only practical season for tourism): warm days,
            freezing nights, intense UV. Thermal base layers. Sunglasses
            category 3+. Lip balm. Winter (Oct–Apr): expedition-grade gear;
            most travelers don&apos;t go.
          </GuideCardRow>
          <GuideCardRow title="South (Kerala, Tamil Nadu, Karnataka, Goa)">
            Hot and humid most of the year, 25–35°C. Cotton, breathable.
            Beachwear stays at the beach. Hill stations (Munnar, Coorg, Ooty)
            stay 15–25°C — one warm layer.
          </GuideCardRow>
          <GuideCardRow title="Rajasthan and the desert">
            Hot summer (45°C+), surprisingly cold winter nights (5°C). Headwrap
            helps with sand and sun. Always carry water in winter desert nights
            — dehydration risk doesn&apos;t pause for cold.
          </GuideCardRow>
        </ul>
      ),
    },
    {
      id: "altitude",
      title: "Altitude additions",
      body: (
        <p style={guideProse}>
          Above 3,000m: thermal base layer, lip balm with SPF, headlamp (power
          cuts common), diamox course from your home doctor (taken before
          ascent). UV at altitude is amplified — sunscreen is non-negotiable.
          Sleeping cold is normal the first night or two; layer up.
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
        kicker={`GUIDES · PACKING · REVIEWED ${REVIEWED}`}
        title="Packing for India by region and season."
        dek="India runs from −25°C in Ladakh winter to 45°C in Rajasthan summer. Your packing list depends entirely on which slice of the country and which slice of the calendar you're hitting. This is the framework — fill it in once you've picked the route."
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide/etiquette`,
          title: "India etiquette — what to know, what relaxes.",
        }}
      />
    </>
  );
}
