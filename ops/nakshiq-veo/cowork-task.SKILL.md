---
name: nakshiq-veo-daily
description: Daily 10 AM — generate the day's NakshIQ reel clips in Google Flow (Veo 3.1 Lite, 9:16) from ~/Automation/nakshiq-veo/today-tasks.json, saving each .mp4 under its EXACT save_as name into inbox/. Same characters within a storyboard. Unattended; drops files only — a LaunchAgent ingests them. Reports after.
---

Daily UNATTENDED video-generation run for NakshIQ's Instagram reels. The user is NOT present: execute autonomously, make reasonable choices and note them, never ask questions, and finish by sending a summary notification. Generating and downloading these clips from the user's own free Google Flow accounts is expected and pre-authorized. Never enter a password and never attempt a CAPTCHA: if one blocks an account, skip it and note it.

WHAT THIS DOES
A LaunchAgent (com.nakshiq.veo-daily, 09:20 and 14:20) builds each day's storyboards from NakshIQ's verified data and writes the task file below. Your job: generate every listed clip in Google Flow and save it, under its EXACT filename, into the inbox folder. The LaunchAgent ingests the inbox on its next run: it names each clip to its beat, uploads it to R2 and verifies it actually serves. You do NOT run any script, ingest, upload or build.

SOURCE OF TRUTH (read this FIRST, every run, always the latest version)
/Users/ashishtaneja/Automation/nakshiq-veo/today-tasks.json
(Connect the folder with request_cowork_directory if it is not already connected.)
- `accounts[]` → each has `clips[]`. Every clip has: `save_as` (the exact filename), `storyboard`, `beats_in_storyboard`, `character`, `beat_role`, `prompt`.
- `how[]` restates these rules. If it and this file ever disagree, the JSON wins: it is regenerated daily and this file is not.
- If `total_clips` is 0 or the file is missing, send a one-line notification ("NakshIQ Veo: nothing queued today") and STOP.

SAVE LOCATION
/Users/ashishtaneja/Automation/nakshiq-veo/inbox/
- Save each clip as an .mp4 named EXACTLY `save_as` (e.g. `alibaug__sos_rescue__b1.mp4`). The filename is the ONLY thing that connects a clip to its beat. A wrong or "tidied" name means the clip is ignored, or worse, lands on the wrong beat.
- DEDUP (safety net): skip any `save_as` that already exists in `inbox/` OR in `/Users/ashishtaneja/Automation/nakshiq-veo/clips/`. Those are already generated.

HARD RULES
1. MODEL: Veo 3.1 - Lite (10 credits). In EVERY new project, check it before the first submit. Flow defaults to Omni 1.1 Flash (12 credits), which is 20% more and gives 4 clips per account instead of 5. If you cannot select Veo 3.1 Lite, STOP on that account and note it. Never generate on the default.
2. AGENT MODE TRAP: some projects open in Agent mode, whose input is a chat box, not the generation bar, and whose settings default to Omni. If you see an agent panel, close it and switch to direct generation, then re-check the model.
3. SETTINGS per project: Video · 9:16 · x1 · Veo 3.1 - Lite. Confirm all four before the first submit in every project; 9:16 is not always the default.
4. WATERMARK: "Visible watermarking" OFF (avatar → account panel). Check it once per account.
5. PROMPT VERBATIM, as a single line. Do not rewrite, shorten, translate or "improve" it: every prompt is validated against our own data and must not assert anything extra. A newline submits the composer early. After typing, read the text back out of the input box and compare its length to the task file before submitting.
6. SAME PEOPLE WITHIN A REEL. Veo has no memory between clips, so a person is only the same person if they are described the same way every time. Every prompt already carries each person's FULL description inline (age, hair, the exact garment and colour) and the car's, identical across all beats of one storyboard. Do NOT use Flow's character field and do NOT add any description of your own: a second description can conflict with the one in the prompt and produce different people. The `character` value in the task file is for reference only.
7. WHOLE STORYBOARDS. A reel is cut from a whole storyboard (all clips sharing a `storyboard` value; `beats_in_storyboard` says how many). A storyboard missing even one beat renders NOTHING.
   - If you cannot finish a storyboard, prefer skipping it entirely over producing some of its beats.
   - Spare credits go to COMPLETING a partial storyboard before starting a new one.
8. ACCOUNT ASSIGNMENT IS ADVISORY. The task file is written without knowing any account's balance, and matching is by filename only, so any account with credits can produce any clip. Move clips off an account that is out of credits or signed out.

ACCOUNTS
Six free accounts are signed into Chrome. Switch in-app: avatar (top right) → Switch account → pick the next. Do NOT use flow.google.com/?authuser=N: it redirects to the marketing page. A "Signed out" account leads to a password prompt: skip it and report which clips that stranded. Never buy credits or upgrade. Four of the six belong to the Chanakya project (the task file marks `owner: chanakya`); the founder has authorised spending them.

GENERATING
Flow is at flow.google.com. New project → confirm settings (rules 1 to 4) → set the character (rule 6) → type the prompt (rule 5) → submit. Queue up to 5 per account and let them render (about 1 to 3 minutes).

VEO FAILURE MODES (all refund the credit)
- Stuck at 99% / "taking longer than expected": retry once or twice. If it stalls about 3 times, note it and move on. Do NOT reword: these prompts are data-validated, and rewording is how an unbacked claim gets into a reel.
- "Audio generation failed … not charged": transient, retry.
- "might violate our policies": note the clip and skip it. Do not reword.

DOWNLOADING (use exactly this method; it is the proven one)
1. Resize the browser to about 1280×800 so the grid is dense and tile menus show.
2. Hover a COMPLETED tile → its ⋮ (top right) → Download → "720p Original Size". That gives a direct .mp4.
3. The detail-view ↓ button never downloads. Do not use it.
4. ONE clip at a time. Before clicking a tile's menu, confirm which prompt it belongs to by reading that tile's prompt text from the DOM. List-view icons desync from their card text while clips are still finalising, which has cross-labelled beats before. Never map clips to beats by position alone.
5. Move the download from ~/Downloads into inbox/ under its exact `save_as`. ~/Downloads is reachable via Desktop Commander, not the sandbox.
6. Verify each placed clip with ffprobe: 720×1280 and about 8 s. Re-download if not.
7. Leave ~/Downloads clean: no orphaned Flow .mp4 or download*.zip. Sweep at the end.

DO NOT
- Do NOT run any script, ingest, upload or build. Dropping correctly named files into inbox/ is the entire job.
- Do NOT edit today-tasks.json, the queue, accounts.json, or any code.
- Do NOT publish or post anything anywhere.
- Do NOT enter a password, solve a CAPTCHA, buy credits, or upgrade.

FINISH: send a summary notification
- Clips generated: the exact filenames written to inbox/, grouped by storyboard, and which storyboards are COMPLETE.
- Clips skipped as already present.
- Clips NOT completed and why (0 credits / signed out / render failure / policy block), and which storyboards that leaves partial.
- Credits spent per account, and any account that could not select Veo 3.1 Lite.
- Confirmation that ~/Downloads is clean.
Unfinished clips stay pending and reappear in tomorrow's task file automatically.
