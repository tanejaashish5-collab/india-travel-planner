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
- i18n messages: `apps/web/src/messages/en.json` and `hi.json`

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

## Scrape storage convention (added 2026-05-28)

**ALL YouTube scrapes go in `.scrapes/youtube/yt-<videoId>/` at the project root.** This holds yt-dlp output (info.json, .vtt, .description, thumbnail) + derived files (`metadata.json`, `transcript-timestamped.txt`, `transcript-prose.txt`, `by-chapter/`). Whenever you (or any sub-agent you dispatch) scrape a YouTube URL, write under this path — never to a one-off folder. Other source types (web pages, PDFs, social) get sibling folders under `.scrapes/` (`.scrapes/web/`, `.scrapes/social/`, etc.). The `.scrapes/` directory is gitignored. Pipeline reference: `session_2026_05_28_yt_scrape_pipeline_and_storage_convention.md` in project memory.

## Pending user-action items (Claude can't do these)

- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope)
- Sprint 7b: run `node scripts/log-citation-baseline-2026-04-24.mjs`; click "Run now" on the 3 Cowork scheduled tasks
- Wikidata COI: add independent press references via P248/P1343 statements as press pickups land
- GSC URL Inspection for top 5 non-prefixed URLs (e.g., `nakshiq.com/destination/kumbhalgarh/may`) to accelerate /en/ canonical consolidation
- 🚨 **GSC URL Inspection on `nakshiq.com/destination/hemkund-sahib/june` — 6 weeks running** (verified 2026-05-28: 301 + canonical + hreflang all correct, Google still won't consolidate). Open https://search.google.com/search-console/inspect?resource_id=https://www.nakshiq.com/&id=https://www.nakshiq.com/destination/hemkund-sahib/june → "Request Indexing" on BOTH the un-prefixed and the `/en/` variant. Costs 14 clicks/week to wrong canonical until resolved. 2 min of work.
- **Peak-alert hook conversion (check on 2026-05-29 GA4 audit)**: 2026-05-27=192/0, 2026-05-28=176/0. Tomorrow's audit confirms the 3rd consecutive 0%-conversion day. Component verified bug-free 2026-05-28 ([peak-alert-hook.tsx](apps/web/src/components/peak-alert-hook.tsx)). The 2026-05-22 rewrite (off-month-aware headline) was already attempt #2 — another copy A/B won't fix it. Structural fix needed: the offer "email for one future reminder" is too lopsided when the headline already pre-answers the month question. Ship one of: (1) "save this destination" localStorage toggle, prompt email at 3 saves; (2) remove email field, replace with browser notification opt-in; (3) move hook lower on the page where engagement-time signals real interest.
- **Title-override tranche 2 ready for review (2026-05-28)**: 10 new entries appended to `data/cro/title-overrides.csv` as pending. Review draft: `data/cro/title-overrides-review-2026-05-28.md`. Apply with `node scripts/apply-title-overrides.mjs --commit --revalidate`.
- **GSC Coverage/Indexing weekly paste**: open GSC Coverage dashboard, run `node scripts/patch-gsc-indexing.mjs --indexed N --not-indexed N` after today's GSC audit so the M2 indexed-pages monitor has fresh data. Without this, M2 silently skips.
