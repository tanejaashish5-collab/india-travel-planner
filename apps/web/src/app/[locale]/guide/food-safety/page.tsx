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
    title: "Eating safely in India — what to eat, what to skip | NakshIQ",
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
    description: "Pragmatic food safety: water, street food, salads, spice, and regional dishes worth seeking.",
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

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-6 rounded-xl border border-border/40 bg-card/40 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Practical · Food &amp; safety · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India food</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Eating safely in India — without missing what makes it great
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            India is one of the great food cultures on the planet, and the standard advice — &quot;don&apos;t eat anything not in a five-star hotel&quot; — costs you most of what makes the trip memorable. The actual signal is freshness, volume, and water source. Apply those filters and you can eat almost everywhere.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            The three filters
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Water source</p>
              <p className="text-muted-foreground leading-relaxed">
                Tap water unsafe almost everywhere. Sealed bottled water from established brands (Bisleri, Kinley, Aquafina) — check the seal. Hotel RO-filtered stations — fine, refill. Ice — a question to ask at modest places.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Volume</p>
              <p className="text-muted-foreground leading-relaxed">
                The fewer customers a stall sees, the longer the food has been sitting. High local turnover is the strongest single signal — it means freshness.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-background/40 p-4">
              <p className="font-semibold mb-1">Cooking temperature</p>
              <p className="text-muted-foreground leading-relaxed">
                Hot, fresh, freshly fried or tawa-cooked is safe almost regardless of venue. Lukewarm or cold prepared food, especially anything sitting on a buffet, deserves more scrutiny than the venue&apos;s star rating.
              </p>
            </li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            What to actually order
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Day 1-2: pace yourself. Dal, rice, simple curries, paratha, dosa-idli, lassi, masala chai. Skip raw cut salads at modest places. By day 3 your gut is calibrating; you can branch out.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Worth seeking by region: <strong>Punjab</strong> for paratha, butter chicken; <strong>South India</strong> for dosa, idli, biryani, kerala fish curry; <strong>Bengal</strong> for fish, sweets; <strong>Gujarat</strong> for thalis; <strong>Rajasthan</strong> for dal-baati-churma; <strong>Hyderabad</strong> for biryani; <strong>Lucknow</strong> for kebabs and tunde-style cuisine.
          </p>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            What to carry
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Oral rehydration sachets (ORS) — single best thing to have if anything goes wrong.</li>
            <li>• Loperamide tablets (Imodium) — for emergencies on long bus / flight days.</li>
            <li>• A 5-day course of azithromycin from your home doctor — for the rare worse case.</li>
            <li>• Hand sanitiser — handwashing isn&apos;t universally available.</li>
            <li>• Reusable water bottle with a filter (LifeStraw, GRAYL) — reduces single-use plastic dramatically.</li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            On spice
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Indian regional cooking varies dramatically — Kashmiri rogan josh isn&apos;t Kerala kallumakkaya — and most of it isn&apos;t the wall-of-heat the global stereotype suggests. Order &quot;medium&quot; the first day or two and you&apos;ll be fine; ask the restaurant. Yogurt-based drinks (lassi, chaas) and raita on the side neutralise heat far better than water.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/guide/etiquette`} className="text-[#E55642] hover:underline">Etiquette — temples, dress, photography →</Link></li>
            <li><Link href={`/${locale}/guide/scams`} className="text-[#E55642] hover:underline">Common scams to watch →</Link></li>
            <li><Link href={`/${locale}/guide/packing`} className="text-[#E55642] hover:underline">Packing for India by region →</Link></li>
            <li><Link href={`/${locale}/cost-index`} className="text-[#E55642] hover:underline">Cost index — typical daily spend →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">Last reviewed {REVIEWED}.</aside>
      </main>
      <Footer />
    </div>
  );
}
