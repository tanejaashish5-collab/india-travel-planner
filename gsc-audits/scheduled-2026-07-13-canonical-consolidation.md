# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-07-13
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**This is the 6th run of this task** (2026-04-29, 05-04, 05-18, 06-22, 06-29, 07-06, now 07-13).

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as 06-22, 06-29, and 07-06 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **`darjeeling june weather` remains resolved and continues to improve.** Page position kept trending better: 11.5 (pre-deploy) → 9.6 (June-full) → 8.7 (recent 28d). Still 0 impressions on the exact query string, but the page it should serve is healthy — same read as 07-06, now with an extra data point confirming the trend, not a one-off.
- **CTR uplift from the Apr 27 snippet rewrite is still not measurable** for 5 of 6 target queries — they're "X in may" searches now well past season, with a 0% pre-deploy CTR baseline and near-zero impressions in every post-deploy window. Nothing to compare against until May 2027.
- **Recommending (4th consecutive time) that this scheduled task be disabled or retired.** Four straight runs (06-22, 06-29, 07-06, 07-13) have found the identical stable state with zero new information. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl |
|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | **2026-07-12** |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-07-02 |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical). Vrindavan got a fresh Googlebot crawl on Jul 12 and re-confirmed the same canonical with `userCanonical == googleCanonical` — the strongest possible consolidation signal, same pattern yercaud showed last run.

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (4th re-run)

New script `scripts/_gsc-ctr-check-2026-07-13.mjs`, refreshing only the RECENT window (Jun 16 – Jul 13, 28d) to check for drift since 07-06. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos |
|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 22 / 8.7 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 1 / 4.0 |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos |
|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 7.0 |
| .../vrindavan/may | 919 / 8.8 | 13 / 7.8 | 11 / 15.6 |
| .../yercaud/may | 731 / 10.7 | 113 / 8.8 | 104 / 8.6 |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 2 / 3.5 |
| .../pondicherry/may | 83 / 10.6 | 1 / 16.0 | 0 / — |
| **.../darjeeling/june** | **471 / 11.5** | **157 / 9.6** | **26 / 8.7** |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`darjeeling june weather` — still resolved, trend continues.** Position kept improving across three consecutive windows: 11.5 (pre) → 9.6 (June-full) → 8.7 (recent 28d). The exact query string is still at 0 impressions, but the page is ranking better each check and getting real (if unattributed-to-this-query) traffic. No action needed.
3. **Two single-digit-impression blips, both noise not signal:** vrindavan/may page position looks worse in RECENT28d (15.6 vs 7.8 in June) but on only 11 impressions in an off-season window; chakrata/may page looks better (3.5) but on only 2 impressions. Same "low-volume position swings are noise" read applied to pondicherry/may (16.0/1 impr) in the 07-06 run — consistent methodology, not cherry-picked.
4. **Zero clicks across the board remains the honest headline finding.** Whatever ranking/impression gains exist, none of the 6 named queries have converted a single click pre- or post-deploy, across 4 consecutive checks now. CTR impact of the snippet rewrite cannot be assessed on these specific queries at this impression volume.

## What this scheduled task should become

Fourth consecutive run reaching the same conclusion (06-22, 06-29, 07-06, 07-13): all 5 URLs are stably consolidated, and the CTR question this task asks about is structurally unanswerable until the queries are back in season. Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly, since weekly runs have produced no new information since 2026-06-22 — this is now four weekly runs in a row with an identical result.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (4th time). Concretely: to disable, the founder can ask Claude to run `mcp__scheduled-tasks__delete_scheduled_task` (or update its cadence) in an interactive session, or delete it from the scheduled tasks UI directly.

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 4th.
- New script `scripts/_gsc-ctr-check-2026-07-13.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern.
