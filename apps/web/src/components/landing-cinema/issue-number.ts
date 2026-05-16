// Pure function — server-safe (no "use client"). Imported by both server
// pages (e.g. /about) and the client helpers.tsx so the issue counter stays
// consistent everywhere.
//
// Issue Nº derives from the launch month: 2022-07-01 = Issue Nº 1.
// May 2026 = Issue Nº 47. Update LAUNCH_DATE only if the editorial counter
// ever needs to reset.

const LAUNCH_DATE = new Date("2022-07-01T00:00:00Z");

export function getIssueNumber(now: Date = new Date()): number {
  const months =
    (now.getUTCFullYear() - LAUNCH_DATE.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - LAUNCH_DATE.getUTCMonth());
  return Math.max(1, months + 1);
}
