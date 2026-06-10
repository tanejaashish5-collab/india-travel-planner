#!/usr/bin/env node
/**
 * Off-platform weekly DB backup for NakshIQ (Supabase Postgres).
 *
 * WHY THIS EXISTS (2026-06-10 audit finding)
 * ------------------------------------------
 * Three destructive prod data sweeps happened in one 48h window. The only
 * restore today is Supabase Pro's 7-day PITR window, which drops to ZERO if
 * the org ever downgrades to free tier. This script creates an off-platform
 * copy of every public-schema table, weekly, via GitHub Actions
 * (.github/workflows/db-backup.yml) or locally.
 *
 * DESIGN RULES
 * ------------
 * - Dumps go over the DIRECT Postgres connection (port 5432) — NEVER the
 *   REST API (repo egress rule, see CLAUDE.md "Supabase egress rules").
 * - PRIVACY: tables holding emails / user ids (PRIVATE_TABLES below, plus a
 *   runtime column-name guard for future tables) are NEVER written in
 *   plaintext to a non-private store. The repo is PUBLIC, so GitHub Actions
 *   artifacts are world-readable -> the private archive is only emitted
 *   AES-256-GCM-encrypted (BACKUP_PASSPHRASE), or skipped entirely.
 * - Two archives per run:
 *     nakshiq-content-<date>.{dump|sql.gz}        — public site content
 *     nakshiq-private-<date>.{dump|sql.gz}.enc    — PII tables, encrypted
 * - pg_dump (custom format, gzip-compressed, schema+data) is preferred when
 *   a pg_dump binary >= server major version is on PATH; otherwise a pure
 *   `pg` fallback emits batched INSERT statements (data-only; schema source
 *   of truth = supabase/migrations).
 * - Optional R2 upload+prune (keep newest 8 weekly copies) activates when
 *   BACKUP_R2_* env is present AND the bucket is the private nakshiq-backups
 *   bucket. NEVER uploads to nakshiq-videos / nakshiq-images (public).
 *
 * USAGE
 * -----
 *   node --env-file=apps/web/.env.local scripts/backup-content-tables.mjs
 *   node scripts/backup-content-tables.mjs --out .backups --target disk
 *   node scripts/backup-content-tables.mjs --target r2          # + prune
 *   node scripts/backup-content-tables.mjs --decrypt <file.enc> # restore helper
 *   node scripts/backup-content-tables.mjs --self-test          # no DB needed
 *
 * ENV
 * ---
 *   SUPABASE_DB_URL | DATABASE_URL   direct-PG connection string (required to dump)
 *   BACKUP_PASSPHRASE                enables the encrypted private archive
 *   BACKUP_R2_ACCOUNT_ID/ACCESS_KEY_ID/SECRET_ACCESS_KEY   R2 upload (optional)
 *   BACKUP_R2_BUCKET                 default "nakshiq-backups" (private only)
 *   BACKUP_DEPS_DIR                  extra node_modules dir to resolve pg/@aws-sdk
 *                                    (used by the GHA workflow's scratch install)
 */

import { createRequire } from "module";
import { execFileSync, spawnSync } from "child_process";
import {
  createWriteStream, mkdirSync, readFileSync, writeFileSync,
  statSync, rmSync,
} from "fs";
import { createHash, randomBytes, scryptSync, createCipheriv, createDecipheriv } from "crypto";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { join, basename, resolve } from "path";
import { pathToFileURL } from "url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PROJECT_REF = "dudzsdzfvikjjhurxrgc";

/**
 * Tables that hold PII or per-user data (emails, user ids, safety check-ins,
 * user-submitted free text that may contain contact details). Enumerated from
 * supabase/migrations + live information_schema on 2026-06-10.
 * These are ONLY stored encrypted (or in a private bucket) — never plaintext
 * in a public store.
 */
export const PRIVATE_TABLES = [
  "authors",                // email
  "chat_logs",              // ip_hash + user free text
  "corrections",            // user-submitted free text
  "destination_alerts",     // email
  "gap_year_plans",         // user_id
  "membership_waitlist",    // email
  "newsletter_subscribers", // email
  "profiles",               // email, identity
  "questions",              // submitter_email
  "reviews",                // user_id, reporter_email
  "road_reports",           // user_id
  "safety_reports",         // user-submitted safety reports
  "sos_alerts",             // user_id, live safety events
  "sos_helpers",            // user_id
  "sos_responses",          // linked to sos_alerts
  "timed_checkins",         // user_id, location check-ins
  "traveler_notes",         // reporter_email
  "trip_boards",            // user_id
  "trip_reports",           // reporter_email
  "user_suggestions",       // submitter_email
];

/** Runtime guard: any table with one of these column names is treated as
 *  private even if someone forgets to add it to PRIVATE_TABLES. */
const PII_COLUMN_REGEX =
  /(^|_)(email|user_id|auth_id|ip|ip_hash|ip_address|phone_number|whatsapp|session_id|device_id)($|_address$|_hash$)/i;

/** Buckets that are (or may become) publicly readable. PII must never land here. */
const PUBLIC_BUCKETS = new Set(["nakshiq-videos", "nakshiq-images"]);

const KEEP_WEEKLY_COPIES = 8;
const ENC_MAGIC = Buffer.from("NAKBK1"); // 6 bytes: magic for the .enc format
const INSERT_BATCH = 500;

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, dflt) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
};

const OUT_DIR = resolve(opt("--out", ".backups"));
const TARGET = opt("--target", "disk"); // disk | artifact | r2
const ONLY_TABLES = opt("--tables", "")
  .split(",").map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------------------
// Dependency loading (works from repo node_modules OR a scratch dir in CI)
// ---------------------------------------------------------------------------

function loadDep(name) {
  const roots = [import.meta.url];
  if (process.env.BACKUP_DEPS_DIR) {
    roots.unshift(pathToFileURL(join(resolve(process.env.BACKUP_DEPS_DIR), "noop.js")).href);
  }
  for (const root of roots) {
    try { return createRequire(root)(name); } catch { /* try next */ }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const log = (...a) => console.log(...a);
const fail = (msg) => { console.error(`ERROR: ${msg}`); process.exit(1); };

function getDbUrl() {
  const url = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
  if (!url) {
    fail(
      "Missing SUPABASE_DB_URL — copy the Session-pooler URI (with password) from " +
      `https://supabase.com/dashboard/project/${PROJECT_REF}/settings/database ` +
      "into apps/web/.env.local, then run: node --env-file=apps/web/.env.local scripts/backup-content-tables.mjs"
    );
  }
  return url;
}

function sha256File(path) {
  const h = createHash("sha256");
  h.update(readFileSync(path));
  return h.digest("hex");
}

/** Quote a Postgres identifier. */
const qi = (name) => `"${String(name).replaceAll('"', '""')}"`;

/** Encode one already-text value as a SQL literal (NULL passes through).
 *  Every Postgres type round-trips through its ::text representation, so the
 *  dump SELECTs each column ::text and we quote it here. */
export function sqlLiteral(textValue) {
  if (textValue === null || textValue === undefined) return "NULL";
  return `'${String(textValue).replaceAll("'", "''")}'`;
}

// ---------------------------------------------------------------------------
// Encryption (AES-256-GCM, scrypt KDF) — Node-only, no external binary
// File format: "NAKBK1" | 16B salt | 12B iv | ciphertext | 16B auth tag
// ---------------------------------------------------------------------------

export function encryptFileSync(plainPath, encPath, passphrase) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = scryptSync(passphrase, salt, 32);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plain = readFileSync(plainPath);
  const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
  writeFileSync(encPath, Buffer.concat([ENC_MAGIC, salt, iv, ct, cipher.getAuthTag()]));
}

export function decryptFileSync(encPath, outPath, passphrase) {
  const buf = readFileSync(encPath);
  if (!buf.subarray(0, 6).equals(ENC_MAGIC)) throw new Error("not a NAKBK1 encrypted backup");
  const salt = buf.subarray(6, 22);
  const iv = buf.subarray(22, 34);
  const tag = buf.subarray(buf.length - 16);
  const ct = buf.subarray(34, buf.length - 16);
  const key = scryptSync(passphrase, salt, 32);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
  writeFileSync(outPath, plain);
}

// ---------------------------------------------------------------------------
// Table classification
// ---------------------------------------------------------------------------

async function classifyTables(client) {
  const { rows: tables } = await client.query(`
    SELECT c.relname AS name
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
    ORDER BY c.relname`);
  const { rows: cols } = await client.query(`
    SELECT table_name, column_name FROM information_schema.columns
    WHERE table_schema = 'public'`);
  const colsByTable = new Map();
  for (const { table_name, column_name } of cols) {
    if (!colsByTable.has(table_name)) colsByTable.set(table_name, []);
    colsByTable.get(table_name).push(column_name);
  }
  const privateSet = new Set(PRIVATE_TABLES);
  const content = [], priv = [];
  for (const { name } of tables) {
    const guard = (colsByTable.get(name) ?? []).some((c) => PII_COLUMN_REGEX.test(c));
    if (privateSet.has(name) || guard) priv.push(name);
    else content.push(name);
  }
  return { content, priv, colsByTable };
}

// ---------------------------------------------------------------------------
// Dump: pg_dump path (schema + data, custom format, gzip-compressed)
// ---------------------------------------------------------------------------

function pgDumpVersionOk(serverMajor) {
  try {
    const out = execFileSync("pg_dump", ["--version"], { encoding: "utf8" });
    const m = out.match(/(\d+)(?:\.\d+)?/);
    return m && Number(m[1]) >= serverMajor ? Number(m[1]) : null;
  } catch { return null; }
}

function runPgDump(dbUrl, tables, outFile) {
  const args = [
    "--format=custom", "--compress=gzip:6", "--no-owner", "--no-privileges",
    "--file", outFile,
  ];
  for (const t of tables) args.push("--table", `public.${qi(t)}`);
  args.push(dbUrl);
  const res = spawnSync("pg_dump", args, { stdio: ["ignore", "inherit", "inherit"] });
  if (res.status !== 0) throw new Error(`pg_dump exited ${res.status}`);
}

// ---------------------------------------------------------------------------
// Dump: pure-`pg` fallback (data-only batched INSERTs, gzipped SQL)
// Section markers allow single-table extraction with sed (see restore README).
// ---------------------------------------------------------------------------

async function insertDump(client, tables, colsByTable, outFile) {
  const gzip = createGzip({ level: 6 });
  const sink = createWriteStream(outFile);
  const done = pipeline(gzip, sink);
  const write = (s) => new Promise((res) => (gzip.write(s) ? res() : gzip.once("drain", res)));

  await write(`-- NakshIQ data-only backup (INSERT format) generated ${new Date().toISOString()}\n`);
  await write(`-- Schema source of truth: supabase/migrations. Restore notes: scripts/restore-backup-README.md\n\n`);

  const rowCounts = {};
  // One snapshot for the whole archive: consistent cross-table state.
  await client.query("BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY");
  try {
    for (const t of tables) {
      const cols = colsByTable.get(t) ?? [];
      if (!cols.length) continue;
      const selectList = cols.map((c) => `${qi(c)}::text AS ${qi(c)}`).join(", ");
      const colList = cols.map(qi).join(", ");
      await write(`-- ===== BEGIN TABLE public.${t} =====\n`);
      let total = 0;
      await client.query(`DECLARE bk_cur CURSOR FOR SELECT ${selectList} FROM public.${qi(t)}`);
      for (;;) {
        const { rows } = await client.query(`FETCH ${INSERT_BATCH} FROM bk_cur`);
        if (!rows.length) break;
        const values = rows
          .map((r) => `(${cols.map((c) => sqlLiteral(r[c])).join(", ")})`)
          .join(",\n");
        await write(`INSERT INTO public.${qi(t)} (${colList}) VALUES\n${values}\nON CONFLICT DO NOTHING;\n`);
        total += rows.length;
      }
      await client.query("CLOSE bk_cur");
      rowCounts[t] = total;
      await write(`-- ===== END TABLE public.${t} (${total} rows) =====\n\n`);
      log(`  dumped ${t}: ${total} rows`);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    throw e;
  }
  gzip.end();
  await done;
  return rowCounts;
}

// ---------------------------------------------------------------------------
// R2 upload + prune (private bucket only)
// ---------------------------------------------------------------------------

function r2Env() {
  const accountId = process.env.BACKUP_R2_ACCOUNT_ID;
  const accessKeyId = process.env.BACKUP_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.BACKUP_R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) return null;
  return { accountId, accessKeyId, secretAccessKey };
}

async function uploadToR2(files) {
  const creds = r2Env();
  if (!creds) fail("--target r2 needs BACKUP_R2_ACCOUNT_ID / BACKUP_R2_ACCESS_KEY_ID / BACKUP_R2_SECRET_ACCESS_KEY");
  const bucket = process.env.BACKUP_R2_BUCKET ?? "nakshiq-backups";
  if (PUBLIC_BUCKETS.has(bucket)) fail(`refusing to upload backups to public bucket "${bucket}"`);

  const sdk = loadDep("@aws-sdk/client-s3");
  if (!sdk) fail("@aws-sdk/client-s3 not resolvable — run from repo root or set BACKUP_DEPS_DIR");
  const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, HeadObjectCommand } = sdk;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${creds.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: creds.accessKeyId, secretAccessKey: creds.secretAccessKey },
    requestHandler: { requestTimeout: 120_000 }, // lesson from _upload-festival-videos.mjs hang
  });

  for (const f of files) {
    const key = `weekly/${basename(f)}`;
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: readFileSync(f) }));
    const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    log(`  uploaded r2://${bucket}/${key} (${head.ContentLength} bytes, verified)`);
  }

  // Prune: keep newest KEEP_WEEKLY_COPIES per archive class (content/private).
  const listed = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: "weekly/" }));
  const objects = listed.Contents ?? [];
  for (const cls of ["nakshiq-content-", "nakshiq-private-"]) {
    const ofClass = objects
      .filter((o) => basename(o.Key).startsWith(cls))
      .sort((a, b) => b.LastModified - a.LastModified);
    for (const stale of ofClass.slice(KEEP_WEEKLY_COPIES)) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: stale.Key }));
      log(`  pruned r2://${bucket}/${stale.Key}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Self-test (no DB, no network)
// ---------------------------------------------------------------------------

function selfTest() {
  let failures = 0;
  const t = (name, cond) => { log(`${cond ? "ok" : "FAIL"} - ${name}`); if (!cond) failures++; };

  // sqlLiteral escaping
  t("NULL passes through", sqlLiteral(null) === "NULL");
  t("plain string quoted", sqlLiteral("goa") === "'goa'");
  t("single quotes doubled", sqlLiteral("it's") === "'it''s'");
  t("backslash untouched (std strings)", sqlLiteral("a\\nb") === "'a\\nb'");
  t("jsonb text round-trip shape", sqlLiteral('{"a": "b\'s"}') === `'{"a": "b''s"}'`);

  // encryption round-trip
  mkdirSync(OUT_DIR, { recursive: true });
  const p = join(OUT_DIR, "_selftest.txt"), e = p + ".enc", d = p + ".dec";
  writeFileSync(p, "nakshiq-backup-selftest-payload");
  encryptFileSync(p, e, "test-passphrase");
  decryptFileSync(e, d, "test-passphrase");
  t("encrypt/decrypt round-trip", readFileSync(d, "utf8") === "nakshiq-backup-selftest-payload");
  let tampered = false;
  try { decryptFileSync(e, d, "wrong-passphrase"); } catch { tampered = true; }
  t("wrong passphrase rejected (GCM auth)", tampered);

  // PII guard regex
  t("guard catches email", PII_COLUMN_REGEX.test("submitter_email"));
  t("guard catches user_id", PII_COLUMN_REGEX.test("user_id"));
  t("guard catches ip_hash", PII_COLUMN_REGEX.test("ip_hash"));
  t("guard skips insider_tip", !PII_COLUMN_REGEX.test("insider_tip"));
  t("guard skips park_full_name", !PII_COLUMN_REGEX.test("park_full_name"));
  t("guard skips hero_dish", !PII_COLUMN_REGEX.test("hero_dish"));

  // public-bucket refusal
  t("nakshiq-videos is flagged public", PUBLIC_BUCKETS.has("nakshiq-videos"));

  log(failures === 0 ? "\nSELF-TEST PASS" : `\nSELF-TEST FAIL (${failures})`);
  process.exit(failures === 0 ? 0 : 1);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (flag("--self-test")) return selfTest();

  if (flag("--decrypt")) {
    const encPath = opt("--decrypt");
    const pass = process.env.BACKUP_PASSPHRASE;
    if (!encPath || !pass) fail("usage: BACKUP_PASSPHRASE=... node scripts/backup-content-tables.mjs --decrypt <file.enc>");
    const outPath = encPath.replace(/\.enc$/, "");
    decryptFileSync(encPath, outPath, pass);
    log(`decrypted -> ${outPath}`);
    return;
  }

  const dbUrl = getDbUrl();
  const pg = loadDep("pg");
  if (!pg) fail("`pg` not resolvable — run from repo root or set BACKUP_DEPS_DIR to a dir whose node_modules has pg");

  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");

  const client = new pg.Client({ connectionString: dbUrl, application_name: "nakshiq-backup" });
  await client.connect();

  try {
    const { rows: [{ server_version: serverVersion }] } = await client.query("SHOW server_version");
    const serverMajor = Number(serverVersion.split(".")[0]);
    let { content, priv, colsByTable } = await classifyTables(client);
    if (ONLY_TABLES.length) {
      content = content.filter((t) => ONLY_TABLES.includes(t));
      priv = priv.filter((t) => ONLY_TABLES.includes(t));
    }
    log(`server postgres ${serverVersion} | content tables: ${content.length} | private (PII) tables: ${priv.length}`);

    const passphrase = process.env.BACKUP_PASSPHRASE;
    const targetIsPrivateStore = TARGET === "r2"; // r2 = private nakshiq-backups bucket
    const includePiiPlaintext = targetIsPrivateStore;
    const includePiiEncrypted = !targetIsPrivateStore && Boolean(passphrase);
    if (!includePiiPlaintext && !includePiiEncrypted) {
      log("NOTE: private (PII) tables EXCLUDED — target is not a private store and BACKUP_PASSPHRASE is unset.");
    }

    const usePgDump = pgDumpVersionOk(serverMajor);
    const ext = usePgDump ? "dump" : "sql.gz";
    const contentFile = join(OUT_DIR, `nakshiq-content-${stamp}.${ext}`);
    const privateFile = join(OUT_DIR, `nakshiq-private-${stamp}.${ext}`);
    const manifest = {
      generated_at: new Date().toISOString(),
      project_ref: PROJECT_REF,
      server_version: serverVersion,
      mode: usePgDump ? `pg_dump ${usePgDump} (custom format, schema+data, gzip)` : "pg INSERT fallback (data-only)",
      target: TARGET,
      content: { tables: content, file: basename(contentFile) },
      private: {
        tables: priv,
        included: includePiiPlaintext ? "plaintext (private store)" : includePiiEncrypted ? "encrypted (aes-256-gcm)" : "EXCLUDED",
      },
    };

    // --- content archive ---
    log(`\nDumping ${content.length} content tables (${usePgDump ? "pg_dump" : "INSERT fallback"})...`);
    if (usePgDump) {
      runPgDump(dbUrl, content, contentFile);
      const counts = {};
      for (const t of content) {
        const { rows: [{ n }] } = await client.query(`SELECT count(*)::int AS n FROM public.${qi(t)}`);
        counts[t] = n;
      }
      manifest.content.row_counts = counts;
    } else {
      manifest.content.row_counts = await insertDump(client, content, colsByTable, contentFile);
    }
    manifest.content.bytes = statSync(contentFile).size;
    manifest.content.sha256 = sha256File(contentFile);

    // --- private archive ---
    const uploadFiles = [contentFile];
    if (includePiiPlaintext || includePiiEncrypted) {
      log(`\nDumping ${priv.length} private (PII) tables...`);
      if (usePgDump) {
        runPgDump(dbUrl, priv, privateFile);
        const counts = {};
        for (const t of priv) {
          const { rows: [{ n }] } = await client.query(`SELECT count(*)::int AS n FROM public.${qi(t)}`);
          counts[t] = n;
        }
        manifest.private.row_counts = counts;
      } else {
        manifest.private.row_counts = await insertDump(client, priv, colsByTable, privateFile);
      }
      if (includePiiEncrypted) {
        encryptFileSync(privateFile, `${privateFile}.enc`, passphrase);
        // Remove the plaintext so only the .enc leaves this step in CI.
        rmSync(privateFile);
        manifest.private.file = `${basename(privateFile)}.enc`;
        manifest.private.bytes = statSync(`${privateFile}.enc`).size;
        manifest.private.sha256 = sha256File(`${privateFile}.enc`);
        uploadFiles.push(`${privateFile}.enc`);
      } else {
        manifest.private.file = basename(privateFile);
        manifest.private.bytes = statSync(privateFile).size;
        manifest.private.sha256 = sha256File(privateFile);
        uploadFiles.push(privateFile);
      }
    }

    const manifestFile = join(OUT_DIR, `nakshiq-backup-manifest-${stamp}.json`);
    writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
    uploadFiles.push(manifestFile);

    // --- verify: archive integrity ---
    if (usePgDump) {
      try {
        const listing = execFileSync("pg_restore", ["--list", contentFile], { encoding: "utf8" });
        const tocTables = (listing.match(/TABLE DATA/g) ?? []).length;
        log(`pg_restore --list OK: ${tocTables} TABLE DATA entries in content archive`);
      } catch (e) { log(`WARN: pg_restore --list failed: ${e.message}`); }
    }

    const totalRows = Object.values(manifest.content.row_counts ?? {}).reduce((a, b) => a + b, 0);
    log(`\nBACKUP COMPLETE`);
    log(`  content: ${manifest.content.file}  ${(manifest.content.bytes / 1024 / 1024).toFixed(1)} MB  ${content.length} tables  ${totalRows} rows`);
    if (manifest.private.bytes) {
      log(`  private: ${manifest.private.file}  ${(manifest.private.bytes / 1024 / 1024).toFixed(1)} MB  ${priv.length} tables (${manifest.private.included})`);
    }
    log(`  manifest: ${basename(manifestFile)}`);

    if (TARGET === "r2") {
      log(`\nUploading to R2...`);
      await uploadToR2(uploadFiles);
    }
  } finally {
    await client.end();
  }
}

main().catch((e) => fail(e.stack ?? String(e)));
