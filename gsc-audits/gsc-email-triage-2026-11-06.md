# GSC Email Triage — 2026-11-06

Run date: 2026-11-06 ~10:33 UTC  
Prior triage: `gsc-email-triage-2026-11-05.md` (2026-11-05 morning, no code changes)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **0 results**
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **2 results**:
  - 2026-11-05T03:30 UTC — already covered in 11-05 triage, skip.
  - **2026-11-06T03:30 UTC** — NEW: "[NakshIQ ops] GSC alerts — 1 high-severity finding(s)"

---

## Classification — new email (2026-11-06 ops alert)

**Class: REPEAT (4th consecutive day) — no new findings, no action.**

The alert body is identical to the 11-03/04/05 alerts: same "Latest audit: 2026-11-02",
same `indexed_pages_drop` [HIGH] with the same trailing averages (16020 vs 18300), same 4
`cohort_clicks_drop` [MEDIUM] findings with the same percentages. The ops cron fires daily on
stale data and will re-fire each morning until the next GSC audit ingestion clears or updates
the alert.

| Finding | Class | Detail |
|---|---|---|
| `indexed_pages_drop` [HIGH] | REPEAT / CONTENT STRATEGY | Investigated 2026-11-03. 14,100 "Crawled – currently not indexed" requires a content decision: deepen, consolidate, or noindex thin templates. No safe code fix. |
| `cohort_clicks_drop` ×4 [MEDIUM] | REPEAT / EXPECTED | All self-labelled "contextual only — seasonal rotation". No action. |

---

## Evidence

No new URLs to live-check. All findings carry over from 11-03/04/05 investigations.

---

## Code changes

**None.** No new finding; no code change appropriate.

---

## What the founder should do

Same as 11-05 — nothing new:

1. **Nothing in GSC to click right now.** No new validation categories.
2. **Carry-over:** GSC → Indexing → Pages → "Redirect error" → "Validate Fix" (if not done from the 2026-10-15 fix, commit `6798280`).
3. **Indexed pages strategy is the open decision.** The indexed count at 14,700 is -19.7% from the 18,300 prior baseline. The ops cron will keep emailing every morning until the GSC audit ingestion refreshes with a new reading.
4. **Do NOT validate:** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done.
- Server error (5xx): 1 page, "Not Started" — not actioned (single stray page, not a pattern).
- `/hi noindex` rollout (2026-11-05): ~3,000 pages removed from sitemap intentionally; `indexed_pages_drop` alert firing is **expected fallout**, not a regression — documented in CLAUDE.md. Final result due 2026-12-16.
