/**
 * /api/trip-reports — Sprint 12 UGC submissions endpoint.
 *
 * Writes to trip_reports with status='new' for moderation. Approved rows
 * surface on destination pages. Pair with /api/admin/trip-reports for
 * moderation workflow.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export const runtime = "nodejs";

const RATE_LIMIT_PER_HOUR = 3;
const MAX_IMAGES = 4;

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
  const visited_month = Number(body.visited_month);
  const visited_year = Number(body.visited_year);
  const rating = Number(body.rating);
  const summary = String(body.summary ?? "").trim();
  const bodyText = String(body.body ?? "").trim();

  if (!destination_id) {
    return NextResponse.json({ ok: false, error: "destination_required" }, { status: 400 });
  }
  if (!Number.isInteger(visited_month) || visited_month < 1 || visited_month > 12) {
    return NextResponse.json({ ok: false, error: "invalid_month" }, { status: 400 });
  }
  if (!Number.isInteger(visited_year) || visited_year < 2024 || visited_year > 2030) {
    return NextResponse.json({ ok: false, error: "invalid_year" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "invalid_rating" }, { status: 400 });
  }
  if (summary.length < 10 || summary.length > 200) {
    return NextResponse.json({ ok: false, error: "summary_length" }, { status: 400 });
  }
  if (bodyText.length < 100 || bodyText.length > 5000) {
    return NextResponse.json({ ok: false, error: "body_length" }, { status: 400 });
  }

  const reporter_name = body.reporter_name ? String(body.reporter_name).slice(0, 120) : null;
  const reporter_email = body.reporter_email ? String(body.reporter_email).slice(0, 320) : null;
  if (reporter_email && !EMAIL_RE.test(reporter_email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  const reporter_location = body.reporter_location ? String(body.reporter_location).slice(0, 120) : null;
  const highlightsRaw = Array.isArray(body.highlights) ? body.highlights : [];
  const warningsRaw = Array.isArray(body.warnings) ? body.warnings : [];
  const imagesRaw = Array.isArray(body.image_urls) ? body.image_urls : [];
  const highlights = highlightsRaw.map((h) => String(h).slice(0, 200)).filter(Boolean).slice(0, 8);
  const warnings = warningsRaw.map((w) => String(w).slice(0, 200)).filter(Boolean).slice(0, 8);
  const image_urls = imagesRaw
    .map((u) => String(u))
    .filter((u) => /^https:\/\/[^\s]+$/.test(u))
    .slice(0, MAX_IMAGES);

  const ipHash = hashIp(extractIp(req));

  // Rate-limit
  const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("trip_reports")
    .select("*", { count: "exact", head: true })
    .eq("submitter_ip_hash", ipHash)
    .gte("submitted_at", oneHourAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  // Validate destination exists
  const { data: dest } = await supabase
    .from("destinations")
    .select("id")
    .eq("id", destination_id)
    .single();
  if (!dest) {
    return NextResponse.json({ ok: false, error: "destination_not_found" }, { status: 404 });
  }

  const { error } = await supabase.from("trip_reports").insert({
    destination_id,
    visited_month,
    visited_year,
    rating,
    summary,
    body: bodyText,
    reporter_name,
    reporter_email,
    reporter_location,
    highlights,
    warnings,
    image_urls,
    submitter_ip_hash: ipHash,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
