-- 046_collections_cover_video — themed B-roll hero for collections.
--
-- Reuses the 7 stranded R2 keys (from when destination videos were renamed
-- to canonical slugs and these themed alt-cuts lost their dest-page home).
-- Each maps to a collection where the footage is on-theme.

ALTER TABLE collections
  ADD COLUMN IF NOT EXISTS cover_video TEXT;

COMMENT ON COLUMN collections.cover_video IS
  'R2 video key (without .mp4) for the collection hero. Loaded via videoSrc(). Falls back to cover_image when null.';

-- Place stranded themed B-roll on matching collections.
UPDATE collections SET cover_video = 'kedarnath-temple' WHERE id = 'char-dham-circuit';
UPDATE collections SET cover_video = 'rishikesh-ganga'  WHERE id = 'adrenaline-rush';
UPDATE collections SET cover_video = 'varanasi-ghats'   WHERE id = 'spiritual-circuit';
UPDATE collections SET cover_video = 'pushkar-lake'     WHERE id = 'haveli-trail-rajasthan';
UPDATE collections SET cover_video = 'jaisalmer-desert' WHERE id = 'borders-worth-visiting';
UPDATE collections SET cover_video = 'manali-snow'      WHERE id = 'best-winter';
UPDATE collections SET cover_video = 'gurudongmar'      WHERE id = 'sacred-lakes-impossible-altitudes';
