# GSC Email Triage — 2026-09-23

Run date: 2026-09-23 ~22:45 UTC (evening run)  
Prior triage: `gsc-email-triage-2026-09-21.md`

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **5 messages in 1 thread** (all today, 2026-09-23T16:52–16:53 UTC)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

**New emails since last triage — all 2026-09-23T16:52–16:53 UTC:**

| # | Issue category | Class |
|---|---|---|
| 1 | "Some fixes failed" — **Page with redirect** | EXPECTED CHURN |
| 2 | "Some fixes failed" — **Alternate page with proper canonical tag** | EXPECTED CHURN |
| 3 | "Some fixes failed" — **Not found (404)** | EXPECTED CHURN (see investigation) |
| 4 | "Some fixes failed" — **Crawled - currently not indexed** | EXPECTED CHURN |
| 5 | "Some fixes failed" — **Blocked by robots.txt** | EXPECTED CHURN |

These are the validation result callbacks for the 5 validations the founder started on 2026-09-21. Google ran recrawls and is reporting which categories still have affected pages.

---

## Classification

**All 5 are EXPECTED CHURN — no code changes needed.**

| Email | Verdict | Rationale |
|---|---|---|
| Page with redirect | EXPECTED CHURN | Intentional 301s (locale prefix routing, slug dedup merges, skip-list/tourist-traps). These pages are *supposed* to redirect. Validation can never "pass" — that is correct behavior. |
| Alternate page with proper canonical tag | EXPECTED CHURN | Canonical tags are doing their job (locale `/en` prefix, reversed `/vs/` pairs). Explicitly listed in the playbook as an intentional exclusion whose validation always "fails". |
| Not found (404) | EXPECTED CHURN | 09-20 PM investigation traced the 404 bucket to (a) `cost/*` honest data gaps (`generateStaticParams` returns `[]` when no cost row exists — documented as a "benign class" in CLAUDE.md) and (b) a transient Supabase ISR incident on 09-20 that has since resolved. No routing-affecting commits since `7e10786` (09-20 breadcrumb fix). No specific failing URL list in the email body — if the founder wants to drill in, open GSC → Page indexing → Not found (404) and look for non-`cost/*` URLs. |
| Crawled - currently not indexed | EXPECTED CHURN | Known Google rationing of programmatic surface (documented in every triage since 06-12). ~900+ URLs in this bucket. The lever is ranking/internal links, not validation. This validation can never pass at scale. |
| Blocked by robots.txt | EXPECTED CHURN | The `/api/og` family (13 URLs) is intentionally blocked — `Disallow: /api/og` is by design. The `/_next/static/` regression from before 06-12 was fixed in `39e06b18`. Remaining "blocked" items are intentional. |

---

## Investigation

**No new code changes warranted.**

No routing-affecting commits since `7e10786` (09-20 breadcrumb fix). Recent commits reviewed:
- `83397f5` — destination verified-date lines, no routing change
- `939ec7c` / `d1e54dc` — freshness audit, no routing change
- `7434010` — freshness weekly re-verification, no routing change
- `6fabc2c` / `c950523` / `b9d4afb` — reels/veo fixes, no routing change

No new curl checks run — the emails don't include specific failing URL lists, and all 5 categories have documented prior explanations that are still current.

**TypeScript check:** Not run — no code changes this triage session.

---

## Deploy state

No code pushed this run. Production is on the `7e10786` breadcrumb fix deployed 2026-09-20.

---

## What the founder should do in GSC

**Nothing new to action.** These are "validation failed" results for categories that were already expected to fail because the behavior is by design.

- **Page with redirect** → ignore. Intentional redirects always "fail" this validation.
- **Alternate page with proper canonical tag** → ignore. Canonical tags working correctly always "fail" this validation.
- **Not found (404)** → if curious, open the category in GSC and look for non-`cost/*` URLs. `cost/*` 404s are honest data gaps (no cost row for that destination) — do not fix. If you see real destination or festival pages 404ing, paste the URLs into the next triage prompt.
- **Crawled - currently not indexed** → ignore. ~900+ pages; Google is choosing what to index from a programmatic site. No quick lever.
- **Blocked by robots.txt** → ignore. `/api/og` is intentionally blocked.

**Do NOT start new validations for these categories** — they will fail again for the same reasons.
