# Scheduled task — GSC canonical consolidation + Apr 27 CTR check

**Run date:** 2026-08-31
**Triggered by:** scheduled task `gsc-canonical-consolidation` (Mondays 9:05 PM)
**Property:** sc-domain:nakshiq.com
**11th consecutive week** in this exact cadence (06-22, 06-29, 07-06, 07-13, 07-20, 07-27, 08-03, 08-10, 08-17, 08-24, now 08-31), part of a longer series stretching back to late April.

---

## TL;DR

- **All 5 non-prefixed URLs remain consolidated to their `/en/` canonicals.** Same result as every check since 06-22 (11 for 11) — no drift, no action needed, no Request Indexing submitted (would be a no-op on an already-consolidated URL and just spends quota).
- **`yercaud/may` got a fresh Googlebot crawl this week** (2026-08-29, vs unchanged since 08-14 the prior two checks) — the only one of the 5 URLs re-crawled since 08-17. The other four (`kumbhalgarh`, `vrindavan`, `chakrata`, `pondicherry`) are unchanged.
- **This was the most eventful week for page-level performance in the whole 11-week series** — worth reading carefully rather than reusing last week's "nothing moved" framing:
  - **`vrindavan/may` broke last week's "plateau" with its biggest single-week position gain yet**: 20.5 (08-24) → **11.0 (08-31)**, on slightly higher impressions (12 → 15). Reverses the flattening trend flagged last week.
  - **`yercaud/may` is now on a 3-week worsening streak, not a one-week swing**: position 11.3 (08-17) → 16.4 (08-24) → **29.3 (08-31)**. Impressions kept shrinking in parallel (77 → 69 → 41), and its 4-week page-level click streak broke — **0 clicks this week**, the first zero-click week for this page since 08-03. This has graduated from "flagged as a new data point" last week to an actual multi-week trend.
  - **`darjeeling/june` moved for the first time in weeks**: position had been flat at 11.0 across both 08-17 and 08-24; this week it's **36.0**, on just 2 impressions (down from 3). Given the tiny sample, treating this as a new data point, not a confirmed trend — but it's a large move on a page that hadn't moved at all in the prior two checks.
  - **`pondicherry/may` went fully quiet**: 0 impressions this week, after 4 straight weeks static at 1 impression / 0 clicks / position 47.0 (08-03 through 08-24).
  - **`chakrata/may` logged its 4th consecutive week at 0 impressions** (08-10, 08-17, 08-24, 08-31).
- **CTR uplift from the Apr 27 snippet rewrite remains unmeasurable at the query level** — zero clicks on all 6 target queries in every window, every run, since tracking began (11 consecutive checks now, just over 2.5 months). This part of the picture is unchanged even though the page-level numbers moved.
- **Recommending (11th consecutive time) that this scheduled task be disabled or retired**, specifically for the canonical-consolidation half — that question has had the same answer for 11 straight weeks and is already covered by the weekly `gsc-inspect-sweep --patch` + `canary-probe` crons. Flagging one nuance this week: the CTR/position-tracking half just produced its first real multi-week signal (`yercaud/may`'s decline) — if the task is retired, that page is worth a manual glance next time someone is in GSC anyway, independent of what happens to the automation. Not acting on the disable recommendation unilaterally — it's a write action the task brief didn't authorize.

## Part 1 — Canonical consolidation: 5 non-prefixed URLs

Checked via `node scripts/gsc-inspect-sweep.mjs --url <url>` (OAuth refresh-token auth, no Chrome/dashboard needed).

| Non-prefixed URL | Coverage | Google's canonical | User canonical | Last crawl | Last crawl vs 08-24 |
|---|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` | (none) | 2026-05-12 | unchanged |
| `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` | `/en/destination/vrindavan/may` | 2026-08-01 | unchanged |
| `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` | `/en/destination/yercaud/may` | **2026-08-29** | **fresh crawl** (was 2026-08-14) |
| `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` | (none) | 2026-04-17 | unchanged |
| `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` | (none) | 2026-04-20 | unchanged |

All five: `indexingState: INDEXING_ALLOWED`, `robotsTxtState: ALLOWED`, verdict `NEUTRAL` ("URL is not on Google" — expected, since the non-prefixed URL correctly defers to the `/en/` canonical).

**Action taken: none.** All 5 are correctly resolved; Request Indexing was not submitted because there is nothing to nudge.

Note on the fresh yercaud crawl: it landed 2026-08-29, two days before this check, inside the tail of the RECENT28d performance window below (Aug 4–31) but after essentially all the impressions in that window would have been served. A crawl re-fetches page content — it doesn't retroactively change already-logged Search performance data — so it's more likely Google re-verifying a page whose engagement/ranking had been sliding (see Part 2) than a cause of that slide. Flagging the coincidence, not claiming causation.

## Part 2 — CTR check on Apr 27 snippet rewrite (11th re-run)

New script `scripts/_gsc-ctr-check-2026-08-31.mjs`, refreshing only the RECENT window (Aug 4 – Aug 31, 28d) to check for drift since 08-24. PRE and JUNE-FULL windows kept identical to prior runs for comparability.

### Query level

| Query | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-24) | RECENT28d (08-31) |
|---|---|---|---|---|
| vrindavan temperature in may | 222 / 9.5 | 0 / — | 0 / — | 0 / — |
| yercaud weather in may | 278 / 11.8 | 33 / 9.5 | 12 / 8.8 | 4 / 7.5 |
| chakrata temperature in may | 116 / 7.1 | 1 / 12.0 | 0 / — | 0 / — |
| kanatal in may | 65 / 6.0 | 0 / — | 0 / — | 0 / — |
| pondicherry weather in may | 315 / 11.7 | 0 / — | 0 / — | 0 / — |
| darjeeling june weather | 85 / 12.5 | 0 / — | 0 / — | 0 / — |

Zero clicks on all 6 queries in every window, pre- and post-deploy alike — unchanged from every prior run. `yercaud weather in may` did register 4 impressions this window (down from 12; position slightly better at 7.5 vs 8.8), the only query with any recent-window signal at all — still 0 clicks.

### Page level (including `/en/destination/darjeeling/june`)

| Page | PRE impr/pos | JUNE-FULL impr/pos | RECENT28d (08-24) | RECENT28d (08-31) |
|---|---|---|---|---|
| .../kumbhalgarh/may | no data | 1 / 7.0 | 1 / 9.0 | 1 / 9.0 |
| .../vrindavan/may | 919 / 8.8 (1 clk) | 13 / 7.8 | 12 / 20.5 | **15 / 11.0** |
| .../yercaud/may | 731 / 10.7 (1 clk) | 113 / 8.8 | 69 / 16.4 (1 clk) | **41 / 29.3 (0 clk)** |
| .../chakrata/may | 668 / 6.8 | 13 / 8.0 | 0 / — | 0 / — |
| .../pondicherry/may | 83 / 10.6 (1 clk) | 1 / 16.0 | 1 / 47.0 | **0 / —** |
| **.../darjeeling/june** | 471 / 11.5 | 157 / 9.6 | 3 / 11.0 | **2 / 36.0** |

### Read

1. **`vrindavan/may` reversed its plateau with the largest single-week position gain logged for this page.** Last week's read was "3-week streak flattened, essentially no further movement." This week: 20.5 → 11.0, a ~9.5-point improvement, alongside a small impressions uptick (12 → 15). Full position history: 30.8 (08-03) → 24.3 (08-10) → 20.6 (08-17) → 20.5 (08-24) → **11.0 (08-31)**. Worth watching whether this holds or is itself noise at 15 impressions.
2. **`yercaud/may` has now moved from "one flagged swing" to a genuine 3-week trend.** Position: 11.3 (08-17) → 16.4 (08-24) → 29.3 (08-31) — worse every week for 3 consecutive checks. Impressions: 77 → 69 → 41, also declining every week. Its page-level click streak (1 click every window from 08-03 through 08-24) broke this week at 0. The named query itself (`yercaud weather in may`) is still at 0 clicks throughout, as always, but this is the clearest directional signal this task has produced in 11 weeks.
3. **`darjeeling/june` moved for the first time since tracking began drifting.** Flat at 3 impr / position 11.0 across both 08-17 and 08-24; this week 2 impr / position 36.0. Only 2 impressions behind the reading, so this is logged as a new data point rather than a trend — but it's the biggest single-week move for this page in the series.
4. **`pondicherry/may` broke its 4-week static streak by going to zero.** 1 impr / 0 clk / position 47.0 was unchanged 08-03 → 08-24; this week is 0 impressions. Consistent with the broader off-season fade rather than a distinct signal.
5. **`chakrata/may` extended its quiet streak to 4 weeks** — 0 impressions at 08-10, 08-17, 08-24, and now 08-31.
6. **The core finding is unchanged: zero clicks on all 6 named queries, every window, every run, 11 consecutive checks (~2.5 months).** The snippet-rewrite CTR question remains unmeasurable at the query level regardless of this week's page-level movement.
7. **Caveat on all of the above:** every page here is running on 0–41 impressions per 28-day window. Position figures at this volume are impression-weighted averages that can swing double digits from a handful of different query variants surfacing week to week. Treating vrindavan's gain and yercaud's decline as real signals worth a mention, not as confirmed, low-noise trends — especially vrindavan's, which is one data point in the opposite direction of a prior 3-week pattern.

## What this scheduled task should become

Eleventh consecutive run reaching the same operational conclusion on the question this task was actually built to answer: all 5 URLs are stably consolidated, and nothing has required Request Indexing since this task's cadence began in late April/June. That part of the recommendation is unchanged:

- **Disable/retire `gsc-canonical-consolidation`** — its indexing-health job is now covered by the weekly `gsc-inspect-sweep --patch` cron and `canary-probe`, or
- **If kept, change its cadence to monthly or seasonal** (next meaningful check-in: April 2027, ahead of the May season) rather than weekly.

One addition this week: the CTR/position-tracking half of this task (Part 2) — which has mostly been a "nothing to report" afterthought for 11 weeks — just produced its first real multi-week trend (`yercaud/may`'s 3-week decline). That doesn't argue for keeping this specific *weekly* task alive (the trend would be just as visible checking monthly), but it does mean whoever next looks at GSC for any reason should glance at `yercaud/may` specifically, independent of this task's fate.

This is now a 2.75-month-old standing recommendation with no change in the underlying evidence on the consolidation question — 11 for 11. Left the task enabled since this run's instructions didn't authorize disabling automations — founder decision needed to actually turn it off (see history in `gsc-audits/scheduled-2026-0{6-22,6-29,7-06,7-13,7-20,7-27}*.md` and `scheduled-2026-08-{03,10,17,24}-canonical-consolidation.md`).

## Notes on autonomous decisions

- No Chrome/dashboard needed — the OAuth-authenticated `gsc-inspect-sweep.mjs` handles URL Inspection directly. The task brief's note about `taneja.ashish5@gmail.com` lacking property access is moot for this automated path (same as every prior run).
- Did not submit Request Indexing on any of the 5 URLs — all already correctly consolidated, so the action would be a no-op that spends part of the daily quota.
- Did **not** default to reusing last week's "nothing changed, same conclusion" language once the numbers came back — this week's page-level table showed the most movement in the series (vrindavan up sharply, yercaud down for a 3rd straight week, darjeeling's first move, pondicherry going fully quiet). Wrote the read fresh against what the data actually showed rather than pattern-matching the last several reports' template.
- New script `scripts/_gsc-ctr-check-2026-08-31.mjs` added following the existing `_gsc-ctr-*.mjs` one-off convention, changing only the RECENT window per prior runs' pattern (Aug 4–31, 28d).
- Updated `CLAUDE.md` → "Pending user-action items" to refresh the resolved-item note with today's re-verification and bump the disable-recommendation counter to 11th.
- Did not touch any of the unrelated uncommitted/untracked files sitting in the working tree at run start (cinematic component edits, cruise-pricing scratch files, `qa/findings/2026-08-27/`, etc.) — committed only the 2 files this task wrote/edited, path-scoped, per the repo's commit-hygiene rule.
