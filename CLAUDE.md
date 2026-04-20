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
