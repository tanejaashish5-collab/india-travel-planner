import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";
import { correctionUrl, changesHtml, esc, type CorrectionChange } from "@/lib/correction-links";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Emails the founder every PENDING destination correction, each with a signed
// Approve link. Called by scripts/freshness-review-weekly.sh after a run that
// queued something (the local Mac has no Resend key; this deployment does).
// Exception-only: no pending items = no email.
//
//   POST /api/admin/corrections/notify
//   Authorization: Bearer $NEWSLETTER_SEND_SECRET
export async function POST(req: NextRequest) {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  if (!secret) return NextResponse.json({ error: "secret not configured" }, { status: 500 });
  if ((req.headers.get("authorization") || "") !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const to = process.env.ADMIN_EMAIL;
  if (!url || !key || !to) return NextResponse.json({ error: "not configured" }, { status: 500 });
  const s = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await s
    .from("destination_corrections")
    .select("id, destination_id, changes, notes, created_at, destinations(name)")
    .eq("status", "pending")
    .order("created_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data?.length) return NextResponse.json({ ok: true, pending: 0, emailed: false });

  type Pending = { id: string; destination_id: string; changes: CorrectionChange[]; created_at: string; destinations: { name: string } | { name: string }[] | null };
  const items = (data as unknown as Pending[]).map((r) => {
    const name = (Array.isArray(r.destinations) ? r.destinations[0] : r.destinations)?.name ?? r.destination_id;
    return { name, link: correctionUrl(r.id), changes: r.changes, since: String(r.created_at).slice(0, 10) };
  });
  const html = `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:640px;margin:0 auto;padding:24px">
<h1 style="font-size:20px;margin:0 0 6px">${items.length} page fix${items.length > 1 ? "es" : ""} waiting for your OK</h1>
<p style="color:#525252;margin:0 0 20px">The weekly review found these pages saying something that is no longer true. Check the green text, then press the button. Nothing changes until you do.</p>
${items
  .map(
    (i) => `<h2 style="font-size:16px;margin:24px 0 8px">${esc(i.name)} <span style="font-weight:400;color:#737373;font-size:12px">found ${esc(i.since)}</span></h2>
${changesHtml(i.changes)}
${i.link ? `<a href="${i.link}" style="display:inline-block;background:#171717;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:600">Review and approve</a>` : ""}`,
  )
  .join("")}
</body></html>`;
  const text = items.map((i) => `${i.name}: ${i.changes.map((c) => `${c.field}: "${c.expected}" -> "${c.value}"`).join("; ")}\n${i.link ?? ""}`).join("\n\n");

  const resend = getResend();
  if (!resend) return NextResponse.json({ error: "resend not configured" }, { status: 500 });
  await resend.emails.send({
    from: OPS_FROM_ADDRESS,
    to,
    replyTo: REPLY_TO,
    subject: `[NakshIQ] ${items.length} page fix${items.length > 1 ? "es" : ""} waiting for your OK`,
    html,
    text,
  });
  return NextResponse.json({ ok: true, pending: items.length, emailed: true });
}
