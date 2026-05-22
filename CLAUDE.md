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

## Pending user-action items (Claude can't do these)

- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope)
- Sprint 7b: run `node scripts/log-citation-baseline-2026-04-24.mjs`; click "Run now" on the 3 Cowork scheduled tasks
- Wikidata COI: add independent press references via P248/P1343 statements as press pickups land
- GSC URL Inspection for top 5 non-prefixed URLs (e.g., `nakshiq.com/destination/kumbhalgarh/may`) to accelerate /en/ canonical consolidation
