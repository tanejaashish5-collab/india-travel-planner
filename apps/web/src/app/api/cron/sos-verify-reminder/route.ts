import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly SOS staleness reminder. Counts emergency_sos rows that haven't been
 * verified in >30 days OR have no source_url, groups by state, and emails
 * the editor a digest. The whole point: numbers DO change, and we need a
 * regular nudge to retest them rather than a green "Verified 2026-04-01"
 * stamp that hasn't been re-checked since.
 *
 * Triggered from vercel.json crons; cap at 1× per week to avoid spam.
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
    .from("emergency_sos")
    .select("destination_id, verified, verified_date, last_verified_attempt_at, source_url, local_police_station, nearest_hospital, destinations:destination_id(name, state_id)");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Smart re-verification cadence (migration 069). National-constant numbers
  // (police 100/112, fire 101, ambulance 108, women 1091/181, road 1073,
  // tourist 1363) are MHA / Ministry-of-Tourism constants that don't change →
  // 180-day window. Rows whose local_police_station / nearest_hospital carry an
  // actual district desk or hospital PHONE can decay → 45-day window. The
  // classifier requires an STD-hyphen group, a 10-digit mobile, or "Tel:" so a
  // bare 6-digit PINCODE in a hospital address isn't mis-read as a desk line.
  const PHONE_RE = /Tel:|\d{3,5}-\d{5,8}|[6-9]\d{9}/;
  const DISTRICT_WINDOW_MS = 45 * 86400_000;
  const CONSTANTS_WINDOW_MS = 180 * 86400_000;
  const nowMs = Date.now();

  const stale = (rows ?? [])
    .map((r) => {
      const hasDistrictLine =
        PHONE_RE.test(r.local_police_station ?? "") || PHONE_RE.test(r.nearest_hospital ?? "");
      const windowMs = hasDistrictLine ? DISTRICT_WINDOW_MS : CONSTANTS_WINDOW_MS;
      const verifiedMs = r.verified_date ? new Date(r.verified_date).getTime() : 0;
      const reasons: string[] = [];
      if (!r.verified) reasons.push("not_verified");
      if (!r.verified_date) reasons.push("no_date");
      else if (verifiedMs < nowMs - windowMs) {
        const days = Math.floor((nowMs - verifiedMs) / 86400_000);
        reasons.push(`stale_${days}d`);
      }
      if (!r.source_url) reasons.push("no_source");
      return {
        destination_id: r.destination_id,
        // @ts-expect-error nested join shape
        name: r.destinations?.name ?? r.destination_id,
        // @ts-expect-error nested join shape
        state: r.destinations?.state_id ?? "?",
        reasons,
      };
    })
    .filter((r) => r.reasons.length > 0);

  const byState = new Map<string, typeof stale>();
  for (const r of stale) {
    if (!byState.has(r.state)) byState.set(r.state, []);
    byState.get(r.state)!.push(r);
  }
  const sortedStates = [...byState.entries()].sort((a, b) => b[1].length - a[1].length);

  const summary = { total: rows?.length ?? 0, stale: stale.length };

  await supabase.from("ops_reports").insert({
    job: "sos-verify-reminder",
    summary,
    alerts_count: stale.length,
  });

  // Skip email if nothing's stale (avoids weekly noise once we're caught up).
  if (stale.length === 0) {
    return NextResponse.json({ ok: true, summary, emailed: false });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ ok: true, summary, emailed: false, note: "RESEND_API_KEY missing" });
  }

  const stateRows = sortedStates
    .map(([state, items]) => {
      const list = items
        .slice(0, 8)
        .map((r) => `<li>${escapeHtml(r.name)} <span style="color:#888;font-size:11px;">· ${r.reasons.join(", ")}</span></li>`)
        .join("");
      const more = items.length > 8 ? `<li style="color:#888;font-size:11px;">+ ${items.length - 8} more</li>` : "";
      return `<h4 style="margin:16px 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:#888;">${escapeHtml(state)} (${items.length})</h4><ul style="margin:0;padding-left:20px;font-size:13px;">${list}${more}</ul>`;
    })
    .join("");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 640px;">
      <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Weekly · SOS verification</p>
      <h2 style="margin:0 0 8px;font-size:18px;">${stale.length} emergency SOS rows need re-checking</h2>
      <p style="color:#666;font-size:13px;line-height:1.5;">
        These rows are unverified, missing a source URL, or past their re-check window —
        district desk / hospital lines after 45 days, national-constant numbers (100/101/108/112/1091/1073/1363) after 180.
        Numbers can go stale fast — POC desk lines change, hospitals relocate. Please re-check,
        update <code>verified_date</code> + <code>source_url</code>, and the warning clears.
      </p>
      ${stateRows}
      <p style="margin-top:24px;">
        <a href="${SITE_URL}/en/admin/sos" style="background:#E55642;color:white;text-decoration:none;padding:8px 16px;border-radius:4px;display:inline-block;font-size:14px;">Open admin →</a>
      </p>
      <p style="color:#888;font-size:11px;margin-top:16px;">
        Run locally: <code>node --env-file=apps/web/.env.local scripts/audit-emergency-numbers.mjs</code>
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: OPS_FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: REPLY_TO,
      subject: `[NakshIQ · SOS] ${stale.length} rows need re-verification`,
      html,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sos-verify-reminder] email failed:", message);
    return NextResponse.json({ ok: true, summary, emailed: false, error: message });
  }

  return NextResponse.json({ ok: true, summary, emailed: true });
}
