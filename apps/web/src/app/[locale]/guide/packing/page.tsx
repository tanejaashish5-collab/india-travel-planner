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
      "Yes. Above 3,000m (Ladakh, Spiti, Sikkim trek bases, Nathu La), pack thermal base layers regardless of season — it&apos;s cold morning and night. Sunscreen at altitude is critical because UV is amplified. A diamox-eligible blister pack from your home doctor (consult them first) handles AMS prevention. Lip balm with sun protection. A headlamp for power-cut evenings.",
  },
  {
    question: "What footwear works best?",
    answer:
      "Two pairs is usually right: comfortable walking shoes (sneakers or trail runners) for daily wear, and slip-on sandals for temple visits and bathroom trips. Hiking boots only if you&apos;re trekking; they&apos;re heavy otherwise. Avoid heels — Indian streets are uneven. Flip-flops for hotel showers (cleanliness varies). Whatever you pick, break it in before you fly.",
  },
  {
    question: "What about medications and a first-aid kit?",
    answer:
      "Bring: ORS sachets, loperamide (Imodium), painkillers (paracetamol/acetaminophen), antihistamines, motion-sickness tablets, antibiotic ointment, plasters, blister care, tweezers. From your home doctor: a 5-day course of azithromycin, diamox if heading high, malaria prophylaxis only if going to specific high-risk regions (most tourist circuits don&apos;t require it). Indian pharmacies stock most over-the-counter equivalents and many prescription drugs are available without a script — but starting with what you know is simpler.",
  },
  {
    question: "Will my electronics work? What about adapters?",
    answer:
      "India uses Type C, D, and M plugs at 230V/50Hz. A universal travel adapter is the safe bet. Most modern phone, laptop, and camera chargers handle 100-240V — check the label. Power banks (under 100Wh) are allowed in carry-on; larger ones may not fly. Surge protection isn&apos;t guaranteed at modest hotels — a small surge protector on a multi-week trip pays for itself once. eSIM-capable phone is a small bonus given how easy domestic SIMs are.",
  },
  {
    question: "What's worth NOT packing?",
    answer:
      "Heavy denim — too hot, too slow to dry. Bulky toiletries — buy locally cheap and avoid liquid-restriction hassles. Towels — most hotels provide, the rare hostel exception is easy to handle with a quick-dry travel towel. A formal shirt/dress unless you have a specific event. Drone (unless you have advance DGCA permission). Disposable plastic — increasingly restricted. Walking poles unless you&apos;re trekking.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Packing for India by region and season | NakshIQ",
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
    description: "Region-specific and season-specific packing for India, with altitude and monsoon considerations.",
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

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Practical · Packing · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India packing</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Packing for India by region and season
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            India runs from -25°C in Ladakh winter to 45°C in Rajasthan summer. Your packing list depends entirely on which slice of the country and which slice of the calendar you&apos;re hitting. This is the framework — fill it in once you&apos;ve picked the route.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Universal kit (any trip)
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• <strong>Clothing core:</strong> 4-5 cotton/linen tops, 2 pairs trousers, 1 dressy outfit, modesty layer (long scarf or shawl).</li>
            <li>• <strong>Footwear:</strong> Comfortable walking shoes, slip-on sandals for temples, flip-flops for hotel showers.</li>
            <li>• <strong>Toiletries:</strong> Reef-safe sunscreen SPF 30+, lip balm with SPF, hand sanitiser, basic toiletries (buy bulk locally).</li>
            <li>• <strong>Health kit:</strong> ORS, loperamide, paracetamol, motion-sickness tablets, antihistamine, plasters. From doctor: 5-day azithromycin course.</li>
            <li>• <strong>Electronics:</strong> Universal travel adapter (Type C/D/M, 230V), power bank (under 100Wh), reusable water bottle.</li>
            <li>• <strong>Documents:</strong> Passport with visa, photocopy of bio page (separate), travel insurance details, hotel confirmations.</li>
            <li>• <strong>Comfort:</strong> Sleep mask + earplugs (overnight trains, hotels with thin walls), small daypack, packing cubes if you like them.</li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            By region
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">North plains (Delhi, Agra, Jaipur, Varanasi)</p>
              <p className="text-muted-foreground leading-relaxed">
                Summer (Apr-Jun): hottest in India, 40-45°C. Sun protection critical. Winter (Dec-Feb): cold mornings (5-10°C), warm midday — pack layers. Monsoon (Jul-Sep): humid, sticky, occasional flooding.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Himalayas (Himachal, Uttarakhand, Sikkim, Northeast hills)</p>
              <p className="text-muted-foreground leading-relaxed">
                Summer (Apr-Jun): cool to warm, perfect weather, 15-25°C. Monsoon (Jul-Sep): heavy rain, landslide risk. Winter (Dec-Mar): properly cold, snow at higher elevations. Pack layers always; the temperature swing morning-to-noon is dramatic.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Ladakh and Spiti (high altitude desert)</p>
              <p className="text-muted-foreground leading-relaxed">
                Summer (May-Sep, the only practical season for tourism): warm days, freezing nights, intense UV. Thermal base layers. Sunglasses category 3+. Lip balm. Winter (Oct-Apr): expedition-grade gear; most travelers don&apos;t go.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">South (Kerala, Tamil Nadu, Karnataka, Goa)</p>
              <p className="text-muted-foreground leading-relaxed">
                Hot and humid most of the year, 25-35°C. Cotton, breathable. Beachwear stays at the beach. Hill stations (Munnar, Coorg, Ooty) stay 15-25°C — one warm layer.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Rajasthan and the desert</p>
              <p className="text-muted-foreground leading-relaxed">
                Hot summer (45°C+), surprisingly cold winter nights (5°C). Headwrap helps with sand and sun. Always carry water in winter desert nights — dehydration risk doesn&apos;t pause for cold.
              </p>
            </li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Altitude additions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Above 3,000m: thermal base layer, lip balm with SPF, headlamp (power cuts common), diamox course from your home doctor (taken before ascent). UV at altitude is amplified — sunscreen is non-negotiable. Sleeping cold is normal the first night or two; layer up.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/where-to-go`} className="text-[#E55642] hover:underline">Where to go this month →</Link></li>
            <li><Link href={`/${locale}/guide/visa`} className="text-[#E55642] hover:underline">Tourist visa →</Link></li>
            <li><Link href={`/${locale}/guide/food-safety`} className="text-[#E55642] hover:underline">Eating safely →</Link></li>
            <li><Link href={`/${locale}/guide/etiquette`} className="text-[#E55642] hover:underline">Cultural etiquette →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">Last reviewed {REVIEWED}.</aside>
      </main>
      <Footer />
    </div>
  );
}
