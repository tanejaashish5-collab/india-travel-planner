import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { buildWindowIssue, type IssueOverrides } from "@/lib/newsletter/build-issue";
import TheWindow from "@/emails/the-window";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function authorized(req: NextRequest): boolean {
  const newsletterSecret = process.env.NEWSLETTER_SEND_SECRET;
  const cronSecret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization");

  // Vercel Cron auto-injects Authorization: Bearer $CRON_SECRET when CRON_SECRET is set
  if (cronSecret && header === `Bearer ${cronSecret}`) return true;

  // Admin UI + manual calls use NEWSLETTER_SEND_SECRET (Bearer OR ?secret=)
  if (newsletterSecret) {
    if (header === `Bearer ${newsletterSecret}`) return true;
    if (req.nextUrl.searchParams.get("secret") === newsletterSecret) return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  // Vercel Cron hits GET
  return handle(req);
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const testEmail = req.nextUrl.searchParams.get("test");

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  // Optional per-request overrides (launch issue, year-end, crisis response).
  // JSON body only; GET requests (Vercel Cron) pass nothing → weekly auto-ship
  // behaves exactly as before. POST from the admin UI may include overrides.
  let overrides: IssueOverrides | undefined;
  if (req.method === "POST" && req.headers.get("content-type")?.includes("application/json")) {
    const body = await req.json().catch(() => null);
    if (body && typeof body === "object" && body.overrides && typeof body.overrides === "object") {
      overrides = body.overrides as IssueOverrides;
    }
  }

  // 1. Build issue content from DB
  const issue = await buildWindowIssue(overrides);
  if ("error" in issue) {
    return NextResponse.json({ error: issue.error }, { status: 500 });
  }

  // 2. Idempotency: don't send same slug twice
  if (!dry && !testEmail) {
    const { data: existing } = await supabase
      .from("newsletter_issues")
      .select("id, sent_at")
      .eq("slug", issue.slug)
      .maybeSingle();
    if (existing?.sent_at) {
      return NextResponse.json({ error: "Issue already sent", slug: issue.slug }, { status: 409 });
    }
  }

  // 3. Load recipients (confirmed + not unsubscribed)
  let recipients: Array<{ email: string; unsubscribe_token: string }> = [];
  if (testEmail) {
    // Test send: grab the unsub token for test email so the link is real
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("email, unsubscribe_token")
      .eq("email", testEmail.toLowerCase())
      .maybeSingle();
    if (data) {
      recipients = [{ email: data.email as string, unsubscribe_token: data.unsubscribe_token as string }];
    } else {
      // Test email not subscribed → fabricate a null-safe token so we can still preview send
      recipients = [{ email: testEmail.toLowerCase(), unsubscribe_token: "test-no-token" }];
    }
  } else {
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("email, unsubscribe_token")
      .not("confirmed_at", "is", null)
      .is("unsubscribed_at", null);
    recipients = (data ?? []).map((r: any) => ({ email: r.email, unsubscribe_token: r.unsubscribe_token }));
  }

  if (!dry && recipients.length === 0) {
    return NextResponse.json({ error: "No confirmed subscribers" }, { status: 400 });
  }

  // 4. Render one HTML with placeholder for per-recipient unsub URL, OR render per-recipient if small list
  const resend = getResend();
  const webViewUrl = `${SITE_URL}/en/the-window/${issue.slug}`;

  if (dry) {
    const sampleHtml = await render(TheWindow({
      ...issue.props,
      unsubscribeUrl: `${SITE_URL}/api/newsletter/unsubscribe?token=SAMPLE`,
      webViewUrl,
    }));
    return NextResponse.json({
      dry: true,
      issue: { slug: issue.slug, subject: issue.subject, previewText: issue.previewText, props: issue.props },
      recipientCount: recipients.length,
      htmlPreview: sampleHtml.slice(0, 500) + "...",
    });
  }

  if (!resend) {
    return NextResponse.json({ error: "Resend not configured" }, { status: 503 });
  }

  // 5. Send in batches of 100 (Resend batch API limit)
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < recipients.length; i += 100) {
    const batch = recipients.slice(i, i + 100);
    const emails = await Promise.all(batch.map(async (r) => {
      const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${r.unsubscribe_token}`;
      const html = await render(TheWindow({ ...issue.props, unsubscribeUrl, webViewUrl }));
      return {
        from: FROM_ADDRESS,
        to: r.email,
        reply_to: REPLY_TO,
        subject: issue.subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }));

    try {
      const result = await resend.batch.send(emails as any);
      if ((result as any).error) {
        errors.push((result as any).error.message ?? "batch error");
        failed += batch.length;
        continue;
      }

      // Count the EMAILS Resend accepted, not the batch call. Resend returns one
      // id per accepted message, positionally matching the input array — a short
      // array means some addresses were rejected inside a "successful" batch.
      // Counting batch.length here is what made recipient_count unfalsifiable
      // when a subscriber reported a missing issue on 2026-08-27.
      const ids: Array<{ id?: string }> = (result as any).data?.data ?? (result as any).data ?? [];
      const accepted = Array.isArray(ids) ? ids.length : 0;
      sent += accepted;
      if (accepted < batch.length) {
        failed += batch.length - accepted;
        errors.push(`batch ${i / 100}: ${batch.length - accepted} of ${batch.length} not accepted`);
      }

      // Ledger: which Resend id went to which address, so a later delivery
      // webhook resolves back to a subscriber and an issue.
      if (!testEmail && Array.isArray(ids) && accepted > 0) {
        const rows = ids
          .map((entry, idx) => ({
            resend_email_id: entry?.id,
            email: batch[idx]?.email,
            issue_slug: issue.slug,
          }))
          .filter((r) => r.resend_email_id && r.email);
        if (rows.length > 0) {
          const { error: ledgerError } = await supabase
            .from("newsletter_sends")
            .upsert(rows, { onConflict: "resend_email_id" });
          if (ledgerError) errors.push(`ledger: ${ledgerError.message}`);
        }
      }
    } catch (err: any) {
      errors.push(err?.message ?? "send failed");
      failed += batch.length;
    }
  }

  // 6. Record the issue (skip for test sends)
  if (!testEmail) {
    const archivedHtml = await render(TheWindow({
      ...issue.props,
      unsubscribeUrl: `${SITE_URL}/api/newsletter/unsubscribe?token=ARCHIVED`,
      webViewUrl,
    }));
    await supabase.from("newsletter_issues").insert({
      slug: issue.slug,
      subject: issue.subject,
      preview_text: issue.previewText,
      html: archivedHtml,
      issue_number: issue.props.issueNumber,
      sent_at: new Date().toISOString(),
      recipient_count: sent,
      failed_count: failed,
    });
  }

  // ok reflects the ITEMS, not the call: a send where nothing was accepted must
  // not report success (the ok:true-with-total-item-failure class).
  return NextResponse.json(
    { ok: sent > 0, sent, failed, errors, slug: issue.slug },
    { status: sent > 0 ? 200 : 500 },
  );
}
