/**
 * /api/reviews — Sprint 20 UGC star-review submission.
 *
 * Mirrors /api/trip-reports — anonymous + IP-rate-limited (no login gate).
 * Writes to reviews with status='pending'; pair with /api/admin/reviews
 * for moderation. Approved rows surface on destination pages and feed
 * AggregateRating JSON-LD.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export const runtime = "nodejs";

const RATE_LIMIT_PER_HOUR = 5;

const TRAVELER_TYPES = [
  "solo",
  "couple",
  "family",
  "biker",
  "backpacker",
  "photographer",
  "first-timer",
  "senior",
] as const;

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

  const destination_id = String(body.destination_id ?? "").trim();
  const rating = Number(body.rating);
  const text = String(body.text ?? "").trim();
  const traveler_type = String(body.traveler_type ?? "").trim();

  if (!destination_id) {
    return NextResponse.json({ ok: false, error: "destination_required" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "invalid_rating" }, { status: 400 });
  }
  if (text.length < 50 || text.length > 2000) {
    return NextResponse.json({ ok: false, error: "text_length" }, { status: 400 });
  }
  if (!TRAVELER_TYPES.includes(traveler_type as (typeof TRAVELER_TYPES)[number])) {
    return NextResponse.json({ ok: false, error: "invalid_traveler_type" }, { status: 400 });
  }

  const visit_month = body.visit_month != null ? Number(body.visit_month) : null;
  const visit_year = body.visit_year != null ? Number(body.visit_year) : null;
  if (visit_month != null && (!Number.isInteger(visit_month) || visit_month < 1 || visit_month > 12)) {
    return NextResponse.json({ ok: false, error: "invalid_month" }, { status: 400 });
  }
  if (visit_year != null && (!Number.isInteger(visit_year) || visit_year < 2020 || visit_year > 2030)) {
    return NextResponse.json({ ok: false, error: "invalid_year" }, { status: 400 });
  }

  const reporter_name = body.reporter_name ? String(body.reporter_name).slice(0, 120) : null;
  const reporter_email = body.reporter_email ? String(body.reporter_email).slice(0, 320) : null;
  if (reporter_email && !EMAIL_RE.test(reporter_email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const ipHash = hashIp(extractIp(req));

  const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("submitter_ip_hash", ipHash)
    .gte("submitted_at", oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  const { data: dest } = await supabase
    .from("destinations")
    .select("id")
    .eq("id", destination_id)
    .single();
  if (!dest) {
    return NextResponse.json({ ok: false, error: "destination_not_found" }, { status: 404 });
  }

  const { error } = await supabase.from("reviews").insert({
    destination_id,
    rating,
    text,
    traveler_type,
    visit_month,
    visit_year,
    reporter_name,
    reporter_email,
    submitter_ip_hash: ipHash,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
