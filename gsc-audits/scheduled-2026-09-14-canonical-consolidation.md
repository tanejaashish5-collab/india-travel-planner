# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-09-14
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**13th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, 08-10, 08-17, 08-24, 08-31, 09-07, now 09-14), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals — 13 for 13.** Same result as every check since 06-22. No drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **No fresh Googlebot crawls this week** — all 5 last-crawl timestamps are unchanged from 09-07 (kumbhalgarh 05-12, vrindavan 08-01, yercaud 08-29, chakrata 04-17, pondicherry 04-20). Yercaud's 08-29 crawl is still the most recent of the five, now over 2 weeks old.
- **`yercaud/may`'s decline is now a confirmed 5-week monotonic trend**: position 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) → 41.3 (09-07) → **44.8 (09-14)**. Impressions kept shrinking too (77 → 69 → 41 → 28 → 22). Still 0 clicks, extending the zero-click streak to a 3rd week. This is now the longest-running, most consistent signal this task has produced.
- **`vrindavan/may` posted its best position in the whole series**: 13.3 (09-07) → **6.8 (09-14)**, on 8 impressions (down from 12). Full run across 7 weeks: 30.8 → 24.3 → 20.6 → 20.5 → 11.0 → 13.3 → **6.8**. Worth noting alongside yercaud's decline as the more encouraging read this week, though at single-digit impressions it's a thin sample.
- **`chakrata/may` and `darjeeling/june` read identically to last week** (chakrata 3 impr / pos 9.7; darjeeling 1 impr / pos 63.0) — most likely the same underlying impression events still sitting inside the 21-day overlap between this week's and last week's 28-day windows, not necessarily "no change." Flagging as a measurement caveat rather than a finding.
- **`pondicherry/may` and `kumbhalgarh/may` stayed at 0 impressions for a 3rd straight week.**
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable at the query level** — zero clicks on all 6 target queries in every window, every run, since tracking began (13 consecutive checks now, ~4.5 months).
- **Recommending (13th consecutive time) that this scheduled task be disabled or retired** for the canonical-consolidation half — unchanged answer for 13 straight weeks, already covered by `gsc-inspect-sweep --patch` + `canary-probe` crons. The CTR/position half continues to show a real, worsening multi-week signal on `yercaud/may` (now 5 weeks of decline) that's worth a manual look independent of this task's fate. Not acting on the disable recommendation unilaterally — it's a write action this run's brief didn't authorize.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 09-07 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-08-01 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | 2026-08-29 | unchanged |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

## Part 2 — CTR check on Apr 27 snippet rewrite (13th re-run)

New script `scripts/_gsc-ctr-check-2026-09-14.mjs`, refreshing only the RECENT window (Aug 18 – Sep 14, 28d) to check for drift since 09-07. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (09-07) | RECENT28d (09-14) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 1 / 10.0 | 0 / — |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run. `yercaud weather in may`'s last remaining trickle of impressions (1 in 09-07) dropped to 0 this week — the query-level signal for this term is now fully dormant.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (09-07) | RECENT28d (09-14) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 0 / — | 0 / — |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 12 / 13.3 | **8 / 6.8** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 28 / 41.3 (0 clk) | **22 / 44.8 (0 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 3 / 9.7 | 3 / 9.7 |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 0 / — | 0 / — |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 1 / 63.0 | 1 / 63.0 |

### Read

1. **`yercaud/may`'s decline is now a confirmed 5-week monotonic trend and the worst reading yet.** Position: 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) → 41.3 (09-07) → **44.8 (09-14)**. Every single week worse than the last, for over a month straight. Impressions have fallen in parallel every week too (77 → 69 → 41 → 28 → 22, a ~71% drop since 08-17). This remains the clearest and now longest-running signal this task has produced — still worth a manual look at what's happening to this page/query independent of whatever happens to the scheduled task.
2. **`vrindavan/may` posted its best position in the entire series.** Full run: 30.8 → 24.3 → 20.6 → 20.5 → 11.0 → 13.3 → **6.8**. This is a genuine improvement, not just a reversal of the 08-24 low — it's now better than every prior reading, including the earlier 11.0 spike. Caveat: only 8 impressions this window, so treat as encouraging rather than conclusive.
3. **`chakrata/may` and `darjeeling/june` read identically to 09-07** (3 impr/9.7 and 1 impr/63.0 respectively). Given the RECENT window only rolled forward by 7 days (21-day overlap with last week's window), this is most likely the same underlying impression event(s) still inside both windows rather than a genuine "no change" — flagging as a measurement-method caveat, not a finding, especially at these single-digit impression counts.
4. **`pondicherry/may` stayed at 0 impressions for a 3rd straight week**, after 4 static weeks at 1 impr/position 47.0 through 08-24 and 2 quiet weeks (08-31, 09-07).
5. **`kumbhalgarh/may` also stayed at 0 impressions** — it's had at most 1 impression in any window all series, so this isn't a meaningful shift either way.
6. **The core finding is unchanged: zero clicks on all 6 named queries, every window, every run, 13 consecutive checks (~4.5 months).** The snippet-rewrite CTR question remains unmeasurable at the query level.
7. **Caveat, as every week:** all pages are running on 0–22 impressions per 28-day window at this point (lower than 09-07's 0–28 range) — position figures at this volume are noisy impression-weighted averages. Yercaud's 5-week monotonic decline remains the one pattern here that's now consistent enough across enough weeks to treat as a real signal rather than noise; vrindavan's new best-in-series reading is the other notable data point this week, though on a thin sample.

## What this scheduled task should become

Thirteenth consecutive run reaching the same operational conclusion on the question this task was actually built to answer: all 5 URLs are stably consolidated, and nothing has required Request Indexing since this task's cadence began in late April/June.

- **Disable/retire `gsc-canonical-consolidation`** — its indexing-health job is now covered by the weekly `gsc-inspect-sweep --patch` cron and `canary-probe`, or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

Standing addition from the last two weeks, now reinforced further: `yercaud/may`'s decline has gone from "first real signal" to a **5-week monotonic worsening trend** (position roughly quadrupled from 11.3 to 44.8 over 5 weeks, impressions down ~71% over the same span). That's a real finding independent of the consolidation question and worth a manual look whenever GSC is next opened, regardless of this task's fate — the weekly cadence is what surfaced it, so if the task is disabled, something should still be watching this specific page. `vrindavan/may`'s new best-in-series position (6.8) is a small counterweight worth noting in the same breath, so this isn't read as pure decline across the board.

This is now a 3.5-month-old standing recommendation with no change in the underlying evidence on the consolidation question — 13 for 13. Left the task enabled since this run's instructions didn't authorize disabling automations — founder decision needed to actually turn it off (see history in `gsc-audits/scheduled-2026-0{6-22,6-29,7-06,7-13,7-20,7-27}*.md` and `scheduled-2026-{08-03,08-10,08-17,08-24,08-31,09-07}-canonical-consolidation.md`).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path (same as every prior run).
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Wrote the read fresh against this week's actual numbers rather than reusing last week's template — vrindavan hit a new series-best, yercaud kept declining (still the headline finding, now 5 weeks), chakrata/darjeeling read identically (flagged as a likely window-overlap artifact rather than a real "no change").
- New script `scripts/_gsc-ctr-check-2026-09-14.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern (Aug 18–Sep 14, 28d).
- Will commit this file plus the new script via `scripts/audit-commit-guard.sh`, path-scoped, per the repo's commit-hygiene rule — not touching any other uncommitted/untracked files in the working tree.
