# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NakshIQ — an India travel confidence engine. Monorepo with a Next.js 16 web app and Expo (React Native) mobile app, backed by Supabase (PostGIS). Bilingual (English/Hindi). Deployed on Vercel.

## Commands

Package manager is pinned to `npm@11.9.0` — do not switch to pnpm/yarn.

```bash
# Development (from repo root)
npm run dev          # Starts both web + mobile via Turborepo
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run type-check   # TypeScript checking across all packages

# Web app only
cd apps/web && npm run dev     # Next.js dev server
cd apps/web && npm run build   # Production build

# Mobile app only
cd apps/mobile && npx expo start

# Database
npm run db:migrate   # Push Supabase migrations (supabase db push)
npm run db:seed      # Seed data (tsx supabase/seed/seed.ts)

# E2E tests (Playwright) — require BASE_URL env var
BASE_URL=http://localhost:3000 npm test           # All projects
BASE_URL=http://localhost:3000 npm run test:mobile    # Pixel 5 emulation
BASE_URL=http://localhost:3000 npm run test:desktop   # 1440x900
# Run one test file:
BASE_URL=http://localhost:3000 npx playwright test tests/e2e/<file>.spec.ts
# Single test by title:
BASE_URL=http://localhost:3000 npx playwright test -g "<title substring>"

# Lighthouse CI
npm run lighthouse
```

## Architecture

**Monorepo layout** (npm workspaces + Turborepo):
- `apps/web` — Next.js 16 App Router, Tailwind CSS v4, shadcn/ui, Geist fonts
- `apps/mobile` — Expo 54, React Native 0.81, expo-router
- `packages/shared` (`@itp/shared`) — Shared types, Supabase clients, queries, i18n utilities
- `packages/config` — Shared config (TS, etc.)
- `supabase/` — Migrations `001`–`006` (initial schema, RLS, gap year v1/v2, stay curation, signup trigger fix) and seed scripts
- `scripts/` — Data-maintenance utilities (`upload-images.mjs`, `upload-videos.mjs` → R2, `curate-stays.mjs`, `fetch-east/west/pending.mjs`, `enrich-notes.mjs`, `probe-schema.mjs`). Run with `node scripts/<name>.mjs` or `tsx`.
- `nakshiq-autoposter/` — Python script for automated social media posting

**Routing**: All web routes are under `apps/web/src/app/[locale]/` using `next-intl` for i18n. Locales: `en` (default), `hi`. Middleware in `src/middleware.ts` handles locale routing. API routes live at `apps/web/src/app/api/`.

**Shared package**: `packages/shared/src/` exports types (`destination.ts`, `sos.ts`), Supabase client factories (`createServiceClient`, `createBrowserClient`), and query functions. Imported as `@itp/shared`.

**Key web dependencies**: `@supabase/supabase-js`, `@anthropic-ai/sdk` (AI itinerary), `next-intl`, `framer-motion`, `react-leaflet`, `openai`.

Components live flat in `apps/web/src/components/` — one file per component, no nested folders.

**Per-app overrides**: `apps/web/CLAUDE.md` loads `apps/web/AGENTS.md`, which demands reading `node_modules/next/dist/docs/` before touching any Next.js API (see warning below). Check for nested `CLAUDE.md` / `AGENTS.md` when working in a subpath.

## Data Conventions

- Destination data is stored in Supabase with JSONB columns (`confidence_cards`, etc.)
- All data must be real and verifiable — zero fabricated phone numbers, contacts, or statistics
- When inserting new state/destination data, verify JSONB field names match what the code expects (check `canonical_schema.md` in memory)
- i18n messages: `apps/web/src/messages/en.json` and `hi.json`

## Environment Variables

See `env.example` at repo root. Key vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `ABLY_API_KEY`, `RAZORPAY_KEY_ID/SECRET`.

## Next.js 16 Warning

This repo uses Next.js 16 which has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing any code that touches Next.js APIs. Heed deprecation notices.

## Deployment

After every git push, force deploy to Vercel immediately. The web app is the primary deployment target.

## Sprint Map (as of 2026-04-25)

The 18-sprint roadmap from R1-R4 research reports has been worked through. Here's
the current state — future Claude should refer to this rather than re-deriving
from commit history.

| Sprint | Status | Where it landed |
|---|---|---|
| 1 Decision Layer | ✓ closed | TL;DR card + decision rail + LIVE/SCORED badges. Commits a7769ac, f6dc346 |
| 2 Depth Pilot | ✓ closed | Migrations 014-016 + 3-dest pilot + scenarios table |
| 3 Routes/Scenarios + Tier-1/2/3 backfill | ✓ closed | All 488 dests have full depth schema. Commit 1d14969 |
| 4 Strategic Content Library | ✓ closed | 10-persona hub + collections framing + 14 India-vs profiles. Commits 2bbc229, 3c8815b, 6d705bc, 0d0bb15 |
| 5 Planner Intelligence | ✓ closed | Risk mode + variants + iCal. Commit fa54adb |
| 6 E-E-A-T | ✓ closed | Bylines + /about/team + risk quiz + weather-advisory. Commit 2548735 |
| 7a/7b AI citability | ✓ closed | FAQ × 2700 + Dataset + bot tracker + Wikidata Q139549464 + AIO referrer attribution + Cowork scheduled tasks (health-check daily, citation tracker + Bing scrape weekly). Commits 109837f, 8f761a0, 72bfd0b |
| 8 Quality floor + thin content | ✓ closed | Every dest_month ≥150 chars + states/articles/treks fixed. Commits 21a6e80, 86a09be |
| 9 Cost Index + NakshIQ 100 | ✓ closed | Proprietary moat citation magnets. Commit 0fbfe55 |
| 10 | absorbed into 11 | No standalone commits — likely merged into Sprint 11 nav simplification |
| 11 Nav + perf + homepage | ✓ closed | 7→4 top items + LCP fixes + homepage simplification. Commits 07f0981, dbd743e, 0a91dd2 |
| 12 UGC + membership waitlist | ✓ closed | Trip reports + waitlist + admin moderation. Commit 19ea53a |
| 13a Offline web PWA | ✓ closed | SW v29 + /offline + indicator. Commit 5a14e62 |
| 13b Expo offline parity | ✓ closed | cache.ts + offline-queue.ts + OfflineIndicator + 8 screen wraps. Commit (this session) |
| 14 Acquisition polish | ✓ closed | /corrections + /press + masthead. Commits 915a60a, 8f7df68 |
| 15-17 Monetisation | 🔒 gated | Per R2 warning: requires 100K MUV + 2K email list before opening |
| 18 | placeholder for 15-17 | No standalone scope — was a placeholder for the gated monetisation block |

## North-to-south eateries + stays backfill

Plan: `~/.claude/plans/smooth-orbiting-music.md`. Strict state-by-state, north-to-south. Per-dest scope = `local_eateries` + `local_stays` + `destination_stay_picks`. Existing tools: `seed-eateries.mjs` (eateries → SQL/upsert) + `curate-stays.mjs --ids X` (Haiku research → Sonnet voice for picks).

| State | Status | Date | Coverage |
|---|---|---|---|
| Ladakh | ✓ done | 2026-04-26 | 14/14 dests · 93 eateries · 48 stays · 47 picks · 15-18 sections live. Sessions 1-4 + cleanup. Commits 5bc1bb5, 3d5a542, 0016205 |
| Jammu & Kashmir | ✓ done | 2026-04-26 | 17/17 dests · 98 eateries · 40 stays · 44 picks. 5 sessions: Srinagar deep (5 zones, 36 rows after dedupe), Pahalgam/Gulmarg/Sonamarg (28), Bhaderwah/Kishtwar/Patnitop (19), 5 day-trip dests (11), 5 remote valleys (4 — honest scarcity). Sections 15-18 live. |
| Himachal Pradesh | ✓ done | 2026-04-27 | 32/34 dests · 286 eateries (Chandratal + GHNP intentionally `[]` — no verifiable independent eateries). 8 sessions: S1 Manali (47, 5 zones), S2 Shimla (32, 4 zones), S3 Dharamshala+McLeodganj (23), S4 Kasol/Parvati/Manikaran/Jibhi/Tirthan (36), S5 Spiti cluster Kaza/Spiti-valley/Nako/Kalpa/Sangla/Chitkul (33), S6 Lahaul Keylong/Sissu/Lahaul-valley/Chandratal (18), S7 Hill towns Dalhousie/Kasauli/Palampur/Bir-Billing/Chamba (54), S8 final batch Chail/Kufri/Kullu/Mandi/Sarahan/Solan/Prashar-Lake/GHNP/Barot-Valley/Kinnaur (43). |
| Uttarakhand | ✓ done | 2026-04-27 | 38/38 dests · 316 eateries (4 honest-scarcity `[]`: Tungnath / Valley-of-Flowers / Roopkund / Har-Ki-Doon — all permit-restricted treks or UNESCO park). 8 sessions: S1 Rishikesh (37, 4 zones, pure-veg), S2 Mussoorie (28, 4 zones), S3 Nainital (26, 4 zones), S4 Haridwar (29, 4 zones, pure-veg + no alcohol), S5 Kumaon hill towns (45 across Almora/Ranikhet/Kausani/Mukteshwar/Bhimtal/Binsar), S6 high-altitude (41 across Auli/Joshimath/Chopta/Tungnath/Dhanaulti/Kanatal/Tehri-Lake), S7 Char Dham + treks (22 across Badrinath/Kedarnath/Gangotri/Yamunotri/Hemkund-Sahib/Valley-of-Flowers/Roopkund — pure-veg + seasonal), S8 final 14 (88 across Landour/Lansdowne/Pithoragarh/Munsiyari/Champawat/Chaukori/Devprayag/Rudraprayag/Guptkashi/Gopeshwar/Uttarkashi/Har-Ki-Doon/Chakrata/Corbett-NP). |
| Punjab + Haryana + Chandigarh | pending | - | ~25 dests |
| Rajasthan | pending | - | ~50 dests |
| Uttar Pradesh | pending | - | ~30 dests |

**R-report gap closure** (reconstructed from citations; source PDFs not in repo):

- **R1** (SEO/E-E-A-T): §1.1 homepage, §2.2 thin-content quality, §3.2 i18n — all ✓
- **R2** (Compass Forensic): §2/§9 quality floor, §11 acquisition multiple, §1 homepage — all ✓; §15-17 monetisation 🔒 gated
- **R3** (UX/IA): §1 homepage — ✓
- **R4** (Mobile/PWA/offline): §5 Ladakh 4G drops — ✓ (web PWA + Expo parity); §7.3 E-E-A-T — ✓

**Pending user-action items** (Claude can't do these):
- IMD/CPCB env keys (Sprint 9)
- Kaza video upload to R2 (Sprint 9)
- Photographer brief budget (Sprint 9)
- GA4: register custom dimension `aio_referral` (User scope) so the AIO attribution event we ship in `ga4-init` is queryable in reports
- Sprint 7b follow-ups (one-time, after this session): run `node scripts/log-citation-baseline-2026-04-24.mjs` to seed Supabase; click "Run now" on each of the 3 Cowork scheduled tasks to pre-approve their tools
- Wikidata COI risk: username `NakshIQ` edits item Q139549464 — add independent press references via P248/P1343 statements as press pickups land

**Closed in 2026-04-24 follow-up session** (do not re-flag as pending):
- Bing Webmaster verify ✓ (already verified before this session; sitemaps 0-4 submitted, IndexNow key file live, /api/indexnow returns ok:true, test push got upstream 202)
- GA4 AI channel-group config ✓ (channel group "AI referrals (NakshIQ)" with Channel 1 "AI search" matching 10 LLM domains via regex; Channel 2 "AI Overviews (Google SGE)" implemented as a gtag event in `ga4-init` instead because GA4 channel rules don't expose Page URL as a dimension)
- Wikidata entity ✓ (Q139549464 with EN+HI labels, descriptions, aliases, and 6 statements — wired into Organization sameAs in layout.tsx line 224)
- AI-citation baseline ✓ (17 btv prompts × Perplexity + Google AIO = 34 checks, all 0 cited at 2026-04-24 baseline; tracker script Copilot URL fixed)

**Pending propagation** (just waiting):
- DNS MX records on nakshiq.com (cleanup pushed today, GoDaddy authoritative servers catching up)
