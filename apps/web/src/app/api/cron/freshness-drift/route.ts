import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly freshness-drift audit. Mirrors scripts/check-freshness-drift.mjs.
 *
 * Flags destinations where updated_at > content_reviewed_at (edits not
 * re-reviewed) and rows where content_reviewed_at IS NULL (never reviewed).
 * Writes a summary row to ops_reports for the /methodology/freshness surface.
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
  const neverReviewed = rows.filter((r) => !r.content_reviewed_at).length;
  const drift = rows.filter((r) => {
    if (!r.content_reviewed_at) return false;
    return r.updated_at && new Date(r.updated_at) > new Date(r.content_reviewed_at);
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

  const summary = { total, never_reviewed: neverReviewed, drift_count: drift, fresh_pct_90d: freshPct };
  const alerts = neverReviewed + drift;

  await supabase.from("ops_reports").insert({
    job: "freshness-drift",
    summary,
    alerts_count: alerts,
  });

  return NextResponse.json({ ok: true, summary, alerts });
}
