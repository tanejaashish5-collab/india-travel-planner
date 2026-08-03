# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-08-03
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**7th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, now 08-03), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **New this run: `vrindavan/may` got a fresh Googlebot re-crawl.** `lastCrawlTime` jumped from 2026-07-12 to **2026-08-01T10:15:58Z**. Last week it was `yercaud/may` that got the fresh visit; this week yercaud is static again (still 07-20) and vrindavan is the one that moved. Read together, this says Google is still periodically re-checking these redirects one at a time, not that either URL individually settled into permanent dormancy. Outcome unchanged either way — still resolves correctly to `/en/`.
- **The `darjeeling june weather` position dip flagged last week resolved itself — by going to zero.** Position had been 11.5→9.6→8.7→8.3→10.0 across the last five checks; this week the exact-match query has **0 impressions**, so there's no position to report at all. Last week's "watch next run to see if it's a blip or a real reversal" is answered: the query sample just got too thin to measure, not a ranking reversal.
- **`vrindavan/may` page position did NOT actually stabilize — it kept drifting.** Last week read 28.6 (07-20) → 28.2 (07-27) as "held flat... a new stable baseline." This week it's 28.2 → **30.8**, on the same 33 impressions. Correcting the record rather than repeating last week's "stabilized" call: it's still a slow decline, just a gradual one. Still driven by long-tail queries unrelated to "vrindavan temperature in may" (which itself remains at 0 impressions since April).
- **First recent-window click on `yercaud/may` in this check's history.** Page-level: 73→89 impressions, 0→**1 click** (CTR 1.12%), position 10.5→11.1. The click isn't attributable to the exact target phrase — "yercaud weather in may" itself still shows 0 clicks at the query level — so this is a different query variant landing on the same page. Flagging as genuinely new rather than folding it into the "zero clicks" headline, which still holds for the 6 named queries specifically.
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable** for all 6 target queries — zero clicks at the query level in every window, every run, since tracking began. Nothing to compare against until the May 2027 season.
- **Recommending (7th consecutive time) that this scheduled task be disabled or retired.** The core question this task exists to answer — "are the 5 URLs still consolidated, does anything need Request Indexing" — has had the same answer (yes / no) for 7 straight weeks. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 07-27 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | **2026-08-01** | **fresh re-crawl (was 2026-07-12)** |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-07-20 | unchanged (was itself fresh last week) |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge. The vrindavan re-crawl is a neutral/positive signal (Google checked in and reconfirmed the redirect + canonical), not a problem.

## Part 2 — CTR check on Apr 27 snippet rewrite (7th re-run)

New script `scripts/_gsc-ctr-check-2026-08-03.mjs`, refreshing only the RECENT window (Jul 7 – Aug 3, 28d) to check for drift since 07-27. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (07-27) | RECENT28d (08-03) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 8 / 8.0 | 12 / 9.0 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 1 / 4.0 | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 2 / 10.0 | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (07-27) | RECENT28d (08-03) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 0 / — | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 33 / 28.2 | 33 / 30.8 |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 73 / 10.5 | **89 / 11.1 (1 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 0 / — | 0 / — |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | 1 / 47.0 |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 2 / 10.0 | 4 / 11.0 |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero or zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`darjeeling june weather`'s position dip wasn't a reversal — the query just went quiet.** Position had drifted 11.5→9.6→8.7→8.3→10.0 across five checks; this run shows 0 impressions on the exact phrase, so there's nothing left to measure. The page itself (`/en/destination/darjeeling/june`) still gets impressions (4 this window) from other query variants, just not this specific one.
3. **`vrindavan/may`'s "stabilization" call from last week doesn't hold up.** 28.6 (07-20) → 28.2 (07-27) → **30.8 (08-03)**, on flat impressions (33 both weeks). Last week read the 07-20→07-27 flatness as a new stable baseline; this week shows it was a pause, not a floor. Still worth tracking, but revising the read rather than repeating "stabilized." Still driven by long-tail queries unrelated to "vrindavan temperature in may" itself, which remains at 0 impressions since April.
4. **First page-level click on `yercaud/may` in a RECENT window this check has logged.** 1 click on 89 impressions (1.12% CTR). Can't credit it to "yercaud weather in may" specifically — that query still shows 0 clicks — so it's a different query landing on the page. A genuinely positive, if small and unattributed, data point.
5. **Zero clicks on the 6 named queries remains the honest headline finding.** None of them have converted a single click pre- or post-deploy, across 7 consecutive checks now.

## What this scheduled task should become

Seventh consecutive run reaching the same operational conclusion: all 5 URLs are stably consolidated and nothing has required Request Indexing since this task's cadence began. This week did surface real movement (vrindavan re-crawl, vrindavan position continuing to drift, yercaud's first click, darjeeling's query going quiet) — none of it changes the action outcome (still none needed). Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (7th time). To disable: ask Claude to run `mcp__scheduled-tasks__delete_scheduled_task` (or update its cadence) in an interactive session, or delete it from the scheduled tasks UI directly.

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 7th.
- New script `scripts/_gsc-ctr-check-2026-08-03.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern.
- Explicitly revised last week's "vrindavan stabilized" call rather than repeating it uncritically — the new data contradicted it. Did the same for the darjeeling dip: reported that it resolved to "query went quiet," not "position problem fixed itself."
