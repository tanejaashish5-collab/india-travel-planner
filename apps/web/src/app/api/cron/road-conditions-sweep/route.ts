import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly road-conditions sweep digest.
 *
 * Surfaces three buckets to the editor inbox so manual WebFetch verification
 * can clear them:
 *   1. EXPIRED — expires_at < now (the row is silently still rendering)
 *   2. STALE  — reported_at older than 14 days, status non-open
 *   3. UNSOURCED — source_url is NULL (no traceable verification)
 *
 * The point: BRO/PWD/state highway departments push closures via Twitter
 * and circulars that aren't scrapeable. The cron doesn't try to scrape;
 * it nags an editor on a fixed cadence so road claims don't drift quietly.
 *
 * Triggered from vercel.json crons; once weekly.
 */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "taneja.ashish5@gmail.com";
const SITE_URL = "https://www.nakshiq.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ago(d: string | null): string {
  if (!d) return "never";
  const ms = Date.now() - new Date(d).getTime();
  const days = Math.floor(ms / 86400_000);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const { data: rows, error } = await supabase
    .from("road_reports")
    .select(
      "id, segment, status, report, reported_at, expires_at, verified, source_url, source_label, last_reviewed_at, destinations:destination_id(name, state_id)"
    )
    .order("reported_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const FOURTEEN_DAYS_MS = 14 * 86400_000;
  const nowMs = Date.now();

  const expired: any[] = [];
  const stale: any[] = [];
  const unsourced: any[] = [];

  for (const r of rows ?? []) {
    const dest: any = Array.isArray(r.destinations) ? r.destinations[0] : r.destinations;
    const flat = {
      id: r.id,
      segment: r.segment ?? "?",
      status: r.status,
      report: r.report ?? "",
      reported_at: r.reported_at,
      expires_at: r.expires_at,
      verified: r.verified,
      source_url: r.source_url,
      source_label: r.source_label,
      dest_name: dest?.name ?? "—",
      state: dest?.state_id ?? "?",
    };

    const expiredMs = r.expires_at ? new Date(r.expires_at).getTime() : 0;
    const reportedMs = r.reported_at ? new Date(r.reported_at).getTime() : 0;

    if (r.expires_at && expiredMs < nowMs) {
      expired.push(flat);
    }
    // Non-open status that hasn't been touched in 14d
    if (
      r.status !== "open" &&
      r.status !== "good" &&
      reportedMs < nowMs - FOURTEEN_DAYS_MS
    ) {
      stale.push(flat);
    }
    if (!r.source_url) unsourced.push(flat);
  }

  const summary = {
    total: rows?.length ?? 0,
    expired: expired.length,
    stale: stale.length,
    unsourced: unsourced.length,
  };

  await supabase.from("ops_reports").insert({
    job: "road-conditions-sweep",
    summary,
    alerts_count: expired.length + stale.length + unsourced.length,
  });

  // Skip mail if all-clean.
  if (expired.length === 0 && stale.length === 0 && unsourced.length === 0) {
    return NextResponse.json({ ok: true, summary, emailed: false });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ ok: true, summary, emailed: false, note: "RESEND_API_KEY missing" });
  }

  const renderRow = (r: any) =>
    `<li>
      <strong>${escapeHtml(r.segment)}</strong>
      <span style="color:#888;font-size:11px;"> · ${escapeHtml(r.state)} · ${escapeHtml(r.status)} · reported ${ago(r.reported_at)}</span>
      ${r.report ? `<div style="color:#666;font-size:12px;margin:2px 0 4px;">${escapeHtml(r.report.slice(0, 140))}${r.report.length > 140 ? "…" : ""}</div>` : ""}
      ${r.source_url ? `<a href="${r.source_url}" style="color:#888;font-size:11px;">source: ${escapeHtml(r.source_label || new URL(r.source_url).hostname)}</a>` : `<span style="color:#c33;font-size:11px;">no source</span>`}
    </li>`;

  const block = (title: string, items: any[], note: string, color: string) =>
    items.length === 0
      ? ""
      : `
        <h3 style="margin:24px 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:${color};">${escapeHtml(title)} (${items.length})</h3>
        <p style="color:#666;font-size:12px;margin:0 0 8px;">${escapeHtml(note)}</p>
        <ul style="margin:0;padding-left:20px;font-size:13px;line-height:1.5;">${items.slice(0, 12).map(renderRow).join("")}</ul>
        ${items.length > 12 ? `<p style="color:#888;font-size:11px;margin-top:4px;">+ ${items.length - 12} more not shown</p>` : ""}
      `;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 680px;">
      <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Weekly · Road conditions sweep</p>
      <h2 style="margin:0 0 8px;font-size:18px;">${expired.length + stale.length} road claims drifted, ${unsourced.length} unsourced</h2>
      <p style="color:#666;font-size:13px;line-height:1.5;">
        BRO &amp; state PWD push closures via Twitter and circulars that we can't scrape. This sweep
        nags us once a week so claims don't go silently stale. Open the row in admin, WebFetch
        the source URL, then update <code>last_reviewed_at</code> and the warning clears.
      </p>

      ${block("Expired", expired, "expires_at has passed but the row still renders.", "#c33")}
      ${block("Stale (14d+)", stale, "Non-open status not touched in two weeks. Re-verify before someone drives it.", "#e67e22")}
      ${block("Unsourced", unsourced, "No source URL. Every road claim must trace to a public BRO / PWD / news post.", "#888")}

      <p style="margin-top:24px;">
        <a href="${SITE_URL}/en/admin" style="background:#E55642;color:white;text-decoration:none;padding:8px 16px;border-radius:4px;display:inline-block;font-size:14px;">Open admin →</a>
      </p>
      <p style="color:#888;font-size:11px;margin-top:16px;">
        Sources to check: BRO Project Himank, hp.gov.in PWD, jkhighways.com, Kashmir Observer, Sikkim PWD.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: OPS_FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: REPLY_TO,
      subject: `[NakshIQ · Roads] ${expired.length + stale.length} drifted · ${unsourced.length} unsourced`,
      html,
    });
  } catch (err: any) {
    console.error("[road-conditions-sweep] email failed:", err?.message);
    return NextResponse.json({ ok: true, summary, emailed: false, error: err?.message });
  }

  return NextResponse.json({ ok: true, summary, emailed: true });
}
