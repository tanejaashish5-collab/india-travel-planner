# Scheduled task: GSC canonical-consolidation nudge (2026-06-22)

Run time: 2026-06-22 11:08 UTC
Task file: `SKILL.md` (scheduled task — "gsc-canonical-consolidation")
Trigger context: 48h after the 2026-04-27 GSC snippet rewrite + cache prewarm deploy.
Note: actually 56d post-deploy — the schedule slipped well past the 48h trigger.

## TL;DR

- **All 5 non-prefixed URLs have ALREADY consolidated to their /en/ canonicals.** Same `Page with redirect` + matching `googleCanonical` pattern that CLAUDE.md marks `RESOLVED` for hemkund-sahib. No "Request Indexing" nudge needed in GSC.
- **No founder action required.** The dashboard ritual the task asks for is moot — Google has it right per the URL Inspection API.
- **CTR delta on the named queries is unreadable from a "now vs prior 28d" pull** because every named query is seasonal (5×"X in may", 1×"darjeeling june weather") and we're at June 22. Impressions have collapsed naturally; pre-window CTR was already 0% on all 6, so there's no baseline to move. Snippet-rewrite impact for these queries can only be assessed in their *next* peak (May 2027, June 2027) or by checking a current peak-month cohort instead.
- One small ranking signal worth noting: `chakrata temperature in may` slid 7.1 → 12.0 avg pos, and `vrindavan/pondicherry/darjeeling june` show 0 impressions in the post-window. Most of that is seasonality; flagged for the next weekly audit, not actioned here.

## Per-URL canonical status

Ran via `node scripts/gsc-inspect-sweep.mjs --url <url> ...` (no dashboard). Property: `sc-domain:nakshiq.com`.

| URL | verdict | coverageState | googleCanonical | userCanonical | lastCrawl |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | NEUTRAL (not indexed) | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 |
| `/destination/vrindavan/may` | NEUTRAL (not indexed) | Page with redirect | `/en/destination/vrindavan/may` | (none) | 2026-04-17 |
| `/destination/yercaud/may` | NEUTRAL (not indexed) | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-06-20 |
| `/destination/chakrata/may` | NEUTRAL (not indexed) | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 |
| `/destination/pondicherry/may` | NEUTRAL (not indexed) | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 |

**Reading:** `Page with redirect` + matching `googleCanonical` is the *intended* end-state, not a failure. Google has accepted the 301→`/en/` redirect for all 5 — same as the resolved hemkund-sahib case in CLAUDE.md. "Not indexed" here means "the non-prefixed URL is not indexed because its canonical is the /en/ one" — exactly what we want. Submitting "Request Indexing" on these in the GSC UI would be a no-op for ranking and would just spend the daily quota.

The 3 URLs with older `lastCrawlTime` (vrindavan/chakrata/pondicherry, all pre-deploy) already show the correct canonical, so Google didn't even need to re-crawl post-deploy to get this right — it picked the canonical up from the redirect chain. The yercaud row also has `userCanonical = googleCanonical` (rel="canonical" + redirect agreeing), which is the strongest possible consolidation signal.

## Snippet-rewrite CTR check — the right read is "this window doesn't tell us"

Ran a pre/post 28d comparison on the 6 target queries from the task brief (script: `scripts/_gsc-snippet-impact-check.mjs`, written for this run).
- PRE  window: 2026-03-30 → 2026-04-26 (pre-deploy)
- POST window: 2026-05-25 → 2026-06-22 (most recent 28d)

| Query | Impr pre → post | Clicks pre → post | CTR pre → post | Pos pre → post |
|---|---|---|---|---|
| vrindavan temperature in may | 222 → 0 | 0 → 0 | 0% → 0% | 9.5 → — |
| yercaud weather in may | 278 → 75 | 0 → 0 | 0% → 0% | 11.8 → 9.7 |
| chakrata temperature in may | 116 → 1 | 0 → 0 | 0% → 0% | 7.1 → 12.0 |
| kanatal in may | 65 → 3 | 0 → 1 | 0% → 33.3% (n=3, noise) | 6.0 → 2.3 |
| pondicherry weather in may | 315 → 0 | 0 → 0 | 0% → 0% | 11.7 → — |
| darjeeling june weather | 85 → 0 | 0 → 0 | 0% → 0% | 12.5 → — |

**Why this is unreadable, not a failure:**
1. **5 of 6 queries are "X in may"** — we're 22 days past May. Natural seasonal collapse: late-June searchers don't ask about May weather. Impression decay here is the *expected* baseline, not a snippet problem.
2. **Pre-window CTR was already 0% across the board.** There's no CTR baseline to improve against. Snippet rewrites can only move CTR where CTR existed; with 0/1085 clicks pre-deploy on these 6 queries combined, the lift is invisible at this volume.
3. **"darjeeling june weather" with 0 post-window impressions** is the only odd one (peak should be right now). Best explanation is position drop past 20 + an active SERP feature absorbing the query — worth a one-off URL Inspection on `/en/destination/darjeeling/june` in next week's audit. Not blocking.
4. **`chakrata/may` slid 7.1 → 12.0** but impressions also fell from 116 → 1, so this is a seasonally-dying page falling off the SERP, not a quality regression.

**To actually assess snippet-rewrite impact**, the right cohorts are:
- Current peak-month destinations (June/July destxmonth pages) — pull `dest-month-ctr` from `data-pull.mjs` against those.
- May 2027 vs May 2026 year-over-year on the May queries — meaningful in 11 months.

Both are weekly-audit work, not scheduled-task work. Leaving them to the next `gsc-inspect-sweep --patch` Monday run.

## What this scheduled task should become

The task as written presumes the dashboard ritual is still required. The repo moved past that on 2026-06-10 (`gsc-inspect-sweep.mjs` + the hemkund-sahib resolution memo in CLAUDE.md). Recommendation: **delete this scheduled task** — its job is now done by the weekly `gsc-inspect-sweep --patch` cron and the `canary-probe` cron. The 5 named URLs are already consolidated; no further "nudges" are owed.

If a similar "post-deploy canonical check" is wanted in future, the one-liner is:
```bash
node scripts/gsc-inspect-sweep.mjs --url <url1> --url <url2> ...
```
…and a `googleCanonical` pointing at the intended `/en/` version = done. No dashboard, no Request Indexing button.
