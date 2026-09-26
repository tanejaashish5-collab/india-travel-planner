# nakshiq-veo — daily Veo clip generation

Built 2026-09-20. This is the half of the Veo pipeline that **never existed**.

## What was actually broken

Nothing. There was no job.

Audited 2026-09-20 across the whole machine and repo:

| Checked | Result |
|---|---|
| LaunchAgents mentioning veo/flow | none |
| crontab | none |
| GitHub Actions workflows | none mention veo |
| Any code that submits a prompt to `flow.google.com` | **none anywhere** |

`scripts/veo-harvest.mjs` — the one file with "veo" in its name — only *collects*
`.mp4`/`download.zip` files that a human had already downloaded by hand. It was
never a generator.

So the 30 clips of **2026-09-15, 18:59–19:13** were one manual browser session,
and every day since produced nothing, because nothing was scheduled to. The daily
allowance (6 accounts x 50 credits = 30 clips at 10 credits each on Veo 3.1 Lite)
went unused by default, not by failure. Same class as a plist that is written but
never loaded: a capability nothing triggers.

## 🔴 Generation CANNOT be automated — settled 2026-09-21

`flow-run.mjs` does not work and cannot be made to work. This is a finding, not
a backlog item, and it is written down here so nobody rebuilds it.

Four routes were tried, in order, and every one is closed:

| Route | What happened |
|---|---|
| Playwright signs in | Google refuses: **"Couldn't sign you in / This browser or app may not be secure"**. It detects `--enable-automation` and `navigator.webdriver` on the sign-in flow. |
| Sign in with a normal Chrome, then let Playwright drive the profile | The founder signed in successfully; the **first Playwright launch against that profile invalidated the session**. Observed in sequence: plain Chrome signed in (`flow.google.com/?pli=1`) → Playwright signed out (`/about`) → plain Chrome signed out too. Google binds the session to the browser. |
| CDP into the founder's own Chrome | Chrome has **blocked `--remote-debugging-port` on a real profile since v136**; this machine runs **153**. |
| Copy cookies from his main profile | Credential material. **Deliberately not done.** |

Stripping the automation flags would be bot-detection evasion, so it was not done
either.

Two related things were also wrong and are worth keeping straight from the
selector work, because they made the failure look like a selector bug:

- **`flow.google.com/?authuser=N` is not account switching.** It redirects to
  `/about`, the marketing page. That is the real reason every account reported
  *"could not select Veo 3.1 Lite"* — the script was reading a landing page that
  has no model picker. Accounts switch **in-app**: avatar → **Switch account**.
- **Flow has no deep link.** `labs.google/fx/tools/flow` now redirects to
  `flow.google.com`, and `/tools/flow` is a 404. The app is plain
  `flow.google.com/`, which serves `/about` signed out and the workspace signed
  in. There is no URL that skips auth.

### What the job does instead

Generation is a human step; everything either side of it stays automatic.

```
verdicts.json ─► build-queue.py ─► veo_queue.json
                  (storyboard.py)        │
                                         ▼
                              make-paste-pack.mjs
                                         │
                    ~/Desktop/Reports/NakshIQ-Veo-Paste-Pack-<date>.html
                                         │
                            ░░ human pastes into Flow ░░
                                         │
                                         ▼
                              intake.sh ──► intake-manual.mjs
                                            collect-clips.mjs   name by beat
                                            upload-clips.mjs  ─► R2
```

`accounts.json` sets the roster and the order. **It is never mirrored to the
repo** — `india-travel-planner` is PUBLIC and that file names real Google
accounts. It lives only here, under `~/Automation/nakshiq-veo/`.

Each entry carries an `owner`. Some accounts belong to the Chanakya project, and
credits spent here are credits that project cannot spend; the pack labels those
rows so the cost is visible at the moment of spending. Remove a row to stop
using that account. Account addresses must not appear in this file either — it
IS mirrored, and on 2026-09-21 four of them reached the public repo exactly that
way.

**Order is load-bearing.** Downloads pair to beats by order, so the pack is
numbered and must be worked top to bottom. `bash intake.sh --dry` prints the
mapping and writes nothing — use it before committing to a batch.

## The loop

```
verdicts.json ─► build-queue.py ─► veo_queue.json
                  (storyboard.py)        │
                                         ▼
                                   flow-run.mjs      6 accounts x 5 clips
                                         │
                                         ▼
                                  collect-clips.mjs  name by beat
                                         │
                                         ▼
                                  upload-clips.mjs   ─► R2 nakshiq-videos
                                         │
                                         ▼
                       yt_shorts_v2.py fetches <slug>__<format>__b3.mp4
                       and cuts the reel in BEAT order
```

## Files

| File | Does |
|---|---|
| `build-queue.py` | Picks destinations least-recently-generated, storyboards them, queues prompts. One format per destination per run so the library broadens. |
| `flow-run.mjs` | Drives Flow across 6 accounts. `--login`, `--probe`, `--headful`. |
| `collect-clips.mjs` | Unpacks Flow's zips, renames downloads to beat names **by order**, refusing entirely on a count mismatch. |
| `upload-clips.mjs` | Pushes to the `nakshiq-videos` R2 bucket. Idempotent on byte size. |
| `run-veo.sh` | The wrapper the LaunchAgent runs. |
| `com.nakshiq.veo-daily.plist` | 09:20 and 14:20 daily. |

## Daily automation — Claude Cowork (set up 2026-09-21)

Playwright cannot drive Flow (see the table above), but a **Cowork scheduled task
can**, because it operates the founder's own signed-in Chrome. First run: 28/28
clips, all Veo 3.1 Lite, 9:16, prompts verified verbatim.

| When | What | Who |
|---|---|---|
| 09:20 | ingest inbox → top up queue → write `today-tasks.json` + HTML pack | LaunchAgent `com.nakshiq.veo-daily` |
| 10:00 | generate every clip, save under exact `save_as` into `inbox/` | Cowork task `nakshiq-veo-daily` |
| 14:20 | ingest inbox → R2, verified to SERVE | LaunchAgent |

The task lives at `~/Documents/Claude/Scheduled/nakshiq-veo-daily/SKILL.md`.
That folder is not in git, so its canonical copy is `cowork-task.SKILL.md` here.
**Edit here, then copy it there.**

Ingest runs FIRST in `run-veo.sh`. The other order re-lists clips that were
generated but not yet ingested (they still read `pending`), and the next session
generates them a second time: a straight double spend.

## The tone mix (founder-approved 2026-09-21)

"Can't be all serious." Two storyboards per tone per day, 8 storyboards, landing
on exactly 30 clips. No two reels in a day built on the same feature.

| Tone | Formats | Feature / data point |
|---|---|---|
| tense | sos_rescue, road_closed, fuel_gap, hospital_run | offline SOS page, road feed (6 regions), pump data, named hospital + >=2500 m |
| useful | how_hard, which_two, real_cost, two_places | trek distance/altitude/days, /vs/ pairs + this month's scores, cost days by season |
| warm | food_find, wrong_month | named eatery, month verdicts |
| awe | quiet_month, crowd_pullback | crowd calendar x full-year verdicts |

The lighter formats read `data/reel-data.json` (treks, crowd, cost days, full-year
verdicts, /vs/ pairs). `scripts/export-reel-data.mjs` refreshes it weekly over
DIRECT Postgres (the costs table is 12,693 rows; REST is forbidden over 500). It
needs `SUPABASE_DB_URL` in `apps/web/.env.local`, which is NOT there as of
2026-09-21 — until it is, the job uses the snapshot taken that day and warns
once it is 30 days old. `data/` is never mirrored to the public repo.

Every reel says only what the data proves for THAT destination. `validate()`
refuses "every destination", "verified", "local contact", "updated daily" and
similar, and refuses any recurring character shown without their full
description (Veo has no memory between clips).

## The one thing a human must do every day

Open the pack, paste 28-30 prompts into Flow in a normal Chrome, download, then
run `bash ~/Automation/nakshiq-veo/intake.sh`. Roughly ten minutes.

`flow-run.mjs --login` is retired: it cannot sign in (see the table above), and
the session it would create is destroyed the moment Playwright touches it.

## Rules baked in as code, not comments

- **Veo 3.1 Lite or nothing.** Flow defaults to Omni 1.1 Flash at 12 credits vs
  Lite's 10 — 20% more per clip and 4 clips per account instead of 5. If the
  model control cannot be found, the account is **refused**, never generated on
  the default.
- **Zero clips generated exits non-zero.** A job reporting success while
  producing nothing is how the last gap stayed invisible.
- **Count mismatch collects nothing.** Downloads pair with beats by order, so a
  mismatch would mislabel footage. A beat with no clip merely shortens a shot; a
  beat with the *wrong* clip is a lie.
- **Two fire times.** A single daily fire drops the day if the Mac is asleep.
- **`/bin/bash` via LaunchAgent.** It holds Full Disk Access here, so the job can
  read the storyboard code in the repo under `~/Desktop`; cron could not unlock
  the keychain and a non-FDA interpreter could not read `~/Desktop`.
- **Queue tops up to the budget, not by it.** Generation is the bottleneck, so
  queueing a fresh 27 on every fire would build a backlog that 30/day can never
  clear (observed: 27 to 54 in two runs).

## Keyframe mode (2026-09-26)

Probe part 2 (2026-09-25, measured from the files, not from the run's report)
changed the shape of a storyboard:

| Finding | Measured | Consequence |
|---|---|---|
| Image mode takes ingredients at 0 credits | 2b: s1 still composed from the 3 refs | every beat is a free still first |
| Frames to Video starts on the exact still | A1: PSNR 37.9 dB against the supplied frame | animate the approved still, do not re-describe it |
| Start + end still accepted on Lite, 10 credits | A3: lands on the end still, 25.5 dB | beats that must land somewhere get an end still (a free edit of the start still) |
| Short Extend prompt = long one | A4: source intact 47.4 dB, frames indistinguishable | Extend and Frames prompts carry motion + sound + negatives only |
| "Three shots in one clip" | A5: one hard cut, 2 pieces | montage only for cutaways; not used in specs |

In the spec: `keyframes[]` (name `kf_*`, `refs` = refs or earlier keyframes,
`prompt` = composition; the look paragraph is appended) and shots of `mode:
"frames"` with `start` and optional `end`. `reel_v3.py enqueue --stills-only`
queues only refs + keyframes (a 0-credit day), `reel_v3.py sheet` builds the
contact sheet the founder approves, then plain `enqueue` adds the shots.
`export-tasks.mjs` fills accounts by credits (stills cost 0) and ships
`start_frame` / `end_frame`; the Cowork task has steps 2k (keyframe) and 3f
(frames). Choosing Frames can switch the model to Fast: the task makes the agent
read the 10-credit chip back before submitting. First spec on the new method:
`nakshiq-autoposter/reel_specs/chikmagalur__sos_keyframe.json` (same approved
script as the v3 storyboard). `queue-keyframe-stills-once.sh` was the one-shot
LaunchAgent that queued its stills day on 26 Sep after 13:00.

## Mirror rule

`~/Automation` is **not** a git repo. This directory is mirrored to
`ops/nakshiq-veo/` in the India Travel Planner repo. **After editing the live
copy, re-copy and commit** — same rule, and same failure mode, as
`ops/nakshiq-ig/`.

## Logs

`~/.claude/veo-daily.log`. A 0-byte log mid-run is normal: output buffers until
exit. Judge liveness by `ps` and by the queue's status counts, never by log size.
