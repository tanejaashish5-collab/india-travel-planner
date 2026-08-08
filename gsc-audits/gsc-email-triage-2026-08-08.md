# GSC Email Triage — 2026-08-08

Run date: 2026-08-08 ~10:38 UTC  
Prior triage: `gsc-email-triage-2026-08-04.md`

---

## Emails seen (sc-noreply@google.com, newer_than:4d)

All 6 emails arrived 2026-08-08 ~01:09–01:13 UTC.

| Time (UTC) | Subject / Issue | Verdict |
|---|---|---|
| 01:09:29 | **Page indexing issues successfully fixed** — Soft 404 (3 pages) | GOOD NEWS ✓ |
| 01:09:49 | Some fixes failed — 'Duplicate, Google chose different canonical than user' | EXPECTED CHURN |
| 01:12:53 | **Page indexing issues successfully fixed** — Discovered - currently not indexed (6,706 pages) | GOOD NEWS ✓✓ |
| 01:12:57 | Some fixes failed — 'Excluded by noindex tag' | EXPECTED CHURN |
| 01:13:02 | Some fixes failed — 'Alternate page with proper canonical tag' | EXPECTED CHURN |
| 01:13:04 | Some fixes failed — 'Page with redirect' | EXPECTED CHURN |

No emails from ops@nakshiq.com with subject GSC. No manual actions. No security issues. No 404/5xx failures.

---

## §1 — GOOD NEWS: Soft 404 fix validated (3 pages)

Google confirmed the Soft 404 issue is resolved. This closes out the `/with-kids/*` fix from commit `bbe1f7f` (the `typeof null === "object"` null-safety bug on `with-kids-content.tsx`). 3 pages verified as fixed. No further action.

---

## §2 — MAJOR GOOD NEWS: 6,706 pages validated — "Discovered - currently not indexed"

Google has validated **6,706 pages** as fixed for the "Discovered - currently not indexed" issue.

This is the direct result of the robots.txt + next.config fix shipped in commit `39e06b18` (2026-06-12): allowing `/_next/static/` so Google can render JS/CSS chunks. The "Crawled - currently not indexed" pile (~1,093 at time of fix) has now cleared at massive scale — Google appears to have bulk-reprocessed thousands of pages once rendering was unblocked.

**No code change needed. This is a compounding win from the June robots.txt fix.**

---

## §3 — EXPECTED CHURN (4 "Some fixes failed" emails — no action, by design)

All four failed validations match the EXPECTED CHURN class from the playbook. These validations **can never pass** because the behavior is intentional:

| Issue | Why it always "fails" |
|---|---|
| Duplicate, Google chose different canonical than user | Intentional — non-prefixed apex URLs 301→`/en/`. Google correctly picks `/en/` canonical. Cannot pass. |
| Excluded by noindex tag | Share pages (`/destination/*/share`) are intentionally noindexed. Cannot pass. |
| Alternate page with proper canonical tag | Canonicals doing their job (e.g., `/hi/` pages self-canonicalizing to `/en/`). Cannot pass. |
| Page with redirect | Intentional 301s (locale routing, slug deduplication, skip-list redirects). Cannot pass. |

These are infrastructure exclusions, not errors. GSC keeps re-running their validations on its own schedule; they will keep "failing" forever, which is correct.

---

## What the founder should do in GSC

**Nothing mandatory.** The "failed" emails are all expected. The two "fixed" emails are automatic confirmations.

Optionally: in the GSC Coverage report, the "Discovered - currently not indexed" bucket should now show dramatically fewer entries. No validation clicks needed — Google already confirmed the fix.

---

## No code changes. No deploy.

All failures are EXPECTED CHURN by design. Both successes are already-shipped fixes finally confirmed by Google.

**Verdict: clean run — massive indexing win (6,706 pages), Soft 404 closed out.**
