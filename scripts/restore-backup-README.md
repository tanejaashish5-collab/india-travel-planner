# Restoring a NakshIQ DB backup

Weekly backups land as GitHub Actions artifacts on the `db-backup` workflow
(Sundays 02:30 UTC, 56-day retention ≈ 8 copies). Two artifacts per run:

| Artifact | Contents | Format |
|---|---|---|
| `db-backup-content-<run>` | all public site-content tables | `nakshiq-content-<date>.dump` (pg_dump custom) or `.sql.gz` (fallback) + manifest JSON |
| `db-backup-private-encrypted-<run>` | PII tables (newsletter_subscribers etc.) | `nakshiq-private-<date>.dump.enc` / `.sql.gz.enc` — AES-256-GCM |

The PII passphrase lives in `.secrets/backup-passphrase.txt` (local, gitignored)
and as the `BACKUP_PASSPHRASE` GHA secret. Lose both = the private archive is
gone for good; the content archive is never encrypted.

## 1. Download

```bash
gh run list --workflow=db-backup.yml --limit 5          # pick a run id
gh run download <run-id>                                 # both artifacts
```

## 2. Decrypt the private archive (only if you need PII tables)

```bash
node scripts/backup-content-tables.mjs --decrypt nakshiq-private-<date>.dump.enc
# prompts for / reads BACKUP_PASSPHRASE from env; writes the plaintext sibling
```

## 3. Restore

**One table** (the usual case — a sweep gone wrong):

```bash
# custom-format dump:
pg_restore -d "$SUPABASE_DB_URL" --no-owner --data-only -t destinations nakshiq-content-<date>.dump
# .sql.gz fallback (data-only INSERTs, schema comes from supabase/migrations):
gunzip -c nakshiq-content-<date>.sql.gz | psql "$SUPABASE_DB_URL" --single-transaction
```

Restoring **into an occupied table**: restore to a scratch table instead, then
reconcile with targeted UPDATEs (matches the repo's in-place-transform rule):

```bash
pg_restore -d "$SUPABASE_DB_URL" --no-owner -t destinations --schema-only -f /dev/stdout nakshiq-content-<date>.dump \
  | sed 's/destinations/destinations_restore/g' | psql "$SUPABASE_DB_URL"
pg_restore -d "$SUPABASE_DB_URL" --no-owner --data-only -t destinations nakshiq-content-<date>.dump # into the renamed table via search_path trickery — or simpler:
gunzip -c nakshiq-content-<date>.sql.gz | sed 's/INSERT INTO "destinations"/INSERT INTO "destinations_restore"/g' | psql "$SUPABASE_DB_URL"
```

**Everything** (catastrophic): restore table-by-table from the manifest list,
migrations first (`supabase db push`), then data. Do NOT pipe a full dump into
prod without checking the manifest's table list against current migrations.

## 4. After any restore

- Bust reference caches: `node --env-file=apps/web/.env.local scripts/bust-reference-cache.mjs`
- If the restore touched `destinations`, stamp `content_reviewed_at` per the
  CLAUDE.md convention.
