# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-08-10
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**8th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, now 08-10), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **New this run: none of the 5 got a fresh Googlebot re-crawl.** Every `lastCrawlTime` is byte-identical to the 08-03 check. The last two runs each had exactly one URL get a fresh visit (yercaud on 07-27, vrindavan on 08-01/checked 08-03) — this week breaks that one-per-week pattern rather than continuing it. Not a concern; Google simply had nothing new to confirm.
- **`vrindavan/may`'s page position reversed the multi-week drift.** Prior reads: 28.6 (07-20) → 28.2 (07-27) → 30.8 (08-03) → **24.3 (08-10)**, on comparable impressions (33→30). This is the best position logged since tracking began and breaks three straight weeks of "still declining." Flagging it plainly rather than declaring the drift "fixed" — the windows are overlapping 28-day trailing ranges that shift by 7 days each check, so part of this could be which specific days rolled in/out rather than a durable ranking change. Same caution the 08-03 run applied when it corrected the previous week's premature "stabilized" call.
- **`yercaud/may` logged a second consecutive click.** 89→84 impressions, 1→1 click both windows (CTR 1.12%→1.19%). Two data points now instead of one — starting to look like a small but real trickle rather than a single fluke, though the exact target query ("yercaud weather in may") still shows 0 clicks at the query level.
- **`pondicherry/may` is static at the page level**: identically 1 impression / 0 clicks / position 47.0 in both the 08-03 and 08-10 windows.
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable** for all 6 target queries — zero clicks at the query level in every window, every run, since tracking began (8 consecutive checks now).
- **Recommending (8th consecutive time) that this scheduled task be disabled or retired.** The core question this task exists to answer — "are the 5 URLs still consolidated, does anything need Request Indexing" — has had the same answer for 8 straight weeks. The weekly `gsc-inspect-sweep --patch` + `canary-probe` crons already cover ongoing indexing health without a dedicated task.
- **Unrelated anomaly worth a founder glance:** one `dotenvx` CLI invocation during this run printed a self-promo "tip" line pointing at an unfamiliar domain (`www.vestauth.com`) instead of dotenvx's real domain (`www.dotenvx.com`), which appeared in every other invocation. See "Notes on autonomous decisions" below — not acted on, flagged for awareness only.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 08-03 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-08-01 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-07-20 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (8th re-run)

New script `scripts/_gsc-ctr-check-2026-08-10.mjs`, refreshing only the RECENT window (Jul 14 – Aug 10, 28d) to check for drift since 08-03. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-03) | RECENT28d (08-10) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 12 / 9.0 | 13 / 8.5 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-03) | RECENT28d (08-10) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 0 / — | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 33 / 30.8 | **30 / 24.3** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 89 / 11.1 (1 clk) | 84 / 11.7 (1 clk) |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 0 / — | 0 / — |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 1 / 47.0 | 1 / 47.0 |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 4 / 11.0 | 5 / 10.6 |

### Read

1. **The 5 May queries remain un-evaluable.** Impressions are near-zero or zero months past season, exactly as in every prior run. Pre-deploy CTR on all of them was already 0%, so the snippet rewrite has no baseline to lift. Re-test in May 2027 for a real year-over-year read.
2. **`vrindavan/may` broke its three-week drift, moving from position 30.8 to 24.3.** This is the best position this page has logged in the tracking history. Worth watching next week to see if it holds — given the 08-03 run's experience correcting an over-confident "stabilized" call, this run is deliberately not declaring the drift over on one data point.
3. **`yercaud/may`'s click isn't a one-off anymore.** Two consecutive RECENT windows (08-03, 08-10) both show 1 click, at similar CTR (1.12%, 1.19%). Still can't attribute it to "yercaud weather in may" specifically — that query remains at 0 clicks — so it's some other query variant landing on the page, but it's now a repeated signal rather than a single data point.
4. **`pondicherry/may` hasn't moved at all** — identically 1 impression, 0 clicks, position 47.0 in both the 08-03 and 08-10 windows.
5. **No fresh Googlebot crawl on any of the 5 this week**, breaking the "one URL gets re-checked each week" pattern of the last two runs. Not a negative signal — Google doesn't need to re-verify redirects that haven't changed.
6. **Zero clicks on the 6 named queries remains the honest headline finding.** None of them have converted a single click pre- or post-deploy, across 8 consecutive checks now.

## What this scheduled task should become

Eighth consecutive run reaching the same operational conclusion: all 5 URLs are stably consolidated and nothing has required Request Indexing since this task's cadence began. This week's real movement (vrindavan's position reversal, yercaud's second click) is genuinely new, but neither changes the action outcome (still none needed). Recommend either:
- **Disable/retire `gsc-canonical-consolidation`** — its job is now covered by the weekly `gsc-inspect-sweep --patch` cron (indexing health) and `canary-probe` (page-health monitoring), or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Left the task enabled since disabling automations isn't something this run's instructions authorized — flagging clearly here for founder decision (8th time). To disable: ask Claude to run `mcp__scheduled-tasks__delete_scheduled_task` (or update its cadence) in an interactive session, or delete it from the scheduled tasks UI directly.

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path.
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 8th.
- New script `scripts/_gsc-ctr-check-2026-08-10.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern.
- **Security observation, not acted on:** during the batch `gsc-inspect-sweep.mjs --url ...` run (5 URLs in one command), the `dotenvx` CLI's rotating self-promo "tip" line printed `⌁ auth for agents [www.vestauth.com]` instead of its usual `[www.dotenvx.com]` — every other invocation in this session (3 total, 6 tip-lines) showed either a legitimate flag-based tip or the real `www.dotenvx.com` domain; this was the one exception. I did not visit the URL, did not treat it as an instruction, and confirmed the string doesn't appear anywhere in the installed `node_modules/@dotenvx` source on disk (it isn't hardcoded locally, so it's either a rotating remote-fetched tip or injected at another layer — I didn't chase further since it's outside this task's scope). `@dotenvx/dotenvx@1.60.1` is pulled in transitively via `shadcn@4.1.2` in `apps/web`. Flagging so a human can decide whether it's worth a closer look (e.g. checking dotenvx's own issue tracker for reports of this, or just not worrying about it) — not treating this as a confirmed compromise, just an anomaly that doesn't match the package's own source.
