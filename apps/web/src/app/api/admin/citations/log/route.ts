/**
 * /api/admin/citations/log — Sprint 20.
 * Web-UI alternative to `node scripts/track-ai-citations.mjs --log ...`.
 * INSERTs into ai_citations (table from migration 029).
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ENGINES = ["perplexity", "chatgpt", "aio", "gemini", "claude", "copilot"] as const;

function isAuthed(req: NextRequest): boolean {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") || "";
  if (header === `Bearer ${secret}`) return true;
  const url = new URL(req.url);
  if (url.searchParams.get("key") === secret) return true;
  return false;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "db_not_configured" }, { status: 500 });

  let body: { query_id?: string; engine?: string; cited?: boolean; citation_url?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const query_id = String(body.query_id ?? "").trim();
  const engine = String(body.engine ?? "").trim();
  if (!query_id) return NextResponse.json({ error: "query_id_required" }, { status: 400 });
  if (!ENGINES.includes(engine as (typeof ENGINES)[number])) {
    return NextResponse.json({ error: "invalid_engine" }, { status: 400 });
  }
  if (typeof body.cited !== "boolean") {
    return NextResponse.json({ error: "cited_must_be_boolean" }, { status: 400 });
  }

  const insert: Record<string, unknown> = {
    query_id,
    engine,
    cited: body.cited,
  };
  if (body.citation_url) insert.citation_url = String(body.citation_url).slice(0, 500);
  if (body.note) insert.note = String(body.note).slice(0, 500);

  const { error } = await supabase.from("ai_citations").insert(insert);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
