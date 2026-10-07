# GSC Email Triage — 2026-10-07

Run date: 2026-10-07 ~10:42 UTC  
Prior triage: `gsc-email-triage-2026-10-05.md` (2026-10-05 ~22:44 UTC)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **3 results** (2 new, 1 already covered)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

Already covered in prior triage: `1a10e169da6d6554` (Sep performance digest, 2026-10-05).

---

## Classification

| Thread ID | Date (UTC) | Subject | Classification |
|-----------|------------|---------|----------------|
| `1a115951c672ba9a` | 2026-10-07 08:57 | "Page indexing issues successfully fixed for site nakshiq.com" | **CONGRATS MILESTONE** — Server error (5xx) validated fixed, 3 pages. No action. |
| `1a1152b9a26c642f` | 2026-10-07 07:02 | "Some fixes failed for Page indexing issues on site https://www.nakshiq.com/" | **EXPECTED CHURN** — 'Excluded by noindex tag' validation. Intentional behavior; can never pass. No action. |

---

## Detail

### Email 1 — Server error (5xx) FIXED ✅

Google has validated that the Server error (5xx) issue is resolved on nakshiq.com. **3 pages confirmed fixed.** This is good news — the Vercel/Next.js infra is returning clean 200s where 5xx errors were previously observed. No code change required.

### Email 2 — 'Excluded by noindex tag' validation "failed"

Google ran a validation on the "Excluded by 'noindex' tag" category and reports some pages still affected. Per the playbook this is **expected and correct behavior**:

- Share pages (`/destination/*/share`) are intentionally noindexed (meta robots noindex).
- This is by design — these are user-action pages, not search-landing pages.
- The validation **can never pass** for noindexed pages because noindex IS the intended status.
- This is not an error; it is the correct exclusion category.

**No code change needed.**

---

## Action taken

None. No code changes, no DB writes. No commit on the app code.

---

## What the founder should do in GSC

- **'Excluded by noindex tag'** → **Do NOT start new validation.** The pages are noindexed by design (share pages). Any validation here will always "fail" — that is the correct outcome.
- **Server error (5xx)** → Already resolved and validated by Google. No further action needed.
- **Standing guidance:** Page with redirect / Alternate page with proper canonical / Duplicate Google chose different canonical / Blocked by robots.txt (api/og) → all intentional; never start new validations for these categories.
