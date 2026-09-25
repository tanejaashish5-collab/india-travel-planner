---
name: nakshiq-veo-daily
description: Daily 10 AM — generate NakshIQ reel footage in Google Flow with the v3 method (reference stills → Ingredients to Video on Veo 3.1 Lite, Extend for continuous shots), from ~/Automation/nakshiq-veo/today-tasks.json, saving every file under its EXACT save_as name into ~/Downloads/nakshiq-veo-inbox/. First, a short probe part 2. Unattended; drops files only.
---

UNATTENDED run for NakshIQ. The user is NOT present: execute autonomously, make reasonable choices and note them, never ask questions, finish with one summary notification. Using the user's own free Google Flow accounts is pre-authorized. Never enter a password, never attempt a CAPTCHA, never buy credits or upgrade.

WHAT CHANGED (2026-09-25) AND WHY
The founder rejected the old reels: every clip was generated from text alone, so the people, the car and the light changed at every cut. Yesterday's probe proved the fix on our accounts: three reference STILLS, then every shot made with INGREDIENTS TO VIDEO using those stills, on Veo 3.1 Lite (10 credits). That kept the same man, woman, car and blue hour. EXTEND continued a shot seamlessly. Text-only generation drifted every time. So:
- NEVER generate a reel shot from text alone any more. Every shot is Ingredients (with its listed refs) or Extend.
- There are no "two takes" any more. One take per shot; redo a shot only if it fails or ignores the prompt (wrong people, wrong car, text on screen, daylight).

ORDER OF TODAY'S RUN
PART A — probe part 2 (budget at most 50 credits, one account's day; do it first, it is quick):
  A1. Frames to Video, for real: upload ~/Downloads/nakshiq-veo-inbox/probe/step3_shot1-last-frame_f191.png as the FIRST frame, 9:16, Veo 3.1 Lite, with this prompt:
      Continuing from this exact frame: the camera slowly pushes in past the open bonnet to a medium shot of the man as he straightens up, takes out his phone and lifts it high, searching for a signal; the phone screen glows but is never legible. The woman steps in beside him, pulling the shawl tighter against the cold. Blue hour, cool blue shadows, amber hazard lights, light mist, anamorphic 35mm, photorealistic, cinematic. No music, no speech, no text.
      Choosing Frames can silently switch the model to Fast (20 credits): reselect Veo 3.1 Lite and confirm it quotes 10 before submitting. Save as ~/Downloads/nakshiq-veo-inbox/probe/probe_s2_frames_lite.mp4
  A2. In Flow, open the two text-only tiles from 2026-09-25 ("Car breakdown by coffee estates", "Car breakdown at roadside") and note which model each ran on. Nothing to generate.
  A3. START + END frame (10 credits). First make the END still, free, in image mode (Nano Banana, 9:16) with step3_shot1-last-frame_f191.png attached as a reference/ingredient: "Same scene, same car, same two people and the same blue-hour light as the reference, a few seconds later: medium shot from the roadside, the man has straightened up and holds his phone high above his head searching for a signal, the woman stands beside him pulling the mustard shawl tight, the open bonnet in the foreground, amber hazard lights, mist over the coffee estates, photorealistic, no text." Save it as probe/probe_s2_endframe.jpg (this also answers Part B step 2b's first question early: does image mode accept ingredients?). If image mode cannot take a reference, generate it with the three ref stills (probe/ref-car.jpg, ref-man.jpg, ref-woman.jpg) as ingredients instead; if neither works, note it and skip A3. Then Frames to Video: FIRST frame = step3_shot1-last-frame_f191.png, LAST frame = probe_s2_endframe.jpg, Veo 3.1 Lite (reselect Lite, confirm it quotes 10), prompt ONLY the motion: "The camera pushes in slowly past the open bonnet; the man straightens up and lifts his phone high; the woman steps in beside him and pulls her shawl tight. Sound: crickets, a light wind, the steady tick of the hazard lights. No music, no speech, no text, no captions." Save as probe/probe_s2_frames_startend_lite.mp4.
  A4. SHORT EXTEND (10 credits). Extend shot 1 once more (the 2026-09-25 tile titled "People repairing car near road", in its own project), Veo 3.1 Lite, with this SHORT prompt and nothing else: "The man gives up on the engine and steps back; the woman turns and looks back down the dark road the way they came, the hazard lights still ticking. Sound: crickets, wind, the hazard lights ticking. No music, no speech, no text, no captions." Save as probe/probe_s1_extend_short_lite.mp4. It is compared against probe/02-extend_shot1_15s.mp4, which was made with the long look paragraph.
  A5. MONTAGE IN ONE CLIP (10 credits). Ingredients to Video with the three ref stills (probe/ref-car.jpg, ref-man.jpg, ref-woman.jpg), 9:16, Veo 3.1 Lite, prompt: "Three shots with hard cuts, no transitions. Shot one, wide, camera low at the roadside: the dusty white hatchback stopped at the edge of the narrow road through the coffee estates, bonnet up, hazard lights blinking, the man in the navy quilted jacket leaning into the engine bay, the woman in the mustard shawl a few steps behind. Shot two, medium from the side: her hands pulling the shawl tight, her face turned up the empty road. Shot three, close: his hands in the engine bay lit only by the amber hazard lights. Blue hour, deep blue sky, a last band of pale orange on the horizon, light mist, anamorphic 35mm, soft film grain, photorealistic. Sound: crickets, wind, the hazard lights ticking. No music, no speech, no text, no captions." Save as probe/probe_montage_lite.mp4.
  A6. Write ~/Downloads/nakshiq-veo-inbox/probe/probe-report.md, one section per item. A1 and A3: does the clip start exactly where shot 1 ended and keep the same man, woman, car and blue hour; for A3 also: does it END on the end still, and was the end frame accepted on Lite at 10 credits? A4: side by side with 02-extend_shot1_15s.mp4, which prompt held the look better (same blue hour, same people)? A5: did it actually cut into three shots, and how many are usable? A2: the two models. For everything: model and credits charged, and credits charged per Nano Banana still if you can read it. ffprobe every file (resolution, duration, audio stream). Also the keyframe-probe answer from Part B step 2b, once you reach it.
PART B — production (everything in today-tasks.json).

SOURCE OF TRUTH FOR PART B
/Users/ashishtaneja/Automation/nakshiq-veo/today-tasks.json (linked folder; connect with request_cowork_directory if needed).
- Every row has `save_as` (exact filename), `storyboard`, `prompt`. v3 rows also have:
  - `kind`: "ref" = a STILL IMAGE to generate; "shot" = a video.
  - `mode` (shots): "ingredients" = attach the stills named in `refs` and generate; "extend" = extend the shot named in `extend_of`.
- Rows are listed in the order to make them: a storyboard's refs first, then its shots. An extend always comes after its source.
- If `total_clips` is 0 or the file is missing, do Part A only and say so.

HOW TO MAKE ONE STORYBOARD (v3)
1. ONE Flow project per storyboard. Settings: 9:16, x1. Close any Agent-mode panel.
2. REFS (kind "ref"): switch the project to image generation (Nano Banana), 9:16, paste the prompt verbatim, generate ONE image. Download it and save it as its exact `save_as` (a .jpg) in ~/Downloads/nakshiq-veo-inbox/. Flow downloads images as a zip: extract it with Desktop Commander (python3 zipfile; `unzip` chokes on Flow zips) and rename the image inside. Keep the stills in the project too: the shots use them.
2b. KEYFRAME PROBE (one still, right after the refs, before s1; image only, no video): stay in image mode (Nano Banana), add the three saved stills of this storyboard as ingredients, paste the s1 prompt from today-tasks.json verbatim, 9:16, generate ONE image. Save it as ~/Downloads/nakshiq-veo-inbox/probe/probe_s1_keyframe_nb.jpg (zip → python3 zipfile). Do NOT animate it and do NOT use it for s1: s1 is generated exactly as in step 3. In probe-report.md answer: did image mode accept ingredients? Does the still show the same man, woman and car in the s1 composition at blue hour? Credits charged, if visible.
3. SHOTS, mode "ingredients": video mode, model Veo 3.1 - Lite (confirm it quotes 10 credits). Add as ingredients EXACTLY the stills listed in `refs` (from this project, or upload the saved .jpg files if you are on another account). Paste the prompt verbatim as ONE line. Generate. Download the 720p file, save as `save_as`.
4. SHOTS, mode "extend": in the SAME project as the shot named in `extend_of` (an extend cannot cross projects or accounts), open that shot → Extend (scene builder "+" → Extend), Veo 3.1 Lite, paste the prompt verbatim, generate. Download the WHOLE extended shot (about 15 s) and save it as `save_as`. The source shot keeps its own file too.
5. Check every video with ffprobe: 720x1280, about 8 s (about 15 s for an extend), has an audio stream. LOOK at the first and last frame of each: same man (navy blue quilted jacket), same woman (mustard yellow shawl), same car, still blue hour, no text on screen, no black bars. If a shot fails that, generate it once more; if it fails twice, note it and move on.
6. Credits: a storyboard costs about 3 stills + 6 shots x 10 = 60+ credits, more than one account holds (50). Plan it: generate the refs and the source shot + its extend on ONE account (20 credits for the pair), then continue the remaining shots on the next account by uploading the saved stills as ingredients. Finish one storyboard completely before starting another.

ACCOUNTS
- Use ONLY the @gmail.com accounts listed in /Users/ashishtaneja/Automation/nakshiq-veo/accounts.json. Never any other account, never a Workspace or company account, whatever Chrome offers.
- Open Flow per account at https://flow.google.com/u/N/ (N = 0, 1, 2 ...). READ the signed-in email on the page before doing anything. The EMAIL CHECK always wins: if the signed-in email is not an @gmail.com address listed in accounts.json, move on without generating, whatever N it is. /u/0 is a cancelled Workspace ("Service Not Allowed").
- A Google marketing/research/"help improve" consent dialog is NOT a reason to skip a listed Gmail account: close it or choose no/decline (never opt in) and carry on. A warning badge on the avatar is not a reason to skip either. Only a real password prompt is: skip that account and note it.
- Accounts marked owner "chanakya" in accounts.json may be used; the founder authorised it. Skip any account marked "rest": true in accounts.json.
- "Visible watermarking" OFF (avatar → account panel), once per account used.

PROMPTS
- VERBATIM, as a single line. Do not rewrite, shorten, translate or "improve" them: they carry the fixed look (blue hour, lens, grain) and the soundscape that make the shots match. After typing, read the text back from the input box and compare its length to the task file before submitting.
- Flow blocks a prompt ("might violate our policies"): note it and skip that item. Do not reword.
- Stuck at 99% / "taking longer than expected" / "audio generation failed … not charged": retry up to twice.

DOWNLOADING
- Hover a COMPLETED tile → its ⋮ → Download → 720p original. The detail-view ↓ button never downloads.
- One file at a time. Before downloading, confirm the tile's prompt text from the DOM matches the row; never map by grid position.
- Move it from ~/Downloads into ~/Downloads/nakshiq-veo-inbox/ under its exact `save_as` with Desktop Commander. Leave ~/Downloads clean apart from that folder.

DO NOT
- Do NOT run any NakshIQ script, ingest, upload or build. Do NOT edit today-tasks.json, the queue, accounts.json or any code or task file.
- Do NOT publish anything anywhere.

FINISH: one notification
- Part A: the one-line Frames-to-Video answer and where the report is.
- Part B: files written to ~/Downloads/nakshiq-veo-inbox/ grouped by storyboard, which storyboards are COMPLETE, anything skipped and why, credits spent per account.
