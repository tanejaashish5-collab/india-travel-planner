import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const FLAG_KEYWORDS = ["road closure", "flood", "landslide", "accident", "closed", "evacuation", "strike", "lockdown"];
const BATCH = 50;
const STALE_DAYS = 90;

/**
 * Monthly news-sweep. Mirrors scripts/news-sweep.mjs --probe-news --commit-flags
 * but capped at top-50 stalest destinations so it completes inside
 * maxDuration=300s. Rotates weekly via ORDER BY content_reviewed_at ASC.
 *
 * Writes user_suggestions rows for flagged destinations (admin triage) and
 * an ops_reports summary for the freshness dashboard.
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

  const cutoff = new Date(Date.now() - STALE_DAYS * 86400000).toISOString();
  const { data: stale, error } = await supabase
    .from("destinations")
    .select("id, name")
    .or(`content_reviewed_at.is.null,content_reviewed_at.lt.${cutoff}`)
    .order("content_reviewed_at", { ascending: true, nullsFirst: true })
    .limit(BATCH);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = stale ?? [];
  const year = new Date().getFullYear();
  const flagged: Array<{ id: string; name: string; hits: string[] }> = [];
  let probeErrors = 0;

  for (const r of rows) {
    const query = `"${r.name}" ${year} road closure OR landslide OR flood`;
    try {
      const res = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
        headers: { "User-Agent": "NakshIQ-news-sweep/1 (ops@nakshiq.com)" },
      });
      const text = (await res.text()).toLowerCase();
      const hits = FLAG_KEYWORDS.filter((k) => text.includes(k));
      if (hits.length >= 2) {
        flagged.push({ id: r.id, name: r.name, hits });
      }
      await new Promise((ok) => setTimeout(ok, 900));
    } catch {
      probeErrors++;
    }
  }

  if (flagged.length) {
    await supabase.from("user_suggestions").insert(
      flagged.map((f) => ({
        target_table: "destinations",
        target_id: f.id,
        message: `Automated news-sweep flagged "${f.name}" — keywords: ${f.hits.join(", ")}. Review for road-closure / flood / landslide events.`,
        status: "triaged",
      }))
    );
  }

  const summary = {
    probed: rows.length,
    flagged: flagged.length,
    probe_errors: probeErrors,
    year,
    sample: flagged.slice(0, 5).map((f) => ({ id: f.id, hits: f.hits })),
  };

  await supabase.from("ops_reports").insert({
    job: "news-sweep",
    summary,
    alerts_count: flagged.length,
  });

  return NextResponse.json({ ok: true, summary });
}
