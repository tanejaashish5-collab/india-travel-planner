---
type: source
sources: [data/research/NITIN-JOSHI-CHANNEL-SCAN-2026-08-03.md]
updated: 2026-08-03
---

# Nitin Joshi channel scan + first deep-read (2026-08-03)

Founder supplied `@jinitinjoshi` cold. Zero prior overlap with our 1,236 scrapes. **22 of 30
episodes captured (462,805 words)**; one deep-read. **No opportunity recommended.**

**Headline finding:** the channel is a **KEEP, reclassified** — not a neutral operator-interview
show but, at least in part, a **franchise lead-generation platform**. Proven on camera, not
inferred. Drove a new test into [[receipts-over-content]]: *a revenue figure quoted by someone
who will sell you the means to replicate it is not a receipt — it is a price tag.*

## Deep-read: EV charging franchise (`APzeZtT9mnU`, Ashwani Dixit, Livo/LVO)

Disclosed: **₹15.5L franchise** (₹7.5L infra + ₹7.5L charger), ~₹1.5L PM E-DRIVE subsidy → **net
~₹14L**, **₹15,000/mo minimum guarantee for 24 months**, 8-year term, 45-day deployment, zero
manpower, tri-party agreement with the land owner.

**The margin is thinner than the headline.** ₹20/kWh retail − ₹7/kWh electricity looks like ₹13.
He later discloses a **₹3/kWh service fee to his company for all 8 years** — franchisee nets
**~₹10/kWh before land rent**. He explains the razor-and-blades structure himself (glucometer
sold below cost; money is in the strips).

**Genuinely useful:** the supply gap is real and static (**1 charger per 200–250 EVs, unchanged
2023→2026**); utilisation is **~7% in India vs ~15% globally**; negative working capital (customer
pays before electricity is dispensed); and the standout — **the RWA failure mode**, where a
well-capitalised foreign operator failed in India purely on Resident Welfare Association politics.
His workaround is to sign with builders *before* the RWA exists. That constraint is the episode's
real asset.

**Red flags:** refused to show the 7%-utilisation commercials on screen; 20–22 chargers today →
600 claimed by March 2027 while admitting team-capacity limits; an AAI MoU claim whose stated
comparison set (Ola, Uber, Bharat Cab) are cab aggregators, not charging networks; EV-penetration
figures internally inconsistent (15–17% vs the host's 2%; MG 84% + Tata 15% + Mahindra 13% = 112%).
Competitors named **in the episode itself** — Statiq (~$35M), ChargeZone (~$54M), Tata Power,
Adani, Jio — which is a CROWDED signal before any search is run.

## Operational findings

- **Both YouTube transcript endpoints are IP-rate-limited after ~22 fetches.** `youtube-transcript-api`
  → `IpBlocked`; yt-dlp `timedtext` → 429. Installed `curl_cffi==0.15.0` (yt-dlp pins `<0.16`) +
  yt-dlp 2026.07.04 to enable impersonation — **targets came live and the 429 persisted**, proving
  the limit is IP-based, not fingerprint-based. Cap channel sweeps at ~20 per run.
- **Auto-transcription mangles rupee figures** (`₹00`, `₹0000`, `₹1.5 लाख` ↔ `₹15,000`). A hard
  limit on using auto-transcripts for unit economics — exactly what we want them for.
- Fixed a catalogue-wide check: 0 split channels remain across 1,268 scrapes.

Related: [[nitin-joshi]], [[receipts-over-content]], [[demand-sources-over-commentary-sources]], [[rejected-ideas]], [[regulatory-forced-buyer]].
