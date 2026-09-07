# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-09-07
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**12th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, 08-10, 08-17, 08-24, 08-31, now 09-07), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals — 12 for 12.** Same result as every check since 06-22. No drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **No fresh Googlebot crawls this week** — all 5 last-crawl timestamps are unchanged from 08-31 (including yercaud's 08-29 crawl, which was the only recent one).
- **`yercaud/may`'s decline is now a 4-week streak and has gotten materially worse, not just continued**: position 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) → **41.3 (09-07)**. Impressions kept shrinking too (77 → 69 → 41 → 28). Still 0 clicks, extending last week's broken streak to a 2nd zero-click week.
- **`vrindavan/may` gave back last week's gain**: position went 20.5 (08-24) → 11.0 (08-31) → **13.3 (09-07)** — the single-week jump to 11.0 didn't hold, though it's still well ahead of the 08-24 low. Impressions similar (15 → 12).
- **`darjeeling/june` had its worst reading yet**: position 36.0 (08-31, 2 impr) → **63.0 (09-07, 1 impr)**. Extremely thin sample (1 impression) — logging as a data point, not a trend, but it's the lowest rank this page has shown in the series.
- **`pondicherry/may` and `chakrata/may` both went to 0 impressions again** (pondicherry: 2nd straight quiet week after breaking a 4-week static streak; chakrata: 0 impressions again but had 3 impr in 08-31 so this isn't a pure continuation — see table).
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable at the query level** — zero clicks on all 6 target queries in every window, every run, since tracking began (12 consecutive checks now, ~3.5 months).
- **Recommending (12th consecutive time) that this scheduled task be disabled or retired** for the canonical-consolidation half — unchanged answer for 12 straight weeks, already covered by `gsc-inspect-sweep --patch` + `canary-probe` crons. The CTR/position half is now showing a real, worsening multi-week signal on `yercaud/may` (4 weeks of decline) that's worth a manual look independent of this task's fate. Not acting on the disable recommendation unilaterally — it's a write action this run's brief didn't authorize.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 08-31 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-08-01 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-08-29 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (12th re-run)

New script `scripts/_gsc-ctr-check-2026-09-07.mjs`, refreshing only the RECENT window (Aug 11 – Sep 7, 28d) to check for drift since 08-31. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-31) | RECENT28d (09-07) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 4 / 7.5 | 1 / 10.0 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run. `yercaud weather in may` still has some residual signal but is fading (4 impr → 1 impr week over week), still 0 clicks throughout.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-31) | RECENT28d (09-07) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 0 / — | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 15 / 11.0 | **12 / 13.3** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 41 / 29.3 (0 clk) | **28 / 41.3 (0 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 0 / — | **3 / 9.7** |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | 0 / — |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 2 / 36.0 | **1 / 63.0** |

### Read

1. **`yercaud/may`'s decline is now a confirmed 4-week trend and the worst reading yet.** Position: 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) → **41.3 (09-07)**. Every single week worse than the last, for a month straight. Impressions have fallen in parallel every week too (77 → 69 → 41 → 28). This is the clearest and now longest-running signal this task has produced — worth a manual look at what's happening to this page/query independent of whatever happens to the scheduled task.
2. **`vrindavan/may` gave back most of last week's surprise gain.** 20.5 (08-24) → 11.0 (08-31) → 13.3 (09-07). Still meaningfully better than the 08-24 low, but the jump to 11.0 looks like it was partly noise at 15 impressions rather than a durable improvement — full run: 30.8 → 24.3 → 20.6 → 20.5 → 11.0 → 13.3.
3. **`darjeeling/june` posted its lowest position in the series** — 63.0 on a single impression, down from 36.0 (2 impr) last week and roughly flat-at-11 for the two weeks before that. One-impression samples are essentially noise; flagging as a data point, not a trend.
4. **`chakrata/may` broke its 4-week zero-impression streak with 3 impressions this week (position 9.7)** — a small reversal after 08-10/08-17/08-24/08-31 were all quiet.
5. **`pondicherry/may` stayed at 0 impressions for a 2nd straight week**, after 4 static weeks at 1 impr/position 47.0 through 08-24.
6. **`kumbhalgarh/may` also went to 0 impressions** — it's had at most 1 impression in any window all series, so this isn't a meaningful shift either way.
7. **The core finding is unchanged: zero clicks on all 6 named queries, every window, every run, 12 consecutive checks (~3.5 months).** The snippet-rewrite CTR question remains unmeasurable at the query level.
8. **Caveat, as every week:** all pages are running on 0–28 impressions per 28-day window at this point (lower than 08-31's 0–41 range) — position figures at this volume are noisy impression-weighted averages. Yercaud's 4-week monotonic decline is the one pattern here that's now consistent enough across enough weeks to treat as a real signal rather than noise; everything else this week (vrindavan's partial reversal, darjeeling's low sample, chakrata's small reversal) is within plausible noise for the sample sizes involved.

## What this scheduled task should become

Twelfth consecutive run reaching the same operational conclusion on the question this task was actually built to answer: all 5 URLs are stably consolidated, and nothing has required Request Indexing since this task's cadence began in late April/June.

- **Disable/retire `gsc-canonical-consolidation`** — its indexing-health job is now covered by the weekly `gsc-inspect-sweep --patch` cron and `canary-probe`, or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Standing addition from last week, now reinforced: `yercaud/may`'s decline has gone from "first real signal" to a **4-week monotonic worsening trend** (position roughly quadrupled from 11.3 to 41.3 over 4 weeks, impressions down ~64% over the same span). That's a real finding independent of the consolidation question and worth a manual look whenever GSC is next opened, regardless of this task's fate — the weekly cadence is what surfaced it, so if the task is disabled, something should still be watching this specific page.

This is now a 3-month-old standing recommendation with no change in the underlying evidence on the consolidation question — 12 for 12. Left the task enabled since this run's instructions didn't authorize disabling automations — founder decision needed to actually turn it off (see history in `gsc-audits/scheduled-2026-0{6-22,6-29,7-06,7-13,7-20,7-27}*.md` and `scheduled-2026-08-{03,10,17,24,31}-canonical-consolidation.md`).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path (same as every prior run).
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Wrote the read fresh against this week's actual numbers rather than reusing last week's template — vrindavan partially reversed, yercaud kept declining (now the headline finding), darjeeling hit a new low, chakrata had a small reversal.
- New script `scripts/_gsc-ctr-check-2026-09-07.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern (Aug 11–Sep 7, 28d).
- Will commit this file plus the new script via `scripts/audit-commit-guard.sh`, path-scoped, per the repo's commit-hygiene rule — not touching any other uncommitted/untracked files in the working tree.
