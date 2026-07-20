# Scheduled task — ranking-depth cycle day-14 re-measure (DUE 2026-07-17)

**Due date:** 2026-07-17 (any daily GSC audit run on or after this date should execute this, then mark this file DONE)
**Status:** DONE — run 2026-07-20 (via the weekly `daily-gsc-audit` task; 3 days late, no other qualifying audit ran 07-17–07-19). **Verdict: cycle 1 did NOT show a win.** TARGETS averaged Δposition **+0.62** (worse) over 7/5–7/18 vs the 6/17–6/30 baseline; CONTROLS averaged **−0.38** (better) — the opposite of the hypothesis (targets should have out-improved controls). Only 2/5 targets improved position at all, and the one clear miss (`/en/festivals/month/july`, +2.9) was bigger than any single control move. Full numbers in `data/ranking-depth-cycle/remeasure-2026-07-20.md` and in `gsc-audits/gsc-audit-2026-07-20.md` §5. **Recommend closing cycle 1 as inconclusive/negative rather than scheduling the recurring weekly ranking-depth loop** — per the decision rule below, the gate for scheduling was "targets clearly outperform controls," which did not happen. If the experiment is retried, consider a larger page set or a design less exposed to July seasonality swamping the position signal.
**Set up:** 2026-07-03, ranking-depth cycle 1 (internal-link intervention)

---

## What to run

```
cd "/Users/ashishtaneja/Desktop/India Travel Planner" && node scripts/ranking-depth-remeasure.mjs
```

Read-only (GSC Search Analytics API). Writes `data/ranking-depth-cycle/remeasure-<date>.md`.

## Context

On 2026-07-03 the July internal-link cohort shipped (`apps/web/src/lib/high-impression-pages.ts` July entries + festivals cross-link on /where-to-go/[month] + `hubOnly` rail support) targeting the audit-flagged under-converters:

- **Targets (got links):** /en/destination/wayanad/july · /en/festivals/month/july · /hi/destination/chandratal · /en/destination/shrikhand-mahadev · /en/destination/landour/july
- **Controls (untouched — do NOT add them to any rail before this re-measure):** /en/destination/varkala/july · /en/destination/matheran/july · /en/destination/morni-hills · /en/festivals/state/lakshadweep · /hi/cost/jaisalmer
- **Baseline:** `data/ranking-depth-cycle/baseline-2026-07-03.json` (GSC 6/17–6/30)

## Decision rule (agreed with founder 2026-07-03)

Primary metric = **position delta, targets vs controls** (controls estimate July seasonality). If targets clearly outperform controls → propose scheduling the recurring weekly ranking-depth loop (that was the gate: cron only after one measured win). If not → report honestly, recommend closing or redesigning the cycle. Do NOT re-flag title CRO (titles fully shipped per CLAUDE.md) — the lever under test is internal links/depth only.

## After running

1. Report the verdict to Ashish (plain, numbers first).
2. Flip **Status** above to DONE with the run date + one-line verdict.
