import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

// TEMPORARILY DISABLED 2026-05-27 — this cron reads gsc-audits/ +
// ga4-audits/ via path.join(process.cwd(), "..", "..", dir), which
// Turbopack's file-tracer can't statically scope. That forces it to
// bundle the entire monorepo root into the function, which crossed
// Vercel's 300 MB function-size limit (634 MB on 2026-05-27).
//
// Stubbed to unblock deploys of trek-fill (25 dests, 31 treks, region-
// filter fix). Re-enable after the audit data is moved to Supabase
// storage / R2 / apps/web/(gsc|ga4)-audits/ so the tracer can scope it.
//
// Backlog: refactor readLatestAudit() to read from a path that Turbopack
// can statically resolve, OR fetch from a remote source so no bundling
// is needed.
export async function GET() {
  return NextResponse.json({
    ok: true,
    disabled: true,
    reason: "Refactor pending — see route comment.",
  });
}
