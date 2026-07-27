import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Weekly SOS exception report. Runs 90 minutes AFTER sos-auto-reverify, which
 * has already re-fetched every due row's sources and stamped everything that
 * still checks out.
 *
 * This route therefore reports EXCEPTIONS ONLY — a number that vanished from
 * the official page that used to print it, or a source that has been failing to
 * load for three weeks running. Everything else is machine-clearable and never
 * reaches a person.
 *
 * It used to email every row whose 45-day timer had expired. That produced a
 * 42-row digest on 2026-07-27 in which every single row was `verified=true`
 * with a live source and nothing wrong — pure timer noise, which trains you to
 * ignore the alert that eventually matters. `needs_source` (no provenance
 * recorded yet for some number) is backlog for the discovery pass, NOT an alarm,
 * and is deliberately excluded here.
 *
 * Triggered from vercel.json crons.
 */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "taneja.ashish5@gmail.com";
const SITE_URL = "https://www.nakshiq.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const { data: rows, error } = await supabase
    .from("emergency_sos")
    .select(
      "destination_id, auto_verify_status, auto_verify_note, auto_verify_fail_streak, " +
        "destinations:destination_id(name, state_id)",
    );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Cast through unknown: the generated Supabase types predate migration 072
  // (auto_verify_* columns) and don't know these fields yet.
  type ReminderRow = {
    destination_id: string;
    auto_verify_status: string | null;
    auto_verify_note: string | null;
    auto_verify_fail_streak: number | null;
    destinations?: { name?: string; state_id?: string } | null;
  };
  const all = ((rows ?? []) as unknown as ReminderRow[]).map((r) => ({
    destination_id: r.destination_id,
    status: (r.auto_verify_status ?? "never_run") as string,
    note: (r.auto_verify_note ?? "") as string,
    streak: (r.auto_verify_fail_streak ?? 0) as number,
    name: r.destinations?.name ?? r.destination_id,
    state: r.destinations?.state_id ?? "?",
  }));

  /**
   * Did the auto-verifier actually run this week? Without this check, a broken
   * or undeployed cron looks exactly like "everything is fine" — silence would
   * be ambiguous, and the whole point of this route is that silence means good.
   */
  const since = new Date(Date.now() - 8 * 86400_000).toISOString();
  const { data: lastRun } = await supabase
    .from("ops_reports")
    .select("run_at")
    .eq("job", "sos-auto-reverify")
    .gte("run_at", since)
    .limit(1);
  const verifierRan = (lastRun?.length ?? 0) > 0;

  const exceptions = all.filter(
    (r) =>
      r.status === "number_changed" ||
      (r.status === "source_unreachable" && r.streak >= 3),
  );
  const backlog = all.filter((r) => r.status === "needs_source").length;

  const byState = new Map<string, typeof exceptions>();
  for (const r of exceptions) {
    if (!byState.has(r.state)) byState.set(r.state, []);
    byState.get(r.state)!.push(r);
  }
  const sortedStates = [...byState.entries()].sort((a, b) => b[1].length - a[1].length);

  const summary = {
    total: all.length,
    exceptions: exceptions.length,
    needs_source_backlog: backlog,
    auto_verifier_ran_this_week: verifierRan,
  };

  await supabase.from("ops_reports").insert({
    job: "sos-verify-reminder",
    summary,
    alerts_count: exceptions.length,
  });

  // Silence is the healthy state — but only if the verifier is alive.
  if (exceptions.length === 0 && verifierRan) {
    return NextResponse.json({ ok: true, summary, emailed: false });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ ok: true, summary, emailed: false, note: "RESEND_API_KEY missing" });
  }

  const stateRows = sortedStates
    .map(([state, items]) => {
      const list = items
        .map(
          (r) =>
            `<li><strong>${escapeHtml(r.name)}</strong><br><span style="color:#666;font-size:12px;">${escapeHtml(r.note)}</span></li>`,
        )
        .join("");
      return `<h4 style="margin:16px 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:#888;">${escapeHtml(state)} (${items.length})</h4><ul style="margin:0;padding-left:20px;font-size:13px;line-height:1.6;">${list}</ul>`;
    })
    .join("");

  const deadVerifier = !verifierRan
    ? `<p style="background:#fdecea;border-left:3px solid #E55642;padding:10px 12px;font-size:13px;margin:0 0 16px;">
         <strong>The auto-verifier has not run in 8 days.</strong> Nothing below can be trusted as current —
         check the <code>sos-auto-reverify</code> cron before reading the rest.
       </p>`
    : "";

  const subject = !verifierRan
    ? "[NakshIQ · SOS] auto-verifier has stopped running"
    : `[NakshIQ · SOS] ${exceptions.length} number${exceptions.length === 1 ? "" : "s"} changed at source`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 640px;">
      <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Weekly · SOS exceptions</p>
      <h2 style="margin:0 0 8px;font-size:18px;">${exceptions.length} row${exceptions.length === 1 ? "" : "s"} the robot could not settle</h2>
      ${deadVerifier}
      <p style="color:#666;font-size:13px;line-height:1.5;">
        Every other due row was re-fetched from its official source this morning and cleared automatically.
        These are the ones where a number that <em>used to be</em> printed on its official page is no longer
        there, or the source has failed to load three weeks running. Those are the only two things worth
        your attention — a changed emergency number is a real safety problem.
      </p>
      ${stateRows}
      <p style="color:#888;font-size:12px;margin-top:20px;">
        ${backlog} row${backlog === 1 ? "" : "s"} still awaiting a recorded source for at least one number.
        That is discovery backlog, handled automatically — no action needed.
      </p>
      <p style="margin-top:24px;">
        <a href="${SITE_URL}/en/admin/sos" style="background:#E55642;color:white;text-decoration:none;padding:8px 16px;border-radius:4px;display:inline-block;font-size:14px;">Open admin →</a>
      </p>
      <p style="color:#888;font-size:11px;margin-top:16px;">
        Run locally: <code>node --env-file=apps/web/.env.local scripts/audit-emergency-numbers.mjs</code>
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: OPS_FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: REPLY_TO,
      subject,
      html,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sos-verify-reminder] email failed:", message);
    return NextResponse.json({ ok: true, summary, emailed: false, error: message });
  }

  return NextResponse.json({ ok: true, summary, emailed: true });
}
