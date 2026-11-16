# GSC Email Triage — 2026-11-16

Run date: 2026-11-16 ~09:32 UTC  
Prior triage: `gsc-email-triage-2026-11-15.md` (inbox quiet, no code changes)

---

## Emails seen

| # | From | Subject | Received |
|---|---|---|---|
| 1 | sc-noreply@google.com | New reasons prevent pages from being indexed on site nakshiq.com | 2026-11-16 01:08 UTC |

`from:ops@nakshiq.com subject:GSC newer_than:2d` → 0 results.

---

## Classification

| Email | Category | Reason |
|---|---|---|
| #1 "New reasons prevent pages from being indexed — Server error (5xx)" | **REAL CANDIDATE** | 5xx is in the playbook's investigate class. |

---

## Investigation

### Context from prior audits
"Server error (5xx): 1 page, 'Not Started'" has appeared in GSC audit data since at least 2026-11-04 and was left unactioned each run as a **single stray page, not a pattern**.

GSC sent a "New reason preventing indexing" email on 2026-11-16 at 01:08 UTC. This is the first *email notification* for this reason category on this site — it doesn't necessarily mean the page count changed, but it warrants checking.

### Live-check
Could not perform: outbound access to `www.nakshiq.com` is blocked by the remote session's egress proxy. Vercel MCP `get_runtime_errors` returned HTTP 403 (no permission in this session). Both blockers are session-level constraints, not site problems.

### Code-change review
Commits since 2026-11-10 that touch `apps/web/src/` or `apps/web/public/`:
- `89476d7` feat(freshness): auto-verify decides every fix — scripts only
- `d00ff6c` content(blog): weekly batch 2026-11-14 — data inserts, no route/middleware code
- VEO commits (`3ec6e14`, `3f9c2e3`) — video generation scripts, no web routes

**No middleware, route handler, API route, or build-configuration change** that could introduce a new server error. The 5xx is most likely the same single stray page already in GSC audit data for 2+ weeks.

---

## Code changes

**None.** The failing URL is unknown (not listed in the email), and without it no safe targeted fix is possible. 5xx root-cause requires knowing the URL — this is outside the safely-fixable class (middleware redirects, robots.txt, next.config headers).

---

## What the founder should do

1. **GSC → Indexing → Pages → "Server error (5xx)"** — open the report, look at the URL list.
   - If still 1 URL: low priority; note the URL, check if it's a live product page or a stale crawl artifact.
   - If count has grown (>1 or a known important page): share the URL(s) with the GSC triage routine so it can root-cause and fix.
2. **Do NOT validate** noindex / page-with-redirect / canonical / duplicate / blocked-by-robots.txt — intentional exclusions, always fail.
3. **Click "Validate Fix"** in GSC → Indexing → Pages → "Redirect error" if not yet done (carry-over from commit `6798280`, 2026-10-15).

---

## Standing guidance (unchanged)

- Redirect error fix: commit `6798280` shipped 2026-10-15. Click "Validate Fix" in GSC → Indexing → Pages → "Redirect error".
- `/hi noindex` rollout (2026-11-05): ~3,000 pages estimated removed from index; actual drop ~4,600. Tracking within expected range. Final result due 2026-12-16; `scripts/hi-noindex-check.mjs` monitors clicks.
- Soft 404: fully resolved — Google confirmed 2026-11-09.
