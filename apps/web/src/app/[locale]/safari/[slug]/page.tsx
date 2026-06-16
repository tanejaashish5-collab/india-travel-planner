import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BookingHandoff } from "@/components/booking-handoff";
import { SafariSaveReminder } from "@/components/safari-save-reminder";
import { localeAlternates, breadcrumbSchema, faqPageSchema, articleSchema } from "@/lib/seo-utils";
import { isCinematicDestination } from "@/lib/cinematic-destinations";
import { destinationImage } from "@/lib/image-url";
import {
  type SafariRow,
  localizeSafari,
  formatMonths,
  formatFeePair,
  cheapestIndianFee,
  inr,
  MONTH_NAMES_EN,
  MONTH_NAMES_HI,
} from "@/lib/safari-guide";
import { currentMonthIST, currentMonthSlugIST } from "@itp/shared";

export const revalidate = 604800; // 7d — booking facts shift slowly; /api/admin/revalidate covers edits.
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  return [];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

type DestRow = {
  id: string;
  name: string;
  tagline: string | null;
  state: { name?: string }[] | { name?: string } | null;
  translations?: { hi?: { name?: string } } | null;
};

async function getParkSafari(
  slug: string,
): Promise<{ dest: DestRow; safari: SafariRow } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const [{ data: dest }, { data: safari }] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, tagline, translations, state:states(name)")
      .eq("id", slug)
      .maybeSingle(),
    supabase
      .from("park_safaris")
      .select("*")
      .eq("destination_id", slug)
      .eq("published", true)
      .maybeSingle(),
  ]);

  if (!dest || !safari) return null;
  return { dest: dest as DestRow, safari: safari as SafariRow };
}

function stateNameOf(dest: DestRow): string {
  return (Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name) ?? "";
}

function localizedName(dest: DestRow, locale: string): string {
  if (locale === "hi") return dest.translations?.hi?.name || dest.name;
  return dest.name;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await getParkSafari(slug);
  if (!data) return {};

  const isHindi = locale === "hi";
  const name = localizedName(data.dest, locale);
  const s = localizeSafari(data.safari, locale);
  const window = s.advance_booking_days
    ? isHindi
      ? `${s.advance_booking_days} दिन पहले`
      : `${s.advance_booking_days} days ahead`
    : isHindi
      ? "गेट पर"
      : "on arrival";

  // <title> omits " | NakshIQ" — the locale layout's title.template appends
  // it. ogTitle carries the brand inline (the template skips OG/twitter).
  const title = isHindi
    ? `${name} सफ़ारी बुकिंग (2026): परमिट, ज़ोन, शुल्क`
    : `${name} safari booking (2026): permits, zones & fees`;
  const ogTitle = `${title} | NakshIQ`;
  // Destination-level OG image (slug = destination id) — same resolver as the
  // destination hub: composed card for cinematic dests, R2 hero otherwise.
  const ogImage = isCinematicDestination(slug)
    ? `${BASE}/api/og/destination/${slug}?locale=${locale}`
    : destinationImage(slug);
  const ogAlt = isHindi ? `${name} सफ़ारी` : `${name} safari`;

  const description = isHindi
    ? `${name} सफ़ारी कैसे बुक करें — ${s.booking_authority ?? "वन विभाग"} के ज़रिये, ${window} खुलती है। ज़ोन, जीप/कैंटर शुल्क, ID ज़रूरतें और असली बुकिंग दिक्कतें — स्रोत-सहित, सत्यापित।`
    : `How to book a ${name} safari — via ${s.booking_authority ?? "the forest dept"}, opens ${window}. Zones, jeep/canter fees, ID rules and the real booking pitfalls — source-cited and verified.`;

  return {
    title,
    description: description.slice(0, 200),
    ...localeAlternates(locale, `/safari/${slug}`),
    openGraph: {
      title: ogTitle,
      description,
      type: "article",
      url: `${BASE}/${locale}/safari/${slug}`,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage] },
  };
}

export default async function SafariPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const data = await getParkSafari(slug);
  if (!data) notFound();

  const isHindi = locale === "hi";
  const name = localizedName(data.dest, locale);
  const stateName = stateNameOf(data.dest);
  const names = isHindi ? MONTH_NAMES_HI : MONTH_NAMES_EN;
  const s = localizeSafari(data.safari, locale);

  const monthSlug = currentMonthSlugIST();
  const monthLong = names[currentMonthIST() - 1]; // locale-correct (names = en or hi array)

  const yearRound = isHindi ? "पूरे साल" : "year-round";
  const openLabel = formatMonths(s.open_months, names, yearRound);
  const closedLabel = formatMonths(s.closed_months, names, "");
  const bestLabel = formatMonths(s.best_months, names, yearRound);
  const cheapest = cheapestIndianFee(s.safari_types);

  const pageUrl = `${BASE}/${locale}/safari/${slug}`;
  const hasPortal = Boolean(s.official_booking_url);

  const windowPhrase = s.advance_booking_days
    ? isHindi
      ? `बुकिंग सफ़ारी से ~${s.advance_booking_days} दिन पहले खुलती है`
      : `booking opens ~${s.advance_booking_days} days before your safari date`
    : isHindi
      ? "ज़्यादातर बुकिंग गेट/काउंटर पर होती है (पहले आओ–पहले पाओ)"
      : "most seats are booked on the spot at the counter (first-come, first-served)";

  // FAQ — built from the live row so the rich-snippet answer matches the page.
  const faq = (
    isHindi
      ? [
          {
            question: `${name} सफ़ारी कैसे बुक करें?`,
            answer: `${s.booking_authority ?? "वन विभाग"} के ज़रिये — ${windowPhrase}।${hasPortal ? ` आधिकारिक पोर्टल: ${s.official_booking_url}।` : ""} बुकिंग के समय वही ID चाहिए जो गेट पर ले जानी है।`,
          },
          cheapest != null && {
            question: `${name} सफ़ारी का शुल्क कितना है?`,
            answer: `भारतीयों के लिए सबसे सस्ती सफ़ारी लगभग ${inr(cheapest)} से शुरू होती है (वाहन/गाइड अलग हो सकते हैं)। विदेशियों के लिए दरें ज़्यादा हैं। पूरी सूची ऊपर दी गई है।`,
          },
          bestLabel && {
            question: `${name} सफ़ारी के लिए सबसे अच्छा समय कौन सा है?`,
            answer: `सबसे अच्छा वन्यजीव-दर्शन ${bestLabel} में होता है।${closedLabel ? ` पार्क ${closedLabel} में बंद रहता है।` : ""}`,
          },
        ]
      : [
          {
            question: `How do I book a ${name} safari?`,
            answer: `Through ${s.booking_authority ?? "the forest department"} — ${windowPhrase}.${hasPortal ? ` Official portal: ${s.official_booking_url}.` : ""} Carry the same ID you enter at booking to the gate.`,
          },
          cheapest != null && {
            question: `How much does a ${name} safari cost?`,
            answer: `The cheapest safari starts around ${inr(cheapest)} for Indian visitors (vehicle/guide may be separate); foreigner rates are higher. Full per-vehicle breakdown is in the table above.`,
          },
          bestLabel && {
            question: `When is the best time for a ${name} safari?`,
            answer: `Wildlife sightings are best in ${bestLabel}.${closedLabel ? ` The park is closed in ${closedLabel}.` : ""}`,
          },
        ]
  ).filter(Boolean) as { question: string; answer: string }[];

  const breadcrumbLd = breadcrumbSchema(locale, [
    { name: isHindi ? `${stateName} सफ़ारी` : `${stateName} wildlife`, path: `/state/${data.dest.id}` },
    { name, path: `/safari/${slug}` },
  ]);
  const faqLd = faqPageSchema({ locale, path: `/safari/${slug}`, qa: faq });
  const articleLd = articleSchema({
    locale,
    path: `/safari/${slug}`,
    headline: isHindi ? `${name} सफ़ारी बुकिंग गाइड 2026` : `${name} safari booking guide 2026`,
    description: isHindi
      ? `${name} में सफ़ारी कैसे बुक करें — परमिट, ज़ोन, शुल्क और बुकिंग की दिक्कतें।`
      : `How to book a safari in ${name} — permits, zones, fees and booking pitfalls.`,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Nav />

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {isHindi ? "सफ़ारी बुकिंग · 2026" : "Safari booking · 2026"}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          {isHindi ? `${name} सफ़ारी कैसे बुक करें` : `How to book a ${name} safari`}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isHindi
            ? `${s.park_full_name}${stateName ? `, ${stateName}` : ""} — ${windowPhrase}। ${bestLabel ? `सबसे अच्छा दर्शन ${bestLabel} में। ` : ""}${cheapest != null ? `भारतीयों के लिए सफ़ारी ${inr(cheapest)} से। ` : ""}नीचे ज़ोन, शुल्क, ID और असली बुकिंग दिक्कतें — हर बात स्रोत-सहित और सत्यापित, किसी ब्लॉग का अंदाज़ा नहीं।`
            : `${s.park_full_name}${stateName ? `, ${stateName}` : ""} — ${windowPhrase}. ${bestLabel ? `Sightings are best in ${bestLabel}. ` : ""}${cheapest != null ? `Safaris start at ${inr(cheapest)} for Indian visitors. ` : ""}Below: zones, fees, IDs and the real booking pitfalls — every line source-cited and verified, not a guess off a blog.`}
        </p>

        {/* Booking window + official portal */}
        <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-xl font-bold">
              {isHindi ? "बुकिंग विंडो" : "Booking window"}
            </h2>
            {s.last_verified && (
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {isHindi ? "सत्यापित" : "Verified"} {s.last_verified}
              </span>
            )}
          </div>
          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <Fact label={isHindi ? "बुकिंग प्राधिकरण" : "Booking authority"} value={s.booking_authority} />
            <Fact
              label={isHindi ? "कितने दिन पहले" : "Opens in advance"}
              value={
                s.advance_booking_days
                  ? isHindi
                    ? `${s.advance_booking_days} दिन`
                    : `${s.advance_booking_days} days`
                  : isHindi
                    ? "गेट पर / स्पॉट"
                    : "spot / on arrival"
              }
            />
            <Fact label={isHindi ? "खुला रहता है" : "Park open"} value={openLabel} />
            {closedLabel && (
              <Fact label={isHindi ? "बंद रहता है" : "Closed"} value={closedLabel} />
            )}
          </dl>
          {s.booking_opens_note && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.booking_opens_note}</p>
          )}
          {hasPortal ? (
            <a
              href={s.official_booking_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isHindi ? "आधिकारिक पोर्टल पर बुक करें" : "Book on the official portal"} →
            </a>
          ) : (
            <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
              {isHindi
                ? "इस पार्क का कोई भरोसेमंद सरकारी ऑनलाइन पोर्टल नहीं है — काउंटर पर ही बुकिंग करें (नीचे चरण देखें)। 'आधिकारिक' दिखने वाली निजी साइटों से सावधान।"
                : "There's no reliable government online portal for this park — book at the counter (steps below). Beware private sites posing as the official booking portal."}
            </p>
          )}
        </section>

        {/* Safari types + fees */}
        {s.safari_types.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">
              {isHindi ? "सफ़ारी प्रकार और शुल्क" : "Safari types & fees"}
            </h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{isHindi ? "प्रकार" : "Type"}</th>
                    <th className="px-4 py-3 font-semibold">{isHindi ? "सीटें" : "Seats"}</th>
                    <th className="px-4 py-3 font-semibold">{isHindi ? "शुल्क" : "Fee"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {s.safari_types.map((t, i) => (
                    <tr key={i} className="align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{t.type}</div>
                        {t.shifts?.length > 0 && (
                          <div className="mt-0.5 text-xs text-muted-foreground">{t.shifts.join(" · ")}</div>
                        )}
                        {t.notes && (
                          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.notes}</div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {typeof t.capacity === "number" && t.capacity > 0
                          ? t.capacity
                          : typeof t.capacity === "string" && t.capacity.trim()
                            ? t.capacity
                            : "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium">{formatFeePair(t, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {s.fees_note && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.fees_note}</p>
            )}
          </section>
        )}

        {/* Zones */}
        {s.zones.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "ज़ोन और गेट" : "Zones & gates"}</h2>
            <ul className="mt-4 space-y-3">
              {s.zones.map((z, i) => (
                <li key={i} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{z.name}</span>
                    {z.premium && (
                      <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                        {isHindi ? "प्रमुख" : "Prime"}
                      </span>
                    )}
                  </div>
                  {z.best_for && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">{isHindi ? "किसके लिए: " : "Best for: "}</span>
                      {z.best_for}
                    </p>
                  )}
                  {z.notes && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{z.notes}</p>}
                </li>
              ))}
            </ul>
            {s.core_buffer_note && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.core_buffer_note}</p>
            )}
          </section>
        )}

        {/* How to book */}
        {s.booking_steps.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "बुकिंग कैसे करें" : "How to book, step by step"}</h2>
            <ol className="mt-4 space-y-2.5">
              {s.booking_steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            {s.id_required.length > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">{isHindi ? "ID ज़रूरी: " : "ID required: "}</span>
                {s.id_required.join(" · ")}
              </p>
            )}
          </section>
        )}

        {/* Pitfalls — the moat */}
        {s.pitfalls.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "किन बातों से बचें" : "What trips people up"}</h2>
            <ul className="mt-4 space-y-3">
              {s.pitfalls.map((p, i) => (
                <li key={i} className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="flex items-start gap-2 font-semibold">
                    <span aria-hidden="true" className="text-amber-400">⚠</span>
                    {p.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Save for booking-window reminder */}
        <div className="mt-10">
          <SafariSaveReminder destinationId={data.dest.id} parkName={name} locale={locale} />
        </div>

        {/* Affiliate handoff — same not-sponsored stay/experiences block as destination pages. */}
        <div className="mt-6">
          <BookingHandoff destinationName={name} stateName={stateName} destinationId={slug} />
        </div>

        {/* FAQ — visible copy mirrors the FAQ JSON-LD. */}
        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Common questions"}</h2>
            <dl className="mt-4 divide-y divide-border">
              {faq.map((q) => (
                <div key={q.question} className="py-4">
                  <dt className="font-semibold">{q.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{q.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Sources — the verifiability that is the whole point. */}
        {s.sources.length > 0 && (
          <section className="mt-10 border-t border-border pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {isHindi ? "स्रोत" : "Sources"}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {s.sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    {src.label} →
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Internal links */}
        <nav className="mt-12 flex flex-wrap gap-2.5 border-t border-border pt-6 text-sm">
          <RelatedLink href={`/${locale}/destination/${slug}`}>
            {isHindi ? `${name} पूरी गाइड` : `${name} full guide`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/cost/${slug}`}>
            {isHindi ? `${name} यात्रा खर्च` : `${name} trip cost`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/destination/${slug}/${monthSlug}`}>
            {isHindi ? `${monthLong} में ${name}` : `${name} in ${monthLong}`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/where-to-go/${monthSlug}`}>
            {isHindi ? `${monthLong} में कहाँ जाएँ` : `Where to go in ${monthLong}`}
          </RelatedLink>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}

function RelatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border px-4 py-2 font-medium transition-colors hover:border-foreground/40 hover:bg-muted/40"
    >
      {children} →
    </Link>
  );
}
