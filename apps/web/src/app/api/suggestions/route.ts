import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export const runtime = "nodejs";

const MAX_LEN = 2000;
const RATE_LIMIT_PER_HOUR = 10;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function hashIp(ip: string): string {
  const salt = process.env.SUGGESTION_IP_SALT ?? "nakshiq-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function extractIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0"
  );
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silent drop
  if (body.hp && typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const targetTable = String(body.target_table ?? "").trim();
  const targetId = body.target_id ? String(body.target_id).trim() : null;
  const fieldPath = body.field_path ? String(body.field_path).trim() : null;
  const currentValue = body.current_value ? String(body.current_value).slice(0, MAX_LEN) : null;
  const suggestedValue = body.suggested_value ? String(body.suggested_value).slice(0, MAX_LEN) : null;
  const message = body.message ? String(body.message).slice(0, MAX_LEN) : null;
  const submitterEmail = body.submitter_email ? String(body.submitter_email).slice(0, 320) : null;

  if (!targetTable) {
    return NextResponse.json({ ok: false, error: "target_table_required" }, { status: 400 });
  }
  if (!message && !suggestedValue) {
    return NextResponse.json({ ok: false, error: "content_required" }, { status: 400 });
  }

  const ipHash = hashIp(extractIp(req));

  // Rate-limit: max RATE_LIMIT_PER_HOUR per IP per hour
  const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("user_suggestions")
    .select("*", { count: "exact", head: true })
    .eq("submitter_ip_hash", ipHash)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  const { error } = await supabase.from("user_suggestions").insert({
    target_table: targetTable,
    target_id: targetId,
    field_path: fieldPath,
    current_value: currentValue,
    suggested_value: suggestedValue,
    message,
    submitter_email: submitterEmail,
    submitter_ip_hash: ipHash,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
