import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";
import ConfirmSubscription from "@/emails/confirm-subscription";

export const runtime = "nodejs";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 50) : "website";

  if (!rawEmail || !rawEmail.includes("@") || rawEmail.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  // Upsert: if they already exist, we reuse their token (re-send confirm email)
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, confirmation_token, confirmed_at, unsubscribed_at")
    .eq("email", rawEmail)
    .maybeSingle();

  let confirmationToken: string;

  if (existing) {
    // Already subscribed and confirmed → pretend success (don't leak state)
    if (existing.confirmed_at && !existing.unsubscribed_at) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    // Re-activate unsubscribed OR re-send confirmation
    const { data: updated, error: updateErr } = await supabase
      .from("newsletter_subscribers")
      .update({
        unsubscribed_at: null,
        source,
      })
      .eq("id", existing.id)
      .select("confirmation_token")
      .single();
    if (updateErr || !updated) {
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    confirmationToken = updated.confirmation_token as string;
  } else {
    const { data: inserted, error: insertErr } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: rawEmail, source })
      .select("confirmation_token")
      .single();
    if (insertErr || !inserted) {
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    confirmationToken = inserted.confirmation_token as string;
  }

  // Send confirmation email
  const resend = getResend();
  if (!resend) {
    // No ESP configured — subscription is saved, but user won't get email
    // In dev this is expected; in prod this is a misconfiguration we still want logged
    console.warn("[newsletter] RESEND_API_KEY missing; confirmation email skipped");
    return NextResponse.json({ ok: true, confirmationSkipped: true });
  }

  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${confirmationToken}`;
  const html = await render(ConfirmSubscription({ confirmUrl }));
  const text = `Confirm your subscription to The Window: ${confirmUrl}\n\nIf you didn't sign up, ignore this email.`;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: rawEmail,
      replyTo: REPLY_TO,
      subject: "Confirm your subscription to The Window",
      html,
      text,
    });
  } catch (err: any) {
    console.error("[newsletter] Resend send error:", err?.message);
    // Subscription is saved; we just couldn't send — return ok so caller doesn't retry insert
    return NextResponse.json({ ok: true, confirmationSkipped: true });
  }

  return NextResponse.json({ ok: true });
}
