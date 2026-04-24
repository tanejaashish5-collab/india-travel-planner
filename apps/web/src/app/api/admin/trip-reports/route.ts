/**
 * /api/admin/trip-reports — Sprint 12 moderation endpoint.
 *
 * Auth pattern matches the rest of /api/admin/*: NEWSLETTER_SEND_SECRET
 * bearer token or ?key= param.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "db_not_configured" }, { status: 500 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "new";

  let query = supabase
    .from("trip_reports")
    .select(`
      id, destination_id, visited_month, visited_year, rating, summary, body,
      reporter_name, reporter_email, reporter_location, highlights, warnings,
      image_urls, status, moderator_note, submitted_at, approved_at, rejected_at,
      destination:destinations(name, state:states(name))
    `)
    .order("submitted_at", { ascending: false })
    .limit(200);

  if (status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ reports: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "db_not_configured" }, { status: 500 });

  let body: { id?: string; action?: "approve" | "reject"; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  const action = body.action;
  if (!id || !action || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const patch: Record<string, unknown> =
    action === "approve"
      ? { status: "approved", approved_at: now, rejected_at: null }
      : { status: "rejected", rejected_at: now, approved_at: null };

  if (body.note) patch.moderator_note = String(body.note).slice(0, 1000);

  const { error } = await supabase.from("trip_reports").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
