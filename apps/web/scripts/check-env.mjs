#!/usr/bin/env node
// Pre-build env-var gate. Fails loud (exit 1) when REQUIRED envs are
// missing — prevents the silent "empty arrays everywhere" failure mode
// observed on the 2026-05-16 Vercel preview deployment for the
// cinematic-rollout-2026-05-05 branch, where NEXT_PUBLIC_SUPABASE_*
// envs weren't scoped to the "Preview" environment in Vercel. The
// homepage silently returned [] for every data-driven section
// (Dispatch hero, Director's Cut, Atlas, Skip list, Dailies) and
// rendered the "No peak windows this month" fallback because of the
// early-return in apps/web/src/app/[locale]/page.tsx:42.
//
// Wired as the `prebuild` script in apps/web/package.json so it runs
// before every `next build` (locally + on Vercel). To bypass for
// emergency builds: SKIP_ENV_CHECK=1 npm run build

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

// REQUIRED — build fails if any of these are missing.
// These gate the homepage + destination pages. Without them, the site
// silently renders empty.
const REQUIRED = [
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    reason: "Server queries all destinations data from Supabase. Without this, the homepage hero, Director's Cut, Atlas map, and every destination page render empty arrays.",
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    reason: "Pairs with NEXT_PUBLIC_SUPABASE_URL. Both required for any Supabase query to succeed.",
  },
];

// RECOMMENDED — build proceeds but prints a warning. Feature-specific.
const RECOMMENDED = [
  { name: "SUPABASE_SERVICE_ROLE_KEY", feature: "admin routes, cron jobs, server-side mutations" },
  { name: "ANTHROPIC_API_KEY", feature: "Ask-NakshIQ AI feature" },
  { name: "RESEND_API_KEY", feature: "The Window newsletter + UGC admin notifications" },
  { name: "ABLY_API_KEY", feature: "SOS real-time presence" },
  { name: "NEXT_PUBLIC_ABLY_KEY", feature: "SOS real-time presence (client)" },
  { name: "NEXT_PUBLIC_GA4_ID", feature: "Google Analytics 4 tracking" },
];

if (process.env.SKIP_ENV_CHECK === "1") {
  console.log(`${YELLOW}⚠  SKIP_ENV_CHECK=1 — env-var gate bypassed${RESET}`);
  process.exit(0);
}

const missingRequired = REQUIRED.filter((v) => !process.env[v.name]);
const missingRecommended = RECOMMENDED.filter((v) => !process.env[v.name]);

if (missingRequired.length > 0) {
  console.error("");
  console.error(`${RED}${BOLD}✗ Build blocked — required env vars missing${RESET}`);
  console.error("");
  for (const v of missingRequired) {
    console.error(`  ${RED}${BOLD}${v.name}${RESET}`);
    console.error(`  ${DIM}${v.reason}${RESET}`);
    console.error("");
  }
  console.error(`${BOLD}Fix:${RESET}`);
  console.error(`  Local:      add to ${BOLD}apps/web/.env.local${RESET} (see ${BOLD}env.example${RESET})`);
  console.error(`  Vercel:     Dashboard → Settings → Environment Variables`);
  console.error(`              Set the value AND tick ${BOLD}both${RESET} "Production" ${BOLD}and${RESET} "Preview"`);
  console.error(`              (Preview-only or Prod-only scoping causes silent empty rendering on the other.)`);
  console.error("");
  console.error(`  Emergency bypass: ${DIM}SKIP_ENV_CHECK=1 npm run build${RESET}`);
  console.error("");
  process.exit(1);
}

if (missingRecommended.length > 0) {
  console.warn("");
  console.warn(`${YELLOW}⚠  Optional env vars missing (build will proceed; some features will be unavailable)${RESET}`);
  for (const v of missingRecommended) {
    console.warn(`  ${YELLOW}${v.name}${RESET} ${DIM}— ${v.feature}${RESET}`);
  }
  console.warn("");
}

console.log(`${GREEN}✓ env-var gate passed${RESET} ${DIM}(${REQUIRED.length} required, ${RECOMMENDED.length - missingRecommended.length}/${RECOMMENDED.length} recommended present)${RESET}`);
