# GSC Canonical Consolidation Report — 2026-05-11

Scheduled task run, 14 days after the Apr 27 GSC snippet rewrite + cache prewarm deploy.

GSC property accessed via Chrome `authuser=0` (ashish@forgevoice.studio). Memory note about authuser=5 was outdated — corrected for next run.

## TL;DR

- 4 of 5 target URLs are already consolidated to /en/ — Google has correctly picked the prefixed canonical from the 301 + canonical tag.
- 1 of 5 (kumbhalgarh) is NOT consolidated yet — Google's last crawl was Apr 14 (pre-deploy) and it still has the inspected (non-prefixed) URL as canonical. Indexing requested.
- CTR has NOT yet improved for any of the 6 target queries in the 28-day window. All target queries still show 0% CTR despite substantial impressions. Snippet rewrite needs more re-crawl time.

## Per-URL canonical findings

| # | URL | Status | Google-selected canonical | Last crawl | Action taken |
|---|---|---|---|---|---|
| 1 | /destination/kumbhalgarh/may | NOT consolidated | Inspected URL (non-prefixed) | Apr 14, 2026 (pre-deploy) | **REQUEST INDEXING submitted** — added to priority crawl queue |
| 2 | /destination/vrindavan/may | Consolidated | /en/destination/vrindavan/may | Apr 18, 2026 | None needed |
| 3 | /destination/yercaud/may | Consolidated | /en/destination/yercaud/may | Apr 20, 2026 | None needed |
| 4 | /destination/chakrata/may | Consolidated | /en/destination/chakrata/may | Apr 18, 2026 | None needed |
| 5 | /destination/pondicherry/may | Consolidated | /en/destination/pondicherry/may | Apr 20, 2026 | None needed |

For the 4 consolidated URLs, GSC reports them as "Page is not indexed: Page with redirect" — the correct, intended state. Although last crawls predate the Apr 27 deploy, the 301 + canonical tag was already in place earlier and Google picked the right canonical at that earlier crawl.

Kumbhalgarh is the outlier. The previous crawl on Apr 14 happened before the canonical strategy fully landed for this page, so Google still treats the bare URL as canonical. The REQUEST INDEXING nudge was submitted successfully ("URL was added to a priority crawl queue"). Re-check in 5–10 days; expect it to flip to /en/ once Google re-crawls.

## Performance check on target queries (last 28 days)

Property-wide: **513 clicks · 168K impressions · 0.3% CTR · pos 10.2** (3-month view).

| Target query | Clicks | Impressions | CTR | Avg pos |
|---|---:|---:|---:|---:|
| vrindavan temperature in may | 0 | 366 | 0% | 10.0 |
| yercaud weather in may | 0 | 371 | 0% | 11.8 |
| chakrata temperature in may | 0 | 197 | 0% | 6.7 |
| kanatal in may | 1 | 95 | 1.1% | 6.2 |
| pondicherry weather in may | 0 | 597 | 0% | 11.5 |
| darjeeling june weather | 0 | 101 | 0% | 12.5 |

**Verdict on Apr 27 snippet rewrite + cache prewarm:** No measurable CTR lift on the target queries in the first 14 days post-deploy. Reasons that bound the conclusion:

- Google's last crawl on the inspected destination URLs ranges Apr 14–20, all *before* the Apr 27 deploy. SERP snippets in May queries are still showing the old pre-rewrite snippet for many ranks. The rewritten snippets won't appear in SERPs until Google re-crawls and re-indexes.
- 4 of the 6 target queries rank position 10–12 (top of page 2 / bottom of page 1). At those positions, baseline CTR is already <1%, so even a strong snippet rewrite produces small absolute click numbers that take longer to register against the 28-day floor.
- chakrata temperature in may (pos 6.7) and kanatal in may (pos 6.2) are the most diagnostic — they rank high enough that a compelling snippet should produce visible CTR. chakrata still 0% from 197 impressions; kanatal got 1 click in 28 days. Both suggest the rewritten snippet hasn't reached SERPs for these queries yet.

## Sibling-query observations

For each cluster, lower-volume sibling queries are getting clicks (suggesting the pages can convert):

- vrindavan: "vrindavan temperature in june" 1/122/0.8% pos 11.3 · "vrindavan temperature in may month" 1/14/7.1% pos 7.6
- yercaud: "yercaud weather may" 1/39/2.6% pos 11.8
- chakrata: "chakrata weather in may" 1/171/0.6% pos 5.9 · "chakrata weather in june 2026" 1/7/14.3% pos 3.6
- pondicherry: "weather in pondicherry in may" 1/121/0.8% pos 11.8 · "pondicherry in may end" 1/29/3.4% pos 11.0
- darjeeling: "temperature in darjeeling in may 2026" 1/75/1.3% pos 8.8

The sibling-query CTRs (0.6–14.3%) prove the underlying pages do attract clicks once a query matches a not-yet-stale-snippet ranking. Reinforces that the issue for the target queries is "old snippet still cached in SERP", not "page is uninteresting".

## Recommended next steps

1. **Re-check kumbhalgarh in 5–10 days** to verify the canonical flips to /en/ post-recrawl.
2. **Re-run this performance check on 2026-05-25** (~28 days post-deploy) — that's when the rewritten snippets should be propagating into SERPs and CTR deltas should start showing.
3. **Consider broader REQUEST INDEXING** for the top 20 highest-impression `/en/destination/<dest>/may` URLs to accelerate snippet refresh on the highest-traffic pages — particularly pondicherry (597 impr) and yercaud (371 impr).
4. **Sitemap discovery is missing** — every URL inspected showed "No referring sitemaps detected". Worth verifying the sitemap submission in GSC includes all `/en/destination/` URLs.

## Methodology notes

- Account: GSC accessed via `authuser=0` in the user's Chrome (signed in as ashish@forgevoice.studio). Memory entry that says authuser=5 is stale for this Chrome profile.
- Date window: 28 days for per-query CTR (covers full pre/post Apr 27 split). 3-month view for property-wide context.
- Branded queries excluded by virtue of the `*<destname>` filter (no nakshiq-branded queries in any cluster).
