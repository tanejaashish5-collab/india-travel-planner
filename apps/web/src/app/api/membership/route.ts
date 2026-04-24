/**
 * /api/membership — Sprint 12 waitlist collector.
 *
 * Inserts into membership_waitlist. Double-opt-in flow lives in Sprint 16
 * when actual charging launches.
 *
 * Guards: honeypot field, simple rate limit (5 per IP per hour).
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export const runtime = "nodejs";

const RATE_LIMIT_PER_HOUR = 5;

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Honeypot silent drop
  if (body.hp && typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const name = body.name ? String(body.name).slice(0, 120) : null;
  const interest = body.interest ? String(body.interest).slice(0, 80) : null;
  const referral_source = body.referral_source ? String(body.referral_source).slice(0, 120) : null;

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const ipHash = hashIp(extractIp(req));

  const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("membership_waitlist")
    .select("*", { count: "exact", head: true })
    .eq("submitter_ip_hash", ipHash)
    .gte("submitted_at", oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  const { error } = await supabase
    .from("membership_waitlist")
    .upsert(
      { email, name, interest, referral_source, submitter_ip_hash: ipHash, status: "new" },
      { onConflict: "email", ignoreDuplicates: false }
    );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
