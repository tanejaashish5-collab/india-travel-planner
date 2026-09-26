# CLAUDE.md

Guidance for Claude Code in this repo. Condensed 2026-09-26 from 31KB (it loads on every prompt).
**Why each rule exists (incidents, evidence, commit ids): [docs/claude-md-history.md](docs/claude-md-history.md).**

## Project

NakshIQ — India travel confidence engine. Monorepo: Next.js 16 web + Expo mobile, Supabase (PostGIS), bilingual (en/hi), Vercel.

## Commands

Package manager pinned to `npm@11.9.0` (no pnpm/yarn).

```bash
npm run dev | build | lint | type-check          # both apps via Turborepo
cd apps/web && npm run dev                       # web only
cd apps/mobile && npx expo start                 # mobile only
npm run db:migrate    # supabase db push
npm run db:seed
BASE_URL=http://localhost:3000 npm test          # Playwright E2E
BASE_URL=http://localhost:3000 npx playwright test -g "<title>"
```

## Architecture

- `apps/web` Next.js 16 App Router, Tailwind v4, shadcn/ui, Geist. Routes under `src/app/[locale]/` (next-intl, `en` default + `hi`); `src/middleware.ts` does locale routing + 307→301.
- Components flat in `apps/web/src/components/`, one file each. `apps/web/CLAUDE.md` loads `AGENTS.md` (Next 16 docs warning + voice rules): check nested CLAUDE.md/AGENTS.md in subpaths.
- `packages/shared` (`@itp/shared`) types, Supabase clients, queries, i18n. `supabase/` migrations + seeds. `scripts/` maintenance (`node scripts/<name>.mjs`).
- i18n strings: `apps/web/src/messages/en.json` + `hi.json`.
- **Next.js 16 has breaking changes: read `node_modules/next/dist/docs/` before writing Next API code.**
- Env: see `env.example`.

## Data rules

- **All data real and verifiable.** No fabricated phones, contacts or stats; honest `[]` beats invention. Check JSONB field names against `canonical_schema.md` in memory before inserting state data.
- **After any DB write that changes rendered pages, verify the RENDERED page:** `node scripts/verify-touched-pages.mjs --dest <slugs>` (or `--url`). Read the consuming component's null-handling BEFORE writing; a green check on a cached page proves nothing (check AGE, use `--revalidate`, or rely on `canary-probe`). `typeof x === "object"` is null-safe only after a truthy check.
- When a shape/NULL change breaks one consumer of a shared JSONB column, grep EVERY consumer and add the page family to the canary before closing.
- Verified backfills that write `destinations` also stamp `content_reviewed_at = now()` on touched rows (else the Monday review digest re-inflates).
- After any `destinations` insert, regenerate `apps/web/data/known-destination-slugs.json` in the same PR (middleware allowlist).
- Scores are quoted on the displayed 0–10 scale (DB value × 2).

## Audits, commits, deploys

- **Scheduled/headless audit sessions commit through `bash scripts/audit-commit-guard.sh -m "<msg>" <paths…>`**, never a bare `git commit`. The guard clears provably stale locks, rebases, pushes, and verifies HEAD moved and files landed. Never infer a commit landed.
- **Commit path-scoped**: never `git add -A`, never stage a whole shared file (e.g. `messages/*.json`) you only partly changed.
- GA4 audits run via LaunchAgent `com.ashish.ga4-audit` → `scripts/ga4-audit-cron.sh` (commits all uncommitted `ga4-audit-*.md`). Do not revert to cron or call the .mjs directly: cron has no keychain, so it cannot push. A job that reads `~/Desktop` AND pushes must be a LaunchAgent via `/bin/bash`, with a PATH covering its tools' tools (`/opt/homebrew/bin` for `gh`).
- `apps/web/vercel-ignore.sh`: audit-only commits build at most once per 20h (`AUDIT_BUILD_MIN_HOURS`); `ops/` is skipped. Every deploy empties the ISR cache, which is what drives the Vercel bill. Do not re-add audit paths to its exclude list.
- After a code push, deploy to Vercel. Pages changing destination/month markup bump `CACHE_VERSION` in `apps/web/public/sw.js`.

## Supabase load

- **>500-row reads/dumps go over direct Postgres (5432), never the REST API** (REST egress is metered; a REST dump froze the org in May). Prefer in-place `UPDATE` over dump-and-apply.
- **>100-row writes use `scripts/_lib/pg-bulk.mjs` → `withPgTransaction(...)`** (honours `DRY=1`, busts reference caches). Run with `node --env-file=apps/web/.env.local`. Needs `SUPABASE_DB_URL`.
- **Reference lists (destinations/collections/states/search index) are read only through `apps/web/src/lib/cached-data.ts`**; never add a bare `supabase.from("destinations"|"collections"|"states")` list read in a page/route. Client search surfaces share `/api/search-index` via `useSearchIndex`. After reference writes, bust caches (automatic via `withPgTransaction`, else `scripts/bust-reference-cache.mjs`).
- After any Supabase outage/402, force a Vercel rebuild (empty commit on main); ISR caches survive recovery.
- Egress safe zone < 4 GB/mo; "check Supabase egress" = logs via MCP + a dashboard glance.

## SEO specifics

- `festivals/*` 404s come from `lib/festival-slug.ts` collision suffixes, not missing content; if the bucket grows, check for a data-derived slug that dropped a URL. `cost/*` 404s are an honest data gap.
- Before recommending a `/vs/` pair, grep BOTH slug orders in `apps/web/src/lib/vs-pairs.ts` + `vs-pairs.generated.ts`; never add a reversed duplicate. For pages that already exist, the lever is internal links/depth, not new pages or title rewrites.
- GSC per-URL checks: `node scripts/gsc-inspect-sweep.mjs --url <url>`; weekly coverage estimate: `node scripts/gsc-inspect-sweep.mjs` (patches the audit file).

## Working rules

- **Name the number before building:** "X is at N now; M within P weeks is success." If no honest number exists, say so and question the build.
- **A restriction in a prompt is a suggestion; in the tool layer it is a control.** For anything that can send, publish, pay or write (email, IG/FB, YouTube, Razorpay, Supabase), check the credential scope/allowlist/enable-flag. JobAgent's Outlook `allow_categories` removes send tools: keep it. Chanakya publish is gated by `publish.enabled` + private-first `publishAt`.
- **Sub-agents:** research/scraping/extraction on Haiku; Sonnet/Opus only for judgement. Prefer 1 agent for 5–8 items over many parallel agents (max 3 in parallel). Use Bash/grep/jq when no LLM is needed. Avoid screenshots unless visual debugging needs them.
- Eateries/stays backfill is complete (see [docs/sprint-history.md](docs/sprint-history.md)); if reopened, research via WebFetch/WebSearch agents, **never `curate-stays.mjs`** (metered API).
- Sprint history and old decisions: [docs/sprint-history.md](docs/sprint-history.md). Monetisation sprints gated until 100K MUV + 2K email list.
- **Research wiki** lives at `~/Desktop/Claude OS/research-wiki/` (read `index.md` first for any "what do we know about X"); findings written to `data/research/` get ingested there and committed in the Claude OS repo.
- **Scrapes:** YouTube → `.scrapes/youtube/yt-<videoId>/` (other sources in sibling `.scrapes/` folders; gitignored). Grep `.scrapes/CATALOGUE*.md` before re-scraping.

## Open founder-only items

IMD/CPCB env keys · Kaza video to R2 · photographer brief budget · GA4 custom dimension `aio_referral` (User scope) · Sprint 7b citation baseline + Cowork "Run now" × 3 · Wikidata press references · decision on disabling the `gsc-canonical-consolidation` task (recommended 12 weeks running; yercaud/may has a real 4-week decline worth a manual look).
Resolved items (hemkund-sahib, peak-alert CTA, title tranche 2, coverage automation, `/vs/` kasauli pairs, dotenvx tip line) are archived in the history doc; do not re-flag them.
