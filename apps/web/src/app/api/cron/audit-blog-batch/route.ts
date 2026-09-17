import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Weekly check that the blog batch actually produced articles.
//
// WHY THIS EXISTS. The "NakshIQ weekly blog batch" cloud routine (Saturdays
// 03:00 UTC) writes and publishes 5 GSC-demand articles. On 2026-08-29 it
// fired, hit the account's seven-day Claude usage limit, and exited after 53
// seconds having written nothing:
//
//     rate_limit: rejected (seven_day)
//     result: success  is_error=true  turns=1  duration=0s
//
// Note `success` and `is_error=true` on the same line. In the routines list
// that run is indistinguishable from the six that worked, so a whole week of
// content vanished and nothing said a word — found only on 2026-09-17 because
// the founder happened to ask. Same class as the cron-ok-true-while-every-item-
// failed scar: a total failure that raises nothing is worse than a loud one.
//
// The routine itself cannot fix this. Its own instruction to "never fabricate a
// success report" is sound, but a rate-limit rejection kills the session before
// it can obey any instruction. So the check has to live OUTSIDE the routine.
//
// WHAT IT CHECKS — the effect, not the pipeline. It does not ask whether the
// routine fired; it asks whether `articles` grew. A run that fires and produces
// nothing is exactly the failure we are hunting, so "did it run" is the wrong
// question (cf. the test-the-artefact-not-the-pipeline rule).
//
// Growth is measured against the count this job itself recorded last week,
// rather than a timestamp window. `articles` has no created_at column, and
// `published_at` is deliberately BACK-DATED by the routine's STEP 4b cadence
// rule (one article every 3-4 days so the blog reads as a continuous
// publication), so neither can tell you when a row actually appeared.
// `updated_at` does carry the real insert time, but it also moves whenever an
// article is edited for any other reason — so it is reported as a diagnostic
// and never used as the pass/fail signal.
const JOB = "audit-blog-batch";
const ALERT_TO = "taneja.ashish5@gmail.com";

// The routine publishes 5 per batch. Anything less means it was interrupted.
const EXPECTED_MIN_NEW = 5;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  // 1. Where the article count stands now.
  const { count, error } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  if (error || count === null) {
    // Write a failure row rather than 500-ing silently: a 500 with no
    // ops_reports row looks identical to the cron never running (the
    // audit-supabase-advisors lesson, caa9dae8).
    await supabase.from("ops_reports").insert({
      job: JOB,
      summary: { reason: "articles count query failed", detail: error?.message ?? "null count" },
      alerts_count: 0,
      ok: false,
    });
    return NextResponse.json({ ok: false, error: error?.message ?? "null count" }, { status: 500 });
  }

  // 2. What this job recorded last week.
  const { data: prevRows } = await supabase
    .from("ops_reports")
    .select("run_at, summary")
    .eq("job", JOB)
    .order("run_at", { ascending: false })
    .limit(1);
  const prev = prevRows?.[0] as { run_at: string; summary: Record<string, unknown> } | undefined;
  const prevCount =
    typeof prev?.summary?.total_articles === "number" ? (prev.summary.total_articles as number) : null;

  // 3. Diagnostics: real insert activity, and how far the back-dated timeline
  //    still trails real time (it was ~29 days behind on 2026-09-17 and gains
  //    roughly 10 days a week, so this should reach 0 and stay there).
  const since = new Date(Date.now() - 30 * 3600_000).toISOString();
  const { count: touched } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .gte("updated_at", since);

  const { data: newestRows } = await supabase
    .from("articles")
    .select("published_at")
    .order("published_at", { ascending: false })
    .limit(1);
  const newestPublished = newestRows?.[0]?.published_at ?? null;
  const daysBehind = newestPublished
    ? Math.round((Date.now() - new Date(newestPublished).getTime()) / 86400_000)
    : null;

  const added = prevCount === null ? null : count - prevCount;
  const baseline = prevCount === null;
  const missed = !baseline && (added as number) < EXPECTED_MIN_NEW;

  const summary = {
    total_articles: count,
    previous_total: prevCount,
    added_since_last_check: added,
    expected_min: EXPECTED_MIN_NEW,
    articles_touched_30h: touched ?? null,
    newest_published_at: newestPublished,
    timeline_days_behind: daysBehind,
    baseline_run: baseline,
  };

  await supabase.from("ops_reports").insert({
    job: JOB,
    summary,
    alerts_count: missed ? 1 : 0,
    // A missed batch is an OUTAGE of the content pipeline, not a flagged item,
    // so it must be ok:false — that is what escalates it to `errored` (red) in
    // the watchdog instead of the informational `needs_review` (yellow) that
    // never wakes anyone. This is the whole point of the job: 2026-08-29 looked
    // green and cost a week of content.
    ok: !missed,
  });

  let emailed = false;
  if (missed) {
    const resend = getResend();
    if (resend) {
      const body = [
        `The NakshIQ weekly blog batch did not publish this week.`,
        ``,
        `Articles now:        ${count}`,
        `Articles last check: ${prevCount} (${prev?.run_at ?? "unknown"})`,
        `Added:               ${added}  (expected at least ${EXPECTED_MIN_NEW})`,
        `Rows touched in 30h: ${touched ?? "unknown"}`,
        ``,
        `Most likely cause, based on 2026-08-29: the routine fired but hit the`,
        `seven-day Claude usage limit and exited in under a minute. That failure`,
        `reports itself as "success", so this check is the only thing that sees it.`,
        ``,
        `Check the run log:`,
        `  https://claude.ai/code/routines`,
        ``,
        `To recover the week, run the routine manually once the limit resets —`,
        `it picks topics from current demand and skips slugs that already exist,`,
        `so a catch-up run is safe to repeat.`,
      ].join("\n");
      try {
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] blog batch published nothing this week (${added} new, expected ${EXPECTED_MIN_NEW})`,
          text: body,
          html: `<pre style="font:14px/1.5 ui-monospace,monospace">${body.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`,
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-blog-batch] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({ ok: !missed, ...summary, alert_emailed: emailed });
}
