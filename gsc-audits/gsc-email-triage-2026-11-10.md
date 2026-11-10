# GSC Email Triage — 2026-11-10

Run date: 2026-11-10 ~10:32 UTC  
Prior triage: `gsc-email-triage-2026-11-09.md` (2026-11-09 morning, no code changes)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result**, dated 2026-11-09T07:32Z — already covered in 11-09 triage (Soft 404 validated). No new Google Search Console email today.
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **2 results**:
  - 2026-11-09T03:30Z — already covered in 11-09 triage, skip.
  - **2026-11-10T03:30:32Z** — NEW: "[NakshIQ ops] GSC alerts — 1 high-severity finding(s)"

---

## Classification

### ops@nakshiq.com (2026-11-10T03:30Z) — REPEAT / NO ACTION (8th consecutive day)

Alert body identical to 11-03/04/05/06/07/08/09 alerts: same "Latest audit: 2026-11-02", same `indexed_pages_drop` [HIGH] with same trailing averages (16020 vs 18300), same 4 cohort_clicks_drop findings. The ops cron fires daily on stale audit data.

| Finding | Class | Detail |
|---|---|---|
| `indexed_pages_drop` [HIGH] | REPEAT / CONTENT STRATEGY | Investigated 2026-11-03. The -19.7% drop is documented expected fallout from the `/hi` noindex rollout (2026-11-05 CLAUDE.md). Content decision pending — no safe code fix. |
| `cohort_clicks_drop` ×4 [MEDIUM] | REPEAT / EXPECTED | All self-labelled "contextual only — seasonal rotation". No action. |

---

## Evidence

No live-checks needed — no new GSC email, no new 404s, 5xx, redirect errors, or manual actions. The ops cron is firing on the same stale 2026-11-02 audit data for the 8th consecutive day.

---

## Code changes

**None.** No new breakage.

---

## What the founder should do

1. **Nothing new to click.** No new Google-sourced GSC issues since the Soft 404 success on 2026-11-09.
2. **Carry-over from 2026-10-15 fix (commit `6798280`):** GSC → Indexing → Pages → "Redirect error" → "Validate Fix" (if not yet clicked).
3. **Indexed pages strategy is the open decision.** At 14,700 indexed pages (-19.7% from 18,300 baseline), the ops cron will keep emailing every morning until the GSC audit ingestion refreshes with a new reading. The drop is expected from the `/hi` noindex rollout — final result due 2026-12-16.
4. **Do NOT validate:** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done.
- Server error (5xx): 1 page, "Not Started" — not actioned (single stray page, not a pattern).
- `/hi noindex` rollout (2026-11-05): ~3,000 pages removed from sitemap intentionally; `indexed_pages_drop` alert firing is **expected fallout**, not a regression — documented in CLAUDE.md. Final result due 2026-12-16.
- Soft 404: fully resolved — Google confirmed 2026-11-09.
