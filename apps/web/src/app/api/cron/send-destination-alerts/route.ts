import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import { getResend, FROM_ADDRESS, REPLY_TO, SITE_URL } from "@/lib/resend";
import PeakAlert from "@/emails/peak-alert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const MONTH_SLUGS = ["", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"];

// IST = UTC+5:30 (no DST). Convert without library to keep this lean.
function nowIST(): Date {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000);
}

const SEND_DAY_OF_MONTH = 7;  // fires on the 7th of the month BEFORE peak
const REPEAT_INTERVAL_DAYS = 300;
const BATCH_SIZE = 10;
const BATCH_PAUSE_MS = 1000;

async function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";

  // Either CRON_SECRET bearer auth OR Vercel cron header. Admin can also
  // force-run by passing ?force=1 alongside the bearer header.
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (!isVercelCron && header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const dryRun = req.nextUrl.searchParams.get("dryRun") === "1";
  const force = req.nextUrl.searchParams.get("force") === "1";

  const istNow = nowIST();
  const istDay = istNow.getUTCDate();         // we shifted by +5.5h then read UTC fields
  const istMonth = istNow.getUTCMonth() + 1;  // 1-12

  // Gate: only act on the 7th of the month unless ?force=1
  if (!force && istDay !== SEND_DAY_OF_MONTH) {
    return NextResponse.json({
      ok: true,
      noop: true,
      reason: `Day ${istDay} IST is not the send day (${SEND_DAY_OF_MONTH}). Cron is idempotent; no rows scanned.`,
      ist: { day: istDay, month: istMonth },
    });
  }

  // Target month = next month (peak month is 3 weeks out from today)
  const targetMonthNum = (istMonth % 12) + 1;

  const supabase = createClient(url, serviceKey);

  // Re-eligibility cutoff: last_sent_at IS NULL OR < NOW() - 300 days
  const reeligibleSince = new Date(Date.now() - REPEAT_INTERVAL_DAYS * 24 * 60 * 60 * 1000).toISOString();

  // Fetch candidate rows
  const { data: candidates, error: fetchErr } = await supabase
    .from("destination_alerts")
    .select("id, email, destination_id, target_month_num, unsubscribe_token, destination:destinations(id, name)")
    .eq("target_month_num", targetMonthNum)
    .not("confirmed_at", "is", null)
    .is("unsubscribed_at", null)
    .or(`last_sent_at.is.null,last_sent_at.lt.${reeligibleSince}`)
    .limit(2000);

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  const targets = (candidates ?? []) as Array<{
    id: string;
    email: string;
    destination_id: string;
    target_month_num: number;
    unsubscribe_token: string;
    destination: { id: string; name: string } | { id: string; name: string }[] | null;
  }>;

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      targetMonthNum,
      targetMonthName: MONTH_NAMES[targetMonthNum],
      count: targets.length,
      ist: { day: istDay, month: istMonth },
      preview: targets.slice(0, 20).map((t) => ({
        email_masked: t.email.replace(/^(.).+(@.*)$/, "$1***$2"),
        destination_id: t.destination_id,
        target_month: targetMonthNum,
      })),
    });
  }

  if (targets.length === 0) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      targetMonthNum,
      reason: "No eligible rows.",
    });
  }

  // Fetch destination_months rows for the targets in one query so we can
  // include score + verdict in each email without an N+1.
  const destinationIds = Array.from(new Set(targets.map((t) => t.destination_id)));
  const { data: monthRows } = await supabase
    .from("destination_months")
    .select("destination_id, score, verdict, note")
    .in("destination_id", destinationIds)
    .eq("month", targetMonthNum);

  const monthByDest = new Map<string, { score: number; verdict: string; note: string }>();
  for (const r of (monthRows ?? []) as Array<{ destination_id: string; score: number; verdict: string; note: string }>) {
    monthByDest.set(r.destination_id, { score: r.score, verdict: r.verdict, note: r.note });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "RESEND_API_KEY missing — no send fired" }, { status: 500 });
  }

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (t) => {
        // Atomic claim: only proceed if we successfully UPDATE last_sent_at.
        // This protects against cron double-fire (Vercel retries can happen).
        const { data: claimed, error: claimErr } = await supabase
          .from("destination_alerts")
          .update({ last_sent_at: new Date().toISOString() })
          .eq("id", t.id)
          .or(`last_sent_at.is.null,last_sent_at.lt.${reeligibleSince}`)
          .select("id")
          .maybeSingle();
        if (claimErr || !claimed) {
          // Someone else claimed it — skip
          return;
        }

        const destObj = Array.isArray(t.destination) ? t.destination[0] : t.destination;
        if (!destObj) {
          failed++;
          return;
        }
        const monthData = monthByDest.get(t.destination_id);
        const monthSlug = MONTH_SLUGS[targetMonthNum];
        const monthName = MONTH_NAMES[targetMonthNum];
        const unsubscribeUrl = `${SITE_URL}/api/destination-alerts/unsubscribe?token=${t.unsubscribe_token}`;

        try {
          const html = await render(
            PeakAlert({
              destinationName: destObj.name,
              destinationSlug: t.destination_id,
              peakMonthName: monthName,
              peakMonthSlug: monthSlug,
              score: monthData?.score ?? 0,
              verdict: monthData?.verdict ?? "go",
              scoreNote: monthData?.note,
              unsubscribeUrl,
            })
          );
          const text = `${destObj.name} hits its peak in ${monthName} — about 3 weeks out.\n\nFull guide: ${SITE_URL}/en/destination/${t.destination_id}/${monthSlug}\n\nUnsubscribe: ${unsubscribeUrl}`;

          await resend.emails.send({
            from: FROM_ADDRESS,
            to: t.email,
            replyTo: REPLY_TO,
            subject: `${destObj.name} peaks in ${monthName} — book this week`,
            html,
            text,
          });
          sent++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          failed++;
          errors.push(`${t.destination_id}: ${msg}`);
          // Roll back the claim so the next run can retry
          await supabase
            .from("destination_alerts")
            .update({ last_sent_at: null })
            .eq("id", t.id);
        }
      })
    );
    if (i + BATCH_SIZE < targets.length) await sleep(BATCH_PAUSE_MS);
  }

  return NextResponse.json({
    ok: true,
    sent,
    failed,
    targetMonthNum,
    targetMonthName: MONTH_NAMES[targetMonthNum],
    candidateCount: targets.length,
    ist: { day: istDay, month: istMonth },
    ...(errors.length > 0 && { errors: errors.slice(0, 10) }),
  });
}
