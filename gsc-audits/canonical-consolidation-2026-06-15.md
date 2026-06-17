# GSC canonical consolidation + Apr 27 snippet-rewrite CTR check — 2026-06-15

**Scheduled task:** `gsc-canonical-consolidation`
**Property:** `sc-domain:nakshiq.com`
**Run via:** `scripts/gsc-inspect-sweep.mjs --url …` (URL Inspection API) and ad-hoc Search Analytics API queries — no dashboard required.

---

## Part 1 — Canonical consolidation status for the 5 non-prefixed URLs

| Non-prefixed URL | Verdict | coverageState | googleCanonical | Status |
|---|---|---|---|---|
| `/destination/kumbhalgarh/may` | NEUTRAL | Page with redirect | `/en/destination/kumbhalgarh/may` | ✅ Consolidated |
| `/destination/vrindavan/may` | NEUTRAL | Page with redirect | `/en/destination/vrindavan/may` | ✅ Consolidated |
| `/destination/yercaud/may` | NEUTRAL | Page with redirect | `/en/destination/yercaud/may` | ✅ Consolidated |
| `/destination/chakrata/may` | NEUTRAL | Page with redirect | `/en/destination/chakrata/may` | ✅ Consolidated |
| `/destination/pondicherry/may` | NEUTRAL | Page with redirect | `/en/destination/pondicherry/may` | ✅ Consolidated |

**Verdict: all 5 already consolidated.** This is the same "Page with redirect → googleCanonical points to /en/" pattern that resolved hemkund-sahib on 2026-06-10. Google recognizes the 301 redirect and has folded each non-prefixed URL into the /en/ canonical.

All 5 `/en/` counterparts inspected and confirmed **"Submitted and indexed"**, present in `https://www.nakshiq.com/sitemap/1.xml`. Last crawl times range from 2026-04-20 (pondicherry) to 2026-06-09 (chakrata).

### "Request Indexing" — not needed and not actioned

The scheduled task asked to click "REQUEST INDEXING" in the GSC dashboard. Two reasons it wasn't actioned:

1. **The objective is already met.** Each URL's googleCanonical is the /en/ version. Re-crawl wouldn't change anything — Google already crawled, saw the 301 + canonical tag, and selected the /en/ version.
2. **Note in the task file (`taneja.ashish5@gmail.com` lacks property access) is also stale.** The URL Inspection API (run with the founder's OAuth refresh token) returns the same data the dashboard does, so no Chrome session was required.

Per the CLAUDE.md "Pending user-action items" list, this category of canonical-consolidation check is now handled by `scripts/gsc-inspect-sweep.mjs --url <url>`. Nothing on the user's plate.

---

## Part 2 — Apr 27 snippet rewrite — did CTR move?

Reading conditions are imperfect: the "in may" queries are decaying seasonally now that May is over, so the cleanest comparison is **PRE (Mar 30 – Apr 26)** vs **EARLY (Apr 28 – May 17, the first 3 weeks of post-deploy still inside high-season)**. The RECENT (May 18 – Jun 14) window is included for context but is mostly noise for May queries.

### Page-level signal (impressions + clicks aggregated across non-prefixed + /en/)

| Page | PRE clicks/impr (CTR, pos) | EARLY clicks/impr (CTR, pos) | RECENT clicks/impr (CTR, pos) | Read |
|---|---|---|---|---|
| `vrindavan/may` | 1/919 (0.11%, 8.8) | 3/783 (**0.38%**, 10.8) | 1/103 (0.97%, 9.5) | +3.5x EARLY CTR; small absolute numbers |
| `yercaud/may` | 1/731 (0.14%, 10.7) | 4/1123 (**0.36%**, 8.3) | 1/451 (0.22%, 9.0) | +2.6x EARLY CTR + position improved 10.7 → 8.3 |
| `chakrata/may` | 0/668 (0.00%, 6.8) | 3/484 (**0.62%**, 5.8) | 0/35 (0.00%, 9.2) | First clicks ever, EARLY only |
| `kumbhalgarh/may` | 2/338 (0.59%, —) | 0/32 (0.00%, 9.0) | 0/10 (0.00%, 9.6) | Too sparse to read |
| `pondicherry/may` | 1/83 (1.20%, 10.6) | 0/79 (0.00%, 11.9) | 0/9 (0.00%, 13.0) | Volume too low; position weak |

### Query-level signal (top 6 cited in the task)

| Query | PRE (Mar 30 – Apr 26) | POST (May 18 – Jun 14) | Read |
|---|---|---|---|
| `vrindavan temperature in may` | 0/222, pos 9.5 | 0/1, pos 29 | Seasonal decay — nothing to read |
| `yercaud weather in may` | 0/278, pos 11.8 | 0/87, pos 9.8 | Position +2.0; CTR still 0% on 87 impr |
| `chakrata temperature in may` | 0/116, pos 7.1 | 0/1, pos 12 | Decayed; pre had no clicks either |
| **`kanatal in may`** | 0/65, pos 6.0 | **1/19 (5.26%)**, pos 3.3 | **Position 6 → 3.3 + first click — clearest positive signal** |
| `pondicherry weather in may` | 0/315, pos 11.7 | 0/0, — | Fully decayed |
| `darjeeling june weather` | 0/85, pos 12.5 | 0/0, — | Surprising — would expect higher June volume |

### Bottom line on CTR

Directionally positive: every page with enough EARLY-window impressions to measure showed CTR doubling or better, plus modest position improvements on yercaud and kanatal. But the absolute click counts (1–4 per page) are too small for statistical confidence, and May-month queries decayed before a full clean post-window could accumulate.

The `darjeeling june weather` zero in the POST window is the one anomaly worth flagging — June IS now, so I'd expect impressions. Possible causes: query phrasing has shifted, or the page is no longer surfacing for that exact query string. Not in scope to fix today; flagging for the next regular GSC audit.

---

## Files written / artifacts

- `scripts/_gsc-ctr-apr27-rewrite-check.mjs` — query-level PRE vs POST comparison for the 6 target queries (one-off, follows the `_gsc-summary-*` convention in `scripts/`)
- `scripts/_gsc-ctr-recent14d.mjs` — page-level 3-window comparison (PRE / EARLY / RECENT)
- `gsc-audits/canonical-consolidation-2026-06-15.md` — this report

## Recommendations

1. Mark "GSC URL Inspection for top 5 non-prefixed URLs" as **resolved** in the CLAUDE.md "Pending user-action items" list — same pattern as the hemkund-sahib 2026-06-10 resolution.
2. The Apr 27 snippet-rewrite signal is positive-but-thin. Suggest letting June and July roll in before any next rewrite tranche — these pages now have new high-season impressions accumulating in real time.
3. Investigate `darjeeling june weather` zero-impression anomaly in the next weekly GSC audit (`gsc-audits/gsc-audit-2026-06-15.md` or whichever Monday is next).
