-- 074_road_updates.sql
-- Dated road-status log. road_reports holds the CURRENT state of ~28
-- corridors (one row each, overwritten in place). This table is append-only:
-- one row per dated event (closure, reopening, restriction, advisory), so
-- /road-conditions becomes a citable feed with history instead of a
-- snapshot that reads "updated 1 June" forever. Written by the daily
-- road-updates cloud routine (ops/road-updates/SKILL.md); never by the site.

CREATE TABLE IF NOT EXISTS road_updates (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  update_date      DATE NOT NULL,                       -- the day the condition applied (IST)
  region_id        TEXT NOT NULL REFERENCES states(id), -- himachal-pradesh, ladakh, ...
  segment          TEXT NOT NULL,                       -- "Manali to Kaza via Kunzum La"
  road_report_id   UUID REFERENCES road_reports(id) ON DELETE SET NULL,
  status           TEXT NOT NULL CHECK (status IN ('open','slow','risky','restricted','blocked','closed')),
  headline         TEXT NOT NULL,                       -- one line, ≤120 chars, past/present tense, dated
  body             TEXT,                                -- 1-3 sentences: what, since when, what the authority said
  source_url       TEXT NOT NULL,
  source_label     TEXT NOT NULL,                       -- "BRO Project Himank", "HP PWD", "The Tribune"
  source_published_at DATE,                             -- the SOURCE's own date, date-checked
  verified_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by       TEXT NOT NULL DEFAULT 'road-updates-routine',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_road_updates_date   ON road_updates (update_date DESC);
CREATE INDEX IF NOT EXISTS idx_road_updates_region ON road_updates (region_id, update_date DESC);
-- One entry per segment per day per status: a re-run of the routine must not
-- duplicate what it already logged.
CREATE UNIQUE INDEX IF NOT EXISTS uq_road_updates_day_segment
  ON road_updates (update_date, region_id, segment, status);

ALTER TABLE road_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "road_updates public read" ON road_updates FOR SELECT USING (true);
-- Writes: service role only (the routine uses the Supabase MCP / service key).

COMMENT ON TABLE road_updates IS 'Dated, sourced road-status events per corridor. Append-only feed behind /road-conditions. Source date must be checked before insert (see ops/road-updates/SKILL.md).';
