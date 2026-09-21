# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-09-21
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**14th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, 08-10, 08-17, 08-24, 08-31, 09-07, 09-14, now 09-21), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals — 14 for 14.** Same result as every check since 06-22. No drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **`vrindavan/may` got its first fresh Googlebot crawl in seven weeks** — 2026-09-16, up from the 08-01 timestamp that had been static since at least 09-07. The other 4 URLs are unchanged from last week (kumbhalgarh 05-12, yercaud 08-29, chakrata 04-17, pondicherry 04-20) — yercaud's 08-29 crawl is now over 3 weeks old.
- **`yercaud/may`'s 5-week monotonic decline broke this week.** Position: 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) → 41.3 (09-07) → 44.8 (09-14) → **39.2 (09-21)** — the first week-over-week improvement in the series since the decline started. Still far worse than the 08-17 baseline and still 0 clicks (a 4th straight zero-click week), and impressions kept falling in parallel (28 → 22 → **18**), so this reads as a pause/partial bounce inside a still-thin, still-weak trend rather than a reversal — worth one more week to see if it's noise or a real inflection.
- **`vrindavan/may` gave back most of last week's series-best gain**: position 6.8 (09-14) → **9.9 (09-21)**, on 7 impressions (down from 8). Still comfortably better than the 20–30 range this page sat in through July, so the broader improvement isn't erased — just the single best reading wasn't sustained.
- **`chakrata/may` broke its two-week static reading** (3 impr/9.7 for both 08-31 and 09-07, per the 09-14 report's note) with **5 impr/9.0** this week — new data, not a repeat, so last week's "likely window-overlap artifact" caveat is resolved for this page.
- **`darjeeling/june` read identically to 09-14 for a second straight week** (1 impr/63.0) — with two consecutive identical readings now, still most plausibly the same underlying impression event sitting inside the 21-day window overlap rather than a genuine "no change," but this is worth confirming next week since two-in-a-row is starting to look less like coincidence.
- **`pondicherry/may` picked up its first impression in 4 weeks** (1 impr, position 8.0, 0 clicks) after three straight 0-impression weeks (08-31, 09-07, 09-14). Single data point, not a trend.
- **`kumbhalgarh/may` stayed at 0 impressions** in the RECENT28d window — consistent with the whole series (it's never had more than 1 impression in any window).
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable at the query level** — zero clicks on all 6 target queries in every window, every run, since tracking began (14 consecutive checks now, ~5 months).
- **Recommending (14th consecutive time) that this scheduled task be disabled or retired** for the canonical-consolidation half — unchanged answer for 14 straight weeks, already covered by `gsc-inspect-sweep --patch` + `canary-probe` crons. The CTR/position half is the only part still producing live signal this week (yercaud's trend-break, chakrata's new data, darjeeling's second identical reading) — worth a manual look independent of this task's fate. Not acting on the disable recommendation unilaterally — it's a write action this run's brief didn't authorize.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 09-14 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-09-16 | **new crawl (was 08-01)** |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-08-29 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (14th re-run)

New script `scripts/_gsc-ctr-check-2026-09-21.mjs`, refreshing only the RECENT window (Aug 25 – Sep 21, 28d) to check for drift since 09-14. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (09-14) | RECENT28d (09-21) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 0 / — | 0 / — |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run. `yercaud weather in may` stayed fully dormant at the query level for a 2nd straight week (0 impressions), even though the page-level query below picked back up slightly.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (09-14) | RECENT28d (09-21) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 0 / — | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 8 / 6.8 | **7 / 9.9** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 22 / 44.8 (0 clk) | **18 / 39.2 (0 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 3 / 9.7 | **5 / 9.0** |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | **1 / 8.0** |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 1 / 63.0 | 1 / 63.0 |

### Read

1. **`yercaud/may`'s decline broke this week — but it's a pause, not yet a reversal.** Position improved from 44.8 (09-14) to **39.2 (09-21)**, the first week-over-week gain since the 5-week slide began. Still nowhere near the 08-17 baseline of 11.3, still 0 clicks (4th zero-click week running), and impressions kept shrinking in parallel (22 → 18, continuing the ~77% drop from 08-17's 77). One data point isn't enough to call this a real inflection — next week's reading will say whether this is noise at low impression counts or an actual bottom.
2. **`vrindavan/may` gave back most of last week's series-best reading.** 09-14's 6.8 was the best position in the entire 8-week series; this week it's back to 9.9 on 7 impressions (down from 8). Still well inside the "improved" range relative to July's 20–30 readings, so the broader trend isn't reversed — just the single best data point wasn't repeated, consistent with this page running on single-digit impressions where week-to-week noise is large.
3. **`chakrata/may` produced new numbers for the first time in 3 weeks.** The 09-14 report flagged 08-31/09-07/09-14 as all reading 3 impr/9.7, likely the same impression events sitting inside overlapping 28-day windows. This week's 5 impr/9.0 is different, resolving that ambiguity — it was measurement-window overlap, not a stuck value.
4. **`darjeeling/june` read identically to 09-14 for a second straight week** (1 impr/63.0). Two consecutive identical readings is a stronger signal that this is the same single impression event still inside the 28-day window (it would need roughly one more week to fully roll out of the overlap), not a genuine "nothing changed." Worth checking whether next week's reading finally moves.
5. **`pondicherry/may` picked up its first impression in a month** (1 impr, position 8.0, 0 clicks), after 08-31/09-07/09-14 all sat at 0. A single impression at very good position (8.0) is a thin but interesting data point — not enough to call a trend.
6. **`kumbhalgarh/may` stayed at 0 impressions**, consistent with the whole series (never more than 1 impression in any 28-day window).
7. **The core finding is unchanged: zero clicks on all 6 named queries, every window, every run, 14 consecutive checks (~5 months).** The snippet-rewrite CTR question remains unmeasurable at the query level.
8. **Caveat, as every week:** all pages are running on 0–18 impressions per 28-day window (lower ceiling than 09-14's 0–22 range) — position figures at this volume are noisy impression-weighted averages. This week is genuinely more eventful than most recent ones (yercaud's trend-break, chakrata's new data, pondicherry's return, vrindavan's partial giveback) but every one of those reads on single-digit-to-teens impressions, so treat all of it as suggestive rather than conclusive.

## What this scheduled task should become

Fourteenth consecutive run reaching the same operational conclusion on the question this task was actually built to answer: all 5 URLs are stably consolidated, and nothing has required Request Indexing since this task's cadence began in late April/June.

- **Disable/retire `gsc-canonical-consolidation`** — its indexing-health job is now covered by the weekly `gsc-inspect-sweep --patch` cron and `canary-probe`, or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Standing note, updated this week: `yercaud/may`'s multi-week decline paused rather than continued — after 5 straight weeks of worsening position (11.3 → 44.8), this week improved to 39.2. That's worth a manual look regardless of this task's fate, both to confirm whether it's a real bottom and because impressions are still falling even as position improved, which is an odd combination worth understanding. The rest of this week's page-level movement (`chakrata` resolving its window-overlap plateau, `pondicherry` returning after a month, `vrindavan` giving back its best reading) is all within normal single-digit-impression noise and doesn't change the overall picture.

This is now a 3.5+-month-old standing recommendation with no change in the underlying evidence on the consolidation question — 14 for 14. Left the task enabled since this run's instructions didn't authorize disabling automations — founder decision needed to actually turn it off (see history in `gsc-audits/scheduled-2026-0{6-22,6-29,7-06,7-13,7-20,7-27}*.md` and `scheduled-2026-{08-03,08-10,08-17,08-24,08-31,09-07,09-14}-canonical-consolidation.md`).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path (same as every prior run).
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Wrote the read fresh against this week's actual numbers rather than reusing last week's template — yercaud's trend-break, vrindavan's partial giveback, chakrata's new data resolving a prior ambiguity, pondicherry's return, and darjeeling's second identical reading are all genuinely this week's findings, not copy-pasted.
- New script `scripts/_gsc-ctr-check-2026-09-21.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern (Aug 25–Sep 21, 28d).
- Did not touch other untracked files sitting in the working tree at run time (`_tmp-q.mjs`, `gsc-audits/demand-gaps-2026-09-17.md`, several `scripts/_tmp-*-2026-09-20.mjs` files, `scripts/_gsc-summary-2026-09-20.mjs`, `.claude/settings.local.json`) — those belong to other sessions' in-progress work; this run's commit is path-scoped to only the two files it wrote, per the repo's commit-hygiene rule.
- Will commit this file plus the new script via `scripts/audit-commit-guard.sh`, path-scoped, per the repo's commit-hygiene rule.
