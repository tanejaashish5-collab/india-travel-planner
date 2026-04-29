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

## Active work — North-to-south eateries + stays backfill

Plan: `~/.claude/plans/smooth-orbiting-music.md` (full workflow — read before dispatching agents). Strict state-by-state, north-to-south. Per-dest scope = `local_eateries` + `local_stays` + `destination_stay_picks`. Tools: `seed-eateries.mjs` (eateries → SQL/upsert) + `curate-stays.mjs --ids X` (Haiku research → Sonnet voice for picks). All research output lives at `data/research/eateries/{state}-*.json`.

| State | Status | Date | Coverage |
|---|---|---|---|
| Ladakh | ✓ done | 2026-04-29 | 14/14 dests · 93 eateries · 42 stays (100% sourced + 100% manual, 5 honest-scarcity nulls — 4 Umlingla pass + 1 Tso Moriri dup) |
| Jammu & Kashmir | ✓ done | 2026-04-28 | 17/17 dests · 98 eateries · 34 stays (100% sourced, 4 honest-scarcity nulls — 3 Sinthan Top no-infra, 1 Yusmarg xfactor dedup) |
| Himachal Pradesh | eateries done · stays NOT audited | 2026-04-27 | 32/34 dests · 286 eateries · 118 stays (9 manual + **109 un-audited web_search** ← BIGGEST BACKLOG) |
| Uttarakhand | eateries done · stays NOT audited | 2026-04-27 | 38/38 dests · 316 eateries · 117 stays (18 manual + **99 un-audited web_search** ← BACKLOG) |
| Punjab + Haryana + Chandigarh | ✓ done | 2026-04-28 | 8/8 dests · 69 eateries · 24 stays (100% sourced, 2 honest-scarcity nulls in Anandpur Sahib) |
| Rajasthan | ✓ done | 2026-04-29 | 23/23 dests · 105 eateries · 70 stays (100% sourced + 100% manual, 4 honest-scarcity nulls — all in Deeg) |
| Uttar Pradesh | ✓ done | 2026-04-29 | 13/13 dests · 98 eateries · 44 stays (100% sourced, 4 fabrications caught — Hosteller Sarnath, Dudhwa Sarai Homestay + Teli Jungle Camp, Brijwas Dham address rewrite) |
| Bihar | ✓ done | 2026-04-28 | 6/6 dests · 36 eateries · 13 stays (100% sourced, 11 honest-scarcity nulls) |
| Jharkhand | ✓ done | 2026-04-28 | 4/4 dests · 15 eateries · 13 stays (100% sourced, 78% fabrication rate caught) |
| West Bengal | ✓ done | 2026-04-28 | 6/6 dests · 38 eateries · 20 stays (100% sourced, 4 honest-scarcity nulls) |
| Sikkim | ✓ done | 2026-04-28 | 11/11 dests · 19 eateries · 21 stays (100% sourced, 4 dests honest-scarcity `[]` for restricted high-altitude lakes/NP) |
| Arunachal Pradesh | ✓ done | 2026-04-28 | 11/11 dests · 22 eateries · 25 stays (100% sourced, 6 honest-scarcity nulls + Bhalukpong/Dambuk eateries `[]`, 61% fabrication rate caught — 7 cross-state contaminations) |
| Nagaland | **next** | - | TBD (Kohima + Mokokchung + Mon + Dzukou + Khonoma + Tuophema — Hornbill Festival belt) |

**Per-state quality bar (going forward)**: Each session ships eateries (greenfield/backfill via 1-2 agents) **AND** stays (audit + replace fabricated picks via 1 agent, target 100% sourced) in the same session. Total budget ≤3 agents per state (cost-aware rule). **All research via WebFetch/WebSearch agents — NEVER curate-stays.mjs (Anthropic API/Haiku) per 2026-04-28 user instruction.**

**Eateries progress**: 12 state clusters done (eateries side), 183 dests, 1195 eateries. Per-state details in session memory files — see `MEMORY.md` index.

**Stays progress (HONEST 2026-04-29 audit + ongoing backlog burndown)**: 10 state clusters truly 100% manual-audited (**Bihar+Jharkhand+West Bengal+Sikkim+Arunachal Pradesh+Punjab+Haryana+Chandigarh+Jammu & Kashmir+Uttar Pradesh+Rajasthan+Ladakh** — unified workflow). **2 clusters with stays-audit BACKLOG = 208 unaudited `web_search` picks remaining**: HP 109, UK 99. Plan: 1 stays-audit agent per cluster, manual WebFetch only, ~1 cluster per session. Order: smaller-first (UK → HP).

## Cost-aware operating rules (added 2026-04-27)

The previous session ran 79 sub-agents in one day and burned 50% of weekly Claude usage. **Reduce sub-agent fan-out**:
- Prefer **1 agent for 5-8 dests** over 3-5 parallel agents per dest
- Use Bash + grep + jq directly when possible — sub-agent only when the task genuinely needs an LLM (research, synthesis)
- Don't `/compact` repeatedly in long sessions; **start a fresh session per state** instead
- Avoid Playwright screenshots unless visual debugging is critical (each is base64 image data, very expensive)

## Pending user-action items (Claude can't do these)

- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope)
- Sprint 7b: run `node scripts/log-citation-baseline-2026-04-24.mjs`; click "Run now" on the 3 Cowork scheduled tasks
- Wikidata COI: add independent press references via P248/P1343 statements as press pickups land
- GSC URL Inspection for top 5 non-prefixed URLs (e.g., `nakshiq.com/destination/kumbhalgarh/may`) to accelerate /en/ canonical consolidation
