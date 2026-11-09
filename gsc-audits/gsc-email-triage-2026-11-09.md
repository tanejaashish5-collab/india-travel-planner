# GSC Email Triage — 2026-11-09

Run date: 2026-11-09 ~10:32 UTC  
Prior triage: `gsc-email-triage-2026-11-08.md` (2026-11-08 morning, no code changes)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result**:
  - **2026-11-09T07:32:27Z** — NEW: "Page indexing issues successfully fixed for site https://www.nakshiq.com/" — Soft 404, 2 pages validated.
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **2 results**:
  - 2026-11-08T03:30 UTC — already covered in 11-08 triage, skip.
  - **2026-11-09T03:30:33Z** — NEW: "[NakshIQ ops] GSC alerts — 1 high-severity finding(s)"

---

## Classification

### 1. Google — "Soft 404 fix validated" (2026-11-09T07:32Z) — CONGRATS ✓

Google validated the Soft 404 fix for 2 pages on nakshiq.com. This is a successful resolution — no code change needed, no founder action required in GSC. This is likely related to soft-404 fixes shipped in earlier sprints that Google has now recrawled and confirmed as fixed.

| Email | Class | Action |
|---|---|---|
| Soft 404 — 2 pages validated | CONGRATS / MILESTONE | None — already fixed and confirmed |

### 2. ops@nakshiq.com (2026-11-09T03:30Z) — REPEAT / NO ACTION (7th consecutive day)

Alert body identical to 11-03/04/05/06/07/08 alerts: same "Latest audit: 2026-11-02", same `indexed_pages_drop` [HIGH] with same trailing averages (16020 vs 18300), same 4 cohort_clicks_drop findings. The ops cron fires daily on stale audit data.

| Finding | Class | Detail |
|---|---|---|
| `indexed_pages_drop` [HIGH] | REPEAT / CONTENT STRATEGY | Investigated 2026-11-03. The -19.7% drop is documented expected fallout from the `/hi` noindex rollout (2026-11-05 CLAUDE.md). Content decision pending — no safe code fix. |
| `cohort_clicks_drop` ×4 [MEDIUM] | REPEAT / EXPECTED | All self-labelled "contextual only — seasonal rotation". No action. |

---

## Evidence

**Google "Soft 404 validated" email**: 2 pages confirmed fixed. No live-checks needed — Google itself is confirming the fix.

No new 404s, 5xx errors, redirect errors, or manual actions in any email.

---

## Code changes

**None.** No new breakage; only a positive validation milestone.

---

## What the founder should do

1. **Nothing new to click.** The Soft 404 validation closed itself — Google confirmed the fix.
2. **Carry-over from 2026-10-15 fix (commit `6798280`):** GSC → Indexing → Pages → "Redirect error" → "Validate Fix" (if not yet clicked).
3. **Indexed pages strategy is the open decision.** At 14,700 indexed pages (-19.7% from 18,300 baseline), the ops cron will keep emailing every morning until the GSC audit ingestion refreshes with a new reading. The drop is expected from the `/hi` noindex rollout — final result due 2026-12-16.
4. **Do NOT validate:** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done.
- Server error (5xx): 1 page, "Not Started" — not actioned (single stray page, not a pattern).
- `/hi noindex` rollout (2026-11-05): ~3,000 pages removed from sitemap intentionally; `indexed_pages_drop` alert firing is **expected fallout**, not a regression — documented in CLAUDE.md. Final result due 2026-12-16.
- Soft 404: now fully resolved (Google confirmed 2026-11-09).
