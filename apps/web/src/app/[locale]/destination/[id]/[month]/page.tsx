import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DestinationMonth } from "@/components/destination-month";
import { ScrollDepthTracker } from "@/components/scroll-depth-tracker";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { destinationImage } from "@/lib/image-url";
import { AuthorByline } from "@/components/author-byline";
import { getPrimaryEditor } from "@/lib/editor";
import { videoObjectJsonLd } from "@/lib/video-schema";
import { formatScoreInline } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { NewsletterStickyTray } from "@/components/newsletter-sticky-tray";

export const revalidate = 604800; // 7d — month-segment URL is rollover-safe; prewarm cron warms next month + /api/admin/revalidate flushes edits. Was 24h.
export const dynamicParams = true;

// 6,060 month pages render on-demand via ISR instead of at build time —
// build stays ~2min instead of ~20min. First visit: 1-2s server render, then
// served from Vercel's data cache for 24h (revalidate=86400). The empty []
// return is REQUIRED — without generateStaticParams entirely, Next 16 treats
// the route as fully dynamic (Cache-Control: private/no-cache/no-store,
// x-vercel-cache: MISS) regardless of `revalidate`. That regression hid this
// page family from the SERP for ~3 weeks until the 2026-05-27 fix.
export async function generateStaticParams() {
  return [];
}

const VALID_MONTHS = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december",
] as const;

const MONTH_NAMES: Record<string, string> = {
  january: "January", february: "February", march: "March",
  april: "April", may: "May", june: "June",
  july: "July", august: "August", september: "September",
  october: "October", november: "November", december: "December",
};

const MONTH_NUMBER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string; month: string }>;
}): Promise<Metadata> {
  const { id, locale, month } = await params;

  if (!VALID_MONTHS.includes(month as any)) return {};

  // Same setRequestLocale rationale as the page handler — the metadata pass
  // is a separate render context.
  setRequestLocale(locale);

  const supabase = getSupabase();
  if (!supabase) return {};

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const isHi = locale === "hi";
  // Hindi month names — covers titles, descriptions, and SERP snippets so the
  // /hi/destination/<slug>/<month> page no longer ships an English <title> on
  // a Hindi-locale URL (NEW-2026-05-04-005).
  const MONTH_NAME_HI: Record<string, string> = {
    january: "जनवरी", february: "फ़रवरी", march: "मार्च",
    april: "अप्रैल", may: "मई", june: "जून",
    july: "जुलाई", august: "अगस्त", september: "सितंबर",
    october: "अक्टूबर", november: "नवंबर", december: "दिसंबर",
  };
  const monthDisplay = isHi ? (MONTH_NAME_HI[month] ?? monthName) : monthName;

  const [{ data: dest }, { data: monthData }, { data: card }] = await Promise.all([
    supabase.from("destinations").select("name, tagline, translations, state_id, state:states(name)").eq("id", id).single(),
    supabase.from("destination_months").select("score, note, why_go, why_not, verdict, title_override, title_override_hi, meta_description_override, meta_description_override_hi").eq("destination_id", id).eq("month", monthNum).single(),
    supabase.from("confidence_cards").select("weather_night").eq("destination_id", id).single(),
  ]);

  if (!dest) return {};

  // Locale-aware destination + state name. Mirrors /destination/[id]/page.tsx
  // generateMetadata so /hi pages don't fall through to English.
  const enName = (dest as any).name;
  const hiName = (dest as any).translations?.hi?.name;
  const name = isHi && hiName ? hiName : enName;
  // Title-only canonical name: strip alternate-spelling parens like "Alleppey (Alappuzha)".
  // The full parenthetical name eats title budget and forces fallback to titleMin
  // (no verdict + no temp range) on dests with long alt names — measured leak on
  // alleppey/may (152 GSC impr / 0 clicks) and puducherry/may (121 / 1) on 2026-05-05.
  // Description and H1 keep the full name for disambiguation; SERP only shows title.
  const titleName = name.replace(/\s*\([^)]+\)\s*/g, "").trim();
  const stateData = dest.state as any;
  const enStateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;
  const { getStateName } = await import("@/lib/seo-maps");
  const stateName = (isHi && (dest as any).state_id ? getStateName((dest as any).state_id, "hi") : enStateName) ?? enStateName;
  const score = monthData?.score ?? 0;
  const note = (monthData?.note ?? "").toString();
  const whyGo = (monthData?.why_go ?? "").toString();
  const whyNot = (monthData?.why_not ?? "").toString();
  const verdict = (monthData?.verdict ?? "").toString().toLowerCase();

  // Temperature range — try multiple JSONB shapes (weather_night schema is sparse).
  // Most dests use summer_low_c/winter_low_c; some (south India) use min_temp_c/max_temp_c.
  const weather = (card?.weather_night ?? {}) as {
    summer_low_c?: number; winter_low_c?: number;
    summer_high_c?: number; winter_high_c?: number;
    min_temp_c?: number; max_temp_c?: number;
  };
  const isSummer = monthNum >= 4 && monthNum <= 9;
  const lowTemp = isSummer ? weather.summer_low_c ?? weather.min_temp_c : weather.winter_low_c ?? weather.min_temp_c;
  const highTemp = isSummer ? weather.summer_high_c ?? weather.max_temp_c : weather.winter_high_c ?? weather.max_temp_c;

  // Try to extract a day-temp range straight from the editorial note (e.g. "Extreme 38-46°C.").
  // The note is hand-written per dest×month and usually leads with the temp story —
  // pulling that range gives us a more honest signal than the JSONB extremes.
  const noteRangeMatch = note.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]/);
  const noteLow = noteRangeMatch ? Number(noteRangeMatch[1]) : null;
  const noteHigh = noteRangeMatch ? Number(noteRangeMatch[2]) : null;

  const rangeStr =
    typeof noteLow === "number" && typeof noteHigh === "number"
      ? `${noteLow}–${noteHigh}°C`
      : typeof lowTemp === "number" && typeof highTemp === "number"
      ? `${lowTemp}–${highTemp}°C`
      : typeof lowTemp === "number"
      ? `${lowTemp}°C nights`
      : "";

  // 2026-04-29 CTR rewrite: replace "{Name} Weather in {Month}" template
  // with verdict-led titles + verb-first descriptions. The previous template
  // (factual "weather + temp") was getting 800+ impressions / 1 click on
  // high-volume URLs (Vrindavan/May, Yercaud/May, Kodaikanal/June) — Google
  // showed it, users scrolled past. Verdict-led copy front-loads the answer
  // ("Skip", "Visit", "Wait") in both title and description.

  // Title hook keyed off score. 2026-05-17 rewrite — replaced judgmental
  // verdict labels with action/info-led hooks. Old labels ("Avoid this
  // month", "Mixed conditions") were telling users "no" when they'd already
  // booked dates or had fixed reasons to go; CTR audit showed score 1-3
  // pages at 0.21-0.36% even on temperature queries that should have been
  // easy clicks (vrindavan/may 38-46°C, munnar/june, darjeeling/may).
  // New hooks promise information over judgment:
  // 5 → "Peak month"      (was Peak season — tighter, more specific)
  // 4 → "Best window"     (was Great time — implies time-specific tip)
  // 3 → "Worth waiting?"  (was Mixed conditions — question earns curiosity)
  // 2 → "Plan carefully"  (was Tough season — action-led, not judgmental)
  // 1 → "What to expect"  (was Avoid this month — info-led, no "no")
  const titleHook = isHi
    ? (score >= 5 ? "सबसे अच्छा महीना"
      : score >= 4 ? "बेहतरीन समय"
      : score >= 3 ? "क्या रुकें?"
      : score >= 2 ? "सोच-समझकर जाएँ"
      : score >= 1 ? "क्या उम्मीद करें"
      : "यात्रा गाइड")
    : (score >= 5 ? "Peak month"
      : score >= 4 ? "Best window"
      : score >= 3 ? "Worth waiting?"
      : score >= 2 ? "Plan carefully"
      : score >= 1 ? "What to expect"
      : "Travel guide");

  // OG title — used in social link previews. Longer + brand-anchored.
  const scoreVerdict = isHi
    ? (score >= 5 ? "यात्रा का सर्वोत्तम समय"
      : score >= 4 ? "यात्रा का बढ़िया समय"
      : score >= 3 ? "क्या जाना उचित है?"
      : score >= 2 ? "क्या आप जाएँ?"
      : score >= 1 ? "क्यों टालें"
      : "यात्रा गाइड")
    : (score >= 5 ? "Perfect Time to Visit"
      : score >= 4 ? "Great Time to Visit"
      : score >= 3 ? "Is It Worth Visiting?"
      : score >= 2 ? "Should You Go?"
      : score >= 1 ? "Why to Avoid"
      : "Travel Guide");

  const year = new Date().getFullYear();

  // Title with progressive shortening. Layout appends " | NakshIQ" via title.template
  // (10 chars), so the page-specific portion needs to fit ≤50 chars to stay
  // under Google's ~60-char SERP truncation total.
  //
  // 2026-05-10 weather-lead rewrite: when we have a numeric temp range, lead
  // with it (was buried in trailing parens). Reasoning: GSC top queries are
  // "{dest} weather in {month}" / "{dest} temperature in {month}" — users
  // want a NUMBER. Putting it after the dest name + month answers the query
  // in the SERP snippet itself. Measured: tungnath/may 0.31% CTR, nainital/may
  // 0.37% CTR despite ranks 8-10 — fix tested = move temp to lead position.
  // Long:    "{name} in {month} {year}, {temp} — {hook}"
  // Med:     "{name} in {month}, {temp} — {hook}"
  // Min-w:   "{name} in {month}: {temp}"        (when temp exists, no hook)
  // Min:     "{name} in {month} {year}"          (no temp)
  const TITLE_BUDGET = 50;
  // Hindi connectives ("में" = "in", year stays in Devanagari numerals via locale rendering).
  const inWord = isHi ? "में" : "in";
  const titleLong = isHi
    ? (rangeStr
        ? `${monthDisplay} ${year} में ${titleName}, ${rangeStr} — ${titleHook}`
        : `${monthDisplay} ${year} में ${titleName}: ${titleHook}`)
    : (rangeStr
        ? `${titleName} ${inWord} ${monthDisplay} ${year}, ${rangeStr} — ${titleHook}`
        : `${titleName} ${inWord} ${monthDisplay} ${year}: ${titleHook}`);
  const titleMed = isHi
    ? (rangeStr
        ? `${monthDisplay} में ${titleName}, ${rangeStr} — ${titleHook}`
        : `${monthDisplay} में ${titleName}: ${titleHook}`)
    : (rangeStr
        ? `${titleName} ${inWord} ${monthDisplay}, ${rangeStr} — ${titleHook}`
        : `${titleName} ${inWord} ${monthDisplay}: ${titleHook}`);
  // Minimum weather-lead — drops the hook entirely so even ultra-long names
  // (e.g., "Andaman & Nicobar Islands") still surface the temp in the title.
  const titleMinWeather = isHi
    ? (rangeStr ? `${monthDisplay} में ${titleName}: ${rangeStr}` : "")
    : (rangeStr ? `${titleName} ${inWord} ${monthDisplay}: ${rangeStr}` : "");
  const titleMin = isHi
    ? `${monthDisplay} ${year} में ${titleName}`
    : `${titleName} ${inWord} ${monthDisplay} ${year}`;
  const title =
    titleLong.length <= TITLE_BUDGET ? titleLong
    : titleMed.length <= TITLE_BUDGET ? titleMed
    : (titleMinWeather && titleMinWeather.length <= TITLE_BUDGET) ? titleMinWeather
    : titleMin;

  const ogTitle = isHi
    ? `${monthDisplay} में ${name} — ${scoreVerdict} | NakshIQ`
    : `${name} ${inWord} ${monthDisplay} — ${scoreVerdict} | NakshIQ`;

  // Editorial note often starts with "{Month} at {Name}: ..." — strip that prefix
  // so the description doesn't read awkwardly when our verb-led lead joins it.
  // Notes are stored in English (no Hindi translation column on destination_months
  // yet), so we always strip the English prefix regardless of locale.
  const escEnName = enName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stripPrefix = new RegExp(`^${monthName}(?:\\s+at\\s+${escEnName})?\\s*:\\s*`, "i");

  const trimToBoundary = (s: string, max: number): string => {
    if (s.length <= max) return s.trim();
    const slice = s.slice(0, max);
    const lastSentence = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "), slice.lastIndexOf("! "));
    if (lastSentence > max * 0.5) return slice.slice(0, lastSentence + 1).trim();
    const lastSpace = slice.lastIndexOf(" ");
    return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim();
  };

  // Verb-first lead based on verdict. "Skip" / "Visit" / "Wait on" fronts
  // the answer in the first ~15 chars — exactly where the eye lands in a SERP.
  const descVerb = isHi
    ? (verdict === "skip" ? "टालें"
      : verdict === "go" ? "जाएँ"
      : verdict === "wait" ? "रुकें"
      : "")
    : (verdict === "skip" ? "Skip"
      : verdict === "go" ? "Visit"
      : verdict === "wait" ? "Wait on"
      : "");
  // 2026-05-10 weather-lead description rewrite: when we have a numeric temp
  // range, lead with it (was buried inside the editorial note body, often
  // truncated out). GSC top queries are temperature/weather queries — the
  // SERP snippet needs to answer "what's the temperature" in the first
  // 30 chars where Google bolds matched text. Verdict verb moves to position 2.
  const descLead = isHi
    ? (rangeStr
        ? (descVerb
            ? `${monthDisplay} में ${name}: ${rangeStr}। ${descVerb}:`
            : `${monthDisplay} में ${name}: ${rangeStr}।`)
        : (descVerb
            ? `${monthDisplay} ${year} में ${name} ${descVerb}:`
            : `${monthDisplay} ${year} में ${name}:`))
    : (rangeStr
        ? (descVerb
            ? `${name} in ${monthName}: ${rangeStr}. ${descVerb}:`
            : `${name} in ${monthName}: ${rangeStr}.`)
        : (descVerb
            ? `${descVerb} ${name} in ${monthName} ${year}:`
            : `${name} in ${monthName} ${year}:`));
  const scoreLabel = formatScoreInline(score);
  const descClose = isHi
    ? (stateName
        ? `NakshIQ रेटिंग: ${scoreLabel} (${stateName})।`
        : `NakshIQ रेटिंग: ${scoreLabel}।`)
    : (stateName
        ? `NakshIQ verdict: ${scoreLabel} (${stateName}).`
        : `NakshIQ verdict: ${scoreLabel}.`);

  // Fallback chain by verdict: skip → why_not first, others → why_go first.
  // Note already contains the editorial perspective for most rows; fall
  // through only when note is empty.
  const noteSource = note
    || (verdict === "skip" ? (whyNot || whyGo) : (whyGo || whyNot))
    || "";
  let noteStripped = noteSource.replace(stripPrefix, "").trim();

  // 2026-05-15 SERP dedupe: descLead already leads with `rangeStr` (e.g.,
  // "Kasol in May: 14–26°C."). The editorial note typically also leads with
  // the same temp ("Peak season, 14-26°C. Kheerganga…"), so the SERP snippet
  // displayed the temperature twice — wasting ~15-20 chars on every
  // /destination/<slug>/<month> page (505 dests × 12 months). When we extracted
  // the range from the note itself (noteRangeMatch hit), strip that literal
  // substring from the note body and clean up the punctuation glitches it
  // leaves behind. Kasol/May + Munnar/June were the two highest-impression
  // sub-1% CTR pages flagged in gsc-audit-2026-05-15.md priority #2.
  if (noteRangeMatch) {
    const tempLiteral = noteRangeMatch[0];
    noteStripped = noteStripped
      .split(tempLiteral).join("")
      // ". , " → ". " when the strip leaves a leading separator after a period.
      .replace(/\.\s*[,;:\-–—]+\s*/g, ". ")
      // "Peak season,. Kheerganga" → "Peak season. Kheerganga"
      .replace(/[,;:\-–—]+(\s*[.!?])/g, "$1")
      // "Best month ." → "Best month."
      .replace(/\s+([.!?,;:])/g, "$1")
      .replace(/\s{2,}/g, " ")
      .replace(/^[\s,;:\-–—.]+/, "")
      // Re-capitalise after a period when our strip left a lowercase letter
      // ("Peak heat. humidity 80 percent." → "Peak heat. Humidity 80 percent.").
      .replace(/(\.\s+)([a-z])/g, (_m: string, p: string, c: string) => p + c.toUpperCase())
      .trim();
  }

  const noteBudget = Math.max(40, 155 - descLead.length - descClose.length - 2);
  const descBody = noteStripped ? trimToBoundary(noteStripped, noteBudget) : "";
  // Strip trailing punctuation + conjunctions so the auto-period doesn't stick
  // an awkward "and." or ", but." at the end (caught: Yercaud/May ended ", and.").
  const descBodyTrimmed = descBody
    .replace(/[,;:\-—\s]+(and|or|but|with|for|to|of|the|a|an|on|at|in)$/i, "")
    .replace(/[,;:\-—]+$/, "")
    .trim();
  const descBodyClean = descBodyTrimmed ? (/[.!?]$/.test(descBodyTrimmed) ? descBodyTrimmed : `${descBodyTrimmed}.`) : "";
  const description = [descLead, descBodyClean, descClose].filter(Boolean).join(" ").trim();

  // Per-page SERP override (migration 063). For a flagged high-impression /
  // low-CTR page, a hand-written title / meta description wins over the
  // templated fallback chain above. Empty or unset → template, no change.
  // Title budget is still ≤50 chars pre " | NakshIQ" suffix; meta ≤155.
  const titleOverride = (isHi ? monthData?.title_override_hi : monthData?.title_override) as string | null | undefined;
  const descOverride = (isHi ? monthData?.meta_description_override_hi : monthData?.meta_description_override) as string | null | undefined;
  const finalTitle = (titleOverride && titleOverride.trim()) || title;
  const finalDescription = (descOverride && descOverride.trim()) || description;

  const canonicalUrl = `https://www.nakshiq.com/${locale}/destination/${id}/${month}`;
  const imageUrl = `https://www.nakshiq.com/api/og?dest=${encodeURIComponent(name)}&month=${monthName}&score=${score}&note=${encodeURIComponent(note?.substring(0, 80) || '')}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.nakshiq.com/en/destination/${id}/${month}`,
        hi: `https://www.nakshiq.com/hi/destination/${id}/${month}`,
        "x-default": `https://www.nakshiq.com/en/destination/${id}/${month}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description: finalDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: isHi ? `${monthDisplay} में ${name} — ${stateName || "भारत"}` : `${name} in ${monthName} — ${stateName || "India"}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: finalDescription,
      images: [imageUrl],
    },
  };
}

async function getMonthData(id: string, month: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const monthNum = MONTH_NUMBER[month];

  // Destination core data — note we drop the raw `coords` column (PostGIS
  // GEOGRAPHY arrives as a WKB hex string from PostgREST, useless for JSON-LD)
  // and pull lat/lng from the destinations_with_coords view in parallel.
  const [{ data: dest, error }, { data: coordRow }] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, translations, difficulty, elevation_m, budget_tier, best_months, crowd_calendar, content_reviewed_at,
        state:states(id, name),
        kids_friendly(*),
        confidence_cards(*),
        destination_months(*)
      `)
      .eq("id", id)
      .single(),
    supabase
      .from("destinations_with_coords")
      .select("lat, lng")
      .eq("id", id)
      .single(),
  ]);

  // Same transient-vs-not-found split as /destination/[id]/page.tsx — only
  // soft-404 on PGRST116 (no rows). Other errors (rate-limit, timeout) throw
  // so ISR retries instead of caching a sticky 404 over a real destination.
  if (error && error.code !== "PGRST116") {
    throw new Error(`Supabase getMonthData(${id},${month}) failed: ${error.code} ${error.message}`);
  }
  if (!dest) return null;
  (dest as any).coords =
    coordRow && typeof coordRow.lat === "number" && typeof coordRow.lng === "number"
      ? { lat: coordRow.lat, lng: coordRow.lng }
      : null;

  // Current month data
  const allMonths = (dest.destination_months as any[]) ?? [];
  const currentMonth = allMonths.find((m: any) => m.month === monthNum) ?? null;

  // Permits
  const { data: permits } = await supabase
    .from("permits")
    .select("*")
    .eq("destination_id", id);

  // Nearby destinations in same state scoring 4+ this month
  const stateData = dest.state as any;
  const stateId = Array.isArray(stateData) ? stateData[0]?.id : stateData?.id;

  let nearby: any[] = [];
  if (stateId) {
    const { data: nearbyRaw } = await supabase
      .from("destinations")
      .select(`
        id, name, difficulty, elevation_m, budget_tier,
        destination_months!inner(score, note, month)
      `)
      .eq("state_id", stateId)
      .neq("id", id)
      .eq("destination_months.month", monthNum)
      .gte("destination_months.score", 4)
      .limit(8);

    nearby = nearbyRaw ?? [];
  }

  return {
    destination: dest,
    currentMonth,
    allMonths,
    permits: permits ?? [],
    nearby,
  };
}

export default async function DestinationMonthPage({
  params,
}: {
  params: Promise<{ id: string; locale: string; month: string }>;
}) {
  const { id, locale, month } = await params;

  // Per-page setRequestLocale call — required for on-demand ISR with next-intl
  // when the page doesn't have generateStaticParams. Without it, the layout's
  // setRequestLocale call alone leaves THIS render context dynamic (we
  // intentionally skipped generateStaticParams here to avoid pre-rendering
  // 6,840 month pages at build time).
  setRequestLocale(locale);

  // Validate month slug
  if (!VALID_MONTHS.includes(month as any)) notFound();

  const [data, editor] = await Promise.all([
    getMonthData(id, month),
    getPrimaryEditor(),
  ]);
  if (!data) notFound();

  const { destination, currentMonth, allMonths, permits, nearby } = data;
  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const score = currentMonth?.score ?? 0;

  // Peak month for the alert hook — derive client-side from allMonths to
  // avoid an extra DB call (6,060 pages × 1 query). Mirror getPeakMonth():
  // MAX(score), ties broken by lowest month_num, null when max < 4.
  const MONTH_NAME_BY_NUM = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const PEAK_MIN_SCORE = 4;
  const peakRow = (allMonths as Array<{ month: number; score: number }>)
    .filter((m) => typeof m?.score === "number" && m.score >= PEAK_MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.month - b.month)[0];
  const peakMonth = peakRow
    ? {
        monthNum: peakRow.month,
        monthName: MONTH_NAME_BY_NUM[peakRow.month] ?? "",
        score: peakRow.score,
      }
    : null;

  const stateInfo = destination.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;

  const monthUrl = `https://www.nakshiq.com/${locale}/destination/${id}/${month}`;
  const destHubUrl = `https://www.nakshiq.com/${locale}/destination/${id}`;
  const reviewedAt = (destination as any).content_reviewed_at ?? null;

  // Schema.org JSON-LD — Article (month-specific guide, @id-chained)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${monthUrl}#article`,
    headline: `${destination.name} in ${monthName} — ${formatScoreInline(score)}`,
    description: currentMonth?.note || currentMonth?.why_go || `Travel guide for ${destination.name} in ${monthName}`,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    ...(reviewedAt && { dateModified: reviewedAt }),
    author: editor
      ? { "@id": `https://www.nakshiq.com/about/team#${editor.slug}` }
      : { "@id": "https://www.nakshiq.com#organization" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: {
      "@type": "TouristDestination",
      name: destination.name,
      url: destHubUrl,
      ...(typeof (destination as any).coords?.lat === "number" && typeof (destination as any).coords?.lng === "number" && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: (destination as any).coords.lat,
          longitude: (destination as any).coords.lng,
        },
      }),
      ...((destination as any).elevation_m && {
        elevation: { "@type": "QuantitativeValue", value: (destination as any).elevation_m, unitCode: "MTR" },
      }),
    },
    image: destinationImage(id),
    url: monthUrl,
    mainEntityOfPage: monthUrl,
  };

  // Schema.org JSON-LD — TouristTrip (month-specific suggested trip envelope)
  const verdict = currentMonth?.verdict;
  const touristTripJsonLd = verdict === "go" || verdict === "wait" ? {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${monthUrl}#trip`,
    name: `${destination.name} in ${monthName}`,
    description: currentMonth?.why_go || `${destination.name} visit planned for ${monthName}`,
    url: monthUrl,
    touristType: (destination as any).difficulty === "easy" ? "Family"
      : (destination as any).difficulty === "extreme" ? "Adventure"
      : "General",
    itinerary: {
      "@type": "TouristDestination",
      name: destination.name,
      url: destHubUrl,
    },
    provider: { "@id": "https://www.nakshiq.com#organization" },
  } : null;

  // Schema.org JSON-LD — BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.nakshiq.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `https://www.nakshiq.com/${locale}/explore`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `https://www.nakshiq.com/${locale}/destination/${id}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: monthName,
        item: `https://www.nakshiq.com/${locale}/destination/${id}/${month}`,
      },
    ],
  };

  // Schema.org JSON-LD — FAQPage (month-specific, expanded to 7 questions).
  // 2026-04-27: split "weather" and "temperature" questions to double-target
  // the GSC patterns "<dest> weather in <month>" + "<dest> temperature in <month>".
  const kf = Array.isArray(destination.kids_friendly) ? destination.kids_friendly[0] : destination.kids_friendly;
  const cc = Array.isArray(destination.confidence_cards) ? destination.confidence_cards[0] : destination.confidence_cards;
  const bestMonthsArr: number[] = (destination as any).best_months ?? [];
  const bestMonthNamesMonth = bestMonthsArr
    .map((m: number) => ["", "January","February","March","April","May","June","July","August","September","October","November","December"][m])
    .filter(Boolean)
    .join(", ");

  // Extract day-temp range from the editorial note (e.g., "Extreme 38-46°C.").
  // Hand-written notes already lead with the temp story per dest×month.
  const faqNote = (currentMonth?.note ?? "").toString();
  const faqRangeMatch = faqNote.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]/);
  const faqRangeStr = faqRangeMatch ? `${faqRangeMatch[1]}–${faqRangeMatch[2]}°C` : "";

  const faqEntries: Array<{ name: string; text: string }> = [];

  faqEntries.push({
    name: `Is ${monthName} a good time to visit ${destination.name}?`,
    text: `${destination.name} scores ${formatScoreInline(score)} in ${monthName}${verdict ? ` (verdict: ${verdict})` : ""}. ${currentMonth?.why_go || currentMonth?.why_not || currentMonth?.note || "Check the full monthly breakdown on NakshIQ for weather, crowd, and access reasoning."}`,
  });

  if (currentMonth?.why_not && verdict === "skip") {
    faqEntries.push({
      name: `Why should I skip ${destination.name} in ${monthName}?`,
      text: String(currentMonth.why_not),
    });
  }

  if (bestMonthNamesMonth) {
    faqEntries.push({
      name: `What are the best months to visit ${destination.name}?`,
      text: `The best months to visit ${destination.name} are ${bestMonthNamesMonth}. ${verdict === "go" ? `${monthName} is one of them.` : verdict === "skip" ? `${monthName} is not — consider one of the ${bestMonthNamesMonth} months instead.` : ""}`,
    });
  }

  // Temperature Q — explicit numeric answer for the "temperature in X in Y" pattern.
  if (faqRangeStr) {
    faqEntries.push({
      name: `What is the temperature in ${destination.name} in ${monthName}?`,
      text: `${destination.name} sees ${faqRangeStr} in ${monthName}. ${faqNote}`,
    });
  }

  faqEntries.push({
    name: `What is the weather like in ${destination.name} in ${monthName}?`,
    text: faqRangeStr
      ? `${destination.name} weather in ${monthName}: ${faqRangeStr}. ${faqNote || currentMonth?.why_go || ""}`.trim()
      : currentMonth?.note || currentMonth?.why_go || `Check the ${destination.name} page on NakshIQ for detailed monthly weather data including temperature range, precipitation, and season-specific warnings.`,
  });

  if (kf) {
    faqEntries.push({
      name: `Is ${destination.name} safe for kids in ${monthName}?`,
      text: kf.suitable
        ? `${destination.name} is rated ${formatScoreInline(kf.rating)} for families. ${monthName} ${verdict === "go" ? "is a suitable travel window" : verdict === "skip" ? "is not the recommended travel window — prefer the best-months list" : "is workable but not peak"}.`
        : `${destination.name} is rated ${formatScoreInline(kf.rating)} for families and not recommended for young children, regardless of month. ${(kf.reasons || []).slice(0, 1).join(". ")}.`,
    });
  }

  if (cc?.safety_rating != null) {
    faqEntries.push({
      name: `Is ${destination.name} safe in ${monthName}?`,
      text: `${destination.name} has a safety rating of ${formatScoreInline(cc.safety_rating)}. ${cc.safety_notes ? String(cc.safety_notes) : ""}`,
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${monthUrl}#faq`,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: { "@id": `${monthUrl}#article` },
    mainEntity: faqEntries.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: { "@type": "Answer", text: q.text },
    })),
  };

  // VideoObject JSON-LD — same pattern as the parent /destination/[id] page
  // (see [id]/page.tsx:511). Each dest×month page renders the destination's
  // hero MP4; without this schema Google's video index flagged 3,669 pages as
  // "Video isn't on a watch page" (GSC export 2026-04-30). Description is
  // month-aware so each /destination/{id}/{month} variant has unique text.
  const videoLd = videoObjectJsonLd({
    id,
    name: `${destination.name} in ${monthName} — NakshIQ travel reel`,
    description: (destination as any).tagline
      ? `${(destination as any).tagline}. ${destination.name} in ${monthName} — aerial and on-ground footage from NakshIQ's coverage.`
      : `${destination.name} (${stateName ?? "India"}) in ${monthName} — aerial and on-ground footage from NakshIQ's coverage.`,
    thumbnailUrl: destinationImage(id),
  });

  const verdictLabel =
    verdict === "go" ? "VISIT" :
    verdict === "skip" ? "SKIP" :
    verdict === "wait" ? "WAIT" :
    score >= 5 ? "PEAK" :
    score >= 4 ? "GOOD" :
    score >= 3 ? "MIXED" :
    score >= 1 ? "CAUTION" : "GUIDE";
  const isHiRender = locale === "hi";
  const MONTH_NAMES_HI: Record<string, string> = {
    jan: "जनवरी", feb: "फ़रवरी", mar: "मार्च", apr: "अप्रैल", may: "मई", jun: "जून",
    jul: "जुलाई", aug: "अगस्त", sep: "सितंबर", oct: "अक्टूबर", nov: "नवंबर", dec: "दिसंबर",
  };
  const renderMonthName = isHiRender ? (MONTH_NAMES_HI[month] ?? monthName) : monthName;
  const renderDestName = (isHiRender && (destination as any).translations?.hi?.name) || destination.name;
  const masthHead = isHiRender
    ? `${renderMonthName} में ${renderDestName}.`
    : `${renderDestName} in ${renderMonthName}.`;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {touristTripJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      <Nav />
      <ScrollDepthTracker page="destination_month" destinationId={id} month={month} />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {stateName ? `${stateName.toUpperCase()} · ` : ""}{monthName.toUpperCase()} {new Date().getFullYear()} · {verdictLabel} · {formatScoreInline(score).toUpperCase()}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {masthHead}
          </h1>
          {(destination as any).tagline && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.4,
                color: "var(--bone-dim)",
                marginTop: 24,
                maxWidth: 720,
              }}
            >
              {(destination as any).tagline}
            </p>
          )}
          {editor && (
            <div style={{ marginTop: 28 }}>
              <AuthorByline
                author={editor}
                locale={locale}
                variant="compact"
                reviewedAt={reviewedAt}
              />
            </div>
          )}
        </header>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <DestinationMonth
            destination={destination}
            currentMonth={currentMonth}
            allMonths={allMonths}
            monthNum={monthNum}
            monthSlug={month}
            monthName={monthName}
            permits={permits}
            nearby={nearby}
            locale={locale}
            peakMonth={peakMonth}
          />
        </div>
      </main>
      <CinematicRelatedRail />
      {/* Scroll-triggered email capture — parity with /destination/[id]. Month
          pages take the bulk of SEO traffic, so the bouncer who never reaches
          the end-of-article NewsletterSignup still gets one dismissible ask. */}
      <NewsletterStickyTray />
      <Footer />
    </div>
  );
}
