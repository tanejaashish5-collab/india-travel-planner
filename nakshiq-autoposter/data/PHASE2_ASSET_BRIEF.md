# Phase 2 Asset Production Brief — detailed prompts + music

**For:** Co-work / Banana / Omni operator.
**Supersedes** the `pomelli_prompt` / `image_prompt` / `video_prompt` columns in the CSVs for these 10 formats — those were written for the old caption templates and reference fields that no longer exist. Use THIS doc.
**Goal of the next batch:** ~20 assets so Phase 2 has 4 weeks of runway to measure against v1.

---

## 0 · How to use this

1. Pick a format below. Each has a detailed visual prompt + (for videos) a music prompt.
2. Substitute the destination — render the asset for one of the suggested destinations in §12.
3. Save as `{format_id}-{dest_slug}.{ext}` — exact, lowercase. e.g. `v2_hindi_score_card-shimla.png`.
4. Upload to R2: `nakshiq-images` bucket → `social_image_library/` folder.
5. Add the filename to `nakshiq-autoposter/data/phase2_r2_manifest.txt`, commit + push.
6. Next cron run picks it up. The caption is generated automatically from live data — **do not bake caption text into the asset** unless the format note says so.

**One destination = one post per month** (the autoposter enforces this). So 20 assets = 20 destinations = ~3 weeks of Phase 2 posts.

---

## 1 · NakshIQ brand visual language (applies to EVERY asset)

Lock these so the feed looks like one publication, not 10 random posts.

- **Palette:** ivory / warm paper `#F4ECE2` · charcoal near-black `#1A1A1A` · vermillion accent `#E55642` · deeper brick `#C73A2C` · saffron chip `#F4A02C`.
- **Type (if any text on the asset):** Fraunces (display, use the italic for elegance) · Crimson Pro (body) · JetBrains Mono (numbers, scores, labels).
- **Photography style:** documentary / editorial. Natural light. Subtle 35mm film grain. Slightly muted — NOT HDR, NOT over-saturated. Real-feeling, lived-in. People may appear but never posing for camera.
- **Hard NOs:** no influencer glamour, no lens flare spam, no warped AI hands/faces, no fake-looking skies, no stock-photo smiles, no text baked wrong, no emoji, no Western faces in Indian settings.
- **Aspect ratios:** feed images **4:5 (1080×1350)** · reels + YT shorts **9:16 (1080×1920)**.

---

## 2 · v2_hindi_score_card — feed image (4:5)

**What posts:** a Hindi verdict card. Caption gives score / stay cost / why-go in Hindi.

**ASSET = a designed card.** Bake minimal text on this one (it IS a score card).

**Layout spec (build in Pomelli or Banana):**
- Full-bleed destination hero photo, darkened lower third with a soft charcoal gradient.
- Top-left: small mono kicker `NAKSHIQ · वेरिफाइड` in saffron, JetBrains Mono, 28pt.
- Centre-lower: destination name in Devanagari, Fraunces-equivalent serif, ~110pt, ivory.
- Bottom-right: a saffron `#F4A02C` pill, score baked as `{n}/5` JetBrains Mono Bold — leave this as a placeholder `_/5` if you don't know the score, OR look it up at `nakshiq.com/api/content?type=destinations`.
- Subtle vermillion hairline border, 4px inset.

**Photo prompt (the hero behind the card):**
> Photoreal 4:5 editorial travel photograph of {dest_name}, India — the single most recognisable view of the place, shot in soft early-morning or late-afternoon light. Documentary style, 35mm film grain, slightly muted natural colours, deep depth of field. No people posing, no text, no logos. Calm, credible, magazine-quality. Composition leaves the lower third darker for text overlay.

**No music** (static image).

---

## 3 · v2_score_card_pov — feed reel (9:16 video)

**What posts:** a short verification reel. Caption: "what's true this month" + score + stay price.

**VIDEO PROMPT:**
> 15–20 second 9:16 cinematic POV reel of {dest_name}, India. First-person handheld walking shot — the traveller's actual point of view arriving and moving through the destination. 3–4 unbroken moments: the approach, a wide reveal of the signature view, a close human-scale detail (a doorway, a hand on stone, steam off chai), a final still hold on the landscape. Natural light, documentary grade, 35mm film grain, gentle gimbal-smoothed motion. Muted editorial colour. No on-screen text, no captions, no people posing. Ends on a calm 2-second static hold.

**MUSIC PROMPT (for Omni — bake into the video):**
> Instrumental, ~105 BPM, 18 seconds. Clean and modern — a soft synth pulse, one crisp muted kick, light hi-hat texture. Confident and clear, the feeling of *data and certainty*, not epic travel drama. Slight build over the first 8 seconds then steady. No vocals, no big drop. Ends clean on a soft pad.

---

## 4 · v2_pov_slow_morning — feed reel (9:16 video)

**What posts:** a slow, atmospheric morning reel. Caption is meditative — the quiet hour.

**VIDEO PROMPT:**
> 25–40 second 9:16 slow-cinema reel of dawn in {dest_name}, India. The slowest hour: mist not yet lifted, first light on the landscape, almost no motion. Long, near-static locked-off shots — light moving across a ridge, steam rising, a single bird, a curtain breathing in the wind. 3–4 shots only, each held 6–10 seconds. Cold blue early light warming gradually to gold. Documentary, 35mm grain, muted. No people, no text, no fast cuts. Profoundly calm.

**MUSIC PROMPT (for Omni):**
> Ambient instrumental, beatless or ~60 BPM, 35 seconds. Warm felt-piano playing sparse single notes, a soft low string pad underneath, and a faint field-recording texture — distant birdsong or wind. Unhurried, spacious, no percussion, no build, no resolution-drama. The feeling of waking somewhere quiet and not reaching for your phone. Tanya Khanijow slow-travel mood.

---

## 5 · v2_budget_receipt — feed image (4:5)

**What posts:** an honest cost card. Caption: real stay price range + monthly note.

**ASSET = a designed "receipt" card.** Bake the receipt visual; the numbers come from the caption.

**Layout spec:**
- Background warm paper `#F4ECE2` with a faint paper texture.
- Styled like a clean printed receipt — narrow centred column, JetBrains Mono throughout, a dashed hairline divider.
- Header: `NAKSHIQ · {dest_name}` in mono caps, charcoal.
- A small real photo of the destination as a postage-stamp-sized inset, top-right, with a thin vermillion border.
- Leave the rupee lines as visual placeholders (`STAY  ₹___`) — actual numbers are in the caption.
- Footer line in vermillion: `verified · not sponsored`.

**Photo prompt (for the inset):**
> Small photoreal documentary photo of {dest_name}, India — an honest, unglamorous, true-to-life view. Natural light, 35mm grain, muted. No people posing, no text.

**No music** (static image).

---

## 6 · v2_thali_close_up — feed image / carousel (4:5)

**What posts:** a food close-up. Caption names the legendary local eatery + its signature dish.

**IMAGE PROMPT:**
> Photoreal 4:5 overhead-and-slight-angle food photograph of an authentic {dest_name}, India regional thali or signature dish, served on real well-used brass or steel, on a worn wooden or stone table in a genuine family-run eatery. Steam rising. Natural window light from one side, soft shadows. Documentary food photography — appetising but real, not styled-perfect, not glossy advertising. 35mm grain, warm muted tones. Hands of the cook or a server may be partly in frame, never posed. No text, no logos.

**No music** (static image). Optional carousel: slide 2 = a wide shot of the eatery interior, same documentary style.

---

## 7 · v2_local_knows — feed image (4:5)

**What posts:** the honest "ground truth" read. Caption: skip-the-brochure framing + monthly note.

**IMAGE PROMPT:**
> Photoreal 4:5 candid documentary photograph of everyday real life in {dest_name}, India — the version a local sees, not the postcard. A working morning market, a back lane, a tea stall, a craftsperson mid-task. Unposed, in-the-moment, photojournalistic. Natural light, 35mm film grain, honest muted colour. Real texture and slight imperfection. No staged smiles, no text, no logos, no glamour.

**No music** (static image).

---

## 8 · v3_tl_poll_reel — feed reel (9:16 video)

**What posts:** a head-to-head. The autoposter auto-picks the second destination + computes the winner. Your asset is the cover/intro reel keyed to ONE destination.

**VIDEO PROMPT:**
> 12–18 second 9:16 reel introducing {dest_name}, India as one side of a travel head-to-head. Open on a bold split-screen feel — a striking signature shot of {dest_name}, clean and confident. 2–3 quick but smooth shots showing the best of the place. Leave visual breathing room top and bottom for a score graphic to be added. Editorial documentary grade, 35mm grain, muted colour, gentle motion. No on-screen text, no people posing. Ends on a held hero shot.

**MUSIC PROMPT (for Omni):**
> Instrumental, ~115 BPM, 15 seconds. Playful and light with a small thread of friendly tension — a bouncy plucked synth or marimba motif, a light clean beat, a tiny upward "question" lift around the 8-second mark. Fun, curious, decisive — never dramatic. A short bright stinger at the end. No vocals.

---

## 9 · v3_tl_editorial_listicle — feed carousel cover (4:5)

**What posts:** a "10 best places in {state}" ranked list. The list text is generated from live scores — your asset is the COVER image only.

**Naming is different — keyed to the STATE, not a destination:** `v3_tl_editorial_listicle-{state_slug}.png` e.g. `v3_tl_editorial_listicle-himachal-pradesh.png`.

**ASSET = a designed cover.** Bake the title.

**Layout spec:**
- Full-bleed iconic landscape of the state, darkened with a charcoal gradient.
- Centre: Fraunces italic, ivory, ~96pt — `{State}` on one line, then smaller `ranked by data` beneath in Crimson Pro.
- Top-left mono kicker: `NAKSHIQ · {MONTH} VERDICT` saffron.
- A vertical vermillion hairline accent down the left edge.

**Photo prompt (the cover landscape):**
> Photoreal 4:5 sweeping editorial landscape that instantly says {state}, India — its most iconic and recognisable scenery. Golden-hour light, documentary grade, 35mm grain, muted rich colour. Deep, cinematic, magazine-cover quality. Lower-centre kept darker for a title overlay. No people, no text, no logos.

**No music** (static carousel).

---

## 10 · v2_yt_silent_pov — YouTube Short (9:16 video)

**What posts:** a silent ambient POV short. Caption: "no voiceover, watch and listen."

**VIDEO PROMPT:**
> 25–40 second 9:16 silent-POV short of {dest_name}, India. Pure observation — no voiceover, no on-screen text, no captions. First-person and locked-off shots alternating: standing still in a remarkable place and slowly looking. 4–5 shots, each held long. The intent is calm immersion — wind, light, a temple, a ridge, a slow detail. Documentary grade, 35mm grain, natural muted colour, minimal motion. Varun Aditya wildlife-calm pacing. Ends on a long still hold.

**MUSIC PROMPT (for Omni):**
> Almost no music — this format is "silent POV". Generate a near-transparent ambient bed: a very faint, low warm drone/pad, barely present, plus real natural ambient sound dominant — wind, distant temple bells, birdsong, footsteps on gravel. No melody, no beat, no build. The pad should feel like air, not a song. 35 seconds. If in doubt, lean more natural-sound, less pad.

---

## 11 · Music — general direction (since Omni now generates it)

You no longer need the `assets/yt_music/` library for Phase 2 videos — Omni bakes music into the asset at generation time, and the autoposter posts Phase 2 videos as-is (no music-concat step).

House rules for every Phase 2 track:
- **Instrumental only.** No vocals, ever.
- **Restrained.** NakshIQ is verification-first — the music supports, never sells. No epic-trailer swells, no EDM drops.
- **Match the pillar:** verdict/verification formats = clean + confident; moment formats = calm + spacious; engagement (poll) = light + playful.
- **Loop-safe + clean ends** — the video may be trimmed; the track should not end mid-phrase.
- **Keep it short** — 15–40 s to match the clip. Don't generate 3-minute tracks.

---

## 12 · Suggested next batch — 20 assets (all May-strong, all unused destinations)

None of these repeat the 8 destinations already live (achabal, manali, spiti, ladakh, old-delhi, goa, tungnath, rajasthan). All score well in May (hills / Kashmir / Northeast — pre-monsoon peak). Verify each still scores 4–5 for the current month at `nakshiq.com/api/content?type=destinations` before rendering.

| # | format_id | destination | filename |
|---|---|---|---|
| 1 | v2_hindi_score_card | shimla | `v2_hindi_score_card-shimla.png` |
| 2 | v2_hindi_score_card | pahalgam | `v2_hindi_score_card-pahalgam.png` |
| 3 | v2_hindi_score_card | gangtok | `v2_hindi_score_card-gangtok.png` |
| 4 | v2_score_card_pov | coorg | `v2_score_card_pov-coorg.mp4` |
| 5 | v2_score_card_pov | kalimpong | `v2_score_card_pov-kalimpong.mp4` |
| 6 | v2_pov_slow_morning | munnar | `v2_pov_slow_morning-munnar.mp4` |
| 7 | v2_pov_slow_morning | chopta | `v2_pov_slow_morning-chopta.mp4` |
| 8 | v2_budget_receipt | kasol | `v2_budget_receipt-kasol.png` |
| 9 | v2_budget_receipt | munsiyari | `v2_budget_receipt-munsiyari.png` |
| 10 | v2_thali_close_up | amritsar | `v2_thali_close_up-amritsar.png` |
| 11 | v2_thali_close_up | madurai | `v2_thali_close_up-madurai.png` |
| 12 | v2_local_knows | ooty | `v2_local_knows-ooty.png` |
| 13 | v2_local_knows | darjeeling | `v2_local_knows-darjeeling.png` |
| 14 | v3_tl_poll_reel | nainital | `v3_tl_poll_reel-nainital.mp4` |
| 15 | v3_tl_poll_reel | mussoorie | `v3_tl_poll_reel-mussoorie.mp4` |
| 16 | v3_tl_editorial_listicle | himachal-pradesh | `v3_tl_editorial_listicle-himachal-pradesh.png` |
| 17 | v3_tl_editorial_listicle | uttarakhand | `v3_tl_editorial_listicle-uttarakhand.png` |
| 18 | v2_yt_silent_pov | tawang | `v2_yt_silent_pov-tawang.mp4` |
| 19 | v2_yt_silent_pov | ziro | `v2_yt_silent_pov-ziro.mp4` |
| 20 | v2_yt_silent_pov | gurez-valley | `v2_yt_silent_pov-gurez-valley.mp4` |

8 videos, 12 images. Batch the images together, then the videos. That's ~3 weeks of Phase 2 runway on top of the current 8.

---

*Maintained by NakshIQ. Created 2026-05-20.*
