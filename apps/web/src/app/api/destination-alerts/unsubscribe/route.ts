import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function htmlPage(title: string, message: string, ok: boolean): string {
  const color = ok ? "#10b981" : "#E55642";
  const emoji = ok ? "✓" : "!";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${title} — NakshIQ</title>
  <style>
    body { background: #161614; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 48px 16px; }
    .card { max-width: 480px; margin: 0 auto; padding: 40px 28px; background: #1e1e1c; border-radius: 16px; text-align: center; }
    .badge { width: 56px; height: 56px; border-radius: 999px; background: ${color}22; color: ${color}; font-size: 28px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    h1 { font-size: 22px; color: #fff; margin: 0 0 8px; }
    p { font-size: 15px; color: #aaa; line-height: 1.6; margin: 0 0 24px; }
    a.btn { display: inline-block; background: #E55642; color: #fff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${emoji}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a class="btn" href="https://www.nakshiq.com">Back to NakshIQ</a>
  </div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  return handle(req);
}
export async function POST(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(htmlPage("Invalid link", "The unsubscribe link is missing a token.", false), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return new NextResponse(htmlPage("Service unavailable", "Please try again in a minute.", false), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const { data: existing } = await supabase
    .from("destination_alerts")
    .select("id, unsubscribed_at, destination:destinations(name)")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (!existing) {
    return new NextResponse(htmlPage("Link expired", "This unsubscribe link is no longer valid.", false), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (!existing.unsubscribed_at) {
    await supabase
      .from("destination_alerts")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("id", existing.id);
  }

  const dest = existing.destination as unknown as { name?: string } | null;
  const destName = dest?.name ?? "this destination";

  return new NextResponse(
    htmlPage(
      "Alert removed.",
      `You won't receive peak-month alerts for ${destName}. Your Window subscription (if any) is unaffected.`,
      true
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
