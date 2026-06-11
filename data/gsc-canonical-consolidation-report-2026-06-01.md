# GSC Canonical Consolidation + CTR Report — 2026-06-01

Scheduled task: `gsc-canonical-consolidation` (48-hour post-deploy check after 2026-04-27 GSC snippet rewrite + cache prewarm).

## TL;DR

- **Canonical consolidation: COMPLETE.** All 5 non-prefixed URLs have Google-selected canonical = `/en/` variant. No `REQUEST INDEXING` clicks needed — the 301 + canonical tag have been honored.
- **CTR on rewritten snippets: zero gain on the two flagship queries.** `yercaud weather in may` and `pondicherry weather in may` together hold ~1,089 impressions over 90 days with **0 clicks**. The snippet rewrite has not moved the needle on these queries.
- **Overall trend is positive but driven by other pages.** Site-wide GSC went from ~20 clicks/day (mid-May trough) to 50–60 clicks/day post-2026-05-20. The recovery did not come from the rewritten /may URLs.

## Part 1 — URL Inspection on 5 non-prefixed URLs

GSC URL Inspection executed for each. All five report `Page is not indexed: Page with redirect` (expected — the non-prefixed URL 301s to `/en/`), and Google has correctly selected the `/en/` variant as canonical.

| URL                                                        | Page status                    | Google-selected canonical                                  | Last crawl       | Action taken         |
| ---------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------- | ---------------- | -------------------- |
| `nakshiq.com/destination/kumbhalgarh/may`                  | Page with redirect (not indexed) | `https://www.nakshiq.com/en/destination/kumbhalgarh/may`   | 2026-05-12       | None — consolidated  |
| `nakshiq.com/destination/vrindavan/may`                    | Page with redirect (not indexed) | `https://www.nakshiq.com/en/destination/vrindavan/may`     | 2026-04-18       | None — consolidated (indexing already requested previously per "Request again" state) |
| `nakshiq.com/destination/yercaud/may`                      | Page with redirect (not indexed) | `https://www.nakshiq.com/en/destination/yercaud/may`       | 2026-04-20       | None — consolidated  |
| `nakshiq.com/destination/chakrata/may`                     | Page with redirect (not indexed) | `https://www.nakshiq.com/en/destination/chakrata/may`      | 2026-04-18       | None — consolidated  |
| `nakshiq.com/destination/pondicherry/may`                  | Page with redirect (not indexed) | `https://www.nakshiq.com/en/destination/pondicherry/may`   | 2026-04-20       | None — consolidated  |

Per the task playbook (`if not yet consolidated, click REQUEST INDEXING`), no indexing requests were submitted — all 5 are already consolidated to the `/en/` canonical. Vrindavan's chip showed `Indexing requested` + `Request again` from a prior session, confirming earlier nudges have been registered.

**Contrast with the still-stuck Hemkund case** in CLAUDE.md: those 5 URLs consolidated within ~6 weeks of the 301 + canonical going live. Hemkund-sahib/june has the same setup but remains unconsolidated for 6+ weeks. Hemkund is the outlier — the playbook works on everything else.

## Part 2 — Performance check on rewritten snippets

Window: 2026-04-09 → 2026-05-30 (last 90 days, GSC Web search, all countries/devices).

### Site-wide

| Metric             | Value   |
| ------------------ | ------- |
| Total clicks       | 1,154   |
| Total impressions  | 297,000 |
| Avg CTR            | 0.4%    |
| Avg position       | 10.1    |

Chart shape: peak at ~50 clicks/day around 2026-04-27 → trough ~10–20/day around 2026-05-09 to 2026-05-20 (Supabase egress freeze + ISR cache poisoning fits in this window) → strong recovery to 50–60+ clicks/day post-2026-05-20. **The April-27 deploy did NOT inflect the curve on its own** — the recovery looks driven by the post-2026-05-23 force-rebuild + general indexing growth, not specifically by the snippet rewrites.

### Target queries (the 6 named in CLAUDE.md "Pending user-action items")

| Query                                | Clicks (90d) | Impressions (90d) | CTR    | Notes                              |
| ------------------------------------ | -----------: | ----------------: | -----: | ---------------------------------- |
| `yercaud weather in may`             | **0**        | **492**           | 0.00%  | High-impression flagship, zero CTR |
| `pondicherry weather in may`         | **0**        | **597**           | 0.00%  | Highest-impression flagship, zero CTR |
| `vrindavan temperature in may`       | 0            | 0                 | —      | No impressions for ANY vrindavan query in 90 days (0/0 across full vrindavan family) |
| `chakrata temperature in may`        | not measured | not measured      | —      | Not in top 10 of 1,000 queries — low traffic |
| `kanatal in may`                     | 3            | 135               | 2.22%  | Only target query with non-zero CTR; visible in site-wide top 10 |
| `darjeeling june weather`            | not measured | not measured      | —      | Not in top 10 of 1,000 queries — low traffic |

Adjacent yercaud queries (long tail) that DID click:
- `which is best yercaud or kodaikanal`: 2 / 5 (40% CTR)
- `yercaud weather in june`: 1 / 416 (0.24%)
- `yercaud weather may` (no "in"): 1 / 41 (2.44%)
- `yercaud in may`: 1 / 38 (2.63%)

Adjacent pondicherry queries that DID click:
- `weather in pondicherry in may`: 1 / 121 (0.83%)
- `pondicherry in may end`: 1 / 29 (3.45%)

### Interpretation

1. **The snippet rewrites have not moved CTR on the exact target queries.** ~1,089 impressions across the two flagship queries (`yercaud weather in may` + `pondicherry weather in may`) have produced zero clicks in 90 days.
2. **Long-tail variants of the same destination ARE clicking.** Same destination, slightly different phrasing — small clicks present. This rules out "the page is broken / shows wrong content"; it points to either (a) position too low for the high-volume head queries (likely page 2–3 given Avg position 10.1) so even a good snippet doesn't trigger clicks, or (b) the rewritten title/meta hasn't shown up yet in SERPs for these queries.
3. **Vrindavan is invisible.** Zero impressions on the entire vrindavan-query family in 90 days. The page is canonicalized but isn't ranking for anything.

## Recommendations

1. **Use URL Inspection's "View crawled page" to confirm the rewritten snippet is actually live on Google's side** for `yercaud weather in may` and `pondicherry weather in may`. If the rendered HTML Google has still shows the old title/meta, the cache prewarm didn't reach those URLs.
2. **Don't request indexing on the 5 inspected URLs** — they're consolidated. Requesting again wastes the 14/day quota.
3. **Vrindavan needs a separate investigation.** 0/0 over 90 days while the URL is canonicalized and last-crawled is anomalous. Check whether the page has `noindex`, whether internal links are reaching it, and whether it's in the sitemap.
4. **Look at the post-2026-05-20 recovery in Performance > Pages.** That tells us which pages are actually driving the recovery — likely not the rewritten `/may` URLs.

## Sources

- [GSC URL Inspection — kumbhalgarh/may](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fkumbhalgarh%2Fmay)
- [GSC URL Inspection — vrindavan/may](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fvrindavan%2Fmay)
- [GSC URL Inspection — yercaud/may](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fyercaud%2Fmay)
- [GSC URL Inspection — chakrata/may](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fchakrata%2Fmay)
- [GSC URL Inspection — pondicherry/may](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Anakshiq.com&id=https%3A%2F%2Fwww.nakshiq.com%2Fdestination%2Fpondicherry%2Fmay)
- [GSC Performance — last 90 days](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anakshiq.com&num_of_days=90)
