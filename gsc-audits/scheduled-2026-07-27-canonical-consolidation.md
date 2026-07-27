# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-07-27
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**6th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, now 07-27), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **Not "zero new information" this time: `yercaud/may` got re-crawled.** `lastCrawlTime` jumped from 2026-07-02 to **2026-07-20T13:08:04Z** — the first fresh Googlebot visit to any of the 5 URLs since this check's "fully dormant" streak began. Outcome unchanged (still correctly resolves to the `/en/` canonical), so no action needed — but it means last week's "Google isn't even bothering to re-crawl these" framing was only accurate for 4 of 5 URLs, not all 5.
- **`darjeeling june weather` position regressed this week — 8.3 → 10.0 — breaking the 4-run improving streak.** Read with caution: it's on only 2 impressions (down from 12 last week), the thinnest sample in this check's history. Flagging the break honestly rather than smoothing over it, but this is very likely sampling noise from a near-empty window, not a real ranking event.
- **`vrindavan/may` page position held flat rather than compounding** — 28.6 (07-20) → 28.2 (07-27), on rising impressions (26 → 33). Last week flagged this as "worth a glance to confirm it doesn't compound"; this week confirms it did not. Reads as a new, stable (if worse-than-spring) off-season position for this page's long-tail query mix — not an ongoing regression.
- **CTR uplift from the Apr 27 snippet rewrite is still unmeasurable** for 5 of 6 target queries — zero clicks across all 6 queries in every window, every run, since tracking began. Nothing to compare against until May 2027.
- **Recommending (6th consecutive time) that this scheduled task be disabled or retired.** The core question this task exists to answer — "are the 5 URLs still consolidated, does anything need Request Indexing" — has had the same answer (yes / no) for 6 straight weeks. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 07-20 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-07-12 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | **2026-07-20** | **fresh re-crawl (was 2026-07-02)** |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge. The yercaud re-crawl is a neutral/positive signal (Google checked in and reconfirmed the redirect + canonical), not a problem — it just means the "fully deprioritized" read from last week doesn't generalize to all 5 URLs yet.

## Part 2 — CTR check on Apr 27 snippet rewrite (6th re-run)

New script `scripts/_gsc-ctr-check-2026-07-27.mjs`, refreshing only the RECENT window (Jun 30 – Jul 27, 28d) to check for drift since 07-20. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos (07-20) | RECENT28d impr/pos (07-27) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 18 / 8.9 | 8 / 8.0 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 1 / 4.0 | 1 / 4.0 |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (07-20) | RECENT28d (07-27) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 7.0 | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 26 / 28.6 | 33 / 28.2 |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 101 / 9.3 | 73 / 10.5 |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 2 / 3.5 | 0 / — |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | 0 / — |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 12 / 8.3 | **2 / 10.0** |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`darjeeling june weather` position regressed this week, but on a near-empty sample.** Position: 11.5 (pre) → 9.6 (June-full) → 8.7 (07-13) → 8.3 (07-20) → **10.0 (07-27)**, ending a 4-run improving streak. The window this came from has only 2 impressions (down from 12), so a single low-value ranking event can swing the average this much — this reads as noise from a thin sample, not a genuine drop in the page's underlying quality, but it's the honest number and worth watching next run to see if it's a blip or a real reversal.
3. **`vrindavan/may` page position stabilized rather than compounding.** 15.6 (07-13) → 28.6 (07-20) → 28.2 (07-27), on climbing impressions (11 → 26 → 33). Last week's "worth a glance to confirm it doesn't compound" concern is resolved — it didn't get worse. Still driven by unrelated long-tail queries, since "vrindavan temperature in may" itself has logged zero impressions since April; this now looks like a new stable (if worse-than-spring) baseline for this off-season page rather than an active regression.
4. **Zero clicks across the board remains the honest headline finding.** None of the 6 named queries have converted a single click pre- or post-deploy, across 6 consecutive checks now.

## What this scheduled task should become

Sixth consecutive run reaching the same operational conclusion: all 5 URLs are stably consolidated and nothing has required Request Indexing since this task's cadence began, even though this week did surface two genuinely new (if minor) data points — a fresh yercaud re-crawl and a darjeeling position dip on thin data. Neither changes the action outcome (still none needed). Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (6th time). To disable: ask Claude to run `mcp__scheduled-tasks__delete_scheduled_task` (or update its cadence) in an interactive session, or delete it from the scheduled tasks UI directly.

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 6th.
- New script `scripts/_gsc-ctr-check-2026-07-27.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern.
- Did not smooth over the darjeeling position dip or the yercaud re-crawl to match last week's "nothing changed" narrative — reported both as genuinely new, even though neither changes the recommended action.
