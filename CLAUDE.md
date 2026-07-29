# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NakshIQ — India travel confidence engine. Monorepo with Next.js 16 web + Expo (React Native) mobile, Supabase (PostGIS) backend, bilingual (en/hi), deployed on Vercel.

## Commands

Package manager pinned to `npm@11.9.0` — do not switch to pnpm/yarn.

```bash
# Dev
npm run dev          # Both apps via Turborepo
npm run build
npm run lint
npm run type-check

# Web only
cd apps/web && npm run dev
cd apps/web && npm run build

# Mobile only
cd apps/mobile && npx expo start

# Database
npm run db:migrate   # supabase db push
npm run db:seed

# E2E (Playwright) — needs BASE_URL env
BASE_URL=http://localhost:3000 npm test
BASE_URL=http://localhost:3000 npx playwright test -g "<title>"
```

## Architecture

Monorepo (npm workspaces + Turborepo):
- `apps/web` — Next.js 16 App Router, Tailwind v4, shadcn/ui, Geist fonts
- `apps/mobile` — Expo 54, RN 0.81, expo-router
- `packages/shared` (`@itp/shared`) — types, Supabase clients, queries, i18n
- `supabase/` — migrations 001-031, seed scripts
- `scripts/` — data-maintenance utilities (run with `node scripts/<name>.mjs`)

**Routing**: web routes under `apps/web/src/app/[locale]/` via `next-intl`. Locales: `en` (default), `hi`. Middleware `src/middleware.ts` handles locale routing + 307→301 conversion.

**Components**: live flat in `apps/web/src/components/` — one file per component, no nested folders.

**Per-app overrides**: `apps/web/CLAUDE.md` loads `apps/web/AGENTS.md` (Next.js 16 docs warning + voice rules). Check for nested CLAUDE.md/AGENTS.md when working in subpaths.

## Data Conventions

- Destination data in Supabase with JSONB columns (`confidence_cards`, etc.)
- **All data must be real and verifiable** — zero fabricated phones, contacts, statistics. Honest scarcity (`[]`) preferred over fabrication.
- Verify JSONB field names against `canonical_schema.md` in memory before inserting state data
- **After ANY DB write that changes rendered pages, run `node scripts/verify-touched-pages.mjs --dest <slugs>` (or `--url`) against every touched page — verify the RENDERED page, not just the data.** Born 2026-06-10: a confidence_cards backfill stored honest NULLs, the card renderer wasn't null-safe, and 14 destination pages 500'd until the founder noticed. Two gotchas: (1) read the consuming component's null-handling BEFORE writing rows — don't trust script comments claiming the renderer is defensive; (2) a green check on a CACHED page proves nothing (katra only 500'd when its ISR cache expired hours post-write) — check the AGE column, pass `--revalidate` (needs `NEWSLETTER_SEND_SECRET`), or rely on the `canary-probe` cron (every 30 min) catching the delayed class.
- **When a data-shape/NULL change crashes ONE component consuming a shared JSONB column, grep EVERY consumer of that column and add the broken page family to the canary before closing the incident.** The 06-10 confidence_cards fix missed `with-kids-content.tsx` (identical `typeof null === "object"` bug), which served 500s on 22 destinations for 24 days, invisible to the canary. `typeof x === "object"` is null-safe ONLY after a truthy check. (2nd occurrence 2026-07-04; promoted to rule by dream proposal 2026-07-13.)
- **Any scheduled/headless audit session MUST commit + push the audit files it writes via `bash scripts/audit-commit-guard.sh -m "<msg>" <paths…>` before ending — never a bare `git commit`.** `audit-snapshots.json` is built by the apps/web prebuild from COMMITTED audit files only; uncommitted audit runs silently freeze the GSC indexing snapshot. Bit us identically twice (2026-06-11, 2026-07-13), then a third time on 2026-07-29 in a new way — and the third time exposed that "just commit it" was never sufficient:
  - **A bare `git commit` can fail while every signal reports success.** A session crashed 2026-07-27 21:12 leaving 0-byte `.git/index.lock` + `.git/HEAD.lock`; every local commit for two days died on the lock and nothing checked the exit code. (Cloud routines kept pushing fine, which is why it looked like an unanswered question rather than a broken machine.) The guard clears *provably* stale locks (no live git process, empty or >10m old), refuses to touch fresh ones, and verifies HEAD actually moved and the files are IN the commit.
  - **Committing an audit could never, by itself, trigger the build that consumes it.** `apps/web/vercel-ignore.sh` excluded `gsc-audits/` and every `.md`, so audit-only commits were skipped at the ignore step (`errorLink: ignored-build-step`) — past audits only built by riding along on unrelated code commits. **Fixed at source 2026-07-30:** the ignore script now tests `gsc-audit-*.md` / `ga4-audit-*.md` FIRST and always builds for them, at the deliberate cost of one extra build per audit day. Do not re-add those paths to its exclude list.
  - **Never infer that a commit landed.** Check that HEAD moved, that the files are in the new commit, and that the remote advanced — which is exactly what the guard does. A green log line is not evidence.
- i18n messages: `apps/web/src/messages/en.json` and `hi.json`
- **Verified-data backfills that write to `destinations` should also bump `content_reviewed_at` for the rows they touch.** The `destinations_updated_at` trigger bumps `updated_at` on every write, and the freshness-drift cron treats `updated_at > content_reviewed_at` as editorial review-debt. A verified backfill IS a review of that data, so stamp `content_reviewed_at = now()` on the touched rows (or disable the trigger and set it `= updated_at`) — otherwise every data sweep re-inflates the Monday "REVIEW NEEDED" digest. There's a 21-day grace window, so transient drift is fine; persistent drift is the signal.

## Environment

See `env.example`. Key vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `ABLY_API_KEY`, `RAZORPAY_KEY_ID/SECRET`.

## Next.js 16 Warning

This repo uses Next.js 16 — breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing any Next.js API code.

## Deployment

After every git push, force deploy to Vercel immediately. Web app is the primary deployment target.

## Sprint History

The 18-sprint R1-R4 roadmap is fully closed (Sprints 1-14 + GSC sweep + 13a/13b parity). Monetisation 15-17 is gated until 100K MUV + 2K email list. **For sprint detail, commits, and historical decisions see [docs/sprint-history.md](docs/sprint-history.md).** Do not re-derive from git log.

## Eateries + stays backfill — COMPLETE

The national north-to-south `local_eateries` + `local_stays` + `destination_stay_picks` backfill is **done** — 478 destinations across 29 state/UT clusters, all carrying verified, 3+-sourced data (2629 eateries). Per-state coverage, fabrication catches, and the audit workflow are archived in **[docs/sprint-history.md](docs/sprint-history.md)** — do not re-derive.

If reopened: eateries + stays ship in the same session, ≤3 agents per state (cost-aware rule below), all research via WebFetch/WebSearch agents — **NEVER `curate-stays.mjs`** (metered Anthropic API, per 2026-04-28 user instruction). Parked next phases: Hindi parity for new eatery editorial (`translate-eateries.mjs`), and POI / sub_destinations / festivals backfill.

## Cost-aware operating rules (added 2026-04-27)

The previous session ran 79 sub-agents in one day and burned 50% of weekly Claude usage. **Reduce sub-agent fan-out**:
- Prefer **1 agent for 5-8 dests** over 3-5 parallel agents per dest
- Use Bash + grep + jq directly when possible — sub-agent only when the task genuinely needs an LLM (research, synthesis)
- Don't `/compact` repeatedly in long sessions; **start a fresh session per state** instead
- Avoid Playwright screenshots unless visual debugging is critical (each is base64 image data, very expensive)
- **Run research/scraping sub-agents on Haiku, not Opus.** Pass `model: haiku` to the `Agent` tool (or pick Haiku for `Explore`/`general-purpose`) whenever the task is web research, scraping, log-reading, or data extraction — the heavy token cost is reading sources, and Haiku reads them just as well before returning a short summary. Reserve Opus/Sonnet sub-agents for genuine synthesis/judgement. This is separate from the `curate-stays.mjs` ban (that bans the metered Anthropic API; this is about in-session sub-agent model choice).

## Supabase egress rules (added 2026-05-23 after the free-tier freeze)

The 2026-05-22 Hindi DB re-pass dumped ~5,800 rows through the REST API and pushed the org past the 5.5 GB free-tier egress cap. The API 402'd for hours, poisoned Vercel's landing-page ISR cache, and cost a $25 Pro upgrade to recover. Rules to keep egress sane (incident memory: `session_2026_05_23_supabase_egress_freeze_and_isr_recovery.md`):

- **Bulk dumps (>500 rows) MUST go over the direct Postgres connection (port 5432), not the REST API.** Use `pg_dump`, `psql`, or the `pg` npm package. REST API egress counts toward the billing cap; direct Postgres does not (different metering).
- **In-place transforms beat dump-and-apply.** Prefer `UPDATE … SET col = …` over "dump rows out, transform, apply back" — the round-trip doubles egress.
- **Watch egress weekly during downgrade-evaluation months.** The Supabase public Management API doesn't expose usage data with a PAT (only the dashboard does, via session-cookie endpoints). Practical weekly check: ask Claude Code "check Supabase egress" — Claude has MCP access to `get_logs api` for request-pattern signals + can prompt you to glance at the dashboard at `https://supabase.com/dashboard/project/dudzsdzfvikjjhurxrgc/settings/billing/usage`. Free-tier safe zone is < 4 GB/mo (leaves 1.5 GB headroom on the 5.5 GB cap).
- **After any Supabase outage / 402 / freeze, force-rebuild Vercel.** ISR caches survive the recovery — landing page especially. Pattern: empty commit on main, e.g. commits `0e0ba3e7`, `14aad82d`, `1ee1fb0c`. Alternative: `POST /api/admin/revalidate?path=/en` with `Authorization: Bearer $NEWSLETTER_SEND_SECRET` (founder runs this; secret is Vercel-only).
- **Scripts directory bias**: 226 of ~230 scripts use the REST client (`@supabase/supabase-js`), only 4 use direct Postgres (`_apply-telangana-widget-s44.mjs`, `backfill-honest-scarcity.mjs`, `_apply-migration-038.mjs`, `_apply-assam-widget-s40.mjs`). The pattern to copy when writing a new bulk script is in those 4.
- **For any new >100-row write, use `scripts/_lib/pg-bulk.mjs` → `withPgTransaction(async (client) => { … in-place UPDATEs … })`.** It opens a direct-Postgres (5432) transaction, commits/rolls-back for you, honours `DRY=1`, and auto-busts the reference caches on success (see Reference-data caching below). This is the codified "bulk dumps go over direct Postgres, in-place UPDATE beats dump-and-apply" rule — REST dump-and-apply is what spilled 514 GB of query temp files behind the 2026-06-04 Disk IO alert. Run with `node --env-file=apps/web/.env.local scripts/<name>.mjs`. Needs `SUPABASE_DB_URL` in the env file.

## Reference-data caching (added 2026-06-04 after the Disk IO / temp-spill alert)

`@supabase/supabase-js` bypasses Next's fetch cache, so a bare `supabase.from(...).select(...)` in a page/component/route hits PostgREST on **every render** — ~1.5M uncached list reads drove the 2026-06-04 Disk IO/temp-spill alert (incident memory: `reference_supabase_disk_io_temp_spills.md`).

- **Read reference lists (destinations / collections / states / global search index) through `apps/web/src/lib/cached-data.ts`** — `unstable_cache` accessors (`getCachedDestinationsIndex/CollectionsIndex/States/SearchIndex`), 24h revalidate, tagged `ref-*`. They page past PostgREST's 1000-row cap, so the index is complete. Never add a fresh `supabase.from("destinations"|"collections"|"states")` list read in a page/component/route — extend the cached layer instead.
- **The 3 client search surfaces (search-command, mobile-search, landing-hero) load the shared `/api/search-index` once via `useSearchIndex` and filter client-side.** Do NOT reintroduce per-open/per-keystroke `supabase.from(...)` in the browser.
- **After any reference-data write, bust the caches.** Automatic if you use `withPgTransaction` (above); otherwise `node --env-file=apps/web/.env.local scripts/bust-reference-cache.mjs`. Note: `revalidateTag` does NOT purge the Vercel CDN copy of `/api/search-index`, so a new destination appears in search within ~5 min (its `s-maxage`), while ISR pages refresh in seconds.

## Research wiki convention (added 2026-07-07)

**`research-wiki/` is the cross-linked brain over all business-idea / creator / opportunity research** (Karpathy LLM-wiki pattern; schema + routing in `research-wiki/CLAUDE.md`). Two standing rules: (1) any session asking "what do we know about X / is idea Y worth doing" reads `research-wiki/index.md` FIRST before re-researching; (2) any session that writes a findings doc to `data/research/` ends by ingesting it into the wiki (concept pages + a `sources/` page + index/log update — same muscle as writing session memory). Ingest with Sonnet/Opus, never Fable. Raw scrapes stay in `.scrapes/` — never batch-ingest them.

## Scrape storage convention (added 2026-05-28)

**ALL YouTube scrapes go in `.scrapes/youtube/yt-<videoId>/` at the project root.** This holds yt-dlp output (info.json, .vtt, .description, thumbnail) + derived files (`metadata.json`, `transcript-timestamped.txt`, `transcript-prose.txt`, `by-chapter/`). Whenever you (or any sub-agent you dispatch) scrape a YouTube URL, write under this path — never to a one-off folder. Other source types (web pages, PDFs, social) get sibling folders under `.scrapes/` (`.scrapes/web/`, `.scrapes/social/`, etc.). The `.scrapes/` directory is gitignored. Pipeline reference: `session_2026_05_28_yt_scrape_pipeline_and_storage_convention.md` in project memory.

## Pending user-action items (Claude can't do these)

- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope)
- Sprint 7b: run `node scripts/log-citation-baseline-2026-04-24.mjs`; click "Run now" on the 3 Cowork scheduled tasks
- Wikidata COI: add independent press references via P248/P1343 statements as press pickups land
- ✅ **GSC URL Inspection for top 5 non-prefixed URLs — RESOLVED, re-verified 2026-07-27 (8th consecutive weekly check, stable since 2026-05-18).** All 5 (kumbhalgarh/vrindavan/yercaud/chakrata/pondicherry × may) still show Google's selected canonical correctly pointing at `/en/` via `node scripts/gsc-inspect-sweep.mjs --url <url>` (no dashboard, no Chrome). New this run: NOT fully dormant anymore — `yercaud/may` got a fresh Googlebot re-crawl (`lastCrawlTime` jumped 07-02→07-20), the first of the 5 to be re-visited since the "fully settled" streak began; the other 4 remain byte-identical to 07-20. Outcome unchanged either way — still resolves correctly to `/en/`. No Request Indexing action taken — the URLs are already consolidated, so submitting one would be a no-op that just spends GSC's daily quota. Apr-27-snippet-rewrite CTR check (6th re-run, `scripts/_gsc-ctr-check-2026-07-27.mjs`) is mostly unchanged but with two real data points worth tracking: still unreadable for 5 of 6 target queries (hard-seasonal "X in may" searches, 0% pre-window CTR baseline, re-test May 2027); `darjeeling june weather` broke its 4-run improving streak this week (11.5→9.6→8.7→8.3→**10.0**) on a thin 2-impression window — read as sampling noise, not a real reversal, but watch next run; zero clicks across all 6 queries in every window, pre- and post-deploy alike, unchanged. The `vrindavan/may` page-position swing flagged last week (15.6→28.6) did NOT compound further — it held flat at 28.2 this week on rising impressions (26→33), so that's read as a new stable off-season baseline rather than an active regression. **Recommend disabling the `gsc-canonical-consolidation` scheduled task** (Mondays 9:05 PM) **for the 6th consecutive time**: the 2026-06-22, 06-29, 07-06, 07-13, and 07-20 runs already reached the same operational conclusion (no action needed) — this week's minor new data points (yercaud re-crawl, darjeeling dip) don't change that. Ongoing indexing health is already covered by the weekly `gsc-inspect-sweep --patch` + `canary-probe` crons. Left the task enabled since this run's brief didn't authorize disabling automations — founder decision needed to actually turn it off (see `gsc-audits/scheduled-2026-07-27-canonical-consolidation.md`).
- ✅ **hemkund-sahib canonical consolidation — RESOLVED, verified 2026-06-10 via URL Inspection API**: `/en/destination/hemkund-sahib/june` = "Submitted and indexed"; the un-prefixed URL = "Page with redirect" with googleCanonical pointing at `/en/`. No founder action needed. Per-URL checks are now `node scripts/gsc-inspect-sweep.mjs --url <url>` (no dashboard).
- ✅ **Peak-alert hook conversion — RESOLVED 2026-06-10 (PR #25, `eca3a294`, live).** The "0 saves" was NOT a copy problem and the component was NOT bug-free: the real root cause was a mount gate `peakMonth && score >= 4` in [destination-month.tsx](apps/web/src/components/destination-month.tsx) that rendered the one-tap Save CTA only on GO-months, hiding it from every high-traffic WAIT/off-month page — exactly where the hook's strongest off-month "wrong month, save for the right window" pitch (dead code until now) applies. Verified on prod: the Save button fires `save_destination` correctly; the gate was the sole cause. Dropped the gate → Save CTA now renders on all peak-month-bearing dest×month pages.
- ✅ **Title-override tranche 2 — APPLIED 2026-06-07, nothing pending** (apply-log: 10 overrides darjeeling/landour/mussoorie/igatpuri/ajmer/pachmarhi/gulmarg/bhandardara/hogenakkal/varkala; the CSV status-flip just wasn't committed until now). All 42 overrides are live. The GSC "title CRO" leakers (mahabaleshwar/june, chakrata/june, barot-valley/june, jaipur/july) ALREADY have live custom titles — their ~0.5% CTR is a **position-~9 ceiling + honest "skip/wait" verdicts** doing their job, NOT a missing-title gap. The lever for those pages is **ranking** (internal links / depth), not more title rewrites. Do NOT re-flag "apply the tranche" in daily audits.
- ✅ **GSC Coverage/Indexing weekly paste — AUTOMATED 2026-06-10**: `node scripts/gsc-inspect-sweep.mjs` (stratified URL Inspection sample, ~120 URLs, well under the 2K/day quota) estimates Indexed/Not-indexed with a 95% CI and patches the audit file itself (`--source inspection-sample` footnote marks it as estimated). Run it in the weekly GSC audit session instead of the dashboard paste; the manual dashboard read remains the ground-truth fallback.
- ✅ **`/vs/` kasauli + dhanaulti pairings — ALREADY COVERED, verified 2026-06-11.** The 06-11 GSC audit recommended shipping `kasauli-vs-shimla` / `kasauli-vs-chail` / `kasauli-vs-kufri` / `lansdowne-vs-dhanaulti` — all four already exist (two in reversed slug order: `shimla-vs-kasauli`, `chail-vs-kasauli`; kufri shipped 06-10 in PR #26; lansdowne-vs-dhanaulti in the generated list) and all were live-verified 200 on prod. **Before any audit recommends "ship pair X", grep BOTH slug orders in `apps/web/src/lib/vs-pairs.ts` + `vs-pairs.generated.ts`.** Never add a reversed-order duplicate of an existing pair — each `/vs/` page self-canonicalizes to its own slug, so a second order = duplicate content competing with itself. The lever for ranking comparison queries that already have pages is internal links/depth, not new pages.
