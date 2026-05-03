"use client";

// ColdStart — first-time visitor landing on /trip.
//
// Closes PDF Failure #1: empty Trip Board no longer dead-ends. Four entry
// paths get the user a seeded itinerary in one click:
//   1. Curated trips     — Pick a tested itinerary
//   2. By month          — "I know when I'm going"
//   3. By traveller      — Solo / couple / kids / seniors
//   4. By theme          — Vibes (monasteries / food / festivals)
//
// Visual language mirrors guided-tour.tsx v2.1 (font-serif headlines, halo,
// hairline cards). Roll-your-own — no Shepherd.js or modal lib. Mobile
// fallback: stacked layout, no halo (same tradeoff as the homepage tour).

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { currentMonthIST } from "@itp/shared";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function dayFromMonth(monthIdx0: number, dayInMonth = 5): number {
  let acc = 0;
  for (let i = 0; i < monthIdx0; i++) acc += MONTH_DAYS[i];
  return acc + dayInMonth;
}

export type ColdStartSeedStop = {
  slug: string;
  startDay: number; // day-of-year 1-365
  days?: number;
};
export type ColdStartSeed = {
  stops: ColdStartSeedStop[];
  month?: number; // 1-12 — sets state.month if provided
};

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
};

type Tab = "curated" | "month" | "profile" | "theme";

// Curated starter trips — all slugs MUST exist in destinations table. Seed
// scripts in 2026-04-29 sessions caught the FK pattern; we hand-verify here.
const CURATED = [
  {
    id: "north-loop",
    name: "The North Loop",
    sub: "Spiti × Kalpa × Parvati · 14 days · July",
    desc: "Trans-Himalayan moonscape, Kinner Kailash, hot springs. Best done in one direction across one open-pass window.",
    img: "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/spiti-valley-w1600.webp",
    seed: {
      month: 7,
      stops: [
        { slug: "kalpa", startDay: dayFromMonth(6, 5), days: 3 },
        { slug: "spiti-valley", startDay: dayFromMonth(6, 8), days: 8 },
        { slug: "parvati-valley", startDay: dayFromMonth(6, 16), days: 3 },
      ],
    },
  },
  {
    id: "south-slow",
    name: "South Slow",
    sub: "Mysore · 3 days · October",
    desc: "Dasara week — palace illumination, Chamundi Hills, silk markets. Booked-out unless you plan 60 days ahead.",
    img: "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/mysore-w1600.webp",
    seed: {
      month: 10,
      stops: [{ slug: "mysore", startDay: dayFromMonth(9, 2), days: 3 }],
    },
  },
  {
    id: "northeast-frontier",
    name: "Northeast Frontier",
    sub: "Mechuka × Lunglei · 10 days · October",
    desc: "McMahon-Line villages, Mizo highlands. Permits required; signal fades after the second day.",
    img: "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/mechuka-w1600.webp",
    seed: {
      month: 10,
      stops: [
        { slug: "mechuka", startDay: dayFromMonth(9, 8), days: 5 },
        { slug: "lunglei", startDay: dayFromMonth(9, 18), days: 4 },
      ],
    },
  },
] as const;

const PROFILES = [
  { id: "solo-f", label: "Solo · F", sub: "Safety-rated", icon: "🚶‍♀️" },
  { id: "couple", label: "Couple", sub: "Quiet, scenic", icon: "👫" },
  { id: "kids", label: "Kids 4+", sub: "Family-safe", icon: "👶" },
  { id: "seniors", label: "60+ parents", sub: "Easy access", icon: "🧓" },
] as const;

const THEMES = [
  { id: "monasteries", label: "Monasteries", icon: "☸", match: ["spiti-valley", "mechuka", "kalpa"] },
  { id: "festivals", label: "Festivals", icon: "🪔", match: ["mysore", "spiti-valley", "lunglei"] },
  { id: "high-altitude", label: "High altitude", icon: "🏔", match: ["spiti-valley", "kalpa", "munsiyari"] },
  { id: "temple-towns", label: "Temple towns", icon: "🕉", match: ["mysore", "uttarkashi"] },
  { id: "remote", label: "Remote · off-grid", icon: "📡", match: ["mechuka", "lunglei", "parvati-valley"] },
  { id: "food", label: "Food + markets", icon: "🍲", match: ["mysore", "lunglei"] },
] as const;

function scoreFor(d: DestLite, monthOneIndexed: number): number {
  const row = (d.destination_months ?? []).find((m) => m.month === monthOneIndexed);
  return row?.score ?? 0;
}

export function ColdStart({ destinations, onSeed }: { destinations: DestLite[]; onSeed: (seed: ColdStartSeed) => void }) {
  const tt = useTranslations("trip");
  const [tab, setTab] = useState<Tab>("curated");
  const [month, setMonth] = useState<number>(currentMonthIST()); // 1-12
  const [profile, setProfile] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  // Top destinations for the chosen month. We sort by score desc, then take
  // the first 8 with score ≥ 4 (prefer Go destinations) — falls back to top
  // 8 by raw score if fewer than 8 score ≥ 4.
  const monthList = useMemo(() => {
    const scored = destinations
      .map((d) => ({ d, score: scoreFor(d, month) }))
      .sort((a, b) => b.score - a.score);
    const goOnly = scored.filter((s) => s.score >= 4).slice(0, 8);
    return goOnly.length >= 4 ? goOnly : scored.slice(0, 8);
  }, [destinations, month]);

  // Profile filter — uses lite signals from the destinations[] prop. The full
  // safety-rating + kids-rating filter happens once stops are added (RPC has
  // the rich data); here we just narrow to a sensible starter set.
  const profileMatches = useMemo(() => {
    if (!profile) return [];
    const filt = (d: DestLite) => {
      switch (profile) {
        case "solo-f":
          // Lite proxy: low difficulty + lower elevation reduces solo-f risk floor.
          return (d.difficulty === "easy" || d.difficulty === "moderate") && (d.elevation_m ?? 0) < 3500;
        case "couple":
          return (d.difficulty ?? "easy") !== "extreme";
        case "kids":
          return d.difficulty === "easy" && (d.elevation_m ?? 0) < 2000;
        case "seniors":
          return d.difficulty === "easy" && (d.elevation_m ?? 0) < 1800;
        default:
          return false;
      }
    };
    return destinations.filter(filt).slice(0, 8);
  }, [destinations, profile]);

  function chooseCurated(c: (typeof CURATED)[number]) {
    onSeed({ stops: c.seed.stops.slice(), month: c.seed.month });
  }

  function chooseMonthDestination(slug: string) {
    onSeed({ stops: [{ slug, startDay: dayFromMonth(month - 1, 5), days: 3 }], month });
  }

  function chooseProfileDestination(slug: string) {
    onSeed({ stops: [{ slug, startDay: dayFromMonth(month - 1, 5), days: 3 }], month });
  }

  function chooseTheme(t: (typeof THEMES)[number]) {
    // Filter theme.match to only slugs that exist in our destinations[] prop.
    const validSlugs = t.match.filter((slug) => destinations.some((d) => d.id === slug));
    if (validSlugs.length === 0) return;
    onSeed({
      stops: validSlugs.map((slug, idx) => ({
        slug,
        startDay: dayFromMonth(month - 1, 2 + idx * 5),
        days: 4,
      })),
      month,
    });
  }

  function skipToEmptyBoard() {
    onSeed({ stops: [], month });
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col px-6 py-10 md:px-10 md:py-14" data-coldstart>
      {/* Hero */}
      <div className="border-b border-border pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          491 destinations · 12-month windows · permits + passes tracked
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-foreground md:text-5xl">
          Plan a trip in India that&rsquo;s <em className="text-[var(--accent,#d36843)]">actually possible</em> on the dates you can take leave.
        </h1>
        <p className="mt-5 max-w-3xl font-serif text-base text-muted-foreground md:text-lg">
          Most planners hide the things that ruin a trip — closed passes, permit timelines, weather windows, festival price-spikes. We surface them on day one. Pick a way to start:
        </p>
      </div>

      {/* Tabs */}
      <nav className="mt-8 flex gap-0 overflow-x-auto border-b border-border">
        {[
          { k: "curated" as const, l: "Curated trips", sub: "Pick a tested itinerary" },
          { k: "month" as const, l: "By month", sub: "I know when I'm going" },
          { k: "profile" as const, l: "By traveller", sub: "Solo · couple · kids · seniors" },
          { k: "theme" as const, l: "By theme", sub: "Vibes · monasteries · food" },
        ].map((t) => (
          <button
            key={t.k}
            type="button"
            onClick={() => setTab(t.k)}
            className={`-mb-px shrink-0 border-b-2 px-5 py-4 text-left transition-colors ${
              tab === t.k ? "border-[var(--accent,#d36843)]" : "border-transparent hover:border-muted"
            }`}
          >
            <div className={`font-serif text-base ${tab === t.k ? "text-foreground" : "text-muted-foreground"}`}>{t.l}</div>
            <div className="mt-0.5 text-[10.5px] text-muted-foreground/70">{t.sub}</div>
          </button>
        ))}
      </nav>

      {/* Tab body */}
      <div className="mt-8 flex-1">
        {tab === "curated" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CURATED.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => chooseCurated(c)}
                className="group block overflow-hidden border border-border bg-card text-left transition-colors hover:border-[var(--accent,#d36843)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover brightness-[0.78] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent,#d36843)]">{c.sub}</div>
                  <h3 className="mt-1 font-serif text-xl font-medium leading-tight">{c.name}</h3>
                  <p className="mt-2 text-xs leading-[1.55] text-muted-foreground">{c.desc}</p>
                  <p className="mt-3 text-[11px] text-muted-foreground/70">use as starting point — drag dates in the year band after</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "month" && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonth(i + 1)}
                  className={`border px-3.5 py-2 font-mono text-xs transition-colors ${
                    month === i + 1
                      ? "border-[var(--accent,#d36843)] bg-[var(--accent,#d36843)] text-white"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Top {monthList.length} destinations scored for {MONTHS[month - 1]}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              {monthList.map(({ d, score }) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => chooseMonthDestination(d.id)}
                  className="flex items-center gap-3 border border-border p-3 text-left transition-colors hover:bg-muted"
                >
                  <span
                    className={`flex h-9 min-w-[40px] items-center justify-center font-mono text-xs font-bold ${
                      score >= 4 ? "bg-emerald-700 text-white" : score >= 3 ? "bg-amber-600 text-white" : score >= 1 ? "bg-rose-600 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {score}/5
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-base">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {d.state?.name ?? ""}{d.elevation_m ? ` · ${d.elevation_m}m` : ""}
                    </div>
                  </div>
                  <span className="text-[11px] text-[var(--accent,#d36843)]">add →</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProfile(p.id)}
                  className={`border px-4 py-5 text-center transition-colors ${
                    profile === p.id
                      ? "border-[var(--accent,#d36843)] bg-[var(--accent,#d36843)]/10"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <div className="text-2xl">{p.icon}</div>
                  <div className="mt-2 font-serif text-base">{p.label}</div>
                  <div className="mt-0.5 text-[10.5px] text-muted-foreground">{p.sub}</div>
                </button>
              ))}
            </div>
            {profile ? (
              <>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {profileMatches.length} starter destination{profileMatches.length === 1 ? "" : "s"} for {PROFILES.find((p) => p.id === profile)?.label}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {profileMatches.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => chooseProfileDestination(d.id)}
                      className="flex items-center gap-3 border border-border p-3 text-left transition-colors hover:bg-muted"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-base">{d.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {d.state?.name ?? ""} · {d.difficulty ?? "—"}{d.elevation_m ? ` · ${d.elevation_m}m` : ""}
                        </div>
                      </div>
                      <span className="text-[11px] text-[var(--accent,#d36843)]">add →</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-6 font-serif text-sm italic text-muted-foreground">Pick a profile above to filter destinations.</p>
            )}
          </div>
        )}

        {tab === "theme" && (
          <div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-colors ${
                    theme === t.id
                      ? "border-[var(--accent,#d36843)] bg-[var(--accent,#d36843)]/10"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="font-serif text-base">{t.label}</span>
                </button>
              ))}
            </div>
            {theme ? (
              <button
                type="button"
                onClick={() => chooseTheme(THEMES.find((t) => t.id === theme)!)}
                className="mt-6 inline-flex items-center gap-2 bg-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-background hover:opacity-90"
              >
                Seed trip with {THEMES.find((t) => t.id === theme)?.match.filter((s) => destinations.some((d) => d.id === s)).slice(0, 3).join(" + ")} →
              </button>
            ) : (
              <p className="mt-6 font-serif text-sm italic text-muted-foreground">Pick a theme to seed a starter trip.</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom proof strip + skip */}
      <footer className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 text-[11.5px] text-muted-foreground md:grid-cols-4">
        <div>
          <strong className="text-foreground">491</strong>
          <br />destinations researched
        </div>
        <div>
          <strong className="text-foreground">12-month</strong>
          <br />scoring per destination
        </div>
        <div>
          <strong className="text-foreground">Permit</strong>
          <br />+ pass + festival tracking
        </div>
        <div>
          <strong className="text-foreground">0 fluff</strong>
          <br />real numbers, no listicles
        </div>
      </footer>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={skipToEmptyBoard}
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {tt("skipColdStart") ?? "Skip · open empty board →"}
        </button>
      </div>
    </section>
  );
}
