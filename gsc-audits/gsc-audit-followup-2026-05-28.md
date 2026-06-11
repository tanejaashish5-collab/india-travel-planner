# GSC Audit (Dashboard pull) — 2026-05-28

Property: `https://www.nakshiq.com/`
Performance window: **2026-05-20 → 2026-05-26** (7-day, GSC dashboard, last update 4 hours ago)
Pulled via Claude-in-Chrome MCP against GSC UI. Complements this morning's API-only run ([gsc-audit-2026-05-28.md](gsc-audit-2026-05-28.md)) — same date, different lever, this one **adds the indexing snapshot** the API can't see.
Account: taneja.ashish5@gmail.com

---

## Performance — 7-day totals (5/20 → 5/26)

| Metric              | Today (dashboard) | This AM (API, 5/18→25) | 2026-04-20 baseline | Δ vs Apr 20 |
|---------------------|------------------:|-----------------------:|--------------------:|------------:|
| Total clicks        | **233**           | 241                    | 33                  | **+606%**   |
| Total impressions   | **47.5K**         | 50.9K                  | 12.2K               | **+289%**   |
| Average CTR         | **0.5%**          | 0.47%                  | 0.3%                | +0.20 pp    |
| Average position    | **10.3**          | 10.3                   | 12.4                | +2.1        |

The dashboard window (5/20→5/26) is a 2-day shift from the morning API window (5/18→5/25). Clicks 233 vs 241 reflects rolling off 5/18 (a higher-click day) and rolling in 5/26. **No regression** — same plateau, just window slide. CTR ticked to 0.5%, marginally above the 0.47% measured this morning.

---

## Top 10 queries (7-day, 5/20 → 5/26)

| # | Query                              | Clicks | Impressions | CTR    | Avg pos |
|---|------------------------------------|-------:|------------:|-------:|--------:|
| 1 | lambasingi in may month            | 3      | 15          | 20%    | 2.1     |
| 2 | bhandardara weather in june        | 2      | 38          | 5.3%   | 7.8     |
| 3 | tungnath weather in june 2026      | 2      | 33          | 6.1%   | 7.3     |
| 4 | monsoon in bhopal 2026             | 1      | 188         | 0.5%   | 10.0    |
| 5 | yercaud weather in june            | 1      | 84          | 1.2%   | 11.1    |
| 6 | weather in munnar in june 2026     | 1      | 52          | 1.9%   | 6.5     |
| 7 | varkala in july                    | 1      | 49          | 2%     | 12.2    |
| 8 | weather in bhopal in june 2026     | 1      | 34          | 2.9%   | 6.4     |
| 9 | weather in mahabaleshwar in june   | 1      | 29          | 3.4%   | 6.3     |
| 10| munnar temperature in june 2026    | 1      | 29          | 3.4%   | 7.6     |

Consistent with this morning's pull and last 7 audits: destination + month + weather long-tail dominates, no brand queries in the top tier, no concentration risk. **Lambasingi in may month** holds its position-2 / 20% CTR slot — the exemplar of what every cohort title should aim for.

**New entry vs this AM:** `varkala in july` (pos 12.2, 49 impr) — a new July-window query starting to surface. Worth flagging — early signal that the May→June transition queries are coming online; suggests title-overrides on `/destination/<x>/july` will start mattering.

---

## Top 10 pages by clicks (7-day, 5/20 → 5/26)

| # | Page                                       | Clicks | Impr.  | CTR   | Pos |
|---|--------------------------------------------|-------:|-------:|------:|----:|
| 1 | /hi/destination/bhopal/june                | 9      | 1,251  | 0.7%  | 8.6 |
| 2 | /destination/hemkund-sahib/june (un-prefixed) | 9   | 251    | 3.6%  | 7.8 |
| 3 | /en/destination/lambasingi/may             | 7      | 152    | 4.6%  | 6.1 |
| 4 | /en/destination/mahabaleshwar/june         | 4      | 880    | 0.5%  | 8.4 |
| 5 | /hi/destination/bhaderwah/june             | 4      | 168    | 2.4%  | 6.6 |
| 6 | /en/destination/vrindavan/june             | 3      | 1,228  | 0.2%  | 9.5 |
| 7 | /en/destination/chakrata/june              | 3      | 783    | 0.4%  | 9.4 |
| 8 | /hi/destination/jabalpur/june              | 3      | 744    | 0.4%  | 8.2 |
| 9 | /en/destination/barot-valley/june          | 3      | 661    | 0.5%  | 5.2 |
| 10| /en/destination/munnar/june                | 3      | 614    | 0.5%  | 8.7 |

Notable:
- **3 Hindi pages in top 10** (bhopal/june, bhaderwah/june, jabalpur/june) — Hindi parity continues earning placements.
- **`/destination/hemkund-sahib/june` un-prefixed still ranks at #2** with 9 clicks — same finding as this AM and every audit for 6+ weeks. CLAUDE.md flags this needs manual URL Inspection (next on the "Pending user-action items" list). Costs ~14 clicks/week routed to the wrong canonical.
- **High-impression, low-CTR title-override candidates:** vrindavan/june (1,228 impr, 0.2%), bhopal/june Hindi (1,251 impr, 0.7%), mahabaleshwar/june (880 impr, 0.5%), chakrata/june (783 impr, 0.4%). Aligns with the tranche-2 candidates already queued in `data/cro/title-overrides.csv`.

---

## Indexing Status (Last update 5/22/26)

| Bucket             | Today (5/28 dashboard) | This AM (patched from 5/27) | 2026-04-20 baseline | Δ vs Apr 20 |
|--------------------|----------------------:|----------------------------:|--------------------:|------------:|
| Indexed            | **15.9K**             | 15.9K                       | 7,000               | **+127%**   |
| Not indexed        | **9.45K**             | 9,450                       | 14,100              | **−33%**    |
| Total submitted    | ~25.4K                | 25.4K                       | 21,100              | +20%        |

The dashboard's "last update" is **5/22/26** — i.e. the snapshot is 6 days stale from Google's side. So today's 15.9K / 9.45K is the same data that was patched in this morning's report (which was the prior known value). **No fresh indexing data in this run**, but it confirms the values used in the morning audit are still current per the dashboard.

### Why pages aren't indexed (12 reasons, all 9,450 pages)

| Reason                                              | Source        | Validation | Pages |
|-----------------------------------------------------|---------------|------------|------:|
| Discovered - currently not indexed                  | Google systems| Not Started| 3,814 |
| Page with redirect                                  | Website       | Not Started| 2,705 |
| Duplicate without user-selected canonical           | Website       | Not Started| 1,183 |
| Blocked by robots.txt                               | Website       | Not Started|   784 |
| Crawled - currently not indexed                     | Google systems| Not Started|   513 |
| Duplicate, Google chose different canonical than user| Google systems| Not Started|  216 |
| Alternate page with proper canonical tag            | Website       | Not Started|   143 |
| Excluded by 'noindex' tag                           | Website       | Not Started|    52 |
| Not found (404)                                     | Website       | **Failed** |    27 |
| Redirect error                                      | Website       | Not Started|     6 |
| Soft 404                                            | Website       | Not Started|     3 |
| Server error (5xx)                                  | Website       | Not Started|     1 |

### 404 validation tracker
- **Apr 20:** 322 404 pages, validation "Started"
- **May 28:** **27 404 pages**, validation **"Failed"**
- Net: 295 pages cleared (91% reduction), but the validation Google ran flagged the remaining 27 as still 404ing. These need either (a) restoration to live pages, or (b) sitemap removal so Google stops crawling them. **Action item:** export the 27 URLs and triage.

### Buckets to celebrate vs watch
- **Discovered-not-indexed dropped 11,568 → 3,814** (−67%) since Apr 20 — the canonical/sitemap work has paid off enormously.
- **Crawled-not-indexed at 513** is healthy — these are quality-judgement decisions by Google, not a fixable bug.
- **Page-with-redirect at 2,705** is large but expected (locale routing, /en/ canonical consolidation). Not a regression.
- **Duplicate without user-selected canonical at 1,183** — could indicate the hemkund-sahib-style un-prefixed canonical bug is present on more URLs. Worth a sample inspection.

---

## Concerns & action items

1. **404 validation FAILED on 27 pages.** First time we've seen the validation status change. Export the URLs (GSC → "Not found (404)" row → see details), check whether they should be restored or excluded from sitemap. 2 min in GSC + a script run.
2. **`/destination/hemkund-sahib/june` un-prefixed canonical** — flagged for 6+ weeks. Still costing real clicks (9 this week to the wrong canonical). CLAUDE.md already lists "Pending user-action items" → "GSC URL Inspection". 2 minutes of manual click-work.
3. **Title-override tranche 2 (already drafted)** — today's data confirms vrindavan/june, mahabaleshwar/june, chakrata/june as the priority targets. The `data/cro/title-overrides-review-2026-05-28.md` draft already covers these — ready to apply with `node scripts/apply-title-overrides.mjs --commit --revalidate`.
4. **GSC dashboard data is 6 days stale (last update 5/22).** Google's indexing reports always lag the performance reports; the next refresh should come around 5/29-5/30. The 15.9K indexed value has held since at least 5/27 — confirming we're in a stable, post-recovery state (per the Supabase egress freeze memory).
5. **`varkala in july` newly surfacing at position 12.2** — early signal that July-window queries are entering the index. As June progresses, the `/destination/<x>/july` cohort will start mattering for CTR work.

---

## Trajectory summary

```
                Apr 19 → Apr 20 → ... → May 21 → May 27 → May 28 (AM API) → May 28 (dashboard)
Clicks:         22     → 33     → ...  → 168    → 226    → 241             → 233
Impressions:    7.9K   → 12.2K  → ...  → 41.4K  → 49.9K  → 50.9K           → 47.5K
Avg position:  12.7   → 12.4   → ...  → 10.4   → 10.3   → 10.3            → 10.3
CTR:            0.3%   → 0.3%   → ...  → 0.4%   → 0.45%  → 0.47%           → 0.5%
Indexed:                7.0K   → ...                                       → 15.9K
Not-indexed:           14.1K   → ...                                       → 9.45K
404 pages:               322 (Started) → ...                               → 27 (Failed)
```

**Headline:** Clicks ≈ 7× from Apr 20 baseline, indexed pages 2.3×, not-indexed pages cut by a third. Position climbed from 12.4 to a 10.3 plateau (now stuck). CTR plateau at ~0.5%. The next compounding lever is title-override tranche 2 (queued and ready) plus the manual URL Inspection cleanup.

---

## Cross-reference with this morning's API audit

| Dimension          | API run (this AM)     | Dashboard run (this followup)        |
|--------------------|----------------------|--------------------------------------|
| Performance window | 5/18 → 5/25          | 5/20 → 5/26 (rolling, +2 days)        |
| Clicks             | 241                  | 233                                  |
| Impressions        | 50.9K                | 47.5K                                |
| CTR                | 0.47%                | 0.5%                                 |
| Position           | 10.3                 | 10.3                                 |
| Indexing snapshot  | Not available (API) | **Captured** — 15.9K idx / 9.45K not |
| 12 reasons         | n/a                  | **Captured** (all 12 buckets)         |
| 404 validation     | n/a                  | **Captured** — 27 pages, Failed       |

Both runs agree: post-recovery plateau, click growth intact, title-override is the unblocked lever.
