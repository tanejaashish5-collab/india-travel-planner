/**
 * /api/log-bot-visit — internal, called from middleware when a known AI /
 * search bot hits the site. Writes to `bot_visits` for surfacing on
 * /methodology/freshness.
 *
 * Non-authenticated on purpose: the middleware is the auth layer (only fires
 * on matched UAs from our known-bot list). A simple shared secret header
 * prevents random callers from filling the table.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const MAX_PATH_LEN = 512;
const MAX_UA_LEN = 400;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  const sharedSecret = process.env.BOT_LOG_SECRET ?? "";
  if (sharedSecret) {
    const provided = req.headers.get("x-bot-log-secret") ?? "";
    if (provided !== sharedSecret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  let body: { bot_name?: string; path?: string; locale?: string; user_agent?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const bot_name = String(body.bot_name ?? "").slice(0, 80);
  const path = String(body.path ?? "").slice(0, MAX_PATH_LEN);
  const locale = body.locale ? String(body.locale).slice(0, 8) : null;
  const user_agent = body.user_agent ? String(body.user_agent).slice(0, MAX_UA_LEN) : null;

  if (!bot_name || !path) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "db_misconfigured" }, { status: 500 });
  }

  const { error } = await supabase.from("bot_visits").insert({
    bot_name,
    path,
    locale,
    user_agent,
  });

  if (error) {
    // Swallow — we never want logging errors to propagate back to the bot.
    // Return 200 so the middleware doesn't retry.
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
