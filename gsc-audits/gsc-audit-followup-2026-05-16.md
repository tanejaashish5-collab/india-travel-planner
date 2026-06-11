# GSC Audit Follow-up — 2026-05-16 (late-day refresh)

**Property:** https://www.nakshiq.com/
**Run by:** Daily scheduled task (taneja.ashish5@gmail.com)
**Performance data last update:** 3 hours ago (most recent date in series: **5/14/26** — one day newer than the morning audit)
**Indexing data last update:** 5/11/26 (still unchanged — now 5 days behind)

A scheduled run earlier today produced [gsc-audit-2026-05-16.md](./gsc-audit-2026-05-16.md). This run found that GSC has since pushed a new data day (5/14) into the 7-day window, so totals shifted. The morning audit's analysis remains valid; this file documents only the deltas.

---

## What changed since the morning audit

| Metric | Morning audit (5/13 freshest day) | This run (5/14 freshest day) | Δ |
|---|---|---|---|
| Total clicks (7d) | 107 | **101** | −6 (−5.6%) |
| Total impressions (7d) | 30.5K | **29.5K** | −1.0K (−3.3%) |
| Average CTR | 0.4% | **0.3%** | −0.1pp |
| Average position | 9.5 | **9.5** | flat |

**Reading:** The 7-day window mechanically slid forward by one day. A weaker 5/14 entered while a stronger pre-5/8 day rolled out, so totals fell ~5%. Position held flat, which is the more important signal. CTR ticked back down to 0.3% — note this matches the Apr 20 baseline and is a regression from the 0.4% seen on 5/14, 5/15, and the morning 5/16 pull.

**5/17 watchpoint (per morning audit's priority queue):** Item 4 said *"If 5/17 lands ≥110, the recent dip was just the window slide."* Tomorrow's data will confirm whether the click decline is purely window-slide or a real demand signal.

---

## Top queries (refresh — 7d ending 5/14)

Sorted by clicks (all 1-click queries, long-tail unchanged):

| # | Query | Clicks | Impressions |
|---|---|---|---|
| 1 | weather in munnar in june 2026 | 1 | 84 |
| 2 | jog falls in may | 1 | 32 |
| 3 | pelling height vs gangtok | 1 | 24 |
| 4 | darjeeling weather in may 2026 | 1 | 23 |
| 5 | hogenakkal falls in may month | 1 | 14 |
| 6 | anini in may | 1 | 13 |
| 7 | anini weather in july | 1 | 12 |
| 8 | kanyakumari in june | 1 | 12 |
| 9 | kanatal in may | 1 | 10 |
| 10 | patnitop weather in november | 1 | 5 |

"weather in munnar in june 2026" dropped from 2 clicks (morning) → 1 click — that's the single biggest contributor to the −6 click delta.

**Zero-click, high-impression queries (sorted by impressions):**

| # | Query | Impressions |
|---|---|---|
| 1 | monsoon in bhopal 2026 | 123 |
| 2 | weather dhauli | 114 |
| 3 | shatrunjaya hill palitana number of steps climb duration sunset timing | 105 |
| 4 | vrindavan temperature in june | 88 |
| 5 | jaipur weather in july 2026 | 79 |
| 6 | weather loktak | 76 |
| 7 | igatpuri temperature in may | 72 |
| 8 | munnar weather in june 2026 | 65 |
| 9 | munnar weather june 2026 | 64 |

These reinforce the morning audit's CTR-lever theme. /destination/munnar/june now appears against multiple near-duplicate queries ("weather in munnar in june 2026", "munnar weather in june 2026", "munnar weather june 2026") that should be ranking on the same page.

---

## Top pages (refresh — 7d ending 5/14)

**By clicks:**

| # | URL | Clicks | Impressions |
|---|---|---|---|
| 1 | /en/destination/munnar/june | 3 | 587 |
| 2 | /hi/destination/jabalpur/june | 3 | 337 |
| 3 | /hi/destination/shikharji/july | 3 | 85 |
| 4 | /en/destination/yercaud/may | 2 | 478 |
| 5 | /en/destination/hogenakkal/may | 2 | 143 |
| 6 | /destination/hemkund-sahib/june | 2 | 126 |
| 7 | /en/destination/kanatal/may | 2 | 101 |
| 8 | /en/where-to-go/andhra-pradesh-in-may | 2 | 91 |
| 9 | /hi/destination/bhaderwah/june | 2 | 64 |
| 10 | /en/destination/kochi/june | 2 | 26 |

**By impressions (CTR lever pages — all zero-click here are worst-CTR offenders):**

| # | URL | Clicks | Impressions |
|---|---|---|---|
| 1 | /en/destination/vrindavan/june | 0 | 727 |
| 2 | /en/treks/palitana-shatrunjaya | 0 | 682 |
| 3 | /hi/destination/darjeeling/may | 1 | 664 |
| 4 | /en/destination/bhopal/june | 0 | 654 |
| 5 | /en/destination/kasauli/may | 1 | 618 |
| 6 | /en/destination/munnar/june | 3 | 587 |
| 7 | /en/destination/yercaud/may | 2 | 478 |
| 8 | /en/destination/kasol/may | 0 | 467 |
| 9 | /en/destination/kochi/may | 0 | 424 |
| 10 | /en/destination/mahabaleshwar/june | 0 | 384 |

**New observations vs the morning audit:**
- `/en/destination/vrindavan/june` jumped to #1 by impressions (727, 0 clicks) — wasn't in the morning audit's top 10. Pairs cleanly with the "vrindavan temperature in june" query (88 impressions, 0 clicks). **New CTR target.**
- `/en/treks/palitana-shatrunjaya` at #2 (682 imp, 0 clicks) pairs with the long "shatrunjaya hill palitana number of steps..." query (105 imp). The page exists and is ranking, but the title/snippet evidently doesn't satisfy the climb-duration / sunset-timing intent in the query — likely a snippet rewrite, not a content gap.
- `/destination/hemkund-sahib/june` (no locale prefix) keeps surfacing with 2 clicks — confirms the open `/en/` consolidation item is real, not just a tail artifact.

---

## Indexing — unchanged

GSC indexing data freshness is still 5/11/26. All 12 reasons-not-indexed buckets, the 14.8K indexed count, and the 26-URL Failed 404 validation are unchanged from the morning audit. The 5-day staleness is now at the outer edge of normal cadence — flagging for 5/17.

---

## Action items (no change from morning audit)

The morning audit's priority queue is unaffected by this refresh. Re-listing for convenience:

1. Re-submit the 26-URL 404 validation (Failed since Apr 20, ~26 days).
2. Title/meta optimisation on high-impression / sub-1% CTR pages — now extended with `/en/destination/vrindavan/june` and `/en/treks/palitana-shatrunjaya`.
3. Audit "Page with redirect" 2,679 bucket (flat for 3 audits).
4. Watch 5/17 clicks number — confirms whether window-slide or real decline.

---

## Sources
- [GSC Performance (7-day, queries)](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F&breakdown=query&num_of_days=7)
- [GSC Performance (7-day, pages)](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F&breakdown=page&num_of_days=7)
- [GSC Page Indexing](https://search.google.com/search-console/index?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F)
- Morning audit: [gsc-audit-2026-05-16.md](./gsc-audit-2026-05-16.md)
- Previous follow-up precedent: [gsc-audit-followup-2026-05-15.md](./gsc-audit-followup-2026-05-15.md)
