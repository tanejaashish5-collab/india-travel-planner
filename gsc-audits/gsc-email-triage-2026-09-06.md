# GSC Email Triage — 2026-09-06

Run date: 2026-09-06 ~22:37 UTC  
Prior triage: `gsc-email-triage-2026-08-14.md`

---

## Emails seen (sc-noreply@google.com, newer_than:23d)

3 emails since last triage (2026-08-14). No emails from ops@nakshiq.com with GSC subject.

| Date (UTC) | Subject | Classification |
|---|---|---|
| 2026-08-17 22:32 | We're validating your Page indexing issue fixes — 'Crawled - currently not indexed' (5284 pages) | INFORMATIONAL — validation-started notice |
| 2026-08-19 17:20 | Some fixes failed — 'Crawled - currently not indexed' | EXPECTED CHURN — no action |
| 2026-09-06 22:17 | **Page indexing issues successfully fixed** — 'Duplicate without user-selected canonical', 1176 pages | MILESTONE — good news, no action needed |

No manual actions. No security issues. No new 404/5xx signals.

---

## §1 — "Crawled - currently not indexed" validation failed (Aug 17 + 19)

**Classification: EXPECTED CHURN — no code change needed**

Ashish clicked "Start new validation" on the "Crawled - currently not indexed" category (Aug 17). Google validated against 5284 affected pages and returned "some fixes failed" (Aug 19).

This is the known Google-rationing-programmatic-surface issue documented in the playbook and the Jun 12 triage. "Crawled - currently not indexed" reflects Google's own editorial decision not to index certain pages — it is not fixable by a code change. The lever is ranking / internal links / content depth, not a GSC validation. Validation failing here is **the expected and correct outcome**.

No curl checks needed. No code change needed. Ignore the "Some fixes failed" email.

---

## §2 — "Duplicate without user-selected canonical" — 1176 pages FIXED (Sep 6)

**Classification: MILESTONE — good news**

Google sent a "successfully fixed" confirmation for the "Duplicate without user-selected canonical" issue across 1176 pages on nakshiq.com. This is the canonical consolidation work (locale-prefix redirects, `x-default` hreflang, and the weekly `gsc-canonical-consolidation` / `gsc-inspect-sweep` cron) that has been tracked since May 2026.

**1176 pages validated as fixed** is a large validation pass — the entire class is now resolved in Google's eyes. No further action required. The scheduled `gsc-canonical-consolidation` task can continue running but its primary job is now done for this cohort.

No curl checks needed. No code change needed.

---

## Classification summary

| Email | Class | Action |
|---|---|---|
| Aug 17 — Validation started for 'Crawled - currently not indexed' | INFORMATIONAL | None |
| Aug 19 — Some fixes failed for 'Crawled - currently not indexed' | EXPECTED CHURN | None — this category cannot be "fixed" via validation |
| Sep 6 — Successfully fixed 'Duplicate without user-selected canonical' (1176 pages) | MILESTONE | None — celebrate; no GSC UI action needed |

---

## What the founder should do in GSC

**Nothing urgent.** 

- The "Duplicate without user-selected canonical" fix confirmation is a milestone — no action needed, it's already validated.
- The "Crawled - currently not indexed" failure is expected and unfixable via validation — do NOT click "Start new validation" again; it will always fail because Google makes the indexing decision, not us. The lever is internal links and content quality over time.
- No new 404s, 5xx errors, manual actions, or security issues detected.

---

## Fixes shipped

None — no bugs found; no code changes needed.

---

## Deploy state

N/A — no push made this triage run.
