import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "taneja.ashish5@gmail.com";

const TYPE_LABEL: Record<string, { label: string; adminPath: string; ackHeadline: string }> = {
  trip_report: {
    label: "Trip report",
    adminPath: "/en/admin/trip-reports",
    ackHeadline: "Trip report received",
  },
  review: {
    label: "Review",
    adminPath: "/en/admin/reviews",
    ackHeadline: "Review received",
  },
  question: {
    label: "Question",
    adminPath: "/en/admin/questions",
    ackHeadline: "Question received",
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface NotifyUGCArgs {
  type: "trip_report" | "review" | "question";
  destinationId: string;
  destinationName?: string | null;
  summary: string;
  body?: string | null;
  reporterName?: string | null;
  reporterEmail?: string | null;
  rating?: number | null;
}

/**
 * Notify admin (and ack reporter) for a UGC submission.
 * - Failures are logged but never thrown — UGC writes must never fail
 *   the user's request because email is down.
 */
export async function notifyAdminUGC(args: NotifyUGCArgs): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn(`[notify-ugc] RESEND_API_KEY missing; ${args.type} email skipped`);
    return;
  }

  const meta = TYPE_LABEL[args.type];
  const destLabel = args.destinationName || args.destinationId;
  const subject = `[NakshIQ · ${meta.label}] ${destLabel} — ${args.summary.slice(0, 80)}`;
  const adminUrl = `${SITE_URL}${meta.adminPath}`;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px;">
      <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">
        NakshIQ · ${escapeHtml(meta.label)}
      </p>
      <h2 style="margin: 0 0 16px; font-size: 18px;">New ${escapeHtml(meta.label.toLowerCase())} for ${escapeHtml(destLabel)}</h2>
      ${args.reporterName ? `<p style="margin: 0 0 4px;"><strong>From:</strong> ${escapeHtml(args.reporterName)}</p>` : ""}
      ${args.reporterEmail ? `<p style="margin: 0 0 4px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(args.reporterEmail)}">${escapeHtml(args.reporterEmail)}</a></p>` : ""}
      ${args.rating != null ? `<p style="margin: 0 0 4px;"><strong>Rating:</strong> ${args.rating}/5</p>` : ""}
      <p style="margin: 8px 0;"><strong>Summary:</strong> ${escapeHtml(args.summary)}</p>
      ${args.body ? `<hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" /><p style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(args.body)}</p>` : ""}
      <p style="margin-top: 24px;">
        <a href="${adminUrl}" style="background: #E55642; color: white; text-decoration: none; padding: 8px 16px; border-radius: 4px; display: inline-block; font-size: 14px;">
          Review in admin →
        </a>
      </p>
    </div>
  `;
  const adminText = [
    `NakshIQ · ${meta.label}`,
    `Destination: ${destLabel}`,
    args.reporterName ? `From: ${args.reporterName}` : null,
    args.reporterEmail ? `Email: ${args.reporterEmail}` : null,
    args.rating != null ? `Rating: ${args.rating}/5` : null,
    "",
    `Summary: ${args.summary}`,
    "",
    args.body ?? "",
    "",
    `Admin: ${adminUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: args.reporterEmail ?? REPLY_TO,
      subject,
      html: adminHtml,
      text: adminText,
    });
  } catch (err: any) {
    console.error(`[notify-ugc] admin email failed for ${args.type}:`, err?.message);
  }

  if (args.reporterEmail) {
    try {
      const ackHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 540px;">
          <p>Thanks for sharing your ${escapeHtml(meta.label.toLowerCase())} of <strong>${escapeHtml(destLabel)}</strong>.</p>
          <p>A NakshIQ editor reviews each submission within 2–5 working days. Once approved, your contribution lands on the destination page so the next traveler benefits from what you saw.</p>
          <p>If we have a follow-up question, we'll write back to this address. Your email is never displayed publicly.</p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            — NakshIQ editorial team<br/>
            <a href="${SITE_URL}" style="color: #888;">nakshiq.com</a>
          </p>
        </div>
      `;
      const ackText = `Thanks for sharing your ${meta.label.toLowerCase()} of ${destLabel}.\n\nA NakshIQ editor reviews each submission within 2-5 working days. Once approved, your contribution lands on the destination page so the next traveler benefits from what you saw.\n\nIf we have a follow-up question, we'll write back to this address. Your email is never displayed publicly.\n\n— NakshIQ editorial team\n${SITE_URL}`;

      await resend.emails.send({
        from: `NakshIQ <editor@nakshiq.com>`,
        to: args.reporterEmail,
        replyTo: "editor@nakshiq.com",
        subject: `${meta.ackHeadline} · NakshIQ`,
        html: ackHtml,
        text: ackText,
      });
    } catch (err: any) {
      console.warn(`[notify-ugc] reporter ack failed for ${args.type}:`, err?.message);
    }
  }
}
