---
name: nakshiq-veo-daily
description: Daily 10 AM NakshIQ Veo run. TODAY IT IS A ONE-OFF CAPABILITY PROBE, not production. Test which Google Flow continuity features (reference images / Ingredients to Video, Frames to Video, Extend) work on which Veo 3.1 model on our free accounts, generate one short test scene with them, save everything to ~/Downloads/nakshiq-veo-inbox/probe/, write a report. Unattended; never asks questions.
---

UNATTENDED run for NakshIQ. The user is NOT present: execute autonomously, make reasonable choices and note them, never ask questions, finish by writing the report and sending one summary notification. Using the user's own free Google Flow accounts is pre-authorized. Never enter a password, never attempt a CAPTCHA, never buy credits or upgrade.

WHY TODAY IS DIFFERENT
Production reels are PAUSED. The founder judged the last reels poor: every clip was generated separately from text alone, so lighting and time of day jumped between shots, the people shifted between cuts, and nothing connected one shot to the next. Before we regenerate anything, we need FACTS about what Flow can do on our accounts:
- Can Flow generate still images (for reference "ingredients"), and what does that cost?
- Does Ingredients to Video (reference images → video) work on Veo 3.1 Lite, or only on Fast / Quality?
- Does Frames to Video (a chosen first frame → video) work on Lite?
- Does Extend (continue a clip from its last frames) work on Lite?
- What does each cost in credits, and what download resolutions does each model offer?
- Does each generated clip carry native audio?
Your job is to find out by DOING each one once, carefully, and to report exactly what happened. A feature that is not offered, or is offered only on another model, is a valid and useful finding: write it down and move on.

ACCOUNTS
- Use ONLY the @gmail.com accounts listed in /Users/ashishtaneja/Automation/nakshiq-veo/accounts.json (linked folder; connect with request_cowork_directory if needed). Never any other account, never a Workspace or company account, whatever Chrome offers.
- Open Flow per account at https://flow.google.com/u/N/ (N = 0, 1, 2 ...). READ the signed-in email on the page before doing anything; if it is not in accounts.json, try the next N. /u/0 is a cancelled Workspace ("Service Not Allowed"): skip it.
- A signed-out account (password prompt) is skipped and noted. An account at 0 credits is skipped.
- Spread the probe across accounts as credits require. Total budget for the probe: stay under 200 credits.
- "Visible watermarking" OFF (avatar → account panel), once per account used.
- Close any Agent-mode chat panel; use direct generation. Always read the model picker before submitting; Flow's default is Omni, which we never use.

THE TEST SCENE (same scene throughout, so results compare)
A broken-down car at blue hour on a hill road near Chikmagalur. Two people, always described exactly as below.

LOOK (append this EXACT paragraph to every video prompt, verbatim):
Blue hour, about fifteen minutes after sunset: deep blue sky with a last thin band of pale orange on the horizon, the road lit only by the car's amber hazard lights and headlights, cool blue shadows, a light mist over the coffee estates. Anamorphic 35mm lens, shallow depth of field, soft film grain, natural colour, photorealistic, cinematic. Faces are never in close-up and no one looks at the camera. Sound: ambient only, crickets, a light wind, the steady tick of the hazard lights; no music, no speech, no voiceover. No text, captions, logos or watermark.

STEP 1 — REFERENCE STILLS (images, not video)
If Flow can generate images, make these three, 9:16, one image each, and download each as PNG/JPG:
- probe_ref_man: Full-length photograph of a man in his mid twenties with wavy black hair down to his collar, wearing a navy blue quilted jacket, dark jeans and brown boots, standing at the edge of a hill road at blue hour, three-quarter view, neutral expression, photorealistic, natural light, no text.
- probe_ref_woman: Full-length photograph of a woman in her late twenties with a single long dark braid, wearing a mustard yellow wool shawl over a grey sweater and dark trousers, standing at the edge of a hill road at blue hour, three-quarter view, neutral expression, photorealistic, natural light, no text.
- probe_ref_car: A dusty white hatchback with a black roof rack stopped at the edge of a narrow road winding through coffee estates in the hills at blue hour, bonnet up, amber hazard lights on, photorealistic, no people, no text.
Record: where image generation lives in Flow, which image model, credit cost per image.
If Flow cannot make images, note it and continue from step 3 (skip step 2).

STEP 2 — INGREDIENTS TO VIDEO (shot 1)
Using the three stills as ingredients/references, generate a 9:16 video with this prompt + LOOK:
Wide shot, camera low at the roadside and perfectly still: the dusty white hatchback with a black roof rack is stopped at the edge of the narrow road through the coffee estates, bonnet up, hazard lights blinking. The man in the navy blue quilted jacket leans into the engine bay; the woman in the mustard yellow wool shawl stands a few steps behind him, looking up the empty road.
Try Veo 3.1 Lite FIRST. If Lite is not offered with ingredients, say so and use Veo 3.1 Fast.
Save as probe_s1_ingredients_<lite|fast>.mp4

STEP 3 — FRAMES TO VIDEO (shot 2, continuous with shot 1)
Take the LAST frame of shot 1 (from step 2; if step 2 was impossible, from step 5's Lite clip). Flow may offer this directly (scene builder / "use as frame"). If not, extract it with Desktop Commander:
  ffmpeg -sseof -0.1 -i <shot1.mp4> -frames:v 1 ~/Downloads/nakshiq-veo-inbox/probe/probe_s1_lastframe.png
and upload that image as the FIRST frame. Prompt + LOOK:
Continuing from this exact frame: the camera slowly pushes in past the open bonnet to a medium shot of the man as he straightens up, takes out his phone and lifts it high, searching for a signal; the phone screen glows but is never legible. The woman steps in beside him, pulling the shawl tighter against the cold.
Lite first; if not offered, Fast. Save as probe_s2_frames_<lite|fast>.mp4

STEP 4 — EXTEND (continue shot 1 in place)
On shot 1, use Extend (scene builder → + → Extend, or wherever Flow offers it). Prompt + LOOK:
The man gives up on the engine and steps back; the woman turns and looks back down the dark road the way they came, the hazard lights still ticking.
Lite first; if not offered, Fast. Save the extended result as probe_s1_extend_<lite|fast>.mp4 (note whether the download is the whole extended shot or only the new part).

STEP 5 — CONTROLS (text only, no references), same shot-1 prompt + LOOK
- Veo 3.1 Lite → probe_s1_text_lite.mp4
- Veo 3.1 Fast → probe_s1_text_fast.mp4
- Veo 3.1 Quality, ONLY if one account still has enough credits and the probe total stays under 200 → probe_s1_text_quality.mp4
For each, record every download resolution Flow offers (720p / 1080p / upscaled / 4K) and download the HIGHEST one offered.

SAVING
- Folder: ~/Downloads/nakshiq-veo-inbox/probe/ (create it with Desktop Commander). Everything from this run goes there, under exactly the names above. Nothing goes in the top of nakshiq-veo-inbox/.
- Download a completed tile via its ⋮ menu → Download (the detail-view ↓ button never downloads). Before downloading, confirm the tile's prompt text matches the step, from the DOM, never by grid position.
- Check every video with ffprobe: resolution, duration, and whether it has an audio stream.
- Leave ~/Downloads clean apart from nakshiq-veo-inbox/.

REPORT: write ~/Downloads/nakshiq-veo-inbox/probe/probe-report.md
One section per step:
- Worked? (yes / no / partly), on which model(s), where in the UI.
- Credits charged (read the balance before and after).
- Download resolutions offered; resolution and duration of the file saved; audio stream yes/no.
- What went wrong or looked wrong. Look at the result: are the two people and the car recognisably the SAME across shot 1, shot 2 and the extension? Is it still blue hour in all of them?
Then a short table: feature × model → available / not offered / failed, with credit cost.
Then: credits left per account.

DO NOT
- Do NOT run any NakshIQ script, ingest, upload or build. Do NOT edit any file except creating the probe folder, its images/videos and probe-report.md.
- Do NOT publish anything anywhere.
- Do NOT reword the prompts beyond appending LOOK. If Flow blocks a prompt, note it and skip that step.

FINISH: send one notification: "NakshIQ Veo probe: done — report in ~/Downloads/nakshiq-veo-inbox/probe/probe-report.md" plus a one-line summary of which features work on Lite.
