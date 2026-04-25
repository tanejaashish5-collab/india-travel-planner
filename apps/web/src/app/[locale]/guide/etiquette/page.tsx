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
    question: "Do I need to dress conservatively in India?",
    answer:
      "Outside metro centres and beach destinations, yes — covered shoulders and knees for both men and women is the simple default. In Mumbai, Delhi, Bengaluru, and Goa beach areas, casual western dress is fine. Temples, mosques, gurudwaras, and rural villages all expect modest dress regardless of city. A long scarf or shawl in your day bag handles all of this.",
  },
  {
    question: "What's the rule for entering temples and religious sites?",
    answer:
      "Remove shoes (always). Cover shoulders and knees (universal). Cover head — required at gurudwaras (Sikh temples), expected at some Hindu temples like Tirumala. Some temples don't allow leather (belts, wallets, watches with leather straps) — usually marked at entry. Photography rules vary; many sanctums are no-photo zones marked with signs. Walk clockwise around inner sanctums (pradakshina). Don't touch sacred objects unless invited. Voices low.",
  },
  {
    question: "Is it okay to take photos of people?",
    answer:
      "Ask first, especially with women, children, and at religious sites. A smile and gesture toward the camera is usually enough. People in tourist towns often expect a small tip after agreeing to a photo (₹50-100); decline politely if you'd rather not. Don't photograph military installations, airports, train stations (unauthorised), bridges, or any signed restricted area. Funeral processions: never.",
  },
  {
    question: "How do I greet people?",
    answer:
      "Namaste (palms together at chest, slight bow) is universally appropriate and the most respectful default. Handshakes are fine in business and urban settings; many men and women shake. Hugs are reserved for family. Across most of India, women may not initiate physical contact with men they don't know, and vice-versa. When in doubt, namaste.",
  },
  {
    question: "What's the dining etiquette?",
    answer:
      "Eat with your right hand only — the left is traditionally considered unclean. Most non-veg restaurants and modern Indian restaurants serve with cutlery, but at thali / regional places, hands are normal. Don't share food from your plate (it's considered jhootha, mouth-touched, and unclean for others). Tip 10% if no service charge. Removing shoes before entering a home is standard.",
  },
  {
    question: "How should I behave at someone's home?",
    answer:
      "Bring a small gift — sweets, fruits, or a token from your country (chocolate, regional craft). Refuse food or drink politely twice; accept on the third offer. Remove shoes at the door. If meeting elders, slight head-bow or the traditional touching-of-feet gesture is profoundly meaningful — though not expected of foreigners. Don't leave food on your plate; it's considered wasteful.",
  },
  {
    question: "Are there gestures or behaviours to avoid?",
    answer:
      "Pointing with one finger — use the open hand instead. Showing the soles of your feet at someone, especially elders or sacred objects — keep feet tucked away when seated. Public displays of affection (kissing, prolonged hugging) — uncommon outside metros, can attract attention. Stepping over food or sacred items — move around. Nodding 'no' is sometimes a yes (the famous head wobble) — context will tell.",
  },
  {
    question: "Is tipping expected? When?",
    answer:
      "Restaurants: 10% if no service charge already added. Hotel staff: ₹100/bag for porters, ₹100-200/night for housekeeping. Drivers on multi-day trips: ₹500-1000/day plus their meal allowance. Guides: ₹500 half-day, ₹1000 full-day. Auto/cab drivers via app: not required, rounding up appreciated. Temple priests if they perform a personal blessing: ₹100-300 (in their plate, not their hand).",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India etiquette — temples, dress, dining, gestures | NakshIQ",
    description:
      "Practical cultural etiquette without stereotypes — how to dress, greet, eat, photograph, and behave at religious sites and in homes.",
    ...localeAlternates(locale, "/guide/etiquette"),
  };
}

export default async function EtiquetteGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const editor = await getPrimaryEditor();

  const url = `https://www.nakshiq.com/${locale}/guide/etiquette`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const articleLd = articleJsonLd({
    url,
    headline: "India etiquette — temples, dress, dining, gestures",
    description: "Practical cultural etiquette: dress, greetings, dining, religious sites, photography.",
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
      { "@type": "ListItem", position: 3, name: "Etiquette", item: url },
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
            Practical · Etiquette · Reviewed {REVIEWED}
          </div>
        </div>

        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary/70">India etiquette</p>
          <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            India etiquette — what to know, what relaxes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            India is a culture of polite specificity. The country is more relaxed than most travel-blog warnings suggest about most things, and more specific than they suggest about a few — temples, dining, photography. Get the few right and the rest takes care of itself.
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Dress: simpler than you&apos;ve been told
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cover shoulders and knees outside metro centres and beach destinations — that&apos;s most of the rule. In Mumbai, Delhi, Bengaluru, and Goa, casual western dress fits in. Temples, mosques, gurudwaras, and rural villages expect modest cover regardless. A long scarf or shawl in your day bag covers all transitions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Loose breathable cotton or linen handles the climate better than synthetic fabrics; pack accordingly. Beachwear stays at the beach; don&apos;t walk through villages in swimwear.
          </p>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Religious sites
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Shoes off, always. Shoulders and knees covered. Head covered at gurudwaras (a long scarf works) and at some Hindu temples. Photography varies — many inner sanctums are off-limits, marked. Walk clockwise around shrines (pradakshina). Voices low.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Mosques: women may need a head-cover; some don&apos;t allow non-Muslim entry. Buddhist monasteries: walk clockwise around prayer wheels and stupas; don&apos;t touch sacred objects without invitation. Sikh gurudwaras: covered head, shoes off, hands washed; everyone&apos;s welcome including non-Sikhs, and the langar (free communal meal) is genuinely worth experiencing.
          </p>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Photography
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Ask first when photographing people, especially women, children, and at religious sites.</li>
            <li>• Some subjects expect a small tip after agreeing — decline politely if you&apos;d rather not.</li>
            <li>• No-photo signs at temples, museums, military zones, train stations (unauthorised), bridges, government buildings.</li>
            <li>• Funeral processions: never. Temple sanctums: usually never.</li>
            <li>• Drone permissions are tightening — check current DGCA rules before flying anywhere.</li>
          </ul>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Dining
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Right hand only at thalis and traditional places — left is traditionally considered unclean for eating. Don&apos;t share food from your plate (it&apos;s considered jhootha — mouth-touched — and unclean for the next person). Tipping 10% at restaurants if no service charge already added. At someone&apos;s home, polite refusal twice and acceptance on the third offer is the conventional dance.
          </p>

          <h2 className="font-serif italic text-2xl mb-3 mt-10" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Greetings, gestures, and the head wobble
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Namaste — palms together at chest, slight bow — is the most respectful default and works in any setting. Handshakes are common in business and urban settings; many women and men shake. Across most of India, opposite-sex public physical contact between strangers is unusual.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The Indian head wobble is the famous source of confusion — a side-to-side tilt that can mean &quot;yes&quot;, &quot;I understand&quot;, &quot;maybe&quot;, or &quot;okay, sure&quot; depending on the speed and context. Mostly it means engaged listening and approximate agreement. You&apos;ll calibrate within a few days.
          </p>
        </article>

        <div className="mt-12 rounded-xl border border-border bg-card/50 p-5 sm:p-6">
          <h2 className="font-serif italic font-medium text-xl sm:text-2xl mb-3" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Related</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/guide/packing`} className="text-[#E55642] hover:underline">Packing for India →</Link></li>
            <li><Link href={`/${locale}/guide/food-safety`} className="text-[#E55642] hover:underline">Eating safely →</Link></li>
            <li><Link href={`/${locale}/guide/scams`} className="text-[#E55642] hover:underline">Common scams →</Link></li>
            <li><Link href={`/${locale}/guide/visa`} className="text-[#E55642] hover:underline">Tourist visa →</Link></li>
          </ul>
        </div>

        <aside className="mt-8 text-xs text-muted-foreground/70">Last reviewed {REVIEWED}.</aside>
      </main>
      <Footer />
    </div>
  );
}
