"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthScore {
  month: number;
  score: number;
}

interface DestData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  budget_tier: string | null;
  best_months: string | null;
  daily_cost: any;
  family_stress: string | null;
  state: string | null;
  months: MonthScore[];
  kids: { suitable: boolean; rating: number } | null;
  confidence: { safety_rating: number | string | null; network: unknown } | null;
}

interface Props {
  dest1: DestData;
  dest2: DestData;
  locale: string;
}

function getMonthScore(months: MonthScore[], month: number): number | null {
  return months.find((m) => m.month === month)?.score ?? null;
}

function scoreColor(score: number | null): string {
  if (score === null) return "text-zinc-500";
  if (score >= 4) return "text-emerald-400";
  if (score >= 3) return "text-yellow-400";
  return "text-red-400";
}

function winner(val1: number | null, val2: number | null): "left" | "right" | "tie" {
  if (val1 === null && val2 === null) return "tie";
  if (val1 === null) return "right";
  if (val2 === null) return "left";
  if (val1 > val2) return "left";
  if (val2 > val1) return "right";
  return "tie";
}

function formatSafety(v: number | string | null | undefined): string {
  if (v == null) return "N/A";
  if (typeof v === "number") return `${v}/5`;
  return String(v);
}

function formatNetwork(net: unknown): string {
  if (net == null) return "N/A";
  if (typeof net === "string") return net;
  if (typeof net === "object") {
    const n = net as Record<string, unknown>;
    const ops = ["airtel", "jio", "vi", "bsnl"].filter((k) => n[k] === true);
    if (ops.length > 0) {
      return ops.map((o) => o[0].toUpperCase() + o.slice(1)).join(" / ");
    }
    if (typeof n.note === "string") return n.note;
  }
  return "N/A";
}

export function VsComparison({ dest1, dest2, locale }: Props) {
  const currentMonth = new Date().getMonth() + 1;
  const score1 = getMonthScore(dest1.months, currentMonth);
  const score2 = getMonthScore(dest2.months, currentMonth);

  // Build comparison rows
  const rows = [
    {
      label: `${MONTH_SHORT[currentMonth]} Score`,
      v1: score1 !== null ? `${score1}/5` : "N/A",
      v2: score2 !== null ? `${score2}/5` : "N/A",
      c1: scoreColor(score1),
      c2: scoreColor(score2),
      win: winner(score1, score2),
    },
    {
      label: "Difficulty",
      v1: dest1.difficulty || "N/A",
      v2: dest2.difficulty || "N/A",
      c1: DIFFICULTY_COLORS[dest1.difficulty] || "",
      c2: DIFFICULTY_COLORS[dest2.difficulty] || "",
      win: "tie" as const,
    },
    {
      label: "Elevation",
      v1: dest1.elevation_m ? `${dest1.elevation_m.toLocaleString()}m` : "Plains",
      v2: dest2.elevation_m ? `${dest2.elevation_m.toLocaleString()}m` : "Plains",
      c1: "",
      c2: "",
      win: "tie" as const,
    },
    {
      label: "Budget Tier",
      v1: dest1.budget_tier || "N/A",
      v2: dest2.budget_tier || "N/A",
      c1: "",
      c2: "",
      win: "tie" as const,
    },
    {
      label: "Kids Rating",
      v1: dest1.kids?.rating != null ? `${dest1.kids.rating}/5` : "N/A",
      v2: dest2.kids?.rating != null ? `${dest2.kids.rating}/5` : "N/A",
      c1: scoreColor(dest1.kids?.rating ?? null),
      c2: scoreColor(dest2.kids?.rating ?? null),
      win: winner(dest1.kids?.rating ?? null, dest2.kids?.rating ?? null),
    },
    {
      label: "Safety",
      v1: formatSafety(dest1.confidence?.safety_rating),
      v2: formatSafety(dest2.confidence?.safety_rating),
      c1: "",
      c2: "",
      win: "tie" as const,
    },
    {
      label: "Network",
      v1: formatNetwork(dest1.confidence?.network),
      v2: formatNetwork(dest2.confidence?.network),
      c1: "",
      c2: "",
      win: "tie" as const,
    },
  ];

  // Quick verdict
  const totalScore1 = dest1.months.reduce((s, m) => s + m.score, 0);
  const totalScore2 = dest2.months.reduce((s, m) => s + m.score, 0);
  const currentWin = winner(score1, score2);

  // Choose-if reasons
  const choose1: string[] = [];
  const choose2: string[] = [];

  if (dest1.difficulty === "easy") choose1.push("You prefer an easier, more relaxed trip");
  if (dest2.difficulty === "easy") choose2.push("You prefer an easier, more relaxed trip");
  if (dest1.difficulty === "hard" || dest1.difficulty === "extreme") choose1.push("You want a challenging adventure");
  if (dest2.difficulty === "hard" || dest2.difficulty === "extreme") choose2.push("You want a challenging adventure");
  if ((dest1.kids?.rating ?? 0) > (dest2.kids?.rating ?? 0)) choose1.push("You're traveling with kids");
  if ((dest2.kids?.rating ?? 0) > (dest1.kids?.rating ?? 0)) choose2.push("You're traveling with kids");
  if ((score1 ?? 0) > (score2 ?? 0)) choose1.push(`Better conditions right now (${MONTH_SHORT[currentMonth]})`);
  if ((score2 ?? 0) > (score1 ?? 0)) choose2.push(`Better conditions right now (${MONTH_SHORT[currentMonth]})`);
  if (dest1.elevation_m && (!dest2.elevation_m || dest1.elevation_m > dest2.elevation_m)) choose1.push("You love high-altitude destinations");
  if (dest2.elevation_m && (!dest1.elevation_m || dest2.elevation_m > dest1.elevation_m)) choose2.push("You love high-altitude destinations");
  if (totalScore1 > totalScore2) choose1.push("You want more months with great conditions");
  if (totalScore2 > totalScore1) choose2.push("You want more months with great conditions");

  // Fallbacks
  if (choose1.length === 0) choose1.push(`${dest1.name} is a solid choice for its unique character`);
  if (choose2.length === 0) choose2.push(`${dest2.name} is a solid choice for its unique character`);

  return (
    <>
      {/* Hero — split image */}
      <section className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2 overflow-hidden">
            <Image
              src={`/images/destinations/${dest1.id}.jpg`}
              alt={dest1.name}
              fill
              sizes="50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80" />
          </div>
          <div className="relative w-1/2 overflow-hidden">
            <Image
              src={`/images/destinations/${dest2.id}.jpg`}
              alt={dest2.name}
              fill
              sizes="50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/80" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* VS badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg z-10">
            VS
          </span>
        </div>

        <FadeIn className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-5xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Head to Head</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
            {dest1.name} vs {dest2.name} — The Honest Comparison
          </h1>
        </FadeIn>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/destination/${dest1.id}`} className="hover:text-foreground transition-colors">{dest1.name}</Link>
          <span>/</span>
          <span className="text-foreground">{dest1.name} vs {dest2.name}</span>
        </nav>

        {/* Quick verdict */}
        <ScrollReveal>
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">Quick Verdict</h2>
            <p className="text-muted-foreground leading-relaxed">
              {currentWin === "left"
                ? `${dest1.name} edges ahead this month with a score of ${score1}/5 vs ${score2 ?? "N/A"}/5.`
                : currentWin === "right"
                ? `${dest2.name} edges ahead this month with a score of ${score2}/5 vs ${score1 ?? "N/A"}/5.`
                : `Both destinations score equally right now (${score1 ?? "N/A"}/5).`}
              {" "}
              {totalScore1 > totalScore2
                ? `Overall, ${dest1.name} has more favorable months across the year.`
                : totalScore2 > totalScore1
                ? `Overall, ${dest2.name} has more favorable months across the year.`
                : "Year-round, they're remarkably similar in overall score."}
            </p>
          </section>
        </ScrollReveal>

        {/* Side-by-side comparison table */}
        <ScrollReveal delay={0.1}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Side-by-Side Comparison</h2>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-border bg-muted/30">
                <div className="p-3 text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]" />
                <div className="p-3 text-center text-sm font-bold text-foreground border-l border-border">
                  {dest1.name}
                </div>
                <div className="p-3 text-center text-sm font-bold text-foreground border-l border-border">
                  {dest2.name}
                </div>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 ${i < rows.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="p-3 text-sm text-muted-foreground font-medium flex items-center">
                    {row.label}
                  </div>
                  <div
                    className={`p-3 text-center text-sm font-semibold border-l border-border ${row.c1} ${
                      row.win === "left" ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    {row.v1}
                    {row.win === "left" && <span className="ml-1 text-emerald-400 text-xs">*</span>}
                  </div>
                  <div
                    className={`p-3 text-center text-sm font-semibold border-l border-border ${row.c2} ${
                      row.win === "right" ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    {row.v2}
                    {row.win === "right" && <span className="ml-1 text-emerald-400 text-xs">*</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Month-by-month comparison */}
        <ScrollReveal delay={0.15}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Month-by-Month Score</h2>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-border bg-muted/30">
                <div className="p-3 text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]">Month</div>
                <div className="p-3 text-center text-sm font-bold text-foreground border-l border-border">
                  {dest1.name}
                </div>
                <div className="p-3 text-center text-sm font-bold text-foreground border-l border-border">
                  {dest2.name}
                </div>
              </div>

              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                const s1 = getMonthScore(dest1.months, month);
                const s2 = getMonthScore(dest2.months, month);
                const mWin = winner(s1, s2);

                return (
                  <div
                    key={month}
                    className={`grid grid-cols-3 ${month < 12 ? "border-b border-border" : ""} ${
                      month === currentMonth ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="p-2.5 text-sm text-muted-foreground flex items-center gap-2">
                      {MONTH_SHORT[month]}
                      {month === currentMonth && (
                        <span className="text-[10px] rounded-full bg-primary/20 text-primary px-1.5 py-0.5">Now</span>
                      )}
                    </div>
                    <div
                      className={`p-2.5 text-center text-sm font-semibold border-l border-border ${scoreColor(s1)} ${
                        mWin === "left" ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      {s1 !== null ? `${s1}/5` : "—"}
                    </div>
                    <div
                      className={`p-2.5 text-center text-sm font-semibold border-l border-border ${scoreColor(s2)} ${
                        mWin === "right" ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      {s2 !== null ? `${s2}/5` : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Choose X if... / Choose Y if... */}
        <ScrollReveal delay={0.2}>
          <section className="grid gap-5 sm:grid-cols-2">
            {/* Dest 1 */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Choose {dest1.name} if&hellip;
              </h3>
              <ul className="space-y-2">
                {choose1.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/destination/${dest1.id}`}
                className="mt-4 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
              >
                Explore {dest1.name} &rarr;
              </Link>
            </div>

            {/* Dest 2 */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Choose {dest2.name} if&hellip;
              </h3>
              <ul className="space-y-2">
                {choose2.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-400 mt-0.5 shrink-0">+</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/destination/${dest2.id}`}
                className="mt-4 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
              >
                Explore {dest2.name} &rarr;
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
