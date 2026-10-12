# GSC Email Triage — 2026-10-12

Run date: 2026-10-12 ~10:42 UTC (morning)
Prior triage: `gsc-email-triage-2026-10-11.md` (2026-10-11, both runs empty)

---

## Emails seen

**Morning run (~10:42 UTC):**
- `from:sc-noreply@google.com newer_than:2d` → **1 result**
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

| # | Date (UTC) | Subject | Thread ID |
|---|---|---|---|
| 1 | 2026-10-12 04:55 | Some fixes failed for Page indexing issues on site https://www.nakshiq.com/ | 1a12e77734062ba8 |

---

## Classification

### Email 1 — "Some fixes failed" · 'Duplicate, Google chose different canonical than user'

**Class: EXPECTED CHURN — no action, validation can never pass.**

Full body:
> You requested that Google validate your fix for: Page indexing issues on your property, https://www.nakshiq.com/. The fix requested was for the following issue: 'Duplicate, Google chose different canonical than user'. Some of your pages are still affected by this issue.

Per the triage playbook (gsc-failures-triage-2026-06-12.md), **"Duplicate, Google chose different canonical"** is explicitly listed as an intentional exclusion. These are pages where Google overrides the site's canonical hint with its own preference — the canonical tags are doing their job, but Google disagrees. This is expected behavior for a programmatic content site with many near-duplicate pages, and the validation will always "fail" because the exclusion is by design.

No URLs were listed in the email body; this is a generic failure notification for a validation that was previously requested in GSC. The fix was already codified in `/vs/` reversed-order de-duplication (see playbook §Duplicate) — no new code issue has emerged.

No live-check required (no specific URLs given, and the classification is structural/intentional).

---

## Fixes shipped

**None.** EXPECTED CHURN email only — no code change needed.

---

## What the founder should do in GSC

**Do NOT re-validate 'Duplicate, Google chose different canonical than user'** — this exclusion category is by design and the validation can never pass. No action needed.

Standing guidance:
- **'Excluded by noindex tag'** (share pages) → Do NOT validate; noindex is by design.
- **'Page with redirect' / 'Alternate page with proper canonical' / 'Duplicate, Google chose different canonical' / 'Blocked by robots.txt' (api/og only)** → All intentional exclusions; never start new validations for these categories.
- **Server error (5xx)** → Already resolved and validated by Google (confirmed 2026-10-07).
