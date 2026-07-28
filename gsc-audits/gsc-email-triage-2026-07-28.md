# GSC Email Triage — 2026-07-28

Run date: 2026-07-28 ~10:40 UTC  
Prior triage: `gsc-email-triage-2026-07-10.md`

---

## Emails seen (sc-noreply@google.com, newer_than:2d)

| Time (UTC) | Property | Subject | Verdict |
|---|---|---|---|
| 2026-07-28 01:38:01 | nakshiq.com | Some fixes failed — **Not found (404)** | EXPECTED CHURN — no action (see §1) |
| 2026-07-28 01:39:22 | nakshiq.com | Some fixes failed — **Blocked by robots.txt** | EXPECTED CHURN — no action (see §2) |
| 2026-07-28 01:39:43 | nakshiq.com | Some fixes failed — **Crawled - currently not indexed** | EXPECTED CHURN — no action (see §3) |
| 2026-07-28 01:39:49 | nakshiq.com | **Page indexing issues successfully fixed — Redirect error** | GOOD NEWS — 6 pages fixed (see §4) |

No emails from ops@nakshiq.com with subject GSC in the same window.

---

## §1 — Not found (404): some still failing — EXPECTED CHURN, no action

Google re-ran the 404 validation started on 2026-07-04 and found some URLs still 404.
The remaining 404s are **by design** — per the 07-04 triage §3:

- **`/en|hi/cost/{aritar,phodong,tashiding,mangan,dzongu,…}`** — 8 Sikkim destinations
  have no `destination_costs` rows; `/cost/` correctly `notFound()`s. Commit `bbe1f7f`
  removed all internal links pointing there so Google will stop crawling these. No
  fabricated cost data will be added; they will age out of the 404 bucket naturally.
- **`/_next/static/chunks/*.js?dpl=…`** — stale post-deploy chunk URLs. Self-expiring,
  Google digests them on the next deploy cycle.
- **`/en/state/nagarhole`, `/hi/destination/sumur`** — external/guessed URLs that never
  existed. Correctly 404 forever.

Note: the `/state/<destination-name>` class (e.g. `/en/state/wayanad`) that was also
404ing has been FIXED by commit `0f76b52` (2026-07-25) and shows up in the §4 success.

**No code change possible or needed.** Validation will keep showing "some failed" for
the by-design 404s. Do NOT restart this validation.

## §2 — Blocked by robots.txt: some still failing — EXPECTED CHURN, no action

The 06-12 fix made `/_next/static/` crawlable (commit `39e06b18`). The remaining
"Blocked by robots.txt" URLs are the 13 `/api/og/*` endpoints — intentionally blocked
to prevent serving OG images as indexed documents. These will always fail validation;
that is correct behavior.

**Do NOT validate this category.**

## §3 — Crawled - currently not indexed: some still failing — EXPECTED CHURN, no action

2,593 dest×month/quality pages in the long-tail. Per 07-04 triage §4: "validation on
a bucket this size churns by design; the 'fix' being validated was never a single code
change." Indexed count remains healthy (18.8K as of 07-04, trend positive). The lever
is ranking / internal links, not code. Watch via the M2 monitor in daily audits.

**Do NOT validate this category.**

## §4 — Redirect error: 6 pages successfully fixed — GOOD NEWS

Google validated the redirect fix and confirmed **6 pages now 301 correctly**.

Root cause was the `/state/<destination-name>` → `/destination/<destination-name>`
redirect gap flagged in the 2026-07-20 GSC audit: URLs like `/en/state/wayanad` had no
matching route and hard-404'd. Commit `0f76b52` (merged 07-25) added a dual-guard
middleware rule (STATE_MAP miss + KNOWN_DESTINATION_SLUGS hit → 301 in one hop).
Google validated this within 3 days.

**No action needed — fix already live and confirmed.**

---

## Live-check evidence

Outbound HTTPS to www.nakshiq.com is blocked by the container's proxy policy (same as
the 07-04 10:37 UTC remote run). Evidence basis:

- Commit `0f76b52` (merged 07-25) maps cleanly to the 6 validated redirect-error URLs.
- No commits since 07-10 touch middleware/robots.txt/next.config.ts in a way that
  would introduce new 404s (repo-code review performed as a substitute for live-curl;
  the canary-probe cron at every 30 min is the live health signal).
- All middleware hotspot changes reviewed: the `/state/<dest>` redirect correctly fires
  only when STATE_MAP[slug] === undefined AND KNOWN_DESTINATION_SLUGS.has(slug).

---

## 5xx validation status note

The 5xx validation started 2026-07-04 was still pending at the 07-10 triage. No 5xx
"fix verified" or "fix failed" email appeared in the last 2 days. The 22 `/with-kids/*`
pages returned 200 post-fix (`bbe1f7f`). If the GSC dashboard shows 5xx as "Fix
verified", that's expected and no action is needed. If it shows "Fix failed", a new
triage run should investigate.

---

## What the founder should do in GSC

- **Nothing required.** All three "Some fixes failed" emails are validation churn on
  by-design exclusions.
- **Do NOT start new validations** on: Not found (404) [remaining ones are by-design],
  Blocked by robots.txt [intentional /api/og blocks], Crawled - currently not indexed
  [Google rationing].
- The "Redirect error" fix is confirmed — no re-validation needed there.

---

## No code changes. No deploy.

All 4 emails are GOOD NEWS or EXPECTED CHURN. Verdict: **clean run.**
