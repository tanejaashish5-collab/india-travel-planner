/**
 * /api/admin/questions — Sprint 21 Q&A moderation endpoint.
 * Mirrors /api/admin/reviews auth + action pattern. Difference: approve
 * action requires an `answer` body (100-3000 chars). Editor handle is
 * captured from the existing primary-editor record so JSON-LD on the
 * public page can attribute via Person.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getPrimaryEditor } from "@/lib/editor";

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
  const status = url.searchParams.get("status") || "pending";

  let query = supabase
    .from("questions")
    .select(`
      id, destination_id, slug, question, answer, category, traveler_type,
      submitter_name, submitter_email, editor_handle, status, moderator_note,
      submitted_at, answered_at, rejected_at,
      destination:destinations(name, state:states(name))
    `)
    .order("submitted_at", { ascending: false })
    .limit(200);

  if (status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ questions: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "db_not_configured" }, { status: 500 });

  let body: { id?: string; action?: "approve" | "reject"; answer?: string; note?: string };
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
  const patch: Record<string, unknown> = {};

  if (action === "approve") {
    const answer = String(body.answer ?? "").trim();
    if (answer.length < 100 || answer.length > 3000) {
      return NextResponse.json({ error: "answer_length" }, { status: 400 });
    }
    const editor = await getPrimaryEditor();
    patch.status = "answered";
    patch.answer = answer;
    patch.answered_at = now;
    patch.rejected_at = null;
    if (editor?.slug) patch.editor_handle = editor.slug;
  } else {
    patch.status = "rejected";
    patch.rejected_at = now;
    patch.answered_at = null;
  }

  if (body.note) patch.moderator_note = String(body.note).slice(0, 1000);

  const { error } = await supabase.from("questions").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
