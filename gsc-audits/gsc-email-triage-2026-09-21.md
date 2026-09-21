# GSC Email Triage — 2026-09-21

Run date: 2026-09-21 ~22:37 UTC (evening run)  
Prior triage: `gsc-email-triage-2026-09-20.md`

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **8 total threads/messages** (3 threads)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

**Already covered by 09-20 triage (skipped):**
- Breadcrumbs structured data issue (2026-09-20T08:47) — fixed in `7e10786`, covered in 09-20 AM run
- Coverage: Not found (404) new reason (2026-09-20T18:14) — investigated in 09-20 PM run, no persistent 404 root cause

**New emails since last triage — all 2026-09-21T12:39–12:40 UTC:**

| # | Subject | Time | Category |
|---|---|---|---|
| 1 | "We're validating your fix... 'Not found (404)'" — 268 pages | 12:39 | Validation started |
| 2 | "We're validating your fix... 'Redirect error'" — 6 pages | 12:40 | Validation started |
| 3 | "We're validating your fix... 'Soft 404'" — 2 pages | 12:40 | Validation started |
| 4 | "We're validating your fix... 'Discovered - currently not indexed'" — 954 pages | 12:40 | Validation started |
| 5 | "We're validating your fix... 'Duplicate, Google chose different canonical than user'" — 194 pages | 12:40 | Validation started |

---

## Classification

All 5 new emails are **GSC "Validation started" confirmations** — triggered by the founder clicking "Validate Fix" / "Start new validation" in the GSC UI. These are positive signals (not new problem alerts): Google is processing the validation requests.

| Email | Class | Action |
|---|---|---|
| Not found (404) — 268 pages | EXPECTED CHURN / no new action | Already investigated 09-20 PM: cost/* data gaps + transient ISR incident; no code regression. Validation running. |
| Redirect error — 6 pages | EXPECTED CHURN | Intentional 301s (locale routing, slug dedup, canonical consolidation). Validation "passing" when redirects resolve cleanly is expected. |
| Soft 404 — 2 pages | EXPECTED CHURN | Tiny bucket; likely cost/* or destination pages with no data row (honest data gap). No fix warranted. |
| Discovered - currently not indexed — 954 pages | EXPECTED CHURN | Known Google rationing of programmatic surface (documented in every prior triage). Lever is ranking/internal links, not validation. Validation can't resolve this class. |
| Duplicate, Google chose different canonical — 194 pages | EXPECTED CHURN | Intentional canonicalization (locale prefix, reversed /vs/ pairs). Validation will report issues but correct behavior is to lose this one. |

---

## Investigation

**No new code changes needed.**

Recent commits reviewed for routing regressions:
- `83397f5` — destination verified-date lines, no routing change
- `939ec7c` / `d1e54dc` — freshness audit, no routing change
- `7434010` — freshness weekly re-verification, no routing change
- `6fabc2c` / `c950523` / `b9d4afb` — reels/veo fixes, no routing change

No routing-affecting commits since the 09-20 breadcrumb fix (`7e10786`). The 268-page 404 bucket was already attributable to (a) cost/* honest data gaps and (b) the transient Supabase ISR incident on 09-20 — both investigated in the 09-20 PM run.

**TypeScript check:** Not run — no code changes this triage session.

---

## Deploy state

No code pushed this run. Production is on the `7e10786` breadcrumb fix deployed 2026-09-20.

---

## What the founder should do in GSC

**Nothing new to click** — you already started the validations. Wait for Google to send results (typically 1–7 days per category).

When results arrive:
1. **Not found (404) validation result** — if Google reports "failed" on specific URLs, paste them here for the next triage run. If they are `cost/*` URLs → honest data gap, ignore. If they are real destination/festival pages → escalate.
2. **Redirect error validation result** — 6 pages on intentional 301s; if Google confirms pass, done. If it reports chains/loops on specific URLs, paste them.
3. **Soft 404 (2 pages)** and **Discovered not indexed (954 pages)** — monitoring outcomes, no code lever available.
4. **Duplicate canonical (194 pages)** — will likely "fail" again; this is correct and expected (intentional canonicalization).

**Do NOT validate** `Excluded by noindex` / `Page with redirect` / `Alternate page with proper canonical` categories — they are exclusions by design and their validations can never pass.
