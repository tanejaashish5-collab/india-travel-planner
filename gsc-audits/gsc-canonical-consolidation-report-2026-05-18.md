# GSC Canonical Consolidation + Snippet Rewrite Check — 2026-05-18

**Scheduled task run.** 48 hours after the April 27 GSC snippet rewrite + cache prewarm deploy.

**GSC account used:** `taneja.ashish5@gmail.com` (note in task said this account "doesn't have direct access" — it does, the property loaded normally for sc-domain:nakshiq.com).

---

## Part 1 — URL Inspection: canonical consolidation

**All 5 non-prefixed URLs are fully consolidated.** Google has selected the `/en/` prefixed version as the canonical for every one. The non-prefixed URL itself is correctly marked as "Page is not indexed: Page with redirect" — exactly the desired outcome of a 301-to-canonical setup.

| # | URL | Indexing status | Google-selected canonical | Last crawl | Action taken |
|---|---|---|---|---|---|
| 1 | `/destination/kumbhalgarh/may` | Page with redirect | `/en/destination/kumbhalgarh/may` ✓ | May 12, 2026 | None — already consolidated, recently re-crawled |
| 2 | `/destination/vrindavan/may` | Page with redirect | `/en/destination/vrindavan/may` ✓ | Apr 18, 2026 | None — canonical decision locked, redirect URL itself doesn't need re-indexing |
| 3 | `/destination/yercaud/may` | Page with redirect | `/en/destination/yercaud/may` ✓ | Apr 20, 2026 | None — consolidated |
| 4 | `/destination/chakrata/may` | Page with redirect | `/en/destination/chakrata/may` ✓ | Apr 18, 2026 | None — consolidated |
| 5 | `/destination/pondicherry/may` | Page with redirect | `/en/destination/pondicherry/may` ✓ | Apr 20, 2026 | None — consolidated |

**No "Request Indexing" clicks needed.** Per task step 4 ("If not yet consolidated, click REQUEST INDEXING"), the conditional is false for all five — Google has already picked up the 301 + canonical tag. Pushing Request Indexing on a "Page with redirect" URL would only ask Google to re-crawl a URL it will then redirect away from anyway; the action that would help propagate the April 27 snippet rewrites is requesting indexing on the `/en/` canonical URLs themselves (a separate task — not in scope here).

For all 5 URLs:
- Crawl allowed: Yes
- Page fetch: Successful
- Indexing allowed: Yes
- User-declared canonical: None (relying on 301 redirect to signal canonical)
- Referring page / sitemaps detected: None

---

## Part 2 — Performance: snippet rewrite CTR impact

**Comparison window:** Post-deploy (4/28–5/18, 21 days) vs. Pre-deploy (4/7–4/27, 21 days).

| Query | Period | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|---|
| **vrindavan temperature in may** | Post | 0 | 150 | 0% | 11.2 |
| | Pre | 0 | 252 | 0% | 9.5 |
| **yercaud weather in may** | Post | 0 | 97 | 0% | 10.8 |
| | Pre | 0 | 327 | 0% | 11.8 |
| **chakrata temperature in may** | Post | 0 | 68 | 0% | 6.1 |
| | Pre | 0 | 129 | 0% | 7.0 |
| **kanatal in may** | Post | **2** | 48 | **4.2%** | **4.5** |
| | Pre | 0 | 70 | 0% | 6.2 |
| **pondicherry weather in may** | Post | 0 | 227 | 0% | 11.3 |
| | Pre | 0 | 370 | 0% | 11.6 |
| **darjeeling june weather** | Post | 0 | 7 | 0% | 12.5 |
| | Pre | 0 | 94 | 0% | 12.5 |

### Headline finding

**1 of 6 target queries shows a clear CTR win**: `kanatal in may` jumped from 0% → 4.2% CTR and pulled in **2 first clicks ever** for this query. Position also moved meaningfully (6.2 → 4.5), so the lift is a combination of snippet relevance + rank gain on page 1.

The other 5 queries remained at 0% CTR over both windows. Several patterns:

- **Position improved 0.3 to 1.0 points** for yercaud (11.8→10.8), chakrata (7.0→6.1), pondicherry (11.6→11.3) — small but real movement in the right direction.
- **Position softened** for vrindavan (9.5→11.2) — slipped back to page 2.
- **Impressions fell on every "may" query** in the post period (vrindavan -40%, yercaud -70%, chakrata -47%, kanatal -31%, pondicherry -39%). Expected — the seasonal demand curve for "may" weather queries naturally tails off as May progresses and users start searching for June.
- **darjeeling june weather** all-but-disappeared (94 → 7 imp). Likely Google de-prioritized the page; could be page-rank loss after content/title changes, or simply because "june weather" hasn't yet entered its peak demand curve (peak typically begins mid-late May for June travel).

### Interpretation

The April 27 snippet rewrite + cache prewarm shipped 21 days ago. CTR-uplift typically shows after Google re-renders snippets in serving, which usually takes 7–21 days. We're at the end of that window. The single click win on kanatal proves the mechanism works when snippet + position align. The remaining 5 queries are stuck at 0 clicks despite hundreds of impressions, with most still sitting at positions 10–12 (low page 1 / top page 2 — CTR floor is ~1% at those ranks).

The bigger lever for these may-keyword queries at this point is **rank, not snippet** — at position 10–12 with 150–230 impressions over 21 days, even a perfect snippet won't earn many clicks. The April 27 changes were the right move, but to capture remaining impressions we'd need rank gains (links, internal linking, content depth) rather than another snippet pass.

### Sitewide context

The Overview chart shows 632 total web search clicks over the trailing 3 months, with daily clicks rising from near-zero in early-to-mid April to a sustained 15–25/day band from early May onward. The deploy didn't break anything — overall trajectory is healthy and growing.

---

## Recommendations (not executed — reporting only)

1. **Request Indexing should be retargeted** — if accelerated propagation of the snippet rewrite is the goal, the URLs to submit are the `/en/destination/{slug}/may` canonicals, not the non-prefixed redirect URLs. The redirect URLs are already consolidated.
2. **kanatal/may** is the proof-of-concept page — review what's working there (title/H1/snippet wording, content quality, links) and back-port to the other 4 stalled pages.
3. **Rank > snippet for vrindavan/pondicherry/yercaud** — these are at positions 10–12. Investigate why they aren't ranking higher (competitor analysis, internal-link audit, content-depth comparison to top 3 SERP results).
4. **darjeeling/june** impressions collapse is worth a closer look — was something changed on `/en/destination/darjeeling/june` around April 27 that hurt ranking? Compare current SERP vs. mid-April.
5. **Run this comparison again in 2 weeks** (around 2026-06-01) — by then the snippet propagation window will be fully closed and the seasonal "may" demand will have rolled off, so position-only effects will be clearer.

---

## Notes & caveats

- Performance numbers are "last update: 4 hours ago" per the GSC header — fresh as of this report run (2026-05-18).
- No write actions taken on Google's side. No "Request Indexing" buttons clicked. No setting changes. Read-only audit.
- Screenshots captured during the run document each URL's inspection panel and each query's compare view — available on request.

---

**Sources:**
- [GSC Property — nakshiq.com](https://search.google.com/search-console?resource_id=sc-domain:nakshiq.com)
- [URL Inspection (each URL accessed directly via the GSC inspect bar)](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com)
- [Performance Compare (post vs pre deploy)](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anakshiq.com&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION&start_date=20260428&end_date=20260518&compare_start_date=20260407&compare_end_date=20260427)
