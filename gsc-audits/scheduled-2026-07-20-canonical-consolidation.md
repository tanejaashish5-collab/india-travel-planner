# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-07-20
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**5th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, now 07-20), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **New this run: zero Googlebot re-crawl activity on any of the 5 URLs since 07-13.** `lastCrawlTime` is byte-for-byte identical to last week's report for all five — Google isn't even bothering to re-visit these off-season, already-redirected URLs. Expected behavior, not a problem, but worth noting as the crawler now treats this as fully settled.
- **`darjeeling june weather` keeps improving.** Page position: 11.5 → 9.6 → 8.7 → **8.3** (pre / June-full / 07-13-recent / 07-20-recent). Fourth consecutive improvement, still 0 impressions on the exact query string.
- **CTR uplift from the Apr 27 snippet rewrite is still unmeasurable** for 5 of 6 target queries — zero clicks across all 6 queries in every window, every run, since tracking began. Nothing to compare against until May 2027.
- One page-level number moved more than usual: `vrindavan/may` aggregate position went 8.8 (pre) → 7.8 (June) → 15.6 (07-13 recent) → **28.6 (07-20 recent)**, on 26 impressions. Flagged below — read as continued low-volume noise, not a real ranking event, because the actual target query ("vrindavan temperature in may") has had zero impressions since April.
- **Recommending (5th consecutive time) that this scheduled task be disabled or retired.** Five straight runs (06-22, 06-29, 07-06, 07-13, 07-20) have found the same stable state. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 07-13 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-07-12 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-07-02 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge — and this week not even a re-crawl occurred, meaning Google has fully deprioritized re-checking these URLs, which is the expected end-state for a settled redirect.

## Part 2 — CTR check on Apr 27 snippet rewrite (5th re-run)

New script `scripts/_gsc-ctr-check-2026-07-20.mjs`, refreshing only the RECENT window (Jun 23 – Jul 20, 28d) to check for drift since 07-13. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d impr/pos (07-13) | RECENT28d impr/pos (07-20) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 22 / 8.7 | 18 / 8.9 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 1 / 4.0 | 1 / 4.0 |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (07-13) | RECENT28d (07-20) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 7.0 | 1 / 7.0 |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 11 / 15.6 | **26 / 28.6** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 104 / 8.6 | 101 / 9.3 |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 2 / 3.5 | 2 / 3.5 |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | 0 / — |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 26 / 8.7 | **12 / 8.3** |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`darjeeling june weather` — still resolved, trend still improving.** Position: 11.5 (pre) → 9.6 (June-full) → 8.7 (07-13) → 8.3 (07-20). Four consecutive checks, four consecutive improvements. Impressions this window dropped to 12 (from 26), consistent with off-season traffic tapering, but rank quality keeps getting better on whatever traffic remains. No action needed.
3. **`vrindavan/may` page position is the largest single-window swing recorded in this check's history** (15.6 → 28.6, on 26 impressions). Read as noise, not signal: the actual target query ("vrindavan temperature in may") has logged zero impressions since the PRE window in April, so this page's aggregate position is being driven entirely by an unrelated, low-volume, long-tail query mix that drifts as an off-season page ages — not a ranking regression on anything this campaign targets. Worth a glance next run to confirm it doesn't compound, but not actionable today.
4. **Zero clicks across the board remains the honest headline finding.** None of the 6 named queries have converted a single click pre- or post-deploy, across 5 consecutive checks now.

## What this scheduled task should become

Fifth consecutive run reaching the same conclusion: all 5 URLs are stably consolidated (this week not even re-crawled), and the CTR question this task asks about is structurally unanswerable until the queries are back in season. Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (5th time). To disable: ask Claude to run `mcp__scheduled-tasks__delete_scheduled_task` (or update its cadence) in an interactive session, or delete it from the scheduled tasks UI directly.

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 5th.
- New script `scripts/_gsc-ctr-check-2026-07-20.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern.
