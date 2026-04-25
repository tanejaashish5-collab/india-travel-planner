/**
 * /api/questions — Sprint 21 public Q&A submission.
 *
 * Mirrors /api/reviews + /api/trip-reports — anonymous + IP-rate-limited.
 * Writes status='pending'; pair with /api/admin/questions for moderation.
 * On approval, the answer is rendered at /destination/[id]/q/[slug] with
 * FAQPage + Article JSON-LD for AI citation surface.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "crypto";

export const runtime = "nodejs";

const RATE_LIMIT_PER_HOUR = 3;

const CATEGORIES = [
  "safety",
  "cost",
  "permits",
  "family",
  "transport",
  "timing",
  "practical",
  "weather",
] as const;

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

function slugify(question: string): string {
  const base = question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50)
    .replace(/-+$/g, "");
  const suffix = randomBytes(3).toString("hex");
  return `${base || "question"}-${suffix}`;
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

  if (body.hp && typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const destination_id = String(body.destination_id ?? "").trim();
  const question = String(body.question ?? "").trim();
  const category = String(body.category ?? "").trim();
  const traveler_type = body.traveler_type ? String(body.traveler_type).trim() : null;

  if (!destination_id) {
    return NextResponse.json({ ok: false, error: "destination_required" }, { status: 400 });
  }
  if (question.length < 30 || question.length > 300) {
    return NextResponse.json({ ok: false, error: "question_length" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return NextResponse.json({ ok: false, error: "invalid_category" }, { status: 400 });
  }
  if (
    traveler_type &&
    !TRAVELER_TYPES.includes(traveler_type as (typeof TRAVELER_TYPES)[number])
  ) {
    return NextResponse.json({ ok: false, error: "invalid_traveler_type" }, { status: 400 });
  }

  const submitter_name = body.submitter_name
    ? String(body.submitter_name).slice(0, 120)
    : null;
  const submitter_email = body.submitter_email
    ? String(body.submitter_email).slice(0, 320)
    : null;
  if (submitter_email && !EMAIL_RE.test(submitter_email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const ipHash = hashIp(extractIp(req));

  const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("questions")
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

  // Slug generation: kebab + 6-char random suffix. Retry once on the
  // unlikely chance of a collision with the unique constraint.
  let slug = slugify(question);
  let { error } = await supabase.from("questions").insert({
    destination_id,
    slug,
    question,
    category,
    traveler_type,
    submitter_name,
    submitter_email,
    submitter_ip_hash: ipHash,
    status: "pending",
  });

  if (error && /unique|duplicate/i.test(error.message)) {
    slug = slugify(question);
    const retry = await supabase.from("questions").insert({
      destination_id,
      slug,
      question,
      category,
      traveler_type,
      submitter_name,
      submitter_email,
      submitter_ip_hash: ipHash,
      status: "pending",
    });
    error = retry.error;
  }

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
