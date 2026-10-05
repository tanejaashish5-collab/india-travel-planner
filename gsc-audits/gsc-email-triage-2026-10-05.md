# GSC Email Triage — 2026-10-05

Run date: 2026-10-05 ~22:44 UTC  
Prior triage: `gsc-email-triage-2026-10-04.md` (2026-10-04 ~22:43 UTC)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result** (monthly performance digest)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

---

## Classification

| Email | Date | Subject | Classification |
|-------|------|---------|----------------|
| `1a10e169da6d6554` | 2026-10-05 22:02 UTC | "Your September Search performance for nakshiq.com" | **CONGRATS MILESTONE** — no action |

---

## September 2026 Performance (relay only)

Google Search Console's monthly digest arrived. Headline numbers:

| Metric | Value |
|--------|-------|
| Clicks (web) | **2,580** |
| Impressions (web) | **351,000** |
| Pages with first impressions | **611** |

**Top growing pages (vs August):**
1. `/en/destination/tungnath/october` → +47 clicks
2. `/en/vs/lansdowne-vs-kasauli` → +39 clicks
3. `/hi/cost/jaisalmer` → +29 clicks

**Top performing pages:**
1. `/en/vs/lansdowne-vs-kasauli` — 78 clicks
2. `/en/destination/tungnath/october` — 64 clicks
3. `/en/treks/girnar-trek` — 47 clicks

**Top queries:** "girnar 10,000 steps in km" (14 clicks), "chitkul in september" (9), "patnitop in september" (7)

**Devices:** Mobile 2,020 · Desktop 543 · Tablet 19

---

## Action taken

None — this is a performance summary email, not an error report. No GSC failures, no 404s, no indexing issues, no robots problems. No code changes required.

---

## What the founder should do in GSC

Nothing new. Standing guidance still applies:

- **Page with redirect / Alternate page with proper canonical** → ignore (intentional behavior).
- **Not found (404)** → if curious, open the category and look for non-`cost/*` URLs.
- **Blocked by robots.txt** → ignore (`/api/og` is intentionally blocked).
- **Do NOT start new validations** for those categories — they will fail for the same reasons.
