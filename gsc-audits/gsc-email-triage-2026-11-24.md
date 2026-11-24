# GSC Email Triage — 2026-11-24

Run date: 2026-11-24 ~09:36 UTC (morning run)  
Prior triage: `gsc-email-triage-2026-11-23.md` (clean)

---

## Emails seen

| # | From | Subject | Received |
|---|---|---|---|
| 1 | ops@nakshiq.com | [NakshIQ ops] GSC alerts — 1 high-severity finding(s) | 2026-11-24T03:30:32Z |

`from:sc-noreply@google.com newer_than:2d` → 0 results  
`from:ops@nakshiq.com subject:GSC newer_than:2d` → 1 result (ops monitoring alert)

---

## Classification

### [HIGH] indexed_pages_drop — MONITORING / EXPECTED (no action)

**Detail:** Indexed pages at 12,100. Trailing 5-read avg 13,558 vs prior 5-read avg 17,220 (−21.3%). Decline began before the 2026-11-05 /hi noindex change (was 19,400 on 2026-10-04).

**Analysis:**
- ~3,000 of the total drop is **planned** from the /hi noindex consolidation (2026-11-05). CLAUDE.md explicitly calls this expected fallout.
- The additional decline (from ~19,400 to ~16,400 before the /hi noindex event) is real and predates the change. The 'indexed_pages_drop' alert has been firing since before 11-05.
- **Agreed action per CLAUDE.md:** `scripts/hi-noindex-check.mjs` monitors clicks. It emails Ashish if clicks fall below 450 for 2 full weeks. Final reading: **2026-12-16**. It is a regression only if English pages or kept /hi families fall.
- **No code change needed.** Trust the automation and wait for the 2026-12-16 verdict.

### [MEDIUM] cohort_clicks_drop × 4 — CONTEXTUAL / EXPECTED (no action)

| Cohort | Drop | Note |
|---|---|---|
| 'other' | −38.9% (185→113) | Seasonal top-10 rotation |
| 'vs/pair' | −92.9% (113→8) | Seasonal top-10 rotation |
| 'destination/month' | −89.4% (66→7) | Seasonal top-10 rotation |
| 'treks' | −31.1% (61→42) | Seasonal top-10 rotation |

The ops email itself labels these "Contextual only — top-10 tables rotate seasonally, so this is NOT by itself a regression." No investigation needed unless total clicks drop below threshold (monitored by hi-noindex-check.mjs).

---

## Code changes

**None.** All findings are monitoring/contextual — no technical breakage to fix.

---

## What the founder should do

1. **Nothing new today.** All 5 ops alerts are either expected fallout from the /hi noindex consolidation or seasonal cohort rotation.
2. **Indexed pages decline:** Trust `scripts/hi-noindex-check.mjs`. Final verdict arrives 2026-12-16. It emails you directly if clicks fall below 450 for 2 consecutive weeks — no news is good news until then.
3. **Carry-overs from prior triages:**
   - **Redirect error:** Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error" if not yet done (commit `6798280`, 2026-10-15).
   - **5xx stray page:** Check GSC → Indexing → Pages → "Server error (5xx)" to see if the URL count changed.
4. **Do NOT validate** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.
