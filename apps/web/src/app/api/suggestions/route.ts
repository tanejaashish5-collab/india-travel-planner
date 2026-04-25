import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { getResend, FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const runtime = "nodejs";

const MAX_LEN = 2000;
const RATE_LIMIT_PER_HOUR = 10;

// Where contact-form submissions are delivered. Defaults to the editor's
// verified gmail so messages land in a real inbox even before nakshiq.com
// MX records are set up to receive direct mail at editor@/hello@/press@.
const CONTACT_FORWARD_TO = process.env.CONTACT_FORWARD_TO ?? "taneja.ashish5@gmail.com";

// Topic → friendly desk label (for the email subject) and the marketing-facing
// reply-to address that the recipient sees. Actual delivery goes to
// CONTACT_FORWARD_TO regardless until MX is configured.
const TOPIC_DESK: Record<string, { label: string; replyTo: string }> = {
  correction: { label: "Correction / fact-check", replyTo: "editor@nakshiq.com" },
  press:      { label: "Press / media",           replyTo: "press@nakshiq.com" },
  partnership:{ label: "Partnership",             replyTo: "hello@nakshiq.com" },
  contributor:{ label: "Contributor",             replyTo: "hello@nakshiq.com" },
  other:      { label: "General",                 replyTo: "hello@nakshiq.com" },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendContactEmails(
  topic: string,
  message: string,
  submitterEmail: string | null,
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    console.warn("[contact] RESEND_API_KEY missing; contact email skipped");
    return { ok: false, error: "resend_not_configured" };
  }

  const desk = TOPIC_DESK[topic] ?? TOPIC_DESK.other;
  const subject = `[Contact · ${desk.label}] new message via nakshiq.com`;
  const safeMessage = escapeHtml(message);
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px;">
      <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">
        Contact · ${escapeHtml(desk.label)}
      </p>
      <h2 style="margin: 0 0 16px; font-size: 18px;">New contact-form message</h2>
      ${submitterEmail
        ? `<p style="margin: 0 0 8px;"><strong>From:</strong> <a href="mailto:${escapeHtml(submitterEmail)}">${escapeHtml(submitterEmail)}</a></p>`
        : `<p style="margin: 0 0 8px; color: #888;"><strong>From:</strong> (no email provided)</p>`
      }
      <p style="margin: 0 0 8px;"><strong>Topic:</strong> ${escapeHtml(desk.label)}</p>
      <p style="margin: 0 0 8px;"><strong>Routed to:</strong> ${escapeHtml(desk.replyTo)}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.5;">${safeMessage}</p>
    </div>
  `;
  const text = [
    `Contact · ${desk.label}`,
    `From: ${submitterEmail ?? "(no email provided)"}`,
    `Routed to: ${desk.replyTo}`,
    "",
    message,
  ].join("\n");

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_FORWARD_TO,
      replyTo: submitterEmail ?? REPLY_TO,
      subject,
      html,
      text,
    });
  } catch (err: any) {
    console.error("[contact] resend forward error:", err?.message);
    return { ok: false, error: err?.message ?? "send_failed" };
  }

  // Auto-reply to submitter if they provided an email
  if (submitterEmail) {
    try {
      const ackHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 540px;">
          <p>Thanks for writing in.</p>
          <p>Your message landed in our inbox. If it calls for a reply, we'll write back within 2-5 working days. Press enquiries are handled faster.</p>
          <p>If it was a correction, you'll see it acknowledged in our public corrections log at <a href="https://www.nakshiq.com/en/corrections">nakshiq.com/en/corrections</a> after the next editorial pass.</p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            — NakshIQ editorial team<br/>
            <a href="https://www.nakshiq.com" style="color: #888;">nakshiq.com</a>
          </p>
        </div>
      `;
      const ackText = `Thanks for writing in.\n\nYour message landed in our inbox. If it calls for a reply, we'll write back within 2-5 working days. Press enquiries are handled faster.\n\nIf it was a correction, you'll see it acknowledged in our public corrections log at https://www.nakshiq.com/en/corrections after the next editorial pass.\n\n— NakshIQ editorial team\nhttps://www.nakshiq.com`;

      await resend.emails.send({
        from: `NakshIQ <${desk.replyTo}>`,
        to: submitterEmail,
        replyTo: desk.replyTo,
        subject: "We got your message · NakshIQ",
        html: ackHtml,
        text: ackText,
      });
    } catch (err: any) {
      // Auto-reply failure shouldn't fail the whole submission
      console.warn("[contact] auto-reply send failed:", err?.message);
    }
  }

  return { ok: true };
}

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

  // For contact-form submissions, also forward via Resend so the message
  // actually reaches a human inbox (not just the user_suggestions table).
  // The suggest-an-edit flow stays DB-only; only target_table === "contact"
  // triggers the email forward.
  if (targetTable === "contact" && message) {
    const topic = targetId ?? "other";
    // Strip the "[topic] " prefix the form prepends, so the email body reads cleanly
    const cleanMessage = message.replace(/^\[[^\]]+\]\s*/, "");
    await sendContactEmails(topic, cleanMessage, submitterEmail);
    // Email-send failures are logged but don't fail the request — the DB row
    // is the authoritative record either way.
  }

  return NextResponse.json({ ok: true });
}
