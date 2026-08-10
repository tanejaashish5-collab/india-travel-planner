/**
 * test-watchdog-streak.mjs — unit-test the watchdog's needs_review escalation.
 *
 * WHY THIS EXISTS
 * ---------------
 * The 2026-08-04 outage ran 10 days because `refresh-stay-picks` reported
 * ok:true while every item failed. That lands as `needs_review`, a status the
 * watchdog deliberately never alerts on — and the watchdog only ever read the
 * LAST run, so "flagged once" and "flagged every run for a fortnight" were
 * literally the same input. It could not have caught it.
 *
 * `classifyReviewStreak` is the fix. It is the one piece of logic standing
 * between us and a repeat, so it gets tested against the shapes that matter —
 * including the exact scar — rather than trusted because it type-checks.
 *
 * Two failure modes are equally bad and both are covered:
 *   - too quiet: a genuinely stuck job never escalates (the original bug)
 *   - too loud:  freshness-drift finds review-debt most weeks BY DESIGN, and an
 *                alert you learn to ignore is worse than no alert at all.
 *
 * USAGE:  node scripts/test-watchdog-streak.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The function lives inside a Next route, which imports next/server, supabase
// and a `@/` path alias — none of which resolve under plain node. So extract
// just the function (plus its type) into a temp .ts file and let Node 24 strip
// the types natively. This still tests the REAL source text rather than a
// hand-copied duplicate that could silently drift out of sync.
const SRC = "apps/web/src/app/api/cron/watchdog/route.ts";
const src = readFileSync(SRC, "utf8");
const fn = src.match(/export function classifyReviewStreak\([\s\S]*?\n\}\n/);
const ty = src.match(/export type OpsRun = [^\n]*\n/);
if (!fn || !ty) {
  console.error(
    `✗ could not locate classifyReviewStreak / OpsRun in ${SRC} — renamed or moved?\n` +
      `  This test is deliberately brittle here: if the function it guards disappears,\n` +
      `  it must fail loudly rather than silently pass against nothing.`
  );
  process.exit(1);
}
const dir = mkdtempSync(join(tmpdir(), "watchdog-streak-"));
const tmp = join(dir, "streak.ts");
writeFileSync(tmp, ty[0] + "\n" + fn[0]);
const { classifyReviewStreak } = await import(tmp);

const NOW = new Date("2026-08-10T02:00:00Z");
const daysAgo = (d) => new Date(NOW.getTime() - d * 86400000).toISOString();
/** newest-first history helper: flagged = ok:true + alerts_count>0 */
const flagged = (d) => ({ run_at: daysAgo(d), alerts_count: 3, ok: true });
const clean = (d) => ({ run_at: daysAgo(d), alerts_count: 0, ok: true });
const errored = (d) => ({ run_at: daysAgo(d), alerts_count: 0, ok: false });

const cases = [
  {
    name: "THE SCAR — daily job flagged every run for 10 days, fuse 2d → STUCK",
    rows: Array.from({ length: 11 }, (_, i) => flagged(i)),
    fuse: 2,
    expect: { stuck: true, runs: 11 },
  },
  {
    name: "single flagged run, fuse 2d → needs_review, NOT stuck (noise guard)",
    rows: [flagged(0), clean(1), clean(2)],
    fuse: 2,
    expect: { stuck: false, runs: 1 },
  },
  {
    name: "two flagged runs but only 1d old, fuse 2d → NOT stuck (time not met)",
    rows: [flagged(0), flagged(1), clean(2)],
    fuse: 2,
    expect: { stuck: false, runs: 2 },
  },
  {
    name: "two flagged runs spanning 3d, fuse 2d → STUCK",
    rows: [flagged(0), flagged(3), clean(4)],
    fuse: 2,
    expect: { stuck: true, runs: 2 },
  },
  {
    name: "a clean run RESETS the streak — old flags before it are ignored",
    rows: [flagged(0), clean(1), flagged(2), flagged(3), flagged(9)],
    fuse: 2,
    expect: { stuck: false, runs: 1 },
  },
  {
    name: "an ERRORED run also resets (errored alerts on its own path)",
    rows: [flagged(0), errored(1), flagged(2), flagged(8)],
    fuse: 2,
    expect: { stuck: false, runs: 1 },
  },
  {
    name: "freshness-drift: weekly, flagged 3 weeks, fuse 22d → NOT stuck (by design)",
    rows: [flagged(0), flagged(7), flagged(14), clean(21)],
    fuse: 22,
    expect: { stuck: false, runs: 3 },
  },
  {
    name: "freshness-drift: flagged 4 weeks (>22d), fuse 22d → STUCK",
    rows: [flagged(0), flagged(7), flagged(14), flagged(23), clean(30)],
    fuse: 22,
    expect: { stuck: true, runs: 4 },
  },
  {
    name: "canary-probe: flagged 2 days, fuse 1d → STUCK (live 500s escalate fast)",
    rows: [flagged(0), flagged(1), flagged(2), clean(3)],
    fuse: 1,
    expect: { stuck: true, runs: 3 },
  },
  {
    name: "healthy job — newest run clean → no streak at all",
    rows: [clean(0), flagged(1), flagged(2)],
    fuse: 2,
    expect: { stuck: false, runs: 0 },
  },
  {
    name: "empty history → no streak, no crash",
    rows: [],
    fuse: 2,
    expect: { stuck: false, runs: 0 },
  },
  {
    name: "null alerts_count treated as clean, not flagged",
    rows: [{ run_at: daysAgo(0), alerts_count: null, ok: true }],
    fuse: 2,
    expect: { stuck: false, runs: 0 },
  },
];

let failed = 0;
for (const c of cases) {
  const got = classifyReviewStreak(c.rows, NOW, c.fuse);
  const ok = got.stuck === c.expect.stuck && got.runs === c.expect.runs;
  if (!ok) failed++;
  console.log(
    `${ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} ${c.name}` +
      (ok ? "" : `\n    expected stuck=${c.expect.stuck} runs=${c.expect.runs}, got stuck=${got.stuck} runs=${got.runs}`)
  );
}

console.log(`\n${cases.length - failed}/${cases.length} passed`);
if (failed) {
  console.error(`\n✗ ${failed} case(s) failed — the escalation is NOT safe to ship.`);
  process.exit(1);
}
console.log("✓ escalation logic verified against the 2026-08-04 scar shape");
