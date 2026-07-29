# Fable-scan survivors (2026-07-03) — final dispositions, 2026-07-24

The 2026-07-03 session shipped the two survivors of the Fable-5 YT scan and attached a 07-17 decision gate to each. The gate went ~1 week past due (no session ran it); actioned + closed here.

## 1. /quiz/hill-station — KILL (failed the gate)

**Gate (founder-agreed 07-03):** kill if <50 `quiz_complete` events in 14 days.

**Measured (GA4 prop 534427362, 2026-07-24):**
- `quiz_complete` = **0 events / 0 users** in the exact 14-day window (07-03→07-17) **and** run-to-date (07-03→07-23).
- `/quiz/hill-station` page-views = **3 total** (2 en + 1 hi) over 21 days.
- Not a tracking bug: `quiz_complete` fires through the same `track()` path as `save_destination` (which logged 7 real events same window); it fires on the 3rd-answer pick ([hill-station-quiz.tsx:113](../../apps/web/src/components/hill-station-quiz.tsx#L113)). 0 is real.

**Verdict:** 0 << 50 → **KILL.** Root cause = **discovery, not conversion** — the page got ~zero traffic despite internal links from /vs (pair-level gate), /where-to-go/[month], and sitemap. Same throttle as the save-hook: new engagement surfaces on this site are gated by human traffic/discovery, not feature quality.

**Disposition:** left **dormant** — the quiz is zero running cost (fully client-side, 24h-cached pool, no per-submit DB/API), so ripping out the route + its /vs and /where-to-go rail links + sitemap entries is more risk than the tiny thin-page SEO debt is worth. Flagged for the next repo-hygiene prune. Remove-on-request. **Do not build the expanded/recurring quiz concept** — the gate said no.

## 2. Ranking-depth cycle 1 — NO WIN, loop NOT shipped (already decided 07-20)

**Gate (founder-agreed 07-03):** schedule the recurring weekly ranking-depth loop ONLY after one measured win (targets clearly out-improve controls on position).

**Measured (07-20, `remeasure-2026-07-20.md`):** TARGETS averaged Δposition **+0.62** (worse); CONTROLS averaged **−0.38** (better) — opposite of the hypothesis. Only 2/5 targets improved position; the worst miss (`/festivals/month/july`, +2.9) exceeded any control move. wayanad/july gained traffic (imp 2006→4438, clicks 5→20) but position barely moved and the control varkala/july also gained — July seasonality, not the intervention.

**Verdict:** **no measured win → recurring weekly loop NOT scheduled (correct default — it was never built).** Cycle 1 closed as inconclusive/negative. If retried: larger page set + a design less swamped by seasonal position swings. This was already recommended in `gsc-audits/scheduled-2026-07-17-ranking-depth-remeasure.md` (Status: DONE); this file records the founder-facing closure.

Both loops now closed. Source gate: `DREAM-PROPOSAL-2026-07-19.md` item #10; `session_2026_07_03_fable_window_quiz_and_ranking_cycle.md`.
