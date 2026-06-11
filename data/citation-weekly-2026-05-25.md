# NakshIQ AI-citation weekly · 2026-05-25

**Category:** best-time-visit (17 prompts) · **Engines:** Perplexity, Google AI Overviews (`udm=50`)

**Run notes:**
- Perplexity hit its **free-tier search limit** after 10 of 17 queries ("You've reached your free search limit"). The remaining 7 prompts could not be checked this run — no data written for them, not fabricated.
- Google AIO completed all 17 (AI Mode "Thinking" delays required extended waits on several queries; all answers confirmed fully rendered before testing).
- Prior comparison run is **2026-05-10** (15 days ago). The 2026-05-17 weekly run appears to have been skipped, so the task's 8–6-day SQL window returned zero rows. Deltas below are measured against 2026-05-10.

Perplexity: 0/10 cited (0% — Δ0 vs 2026-05-10) · only 10 of 17 checked — free-tier limit
Google AIO: 0/17 cited (0% — Δ0 vs 2026-05-10)
Combined: 0/27 checked (0% — Δ0)

## New citations this week

None. No NakshIQ citations appeared on either engine.

## Lost citations this week

None. There were no citations in the prior run (2026-05-10) to lose.

## Still 0/0 after 4+ weeks of checking

Every best-time-visit prompt has returned **zero citations on both engines across all four tracked runs** — baseline 2026-04-24, weekly 2026-05-04, weekly 2026-05-10, weekly 2026-05-25 (~31 days of checking). The entire category is uncited. All 17 target pages are candidates for optimization:

- `btv-spiti-june` → /en/destination/kaza
- `btv-ladakh-july` → /en/destination/leh
- `btv-kerala-monsoon` → /en/destination/munnar
- `btv-rajasthan-summer` → /en/destination/jaisalmer/5
- `btv-goa-december` → /en/destination/palolem
- `btv-kashmir-april` → /en/destination/srinagar/4
- `btv-sikkim-october` → /en/destination/gangtok
- `btv-tawang-when` → /en/destination/tawang
- `btv-hampi-weather` → /en/destination/hampi
- `btv-andaman-season` → /en/destination/havelock-island
- `btv-rann-kutch` → /en/destination/rann-of-kutch
- `btv-varanasi-winter` → /en/destination/varanasi
- `btv-hampi-may` → /en/destination/hampi/5
- `btv-pondicherry` → /en/destination/puducherry
- `btv-coorg-august` → /en/destination/coorg/8
- `btv-mahabalipuram` → /en/destination/mahabalipuram
- `btv-hornbill-festival` → /en/destination/kohima/12

## Detail — checks this run (27 of 34 possible)

| Prompt | Perplexity | Google AIO |
|---|---|---|
| btv-spiti-june | not cited | not cited |
| btv-ladakh-july | not cited | not cited |
| btv-kerala-monsoon | not cited | not cited |
| btv-rajasthan-summer | not cited | not cited |
| btv-goa-december | not cited | not cited |
| btv-kashmir-april | not cited | not cited |
| btv-sikkim-october | not cited | not cited |
| btv-tawang-when | not cited | not cited |
| btv-hampi-weather | not cited | not cited |
| btv-andaman-season | not cited | not cited |
| btv-rann-kutch | not checked (PPX limit) | not cited |
| btv-varanasi-winter | not checked (PPX limit) | not cited |
| btv-hampi-may | not checked (PPX limit) | not cited |
| btv-pondicherry | not checked (PPX limit) | not cited |
| btv-coorg-august | not checked (PPX limit) | not cited |
| btv-mahabalipuram | not checked (PPX limit) | not cited |
| btv-hornbill-festival | not checked (PPX limit) | not cited |

## Supabase

27 rows written to `ai_citations` with note `weekly 2026-05-25` (10 perplexity + 17 aio). The 7 unchecked Perplexity prompts were intentionally omitted rather than logged as false.

## Recommendations

- The Perplexity free-tier wall has now blocked the back half of the list on **two consecutive runs** (2026-05-10 and 2026-05-25). To get full 17/17 Perplexity coverage, either shuffle prompt order each week so different prompts get cut, run Perplexity checks across two days, or check the engine while signed into a Pro account.
- Four runs over a month with zero citations on any prompt is a strong signal the best-time-visit target pages are not being retrieved by answer engines. Worth a focused look at on-page structure (clear month-by-month verdicts, schema markup, freshness signals) before the next run.
