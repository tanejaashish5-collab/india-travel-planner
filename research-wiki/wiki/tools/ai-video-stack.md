---
type: tool
sources: [data/research/VAIBHAV-SISINTY-TOOLS-INVENTORY-2026-07-01.md, data/research/VYAN-GANDHI-AI-VIDEO-FINDINGS-2026-06-29.md]
updated: 2026-07-07
---

# AI video stack (state of the art, mid-2026)

The pipeline top creators use for cinematic AI reels, vs what we run.

## The reference stack ([[vaibhav-sisinty]]'s "100M views/month" pipeline)

1. **Claude** — writes image + motion prompts
2. **Nano Banana Pro / GPT Image 2** — still-image generation (character sheets, mood boards)
3. **Seedance 2.0 (ByteDance) / Veo 3.1 (Google)** — image-to-video; his tests: Seedance wins some shots, Veo others; Veo failed his fight-scene test
4. **OpenArt VFX / SmartShot** — compositing layer: background replace, relighting, face-insertion, shot-directing ("stop prompting, start directing"). His paid sponsor (code VS15)

## What we run (Chanakya/Anvikshiki + NakshIQ, as of 2026-07)

- Veo/Flow for festival hero videos (500/500 live on R2) — watermark must be cropped `crop=1216:684:0:0`
- IndicF5 local TTS voice ("6a") — **ahead of the reference stack** (he's talking-head, no voice clone)
- No stills-model usage (Nano Banana), no Seedance, no VFX compositing layer

## Adoption verdict (2026-07-01)

OpenArt-style face-insertion **doesn't fit our committed format** — Chanakya/Anvikshiki visuals are Devanagari-only, no-presenter-face, ancient-allegory (founder rule 2026-06-28). Seedance as a Veo alternative is worth a try next time Veo blocks/fails a scene — a blocked Veo prompt is a one-line reword, not permanent (festival batch lesson).

Related: [[google-free-ai-stack]], [[vyan-gandhi]].
