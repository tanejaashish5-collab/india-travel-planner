# Pilot Long-Form Script — "Hampi: The City That Was Larger Than Rome"

**Track:** NakshIQ heritage place-portrait long-form (pilot #1)
**Format:** faceless, third-person cinematic *story of the place* — **Kanishk-Gupta-style storytelling**, NOT a personal vlog. ~6–8 min.
**Language:** **Hindi-first** (primary render via VoiceClone IndicF5 "6a"); English master below; HI hook + close written out.
**Subject:** Hampi, Karnataka — `destination_id = hampi`
**Maps to:** `nakshiq.com/destination/hampi/...` (video reinforces the page's ranking).

> **Why this version (decided 2026-06-18).** The founder studied Kanishk Gupta (~1M-sub cinematic travel filmmaker) and liked the format. We scraped 3 of his transcripts (Munnar / Mawsynram / Rann of Kutch — `.scrapes/youtube/yt-*`). His DNA: **curiosity-superlative hook → verified facts used as AWE → a "why this place" beat → warm Hindi narration → a philosophical/meaning close.** His irreplaceable parts (on-camera presence, live human encounters, original cinematography) a faceless channel cannot fake without fabricating — so we take his *script craft* and apply it to a third-person **place-portrait**, the one genre where "no person on camera" is natural. Footage model chosen: **faceless place-portrait** (our R2 clips + free archival/Wikimedia + stock).

> **Data provenance & no-fabrication.** Every *travel* fact (months, temps, costs, POIs, eateries, logistics) is pulled verbatim from Supabase 2026-06-17 (`destination_months`, `destination_costs`, `sub_destinations`, `local_eateries`, `confidence_cards`, `destinations`). The *heritage-narrative* lines (✦) are historical/mythological claims — **run `data-fabrication-auditor` over every ✦ line against UNESCO/ASI/Britannica before render.** The DB already asserts "larger than Rome" and the Kishkindha/Hanuman association; this is a final accuracy pass.

**Voice:** warm, simple, second-person curiosity, awe — a friend who loves this place and won't lie to you. Hindi-first cadence (short sentences, emotional, not BBC-formal).

**Retention rules applied:** superlative hook + open loop in first 30s; 6–8 min; single site; the *meaning* payoff lands at ~80%; the honest "when to go" is a caring aside near the end, not the spine.

---

## SCENE MAP (for `run_longform.py` → `item["scenes"]`)

| # | ~Time | Beat | Primary visual |
|---|-------|------|----------------|
| 1 | 0:00–0:40 | Hook: city larger than Rome, fell, one lamp still lit | Boulder valley aerial → Virupaksha lamp |
| 2 | 0:40–2:00 | The scale + the fall (awe + drama) | Wide ruins, boulder fields, bazaar street |
| 3 | 2:00–3:05 | Virupaksha at dawn — 700 years of unbroken prayer | Temple gopuram at first light |
| 4 | 3:05–4:10 | Vittala — the stone chariot + the pillars that sing | Stone chariot, musical pillars |
| 5 | 4:10–5:20 | The kings + Matanga sunrise (the whole field) | Royal Enclosure, Lotus Mahal → Matanga panorama |
| 6 | 5:20–6:30 | The older story: Kishkindha / Ramayana (meaning) | Coracle crossing, Anegundi, Anjaneya Hill |
| 7 | 6:30–7:10 | The living present (warmth, not just ruins) | Hippie-island cafés, river, paddy |
| 8 | 7:10–8:05 | Philosophical close + honest "when to go" + soft CTA | Golden-hour hero, end card |

> **Footage is the ceiling, not the script.** We have ~1 Hampi hero clip in R2. An 8-min cut needs ~15 shots. Per chosen model: our R2 + **Wikimedia Commons (CC BY-SA)** for the named monuments (stone chariot, Lotus Mahal, Matanga sunrise, coracle) + a few stock plates. Budget ~2–3 hrs B-roll sourcing per video or it reads as a slideshow. This is the make-or-break.

---

## FULL SCRIPT (English master)

### SCENE 1 — HOOK (0:00–0:40)
**Visual:** Slow aerial over the boulder valley; hard cut to the Virupaksha lamp. No logo first.
**On-screen:** `HAMPI`
**VO:**
> ✦ You have seen the Taj Mahal. You have seen the forts of Jaipur. But have you ever seen an entire *city* — a city that, by some accounts, was once larger than Rome — lying broken across a valley of giant stones, as far as you can walk?
> ✦ Six hundred years ago, this was the richest city in India. And then, in a single century, it was gone.
> ✦ Only one lamp kept burning — in a temple that has not stopped praying for seven hundred years.
> This is Hampi. And most people who come here never understand what they are standing in.

**HI:** ✦ आपने ताजमहल देखा है। आपने जयपुर के किले देखे हैं। लेकिन क्या आपने कभी एक *पूरा शहर* देखा है — एक ऐसा शहर जो कभी रोम से भी बड़ा था — जो विशाल पत्थरों की घाटी में टूटा हुआ बिखरा पड़ा है? छह सौ साल पहले यह भारत का सबसे अमीर शहर था। और फिर, बस एक सदी में, यह ख़त्म हो गया। बस एक दीया जलता रहा — एक मंदिर में, जहाँ सात सौ साल से पूजा कभी नहीं रुकी। यह है हम्पी।

---

### SCENE 2 — THE SCALE & THE FALL (0:40–2:00)
**Visual:** sweeping ruins, boulder horizon, Hampi bazaar street.
**On-screen:** `Vijayanagara · 1336 · 26 sq km · UNESCO`
**VO:**
> ✦ Hampi was the capital of the Vijayanagara empire, founded in 1336. At its height it spread across twenty-six square kilometres — temples, palaces, markets — built into a landscape that looks like nowhere else on earth: millions of granite boulders, balanced on each other to the horizon, as if giants had been playing with stones and simply walked away.
> ✦ For two hundred years, gold and gems were traded in its open bazaars. Travellers from Persia and Portugal wrote home that they had never seen a city so rich.
> ✦ And then, in the sixteenth century, it fell — defeated, emptied, and left to the boulders.
> What you walk through today is not a monument. It is a whole civilisation, lying where it dropped.

*[✦ fact-check: "larger than Rome", gems-in-bazaars, Persian/Portuguese chroniclers, 16th-c fall/Talikota 1565]*

---

### SCENE 3 — VIRUPAKSHA AT DAWN (2:00–3:05)
**Visual:** gopuram at first light, lamp, river behind.
**On-screen:** `Virupaksha · praying for 700 years`
**VO:**
> Come at dawn — before the heat, before the crowds.
> ✦ At the centre of it all stands Virupaksha temple. And here is the strange thing about Hampi: the empire died, the city died — but this one temple never stopped. For seven hundred years, the prayers here have not broken. Not once.
> While everything around it became ruins, the lamp stayed lit. Stand in that courtyard at first light, and you are part of something older than almost anything still living in India.

---

### SCENE 4 — VITTALA, THE STONE THAT SINGS (3:05–4:10)
**Visual:** stone chariot; musical pillars; carving detail.
**On-screen:** `Vittala Temple · the stone chariot on the ₹50 note`
**VO:**
> A little further, by the river, is Hampi's masterpiece — the Vittala temple.
> ✦ Here is the stone chariot you have seen your whole life without knowing it — it is printed on the fifty-rupee note.
> ✦ And around it, the temple has pillars that *sing*. Tap them, and each rings with a different note — granite carved so finely it became a musical instrument.
> Six hundred years ago, someone here taught rock how to make music. That is the kind of place this was.

*[✦ fact-check: ₹50 note, SAREGAMA/musical pillars]*

---

### SCENE 5 — THE KINGS & MATANGA SUNRISE (4:10–5:20)
**Visual:** Royal Enclosure, stepped tank, Lotus Mahal, elephant stables → Matanga panorama at golden hour.
**On-screen:** `Royal Enclosure · Matanga Hill`
**VO:**
> Walk south and you reach where the kings actually lived — the Royal Enclosure: the stepped tank, the elephant stables, the Lotus Mahal where the queens once sat.
> And when the light begins to soften, climb Matanga Hill — the highest point in Hampi. From the top, the whole ruined empire opens beneath you: temples, boulders, the green line of the Tungabhadra river, all turning to gold.
> Go pre-dawn or at dusk — in the daytime heat this climb punishes you. But time it right, and it is one of the most beautiful sights in all of South India.

---

### SCENE 6 — THE OLDER STORY: KISHKINDHA (5:20–6:30) — *meaning payoff*
**Visual:** coracle crossing the Tungabhadra; Anegundi; Anjaneya Hill steps; Pampa Sarovar.
**On-screen:** `Anegundi · Kishkindha · the Ramayana`
**VO:**
> But here is what almost everyone misses.
> ✦ Cross the Tungabhadra — by coracle, the little round basket-boat, for a few rupees — and you step into a story far older than the empire. This is Anegundi. And in the Ramayana, this is **Kishkindha** — the kingdom of the monkey king, where Rama searched for Sita. The hill here, Anjaneya, is believed to be the birthplace of **Hanuman** himself.
> So when you stand on the rocks of Hampi, you are standing in two ages at once — an empire that history remembers, and a myth older than history. Both written into the same stones.
> ✦ The Ramayana, turned to rock, with a lost kingdom built on top. There is nowhere else in India quite like it.

*[✦ fact-check: Kishkindha/Anegundi tradition, Anjaneya = Hanuman's birthplace — frame as belief/tradition, not asserted fact]*

---

### SCENE 7 — THE LIVING PRESENT (6:30–7:10)
**Visual:** hippie-island cafés, river-facing cushions, paddy fields, banana-leaf thali.
**On-screen:** `…and Hampi is still alive`
**VO:**
> And Hampi is not only ruins.
> Cross to the far bank — what travellers call the Hippie Island — and the days slow right down: banana-leaf thalis at the old Mango Tree, sunsets from floor-cushions by the water at Laughing Buddha, music drifting over the paddy fields.
> A dead empire on one bank. A very alive present on the other. That contrast *is* Hampi.

---

### SCENE 8 — CLOSE + HONEST ASIDE + CTA (7:10–8:05)
**Visual:** golden-hour hero hold; end card.
**On-screen:** `GO: Nov–Feb · NEVER: Apr–May · nakshiq.com`
**VO:**
> That is the feeling Hampi leaves you with. Empires fall. Cities are forgotten. The richest place in India became a field of stones. But the prayer never stopped, the myth never died — and the boulders remember what people forget.
> We come to ruins thinking we will see the past. Instead, the past quietly asks us how long anything *we* build will really last.
> One honest thing before you go. Come between **November and February**, when the mornings are cool and the light is clean. **Never in April or May** — the boulders turn into a furnace, fifty degrees underfoot, and there is genuinely no version of Hampi that works in that heat. Give it two days, rent a scooter, and climb Matanga before the sun.
> We tell the honest story of every place in India — the meaning, *and* the truth of when to go. If that's something you want more of, stay with us. We'll see you at the next one.

**HI close:** साम्राज्य गिर जाते हैं, शहर भुला दिए जाते हैं — लेकिन यहाँ प्रार्थना कभी नहीं रुकी, कहानी कभी नहीं मरी, और ये पत्थर वो याद रखते हैं जो हम भूल जाते हैं। एक ईमानदार बात: हम्पी **नवंबर से फ़रवरी** के बीच जाइए। **अप्रैल-मई में कभी नहीं** — पत्थर भट्टी बन जाते हैं, पैरों तले पचास डिग्री। दो दिन रखिए, स्कूटर लीजिए, और सूरज से पहले मतंगा चढ़िए।

---

## PRODUCTION NOTES
- **Length:** ~1,150 words EN ≈ 7–8 min at this slower, emotive pace. Hindi render is the **primary** publish (the format the founder likes is Hindi-first); EN is a second cut.
- **Voice:** HI via IndicF5 "6a" (`~/Desktop/VoiceClone/speak.sh`); EN via Chatterbox. Render the HI hook + close above first as a 60-sec **taste** for founder sign-off before full production.
- **Footage (the ceiling):** our R2 `hampi.mp4` + Wikimedia Commons CC for stone chariot / Lotus Mahal / Matanga sunrise / coracle + 2–3 stock plates. Verify every clip is genuinely Hampi (no wrong-temple swaps).
- **Music:** low cinematic bed from the no-attribution Mixkit library already in the autoposter, ducked under VO; lift at the Matanga + Kishkindha beats.
- **Thumbnail:** boulder valley + Virupaksha, text "LARGER THAN ROME" or "The City India Forgot" — the *story*, not a postcard.
- **Pipeline:** target `~/Desktop/chanakya-autoposter/pipeline/run_longform.py` scene structure OR a new NakshIQ long-form entry — DECISION PENDING.
- **Before publish:** (1) `data-fabrication-auditor` pass over all ✦ heritage lines; (2) founder review of the 60-sec HI taste; (3) **do NOT auto-publish** — first render is for review.
- **This is a format TEST.** Faceless long-form travel is unproven in India (validation finding). Treat the first 3–5 videos as a test of *format viability*, measured on retention + watch-time, before committing to a channel.
```
