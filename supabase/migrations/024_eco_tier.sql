-- Sprint 4 — sustainability tier for eco-filter on /explore + persona hub.
-- Values: 'high' (community-managed, low-impact), 'mid' (mainstream but not
-- mass-market), 'low' (overtouristed or ecologically stressed), NULL = unrated.

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS eco_tier text;

ALTER TABLE destinations
  DROP CONSTRAINT IF EXISTS destinations_eco_tier_check;

ALTER TABLE destinations
  ADD CONSTRAINT destinations_eco_tier_check
  CHECK (eco_tier IS NULL OR eco_tier IN ('high', 'mid', 'low'));

COMMENT ON COLUMN destinations.eco_tier IS
  'Sustainability rating: high (community-managed, low-impact), mid (mainstream but not mass-market), low (overtouristed or ecologically stressed).';
