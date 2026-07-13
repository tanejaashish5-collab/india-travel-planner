# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-07-06
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**This is the 5th run of this task** (2026-04-29, 05-04, 05-18, 06-22, 06-29, now 07-06).

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as 06-22 and 06-29 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **The one open thread from the last two runs is now resolved.** `darjeeling june weather` still shows 0 impressions as an exact query string even in a fully-closed June, but the underlying page is healthy and improving (157 impressions, position 9.6 vs 11.5 pre-deploy) — traffic is arriving via other query phrasings. Not a regression.
- **CTR uplift from the Apr 27 snippet rewrite is still not measurable** for 5 of 6 target queries — they're "X in may" searches evaluated well past May with a 0% pre-deploy CTR baseline. Nothing to compare against until May 2027.
- **Recommending (3rd time) that this scheduled task be disabled or retired.** Three consecutive runs (06-22, 06-29, 07-06) have found the identical stable state. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl |
|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | (none) | 2026-04-17 |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | **2026-07-02** |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, because the non-prefixed URL correctly defers to the `/en/` canonical). Yercaud got a fresh Googlebot crawl on Jul 2 and re-confirmed the same canonical with `userCanonical == googleCanonical` — the strongest possible consolidation signal.

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (3rd re-run)

New script `scripts/_gsc-ctr-check-2026-07-06.mjs`, written to specifically close out the one open question from the last two runs: does `darjeeling june weather` recover once June is a fully-closed month (prior runs only had partial-June data through Jun 20 / Jun 27)?

Windows: PRE (Mar 30 – Apr 26, pre-deploy) · JUNE-FULL (Jun 1–30, complete) · RECENT28d (Jun 9 – Jul 6).

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos |
|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 25 / 8.9 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 1 / 4.0 |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos |
|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 7.0 |
| .../vrindavan/may | 919 / 8.8 | 13 / 7.8 | 7 / 7.6 |
| .../yercaud/may | 731 / 10.7 | 113 / 8.8 | 96 / 8.7 |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 6 / 6.8 |
| .../pondicherry/may | 83 / 10.6 | 1 / 16.0 | 1 / 16.0 |
| **.../darjeeling/june** | **471 / 11.5** | **157 / 9.6** | **43 / 8.9** |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions collapsed to near-zero months past season, exactly as in 06-22/06-29. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`darjeeling june weather` — anomaly resolved, not a regression.** The prior two runs flagged this exact query going to 0 impressions as "worth a deeper look." With June now fully closed, the query string itself is still at 0 impressions — but the *page* it should be driving traffic to is thriving: 157 impressions in June alone and position improved from 11.5 (pre-deploy) to 9.6 (June) to 8.9 (most recent 28d). The page is ranking better and getting real traffic; it's just arriving through other query phrasings than the literal 6-word string from the original task brief. No action needed — this closes out the item flagged in the last two audits.
3. **Position trends where measurable are flat-to-improving**, not degrading: yercaud/may 11.8→8.9, darjeeling/june 11.5→8.9, vrindavan/may 8.8→7.6. Pondicherry/may is the one outlier (10.6→16.0) but on a single impression — noise, not signal.
4. **Zero clicks across the board remains the honest headline finding.** Whatever ranking/impression gains exist, none of the 6 named queries have converted a single click pre- or post-deploy. CTR impact of the snippet rewrite cannot be assessed on these specific queries at this impression volume — this has been the consistent finding for 3 runs running.

## What this scheduled task should become

Third consecutive run reaching the same conclusion (06-22, 06-29, 07-06): all 5 URLs are stably consolidated, and the CTR question this task asks about is structurally unanswerable until the queries are back in season. Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly, since weekly runs have produced no new information since 2026-06-22.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (3rd time).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to mark this item ✅ resolved (previous two runs recommended this but it was never actually written).
- New script `scripts/_gsc-ctr-check-2026-07-06.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention.
