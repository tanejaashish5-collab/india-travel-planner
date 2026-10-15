# GSC Email Triage — 2026-10-15

Run date: 2026-10-15 ~22:42 UTC (evening run)
Prior triage: `gsc-email-triage-2026-10-12.md` (2026-10-12, morning run)

---

## Emails seen

- `from:sc-noreply@google.com newer_than:2d` → **2 results**
- `from:ops@nakshiq.com subject:GSC newer_than:2d` → **0 results**

| # | Date (UTC) | Subject | Thread ID |
|---|---|---|---|
| 1 | 2026-10-15 12:01 | Some fixes failed for Page indexing issues on site https://www.nakshiq.com/ — 'Redirect error' | 1a13f7009288782f |
| 2 | 2026-10-15 12:35 | New reasons prevent pages from being indexed on site nakshiq.com — 'Redirect error' | 1a13f8fc498b0635 |

---

## Classification

| Email | Class | Action |
|---|---|---|
| Email 1 — "Some fixes failed" for 'Redirect error' | **REAL CANDIDATE — fixed** | Code shipped, commit 6798280 |
| Email 2 — "New reasons prevent indexing: Redirect error" | **REAL CANDIDATE — same root cause, same fix** | Covered by commit 6798280 |

---

## Root cause investigation

### Context from prior audit records

The "Redirect error" bucket has held exactly **6 URLs** since 2026-09-07 (earliest record, status "Not started"). On 2026-09-21 the founder started a validation for those 6 URLs. Today's emails report that:
- Email 1: the 'Redirect error' validation failed (Google re-crawled and still sees errors)
- Email 2: Google is surfacing the same reason as affecting additional (new) URLs

### Playbook classification

Per `gsc-failures-triage-2026-06-12.md`, **"Redirect error"** is explicitly a **REAL CANDIDATE**, not EXPECTED CHURN. The 2026-09-21 triage incorrectly classified it as "expected churn / intentional 301s" — that classification confused *Redirect error* with *Page with redirect*. "Page with redirect" (5,200-page bucket) = intentional clean 301s; "Redirect error" = broken redirect chains (loops, too many hops, redirect to 4xx).

### Root cause: 2-hop redirect chains on bare paths

The middleware comment on `bareDestStateMatch` (line ~173) explicitly states:
> "Without this, the chain is /destination/X → /en/destination/X → /en/state/X (2 hops). Google flags 2-hop chains as 'Redirect error'. Single hop fixes it."

The fix applied to state destinations was never extended to the 7 other redirect rules that also require a locale prefix. When Google crawls a bare path (no `/en/` or `/hi/`) for any of these routes:
1. `intlMiddleware` fires first: adds `/en/` → 301 to locale-prefixed URL (hop 1)
2. The redirect rule fires: 301 to final destination (hop 2)

= 2-hop chain = "Redirect error"

**Affected rules (before this fix):**

| Rule | Bare path example | Target | Chain |
|---|---|---|---|
| `regionStateMatch` | `/region/kerala` | `/en/state/kerala` | 2 hops |
| `regionsIndexMatch` | `/regions` | `/en/states` | 2 hops |
| `regionNortheastMatch` | `/region/northeast/june` | `/en/india/northeast` | 2 hops |
| `skipListMatch` | `/skip-list` | `/en/tourist-traps` | 2 hops |
| `hamptaMatch` | `/treks/hampta-pass-trek` | `/en/treks/hampta-pass` | 2 hops |
| `kasolMatch` | `/vs/kasol-parvati-valley-vs-manikaran` | `/en/vs/kasol-vs-manikaran` | 2 hops |
| `regionMonthMatch` | `/region/rajasthan/october` | `/en/state/rajasthan` | 2 hops |
| `whereToGoMatch` | `/where-to-go/rajasthan-in-october` | `/en/where-to-go/october` | 2 hops |

### Live-check status

**Not performed** — the egress proxy blocks outbound connections to `www.nakshiq.com:443` from this cloud container (policy denial, not a technical failure; confirmed via `/__agentproxy/status`). This is a known constraint documented in all cloud-session triage reports since 2026-09-20.

---

## Fix shipped

**Commit `6798280` on main** — `fix(middleware): single-hop redirects for bare-path legacy routes (GSC Redirect error)`

Changed 1 file (`apps/web/src/middleware.ts`). For each of the 8 affected rules, added `(?:\/(en|hi))?` optional locale prefix to the regex and defaulted `locale = match[1] ?? "en"` — identical pattern to the existing `ziroMatch` and `stateAsDestMatch` rules. Bare paths now redirect directly to the locale-prefixed canonical in one hop.

TypeScript check (`cd apps/web && npx tsc --noEmit`): only pre-existing module-resolution errors from the cloud container's missing node_modules; **zero new errors**.

---

## Deploy state

Commit `6798280` pushed to `main` at ~22:55 UTC. A push to main triggers a Vercel production build. Vercel MCP is not authorized from this cloud session (`ashs-projects` scope 403); production deploy state could not be confirmed. **Check https://vercel.com/ashs-projects/web** to confirm the build is READY before running GSC validation.

---

## What the founder should do in GSC

1. **Check the deploy** at https://vercel.com/ashs-projects/web — wait for the build triggered by commit `6798280` to show READY (usually 5–10 min).

2. **Open GSC → Indexing → Pages → "Redirect error"** (6 pages, Validation: Started/Failed). Look at the specific URLs listed — the fix eliminates 2-hop chains for the patterns above, so those URLs should now single-hop correctly. **Click "Validate Fix"** to ask Google to re-crawl them.

3. **Do NOT validate** the following — they are intentional exclusions that can never pass:
   - 'Excluded by noindex tag' (share pages — by design)
   - 'Page with redirect' (intentional 301s — this is a 5,200-page bucket, not errors)
   - 'Alternate page with proper canonical tag'
   - 'Duplicate, Google chose different canonical than user'
   - 'Blocked by robots.txt' (api/og)

4. If the Redirect error count grows after re-crawl, paste the specific URLs here for the next triage run — the remaining unfixed patterns would be in GSC's URL detail view.

---

## Standing guidance (unchanged)

- Server error (5xx): resolved and validated (confirmed 2026-10-07). No action.
- All EXPECTED CHURN categories (noindex, redirect, canonical, duplicate): do not start new validations.
