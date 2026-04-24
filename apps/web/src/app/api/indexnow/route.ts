/**
 * IndexNow — push URL-change notifications to Bing, Yandex, Seznam,
 * Naver, DuckDuckGo, etc. Replaces the "submit sitemap and wait days"
 * loop with "URL changed, re-crawl now" (minutes).
 *
 * Spec: https://www.indexnow.org/documentation
 *
 * Auth: the IndexNow key must be served at a public URL on our domain
 *       (apps/web/public/<KEY>.txt), and the same key passed in the POST.
 *
 * Usage:
 *   POST /api/indexnow
 *   {
 *     "urls": ["https://www.nakshiq.com/en/destination/kaza", ...],
 *     "secret": "<INDEXNOW_WEBHOOK_SECRET>"   // protects our endpoint
 *   }
 *
 * Server-to-server only. The INDEXNOW_WEBHOOK_SECRET env var prevents
 * randoms on the internet burning our rate limit.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const HOST = "www.nakshiq.com";
const KEY = process.env.INDEXNOW_KEY ?? "755b461be890c806e09c71ee7484cc35";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const MAX_URLS_PER_CALL = 10000;

export async function POST(req: NextRequest) {
  // Webhook-shared-secret check — otherwise anyone can force-submit arbitrary
  // URLs on our behalf, wasting our IndexNow quota.
  const providedSecret = req.headers.get("x-indexnow-secret") ?? "";
  const expectedSecret = process.env.INDEXNOW_WEBHOOK_SECRET ?? "";
  if (!expectedSecret) {
    return NextResponse.json({ ok: false, error: "server_missing_secret" }, { status: 500 });
  }
  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: { urls?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter((u): u is string => typeof u === "string") : [];
  if (urls.length === 0) {
    return NextResponse.json({ ok: false, error: "no_urls" }, { status: 400 });
  }
  if (urls.length > MAX_URLS_PER_CALL) {
    return NextResponse.json(
      { ok: false, error: "too_many_urls", limit: MAX_URLS_PER_CALL },
      { status: 400 }
    );
  }

  // Every URL must be on our host — IndexNow rejects cross-host submissions
  const bad = urls.filter((u) => {
    try {
      return new URL(u).hostname !== HOST;
    } catch {
      return true;
    }
  });
  if (bad.length > 0) {
    return NextResponse.json(
      { ok: false, error: "urls_not_on_host", host: HOST, invalid: bad.slice(0, 5) },
      { status: 400 }
    );
  }

  // Fire the IndexNow POST. IndexNow endpoints federate — calling api.indexnow.org
  // propagates to Bing, Yandex, Seznam, Naver, DuckDuckGo automatically.
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = also accepted (async), 4xx/5xx = problem
  const ok = res.status === 200 || res.status === 202;
  return NextResponse.json({
    ok,
    upstream_status: res.status,
    submitted_count: urls.length,
  });
}

export async function GET() {
  // Health check — confirms key is available and endpoint is live
  return NextResponse.json({
    ok: true,
    host: HOST,
    key_location: KEY_LOCATION,
    requires_header: "x-indexnow-secret",
  });
}
