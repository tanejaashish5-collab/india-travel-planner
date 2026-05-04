import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly data-baseline digest. Pulls a tight, no-noise snapshot from GA4
 * (real humans only — Direct excluded as bot mass) and GSC, then emails
 * a single scannable digest to the admin. Fires Sundays 09:00 IST.
 *
 * Mirror of `scripts/data-pull.mjs` queries but trimmed to the 5 weekly-
 * leading-indicators that matter:
 *   1. AIO referral count this week vs last (the leading indicator)
 *   2. Engaged-session humans this week vs last (audience trend)
 *   3. Top 5 engaged pages this week
 *   4. Top 5 GSC queries with biggest impression delta vs prior week
 *   5. ZERO-key-events alarm — fires if no key events were recorded
 */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "taneja.ashish5@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// Parse the service-account JSON from env, handling the common Vercel UI
// gotcha where the private_key's newlines come through as the literal two-
// character sequence "\n" instead of actual newlines (memory:
// feedback_env_var_hygiene). The googleapis SDK silently builds an invalid
// signer and only fails at request time with a useless "undefined undefined"
// error, so we normalize before constructing any client.
function parseCreds(): { ok: true; credentials: { client_email: string; private_key: string } } | { ok: false; error: string } {
  const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!raw) return { ok: false, error: "GOOGLE_APPLICATION_CREDENTIALS_JSON not set" };
  let parsed: { client_email?: string; private_key?: string };
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return { ok: false, error: `JSON.parse failed: ${(err as Error).message}` };
  }
  if (!parsed.client_email || !parsed.private_key) {
    return { ok: false, error: `creds missing client_email or private_key (got keys: ${Object.keys(parsed).join(",")})` };
  }
  // Normalize literal \n → real \n. Idempotent — safe if already correct.
  const private_key = parsed.private_key.includes("\\n")
    ? parsed.private_key.replace(/\\n/g, "\n")
    : parsed.private_key;
  return { ok: true, credentials: { client_email: parsed.client_email, private_key } };
}

function getGAClient(): { ok: true; client: BetaAnalyticsDataClient } | { ok: false; error: string } {
  const c = parseCreds();
  if (!c.ok) return c;
  // fallback: 'rest' forces HTTP/JSON transport instead of gRPC. Required for
  // Vercel serverless functions because gRPC's native bindings + Next.js
  // bundling produce silent failures with "undefined undefined: undefined"
  // gRPC status errors. REST works identically for our query pattern.
  return {
    ok: true,
    client: new BetaAnalyticsDataClient({ credentials: c.credentials, fallback: "rest" }),
  };
}

async function getGSCClient(): Promise<{ ok: true; client: ReturnType<typeof google.searchconsole> } | { ok: false; error: string }> {
  const c = parseCreds();
  if (!c.ok) return c;
  const auth = new google.auth.GoogleAuth({
    credentials: c.credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const authClient = await auth.getClient();
  return { ok: true, client: google.searchconsole({ version: "v1", auth: authClient as never }) };
}

type WindowMetric = { sessions: number; engaged: number; users: number };

async function ga4WindowTotals(
  client: BetaAnalyticsDataClient,
  property: string,
  start: string,
  end: string,
): Promise<{ aio: WindowMetric; humans: WindowMetric; keyEvents: number }> {
  const [aio, humans, events] = await Promise.all([
    client.runReport({
      property,
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "sessions" }, { name: "engagedSessions" }, { name: "totalUsers" }],
      dateRanges: [{ startDate: start, endDate: end }],
      limit: 100,
    }),
    client.runReport({
      property,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "engagedSessions" }, { name: "totalUsers" }],
      dateRanges: [{ startDate: start, endDate: end }],
    }),
    client.runReport({
      property,
      metrics: [{ name: "keyEvents" }],
      dateRanges: [{ startDate: start, endDate: end }],
    }),
  ]);

  const aiPattern = /^(chatgpt|chat\.openai|openai|perplexity|gemini\.google|bard|copilot|claude|you\.com|phind|brave\.search)/i;
  const aioRows = (aio[0].rows ?? []).filter((r) => aiPattern.test(r.dimensionValues?.[0]?.value ?? ""));
  const sumAio = aioRows.reduce<WindowMetric>(
    (acc, r) => ({
      sessions: acc.sessions + Number(r.metricValues?.[0]?.value ?? 0),
      engaged: acc.engaged + Number(r.metricValues?.[1]?.value ?? 0),
      users: acc.users + Number(r.metricValues?.[2]?.value ?? 0),
    }),
    { sessions: 0, engaged: 0, users: 0 },
  );

  const humanRows = (humans[0].rows ?? []).filter((r) => r.dimensionValues?.[0]?.value !== "Direct");
  const sumHumans = humanRows.reduce<WindowMetric>(
    (acc, r) => ({
      sessions: acc.sessions + Number(r.metricValues?.[0]?.value ?? 0),
      engaged: acc.engaged + Number(r.metricValues?.[1]?.value ?? 0),
      users: acc.users + Number(r.metricValues?.[2]?.value ?? 0),
    }),
    { sessions: 0, engaged: 0, users: 0 },
  );

  const keyEvents = Number(events[0].rows?.[0]?.metricValues?.[0]?.value ?? 0);

  return { aio: sumAio, humans: sumHumans, keyEvents };
}

async function ga4TopPages(client: BetaAnalyticsDataClient, property: string, start: string, end: string) {
  const [resp] = await client.runReport({
    property,
    dimensions: [{ name: "pagePath" }, { name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "engagedSessions" }, { name: "averageSessionDuration" }],
    dateRanges: [{ startDate: start, endDate: end }],
    dimensionFilter: {
      notExpression: {
        filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
      },
    },
    orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
    limit: 25,
  });
  const byPage = new Map<string, { engaged: number; avg: number }>();
  for (const r of resp.rows ?? []) {
    const k = r.dimensionValues?.[0]?.value ?? "";
    const prev = byPage.get(k) ?? { engaged: 0, avg: 0 };
    prev.engaged += Number(r.metricValues?.[0]?.value ?? 0);
    prev.avg = Math.max(prev.avg, Number(r.metricValues?.[1]?.value ?? 0));
    byPage.set(k, prev);
  }
  return Array.from(byPage.entries())
    .map(([page, v]) => ({ page, engaged: v.engaged, avg_s: Math.round(v.avg) }))
    .sort((a, b) => b.engaged - a.engaged)
    .slice(0, 5);
}

type GSCRow = { keys?: string[] | null; impressions?: number | null; clicks?: number | null; position?: number | null };
type GSCClient = ReturnType<typeof google.searchconsole>;

async function gscQueryDelta(
  client: GSCClient,
  siteUrl: string,
  thisStart: string,
  thisEnd: string,
  priorStart: string,
  priorEnd: string,
) {
  const [now, prior] = await Promise.all([
    client.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: thisStart, endDate: thisEnd, dimensions: ["query"], rowLimit: 200 },
    }),
    client.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: priorStart, endDate: priorEnd, dimensions: ["query"], rowLimit: 200 },
    }),
  ]);
  const priorMap = new Map<string, GSCRow>(((prior.data.rows ?? []) as GSCRow[]).map((r) => [r.keys?.[0] ?? "", r]));
  const out: Array<{ query: string; impressions: number; delta: number; clicks: number; position: number }> = [];
  for (const r of (now.data.rows ?? []) as GSCRow[]) {
    const key = r.keys?.[0] ?? "";
    const p = priorMap.get(key);
    const impressions = r.impressions ?? 0;
    const delta = impressions - (p?.impressions ?? 0);
    if (impressions < 20 || Math.abs(delta) < 10) continue;
    out.push({ query: key, impressions, delta, clicks: r.clicks ?? 0, position: r.position ?? 0 });
  }
  out.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return out.slice(0, 8);
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) return NextResponse.json({ error: "GA4_PROPERTY_ID not set" }, { status: 500 });
  const gaResult = getGAClient();
  if (!gaResult.ok) return NextResponse.json({ error: `GA4 client init failed: ${gaResult.error}` }, { status: 500 });
  const ga = gaResult.client;
  const property = `properties/${propertyId}`;

  const thisStart = daysAgo(7);
  const thisEnd = daysAgo(1);
  const priorStart = daysAgo(14);
  const priorEnd = daysAgo(8);

  let nowTotals, priorTotals, topPages;
  try {
    [nowTotals, priorTotals, topPages] = await Promise.all([
      ga4WindowTotals(ga, property, thisStart, thisEnd),
      ga4WindowTotals(ga, property, priorStart, priorEnd),
      ga4TopPages(ga, property, thisStart, thisEnd),
    ]);
  } catch (err) {
    // Surface enough error context to actually diagnose what failed.
    // GA4 SDK throws gRPC-style errors with non-standard shape; standard
    // Error.message is sometimes undefined. Capture the lot.
    const dump: Record<string, unknown> = {};
    if (err && typeof err === "object") {
      for (const key of Object.getOwnPropertyNames(err)) {
        const v = (err as Record<string, unknown>)[key];
        if (typeof v === "string" || typeof v === "number") dump[key] = v;
      }
      if ("constructor" in err && (err as { constructor: { name?: string } }).constructor?.name) {
        dump._ctor = (err as { constructor: { name: string } }).constructor.name;
      }
    } else {
      dump._raw = String(err);
    }
    // Also include creds shape (without the secret) so we can rule out the
    // private-key escape issue without redeploying again.
    const credsCheck = parseCreds();
    if (credsCheck.ok) {
      dump._creds_client_email = credsCheck.credentials.client_email;
      dump._creds_pk_starts = credsCheck.credentials.private_key.slice(0, 30);
      dump._creds_pk_has_real_newlines = credsCheck.credentials.private_key.includes("\n");
      dump._creds_pk_has_escaped_newlines = credsCheck.credentials.private_key.includes("\\n");
      dump._creds_pk_len = credsCheck.credentials.private_key.length;
    } else {
      dump._creds_error = credsCheck.error;
    }
    dump._property = property;
    return NextResponse.json({ error: "GA4 query failed", dump }, { status: 500 });
  }

  const gscResult = await getGSCClient();
  const siteUrl = process.env.GSC_SITE_URL;
  let gscDeltas: Awaited<ReturnType<typeof gscQueryDelta>> = [];
  let gscError: string | null = null;
  if (gscResult.ok && siteUrl) {
    try {
      gscDeltas = await gscQueryDelta(gscResult.client, siteUrl, thisStart, thisEnd, priorStart, priorEnd);
    } catch (err) {
      gscError = (err as Error).message;
    }
  } else if (!gscResult.ok) {
    gscError = gscResult.error;
  } else if (!siteUrl) {
    gscError = "GSC_SITE_URL not set";
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "data-baseline",
      summary: {
        humans_now: nowTotals.humans.engaged,
        humans_prior: priorTotals.humans.engaged,
        aio_now: nowTotals.aio.engaged,
        aio_prior: priorTotals.aio.engaged,
        key_events_now: nowTotals.keyEvents,
        gsc_rows: gscDeltas.length,
      },
      alerts_count: nowTotals.keyEvents === 0 ? 1 : 0,
    });
  }

  function deltaArrow(now: number, prior: number): string {
    if (prior === 0) return now > 0 ? `<span style="color:#1a8c4a;">+${now}</span>` : "—";
    const d = now - prior;
    const pct = Math.round(100 * d / prior);
    const color = d >= 0 ? "#1a8c4a" : "#c14a3a";
    const sign = d >= 0 ? "+" : "";
    return `<span style="color:${color};">${sign}${d} (${sign}${pct}%)</span>`;
  }

  const keyEventsAlarm = nowTotals.keyEvents === 0
    ? `<div style="background:#fef3f0;border-left:3px solid #c14a3a;padding:12px 16px;margin:16px 0;font-size:13px;">
        <strong style="color:#c14a3a;">⚠ ZERO key events recorded this week.</strong><br/>
        Either no humans completed save / share / signup / scroll-75 / outbound-click,
        OR the events aren't marked Key in GA4 Admin → Events.
        Check: <code>node scripts/data-pull.mjs ga4 funnel 7d</code>.
      </div>`
    : "";

  const topPagesHtml = topPages.length
    ? topPages
        .map(
          (p) =>
            `<tr>
              <td style="padding:6px 12px 6px 0;font-family:monospace;font-size:12px;">${escapeHtml(p.page.length > 50 ? p.page.slice(0, 47) + "..." : p.page)}</td>
              <td style="padding:6px 0;text-align:right;font-size:13px;">${p.engaged}</td>
              <td style="padding:6px 0;text-align:right;color:#666;font-size:12px;">${p.avg_s}s</td>
            </tr>`,
        )
        .join("")
    : `<tr><td colspan="3" style="padding:8px 0;color:#888;font-size:13px;">No engaged sessions this week.</td></tr>`;

  const gscBlock = gscError
    ? `<p style="color:#888;font-size:12px;">GSC skipped: ${escapeHtml(gscError)}</p>`
    : gscDeltas.length === 0
      ? `<p style="color:#888;font-size:12px;">No queries moved enough to flag this week.</p>`
      : `<table style="border-collapse:collapse;width:100%;font-size:13px;">
          <thead><tr style="border-bottom:1px solid #eee;text-align:left;">
            <th style="padding:6px 0;font-weight:500;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Query</th>
            <th style="padding:6px 0;text-align:right;font-weight:500;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Impr.</th>
            <th style="padding:6px 0;text-align:right;font-weight:500;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Δ vs prior</th>
            <th style="padding:6px 0;text-align:right;font-weight:500;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Pos</th>
          </tr></thead>
          <tbody>
          ${gscDeltas
            .map(
              (q) => `<tr>
                <td style="padding:6px 12px 6px 0;">${escapeHtml(q.query.length > 40 ? q.query.slice(0, 37) + "..." : q.query)}</td>
                <td style="padding:6px 0;text-align:right;">${q.impressions}</td>
                <td style="padding:6px 0;text-align:right;color:${q.delta >= 0 ? "#1a8c4a" : "#c14a3a"};">${q.delta >= 0 ? "+" : ""}${q.delta}</td>
                <td style="padding:6px 0;text-align:right;">${q.position.toFixed(1)}</td>
              </tr>`,
            )
            .join("")}
          </tbody>
        </table>`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;color:#222;">
      <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">Weekly · NakshIQ data baseline</p>
      <h2 style="margin:0 0 16px;font-size:18px;">Last 7d (${thisStart} → ${thisEnd})</h2>

      ${keyEventsAlarm}

      <h3 style="margin:16px 0 8px;font-size:14px;">The leading indicator: AIO referrals</h3>
      <table style="border-collapse:collapse;width:100%;font-size:13px;">
        <tr><td style="padding:4px 0;color:#666;">Sessions from ChatGPT/Perplexity/etc</td><td style="padding:4px 0;text-align:right;"><strong>${nowTotals.aio.sessions}</strong> · ${deltaArrow(nowTotals.aio.sessions, priorTotals.aio.sessions)}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Engaged of those</td><td style="padding:4px 0;text-align:right;"><strong>${nowTotals.aio.engaged}</strong> · ${deltaArrow(nowTotals.aio.engaged, priorTotals.aio.engaged)}</td></tr>
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px;">Real-human audience (Direct excluded)</h3>
      <table style="border-collapse:collapse;width:100%;font-size:13px;">
        <tr><td style="padding:4px 0;color:#666;">Engaged sessions</td><td style="padding:4px 0;text-align:right;"><strong>${nowTotals.humans.engaged}</strong> · ${deltaArrow(nowTotals.humans.engaged, priorTotals.humans.engaged)}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Users</td><td style="padding:4px 0;text-align:right;"><strong>${nowTotals.humans.users}</strong> · ${deltaArrow(nowTotals.humans.users, priorTotals.humans.users)}</td></tr>
        <tr><td style="padding:4px 0;color:#666;">Key events fired</td><td style="padding:4px 0;text-align:right;"><strong>${nowTotals.keyEvents}</strong> · ${deltaArrow(nowTotals.keyEvents, priorTotals.keyEvents)}</td></tr>
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px;">Top 5 engaged pages this week</h3>
      <table style="border-collapse:collapse;width:100%;">${topPagesHtml}</table>

      <h3 style="margin:24px 0 8px;font-size:14px;">GSC: queries with biggest impression delta vs prior week</h3>
      ${gscBlock}

      <p style="margin-top:32px;color:#888;font-size:11px;border-top:1px solid #eee;padding-top:12px;">
        Generated by <code>/api/cron/data-baseline</code>. Re-run locally: <code>node scripts/data-pull.mjs baseline</code>.<br/>
        Source: GA4 ${propertyId} · GSC ${siteUrl ?? "(not configured)"}
      </p>
    </div>
  `;

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ ok: true, emailed: false, note: "RESEND_API_KEY missing" });
  }
  try {
    await resend.emails.send({
      from: OPS_FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: REPLY_TO,
      subject: `[NakshIQ · Data] Week of ${thisStart} — ${nowTotals.humans.engaged} engaged humans, ${nowTotals.aio.sessions} AIO sessions`,
      html,
    });
  } catch (err) {
    return NextResponse.json({ ok: true, emailed: false, error: (err as Error).message });
  }

  return NextResponse.json({
    ok: true,
    emailed: true,
    summary: {
      window: { start: thisStart, end: thisEnd },
      humans_engaged: nowTotals.humans.engaged,
      aio_sessions: nowTotals.aio.sessions,
      key_events: nowTotals.keyEvents,
      gsc_rows: gscDeltas.length,
      gsc_error: gscError,
    },
  });
}
