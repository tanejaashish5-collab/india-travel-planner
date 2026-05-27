import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M1 — Cache-header smoke test. Runs hourly. For each of ~30 representative
// URLs (one per dynamic-route family on prod), curl HEAD twice and assert:
//   - Cache-Control contains "public" (NOT "private" / "no-store" / "no-cache")
//   - x-vercel-cache is HIT on the second pass (warmup-tolerant)
//
// This monitor exists because the 2026-05-05 → 2026-05-27 ISR regression
// silently broke caching on 6,060 dest/month + 21 sister-route families.
// The regression's signature was Cache-Control: private/no-cache/no-store
// + x-vercel-cache: MISS — sitting in plain HTTP response headers for 22
// days while every other audit reported green. See commit c1f126d6 and
// .scrapes/audit-gap-investigation-2026-05-27.md (blind spot B1).
//
// Alerts via Resend to taneja.ashish5@gmail.com when violations >= 2 routes
// (one transient cold cache is OK; two simultaneous is structural).

const ALERT_TO = "taneja.ashish5@gmail.com";

// One URL per dynamic-route family. Keep this list short and stable —
// adding URLs here multiplies cost; the goal is one canary per shape.
const CANARY_URLS: Array<{ url: string; family: string }> = [
  { url: "https://www.nakshiq.com/en/destination/kasol", family: "destination" },
  { url: "https://www.nakshiq.com/en/destination/kasol/june", family: "destination/month" },
  { url: "https://www.nakshiq.com/hi/destination/kasol/june", family: "destination/month (hi)" },
  { url: "https://www.nakshiq.com/en/destination/kasol/q/best-time", family: "destination/q" },
  { url: "https://www.nakshiq.com/en/state/himachal-pradesh", family: "state" },
  { url: "https://www.nakshiq.com/en/region/parvati-valley", family: "region" },
  { url: "https://www.nakshiq.com/en/where-to-go/june", family: "where-to-go/month" },
  { url: "https://www.nakshiq.com/en/festivals/month/june", family: "festivals/month" },
  { url: "https://www.nakshiq.com/en/festivals/state/himachal-pradesh", family: "festivals/state" },
  { url: "https://www.nakshiq.com/en/festivals/state/himachal-pradesh/june", family: "festivals/state/month" },
  { url: "https://www.nakshiq.com/en/treks/kheerganga", family: "treks/[id]" },
  { url: "https://www.nakshiq.com/en/treks/state/himachal-pradesh", family: "treks/state" },
  { url: "https://www.nakshiq.com/en/treks/state/himachal-pradesh/may", family: "treks/state/month" },
  { url: "https://www.nakshiq.com/en/treks/difficulty/easy", family: "treks/difficulty" },
  { url: "https://www.nakshiq.com/en/camping/state/himachal-pradesh", family: "camping/state" },
  { url: "https://www.nakshiq.com/en/explore/state/himachal-pradesh", family: "explore/state" },
  { url: "https://www.nakshiq.com/en/explore/difficulty/easy", family: "explore/difficulty" },
  { url: "https://www.nakshiq.com/en/explore/tag/offbeat", family: "explore/tag" },
  { url: "https://www.nakshiq.com/en/stays/state/himachal-pradesh", family: "stays/state" },
  { url: "https://www.nakshiq.com/en/family/himachal-pradesh", family: "family/state" },
  { url: "https://www.nakshiq.com/en/with-kids/kasol", family: "with-kids" },
  { url: "https://www.nakshiq.com/en/india/north-india", family: "india/region" },
  { url: "https://www.nakshiq.com/en/vs/kasol-vs-manikaran", family: "vs/pair" },
  { url: "https://www.nakshiq.com/en/collections", family: "collections (hub)" },
  { url: "https://www.nakshiq.com/en/luxury", family: "luxury (hub)" },
  { url: "https://www.nakshiq.com/en/", family: "homepage" },
  { url: "https://www.nakshiq.com/en/where-to-go", family: "where-to-go (hub)" },
  { url: "https://www.nakshiq.com/en/explore", family: "explore (hub)" },
];

type CanaryResult = {
  url: string;
  family: string;
  http: number;
  cache_control: string;
  vc_pass1: string;
  vc_pass2: string;
  x_robots_tag: string;
  violation: "none" | "dynamic_header" | "persistent_miss" | "5xx";
};

async function probe(url: string): Promise<{ http: number; cc: string; vc: string; xrt: string }> {
  try {
    const r = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      headers: { "user-agent": "NakshIQ-CacheCanary/1.0" },
    });
    return {
      http: r.status,
      cc: (r.headers.get("cache-control") ?? "").toLowerCase(),
      vc: (r.headers.get("x-vercel-cache") ?? "").toUpperCase(),
      xrt: r.headers.get("x-robots-tag") ?? "",
    };
  } catch {
    return { http: 0, cc: "", vc: "", xrt: "" };
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const results: CanaryResult[] = [];
  for (const c of CANARY_URLS) {
    const p1 = await probe(c.url);
    // Tiny gap between passes so a cold-cache MISS has a chance to warm.
    await new Promise((r) => setTimeout(r, 500));
    const p2 = await probe(c.url);

    let violation: CanaryResult["violation"] = "none";
    if (p1.http >= 500 || p2.http >= 500) {
      violation = "5xx";
    } else if (p1.cc && /(private|no-store|no-cache)/.test(p1.cc) && !p1.cc.includes("public")) {
      // "no-cache" alone is fine if header is also "public" (revalidate semantics).
      // We only flag when cache-control is exclusively dynamic-style.
      violation = "dynamic_header";
    } else if (p2.vc === "MISS" && (p1.http === 200 || p2.http === 200)) {
      // Persistent MISS on a 200 response = not being cached at all.
      // Cold-cache MISS-then-HIT is normal; persistent MISS is not.
      violation = "persistent_miss";
    }

    results.push({
      url: c.url,
      family: c.family,
      http: p2.http,
      cache_control: p1.cc,
      vc_pass1: p1.vc,
      vc_pass2: p2.vc,
      x_robots_tag: p1.xrt,
      violation,
    });
  }

  const violations = results.filter((r) => r.violation !== "none");
  // 1 transient violation = noise (regional edge cold-start). 2+ = structural.
  const alertable = violations.length >= 2;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "audit-cache-headers",
      summary: { total: results.length, violations, sample_ok: results.filter((r) => r.violation === "none").slice(0, 3) },
      alerts_count: violations.length,
      ok: !alertable,
    });
  }

  let emailed = false;
  if (alertable) {
    const resend = getResend();
    if (resend) {
      try {
        const text = renderAlertText(violations, results.length);
        const html = renderAlertHtml(violations, results.length);
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] cache-header canary FAILED — ${violations.length}/${results.length} routes uncacheable`,
          html,
          text,
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-cache-headers] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: !alertable,
    total: results.length,
    violations_count: violations.length,
    violations,
    alert_emailed: emailed,
  });
}

function renderAlertText(violations: CanaryResult[], total: number): string {
  const lines: string[] = [];
  lines.push(`NakshIQ cache-header canary FAILED — ${violations.length} of ${total} canary URLs uncacheable.\n`);
  lines.push(`This is the same signature as the 2026-05-05 → 2026-05-27 ISR regression.`);
  lines.push(`Check Cache-Control / x-vercel-cache on these routes:\n`);
  violations.forEach((v) => {
    lines.push(`  • [${v.violation}] ${v.url}`);
    lines.push(`      cache-control: ${v.cache_control || "(empty)"}`);
    lines.push(`      x-vercel-cache: ${v.vc_pass1} → ${v.vc_pass2}`);
  });
  lines.push(`\nMost likely cause: a dynamic-segment route that's missing generateStaticParams,`);
  lines.push(`or a code path that reads cookies()/headers() inside the page handler.`);
  lines.push(`\nRunbook: .scrapes/seo-kasol-investigation-2026-05-27.md`);
  return lines.join("\n");
}

function renderAlertHtml(violations: CanaryResult[], total: number): string {
  const rows = violations
    .map(
      (v) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#dc2626;font-weight:600">${v.violation}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;word-break:break-all">${v.url}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#525252">${v.cache_control || "(empty)"}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#525252">${v.vc_pass1} → ${v.vc_pass2}</td>
    </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Cache-header canary: <span style="color:#dc2626">FAILED</span></h1>
    <p style="color:#525252;margin:0 0 16px">${violations.length} of ${total} canary URLs uncacheable. Same signature as the 2026-05-05 ISR regression.</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Violation</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">URL</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">cache-control</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">x-vercel-cache (p1→p2)</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#525252;font-size:12px;margin:16px 0 0">Most likely cause: a dynamic-segment route missing <code>generateStaticParams</code>, or a page reading <code>cookies()</code>/<code>headers()</code>. Runbook: <code>.scrapes/seo-kasol-investigation-2026-05-27.md</code>.</p>
  </body></html>`;
}
