---
name: nakshiq-veo-daily
description: Daily 10 AM — generate NakshIQ reel footage in Google Flow with the v3 method (reference stills → free keyframe stills → Frames to Video / Ingredients to Video on Veo 3.1 Lite, Extend for continuous shots), from ~/Automation/nakshiq-veo/today-tasks.json, saving every file under its EXACT save_as name into ~/Downloads/nakshiq-veo-inbox/. Unattended; drops files only.
---

UNATTENDED run for NakshIQ. The user is NOT present: execute autonomously, make reasonable choices and note them, never ask questions, finish with one summary notification. Using the user's own free Google Flow accounts is pre-authorized. Never enter a password, never attempt a CAPTCHA, never buy credits or upgrade.

WHAT CHANGED (2026-09-25) AND WHY
The founder rejected the old reels: every clip was generated from text alone, so the people, the car and the light changed at every cut. Yesterday's probe proved the fix on our accounts: three reference STILLS, then every shot made with INGREDIENTS TO VIDEO using those stills, on Veo 3.1 Lite (10 credits). That kept the same man, woman, car and blue hour. EXTEND continued a shot seamlessly. Text-only generation drifted every time. So:
- NEVER generate a reel shot from text alone any more. Every shot is Ingredients (with its listed refs) or Extend.
- There are no "two takes" any more. One take per shot; redo a shot only if it fails or ignores the prompt (wrong people, wrong car, text on screen, daylight).

KEYFRAMES (added 2026-09-26, from probe part 2 measured on our own files): image mode takes ingredients and costs 0 credits, so a beat can be composed as a STILL before any credit is spent; Frames to Video on Veo 3.1 Lite (10 credits) starts on the exact still it is given and, given an end still too, lands on it; and a SHORT Extend prompt held the look exactly as well as the long one. So:
- kind "keyframe" rows are stills made in image mode with the listed stills as ingredients. Free. They are the storyboard the founder approves.
- mode "frames" shots animate a keyframe: start_frame is the first frame, end_frame (when set) the last frame. Their prompts, like extend prompts, are short on purpose. Add nothing to them.
- A task file with total_credits 0 is a STILLS day: make the stills, save them, finish. Nothing gets animated until the founder has approved the stills.

ORDER OF TODAY'S RUN
The probes (part 1 and part 2, 2026-09-25) are DONE and answered in ~/Downloads/nakshiq-veo-inbox/probe/probe-report.md; never repeat them. The run is production only: everything in today-tasks.json.

SOURCE OF TRUTH
/Users/ashishtaneja/Automation/nakshiq-veo/today-tasks.json (linked folder; connect with request_cowork_directory if needed).
- Every row has `save_as` (exact filename), `storyboard`, `prompt`, `credits`. v3 rows also have:
  - `kind`: "ref" = a STILL IMAGE from the prompt alone; "keyframe" = a STILL IMAGE made with the stills named in `refs` as ingredients; "shot" = a video.
  - `mode` (shots): "ingredients" = attach the stills named in `refs` and generate; "extend" = extend the shot named in `extend_of`; "frames" = Frames to Video from `start_frame` (and to `end_frame` when it is set).
- Rows are listed in the order to make them: a storyboard's refs, then its keyframes, then its shots. An extend always comes after its source; a frames shot after its stills.
- If `total_clips` is 0 or the file is missing, there is nothing to do today: say so and finish.

HOW TO MAKE ONE STORYBOARD (v3)
1. ONE Flow project per storyboard. Settings: 9:16, x1. Close any Agent-mode panel.
2. REFS (kind "ref"): switch the project to image generation (Nano Banana), 9:16, paste the prompt verbatim, generate ONE image. Download it and save it as its exact `save_as` (a .jpg) in ~/Downloads/nakshiq-veo-inbox/. Flow downloads images as a zip: extract it with Desktop Commander (python3 zipfile; `unzip` chokes on Flow zips) and rename the image inside. Keep the stills in the project too: the shots use them.
2k. KEYFRAMES (kind "keyframe"): stay in image mode (Nano Banana), 9:16. Add as ingredients EXACTLY the stills named in `refs` (from this project, or upload the saved .jpg files). Paste the prompt verbatim, generate ONE image, confirm it was 0 credits. Download it (zip → python3 zipfile) and save it as its exact `save_as` (a .jpg) in ~/Downloads/nakshiq-veo-inbox/. LOOK at it: same man, same woman, same car, blue hour, no text. If it shows different people or a different car, generate it once more; if it fails twice, note it and move on. Keep it in the project: a frames shot uses it.
3. SHOTS, mode "ingredients": video mode, model Veo 3.1 - Lite (confirm it quotes 10 credits). Add as ingredients EXACTLY the stills listed in `refs` (from this project, or upload the saved .jpg files if you are on another account). Paste the prompt verbatim as ONE line. Generate. Download the 720p file, save as `save_as`.
3f. SHOTS, mode "frames": video mode → Frames to Video. Put the still named in `start_frame` in the FIRST frame slot and, when `end_frame` is set, that still in the LAST frame slot (from this project, or upload the saved .jpg files). Choosing Frames can silently switch the model to Fast (20 credits): reselect Veo 3.1 - Lite and read the composer chip back; it must say 10 credits before you submit, never 20. Paste the prompt verbatim (it is short on purpose: the stills carry the look; add nothing). Generate. Download the 720p file, save as `save_as`.
4. SHOTS, mode "extend": in the SAME project as the shot named in `extend_of` (an extend cannot cross projects or accounts), open that shot → Extend (scene builder "+" → Extend), Veo 3.1 Lite, paste the prompt verbatim (short on purpose; add nothing), generate ONCE. Read the composer state back before clicking: on 2026-09-25 a second Extend was submitted by mistake and 10 credits were lost. Download the WHOLE extended shot (about 15 s) and save it as `save_as`. The source shot keeps its own file too.
5. Check every video with ffprobe: 720x1280, about 8 s (about 15 s for an extend), has an audio stream. LOOK at the first and last frame of each: same man (navy blue quilted jacket), same woman (mustard yellow shawl), same car, still blue hour, no text on screen, no black bars. If a shot fails that, generate it once more; if it fails twice, note it and move on.
6. Credits: stills are free; a storyboard's 6 videos cost 60 credits, more than one account holds (50). Follow the account grouping in today-tasks.json (it is filled by credits), and carry stills across accounts by uploading the saved .jpg files. Finish one storyboard completely before starting another. Check the credit balance after every video; if it dropped by more than 10, stop and note it.

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
- Files written to ~/Downloads/nakshiq-veo-inbox/ grouped by storyboard (stills and videos), which storyboards are COMPLETE, anything skipped and why, credits spent per account.
