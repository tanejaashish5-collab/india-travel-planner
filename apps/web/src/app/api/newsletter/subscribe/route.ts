import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";
import ConfirmSubscription from "@/emails/confirm-subscription";
import SavedListWelcome from "@/emails/saved-list-welcome";
import { syncSavedDestinationAlerts } from "@/lib/newsletter/sync-saved-alerts";

export const runtime = "nodejs";

const ALLOWED_TAGS = ["window", "savelist", "peak_alerts"] as const;
type AllowedTag = typeof ALLOWED_TAGS[number];

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
  // Optional: caller can pass the saved-destination ids the sub had at
  // signup time (save-list email-gate flow). Capped at 50 to bound row size.
  const savedIds = Array.isArray(body?.saved_destination_ids)
    ? body.saved_destination_ids
        .filter((x: unknown): x is string => typeof x === "string" && x.length > 0 && x.length <= 80)
        .slice(0, 50)
    : [];
  // Optional: caller can pass tag list. Whitelisted to known values to
  // prevent arbitrary writes from the client.
  const rawTags = Array.isArray(body?.tags)
    ? (body.tags as unknown[]).filter((x): x is string => typeof x === "string")
    : [];
  const tags: AllowedTag[] = Array.from(
    new Set(rawTags.filter((t): t is AllowedTag => (ALLOWED_TAGS as readonly string[]).includes(t)))
  );

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
    .select("id, email, confirmation_token, confirmed_at, unsubscribed_at, tags, saved_destination_ids")
    .eq("email", rawEmail)
    .maybeSingle();

  let confirmationToken: string;
  let firstTimeSavelist = false;

  // Merge tags additively so repeat subs don't drop earlier provenance.
  const mergedTags = Array.from(new Set([
    ...((existing?.tags as string[] | null) ?? []),
    ...tags,
  ]));
  // saved_destination_ids: union (preserves earlier-saved ids).
  const mergedSaved = Array.from(new Set([
    ...((existing?.saved_destination_ids as string[] | null) ?? []),
    ...savedIds,
  ])).slice(0, 50);

  if (existing) {
    // Already subscribed and confirmed → pretend success (don't leak state)
    if (existing.confirmed_at && !existing.unsubscribed_at) {
      // But still update tags / saved_destination_ids so the analytics
      // and welcome-email derivation reflect the latest source.
      const nextTags = mergedTags;
      const nextSaved = mergedSaved;
      const tagsChanged = JSON.stringify(nextTags) !== JSON.stringify(existing.tags ?? []);
      const savedChanged = JSON.stringify(nextSaved) !== JSON.stringify(existing.saved_destination_ids ?? []);
      if (tagsChanged || savedChanged) {
        await supabase
          .from("newsletter_subscribers")
          .update({ tags: nextTags, saved_destination_ids: nextSaved })
          .eq("id", existing.id);
      }
      // Already confirmed (double opt-in satisfied) + on the savelist: if they
      // just saved new destinations, fan them into confirmed destination_alerts
      // so the cron alerts them before each peaks. Idempotent + best-effort.
      if (savedChanged && nextTags.includes("savelist")) {
        await syncSavedDestinationAlerts(supabase, rawEmail, nextSaved, "savelist-resave");
      }
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    // Re-activate unsubscribed OR re-send confirmation
    const { data: updated, error: updateErr } = await supabase
      .from("newsletter_subscribers")
      .update({
        unsubscribed_at: null,
        source,
        tags: mergedTags,
        saved_destination_ids: mergedSaved,
      })
      .eq("id", existing.id)
      .select("confirmation_token")
      .single();
    if (updateErr || !updated) {
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    confirmationToken = updated.confirmation_token as string;
    firstTimeSavelist =
      tags.includes("savelist") && !((existing.tags as string[] | null) ?? []).includes("savelist");
  } else {
    const { data: inserted, error: insertErr } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email: rawEmail,
        source,
        tags: mergedTags,
        saved_destination_ids: mergedSaved,
      })
      .select("confirmation_token")
      .single();
    if (insertErr || !inserted) {
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    confirmationToken = inserted.confirmation_token as string;
    firstTimeSavelist = tags.includes("savelist");
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
  const text = `You're almost subscribed to The Window — one tap finishes it.\n\nConfirm: ${confirmUrl}\n\nThe Window won't arrive until you click. If you didn't sign up, ignore this email.`;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: rawEmail,
      replyTo: REPLY_TO,
      subject: "Confirm your email to start The Window",
      html,
      text,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[newsletter] Resend send error:", msg);
    // Subscription is saved; we just couldn't send — return ok so caller doesn't retry insert
    return NextResponse.json({ ok: true, confirmationSkipped: true });
  }

  // Savelist welcome — sent in addition to the confirmation email when the
  // sub came in via the save-3-destinations gate. This is a transactional
  // email (user-initiated, personalised summary) so it doesn't wait for
  // double opt-in. Failures here don't block subscription success.
  if (firstTimeSavelist && mergedSaved.length > 0) {
    try {
      // Fetch destination names for the welcome email
      const { data: destRows } = await supabase
        .from("destinations")
        .select("id, name")
        .in("id", mergedSaved);
      const destinations = (destRows ?? []).map((d) => ({ id: d.id as string, name: d.name as string }));
      const welcomeHtml = await render(SavedListWelcome({ destinations }));
      const welcomeText = `Your NakshIQ wishlist (${destinations.length}):\n\n${destinations
        .map((d) => `• ${d.name} — https://www.nakshiq.com/en/destination/${d.id}`)
        .join("\n")}\n\nWe'll email you 3 weeks before each one hits its peak month.`;
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: rawEmail,
        replyTo: REPLY_TO,
        subject: `Your NakshIQ wishlist (${destinations.length} destination${destinations.length === 1 ? "" : "s"})`,
        html: welcomeHtml,
        text: welcomeText,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[newsletter] savelist welcome send error:", msg);
      // Non-blocking — confirmation email already sent
    }
  }

  return NextResponse.json({ ok: true });
}
