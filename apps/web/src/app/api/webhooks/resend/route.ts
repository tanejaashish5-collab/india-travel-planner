/**
 * /api/webhooks/resend — Resend delivery events for The Window.
 *
 * Why this exists: on 2026-08-27 a confirmed subscriber reported never receiving
 * an issue and nothing in the system could answer it. The app's RESEND_API_KEY is
 * send-only (401 `restricted_api_key` on every read endpoint) and no webhook
 * existed, so no per-recipient delivery record lived anywhere. This route is the
 * record.
 *
 * Security (mirrors the Instagram webhook's posture — fail closed):
 *   • Verifies the Svix signature Resend signs with: HMAC-SHA256 over the RAW body
 *     as `${svix-id}.${svix-timestamp}.${body}`, compared with timingSafeEqual.
 *   • Rejects a timestamp outside ±5 minutes (replay window).
 *   • Accepts ANY of the space-delimited v1 signatures, so secret rotation works.
 *   • 401s when RESEND_WEBHOOK_SECRET is unset — never silently accepts.
 *
 * Idempotency: newsletter_events.svix_id is unique, so a Svix retry is a no-op
 * insert rather than a double count. Counter bumps are derived from the insert
 * actually landing, so retries never inflate opens/clicks.
 *
 * Always 200s after a valid signature (a non-2xx makes Svix retry for days).
 */
import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // createHmac + raw body need Node, not Edge
export const dynamic = "force-dynamic";

const REPLAY_WINDOW_SECONDS = 5 * 60;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Svix signature check. `svix-signature` is a space-delimited list of
 * `v1,<base64>` entries; any match passes. The secret is `whsec_<base64>` and it
 * is the DECODED bytes that key the HMAC.
 */
function verifySignature(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false;

  const id = req.headers.get("svix-id");
  const timestamp = req.headers.get("svix-timestamp");
  const signature = req.headers.get("svix-signature");
  if (!id || !timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() / 1000 - ts) > REPLAY_WINDOW_SECONDS) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest();

  for (const part of signature.split(" ")) {
    const [version, value] = part.split(",");
    if (version !== "v1" || !value) continue;
    const provided = Buffer.from(value, "base64");
    if (provided.length === expected.length && timingSafeEqual(provided, expected)) {
      return true;
    }
  }
  return false;
}

/** Resend nests the address differently per event; `to` may be string or array. */
function firstRecipient(data: Record<string, unknown> | undefined): string | null {
  if (!data) return null;
  const to = data.to;
  if (typeof to === "string") return to.toLowerCase();
  if (Array.isArray(to) && typeof to[0] === "string") return (to[0] as string).toLowerCase();
  return null;
}

export async function POST(req: NextRequest) {
  // Raw body FIRST — re-serialising parsed JSON would change the bytes and break
  // the HMAC.
  const rawBody = await req.text();

  if (!verifySignature(req, rawBody)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Signature was valid; don't make Svix retry for days over our own config gap.
    return NextResponse.json({ ok: true, stored: false, reason: "supabase-unconfigured" });
  }

  let event: { type?: string; created_at?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: true, stored: false, reason: "unparseable" });
  }

  const eventType = event.type ?? "unknown";
  const data = event.data;
  const resendEmailId = typeof data?.email_id === "string"
    ? data.email_id
    : typeof data?.id === "string"
      ? data.id
      : null;

  let email = firstRecipient(data);

  // Prefer the address we recorded at send time — the webhook payload can carry a
  // rewritten or truncated recipient.
  if (resendEmailId) {
    const { data: sendRow } = await supabase
      .from("newsletter_sends")
      .select("email")
      .eq("resend_email_id", resendEmailId)
      .maybeSingle();
    if (sendRow?.email) email = sendRow.email as string;
  }

  // svix-id is the idempotency key; the unique index makes a retry a no-op.
  const { error: insertError } = await supabase.from("newsletter_events").insert({
    svix_id: req.headers.get("svix-id"),
    resend_email_id: resendEmailId,
    email,
    event_type: eventType,
    occurred_at: event.created_at ?? new Date().toISOString(),
    payload: event as unknown as Record<string, unknown>,
  });

  // 23505 = unique violation = Svix retry of an event we already have. Not an error.
  const duplicate = insertError?.code === "23505";
  if (insertError && !duplicate) {
    console.error("[resend-webhook] insert failed", insertError.message);
    return NextResponse.json({ ok: true, stored: false, reason: "insert-failed" });
  }

  // Only bump issue counters when the insert actually landed, so retries can't
  // inflate them.
  if (!duplicate && resendEmailId && (eventType === "email.opened" || eventType === "email.clicked")) {
    const { data: sendRow } = await supabase
      .from("newsletter_sends")
      .select("issue_slug")
      .eq("resend_email_id", resendEmailId)
      .maybeSingle();
    if (sendRow?.issue_slug) {
      const column = eventType === "email.opened" ? "opens" : "clicks";
      const { data: issue } = await supabase
        .from("newsletter_issues")
        .select(`id, ${column}`)
        .eq("slug", sendRow.issue_slug as string)
        .maybeSingle();
      if (issue) {
        const current = Number((issue as Record<string, unknown>)[column] ?? 0);
        await supabase
          .from("newsletter_issues")
          .update({ [column]: current + 1 })
          .eq("id", (issue as { id: string }).id);
      }
    }
  }

  return NextResponse.json({ ok: true, stored: !duplicate, type: eventType });
}
