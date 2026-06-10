import { NextResponse } from "next/server";
import { runEmbedRefresh } from "@/lib/embed-refresh";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Manual trigger: POST /api/embed?key=YOUR_SECRET
 *  Full rebuild of document_embeddings from the live DB (destinations, POIs,
 *  articles, stays, states, regions, eateries, festivals, safaris,
 *  pilgrimage routes). Shared logic lives in lib/embed-refresh.ts; the
 *  monthly cron at /api/cron/refresh-embeddings calls the same code.
 */
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("key") !== process.env.EMBED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await runEmbedRefresh();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
