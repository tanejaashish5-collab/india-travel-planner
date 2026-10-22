# GSC Email Triage — 2026-10-22

Run date: 2026-10-22 ~10:32 UTC (morning run)
Prior triage: `gsc-email-triage-2026-10-21.md` (2026-10-21, morning run — clean)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **1 result**
  - Thread `1a162a8def18eff4`, received 2026-10-22T08:09:56Z
  - Subject: "New reasons prevent pages from being indexed on site nakshiq.com"
  - Reasons listed: Page with redirect · Blocked by robots.txt · Excluded by 'noindex' tag · Alternate page with proper canonical tag · Not found (404)
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

---

## Classification

| Reason | Classification | Rationale |
|---|---|---|
| Page with redirect | **EXPECTED CHURN — no action** | Intentional 301s (locale routing, slug deduplication, region→state). Validation can never pass; this is correct behavior. |
| Blocked by robots.txt | **EXPECTED CHURN — no action** | `/api/og` and other intentional blocks per public/robots.txt. Correct. |
| Excluded by 'noindex' tag | **EXPECTED CHURN — no action** | Share pages (`/destination/*/share`) are intentionally noindexed. Correct. |
| Alternate page with proper canonical tag | **EXPECTED CHURN — no action** | Canonical deduplication working as designed (locale alternates, /vs pairs). Correct. |
| Not found (404) | **Investigated — no new breakage found** | See investigation notes below. |

---

## 404 Investigation

Checked all likely root causes:

1. **Middleware / routing changes since last clean triage (10-21 morning):** None. `git log` since 10-21 shows only GA4 audit commits (no changes to `apps/web/src/middleware.ts`, `apps/web/public/robots.txt`, or any route files).

2. **New destination slugs without allowlist update:** None. `apps/web/data/known-destination-slugs.json` (533 slugs) last changed in commit `6fd8436` (docs note only — no slug content change). No new destination rows added in recent migrations (last migration `cbf3b61` added snow-watch sub-destinations, not main destination slugs requiring allowlist entry).

3. **Live URL checks:** Vercel firewall blocks curl from this cloud environment and WebFetch cannot resolve `www.nakshiq.com` (DNS not reachable from this container). Direct live-check not possible.

4. **Assessment:** The 404 reason in this recurring email type reflects the same historical URLs Google keeps attempting — garbage paths (`/$`, `/&`, `/10`), old dead `/vs` pairs, and a small number of long-tail paths that were correctly redirected or removed in prior sprints. None of these require code changes; they will drop out of GSC's index naturally.

**Verdict: no code change needed.**

---

## Action

None. This is a recurring "new reasons" notification where all 5 listed categories represent either intentional site behavior (4/5) or known historical noise with no new trigger (1/5). No fix required, no commit needed beyond this report.

---

## What the founder should do in GSC

- **Do NOT run "Start new validation"** on any of these categories — all 5 are either intentional exclusions (can never pass) or historical noise. Attempting validation on redirect/noindex/canonical/blocked categories will always show "Failed" and generate more emails.
- The redirect-error fix from commit `6798280` (shipped 2026-10-15) is still pending founder validation in GSC → Indexing → Pages → "Redirect error". That is a separate category from "Page with redirect" and **is** worth validating.
- Server error (5xx): already resolved and validated (confirmed 2026-10-07). No action.

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error".
- Do NOT validate: noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.
- Server error (5xx): resolved and validated 2026-10-07.
