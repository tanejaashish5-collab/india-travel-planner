# GSC Email Triage — 2026-11-18

Run date: 2026-11-18 ~09:35 UTC  
Prior triage: `gsc-email-triage-2026-11-16.md` (5xx single stray page, no code changes)

---

## Emails seen

| # | From | Subject | Received |
|---|---|---|---|
| 1 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | 2026-11-18 03:30 UTC |

`from:sc-noreply@google.com newer_than:2d` → 0 results (no direct GSC notifications from Google).

---

## Classification

| Finding | Severity | Classification | Reason |
|---|---|---|---|
| `indexed_pages_drop` — -18.5% (avg 14378 vs 17640) | HIGH | **EXPECTED / MONITORED** | Partly explained by 2026-11-05 /hi noindex rollout (~3,000 pages). Pre-existing decline noted since 2026-10-04 (19,400). Agreed check: `hi-noindex-check.mjs` monitors clicks, final result 2026-12-16. No new code change. |
| `cohort_clicks_drop` — destination/month: 96→0 (-100%) | MEDIUM | **EXPECTED CHURN** | Ops email itself flags "contextual only — top-10 tables rotate seasonally". |
| `cohort_clicks_drop` — vs/pair: 141→8 (-94.3%) | MEDIUM | **EXPECTED CHURN** | Same — seasonal top-10 rotation. |
| `cohort_clicks_drop` — treks: 73→21 (-71.2%) | MEDIUM | **EXPECTED CHURN** | Same — seasonal top-10 rotation. |
| `cohort_clicks_drop` — other: 235→53 (-77.4%) | MEDIUM | **EXPECTED CHURN** | Same — seasonal top-10 rotation. |

---

## Investigation

No real candidates (404, 5xx, redirect error, manual action, security issue) in this email. All 5 findings are either:
- Already being tracked by a dedicated LaunchAgent (`hi-noindex-check.mjs`, result due 2026-12-16), or  
- Marked contextual-only by the ops watchdog itself (seasonal top-10 churn).

The indexed-pages count (12,490) is consistent with the expected trajectory: started from ~19,400 on 2026-10-04, /hi noindex on 2026-11-05 removed an estimated ~3,000 pages (actual observed: ~4,600). No new regression visible.

No live URL checks or repo code review required — no actionable failures to investigate.

---

## Code changes

**None.** No fixable failures identified.

---

## What the founder should do

1. **Nothing new today.** All findings are tracked or seasonal noise.
2. **Indexed pages decline** is being watched by `hi-noindex-check.mjs` — it will email you if clicks fall below 450 for 2 full weeks. Final reading: 2026-12-16. Trust the automation.
3. **Redirect error fix (carry-over):** Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done (commit `6798280`, 2026-10-15).
4. **5xx single stray page (carry-over from 2026-11-16):** Check GSC → Indexing → Pages → "Server error (5xx)" to see if the URL count has changed. Still not actionable without the specific URL.
5. **Do NOT validate** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error".
- `/hi noindex` rollout (2026-11-05): ~3,000 pages estimated removed from index; actual drop ~4,600. Tracking within expected range. Final result due 2026-12-16; `scripts/hi-noindex-check.mjs` monitors clicks.
- Soft 404: fully resolved — Google confirmed 2026-11-09.
