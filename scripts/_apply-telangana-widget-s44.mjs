/**
 * Apply Telangana widget topup S44 — concat agent-a/b/c.sql, run in one
 * transaction via Supabase MCP execute_sql is NOT used here (this runs
 * locally if SUPABASE_DB_URL is set); main pipeline path is to apply via
 * Supabase MCP execute_sql in the harness (this file is for record/replay).
 *
 * Run: node --env-file=apps/web/.env.local scripts/_apply-telangana-widget-s44.mjs
 */
import { readFileSync } from "fs";
import pg from "pg";

const dbUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Set SUPABASE_DB_URL or DATABASE_URL.");
  process.exit(1);
}

const files = [
  "data/research/telangana-widget-2026-05-15/agent-a.sql",
  "data/research/telangana-widget-2026-05-15/agent-b.sql",
  "data/research/telangana-widget-2026-05-15/agent-c.sql",
];

const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
await client.connect();
console.log("Connected. Applying Telangana S44 widget topup…");

try {
  await client.query("BEGIN");
  for (const f of files) {
    const sql = readFileSync(f, "utf-8");
    console.log(`  Applying ${f} (${sql.length} chars)…`);
    await client.query(sql);
  }

  const dests = [
    "adilabad","alampur","ananthagiri-hills","basara","bhadrachalam",
    "bhongir","hyderabad","kolanupaka","laknavaram","medak",
    "nagarjuna-konda","pillalamarri","pochampally","ramappa-temple","warangal",
  ];
  const gemR = await client.query(`SELECT near_destination_id, COUNT(*) FROM hidden_gems WHERE near_destination_id = ANY($1) GROUP BY 1 ORDER BY 1`, [dests]);
  const eatR = await client.query(`SELECT destination_id, COUNT(*) FROM local_eateries WHERE destination_id = ANY($1) GROUP BY 1 ORDER BY 1`, [dests]);
  const stayR = await client.query(`SELECT destination_id, COUNT(*) FROM destination_stay_picks WHERE destination_id = ANY($1) GROUP BY 1 ORDER BY 1`, [dests]);
  const counts = {};
  for (const d of dests) counts[d] = { g: 0, e: 0, s: 0 };
  for (const r of gemR.rows) counts[r.near_destination_id].g = Number(r.count);
  for (const r of eatR.rows) counts[r.destination_id].e = Number(r.count);
  for (const r of stayR.rows) counts[r.destination_id].s = Number(r.count);

  console.log("\nPost-apply Telangana tier (in-transaction):");
  for (const d of dests) {
    const c = counts[d];
    const tier = c.g >= 3 && c.e >= 3 && c.s >= 3 ? "A" : "B";
    console.log(`  ${tier}  ${d.padEnd(22)} g=${String(c.g).padStart(2)} e=${String(c.e).padStart(2)} s=${String(c.s).padStart(2)}`);
  }

  await client.query("COMMIT");
  console.log("\n✓ committed");
} catch (err) {
  await client.query("ROLLBACK");
  console.error("\n✗ apply failed, rolled back:", err.message);
  if (err.position) console.error(`  at position ${err.position}`);
  if (err.detail) console.error(`  detail: ${err.detail}`);
  if (err.hint) console.error(`  hint: ${err.hint}`);
  process.exit(1);
} finally {
  await client.end();
}
