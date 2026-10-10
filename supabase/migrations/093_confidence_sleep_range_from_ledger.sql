-- APPLIED 2026-10-10 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 093: the confidence card's nightly stay range ("₹500–15,000/night") is derived from destination_costs (2026-10-10).
--
-- Why: confidence_cards.sleep.price_range_inr was hand-written and feeds the destination page's "How to do it"
-- line, the confidence card, and the social cost carousels (/api/content?type=cost_index). It disagreed with the
-- ledger. Now: shoulder season, low end = the cheaper of homestay and 3-star range_low, high end = the 3-star
-- range_high (else homestay), rounded to 100. Luxury rows are modelled everywhere, even where no luxury stay exists,
-- so they are not used here. Places with no lodging rows get "N/A, day visit" (the UI shows no
-- price for a value without digits). Rerun through scripts/sync-daily-cost.mjs after any destination_costs write.
-- Backup: backups.confidence_sleep_20261010.

BEGIN;
CREATE TABLE IF NOT EXISTS backups.confidence_sleep_20261010 AS SELECT destination_id, sleep FROM confidence_cards;

-- SYNC-START
WITH r AS (
  SELECT destination_id,
    least(min(range_low_inr) FILTER (WHERE category = 'homestay'), min(range_low_inr) FILTER (WHERE category = 'hotel-mid')) AS lo,
    COALESCE(max(range_high_inr) FILTER (WHERE category = 'hotel-mid'), max(range_high_inr) FILTER (WHERE category = 'homestay')) AS hi
  FROM destination_costs
  WHERE season = 'shoulder' AND category IN ('homestay', 'hotel-mid')
  GROUP BY destination_id
),
v AS (
  SELECT cc.destination_id,
    CASE WHEN r.lo IS NOT NULL AND r.hi IS NOT NULL
      THEN to_char(round(r.lo / 100.0) * 100, 'FM999,999') || '–' || to_char(round(r.hi / 100.0) * 100, 'FM999,999')
      ELSE 'N/A, day visit' END AS range
  FROM confidence_cards cc
  LEFT JOIN r ON r.destination_id = cc.destination_id
  WHERE EXISTS (SELECT 1 FROM destination_costs dc WHERE dc.destination_id = cc.destination_id)
)
UPDATE confidence_cards cc
SET sleep = jsonb_set(COALESCE(cc.sleep, '{}'::jsonb), '{price_range_inr}', to_jsonb(v.range))
FROM v WHERE v.destination_id = cc.destination_id
  AND COALESCE(cc.sleep->>'price_range_inr', '') IS DISTINCT FROM v.range;
-- SYNC-END

COMMIT;
