import Link from "next/link";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";
import { difficultyExplainer } from "@/lib/difficulty-copy";
import { NewsletterSignup } from "./newsletter-signup";
import { WhatsAppShare } from "./whatsapp-share";
import { PeakAlertHook } from "./peak-alert-hook";
import { destinationImage } from "@/lib/image-url";
import SHORTLIST from "@/data/month-shortlist-summary.json";
import { preload } from "react-dom";
import { videoSrc } from "@/lib/video-url";
import { DestinationSectionNav } from "./destination-section-nav";
import { SectionLabel } from "./ui/section-label";
import { BookingHandoff } from "./booking-handoff";
import { formatScore, formatScoreInline, SCORE_MAX } from "@itp/shared";
import { MONTH_NAMES_HI } from "@/lib/trip-cost";

// ── Constants ──────────────────────────────────────────────────

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SLUGS = [
  "", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const SCORE_LABELS: Record<number, { label: string; color: string }> = {
  5: { label: "Peak Season", color: "text-emerald-400" },
  4: { label: "Good Time", color: "text-blue-400" },
  3: { label: "Fair", color: "text-yellow-400" },
  2: { label: "Caution", color: "text-orange-400" },
  1: { label: "Avoid", color: "text-red-400" },
  0: { label: "No Data", color: "text-zinc-400" },
};

const SCORE_BG: Record<number, string> = {
  5: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  4: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  3: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30",
  2: "from-orange-500/20 to-orange-600/5 border-orange-500/30",
  1: "from-red-500/20 to-red-600/5 border-red-500/30",
  0: "from-zinc-500/20 to-zinc-600/5 border-zinc-500/30",
};

// ── Types ──────────────────────────────────────────────────────

interface DestinationMonthProps {
  destination: any;
  currentMonth: any;
  allMonths: any[];
  monthNum: number;
  monthSlug: string;
  monthName: string;
  permits: any[];
  nearby: any[];
  locale: string;
  /**
   * Pre-resolved peak month for this destination (server-side via getPeakMonth).
   * When present, renders the PeakAlertHook mid-page between Why-This-Score
   * and Things-To-Do. Hidden when null (destination has no month scoring ≥ 4).
   */
  peakMonth?: { monthNum: number; monthName: string; score: number } | null;
}

// ── Component ──────────────────────────────────────────────────

export function DestinationMonth({
  destination,
  currentMonth,
  allMonths,
  monthNum,
  monthSlug,
  monthName,
  permits,
  nearby,
  locale,
  peakMonth,
}: DestinationMonthProps) {
  const score = currentMonth?.score ?? 0;
  const scoreInfo = SCORE_LABELS[score] ?? SCORE_LABELS[0];
  const stateData = destination.state as any;
  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;
  const stateId: string | undefined =
    (Array.isArray(stateData) ? stateData[0]?.id : stateData?.id) ?? destination.state_id;
  // Prefer the state-in-month hub (higher authority, starves without backlinks).
  const whereToGoHref = stateId
    ? `/${locale}/where-to-go/${stateId}-in-${monthSlug}`
    : `/${locale}/where-to-go/${monthSlug}`;
  const kids = Array.isArray(destination.kids_friendly)
    ? destination.kids_friendly[0]
    : destination.kids_friendly;
  const confidence = Array.isArray(destination.confidence_cards)
    ? destination.confidence_cards[0]
    : destination.confidence_cards;
  // Hero poster is the LCP element on dest×month pages — preload it with high
  // priority during SSR (2026-07-15 audit: lcp-hints / lcp-fetchpriority).
  preload(destinationImage(destination.id, 1600), { as: "image", fetchPriority: "high" });

  // ── Helpers ────────────────────────────────────────────────

  function scoreDots(s: number) {
    return (
      <span className="inline-flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i <= s ? "bg-current" : "bg-zinc-700"}`}
          />
        ))}
      </span>
    );
  }

  // ── 0. Media Hero ──────────────────────────────────────────
  // Cinematic video + poster-image banner, ported from the main
  // destination page so that month-specific detail pages don't land as
  // a text wall. Same video source + poster fallback pattern, so a
  // destination without a video file still shows its image.

  const MediaHero = () => (
    <FadeIn>
      <div
        className="relative h-56 sm:h-72 lg:h-[32rem] rounded-2xl lg:rounded-none overflow-hidden film-grain lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:w-screen"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.02 260), oklch(0.18 0.01 280))",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={destinationImage(destination.id, 1600)}
        >
          <source
            src={videoSrc(destination.id)}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
      </div>
    </FadeIn>
  );

  // ── 1. Score Hero ──────────────────────────────────────────
  // One unified announcement card — verdict stamp + score + title +
  // verdict prose + meta chips, all in the first card the reader sees.
  // Replaces the old 2-box pattern (ScoreHero + separate VerdictCard)
  // which was duplicative and pushed the actual answer below the fold.

  const ScoreHero = () => {
    const verdictKey: "go" | "wait" | "skip" | null = currentMonth?.verdict ?? null;
    const verdictTone: Record<"go" | "wait" | "skip", { stamp: string; accent: string }> = {
      go: { stamp: "text-emerald-400", accent: "#34D399" },
      wait: { stamp: "text-amber-400", accent: "#F59E0B" },
      skip: { stamp: "text-[#E55642]", accent: "#E55642" },
    };
    const verdictLabel: Record<"go" | "wait" | "skip", string> = {
      go: "GO", wait: "WAIT", skip: "SKIP",
    };
    const tone = verdictKey ? verdictTone[verdictKey] : null;
    // Prefer editorial prose; fall back to skip_reason for skip/wait.
    const verdictProse: string | null =
      (currentMonth?.go_or_skip_verdict as string | undefined) ??
      (verdictKey && verdictKey !== "go" ? (currentMonth?.skip_reason as string | undefined) : undefined) ??
      null;

    return (
      <FadeIn>
        <div
          className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${SCORE_BG[score]} p-6 sm:p-8 md:p-10 lg:p-12`}
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

          {/* Top row — verdict stamp on the left, score pill on the right.
              Stacks on small screens so neither element crushes. */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            {tone ? (
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-serif italic font-medium text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight ${tone.stamp}`}
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
                >
                  {verdictLabel[verdictKey!]}
                </span>
                <SectionLabel as="span" className="text-zinc-300 opacity-70">
                  in {monthName}
                </SectionLabel>
              </div>
            ) : (
              <div />
            )}
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight tabular-nums ${scoreInfo.color}`}>
                {formatScore(score)}
              </span>
              <span className="text-xl text-zinc-500 font-light">/{SCORE_MAX}</span>
              <span className={`ml-2 text-sm font-semibold ${scoreInfo.color}`}>
                {scoreInfo.label}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl lg:tracking-tight">
            {destination.name} in {monthName}
          </h1>
          {stateName && (
            <p className="mt-1 text-sm sm:text-base text-zinc-400">{stateName}, India</p>
          )}

          {/* The actual answer — verdict prose, no longer hidden below the fold */}
          {verdictProse && (
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/90 max-w-prose">
              {verdictProse}
            </p>
          )}

          {/* Peak-crowd caveat — the score rates conditions, not crowd. When THIS
              month is in the destination's verified peak_months, flag it so a high
              score never reads as "empty and perfect". Mirrors the cinematic hub
              caveat; shows nothing when we lack crowd data (honest scarcity). */}
          {(() => {
            const cal = (destination as any).crowd_calendar;
            const isPeak =
              cal && typeof cal === "object" && Array.isArray(cal.peak_months) &&
              cal.peak_months.includes(monthNum);
            if (!isPeak) return null;
            return (
              <div className="mt-6 max-w-prose rounded-xl border border-[#E55642]/40 bg-[#E55642]/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E55642]">
                  Peak crowds
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {`${monthName} is one of ${destination.name}'s busiest months. The score rates conditions — weather, access, value — not how many people you'll share them with.${cal.note ? ` ${cal.note}` : ""}`}
                </p>
              </div>
            );
          })()}

          {/* Meta chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {destination.elevation_m && (
              <span className="rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm text-zinc-300">
                {destination.elevation_m.toLocaleString()}m
              </span>
            )}
            <span className={`rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm capitalize ${DIFFICULTY_COLORS[destination.difficulty] ?? "text-zinc-300"}`}>
              {destination.difficulty}
            </span>
            {destination.budget_tier && (
              <span className="rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm text-zinc-300">
                {destination.budget_tier}
              </span>
            )}
          </div>

          {/* The difficulty grade alone ("Hard") tells the reader nothing —
              hard to reach? hard to walk? Spell out what it means. */}
          {difficultyExplainer(destination.difficulty, locale) && (
            <p className="mt-2 max-w-prose text-xs leading-relaxed text-zinc-500">
              {difficultyExplainer(destination.difficulty, locale)}
            </p>
          )}
        </div>
      </FadeIn>
    );
  };

  // ── 2. Lead Paragraph + Prose Payoff ────────────────────────

  const LeadParagraph = () => {
    // Prefer hand-written prose when available
    const proseLead = currentMonth?.prose_lead;
    const prosePayoff = currentMonth?.prose_payoff;
    const note = currentMonth?.note;
    const whyGo = currentMonth?.why_go;

    if (!proseLead && !note && !whyGo) return null;

    return (
      <FadeIn delay={0.15}>
        {proseLead ? (
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-zinc-200 md:text-xl font-medium">
              {proseLead}
            </p>
            {prosePayoff && (
              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500 mb-3">
                  The {monthName} story
                </h2>
                <p className="text-base leading-relaxed text-zinc-300">
                  {prosePayoff}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
            {note}
            {note && whyGo && ". "}
            {whyGo}
          </p>
        )}
      </FadeIn>
    );
  };

  // ── 2a. Month Weather ───────────────────────────────────────
  //
  // Explicit "{name} weather in {month}" section. Born 2026-07-15: GSC shows
  // 22K impressions/28d on "[dest] weather in [month]" queries landing on these
  // pages at position 5–11 — but the body never said "weather", so relevance
  // (and clicks) went to weather portals. Renders ONLY numbers parsed from this
  // month's hand-verified editorial note (temp range / rainfall) — no seasonal
  // approximations, no fabricated figures. No verified numbers → no section.

  const MonthWeather = () => {
    const note: string = currentMonth?.note ?? "";
    const tempM = note.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]\b/);
    const rainM = note.match(/(\d{2,4})\s*(?:to|-|–|—)\s*(\d{2,4})\s*mm/i);
    if (!tempM && !rainM) return null;
    const isHi = locale === "hi";
    const heading = isHi
      ? `${MONTH_NAMES_HI[monthNum - 1]} में ${destination.name} का मौसम`
      : `${destination.name} weather in ${monthName}`;
    // The note itself is the month's weather story. It already renders as the
    // lead paragraph when there's no prose_lead — only repeat it here when
    // prose_lead exists (otherwise the same line would show twice in a row).
    const showNote = !!currentMonth?.prose_lead && note;
    return (
      <FadeIn delay={0.18}>
        <section aria-labelledby="month-weather-heading" className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 id="month-weather-heading" className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500 mb-4">
            {heading}
          </h2>
          <div className="flex flex-wrap gap-3">
            {tempM && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200">
                🌡 {tempM[1]}–{tempM[2]}°C <span className="text-zinc-500">{isHi ? "दिन" : "days"}</span>
              </span>
            )}
            {rainM && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200">
                🌧 {rainM[1]}–{rainM[2]}mm <span className="text-zinc-500">{isHi ? "बारिश" : "rain"}</span>
              </span>
            )}
          </div>
          {showNote && (
            <p className="mt-4 text-base leading-relaxed text-zinc-300">{note}</p>
          )}
        </section>
      </FadeIn>
    );
  };

  // ── 2b. Off-Season Drivers ──────────────────────────────────
  //
  // When the verdict is "skip" or "wait", a destination still serves
  // specific audiences in this month: destination weddings, work-trip
  // bookings, festival pilgrims, off-season corporate. Surface them so
  // the page answers "but if I have to come this month, who actually does?"
  // Reads currentMonth.off_season_drivers (jsonb, nullable — UI hides if absent).

  const OffSeasonDrivers = () => {
    type Driver = {
      driver: "wedding" | "festival" | "corporate" | "pilgrimage" | "study" | "other";
      audience: string;
      note: string;
      source_url?: string;
    };
    const drivers = (currentMonth?.off_season_drivers as Driver[] | null | undefined) ?? null;
    if (!drivers || drivers.length === 0) return null;

    const verdictKey = currentMonth?.verdict;
    // Only surface when the month is otherwise a "wait" or "skip" — the
    // section is about explaining why people still come in down months.
    if (verdictKey === "go") return null;

    const LABEL: Record<Driver["driver"], string> = {
      wedding: "Wedding",
      festival: "Festival",
      corporate: "Corporate",
      pilgrimage: "Pilgrimage",
      study: "Study",
      other: "Other",
    };

    return (
      <FadeIn delay={0.18}>
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500 mb-3">
            Who still comes in {monthName}
          </h2>
          <ul className="space-y-3">
            {drivers.map((d, i) => (
              <li key={`${d.driver}-${i}`} className="flex gap-3">
                <span className="shrink-0 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300/90">
                  {LABEL[d.driver] ?? "Other"}
                </span>
                <div className="text-sm leading-relaxed text-zinc-300">
                  <span className="font-medium text-zinc-200">{d.audience}.</span>{" "}
                  <span className="text-zinc-400">{d.note}</span>
                  {d.source_url && (
                    <>
                      {" "}
                      <a
                        href={d.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2"
                      >
                        source ↗
                      </a>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    );
  };

  // ── 3. Why This Score ──────────────────────────────────────

  // Only render rows that are genuinely month-specific. Destination-level
  // facts (reach blob, emergency info, elevation, difficulty, budget,
  // network availability) live on /destination/[id] — repeating them here
  // creates 3× duplication with the hero chips + the old Practical section.
  const WhyThisScore = () => {
    const items: { icon: string; label: string; value: string }[] = [];

    if (currentMonth?.note) {
      items.push({ icon: "🌤", label: "Weather", value: currentMonth.note });
    }
    const festivals: string[] | undefined = currentMonth?.festivals_this_month;
    if (Array.isArray(festivals) && festivals.length > 0) {
      items.push({
        icon: "🎉",
        label: "Festivals this month",
        value: festivals.join(" · "),
      });
    }

    if (items.length === 0) return null;

    return (
      <ScrollReveal>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">
            Why {monthName} scores {formatScoreInline(score)}
          </h2>
          <div className="mt-4 grid gap-3">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
              >
                <span className="mt-0.5 text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-sm text-zinc-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    );
  };

  // ── 3b. Things To Do This Month ────────────────────────────
  // Column-gated list of 3–5 month-specific activities. Lead verbs
  // (ski, trek, swim, walk) — not adjectives. Distinct from the
  // general destination "what to do" so Google sees month intent.

  const ThingsToDo = () => {
    const items: string[] | undefined = currentMonth?.things_to_do;
    if (!Array.isArray(items) || items.length === 0) return null;

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          What to do in {destination.name} this {monthName}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((thing, i) => (
            <li
              key={`${i}-${thing.slice(0, 20)}`}
              className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-zinc-200">{thing}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    );
  };

  // ── 4. Who Should Go / Think Twice ─────────────────────────

  const WhoShouldGo = () => {
    const goList: string[] = [];
    const thinkTwice: string[] = [];

    // Difficulty-based
    if (destination.difficulty === "easy") {
      goList.push("First-time travelers");
      goList.push("Senior citizens");
    } else if (destination.difficulty === "moderate") {
      goList.push("Travelers with basic fitness");
      thinkTwice.push("Those with mobility issues");
    } else if (destination.difficulty === "hard" || destination.difficulty === "extreme") {
      goList.push("Experienced trekkers / adventurers");
      thinkTwice.push("First-time travelers");
      thinkTwice.push("Anyone with health conditions");
    }

    // Use hand-written lists from DB if available
    if (currentMonth?.who_should_go?.length > 0) {
      goList.push(...currentMonth.who_should_go);
    } else {
      // Auto-generate from data
      if (kids?.suitable) goList.push("Families with children");
      else thinkTwice.push("Families with young children");
      const netCheck = typeof confidence?.network === "object" ? JSON.stringify(confidence.network) : String(confidence?.network || "");
      if (confidence?.network && !netCheck.toLowerCase().includes("no signal") && !netCheck.toLowerCase().includes("false")) {
        goList.push("Remote workers (network available)");
      }
      if (score >= 4) goList.push("Anyone looking for the best time to visit");
    }

    if (currentMonth?.who_should_avoid?.length > 0) {
      thinkTwice.push(...currentMonth.who_should_avoid);
    } else {
      // Auto-generate from data
      const netCheck2 = typeof confidence?.network === "object" ? JSON.stringify(confidence.network) : String(confidence?.network || "");
      if (destination.elevation_m && destination.elevation_m > 3500) thinkTwice.push("Those prone to altitude sickness");
      if (confidence?.network && (netCheck2.toLowerCase().includes("no signal") || netCheck2.includes('"jio":false'))) thinkTwice.push("Anyone needing constant connectivity");
      if (score <= 2) thinkTwice.push("Those with flexible dates — better months exist");
      if (currentMonth?.why_not) thinkTwice.push(currentMonth.why_not);
    }

    if (goList.length === 0 && thinkTwice.length === 0) return null;

    return (
      <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          {goList.length > 0 && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="mb-4 text-lg font-bold text-emerald-400">
                Who should go
              </h3>
              <ul className="space-y-2">
                {goList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-300">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {thinkTwice.length > 0 && (
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
              <h3 className="mb-4 text-lg font-bold text-orange-400">
                Who should think twice
              </h3>
              <ul className="space-y-2">
                {thinkTwice.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-300">
                    <span className="mt-0.5 text-orange-400">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollReveal>
    );
  };

  // ── 5. Month Comparison Table ──────────────────────────────

  const MonthTable = () => {
    // Sort months 1-12
    const sorted = [...allMonths].sort((a: any, b: any) => a.month - b.month);

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-semibold text-white">All 12 Months</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Month</th>
                <th className="px-4 py-3 text-center font-medium text-zinc-400">Score</th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-400 md:table-cell">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m: any) => {
                const isActive = m.month === monthNum;
                const mScore = m.score ?? 0;
                const mSlug = MONTH_SLUGS[m.month];
                const mName = MONTH_NAMES[m.month];
                const scoreColor = SCORE_LABELS[mScore]?.color ?? "text-zinc-400";

                return (
                  <tr
                    key={m.month}
                    className={`border-b border-zinc-800/50 transition-colors ${
                      isActive
                        ? "bg-white/5 ring-1 ring-inset ring-white/10"
                        : "hover:bg-zinc-800/30"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/destination/${destination.id}/${mSlug}`}
                        className={`font-medium transition-colors hover:text-white ${
                          isActive ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {mName}
                      </Link>
                      {isActive && (
                        <span className="ml-2 inline-block rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
                          viewing
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold tabular-nums ${scoreColor}`}>
                        {formatScoreInline(mScore)}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-zinc-500 md:table-cell">
                      {m.note || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    );
  };

  // ── 5b. Pack List for This Month ───────────────────────────
  // Column-gated. 5–7 items tuned to altitude + month weather.
  // Rendered as its own section for scan-readability.

  const PackList = () => {
    const items: string[] | undefined = currentMonth?.pack_list;
    if (!Array.isArray(items) || items.length === 0) return null;

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          What to pack for {monthName}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={`pack-${i}`}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3"
            >
              <span className="text-primary">▸</span>
              <span className="text-sm text-zinc-200">{item}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    );
  };

  // ── 6. Full-guide link ─────────────────────────────────────
  // Replaces the old PracticalDetails + HowToDoIt footer blocks. Those
  // sections re-rendered destination-level facts (reach, emergency,
  // elevation) that already appear on /destination/[id] — surfacing them
  // three times cluttered the month page without adding signal.

  const FullGuideLink = () => (
    <ScrollReveal>
      <Link
        href={`/${locale}/destination/${destination.id}`}
        className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
      >
        <SectionLabel className="text-zinc-500">Destination reference</SectionLabel>
        <p className="mt-1.5 text-base text-zinc-200">
          Full reach, permits, stays, emergency contacts and year-round
          context on the <span className="font-semibold text-white underline-offset-2 group-hover:underline">{destination.name} guide</span>
          <span className="ml-1 transition-transform inline-block group-hover:translate-x-0.5">&rarr;</span>
        </p>
      </Link>
    </ScrollReveal>
  );

  // ── 7. Nearby Destinations ─────────────────────────────────

  const NearbySection = () => {
    if (!nearby || nearby.length === 0) return null;

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Nearby in {stateName} scoring high in {monthName}
        </h2>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((n: any) => {
            const nMonths = Array.isArray(n.destination_months)
              ? n.destination_months
              : [n.destination_months];
            const nMonth = nMonths[0];
            const nScore = nMonth?.score ?? 0;
            const nScoreInfo = SCORE_LABELS[nScore] ?? SCORE_LABELS[0];

            return (
              <StaggerItem key={n.id}>
                <HoverCard>
                  <Link
                    href={`/${locale}/destination/${n.id}/${monthSlug}`}
                    className="block rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold text-white">{n.name}</h3>
                      <span className={`text-lg font-black tabular-nums ${nScoreInfo.color}`}>
                        {formatScoreInline(nScore)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {n.difficulty && (
                        <span className={`capitalize ${DIFFICULTY_COLORS[n.difficulty] ?? "text-zinc-400"}`}>
                          {n.difficulty}
                        </span>
                      )}
                      {n.elevation_m && (
                        <span className="text-zinc-500">
                          {n.elevation_m.toLocaleString()}m
                        </span>
                      )}
                      {n.budget_tier && (
                        <span className="text-zinc-500">{n.budget_tier}</span>
                      )}
                    </div>
                    {nMonth?.note && (
                      <p className="mt-2 line-clamp-2 text-xs text-zinc-500">
                        {nMonth.note}
                      </p>
                    )}
                  </Link>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollReveal>
    );
  };

  // ── 8 & 9. Navigation ──────────────────────────────────────

  const BottomNav = () => (
    <ScrollReveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/${locale}/destination/${destination.id}`}
          className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          Full {destination.name} guide
        </Link>
        <Link
          href={whereToGoHref}
          className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
        >
          {stateId && stateName
            ? `Where to go in ${stateName}, ${monthName}`
            : `All destinations in ${monthName}`}
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </ScrollReveal>
  );

  // How to reach (month-aware) — the transport block is absent on month pages
  // otherwise. Reuses the destination's nearest_airport/nearest_railhead strings
  // (which already embed distances) and, crucially, surfaces a MONTH-GATED access
  // caveat: the one thing Maps/Rome2Rio/OTAs structurally flatten. The caveat is
  // pulled from existing data (skip_reason / why_not) ONLY when it names a real
  // access issue (road/snow/monsoon/closure) — no new data, no fabrication.
  const HowToReachMonth = () => {
    const airport = (destination as any).nearest_airport as string | undefined;
    const rail = (destination as any).nearest_railhead as string | undefined;
    if (!airport && !rail) return null;
    const isHi = locale === "hi";
    const MONTH_HI: Record<string, string> = {
      January: "जनवरी", February: "फ़रवरी", March: "मार्च", April: "अप्रैल",
      May: "मई", June: "जून", July: "जुलाई", August: "अगस्त",
      September: "सितंबर", October: "अक्टूबर", November: "नवंबर", December: "दिसंबर",
    };
    const monthDisp = isHi ? (MONTH_HI[monthName] ?? monthName) : monthName;
    // Show the access caveat only when the month's editorial reason actually names
    // an access problem — otherwise a heat/crowd skip would mislabel as "access".
    const accessRe = /\b(road|highway|snow|landslide|monsoon|flood|wash(?:ed)?|closed|closure|passes?|block(?:ed|s)?|cut off|inaccessible|jam)\b/i;
    const caveatRaw =
      (currentMonth?.skip_reason as string | undefined) ||
      (currentMonth?.verdict && currentMonth.verdict !== "go"
        ? (currentMonth?.why_not as string | undefined)
        : undefined);
    const accessCaveat = caveatRaw && accessRe.test(caveatRaw) ? caveatRaw.trim() : null;
    return (
      <div>
        <h2 className="text-xl font-bold sm:text-2xl">
          {isHi ? `${destination.name} कैसे पहुँचें` : `How to reach ${destination.name}`}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {airport && (
            <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {isHi ? "हवाई अड्डा" : "Airport"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">{airport}</p>
            </div>
          )}
          {rail && (
            <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {isHi ? "रेलवे" : "Rail"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed">{rail}</p>
            </div>
          )}
        </div>
        {accessCaveat && (
          <div className="mt-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-600 dark:text-amber-500">
              {isHi ? `${monthDisp} में पहुँच` : `Access in ${monthDisp}`}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{accessCaveat}</p>
          </div>
        )}
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────
  // Build sidebar ToC sections — only include ones that have data so the
  // rail doesn't show dead anchors.
  const hasLead = !!(currentMonth?.prose_lead || currentMonth?.note || currentMonth?.why_go);
  const hasThings = Array.isArray(currentMonth?.things_to_do) && currentMonth.things_to_do.length > 0;
  const hasPack = Array.isArray(currentMonth?.pack_list) && currentMonth.pack_list.length > 0;
  const hasNearby = Array.isArray(nearby) && nearby.length > 0;
  const hasReach = !!((destination as any).nearest_airport || (destination as any).nearest_railhead);
  const hasWhy = !!(
    currentMonth?.note ||
    (Array.isArray(currentMonth?.festivals_this_month) && currentMonth.festivals_this_month.length > 0)
  );
  const monthSections = [
    hasLead && { id: "lead", label: `${monthName} overview` },
    hasWhy && { id: "why", label: `Why ${formatScoreInline(score)}` },
    peakMonth && { id: "alert", label: `Peak alert · ${peakMonth.monthName}` },
    hasThings && { id: "things", label: "What to do" },
    { id: "who", label: "Who should go" },
    { id: "months", label: "All 12 months" },
    hasPack && { id: "pack", label: "What to pack" },
    hasNearby && { id: "nearby", label: "Nearby" },
    hasReach && { id: "reach", label: "How to reach" },
    { id: "booking", label: "Where to stay" },
    { id: "guide", label: `Full ${destination.name} guide` },
  ].filter((s): s is { id: string; label: string } => Boolean(s));

  return (
    <article className="space-y-10">
      {/* Sticky back + breadcrumb bar — always visible wayfinding */}
      <div className="sticky top-20 z-30 -mt-2">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/85 backdrop-blur px-3 py-2 text-xs sm:text-sm shadow-sm">
          <Link
            href={`/${locale}/destination/${destination.id}`}
            className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <span aria-hidden>&larr;</span> Back
          </Link>
          <span className="text-border" aria-hidden>•</span>
          <nav
            className="flex items-center gap-1.5 text-muted-foreground min-w-0 overflow-hidden"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${locale}/explore`}
              className="hover:text-foreground transition-colors truncate hidden sm:inline"
            >
              Destinations
            </Link>
            <span className="opacity-50 hidden sm:inline" aria-hidden>/</span>
            <Link
              href={`/${locale}/destination/${destination.id}`}
              className="hover:text-foreground transition-colors truncate"
            >
              {destination.name}
            </Link>
            <span className="opacity-50" aria-hidden>/</span>
            <span className="text-foreground truncate">{monthName}</span>
          </nav>
        </div>
      </div>

      <MediaHero />

      {/* 2-col grid at lg+ — main content + sticky sidebar ToC */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:items-start">
        <div className="space-y-10 min-w-0">
          <ScoreHero />

          {/* WhatsApp Share */}
          <div className="flex">
            <WhatsAppShare
              message={`${destination.name} in ${monthName}: ${formatScoreInline(score)}. ${currentMonth?.note?.substring(0, 100) || ""}. Full guide: https://www.nakshiq.com/en/destination/${destination.id}/${monthSlug}`}
            />
          </div>

          <section id="section-lead" className="scroll-mt-28">
            <LeadParagraph />
            <MonthWeather />
            <OffSeasonDrivers />
          </section>
          <section id="section-why" className="scroll-mt-28">
            <WhyThisScore />
          </section>
          {/* Render on EVERY month a peak exists — not just score >= 4. The hook's
              strongest pitch is the off-month "this isn't the month, <peak> is —
              save it for the right window" branch, which only fires at score <= 3.
              Gating to score >= 4 made that branch dead code AND hid the Save CTA
              from the highest-traffic WAIT/off-month pages, while the "Peak alert"
              nav pill (rendered on any peakMonth) scrolled to a missing section.
              Dropping the gate fixes both (2026-06-10). */}
          {peakMonth && (
            <section id="section-alert" className="scroll-mt-28">
              <PeakAlertHook
                destinationId={destination.id}
                destinationName={destination.name}
                peakMonthName={peakMonth.monthName}
                peakMonthNum={peakMonth.monthNum}
                locale={locale === "hi" ? "hi" : "en"}
                source={`dest-month-${destination.id}-${monthSlug}`}
                currentMonthName={monthName}
                currentScore={score}
              />
            </section>
          )}
          <section id="section-things" className="scroll-mt-28">
            <ThingsToDo />
          </section>
          <section id="section-who" className="scroll-mt-28">
            <WhoShouldGo />
          </section>
          <section id="section-months" className="scroll-mt-28">
            <MonthTable />
          </section>
          <section id="section-pack" className="scroll-mt-28">
            <PackList />
          </section>
          <section id="section-nearby" className="scroll-mt-28">
            <NearbySection />
          </section>
          {hasReach && (
            <section id="section-reach" className="scroll-mt-28">
              <HowToReachMonth />
            </section>
          )}
          <section id="section-booking" className="scroll-mt-28">
            <BookingHandoff
              destinationName={destination.name}
              stateName={stateName}
              destinationId={destination.id}
            />
          </section>
          {/* Gated on destination_costs rows existing (destination_costs(count)
              in the page query) — /cost/[slug] 404s for dests without cost rows
              (the 2026-06-14 Sikkim cohort), and GSC flagged those links. */}
          {(destination.destination_costs?.[0]?.count ?? 0) > 0 && (
          <section id="section-cost" className="scroll-mt-28">
            <Link
              href={`/${locale}/cost/${destination.id}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/30 p-5 transition-colors hover:border-foreground/40 hover:bg-muted/50 sm:p-6"
            >
              <span>
                <span className="text-base font-bold sm:text-lg">
                  {locale === "hi" ? `${destination.name} की यात्रा का खर्च` : `What ${destination.name} costs`}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                  {locale === "hi"
                    ? `${monthName} के लिए दिन, यात्री और शैली के हिसाब से बजट — मौसम-अनुसार अनुमान।`
                    : `Budget for ${monthName} by days, travellers and style — a season-adjusted estimate.`}
                </span>
              </span>
              <span aria-hidden className="shrink-0 text-muted-foreground">&rarr;</span>
            </Link>
          </section>
          )}
          <section id="section-guide" className="scroll-mt-28">
            <FullGuideLink />
          </section>
        </div>

        <aside className="hidden lg:block">
          <DestinationSectionNav sections={monthSections} variant="sidebar" />
        </aside>
      </div>

      {/* Newsletter — dual-offer copy (2026-05-17 conversion suite): the
          weekly Window briefing PLUS a 3-week heads-up before each saved
          destination peaks. Updated from the single-offer Sunday-only copy
          after audit showed 0 real subscribers on a generic "weekly email"
          ask — context-specific value-extension converts better at the
          end-of-article moment. */}
      <NewsletterSignup
        source={`dest-month-${destination.id}-${monthSlug}`}
        headline={
          locale === "hi"
            ? `${SHORTLIST.totals.listed} जगहें अभी अपने सबसे अच्छे महीने में हैं`
            : `${SHORTLIST.totals.listed} places are at their best right now`
        }
        subhead={
          locale === "hi"
            ? `भारत की ${SHORTLIST.totals.destinations} जगहों में से ${SHORTLIST.totals.listed} इस समय अपने सही महीने में हैं — और ${SHORTLIST.totals.inAMonthToAvoid} ऐसे महीने में हैं जिनसे हम बचने को कहेंगे। पूरी सूची भेज देते हैं।`
            : `${SHORTLIST.totals.listed} of ${SHORTLIST.totals.destinations} places in India are in their best month right now — and ${SHORTLIST.totals.inAMonthToAvoid} are in one we'd tell you to skip. We'll send the list.`
        }
        buttonLabel={locale === "hi" ? "सूची भेजें" : "Send it"}
      />

      {/* Divider */}
      <div className="border-t border-zinc-800" />

      <BottomNav />
    </article>
  );
}
