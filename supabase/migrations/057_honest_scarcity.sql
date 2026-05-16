-- Migration 057 — Honest-scarcity first-class state on destinations.
--
-- The cinematic renderer silently hides thin widgets today, which masks the
-- ~45-50 destinations that are structurally HS-confirmed: NP cores, military
-- zones, sub-5k tribal villages, uninhabited atolls, motorable passes. This
-- column flags those rows so the renderer can swap silent omission for a
-- proud scarcity panel ("Charaideo is a UNESCO core — no commercial dining,
-- pack from Sivasagar 33km"), and the scorer can emit a new HS-B tier that
-- gates cinematic mode equally with A-tier.
--
-- Shape: jsonb {
--   <slot>: {
--     confirmed: true,
--     category: 'np_core' | 'military_or_restricted' | 'sub_5k_tribal'
--               | 'uninhabited_island' | 'high_altitude_pass',
--     specifics: { base_town?: string, base_distance_km?: int, note?: string }
--   }
-- }
-- Slots (fixed for now): eateries, stays, gems.
-- Category enum is enforced in the TS layer (apps/web/src/lib/honest-scarcity.ts)
-- so it can evolve without a migration; the DB stays jsonb-permissive.
--
-- Honest-scarcity rule (continues M056's null=hidden convention):
--   - Missing key / null slot = NOT HS-confirmed (still B-pending, may fill later).
--   - Present + confirmed:true = renderer shows scarcity panel, scorer treats slot as HS-B-eligible.
--   - NEVER fabricated. Every row backfilled from S30/S37/S39/S40-S50 session memory.
--
-- Apply with:
--   npm run db:migrate

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS honest_scarcity jsonb;

COMMENT ON COLUMN destinations.honest_scarcity IS
  'Per-slot honest-scarcity confirmations. Shape: {<slot>: {confirmed, category, specifics}}. Slots: eateries, stays, gems. Category enum (np_core, military_or_restricted, sub_5k_tribal, uninhabited_island, high_altitude_pass) lives in apps/web/src/lib/honest-scarcity.ts. Null/missing slot = not HS-confirmed (treat as B-pending). NEVER fabricated.';

-- GIN supports the scorer's confirmed-lookup query:
--   SELECT slug FROM destinations
--   WHERE honest_scarcity->'eateries'->>'confirmed' = 'true';
CREATE INDEX IF NOT EXISTS destinations_honest_scarcity_gin_idx
  ON destinations USING gin (honest_scarcity);
