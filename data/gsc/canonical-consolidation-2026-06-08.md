# GSC Canonical Consolidation — Scheduled Run 2026-06-08

**Task**: 48-hour follow-up to the 2026-04-27 GSC snippet rewrite + cache prewarm — submit top 5 non-prefixed URLs to GSC URL Inspection to nudge canonical consolidation onto the `/en/` prefixed versions.

> Note: The scheduled task file was authored on/around 2026-04-29 (48 hours after the April 27 deploy). Today is 2026-06-08, so this run is ~6 weeks late — the consolidation window the task targeted has long since opened (and per CLAUDE.md, hemkund-sahib/june is still stuck after 6 weeks). Treating this as a fresh re-poke run regardless.

---

## 1. Server-side signal verification (passed)

All 5 target URLs return correct 301 + canonical to the `/en/` variant. No infrastructure regression — Google has nothing to be confused about:

| Non-prefixed URL | 301 → | Canonical tag | Vercel cache |
|---|---|---|---|
| `/destination/kumbhalgarh/may` | `/en/destination/kumbhalgarh/may` (HTTP 301) | `https://www.nakshiq.com/en/destination/kumbhalgarh/may` | MISS |
| `/destination/vrindavan/may` | `/en/destination/vrindavan/may` (HTTP 301) | `https://www.nakshiq.com/en/destination/vrindavan/may` | STALE |
| `/destination/yercaud/may` | `/en/destination/yercaud/may` (HTTP 301) | `https://www.nakshiq.com/en/destination/yercaud/may` | MISS |
| `/destination/chakrata/may` | `/en/destination/chakrata/may` (HTTP 301) | `https://www.nakshiq.com/en/destination/chakrata/may` | MISS |
| `/destination/pondicherry/may` | `/en/destination/pondicherry/may` (HTTP 301) | `https://www.nakshiq.com/en/destination/pondicherry/may` | MISS |

Curl method: `curl -sIL <url>` for redirect chain + `curl -sL <url> | grep canonical` for the rendered `<link rel="canonical">`. All 5 verified at 2026-06-08.

The Vercel cache states are noise (these are non-canonical URLs, mostly uncached) — not a blocker.

## 2. GSC URL Inspection — BLOCKED, manual action required

I could not complete the URL Inspection / "Request Indexing" step. The property-owning Google account is not signed in to Chrome on this machine.

**Account state (from Chrome AccountChooser):**
- `flowcommandmanager@gmail.com` — signed in
- `taneja.ashish5@gmail.com` — signed in
- `wealthmythic@gmail.com` — signed in (authuser=5; GSC returns "Oops, you don't have access to this property")
- `starterpodsite@gmail.com` — signed in
- `humanityunboxedmanager@gmail.com` — signed in
- `kiddiequestmanager@gmail.com` — signed in
- **`ashish@forgevoice.studio` — SIGNED OUT** ← this is the property owner per memory (`feedback_google_account_for_nakshiq.md`)

Probed `search.google.com/u/0/...` and `/u/5/...` — `u/0` bounces to the GSC marketing splash (no properties), `u/5` (wealthmythic) returns the explicit no-access page. Did not probe every authuser index to keep the run cheap, but the signal is clear: the only account that owns `sc-domain:nakshiq.com` is signed out.

**Sign-in is a `prohibited` action for me** (password entry into any field). I cannot complete this autonomously.

### Manual action for the user (≤3 min)

1. Open Chrome → account avatar → **sign in to `ashish@forgevoice.studio`** (Chrome remembers it; just enter the password).
2. Open this URL (it auto-routes to the right authuser once signed in): https://search.google.com/search-console?resource_id=sc-domain%3Anakshiq.com
3. For each of the 5 URLs below, paste into the top URL Inspection bar, wait for the report, click **"REQUEST INDEXING"** if not already consolidated:
   - https://www.nakshiq.com/destination/kumbhalgarh/may
   - https://www.nakshiq.com/destination/vrindavan/may
   - https://www.nakshiq.com/destination/yercaud/may
   - https://www.nakshiq.com/destination/chakrata/may
   - https://www.nakshiq.com/destination/pondicherry/may
4. Same property, **also do hemkund-sahib/june** while you're in there — per CLAUDE.md it's been stuck 6 weeks despite verified-correct 301+canonical+hreflang (your pending-actions list flags this as 2 minutes of work for 14 wrong-canonical clicks/week).

For each: note the "User-declared canonical" vs "Google-selected canonical" lines in the report — if they match (both point at `/en/...`), consolidation is already done and Request Indexing is a no-op. If Google-selected differs, the Request Indexing nudge is exactly what's needed.

## 3. Performance check (Apr 27 snippet rewrites) — also blocked

Same blocker. The check the task wants: open GSC Performance, filter to last 30 days, compare CTR on these queries vs the pre-Apr-27 baseline:
- `vrindavan temperature in may`
- `yercaud weather in may`
- `chakrata temperature in may`
- `kanatal in may`
- `pondicherry weather in may`
- `darjeeling june weather`

After signing in (step 1 above), the URL is: https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Anakshiq.com — use the "Queries" tab, filter each query, scope to "Last 3 months" to see the pre/post-Apr-27 delta.

## 4. Memory note worth correcting

`feedback_google_account_for_nakshiq.md` says "Always use ashish@forgevoice.studio (authuser=5)". On this Chrome profile today, **authuser=5 = wealthmythic@gmail.com**, not ashish@forgevoice.studio. The authuser index is per-profile and depends on sign-in order — don't hard-code it. The reliable selector is the email itself (use the account picker, or `accounts.google.com/AccountChooser`).

---

**Bottom line**: server side is clean; the action that requires a logged-in human (Request Indexing on 5 URLs + a quick Performance glance) is parked on you. ~3 min of work.
