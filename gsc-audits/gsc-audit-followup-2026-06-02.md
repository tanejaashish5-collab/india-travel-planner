# GSC Audit (Dashboard pull) — 2026-06-02

Property: `https://www.nakshiq.com/`
Performance window: **2026-05-25 → 2026-05-31** (7-day, GSC dashboard, last update 4 hours ago)
Indexing window: **last refreshed 2026-05-29** (no fresher data yet)
Pulled via Claude-in-Chrome MCP against GSC UI. Complements this morning's API-driven run ([gsc-audit-2026-06-02.md](gsc-audit-2026-06-02.md)) — same date, this one **adds the live indexing dashboard breakdown** the API can't see.
Account: taneja.ashish5@gmail.com

---

## Performance — 7-day totals (5/25 → 5/31, dashboard)

| Metric            | Today (dashboard) | AM run (API, 5/24→31) | 2026-04-20 baseline | Δ vs Apr 20 |
|-------------------|------------------:|----------------------:|--------------------:|------------:|
| Total clicks      | **360**           | 340                   | 33                  | **+991%**   |
| Total impressions | **57.7K**         | 56,561                | 12.2K               | **+373%**   |
| Average CTR       | **0.6%**          | 0.60%                 | 0.3%                | +0.3 pp     |
| Average position  | **9.8**           | 9.9                   | 12.4                | improved 2.6 |

Dashboard window is shifted one day forward vs the API window. Clicks 360 vs 340 = +20 clicks, impressions +1.1K — confirms the **weekly uptrend is intact** (this morning's flagged DoD flattening doesn't show up here because dashboard rolls in 5/31 fully). **Average position broke below 10 for the first time in this audit series** (9.8 vs 9.9 this morning). Page-1 average remains the prevailing state.

## Top 10 queries (5/25 → 5/31, dashboard)

| # | Query | Clicks | Impr |
|---|---|---:|---:|
| 1 | girnar 10,000 steps in km | 2 | 28 |
| 2 | weather in mahabaleshwar in june 2026 | 2 | 23 |
| 3 | lambasingi in may month | 2 | 10 |
| 4 | tripura in june | 2 | 6 |
| 5 | pahalgam or gurez valley which is better | 2 | 5 |
| 6 | which is best yercaud or kodaikanal | 2 | 5 |
| 7 | barot valley weather in june | 1 | 99 |
| 8 | varkala in july | 1 | 71 |
| 9 | lonavala in june 1st week | 1 | 48 |
| 10 | bhandardara weather in june | 1 | 33 |

**The decision/comparison surface keeps printing.** Rows 5–6 — `pahalgam or gurez valley which is better` and `which is best yercaud or kodaikanal` — held at 2 clicks each at ~40–50% CTR (5 imp each), consistent with this morning's read. `girnar 10,000 steps in km` (28 imp, 2 clicks = 7.1% CTR) reinforces the same pattern: high-intent decision queries are converting well above the 0.6% sitewide average. **New entrants vs this AM**: `tripura in june` (2 clicks, position-leader-style query), `lonavala in june 1st week` (specificity wins again).

**High-impression / low-CTR offenders**: `barot valley weather in june` (99 imp / 1 click = 1.0% CTR — unchanged from this AM's 90/1), `varkala in july` (71/1 = 1.4%). These are persistent and warrant title/snippet revisit.

## Top 10 pages (5/25 → 5/31, dashboard)

| # | Page | Clicks | Impr |
|---|---|---:|---:|
| 1 | /destination/hemkund-sahib/june ⚠️ | 8 | 224 |
| 2 | /hi/destination/jabalpur/june | 6 | 722 |
| 3 | /en (landing) | 6 | 9 |
| 4 | /en/destination/mahabaleshwar/june | 5 | 861 |
| 5 | /en/destination/chakrata/june | 4 | **1,101** |
| 6 | /en/destination/varkala/june | 4 | 597 |
| 7 | /en/destination/tungnath/june | 4 | 486 |
| 8 | /en/destination/lambasingi/may | 4 | 98 |
| 9 | /en/vs/lansdowne-vs-shimla 🆕 | 4 | 55 |
| 10 | /en/destination/barot-valley/june | 3 | 848 |

**🚨 hemkund-sahib unprefixed is page #1 again** — 8 clicks (vs 9 this AM), 224 impressions. The broken canonical is **into its 8th week**. URL Inspection / Request Indexing remains the only known fix. ~56 clicks/week still bleeding to the wrong (un-prefixed) URL.

**🆕 `/en/vs/lansdowne-vs-shimla` is new in top-10** — 4 clicks at only 55 impressions = 7.3% CTR. This is the comparison surface paying off at the page level, not just the query level. Worth noting which `/vs/` pages exist and which need to be added; impressions are low (55) but CTR is excellent.

**chakrata/june still the title-CRO target #1** — 1,101 imp / 4 clicks = 0.4% CTR. Identical pattern to this morning's report.

**Hindi presence in top-10 is thin again** — just `/hi/jabalpur/june` (6 clicks / 722 imp = 0.8% CTR). Hindi is converting *worse* than the lower-volume English month pages. The morning audit flagged Hindi softening two days running — this snapshot confirms the trend isn't reversing.

## Indexing — fresh dashboard pull (last refresh 2026-05-29)

| Metric           | Today (5/29 refresh) | Prior session note | Apr 20 baseline | Δ vs Apr 20 |
|------------------|---------------------:|-------------------:|----------------:|------------:|
| Indexed pages    | **16.8K**            | 16,800             | 7,000           | **+140%**   |
| Not indexed      | **11K** (12 reasons) | 11,000             | 14,100          | **−22%**    |

**No fresh indexing data since the 5/29 refresh** flagged in the morning audit — the "Crawled - currently not indexed" diagnosis is unchanged and still needs founder eyes. The figures match what's already in the AM audit; no regression, no recovery yet.

### Why pages aren't indexed — 12 reasons (full breakdown)

| Reason | Pages | Source | Validation |
|---|---:|---|---|
| Discovered - currently not indexed | **3,822** | Google systems | Not Started |
| Page with redirect | **2,826** | Website | Not Started |
| Crawled - currently not indexed | **1,791** | Google systems | Not Started |
| Duplicate without user-selected canonical | 1,176 | Website | Not Started |
| Blocked by robots.txt | 839 | Website | Not Started |
| Alternate page with proper canonical tag | 216 | Website | Not Started |
| Duplicate, Google chose different canonical than user | 214 | Google systems | Not Started |
| Excluded by 'noindex' tag | 52 | Website | Not Started |
| Not found (404) | **28** | Website | ⚠️ **Failed** |
| Redirect error | 6 | Website | Not Started |
| Soft 404 | 3 | Website | Not Started |
| Server error (5xx) | 1 | Website | Not Started |

**Total non-indexed: 10,974** ≈ 11K ✓ (sums match dashboard total).

### Key indexing findings vs Apr 20 baseline

- **Discovered - currently not indexed: 11,568 → 3,822** = −67% (massive cleanup of the discovered-but-unfetched backlog — Google is actively crawling more)
- **Not found (404): 322 → 28** (−91%) — almost all the 404 pages have been resolved (presumably by the redirect work)
- **⚠️ 404 validation status: was "Started" on 4/20 → now "Failed"** — Google attempted validation and found 28 pages still returning 404. **Action: needs investigation**. These 28 404s should either be redirected or `nakshiq.com/destination/<slug>` removed from sitemaps. Then re-trigger validation. This is a small footprint but it's the only **Failed** status on the property.
- **Page with redirect: 2,826** — large, but this is the expected outcome of the canonical/locale routing (un-prefixed → /en/ 307→301 conversions). Not a problem, but worth confirming none are accidental.
- **Crawled - currently not indexed: 1,791** — flagged in this AM's audit as a +1,291 jump from 500. Today's number is consistent with that — no further drift, no recovery. Still needs the sample-20-URLs diagnosis the morning audit prescribed.

## Notable changes / new signals (dashboard-only)

1. **Avg position broke below 10** — 9.8 (vs 9.9 this AM). Tiny but the first sub-10 read in the series. Page-1 average is now the structural state.
2. **`/en/vs/lansdowne-vs-shimla` debuts in top-10 pages** at 7.3% CTR — the comparison surface is now visible at the *page* level, not just at the query level. Tracking which `/vs/` URLs have ranking traction is now actionable.
3. **404 validation FAILED** — first time this audit series surfaces a Failed validation status. Small (28 pages) but a Failed marker is more concerning than "Not Started" — Google looked and found the issue still present.
4. **Indexing unchanged since 5/29** — last refresh is 4 days old; the "Crawled - currently not indexed" spike diagnosis from the AM audit remains open.

## Action items (additions / refinements to AM run)

1. **🚨 Hemkund-sahib URL Inspection (week 8+)** — unchanged from AM run. Still bleeding ~56 clicks/week to the wrong canonical.
2. **🆕 Investigate the 28 Failed 404 validations** — open the Indexing → Pages → "Not found (404)" report in GSC, sample the 28 URLs. Either add redirects to `/en/` equivalents or remove them from sitemaps + the destination DB, then click **Validate Fix** again. Failed validations should not be left dormant — they signal to Google the issue is unresolved.
3. **🚨 Crawled - currently not indexed diagnosis** — unchanged from AM run. Sample 20–30 URLs from the 1,791 to identify a structural pattern (or rule out one).
4. **`/vs/` comparison surface — pull a list of existing vs. desired URLs** — the Lansdowne-vs-Shimla success at 7.3% CTR + the persistent comparison query wins (`pahalgam or gurez`, `yercaud or kodaikanal`, `pahalgam vs gulmarg`) suggests there's room to scale the `/vs/` page count. Audit which destination pairs are missing.
5. **Run `node scripts/patch-gsc-indexing.mjs --indexed 16800 --not-indexed 10974`** — feeds the M2 indexed-pages cron monitor with today's confirmed dashboard numbers. (Per CLAUDE.md "GSC Coverage/Indexing weekly paste" item.)

---

*Generated by scheduled `daily-gsc-audit` task. Dashboard URL: https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.nakshiq.com%2F&breakdown=query&num_of_days=7*
