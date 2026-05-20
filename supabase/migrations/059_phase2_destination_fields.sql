-- Migration 059 — Phase 2 destination-scoped content fields (JSONB blob).
--
-- Adds one JSONB column `phase2_fields` on `destinations` to hold all the
-- destination-scoped data inputs the Phase 2 CSV format library expects
-- (38 rows across v2/v3/v4 prompt libraries — see
-- `nakshiq-autoposter/data/CONTENT_STRATEGY_MASTER.md`).
--
-- WHY one JSONB blob (not per-field columns):
--   - Phase 2 formats reference ~40 destination-scoped fields. Most are
--     prose/microcopy (Hindi crowd descriptors, local language phrases,
--     sunrise times, ambient sound lists). They evolve as new formats ship.
--   - A JSONB blob lets new fields land without a schema change.
--   - The Phase 2 loader (`nakshiq-autoposter/csv_format_loader.py`) reads
--     fields directly from the destination dict; this commit teaches it
--     to look inside `phase2_fields` too.
--
-- SCOPE — this migration unblocks 4 of 12 seed formats whose data inputs
-- are genuinely destination-scoped:
--   - v2_pov_slow_morning      (needs sunrise_time, nearest_landmark)
--   - v2_yt_silent_pov         (air_temp_c, ambient_sound_list, ...)
--   - v2_local_knows           (trap_landmark, local_alternative, ...)
--   - v2_hindi_score_card      (daily_cost_inr, crowd_hindi, ...)
--
-- The remaining 8 seed formats need PURPOSE-BUILT tables because their
-- data inputs describe entities OTHER than the destination:
--   - v3_tl_editorial_listicle → content_lists (10-item carousels)
--   - v2_thali_close_up        → join local_eateries + thali_data fields
--   - v3_tl_news_announcement  → news_announcements
--   - v3_tl_poll_reel          → polls (paired comparisons)
--   - v4_dw_counter_narrative_myth_bust → myths
--   - v3_tl_first_person_essay → essays
--   - v4_dw_archival_modern_carousel → landmark_archives
--   - v2_budget_receipt        → cost_breakdowns (per-month)
--
-- Those tables are Phase 3 work, not in scope for this migration.
--
-- EXAMPLE phase2_fields blob for `achabal`:
--   {
--     "sunrise_time": "05:35",
--     "nearest_landmark": "Achabal Mughal Garden",
--     "air_temp_c_may": 18,
--     "ambient_sound_list": "flowing chinar canal · evening azaan · poplar wind",
--     "visual_description": "Mughal-era cascade through 17th-c chinar avenue",
--     "observation_window": "06:00-07:30 (gardens open 06:00)",
--     "daily_cost_inr": 2400,
--     "crowd_hindi": "हल्की भीड़ — सप्ताहांत पर कश्मीरी परिवार",
--     "weather_hindi": "मौसम सुहावना — दिन 18°C, शाम 10°C",
--     "why_go_hindi": "मुगल बाग़ का छाँव और शांत झरना — श्रीनगर भीड़ से दूर।",
--     "english_one_liner": "Mughal canals, chinar shade, and almost no tourists.",
--     "trap_landmark": null,
--     "local_alternative": null
--   }
--
-- Apply with:
--   npm run db:migrate

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS phase2_fields jsonb NOT NULL DEFAULT '{}'::jsonb;

-- GIN index so the autoposter's per-dest lookup (which reads specific keys
-- from phase2_fields) stays fast even when 505 destinations have populated
-- blobs. Path-ops variant — we don't need full-text on the blob, just key
-- existence + value lookup.
CREATE INDEX IF NOT EXISTS destinations_phase2_fields_gin
  ON destinations USING gin (phase2_fields jsonb_path_ops);

COMMENT ON COLUMN destinations.phase2_fields IS
  'Phase 2 content-strategy data inputs (free-form JSONB). Schema documented '
  'in nakshiq-autoposter/data/CONTENT_STRATEGY_MASTER.md §5. Populated per-dest '
  'as Co-work renders the corresponding format assets. SKIP-on-null: if a format '
  'requires a key not in this blob, the autoposter skips that post — never '
  'falls back to placeholder text.';
