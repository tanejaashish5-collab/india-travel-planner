-- 075_drop_document_embeddings.sql — 2026-09-16
--
-- WHY. Supabase emailed "running out of Disk IO Budget" on 2026-09-15. The
-- cause was not reads, and not the temp-file spills behind the 2026-06-04
-- alert — that work_mem=8MB fix held, spill rate fell from ~7.8 GB/day to
-- ~0.55 GB/day. The cause was SIZE:
--
--   * database                 487 MB
--   * document_embeddings      371 MB  <- 76% of the entire database
--     - idx_embeddings_vector  174 MB, idx_scan = 79 since 2026-03-30
--   * 22,181 live rows, vector(1536) = OpenAI embeddings
--
-- The table had ZERO readers. Its only consumer was /api/chat, which no longer
-- exists; its writer (apps/web/src/lib/embed-refresh.ts) was removed on
-- 2026-08-04 — see the comment in apps/web/scripts/check-no-metered-ai.mjs.
-- Site search uses /api/search-index and never touches vectors.
--
-- Cost of keeping it: every backup, autovacuum pass and checkpoint dragged all
-- 487 MB across the disk, 76% of it for rows nothing would ever read. The top
-- temp-file writer in pg_stat_statements was `FETCH 500 FROM bk_cur` (the
-- backup cursor) at 4.6 GB. The instance is Micro — 1 GB RAM, 224 MB
-- shared_buffers — so 487 MB does not fit in cache but ~116 MB largely does.
-- During diagnosis `SELECT 1` timed out repeatedly and /api/search-index took
-- 25 s, so this was already user-visible on the one surface that reads live.
--
-- This table was never in supabase/migrations — it was created out of band, so
-- the schema below is the only record of it. Reproduced verbatim from the live
-- catalogue (pg_indexes / pg_policies / pg_constraint) before the drop:
--
--   CREATE TABLE public.document_embeddings (
--     id          uuid        NOT NULL,
--     content     text        NOT NULL,
--     embedding   vector(1536),
--     source_type text        NOT NULL,
--     source_id   text        NOT NULL,
--     metadata    jsonb,
--     created_at  timestamptz,
--     fts         tsvector,
--     CONSTRAINT document_embeddings_pkey PRIMARY KEY (id)
--   );
--   ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;
--   CREATE POLICY "Public read" ON public.document_embeddings FOR SELECT TO public USING (true);
--   CREATE INDEX idx_embeddings_vector ON public.document_embeddings
--     USING ivfflat (embedding vector_cosine_ops) WITH (lists='50');
--   CREATE INDEX idx_embeddings_source ON public.document_embeddings USING btree (source_type, source_id);
--   CREATE INDEX idx_embeddings_fts    ON public.document_embeddings USING gin (fts);
--
-- Rebuilding it would also mean re-paying OpenAI to regenerate 22k embeddings,
-- which is precisely the metered spend check-no-metered-ai.mjs exists to block.
-- Do not restore this without deciding who pays for it.
--
-- UNDO WINDOW: Supabase Pro keeps daily backups for 7 days, so the data itself
-- is recoverable until 2026-09-23 through the dashboard, not through this file.

BEGIN;

-- The two RPCs below reference the table in their bodies only, so Postgres
-- would NOT drop them alongside it — they would survive as broken, publicly
-- callable PostgREST endpoints (/rest/v1/rpc/...). Neither is referenced
-- anywhere in the repo. Drop them in the same transaction as the table.
DROP FUNCTION IF EXISTS public.hybrid_search(text, vector, integer, double precision, double precision);
DROP FUNCTION IF EXISTS public.match_documents(vector, integer, text);

DROP TABLE IF EXISTS public.document_embeddings;

COMMIT;
