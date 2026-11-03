# GSC Email Triage — 2026-11-03

Run date (morning): 2026-11-03 ~10:33 UTC
Prior triage: `gsc-email-triage-2026-11-02.md` (2026-11-02 morning, clean)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result**: "Your October Search performance for nakshiq.com" (received 2026-11-02 22:53 UTC)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **1 result**: "[NakshIQ ops] GSC alerts — 1 high-severity finding(s)" (received 2026-11-03 03:30 UTC)

---

## Classification

### Email 1 — October performance summary (sc-noreply@google.com)

**Class: EXPECTED CHURN / MILESTONE — no action, relay good news.**

Monthly performance digest, not a failure alert. Numbers:

| Metric | October 2026 |
|---|---|
| Clicks (web) | 2.44K |
| Impressions (web) | 383K |
| Pages with first impressions (est.) | 291 |

Top growing page: `/hi/cost/gandikota` +112 clicks. Top performing: `/hi/cost/gandikota` 136 clicks, `/hi/cost/jaisalmer` 53, `/en/treks/girnar-trek` 48. Hindi cost-page template is the growth engine.

---

### Email 2 — ops@nakshiq.com HIGH alert: indexed_pages_drop

**Class: REAL CANDIDATE — investigated, NOT fixable with safe code changes; no code change shipped.**

#### Alert detail
```
[HIGH] indexed_pages_drop
  Indexed pages dropped -12.5% — trailing 5-read average 16020 vs prior 5-read average 18300
  (sustained, not a single-sample dip). Same shape as the 2026-05-05 ISR regression.

[MEDIUM x4] cohort_clicks_drop
  destination/month: -85.3% top-10 share, vs/pair: -63.2%, treks: -53.0%, other: -70.2%
  (all marked "contextual only — seasonal rotation")
```

#### Investigation

**Indexed pages trend** (from GSC audit history):

| Date | Indexed | Δ |
|---|---|---|
| 2026-04-20 | 7,000 | — |
| 2026-07-05 | 23,700 | peak |
| 2026-10-14 | 17,200 | −6.5K from peak |
| 2026-10-19 | 16,200 | −1.0K |
| 2026-10-26 | 14,800 | −1.4K |
| 2026-11-02 | **14,700** | −0.1K (slide paused) |

The decline has been ongoing since late July. As of 11/02 it **stabilised** (only -0.1K WoW, after -2.4K the prior 12-day stretch). Current indexed pages: **14.7K**.

**Root cause — content quality, not a code regression:**

Dominant not-indexed bucket is "Crawled – currently not indexed: 14,125" (per 11-02 audit). This means Google can crawl and render the pages fine, but is choosing not to index them (programmatic thin-template quality filter). This is NOT the shape of an ISR regression (which would produce 5xx errors or empty pages). The ops alert's "same shape as 2026-05-05 ISR regression" is a false-positive similarity in the top-level number; the category breakdown is completely different.

**Code checks performed:**
- No middleware changes since 2026-10-01 (`git log --since=2026-10-01 -- apps/web/src/middleware.ts` → 0 commits)
- No next.config.ts changes in same period
- robots.txt unchanged since June 2026 fix (commit `39e06b18`) — correctly allows `/_next/static/`, blocks `/api/`, `/admin/`
- No 5xx spike: GSC "Server error (5xx)" is 1 page, status "Not Started" (not even being validated)
- No new 404 regression: "Not found (404)" at 291 and slowly declining (305→294→291)
- Redirect error: 2 pages only (fix shipped 2026-10-15, commit `6798280`)

**Live URL checks:** Attempted curl with Chrome desktop UA from cloud container; Vercel firewall 403'd all requests (IP-based block on cloud origin). Site confirmed healthy via October performance data (2.44K clicks, 383K impressions, no error pattern).

#### Verdict

This is a **content strategy problem**, not a code bug. Google is crawling NakshIQ's ~14K programmatic destination/month/cost pages but not indexing them. The fix requires a founder decision:
- Deepen the thin templates (add more substantive content per page), or
- Consolidate (merge thin pages), or
- Noindex + drop-from-sitemap the thinnest cohorts, accepting a smaller but cleaner footprint

**No safe-class code change (middleware/robots/headers/canonical) can fix a Google quality-filter.** No code change shipped.

**MEDIUM cohort clicks drops:** All four are labeled "contextual only — seasonal rotation" by the ops system itself, and the October totals (2.44K clicks, 383K impressions) confirm total traffic is healthy. No action.

---

## Evidence

| URL | Expected status | Live check | Note |
|---|---|---|---|
| https://www.nakshiq.com/hi/cost/gandikota | 200 | 403 (Vercel firewall, cloud IP) | Top performer in October (136 clicks) — site healthy |
| https://www.nakshiq.com/robots.txt | 200 | 403 (Vercel firewall, cloud IP) | Confirmed clean in repo |
| Key middleware paths | No regression | No git change since Oct 1 | Code-level verified |

---

## What the founder should do

1. **Nothing in GSC to click right now.** No new validation categories opened.
2. **Carry-over (from 10-15 fix):** If not already done → GSC → Indexing → Pages → "Redirect error" → click "Validate Fix". (2 pages remain in this bucket from the old issue.)
3. **Indexed pages strategy is the open decision.** The decline has stabilised (-0.1K WoW). The 14.1K "Crawled - currently not indexed" bucket requires a content decision: deepen, consolidate, or noindex thin templates. This is not a code fix.
4. **Do NOT validate:** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Code changes

**None.** No code change was safe or appropriate for these findings.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done.
- Do NOT validate: noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.
- Server error (5xx): 1 page, "Not Started" — not actioned (single stray page, not a pattern).
