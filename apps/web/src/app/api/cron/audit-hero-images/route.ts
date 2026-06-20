import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Daily hero-image audit. HEAD-probes the R2 hero (destinations/<id>.jpg) for
// every destination and emails if any are missing.
//
// Born 2026-06-20: the 8 Sikkim destinations added 2026-06-14 were verified but
// never got hero images, so they rendered pure-black cards on the landing-page
// Dailies reel (Act VI) — which surfaces the most-recently-verified first, i.e.
// exactly the new, still-image-less destinations — for 6 days before the founder
// noticed. scripts/audit-hero-images.mjs caught it instantly but was a manual
// script wired into no scheduled job. This is the scheduled version: a missing
// hero is STRUCTURAL (a real gap, not a transient edge cold-start like the
// cache-header canary), so we alert on >= 1 missing.
//
// Fix when this fires: source a real, place-accurate, license-clean image →
// apps/web/public/images/destinations/<slug>.jpg → node scripts/upload-images.mjs.

const ALERT_TO = "taneja.ashish5@gmail.com";
const CONCURRENCY = 12;

type Dest = { id: string; name: string };

async function probeStatus(url: string): Promise<number> {
  try {
    const r = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      headers: { "user-agent": "NakshIQ-HeroAudit/1.0" },
    });
    return r.status;
  } catch {
    return 0; // network error — counted as a probe error, never as "missing"
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const r2 = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "").replace(/\/+$/, "");
  if (!supabaseUrl || !serviceKey)
    return NextResponse.json({ error: "supabase not configured" }, { status: 500 });
  if (!r2)
    return NextResponse.json({ error: "NEXT_PUBLIC_IMAGE_BASE_URL not configured" }, { status: 500 });

  const supabase = createClient(supabaseUrl, serviceKey);

  // Pull every destination (id = the slug the hero is keyed on; name for the alert).
  const dests: Dest[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from("destinations")
      .select("id, name")
      .range(from, from + 999);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data?.length) break;
    dests.push(...(data as Dest[]));
    if (data.length < 1000) break;
  }

  // HEAD-probe destinations/<id>.jpg (the original is uploaded as the marker;
  // its webp variants are generated alongside it, so the .jpg presence == hero
  // exists). Bounded concurrency keeps the whole catalog well inside maxDuration.
  const missing: Dest[] = [];
  let probeErrors = 0;
  for (let i = 0; i < dests.length; i += CONCURRENCY) {
    const batch = dests.slice(i, i + CONCURRENCY);
    const codes = await Promise.all(
      batch.map((d) => probeStatus(`${r2}/destinations/${d.id}.jpg`)),
    );
    codes.forEach((code, j) => {
      if (code === 404) missing.push(batch[j]);
      else if (code !== 200) probeErrors++;
    });
  }

  const alertable = missing.length >= 1;

  await supabase.from("ops_reports").insert({
    job: "audit-hero-images",
    summary: {
      total: dests.length,
      missing_count: missing.length,
      missing: missing.slice(0, 50),
      probe_errors: probeErrors,
    },
    alerts_count: missing.length,
    ok: !alertable,
  });

  let emailed = false;
  if (alertable) {
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] ${missing.length} destination${missing.length === 1 ? "" : "s"} missing a hero image`,
          html: renderAlertHtml(missing, dests.length),
          text: renderAlertText(missing, dests.length),
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-hero-images] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: !alertable,
    total: dests.length,
    missing_count: missing.length,
    missing: missing.map((m) => m.id),
    probe_errors: probeErrors,
    alert_emailed: emailed,
  });
}

function renderAlertText(missing: Dest[], total: number): string {
  const lines: string[] = [];
  lines.push(`NakshIQ hero-image audit: ${missing.length} of ${total} destinations have no cover image on R2.\n`);
  lines.push(`These render as black cards in the landing-page Dailies reel and as broken heroes on their detail pages:\n`);
  missing.forEach((m) => lines.push(`  • ${m.name} (${m.id})`));
  lines.push(`\nFix each: source a real, place-accurate, license-clean image →`);
  lines.push(`apps/web/public/images/destinations/<slug>.jpg → node scripts/upload-images.mjs.`);
  lines.push(`Re-check with: node scripts/audit-hero-images.mjs`);
  return lines.join("\n");
}

function renderAlertHtml(missing: Dest[], total: number): string {
  const rows = missing
    .map(
      (m) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${m.name}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#525252">${m.id}</td>
    </tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Hero-image audit: <span style="color:#dc2626">${missing.length} missing</span></h1>
    <p style="color:#525252;margin:0 0 16px">${missing.length} of ${total} destinations have no cover image on R2 — these show black cards in the Dailies reel and broken detail-page heroes.</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Destination</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Slug</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#525252;font-size:12px;margin:16px 0 0">Fix each: source a real, place-accurate, license-clean image → <code>apps/web/public/images/destinations/&lt;slug&gt;.jpg</code> → <code>node scripts/upload-images.mjs</code>. Re-check: <code>node scripts/audit-hero-images.mjs</code>.</p>
  </body></html>`;
}
