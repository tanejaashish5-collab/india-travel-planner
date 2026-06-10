import { NextRequest, NextResponse } from "next/server";
import { runEmbedRefresh } from "@/lib/embed-refresh";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Monthly RAG-index rebuild (Vercel cron). The Ask-NakshIQ index froze for
 *  8 weeks in 2026 (2026-04-13 → 2026-06-10) and kept serving facts that had
 *  since been purged from the DB — this cron makes that class of drift
 *  impossible. Auth via CRON_SECRET Bearer header, same as sibling crons.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const result = await runEmbedRefresh();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
