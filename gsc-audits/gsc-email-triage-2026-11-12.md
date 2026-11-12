# GSC Email Triage — 2026-11-12

Run date: 2026-11-12 ~10:32 UTC  
Prior triage: `gsc-email-triage-2026-11-11.md` (2026-11-11 morning, no code changes)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **0 results**. No new Google Search Console email.
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **2 results**:
  - 2026-11-11T03:30:33Z — already covered in 11-11 triage. Skip.
  - **2026-11-12T03:30:32Z** — NEW: "[NakshIQ ops] GSC alerts — 1 high-severity finding(s)"

---

## Classification

### ops@nakshiq.com (2026-11-12T03:30Z) — EXPECTED / NO ACTION (10th consecutive day)

Audit data unchanged: **latest audit 2026-11-09, indexed pages 13,700**. All findings remain in the documented-expected bucket. No new Google-sourced GSC emails; no 404s, 5xxs, redirect errors or manual actions.

| Finding | Class | Detail |
|---|---|---|
| `indexed_pages_drop` [HIGH] | EXPECTED / CONTENT STRATEGY | 10th consecutive day. Indexed pages 13,700 (trailing 5-read avg 15,320 vs prior 5-read avg 17,860, -14.2%). Documented expected fallout from the 2026-11-05 `/hi` noindex rollout (CLAUDE.md). The email notes the decline pre-dates 11-05 (19,400 on 10-04); the agreed monitoring lever is clicks via `hi-noindex-check.mjs`, result due 2026-12-16. **Regression only if English or kept /hi families fall** (CLAUDE.md); no such signal present. No safe code fix. |
| `cohort_clicks_drop` ×4 [MEDIUM] | EXPECTED | All self-labelled "contextual only — seasonal rotation". No action. Destination/month (-89.5%), vs/pair (-82.6%), treks (-80.3%), other (-86.9%). |

---

## Evidence

No live-checks needed — no new Google-sourced GSC emails, no new 404s, 5xx, redirect errors, or manual actions.

---

## Code changes

**None.** No new breakage.

---

## What the founder should do

1. **Nothing new to click.** No new Google-sourced GSC issues.
2. **Indexed pages:** Holding at 13,700 (same as yesterday). Decline is in the expected deindexing-settling phase post `/hi` noindex rollout. Final result date is 2026-12-16.
3. **Carry-over from 2026-10-15 fix (commit `6798280`):** GSC → Indexing → Pages → "Redirect error" → "Validate Fix" (if not yet clicked).
4. **Do NOT validate:** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error".
- Server error (5xx): 1 page, "Not Started" — not actioned (single stray page, not a pattern).
- `/hi noindex` rollout (2026-11-05): ~3,000 pages estimated removed from index; actual drop now ~4,600. Tracking within expected range for a ~8,500-URL sitemap removal. `indexed_pages_drop` alert is **expected fallout**, not a regression — documented in CLAUDE.md. Final result due 2026-12-16; `scripts/hi-noindex-check.mjs` monitors clicks.
- Soft 404: fully resolved — Google confirmed 2026-11-09.
