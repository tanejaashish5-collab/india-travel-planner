import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly freshness-drift audit. Mirrors scripts/check-freshness-drift.mjs.
 *
 * Flags destinations where updated_at > content_reviewed_at (edits not
 * re-reviewed) and rows where content_reviewed_at IS NULL (never reviewed),
 * but only once an edit has gone unreviewed past a 21-day grace window — so
 * routine verified-data backfills don't read as editorial review-debt the
 * instant they land. Writes a summary row to ops_reports for the
 * /methodology/freshness surface.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, updated_at, content_reviewed_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = data ?? [];
  const total = rows.length;

  // Grace window. An edit (updated_at) only counts as editorial review-debt
  // once it has gone unreviewed for GRACE_DAYS. Most edits are verified DATA
  // backfills (POI / festival / prose / crowd / SOS sweeps) that bump
  // updated_at without being unreviewed prose — counting them the instant they
  // land made the Monday digest cry "REVIEW NEEDED" on every backfill. With the
  // grace window only genuinely-neglected content (changed >21d ago, still not
  // stamped) surfaces. Backfills that verify-and-stamp content_reviewed_at
  // (see the data-write convention in CLAUDE.md) never enter the count at all.
  const GRACE_DAYS = 21;
  const graceCutoff = Date.now() - GRACE_DAYS * 86400000;
  const isOldEnough = (ts: string | null | undefined) => !!ts && new Date(ts).getTime() < graceCutoff;

  const neverReviewed = rows.filter((r) => !r.content_reviewed_at && isOldEnough(r.updated_at)).length;
  const drift = rows.filter((r) => {
    if (!r.content_reviewed_at || !r.updated_at) return false;
    return new Date(r.updated_at) > new Date(r.content_reviewed_at) && isOldEnough(r.updated_at);
  }).length;
  const ninetyDaysAgo = Date.now() - 90 * 86400000;
  const freshPct = total
    ? Math.round(
        (rows.filter((r) => r.content_reviewed_at && new Date(r.content_reviewed_at).getTime() >= ninetyDaysAgo)
          .length /
          total) *
          100
      )
    : 0;

  const summary = { total, never_reviewed: neverReviewed, drift_count: drift, fresh_pct_90d: freshPct, grace_days: GRACE_DAYS };
  const alerts = neverReviewed + drift;

  await supabase.from("ops_reports").insert({
    job: "freshness-drift",
    summary,
    alerts_count: alerts,
  });

  return NextResponse.json({ ok: true, summary, alerts });
}
