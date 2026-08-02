import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildWindowIssue } from "@/lib/newsletter/build-issue";

export const revalidate = 3600;

/**
 * GET /api/the-window/latest
 *
 * The most recently SENT issue of The Window, as structured data.
 *
 * Exists so the social autoposter can publish the newsletter itself rather than
 * picking its own destinations. Before this, the two ran on completely separate
 * selection logic: the email features the #1 Weekly Pick (Hanle, issue №15),
 * while autoposter.py never read the weekly-picks API at all, so the Sunday
 * feed showed something unrelated to the issue that had gone out that morning.
 *
 * Why it REPLAYS rather than rebuilds: buildWindowIssue() numbers the NEXT
 * issue (last + 1) and reads the CURRENT week. Calling it bare on a Sunday
 * afternoon would return "issue №16" with next week's picks — a plausible-
 * looking payload describing an issue nobody received. So the sent row supplies
 * the issue number, and its slug supplies the month/week window. Picks are
 * deterministic per (month, week, year) and the skip/road rotations key off
 * issue_number, so replaying those inputs reproduces the issue as sent.
 *
 * Content is already public at /en/the-window/{slug}; this is the same issue in
 * machine-readable form, so no auth. Returns 404 before the first send.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(url, key);
  const { data: sent, error } = await supabase
    .from("newsletter_issues")
    .select("slug, subject, preview_text, issue_number, sent_at, recipient_count")
    .not("sent_at", "is", null)
    .order("sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!sent) {
    return NextResponse.json({ error: "No issue has been sent yet" }, { status: 404 });
  }

  // Slug is "YYYY-MM-wN" (build-issue.ts). Parse rather than trust "now" — an
  // issue sent on the 1st is week 1 even when this is called on the 8th.
  const m = /^(\d{4})-(\d{2})-w(\d)$/.exec(sent.slug ?? "");
  const window = m
    ? { year: Number(m[1]), month: Number(m[2]), week: Number(m[3]) }
    : {};

  const issue = await buildWindowIssue({
    issueNumber: sent.issue_number ?? undefined,
    slug: sent.slug ?? undefined,
    subject: sent.subject ?? undefined,
    previewText: sent.preview_text ?? undefined,
    ...window,
  });

  if ("error" in issue) {
    return NextResponse.json({ error: issue.error }, { status: 503 });
  }

  return NextResponse.json(
    {
      slug: issue.slug,
      subject: issue.subject,
      previewText: issue.previewText,
      sentAt: sent.sent_at,
      recipientCount: sent.recipient_count,
      webUrl: `https://nakshiq.com/en/the-window/${issue.slug}`,
      ...issue.props,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
