import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";
import PeakAlertConfirm from "@/emails/peak-alert-confirm";
import { getPeakMonth } from "@/lib/newsletter/peak-month";

export const runtime = "nodejs";

const MAX_ACTIVE_ALERTS_PER_EMAIL = 10;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const destinationId = typeof body?.destination_id === "string" ? body.destination_id.trim() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 50) : "website";

  if (!rawEmail || !rawEmail.includes("@") || rawEmail.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!destinationId) {
    return NextResponse.json({ error: "Missing destination_id" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  // Resolve the destination's peak month server-side so client can't lie.
  const peak = await getPeakMonth(destinationId);
  if (!peak) {
    return NextResponse.json(
      { error: "no_peak_month", message: "This destination doesn't have a clearly best month — no alert to set." },
      { status: 422 }
    );
  }

  // Fetch destination name for the confirmation email
  const { data: dest } = await supabase
    .from("destinations")
    .select("id, name")
    .eq("id", destinationId)
    .maybeSingle();
  if (!dest) {
    return NextResponse.json({ error: "destination_not_found" }, { status: 404 });
  }

  // Rate limit: max 10 active alerts per email
  const { count: activeCount } = await supabase
    .from("destination_alerts")
    .select("*", { count: "exact", head: true })
    .eq("email", rawEmail)
    .is("unsubscribed_at", null);
  if ((activeCount ?? 0) >= MAX_ACTIVE_ALERTS_PER_EMAIL) {
    return NextResponse.json(
      { error: "alert_limit_reached", limit: MAX_ACTIVE_ALERTS_PER_EMAIL },
      { status: 429 }
    );
  }

  // Upsert: if row already exists, re-issue confirmation if not yet confirmed.
  const { data: existing } = await supabase
    .from("destination_alerts")
    .select("id, confirmation_token, confirmed_at, unsubscribed_at, target_month_num")
    .eq("email", rawEmail)
    .eq("destination_id", destinationId)
    .maybeSingle();

  let confirmationToken: string;

  if (existing) {
    if (existing.confirmed_at && !existing.unsubscribed_at) {
      // Idempotent success — don't leak existence
      return NextResponse.json({ ok: true, alreadySubscribed: true, peak });
    }
    // Re-activate or re-send confirmation; refresh cached peak month
    const { data: updated, error: updateErr } = await supabase
      .from("destination_alerts")
      .update({
        unsubscribed_at: null,
        target_month_num: peak.monthNum,
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
      .from("destination_alerts")
      .insert({
        email: rawEmail,
        destination_id: destinationId,
        target_month_num: peak.monthNum,
        source,
      })
      .select("confirmation_token")
      .single();
    if (insertErr || !inserted) {
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    confirmationToken = inserted.confirmation_token as string;
  }

  // Cross-source tag (best-effort, ignore if no newsletter row): mark this
  // email as 'peak_alerts' in newsletter_subscribers.tags. Append-only to
  // preserve any existing tags ('window', 'savelist').
  try {
    const { data: subRow } = await supabase
      .from("newsletter_subscribers")
      .select("id, tags")
      .eq("email", rawEmail)
      .maybeSingle();
    if (subRow && !(subRow.tags ?? []).includes("peak_alerts")) {
      await supabase
        .from("newsletter_subscribers")
        .update({ tags: [...(subRow.tags ?? []), "peak_alerts"] })
        .eq("id", subRow.id);
    }
  } catch {
    // Tagging is analytics-only; never fail the subscription on tag errors.
  }

  const resend = getResend();
  if (!resend) {
    console.warn("[destination-alerts] RESEND_API_KEY missing; confirmation skipped");
    return NextResponse.json({ ok: true, confirmationSkipped: true, peak });
  }

  const confirmUrl = `${SITE_URL}/api/destination-alerts/confirm?token=${confirmationToken}`;
  const html = await render(
    PeakAlertConfirm({
      confirmUrl,
      destinationName: dest.name,
      peakMonthName: peak.monthName,
    })
  );
  const text = `Confirm your peak-month alert for ${dest.name} (${peak.monthName}): ${confirmUrl}\n\nIf you didn't sign up, ignore this email.`;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: rawEmail,
      replyTo: REPLY_TO,
      subject: `Confirm your ${dest.name} peak alert`,
      html,
      text,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[destination-alerts] Resend send error:", msg);
    return NextResponse.json({ ok: true, confirmationSkipped: true, peak });
  }

  return NextResponse.json({ ok: true, peak });
}
