/**
 * Apply migration 038 (emergency_sos source link + staleness view) directly
 * via the Postgres connection. We sidestep `supabase db push` because the
 * remote migration-history table has drifted from local file numbering and
 * a `db pull` would overwrite local state. This is a tiny additive change
 * — only ALTER TABLE ADD COLUMN IF NOT EXISTS + CREATE OR REPLACE VIEW —
 * so direct apply is safe and idempotent.
 *
 * Run: node --env-file=apps/web/.env.local scripts/_apply-migration-038.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Set SUPABASE_DB_URL (postgres://… service-role conn string) or DATABASE_URL.");
  process.exit(1);
}

const sqlPath = resolve(__dirname, "../supabase/migrations/038_emergency_sos_source_link.sql");
const sql = readFileSync(sqlPath, "utf-8");

const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
await client.connect();
console.log("Connected. Applying migration 038…");
try {
  await client.query("BEGIN");
  await client.query(sql);
  await client.query("COMMIT");
  console.log("✓ migration 038 applied");
} catch (err) {
  await client.query("ROLLBACK");
  console.error("✗ migration failed, rolled back:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
