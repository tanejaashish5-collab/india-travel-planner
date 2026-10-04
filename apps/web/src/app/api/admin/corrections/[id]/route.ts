import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { verifyCorrection, changesHtml, esc, type CorrectionChange } from "@/lib/correction-links";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// One-click approval for a queued destination correction (migration 077).
//
// GET  ?sig=…  shows the change with Approve / Reject buttons and writes NOTHING.
//      Mail scanners and link previewers fetch GET links; if GET applied the fix,
//      a scanner would approve every correction before the founder saw it.
// POST         the button press: applies through apply_destination_corrections()
//              (compare-and-set: refuses if the page changed since the review),
//              or marks the item rejected, then revalidates the destination pages.

function page(title: string, body: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title></head>
<body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:640px;margin:0 auto;padding:24px 16px;line-height:1.5">${body}</body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );
}

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

async function load(id: string) {
  const s = db();
  if (!s) return { s: null, row: null };
  const { data } = await s
    .from("destination_corrections")
    .select("id, destination_id, changes, notes, status, created_at, result, destinations(name)")
    .eq("id", id)
    .maybeSingle();
  return { s, row: data as unknown as CorrectionRow | null };
}

const UUID = /^[0-9a-f-]{36}$/;

type CorrectionRow = {
  id: string;
  destination_id: string;
  changes: CorrectionChange[];
  notes: string | null;
  status: string;
  created_at: string;
  result: string | null;
  destinations: { name: string } | { name: string }[] | null;
};

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const sig = req.nextUrl.searchParams.get("sig");
  if (!UUID.test(id) || !verifyCorrection(id, sig)) return page("Link not valid", "<h1>Link not valid</h1>", 403);
  const { row } = await load(id);
  if (!row) return page("Not found", "<h1>Correction not found</h1>", 404);
  const name = (Array.isArray(row.destinations) ? row.destinations[0] : row.destinations)?.name ?? row.destination_id;
  const header = `<p style="font:600 11px ui-monospace,monospace;letter-spacing:.12em;color:#525252;margin:0">NAKSHIQ · PROPOSED CORRECTION</p>
<h1 style="font-size:22px;margin:6px 0 4px">${esc(name)}</h1>
<p style="margin:0 0 18px"><a href="https://www.nakshiq.com/en/destination/${esc(row.destination_id)}">View live page</a></p>
${changesHtml(row.changes)}
${row.notes ? `<p style="font-size:13px;color:#525252">${esc(row.notes)}</p>` : ""}`;
  if (row.status !== "pending") {
    return page("Already decided", `${header}<p style="font-weight:600">Already ${esc(row.status)}.${row.result ? ` ${esc(row.result)}` : ""}</p>`);
  }
  const button = (action: string, label: string, colour: string) =>
    `<form method="post" style="display:inline-block;margin:0 10px 10px 0"><input type="hidden" name="sig" value="${esc(sig)}"><input type="hidden" name="action" value="${action}"><button style="font:600 15px ui-sans-serif,system-ui;padding:12px 22px;border:0;border-radius:6px;background:${colour};color:#fff;cursor:pointer">${label}</button></form>`;
  return page(
    `Correction: ${name}`,
    `${header}<p style="margin:18px 0 10px">Red is what the page says now. Green is what it will say.</p>
${button("approve", "Approve and publish", "#15803d")}${button("reject", "Reject", "#525252")}`,
  );
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const form = await req.formData();
  const sig = String(form.get("sig") ?? "");
  const action = String(form.get("action") ?? "");
  if (!UUID.test(id) || !verifyCorrection(id, sig)) return page("Link not valid", "<h1>Link not valid</h1>", 403);
  if (action !== "approve" && action !== "reject") return page("Bad request", "<h1>Unknown action</h1>", 400);
  const { s, row } = await load(id);
  if (!s || !row) return page("Not found", "<h1>Correction not found</h1>", 404);
  if (row.status !== "pending") return page("Already decided", `<h1>Already ${esc(row.status)}</h1>`);

  const decided_at = new Date().toISOString();
  if (action === "reject") {
    // Rejected = the proposed wording is wrong, not that the page is right. The
    // destination stays unstamped, so the next review re-checks it after the hold.
    await s.from("destination_corrections").update({ status: "rejected", decided_at, result: "rejected by founder" }).eq("id", id).eq("status", "pending");
    return page("Rejected", `<h1>Rejected</h1><p>Nothing on the site changed. The page will be re-checked by a later review.</p>`);
  }

  const changes = row.changes.map(({ field, expected, value }) => ({ field, expected, value }));
  const { error } = await s.rpc("apply_destination_corrections", { p_id: row.destination_id, p_changes: changes });
  if (error) {
    await s.from("destination_corrections").update({ status: "failed", decided_at, result: error.message }).eq("id", id);
    return page("Not applied", `<h1>Not applied</h1><p>The page changed after the review, so nothing was written:</p><p style="font:13px ui-monospace,monospace">${esc(error.message)}</p>`, 409);
  }
  await s.from("destination_corrections").update({ status: "applied", decided_at, result: "applied" }).eq("id", id);
  for (const l of ["en", "hi"]) revalidatePath(`/${l}/destination/${row.destination_id}`, "layout");
  return page(
    "Published",
    `<h1>Published</h1><p>The ${esc(row.destination_id)} page now shows the new value and a fresh review date.</p><p><a href="https://www.nakshiq.com/en/destination/${esc(row.destination_id)}">View live page</a></p>`,
  );
}
