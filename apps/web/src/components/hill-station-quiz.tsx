"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatScoreInline } from "@itp/shared";
import type { HillStationQuizRow } from "@/lib/cached-data";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { addSaved, isSaved } from "@/lib/saved-destinations";

// 3-question decision quiz over the verified hill-station pool.
// Matching runs entirely client-side against the cached pool the server page
// passes down — no API call on submit, so crawlers hammering the page can't
// generate DB load or per-submit cost. Scores shown via formatScoreInline
// (raw 0–5 DB scale in, displayed 0–10 out — never hand-multiply).

type Budget = "budget" | "mid-range" | "splurge" | "any";
type Vibe = "family" | "offbeat" | "adventure" | "honeymoon";

const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

const VIBE_TAGS: Record<Vibe, string[]> = {
  family: ["family"],
  offbeat: ["offbeat", "village", "meadow"],
  adventure: ["trek", "adventure", "camping", "biker"],
  honeymoon: ["honeymoon", "luxury", "lake"],
};

type Scored = {
  row: HillStationQuizRow;
  monthScore: number; // raw 0–5
  budgetFit: boolean;
  vibeFit: boolean;
  kidsFit: boolean;
  total: number;
};

function matchPool(
  pool: HillStationQuizRow[],
  month: number, // 1-12
  budget: Budget,
  vibe: Vibe,
): Scored[] {
  const wanted = VIBE_TAGS[vibe];
  const scored: Scored[] = [];
  for (const row of pool) {
    const monthScore = row.month_scores[month - 1];
    // No verified score for the month → we can't recommend it, skip.
    if (monthScore == null || monthScore <= 0) continue;
    const tags = row.tags ?? [];
    const vibeFit = wanted.some((t) => tags.includes(t));
    const kidsFit =
      vibe === "family" && row.kids_suitable === true && (row.kids_rating ?? 0) >= 3;
    const budgetFit =
      budget !== "any" && (row.budget_tier === budget || row.budget_tier === "mixed");
    // Month score dominates (it's the verified editorial signal); budget and
    // vibe are half-point nudges on the raw 0–5 scale so they order ties
    // without letting a tag outvote a bad month. The vibe nudge is a single
    // +0.5 whether it matched via tag, kids-suitability, or both — matching
    // the one badge the UI shows for it.
    const total =
      monthScore +
      (budgetFit ? 0.5 : 0) +
      (vibeFit || kidsFit ? 0.5 : 0);
    scored.push({ row, monthScore, budgetFit, vibeFit: vibeFit || kidsFit, kidsFit, total });
  }
  return scored.sort(
    (a, b) => b.total - a.total || b.monthScore - a.monthScore || a.row.name.localeCompare(b.row.name),
  );
}

export function HillStationQuiz({
  locale,
  pool,
  vsSlugs,
}: {
  locale: string;
  pool: HillStationQuizRow[];
  vsSlugs: string[];
}) {
  const t = useTranslations("hillQuiz");
  const isHindi = locale === "hi";

  const [step, setStep] = useState(0);
  const [month, setMonth] = useState<number | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const vsSet = useMemo(() => new Set(vsSlugs), [vsSlugs]);

  const results = useMemo(() => {
    if (month == null || budget == null || vibe == null) return null;
    return matchPool(pool, month, budget, vibe).slice(0, 3);
  }, [pool, month, budget, vibe]);

  const monthNames: string[] = MONTH_SLUGS.map((slug) => t(`months.${slug}`));

  function pickMonth(m: number) {
    setMonth(m);
    setStep(1);
  }
  function pickBudget(b: Budget) {
    setBudget(b);
    setStep(2);
  }
  function pickVibe(v: Vibe) {
    setVibe(v);
    setStep(3);
    track("quiz_complete", {
      quiz: "hill-station",
      month: month ?? 0,
      budget: budget ?? "",
      vibe: v,
    });
  }
  function restart() {
    setMonth(null);
    setBudget(null);
    setVibe(null);
    setStep(0);
  }
  function save(id: string, name: string) {
    if (isSaved(id)) return;
    addSaved(id);
    setSavedIds((prev) => [...prev, id]);
    track(KEY_EVENTS.SAVE_DESTINATION, {
      destination_id: id,
      destination_name: name,
      surface: "hill-station-quiz",
    });
  }

  const BUDGET_OPTIONS: Array<{ id: Budget; label: string; desc: string }> = [
    { id: "budget", label: t("budget.budget"), desc: t("budget.budgetDesc") },
    { id: "mid-range", label: t("budget.mid"), desc: t("budget.midDesc") },
    { id: "splurge", label: t("budget.splurge"), desc: t("budget.splurgeDesc") },
    { id: "any", label: t("budget.any"), desc: t("budget.anyDesc") },
  ];
  const VIBE_OPTIONS: Array<{ id: Vibe; label: string; desc: string }> = [
    { id: "family", label: t("vibe.family"), desc: t("vibe.familyDesc") },
    { id: "offbeat", label: t("vibe.offbeat"), desc: t("vibe.offbeatDesc") },
    { id: "adventure", label: t("vibe.adventure"), desc: t("vibe.adventureDesc") },
    { id: "honeymoon", label: t("vibe.honeymoon"), desc: t("vibe.honeymoonDesc") },
  ];

  // ── Results view ──────────────────────────────────────────────────────────
  if (step === 3 && results && month != null) {
    const monthName = monthNames[month - 1];
    const monthSlug = MONTH_SLUGS[month - 1];
    const top = results;
    const vsSlug =
      top.length >= 2
        ? [`${top[0].row.id}-vs-${top[1].row.id}`, `${top[1].row.id}-vs-${top[0].row.id}`].find((s) =>
            vsSet.has(s),
          )
        : undefined;

    return (
      <div>
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <div className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground/70 mb-1">
            {t("results.kicker")}
          </div>
          <p className="text-sm leading-relaxed">
            <strong className="text-foreground">{monthName}</strong>
            {" · "}
            {BUDGET_OPTIONS.find((o) => o.id === budget)?.label}
            {" · "}
            {VIBE_OPTIONS.find((o) => o.id === vibe)?.label}
          </p>
        </div>

        {top.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card/40 p-6 mb-6">
            <p className="text-sm text-muted-foreground">
              {t("results.none", { month: monthName })}{" "}
              <Link href={`/${locale}/explore/tag/hill-station`} className="underline hover:text-primary">
                {t("results.browseAll")}
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {top.map((r, i) => {
              const name = isHindi && r.row.name_hi ? r.row.name_hi : r.row.name;
              const tagline = isHindi && r.row.tagline_hi ? r.row.tagline_hi : r.row.tagline;
              const saved = savedIds.includes(r.row.id) || isSaved(r.row.id);
              return (
                <div
                  key={r.row.id}
                  className="rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xl font-bold tabular-nums text-primary/80 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">
                          <Link
                            href={`/${locale}/destination/${r.row.id}/${monthSlug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {name}
                          </Link>
                        </h3>
                        <span className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground">
                          {r.row.state_name} · {formatScoreInline(r.monthScore)} {t("results.inMonth", { month: monthName })}
                        </span>
                      </div>
                      {tagline && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{tagline}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {r.budgetFit && (
                          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                            {t("results.fitsBudget")}
                          </span>
                        )}
                        {r.vibeFit && (
                          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                            {t(`results.fits_${vibe}`)}
                          </span>
                        )}
                        <span className="flex-1" />
                        <Link
                          href={`/${locale}/destination/${r.row.id}/${monthSlug}`}
                          className="text-xs underline underline-offset-4 hover:text-primary"
                        >
                          {t("results.readMonth", { month: monthName })}
                        </Link>
                        <button
                          onClick={() => save(r.row.id, r.row.name)}
                          disabled={saved}
                          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                            saved
                              ? "border-primary/40 text-primary cursor-default"
                              : "border-border hover:border-primary/50 hover:text-primary"
                          }`}
                        >
                          {saved ? t("results.saved") : t("results.save")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {vsSlug && top.length >= 2 && (
          <Link
            href={`/${locale}/vs/${vsSlug}`}
            className="block rounded-2xl border border-primary/30 bg-primary/5 p-4 mb-6 text-sm hover:border-primary/60 transition-colors"
          >
            {t("results.cantDecide", {
              a: isHindi && top[0].row.name_hi ? top[0].row.name_hi : top[0].row.name,
              b: isHindi && top[1].row.name_hi ? top[1].row.name_hi : top[1].row.name,
            })}
          </Link>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={restart}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            {t("results.takeAgain")}
          </button>
          <Link
            href={`/${locale}/explore/tag/hill-station`}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("results.browseAll")}
          </Link>
        </div>
      </div>
    );
  }

  // ── Question views ────────────────────────────────────────────────────────
  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-primary/50" : "bg-border"}`}
          />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">{t("q1")}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t("stepLabel", { n: 1 })}</p>
          <div className="grid gap-2 grid-cols-3 sm:grid-cols-4">
            {monthNames.map((m, i) => (
              <button
                key={m}
                onClick={() => pickMonth(i + 1)}
                className="min-h-11 rounded-xl border border-border bg-card/40 p-3 text-sm font-medium hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">{t("q2")}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t("stepLabel", { n: 2 })}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => pickBudget(o.id)}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">{t("q3")}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t("stepLabel", { n: 3 })}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {VIBE_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => pickVibe(o.id)}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
