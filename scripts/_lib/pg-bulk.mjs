/**
 * Reusable direct-Postgres bulk-write helper.
 *
 * WHY THIS EXISTS
 * ---------------
 * Bulk data work over the Supabase REST API — dump-and-apply, or per-row REST
 * writes — does two expensive things at once:
 *   1. burns REST egress (caused the 2026-05-23 free-tier egress freeze), and
 *   2. spills large query temp files to disk (a major driver of the 2026-06-04
 *      "Disk IO budget" alert — see memory reference_supabase_disk_io_temp_spills).
 * Direct Postgres (port 5432) is metered separately for egress and does in-place
 * UPDATEs with no dump round-trip. ALWAYS use this for >100-row writes.
 *
 * After a successful commit it busts the reference-data caches (lib/cached-data)
 * via revalidateTag so the live site reflects the change without waiting out the
 * 24h revalidate window: ISR pages (/vs, /cost-index, etc.) re-render within
 * seconds; the /api/search-index endpoint refreshes within ~5 min (its Vercel
 * CDN copy isn't purged by revalidateTag and self-expires on s-maxage), and
 * already-open browser tabs keep their in-session copy until reload.
 *
 * USAGE
 * -----
 *   import { withPgTransaction } from "./_lib/pg-bulk.mjs";
 *
 *   await withPgTransaction(async (client) => {
 *     for (const row of ROWS) {
 *       await client.query(
 *         `UPDATE destinations SET why_go = $2 WHERE id = $1`,
 *         [row.id, row.why_go],
 *       );
 *     }
 *   });
 *
 * Run scripts that use it with the env file so the connection string + secret load:
 *   node --env-file=apps/web/.env.local scripts/<your-script>.mjs
 *   DRY=1 node --env-file=apps/web/.env.local scripts/<your-script>.mjs   # rolls back
 *
 * Requires:
 *   SUPABASE_DB_URL (or DATABASE_URL)  — direct Postgres connection string
 *   NEWSLETTER_SEND_SECRET             — to call /api/admin/revalidate (optional;
 *                                        cache bust is skipped with a warning if unset)
 */
import pg from "pg";

// Keep in sync with REF_TAGS in apps/web/src/lib/cached-data.ts, plus the two
// pre-existing stat tags so counts on the homepage refresh too.
export const REFERENCE_TAGS = [
  "ref-destinations",
  "ref-collections",
  "ref-states",
  "ref-search-index",
  "app-stats",
  "tour-stats",
];

export function getDbUrl() {
  const url = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Set SUPABASE_DB_URL or DATABASE_URL — run with: node --env-file=apps/web/.env.local scripts/<name>.mjs",
    );
  }
  return url;
}

/**
 * Run `work(client)` inside a single transaction over a direct Postgres
 * connection. Commits on success, rolls back + rethrows on error, always closes
 * the connection. `DRY=1` rolls back instead of committing. By default busts the
 * reference caches after a successful commit.
 *
 * @param {(client: import("pg").Client) => Promise<any>} work
 * @param {{ bustCache?: boolean, dry?: boolean }} [opts]
 */
export async function withPgTransaction(work, opts = {}) {
  const { bustCache = true, dry = process.env.DRY === "1" } = opts;
  const client = new pg.Client({
    connectionString: getDbUrl(),
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    if (dry) {
      await client.query("ROLLBACK");
      console.log("DRY=1 — rolled back, nothing committed.");
      return result;
    }
    await client.query("COMMIT");
    if (bustCache) {
      await bustReferenceCache().catch((e) =>
        console.warn("⚠ cache bust skipped:", e.message),
      );
    }
    return result;
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    throw e;
  } finally {
    await client.end();
  }
}

/**
 * POST /api/admin/revalidate?tag=… for each reference tag so the live site
 * drops its 24h-cached reference lists. Non-fatal: logs and returns on failure.
 *
 * @param {{ base?: string, secret?: string, tags?: string[] }} [opts]
 */
export async function bustReferenceCache(opts = {}) {
  const base = opts.base ?? process.env.SITE_URL ?? process.env.BASE_URL ?? "https://www.nakshiq.com";
  const secret = opts.secret ?? process.env.NEWSLETTER_SEND_SECRET;
  const tags = opts.tags ?? REFERENCE_TAGS;

  if (!secret) {
    console.warn(
      "⚠ NEWSLETTER_SEND_SECRET not set — skipping cache bust. The site will pick up changes within 24h, or bust manually: POST " +
        `${base}/api/admin/revalidate?tag=ref-destinations`,
    );
    return;
  }

  console.log(`Busting reference caches on ${base} …`);
  for (const tag of tags) {
    try {
      const res = await fetch(`${base}/api/admin/revalidate?tag=${encodeURIComponent(tag)}`, {
        method: "POST",
        headers: { authorization: `Bearer ${secret}` },
      });
      console.log(`  ${res.ok ? "✓" : "✗"} ${tag}: ${res.status}`);
    } catch (e) {
      console.warn(`  ✗ ${tag}: ${e.message}`);
    }
  }
}
