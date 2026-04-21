"use client";

import Link from "next/link";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";
import { NewsletterSignup } from "./newsletter-signup";
import { WhatsAppShare } from "./whatsapp-share";
import { destinationImage } from "@/lib/image-url";
import VerdictCard from "./verdict-card";

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
        className="relative h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden film-grain"
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
          poster={destinationImage(destination.id)}
        >
          <source
            src={`${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/${destination.id}.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">
              {monthName} · {stateName ?? "India"}
            </div>
            <div className="mt-1 font-serif italic text-2xl sm:text-3xl text-white">
              {destination.name}
            </div>
          </div>
          <span
            className={`rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.22em] ${scoreInfo.color}`}
          >
            {score}/5 · {scoreInfo.label}
          </span>
        </div>
      </div>
    </FadeIn>
  );

  // ── 1. Score Hero ──────────────────────────────────────────

  const ScoreHero = () => (
    <FadeIn>
      <div
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${SCORE_BG[score]} p-8 md:p-12`}
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
          <Link href={`/${locale}/explore`} className="hover:text-white transition-colors">
            Destinations
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/destination/${destination.id}`}
            className="hover:text-white transition-colors"
          >
            {destination.name}
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{monthName}</span>
        </nav>

        {/* Score display */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className={`text-7xl font-black tracking-tight ${scoreInfo.color}`}>
                {score}
              </span>
              <span className="text-2xl text-zinc-500 font-light">/5</span>
            </div>
            <p className={`text-lg font-semibold ${scoreInfo.color}`}>
              {scoreInfo.label}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              {destination.name} in {monthName}
            </h1>
            {stateName && (
              <p className="mt-1 text-zinc-400">{stateName}, India</p>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
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
        </div>
      </div>
    </FadeIn>
  );

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
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
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

  // ── 2b. Go / Skip Verdict ──────────────────────────────────
  // Column-gated: only renders when editorial has populated it.
  // Leading word ("Go", "Skip", "Mixed") drives the stamp colour,
  // mirroring the Weekly-Picks stamp system.

  const GoOrSkipVerdict = () => {
    const verdict: string | undefined = currentMonth?.go_or_skip_verdict;
    if (!verdict) return null;

    const leader = verdict.trim().split(/[\s,:.]/, 1)[0]?.toLowerCase() ?? "";
    const toneClass =
      leader === "skip"
        ? "border-red-500/40 from-red-950/40 to-red-900/10 text-red-200"
        : leader === "mixed"
          ? "border-amber-500/40 from-amber-950/40 to-amber-900/10 text-amber-200"
          : "border-emerald-500/40 from-emerald-950/40 to-emerald-900/10 text-emerald-200";
    const stamp =
      leader === "skip" ? "SKIP" : leader === "mixed" ? "MIXED" : "GO";

    return (
      <FadeIn delay={0.2}>
        <div className={`rounded-2xl border bg-gradient-to-br p-5 sm:p-6 ${toneClass}`}>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-2">
            The verdict · {stamp}
          </div>
          <p className="text-base sm:text-lg leading-relaxed">{verdict}</p>
        </div>
      </FadeIn>
    );
  };

  // ── 3. Why This Score ──────────────────────────────────────

  const WhyThisScore = () => {
    const items: { icon: string; label: string; value: string }[] = [];

    if (currentMonth?.note) {
      items.push({ icon: "🌤", label: "Weather", value: currentMonth.note });
    }
    if (confidence?.reach) {
      const reachStr = typeof confidence.reach === "object"
        ? Object.entries(confidence.reach).filter(([, v]) => v != null && typeof v !== 'object').map(([k, v]) => `${String(k).replace(/_/g, " ")}: ${v}`).join(". ")
        : String(confidence.reach);
      items.push({ icon: "🛣", label: "Roads & Access", value: reachStr });
    }
    if (confidence?.emergency) {
      const emergStr = typeof confidence.emergency === "object"
        ? Object.entries(confidence.emergency).filter(([, v]) => v != null && typeof v !== 'object').map(([k, v]) => `${String(k).replace(/_/g, " ")}: ${v}`).join(". ")
        : String(confidence.emergency);
      items.push({
        icon: "🏥",
        label: "Safety & Emergency",
        value: `${confidence.safety_rating ? `Safety: ${confidence.safety_rating}/5. ` : ""}${emergStr}`,
      });
    }
    if (confidence?.network) {
      const netStr = typeof confidence.network === "object"
        ? Object.entries(confidence.network).filter(([k]) => !["wifi_available"].includes(k)).map(([k, v]) => `${k.toUpperCase()}: ${v ? "Yes" : "No"}`).join(", ") + (confidence.network.note ? `. ${confidence.network.note}` : "")
        : String(confidence.network);
      items.push({ icon: "📶", label: "Network", value: netStr });
    }
    if (kids) {
      const kidsVal = kids.suitable
        ? `Kid-friendly (${kids.rating}/5)${kids.reasons ? ` — ${Array.isArray(kids.reasons) ? kids.reasons.join(", ") : kids.reasons}` : ""}`
        : `Not ideal for kids${kids.reasons ? ` — ${Array.isArray(kids.reasons) ? kids.reasons.join(", ") : kids.reasons}` : ""}`;
      items.push({ icon: "👶", label: "Kids", value: kidsVal });
    }
    if (destination.elevation_m) {
      items.push({
        icon: "⛰",
        label: "Elevation",
        value: `${destination.elevation_m.toLocaleString()}m — ${destination.elevation_m > 3500 ? "High altitude, acclimatisation needed" : destination.elevation_m > 2000 ? "Moderate altitude" : "Low altitude, no issues"}`,
      });
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
          <h2 className="text-2xl font-bold text-white">
            Why {monthName} scores {score}/5
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
        <h2 className="mb-4 text-2xl font-bold text-white">
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
        <h2 className="mb-4 text-2xl font-bold text-white">All 12 Months</h2>
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
                      <span className={`font-bold ${scoreColor}`}>
                        {mScore}/5
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
        <h2 className="mb-4 text-2xl font-bold text-white">
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

  // ── 6. Practical Details ───────────────────────────────────

  const PracticalDetails = () => {
    const details: { label: string; value: string }[] = [];

    if (confidence?.reach) {
      const r = confidence.reach;
      if (typeof r === "object") {
        // Build rich reach description from structured data
        const parts: string[] = [];
        if (r.from_nearest_city) parts.push(r.from_nearest_city);
        else {
          if (r.nearest_airport) parts.push(`Nearest airport: ${r.nearest_airport}`);
          if (r.nearest_railhead) parts.push(`Nearest railhead: ${r.nearest_railhead}`);
        }
        if (r.road_condition) parts.push(`Roads: ${r.road_condition}`);
        if (r.self_drive) parts.push(`Self-drive: ${r.self_drive}`);
        if (r.public_transport) parts.push(`Public transport: ${r.public_transport}`);
        if (r.last_km_difficulty) parts.push(`Last stretch: ${r.last_km_difficulty}`);
        details.push({ label: "How to reach", value: parts.join(". ") || "Contact local transport" });
      } else {
        details.push({ label: "How to reach", value: String(r) });
      }
    }
    if (destination.elevation_m)
      details.push({ label: "Elevation", value: `${destination.elevation_m.toLocaleString()}m` });
    if (destination.difficulty)
      details.push({ label: "Difficulty", value: destination.difficulty });
    if (destination.budget_tier)
      details.push({ label: "Budget tier", value: destination.budget_tier });
    if (permits && permits.length > 0) {
      details.push({
        label: "Permits required",
        value: permits.map((p: any) => `${p.name}${p.cost ? ` (${p.cost})` : ""}`).join(", "),
      });
    }

    if (details.length === 0) return null;

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-bold text-white">Practical Details</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((d) => (
            <div
              key={d.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {d.label}
              </p>
              <p className="mt-1 text-sm capitalize text-zinc-300">{d.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    );
  };

  // ── 7. Nearby Destinations ─────────────────────────────────

  const NearbySection = () => {
    if (!nearby || nearby.length === 0) return null;

    return (
      <ScrollReveal>
        <h2 className="mb-4 text-2xl font-bold text-white">
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
                      <span className={`text-lg font-black ${nScoreInfo.color}`}>
                        {nScore}/5
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

  // ── Render ─────────────────────────────────────────────────

  return (
    <article className="space-y-10">
      <MediaHero />
      <ScoreHero />

      {/* WhatsApp Share */}
      <div className="flex">
        <WhatsAppShare
          message={`${destination.name} in ${monthName}: ${score}/5. ${currentMonth?.note?.substring(0, 100) || ""}. Full guide: https://www.nakshiq.com/en/destination/${destination.id}/${monthSlug}`}
        />
      </div>

      <LeadParagraph />
      <VerdictCard
        verdict={currentMonth?.verdict ?? null}
        skipReason={currentMonth?.skip_reason ?? null}
        month={monthName}
      />
      <GoOrSkipVerdict />
      <WhyThisScore />
      <ThingsToDo />
      <WhoShouldGo />
      <MonthTable />
      <PracticalDetails />
      <PackList />
      <NearbySection />

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Divider */}
      <div className="border-t border-zinc-800" />

      <BottomNav />
    </article>
  );
}
