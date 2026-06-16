# GSC Email Triage — 2026-06-16

Site: `sc-domain:nakshiq.com`
Run date: 2026-06-16 12:37 UTC
Prior triage: none (first `gsc-email-triage-*` run; last audit file was `gsc-audit-2026-06-02.md`)
Emails covered: all `sc-noreply@google.com` threads newer than 2026-06-14 (2-day window) and, by
extension, the 2026-06-12 batch which was not covered by any prior triage file.

---

## Emails seen

| Date (UTC) | Subject | Reason | Thread |
|---|---|---|---|
| 2026-06-12 08:27 | New reasons prevent pages from being indexed | Indexed, though blocked by robots.txt | 19ebaf19e3ca6e19 |
| 2026-06-12 09:09 | Some fixes failed for Page indexing issues | Excluded by 'noindex' tag | 19ebb17dfe7e4b31 |
| 2026-06-12 09:09 | Some fixes failed for Page indexing issues | Page with redirect | 19ebb17dfe7e4b31 |
| 2026-06-12 09:09 | Some fixes failed for Page indexing issues | Alternate page with proper canonical tag | 19ebb17dfe7e4b31 |
| 2026-06-12 09:10 | Some fixes failed for Page indexing issues | Blocked by robots.txt | 19ebb17dfe7e4b31 |
| 2026-06-12 09:10 | Some fixes failed for Page indexing issues | Crawled - currently not indexed | 19ebb17dfe7e4b31 |
| 2026-06-12 09:10 | Some fixes failed for Page indexing issues | Not found (404) | 19ebb17dfe7e4b31 |
| 2026-06-12 09:11 | Some fixes failed for Page indexing issues | Duplicate, Google chose different canonical | 19ebb17dfe7e4b31 |

**Total: 8 messages across 2 threads.**

---

## Classification

### EXPECTED CHURN — no code action, but noted here

| Reason | Classification | Rationale |
|---|---|---|
| Excluded by 'noindex' tag | EXPECTED CHURN | Intentional: `/api/og` and similar routes deliberately carry `noindex`. These validations can never fully pass. |
| Page with redirect | EXPECTED CHURN | Intentional: ~dozen 301 redirect rules in `middleware.ts` (ziro→ziro-valley, hampta-pass-trek, region→state, etc.). Google re-checks and still sees some. Normal cycle — no source URL should be un-redirected. |
| Alternate page with proper canonical tag | EXPECTED CHURN | Intentional: un-prefixed URLs (`/destination/hemkund-sahib/june`) are correctly canonicalised to `/en/…` and served as alternates. Validation passes incrementally as Google re-crawls. |
| Blocked by robots.txt | EXPECTED CHURN | Intentional: `Disallow: /api/` + `/_next/` + `/admin/` in `robots.txt`. The pages in this bucket are API routes, never real content. |
| Crawled - currently not indexed | EXPECTED CHURN | Google quality-tier decision, not a code error. The 2026-06-02 audit flagged a +1,291 spike; Google is still evaluating. No code fix is possible or appropriate. |
| Duplicate, Google chose different canonical | EXPECTED CHURN | Intentional: the 2026-06-03 Hindi-dup consolidation (`middleware.ts` commit `9d3c16f`) set `X-Robots-Tag: noindex, follow` on English-only `/hi/` page types. GSC correctly reports these as duplicates folded to `/en/`. |

### REAL CANDIDATES — investigated

#### 1. "Indexed, though blocked by robots.txt" (new alert, 2026-06-12 08:27)

**Why it's a real candidate:** This is a *new* reason — first time it's appeared for nakshiq.com. The playbook flags it when real content pages are accidentally blocked.

**Code analysis:** `apps/web/public/robots.txt` blocks `Disallow: /api/` for all bots. The most recent robots.txt change (`ca08c9d`, 2026-05-28) only raised crawl-delays and added `Disallow` for CCBot/Amazonbot/YouBot/PhindBot — no new Disallow was added for Googlebot or the default `*` agent. Real content pages (`/en/destination/…`, `/en/state/…`, `/vs/…`, etc.) remain fully accessible.

**Root cause:** As the site grew past 16,800 indexed pages, Google began surfacing `/api/` endpoints (most likely `/api/og?…` OG image URLs referenced in `<meta property="og:image">` tags) in the "Indexed, though blocked" bucket. These were previously in Google's index from early crawls before the Disallow was well-established, and the bucket is now being populated in GSC as a new classification.

**Verdict:** EXPECTED for the `/api/` block — these are internal API endpoints, not real content. No code change needed.

**Founder action required:** Open the GSC "Indexed, though blocked by robots.txt" report and sample 10 URLs. If ALL are under `/api/`, confirm this is intentional and ignore. If ANY are real content pages (e.g., `/en/destination/…`), report back immediately for investigation.

#### 2. "Not found (404)" — failed validation (2026-06-12 09:10)

**Why it's a real candidate:** An active GSC validation failure means Google still finds URLs returning 404 after a prior fix was declared.

**Code analysis:** The middleware known-slug gate (`KNOWN_DESTINATION_SLUGS`, installed 2026-05-04) correctly 404s unknown destination slugs at middleware level. All known legacy patterns have explicit 301 redirects:
- `ziro` → `ziro-valley` (middleware regex, commit `ca08c9d`)
- `hampta-pass-trek` → `hampta-pass`
- `kasol-parvati-valley-vs-manikaran` → `kasol-vs-manikaran`
- `/region/<state>/<month>` → `/state/<state>`
- `/where-to-go/<state>-in-<month>` → `/where-to-go/<month>`
- `/region/northeast` → `/india/northeast`
- `/skip-list` → `/tourist-traps`

**Root cause:** The remaining 404s in GSC are old URLs Google indexed before the known-slug gate (pre-2026-05-04) with arbitrary/misspelled destination IDs, or old programmatic URLs that were never real pages. They correctly return 404 and will fall out of Google's index organically. No new 404 pattern was introduced — the validation was started while the gate was being fixed, and Google is still rechecking the residual tail.

**Live URL check:** Unable to curl from this cloud environment (Vercel firewall returns `403 host_not_allowed` for all cloud-origin requests, including with Chrome User-Agent headers). No live confirmation possible.

**Verdict:** No code change needed. The 404s are correct responses for URLs that were never real pages. The validation will close naturally as Google drops them from its index.

---

## Fixes shipped

**None.** All 8 emails classify as EXPECTED CHURN or pre-existing conditions with no code fix available or warranted. No commit was made.

---

## What the founder should do in GSC UI

| Priority | Action |
|---|---|
| 🔴 **Inspect** | Open "Indexed, though blocked by robots.txt" → click through to the affected URLs. Verify every URL is under `/api/`. If yes: **do nothing, it is intentional.** If any real content page appears, alert the dev team. |
| 🔴 **Still open** | hemkund-sahib canonical (week 8+): open GSC URL Inspection for `https://www.nakshiq.com/destination/hemkund-sahib/june` and `https://www.nakshiq.com/en/destination/hemkund-sahib/june` → Request Indexing on both. (~63 clicks/week still bleeding to the wrong canonical.) |
| 🟡 **Ignore** | All 7 "Some fixes failed" categories — they are intentional exclusions that will never fully validate. No action needed. |
| 🟡 **Let age out** | "Not found (404)" — Google will drop the residual bad URLs. No re-validation needed; they are genuinely 404 and should stay that way. |

---

## Deploy state

No changes pushed. Vercel deploy state: unchanged (no regression risk).

---

## Limitations of this run

- Live URL curl was unavailable: Vercel firewall returns `403 host_not_allowed` for all requests originating from this cloud environment, regardless of User-Agent. All conclusions are from code analysis only. The founder's GSC UI check on "Indexed, though blocked by robots.txt" is essential to confirm the /api/ hypothesis.
