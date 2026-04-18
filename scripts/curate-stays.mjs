#!/usr/bin/env node
/**
 * Curate stay picks for a single state. Two modes per destination:
 *   - enrich: destination already has rows → keep why_nakshiq, add sources + upgrade_reasoning
 *   - full:   no existing rows → Haiku research → Sonnet voice → write 4 picks
 *
 * Auto-mode picks enrich vs full per destination. Use --mode=enrich-only or
 * --mode=full-only to override.
 *
 * Usage:
 *   node scripts/curate-stays.mjs --state rajasthan --dry-run
 *   node scripts/curate-stays.mjs --state rajasthan --commit
 *   node scripts/curate-stays.mjs --ids udaipur,jaipur --dry-run
 *
 * Env (from apps/web/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { createClient } from "@supabase/supabase-js";

// ===== env =====
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const { NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY, ANTHROPIC_API_KEY: ANTHROPIC_KEY } = env;
if (!SUPABASE_URL || !SERVICE_KEY || !ANTHROPIC_KEY) {
  console.error("Missing env in apps/web/.env.local (need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY)");
  process.exit(1);
}

// ===== args =====
const args = process.argv.slice(2);
const argv = { state: null, ids: [], mode: "auto", dryRun: true, concurrency: 3 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--state") argv.state = args[++i];
  else if (args[i] === "--ids") argv.ids = (args[++i] || "").split(",").filter(Boolean);
  else if (args[i] === "--mode") argv.mode = args[++i];
  else if (args[i] === "--commit") argv.dryRun = false;
  else if (args[i] === "--dry-run") argv.dryRun = true;
  else if (args[i] === "--concurrency") argv.concurrency = parseInt(args[++i], 10);
}

if (!argv.state && argv.ids.length === 0) {
  console.error("Provide --state <slug> OR --ids <id1,id2,...>");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ===== select destinations =====
let destinations = [];
if (argv.ids.length) {
  const { data } = await supabase.from("destinations")
    .select("id, name, state:states!inner(id, name)")
    .in("id", argv.ids);
  destinations = data ?? [];
} else {
  // states.id is the slug (e.g. "rajasthan", "himachal-pradesh")
  const { data } = await supabase.from("destinations")
    .select("id, name, state:states!inner(id, name)")
    .eq("state_id", argv.state);
  destinations = data ?? [];
}

if (destinations.length === 0) {
  console.error(`No destinations found for state=${argv.state} ids=${argv.ids.join(",")}`);
  process.exit(1);
}

console.log(`\nCurating stays for ${destinations.length} destinations...`);
console.log(`Mode: ${argv.mode} · ${argv.dryRun ? "DRY RUN" : "COMMIT"} · concurrency=${argv.concurrency}\n`);

// ===== fetch existing picks (for enrich mode) =====
const existingByDest = new Map();
const destIds = destinations.map((d) => d.id);
const { data: existingRows } = await supabase.from("destination_stay_picks")
  .select("destination_id, slot, name, why_nakshiq, price_band, property_type")
  .in("destination_id", destIds);
for (const r of existingRows ?? []) {
  if (!existingByDest.has(r.destination_id)) existingByDest.set(r.destination_id, []);
  existingByDest.get(r.destination_id).push(r);
}

// ===== prompts (duplicated from apps/web/src/lib/stays/* to keep this script self-contained) =====
const BANNED_WORDS = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "bucket list",
  "breathtaking", "magical", "incredible", "authentic", "curated",
  "elevated", "immersive", "luxurious", "opulent", "exquisite",
  "pristine", "paradise",
];

function researchPrompt({ name, state, existingNames }) {
  const enrichNote = existingNames && existingNames.length
    ? `\n\nPRIORITY: We already have editorial picks for this destination. Find sources (2+ URLs each) for these specific properties, even if you'd otherwise skip them:\n${existingNames.map((n) => `  - ${n}`).join("\n")}\n\nAlso list OTHER strong candidates — we may swap picks if sources are stronger elsewhere.`
    : "";
  return `You are a travel researcher. Build a RAW DOSSIER of stay options for ${name}, ${state}, India. No voice. No picks. Just structured facts with sources.${enrichNote}

Use web_search. Prioritise: (1) property's own website, (2) awards lists (Condé Nast Gold List, T+L 500, Tripadvisor Travelers' Choice, NatGeo India), (3) 2024-2026 reviews (Tripadvisor, Booking, Agoda), (4) travel editorial, (5) YouTube hotel tours / Reddit r/IndiaTravel for homestays.

For EACH property return: name, property_type (luxury_chain|heritage|boutique|mid_range_hotel|resort|homestay|guesthouse|eco_lodge|farmstay|villa|glamping_camp|houseboat), chain_affiliation (Taj|Oberoi|Four Seasons|IHCL Seleqtion|Radisson|null), price_band_specific (granular like "₹3-6k" or "₹18-28k" or null), signature_experience (ONE concrete thing, named), slot_hint (experience|value|location|xfactor), contact_only (true/false), contact_info (if contact_only), signals (awards/features, 1-4), caveats (honest warnings), sources (2+ { url, title, source_type }).

RULES:
- 4-8 properties. If <4 with 2+ sources, return fewer and set insufficient_data: true.
- NEVER invent a property. No sources = exclude.
- If no luxury chain exists here, SAY SO in destination_note. Do not manufacture.
- Every property needs 2+ sources from different domains.

Return ONLY valid JSON (no markdown, no prose):
{
  "destination": "${name}",
  "state": "${state}",
  "insufficient_data": false,
  "destination_note": "...",
  "properties": [{...}]
}`;
}

const VOICE_SYSTEM_PROMPT = `You are NakshIQ's editorial voice for stay picks. You are direct, specific, and measured. You never hype.

VOICE RULES (mandatory):
- First-person plural ("We recommend", "We'd skip this")
- Direct second-person to reader ("If you're travelling with kids, pick X")
- Specific. Named properties. Named locations. Named people. Named prices.
- Numbers over adjectives. "45-minute walk" beats "short stroll". "₹5,000 more" beats "slightly pricier".
- Oxford comma. Em-dashes without spaces.
- NEVER use these words: ${BANNED_WORDS.join(", ")}
- If a place has bad roads, slow service, or monsoon closure — say so plainly.

EXEMPLARS of the voice (mirror these, don't copy):

Good signature_experience:
  ✓ "Breakfast on the Amber Pavilion at 6:30am — the lake is glass before the motorboats start"
  ✓ "Cave Suite #14 with private plunge pool; the only one with a direct view of the fort"
Bad:
  ✗ "A luxurious, curated experience" — banned words
  ✗ "Breathtaking views and magical ambiance" — hype

Good why_nakshiq:
  ✓ "We pick this over the newer Courtyard because the 1756 haveli walls keep rooms at 24°C without AC even in peak May"
  ✓ "The ₹4,200/night rate includes dinner with the Bhati family — their ker sangri is why we come back"

Good upgrade_reasoning:
  ✓ "The ₹5,000/night gap between Jagat Niwas Palace and Taj Lake Palace buys you the lake-facing suite Lake Palace was built around, and skips the 45-minute walk through the old-city bazaar."
  ✓ "At ₹7,000 more per night, Oberoi Amarvilas puts you in a Taj-view room and adds the dawn temple-call you'd otherwise wake at 5am for."
Bad:
  ✗ "Pay more for a refined experience" — banned words
  ✗ "Worth the extra spend" — says nothing`;

function fullVoicePrompt({ destinationName, stateName, dossier, asOfDate }) {
  return `Destination: ${destinationName}, ${stateName}. Date stamp: ${asOfDate}.

SLOTS (one pick per slot max; slot may be null if no real property fits):
- experience: iconic/signature/splurge-when-warranted
- value: 70% of experience at 30% of cost
- location: the location wins (walkable, on the water, etc.)
- xfactor: the specific, weird, memorable one

RULES:
1. Pick ONLY from the dossier. Never invent.
2. If a slot has no real answer, set to null. Don't force.
3. Each pick carries 2+ sources from the dossier. Copy them unchanged.
4. upgrade_reasoning compares VALUE to EXPERIENCE in concrete rupee terms (both named, delta, concrete trade-off). If either is null, write a useful alternative sentence.
5. Price bands: exact granular ("₹8-15k/night"), not bucket labels.

DOSSIER:
${JSON.stringify(dossier, null, 2)}

Return ONLY valid JSON:
{
  "destination": "${destinationName}",
  "as_of_date": "${asOfDate}",
  "upgrade_reasoning": "...",
  "destination_note": "...",
  "picks": {
    "experience": { "name": "...", "property_type": "...", "price_band": "...", "why_nakshiq": "...", "signature_experience": "...", "warn": null, "contact_only": false, "contact_info": null, "confidence": 0.9, "sources": [...] },
    "value": {...} or null,
    "location": {...} or null,
    "xfactor": {...} or null
  }
}`;
}

function enrichVoicePrompt({ destinationName, stateName, dossier, existing, asOfDate }) {
  return `Destination: ${destinationName}, ${stateName}. Date stamp: ${asOfDate}.

We already have stay picks. DO NOT rewrite their why_nakshiq copy. Your jobs:
1. Generate destination-level UPGRADE_REASONING.
2. For each existing pick, find a matching property in the dossier and copy its 2+ sources.
3. Flag any existing pick whose copy uses banned words.

EXISTING PICKS:
${JSON.stringify(existing, null, 2)}

DOSSIER:
${JSON.stringify(dossier, null, 2)}

Return ONLY valid JSON:
{
  "destination": "${destinationName}",
  "as_of_date": "${asOfDate}",
  "upgrade_reasoning": "...",
  "enriched_picks": [
    { "slot": "...", "name": "...", "sources": [...], "missing_from_dossier": false, "voice_flags": [] }
  ]
}`;
}

// ===== voice audit =====
function auditCopy(text) {
  if (!text) return { clean: true, flags: [] };
  const flags = [];
  const lowered = text.toLowerCase();
  for (const term of BANNED_WORDS) {
    const pattern = term.includes(" ")
      ? new RegExp(term.replace(/-/g, "\\-"), "i")
      : new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(lowered)) flags.push(term);
  }
  return { clean: flags.length === 0, flags };
}

function auditUpgradeReasoning(text) {
  if (!text) return { clean: false, flags: [], reasonCodes: ["missing"] };
  const reasonCodes = [];
  if (!/(₹|Rs\.?)\s?[\d,]+/i.test(text) && !/\b\d+k\b/i.test(text)) reasonCodes.push("no_rupee_delta");
  const propNames = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}\b/g) ?? [];
  if (new Set(propNames).size < 2) reasonCodes.push("fewer_than_two_properties");
  if (!/\b(walk|view|room|drive|minutes?|access|rate|pool|terrace|garden|courtyard|balcony|suite|breakfast|dinner|boat|taxi|cab|temple|fort|lake|sea|beach|market|bazaar|station|airport|tower|gate)\b/i.test(text)) {
    reasonCodes.push("no_concrete_tradeoff");
  }
  const w = auditCopy(text);
  return { clean: reasonCodes.length === 0 && w.clean, flags: w.flags, reasonCodes };
}

// ===== Anthropic calls =====
async function callAnthropic(payload) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "prompt-caching-2024-07-31",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic ${res.status}: ${t.slice(0, 300)}`);
  }
  return res.json();
}

function extractJson(text) {
  try { return JSON.parse(text); } catch {}
  const m = text.match(/\{[\s\S]*\}/);
  if (m) return JSON.parse(m[0]);
  throw new Error("Non-JSON response from Claude");
}

async function runResearch({ name, state, existingNames }) {
  const prompt = researchPrompt({ name, state, existingNames });
  const resp = await callAnthropic({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
    messages: [{ role: "user", content: prompt }],
  });
  // Collect the final text block from the assistant's reply.
  const blocks = resp.content ?? [];
  const textBlock = [...blocks].reverse().find((b) => b.type === "text");
  if (!textBlock) throw new Error("No text block in research response");
  return extractJson(textBlock.text);
}

async function runVoice({ mode, destinationName, stateName, dossier, existing, asOfDate }) {
  const userPrompt = mode === "full"
    ? fullVoicePrompt({ destinationName, stateName, dossier, asOfDate })
    : enrichVoicePrompt({ destinationName, stateName, dossier, existing, asOfDate });
  const resp = await callAnthropic({
    model: "claude-sonnet-4-6",
    max_tokens: 6000, // bumped from 3000 — full-mode output hits 4-5K when dossier has 6+ properties
    system: [{ type: "text", text: VOICE_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: userPrompt }],
  });
  const blocks = resp.content ?? [];
  const textBlock = [...blocks].reverse().find((b) => b.type === "text");
  if (!textBlock) throw new Error("No text block in voice response");
  const usage = resp.usage ?? {};
  return { result: extractJson(textBlock.text), usage };
}

// ===== per-destination orchestrator =====
function monthYear() {
  return new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
}

async function processDestination(dest) {
  const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
  const existing = existingByDest.get(dest.id) ?? [];
  const hasExisting = existing.length > 0;

  const modeResolved = argv.mode === "auto"
    ? (hasExisting ? "enrich" : "full")
    : argv.mode === "enrich-only" ? "enrich"
    : argv.mode === "full-only" ? "full"
    : argv.mode;

  const asOfDate = monthYear();

  // Step 1: research
  const existingNames = hasExisting ? existing.map((e) => e.name) : [];
  const dossier = await runResearch({ name: dest.name, state: stateName, existingNames });

  // Step 2: voice
  const voice = await runVoice({
    mode: modeResolved,
    destinationName: dest.name,
    stateName,
    dossier,
    existing,
    asOfDate,
  });

  // Step 3: audit
  const upgradeAudit = auditUpgradeReasoning(voice.result.upgrade_reasoning);
  const picksAudit = [];
  if (modeResolved === "full") {
    for (const slot of ["experience", "value", "location", "xfactor"]) {
      const p = voice.result.picks?.[slot];
      if (!p) continue;
      const a = auditCopy(p.why_nakshiq);
      if (!a.clean) picksAudit.push({ slot, flags: a.flags });
    }
  } else {
    for (const ep of voice.result.enriched_picks ?? []) {
      if (ep.voice_flags && ep.voice_flags.length) picksAudit.push({ slot: ep.slot, flags: ep.voice_flags });
    }
  }

  return {
    destination_id: dest.id,
    destination_name: dest.name,
    state: stateName,
    mode: modeResolved,
    as_of_date: asOfDate,
    dossier,
    voice: voice.result,
    audit: {
      upgrade_reasoning: upgradeAudit,
      picks_with_flags: picksAudit,
    },
  };
}

// ===== persistence =====
async function commitResult(out) {
  const { destination_id, voice, as_of_date, mode, audit } = out;

  // 1) Upsert destination-level stay_intelligence
  const stay_intelligence = {
    upgrade_reasoning: voice.upgrade_reasoning ?? null,
    destination_note: voice.destination_note ?? null,
    as_of_date,
    verified_by: "curate-stays",
    audit_issues: audit.upgrade_reasoning.reasonCodes,
  };
  await supabase.from("destinations").update({ stay_intelligence }).eq("id", destination_id);

  // 2) Upsert picks
  if (mode === "full") {
    const rows = [];
    for (const slot of ["experience", "value", "location", "xfactor"]) {
      const p = voice.picks?.[slot];
      if (!p) continue;
      const flagsForSlot = audit.picks_with_flags.find((x) => x.slot === slot)?.flags ?? [];
      rows.push({
        destination_id,
        slot,
        name: String(p.name).slice(0, 200),
        property_type: p.property_type ? String(p.property_type).slice(0, 60) : null,
        price_band: p.price_band ? String(p.price_band).slice(0, 40) : null,
        why_nakshiq: String(p.why_nakshiq || "").slice(0, 500),
        signature_experience: p.signature_experience ? String(p.signature_experience).slice(0, 400) : null,
        sources: p.sources ?? [],
        contact_only: !!p.contact_only,
        contact_info: p.contact_info ?? null,
        voice_flags: flagsForSlot,
        source: "web_search",
        confidence: Math.max(0, Math.min(1, Number(p.confidence) || 0.7)),
        published: (flagsForSlot.length === 0) && ((Number(p.confidence) || 0.7) >= 0.6) && (Array.isArray(p.sources) && p.sources.length >= 2),
        refreshed_at: new Date().toISOString(),
      });
    }
    if (rows.length) {
      await supabase.from("destination_stay_picks").upsert(rows, { onConflict: "destination_id,slot" });
    }
  } else {
    // enrich mode — update sources + voice_flags only
    for (const ep of voice.enriched_picks ?? []) {
      if (!ep.slot || !ep.name) continue;
      const patch = {
        sources: ep.sources ?? [],
        voice_flags: ep.voice_flags ?? [],
        refreshed_at: new Date().toISOString(),
      };
      await supabase.from("destination_stay_picks")
        .update(patch)
        .eq("destination_id", destination_id)
        .eq("slot", ep.slot);
    }
  }
}

// ===== concurrency =====
async function runPool(items, fn, concurrency) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      const item = items[i];
      try {
        process.stdout.write(`  [${(i + 1).toString().padStart(3, " ")}/${items.length}] ${item.id.padEnd(28)} `);
        const out = await fn(item);
        results.push({ ok: true, out });
        const flagNote = out.audit.upgrade_reasoning.clean ? "" : ` · upgrade flags: ${out.audit.upgrade_reasoning.reasonCodes.join(",")}`;
        const picksFlag = out.audit.picks_with_flags.length ? ` · ${out.audit.picks_with_flags.length} pick(s) flagged` : "";
        console.log(`✓ ${out.mode}${flagNote}${picksFlag}`);
      } catch (err) {
        results.push({ ok: false, item, error: err.message });
        console.log(`✗ ${err.message.slice(0, 100)}`);
      }
    }
  }
  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);
  return results;
}

// ===== run =====
const results = await runPool(destinations, processDestination, argv.concurrency);

const okResults = results.filter((r) => r.ok).map((r) => r.out);
const failResults = results.filter((r) => !r.ok);

// ===== output =====
if (argv.dryRun) {
  const outDir = "/tmp/nakshiq-curate";
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const stateSlug = argv.state || "mixed";
  const outPath = `${outDir}/${stateSlug}-${stamp}.json`;
  writeFileSync(outPath, JSON.stringify({ argv, results: okResults, failures: failResults }, null, 2));
  console.log(`\nDRY RUN complete. Output written to: ${outPath}`);
  console.log(`Review, iterate prompts if needed, then re-run with --commit.`);
} else {
  console.log(`\nCommitting ${okResults.length} results to DB...`);
  for (const r of okResults) {
    await commitResult(r);
  }
  console.log(`Done. Check /en/admin/stay-picks for low-confidence / voice-flagged rows.`);
}

// ===== summary =====
const totals = { ok: okResults.length, fail: failResults.length };
const upgradeIssues = okResults.filter((r) => !r.audit.upgrade_reasoning.clean).length;
const picksFlagged = okResults.filter((r) => r.audit.picks_with_flags.length > 0).length;
console.log(`\nSummary: ${totals.ok} ok, ${totals.fail} failed`);
console.log(`Upgrade_reasoning needing review: ${upgradeIssues}`);
console.log(`Destinations with voice-flagged picks: ${picksFlagged}`);
if (failResults.length) {
  console.log(`\nFailures:`);
  for (const f of failResults) console.log(`  ${f.item.id} — ${f.error}`);
}
