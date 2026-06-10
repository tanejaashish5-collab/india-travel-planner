#!/usr/bin/env node
/**
 * READ-ONLY generator for the confidence_cards free-text phone purge (2026-06-10).
 *
 * confidence_cards.emergency (helpline/nearest_hospital/police_station/rescue/ambulance)
 * and .people_who_help embed phone numbers as PROSE. An adversarial 2-pass
 * verification (workflow wf_dfe24959-27f) + direct .gov.in fetches found this field
 * fabricated at the SAME ~80% rate as the deep_dive/emergency_sos fields the earlier
 * SOS arc purged — but it was never inspected (the SOS audit wrongly assumed
 * confidence_cards carried "websites, not phones").
 *
 * This script READS confidence_cards (no writes), applies the adjudicated
 * keep/correct/drop table below, does precise in-prose surgery, and emits:
 *   - data/audits/cc-phone-fabrication-purge-2026-06-10.md   (every before->after)
 *   - data/sos/cc-phone-purge-2026-06-10.sql                  (UPDATE statements, for MCP)
 * It does NOT touch the DB. Apply the SQL via Supabase MCP execute_sql only after
 * the founder says "go" (confirm-gate).
 *
 * Run: node --env-file=apps/web/.env.local scripts/_gen-cc-phone-purge-2026-06-10.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "node:fs";

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\\n|\s/g, "").trim();
const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").replace(/\s/g, "").trim();
if (!url || !key) { console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });

const norm = (s) => (s || "").replace(/[^0-9]/g, "");

// ── Adjudicated master table (keyed by normalized digits) ────────────────────
// CORRECT: stored fabricated/wrong number -> double-verified official replacement.
const CORRECT = new Map(Object.entries({
  "01892224213": { to: "01892-224430", who: "Tourist Information Centre Dharamshala", src: "hpkangra.nic.in" },
  "01892224473": { to: "01892-224874", who: "Zonal Hospital Dharamshala", src: "hpkangra.nic.in" },
  "01892224400": { to: "01892-224883", who: "Dharamshala Police Station", src: "hpkangra.nic.in" },
  "01932222328": { to: "01932-222337", who: "DC Anantnag", src: "anantnag.nic.in" },
  "01985232228": { to: "01985-232216", who: "DC Kargil", src: "kargil.nic.in" },
  "05962230100": { to: "05962-230323", who: "Almora Kotwali", src: "almora.nic.in" },
  "06122225295": { to: "0612-2217045", who: "Bihar Tourism", src: "tourism.bihar.gov.in" },
  "06512401693": { to: "0651-2331828", who: "Jharkhand Tourism (JTDC)", src: "tourism.jharkhand.gov.in" },
  "06512400073": { to: "0651-2331828", who: "Jharkhand Tourism (JTDC)", src: "tourism.jharkhand.gov.in" },
  "07714066415": { to: "0771-4224600", who: "Chhattisgarh Tourism Board", src: "tourism.cgstate.gov.in" },
  "18005990019": { to: "1800-267-1975", who: "Maharashtra Tourism (MTDC)", src: "maharashtratourism.gov.in" },
  "18002005252": { to: "1800-203-1111", who: "Gujarat Tourism", src: "tourism.gujarat.gov.in" },
  "03192245530": { to: "03192-242948", who: "Indian Coast Guard MRCC Port Blair", src: "indiancoastguard.gov.in" },
  "04369222233": { to: "04368-225100", who: "Karaikal Police Control Room", src: "karaikal.gov.in" },
  "02602642222": { to: "0260-2642033", who: "Silvassa/Daman Police", src: "ddd.gov.in" },
  "03702290142": { to: "0370-2243124", who: "Nagaland Tourism", src: "tourism.nagaland.gov.in" },
  "01942452690": { to: "0194-2502274", who: "J&K Tourism (JKTDC)", src: "jktdc.co.in (direct-fetch confirmed)" },
  "06512545100": { to: "0651-2541533", who: "RIMS Ranchi", src: "rimsranchi.org (direct-fetch confirmed)" },
  "05652500800": { to: "9454403943", who: "Mathura Kotwali", src: "mathura.nic.in (direct-fetch confirmed)" },
}));

// DROP: fabricated/unverifiable/aggregator-only -> remove the number from the prose.
const DROP = new Map(Object.entries({
  "01772625956": "HP Tourism (unverifiable; official exchange differs)",
  "01900222201": "DC Lahaul-Spiti (real DC office is 01900-222501)",
  "01900202509": "Lahaul-Spiti disaster cell (no official source)",
  "01905222652": "DC Mandi (real DC office is 01905-225201)",
  "01902265355": "Kullu/Parvati helpline (fabricated; real HPTDC Kullu 01902-222349)",
  "01899224002": "Chamba TIC (aggregator-only, below official bar)",
  "01899222261": "Civil Hospital Chamba (unverifiable; CMO is 222325/224495)",
  "01899222244": "Chamba Police Station (unverifiable)",
  "01899242136": "Dalhousie helpline (unverifiable)",
  "01899242126": "Dalhousie Police Station (aggregator-only)",
  "01352632040": "Mussoorie Government Hospital (unverifiable)",
  "01352632083": "Mussoorie Police Station (unverifiable; official 2632100/2630101)",
  "05962230252": "District Hospital Almora (unverifiable; official 230084/232540)",
  "05962230440": "KMVN Binsar (unverifiable)",
  "01372251437": "Chamoli SDRF (unverifiable; official disaster line differs, use 1077)",
  "01374222094": "Uttarkashi SDRF (unverifiable; official 226126/222102, use 1077)",
  "01472240253": "MB Government Hospital Chittorgarh (unverifiable; official 241102)",
  "01472240100": "Chittorgarh Kotwali (unverifiable)",
  "05644222262": "RBM Hospital Bharatpur (aggregator-only correction; below bar)",
  "05644222200": "Bharatpur Kotwali (aggregator-only correction; below bar)",
  "01722702164": "Punjab Tourism Patiala (unverifiable)",
  "01722740569": "Punjab Tourism Amritsar (unverifiable)",
  "01642211500": "Punjab Police CR Damdama (unverifiable; Damdama is Sangrur not Bathinda)",
  "05652500761": "District Hospital Mathura (PDF-only mobile; not double-confirmed)",
  "05872252106": "Dudhwa Tiger Reserve (unverifiable)",
  "18001801111": "'UP tourist helpline' is actually the PM Mudra Yojana line (misattributed)",
  "01955252032": "DC Kupwara (correction not reproducible on official site)",
  "03192232012": "GB Pant Hospital Port Blair (unverifiable; official 233665/246058)",
  "03192234123": "Port Blair Police Control Room (unverifiable; keep 100)",
  "04132336025": "Puducherry Police HQ (unverifiable; official 0413-2244964)",
  "18004251111": "Puducherry Tourist Police (unverifiable; official local 0413-2339999)",
  "01415110598": "Rajasthan Tourism (known fabricated — prior SOS audit)",
  "01772625348": "HP Tourism Helpline (known fabricated — prior SOS audit)",
  "18001801116": "Punjab Tourism Helpline (weak/circular — prior SOS audit)",
  "18003453006": "Sikkim Tourism Helpline (weak/circular — prior SOS audit)",
}));

// KEEP: double-verified real (no change). Listed for completeness/flagging only.
const KEEP = new Set([
  "01352559898","01982252010","911982252010","05222308916","01722702955","03612547102",
  "18002337777","01902265320","01772652561","01982252297","05942235424","05947251489",
  "07552774340","03192232694","04132296000","04896262258",
]);

const PHONE = /\+?\d[\d\- ]{4,}\d/g;       // 6+ digit token w/ internal - or space (not parens)
// subkeys that are number-only concepts — a helpline/rescue/ambulance with no number is useless -> delete.
// nearest_hospital / police_station are physically-locatable real places -> keep the name even w/o a number.
const LABEL_ONLY = new Set(["helpline", "rescue", "ambulance"]);
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function tidy(s) {
  let p = s;
  for (let i = 0; i < 5; i++) {
    p = p
      .replace(/\(\s*\/\s*/g, "(").replace(/\s*\/\s*\)/g, ")")
      .replace(/\(\s*\)/g, "").replace(/\[\s*\]/g, "")
      .replace(/\(\s*,\s*/g, "(").replace(/,\s*\)/g, ")")
      .replace(/\s{2,}/g, " ")
      .replace(/\s+([.)\]])/g, "$1")
      .replace(/[:：]\s*\.?\s*$/g, "")               // dangling trailing colon (+ optional period): "SDRF:." -> "SDRF"
      .replace(/\s*\/\s*$/g, "").replace(/^\s*\/\s*/g, "")
      .replace(/[\s,;:.–—-]+$/g, "")                 // trailing separators/period/colon/dash
      .replace(/^[\s,;:/–—-]+/g, "")
      .trim();
  }
  return p;
}

const hasNumber = (s) => /\d{3}/.test(s);          // a callable digit-run (incl short codes 100/1554/1363)
const hasName = (s) => /[A-Za-z]{2,}/.test(s);

// Transform one prose string; returns { value|null (null=delete), action, tokens[] }
function transformValue(subkey, value) {
  if (!value || typeof value !== "string") return { value, action: "none", tokens: [] };
  if (/X{3,}/.test(value)) return { value, action: "placeholder", tokens: [] }; // redacted host mobile
  const tokens = value.match(PHONE) || [];
  if (tokens.length === 0) return { value, action: "none", tokens: [] };

  let out = value;
  const acted = [];
  let unknown = false;
  for (const tok of tokens) {
    const d = norm(tok);
    if (d.length < 10) continue;   // <10 digits = price range / ID (e.g. "₹500-800/day"), not an Indian phone
    if (CORRECT.has(d)) { out = out.split(tok).join(CORRECT.get(d).to); acted.push(["correct", d]); }
    else if (DROP.has(d)) {
      // remove the number AND an immediately-preceding "Label:" within the same segment
      // (a label introducing a now-absent number is dangling) — but leave a parenthetical NAME "(num)".
      const withLabel = new RegExp("(?:[^.,;:()\\[\\]]{1,40}:\\s*)?" + escRe(tok));
      out = out.replace(withLabel, "");
      acted.push(["drop", d]);
    }
    else if (KEEP.has(d)) { acted.push(["keep", d]); }
    else { unknown = true; acted.push(["UNKNOWN", d]); }
  }
  out = tidy(out);

  if (acted.every(([a]) => a === "keep")) return { value, action: "none", tokens: acted };
  if (unknown) return { value, action: "UNKNOWN", tokens: acted }; // never silently touch an unmapped number

  const dropped = acted.some(([a]) => a === "drop");
  if (!hasNumber(out)) {
    // no callable number remains
    if (LABEL_ONLY.has(subkey) || !hasName(out)) return { value: null, action: "delete-subkey", tokens: acted };
    return { value: out, action: "keep-name", tokens: acted };       // name-bearing field: keep real name
  }
  return { value: out, action: dropped ? "strip-fake" : "correct", tokens: acted };
}

// ── Run ──────────────────────────────────────────────────────────────────────
const { data, error } = await sb
  .from("confidence_cards")
  .select("destination_id, emergency, people_who_help");
if (error) { console.error(error); process.exit(1); }

const changes = [];          // { dest, field, subkey, before, after|null, action }
const updates = new Map();   // dest -> { emergency?, people_who_help? }
let unknownFlags = [];

for (const row of data) {
  const dest = row.destination_id;
  let emChanged = false, pwhChanged = false;
  // emergency (object of subkey -> string)
  const em = row.emergency && typeof row.emergency === "object" && !Array.isArray(row.emergency)
    ? { ...row.emergency } : null;
  if (em) {
    for (const k of Object.keys(em)) {
      const r = transformValue(k, em[k]);
      if (r.action === "UNKNOWN") unknownFlags.push({ dest, field: "emergency", subkey: k, value: em[k], tokens: r.tokens });
      if (r.action === "none" || r.action === "placeholder" || r.action === "UNKNOWN") continue;
      changes.push({ dest, field: "emergency", subkey: k, before: em[k], after: r.value, action: r.action });
      if (r.value === null) delete em[k]; else em[k] = r.value;
      emChanged = true;
    }
  }
  // people_who_help (array of {name,role,contact,note} OR object subkey->string)
  let pwh = row.people_who_help;
  if (Array.isArray(pwh)) {
    pwh = pwh.map((el) => {
      if (el && typeof el === "object" && typeof el.contact === "string") {
        const r = transformValue("contact", el.contact);
        if (r.action === "UNKNOWN") unknownFlags.push({ dest, field: "people_who_help[]", subkey: el.name, value: el.contact, tokens: r.tokens });
        if (["correct", "strip-fake", "keep-name", "delete-subkey"].includes(r.action)) {
          changes.push({ dest, field: "people_who_help", subkey: el.name, before: el.contact, after: r.value === null ? "" : r.value, action: r.action });
          pwhChanged = true;
          return { ...el, contact: r.value === null ? "" : r.value };
        }
      }
      return el;
    });
  } else if (pwh && typeof pwh === "object") {
    const o = { ...pwh };
    for (const k of Object.keys(o)) {
      if (typeof o[k] !== "string") continue;
      const r = transformValue("helpline", o[k]); // object-shape values are helpline-style labels
      if (r.action === "UNKNOWN") unknownFlags.push({ dest, field: "people_who_help{}", subkey: k, value: o[k], tokens: r.tokens });
      if (r.action === "none" || r.action === "placeholder" || r.action === "UNKNOWN") continue;
      changes.push({ dest, field: "people_who_help", subkey: k, before: o[k], after: r.value, action: r.action });
      if (r.value === null) delete o[k]; else o[k] = r.value;
      pwhChanged = true;
    }
    pwh = Object.keys(o).length ? o : [];   // empty object -> clean [] (matches TS array type, renders nothing)
  }

  if (emChanged || pwhChanged) {
    updates.set(dest, {
      ...(emChanged ? { emergency: em } : {}),
      ...(pwhChanged ? { people_who_help: pwh } : {}),
    });
  }
}

// ── Emit audit + SQL ─────────────────────────────────────────────────────────
const byAction = {};
for (const c of changes) byAction[c.action] = (byAction[c.action] || 0) + 1;
const distinct = new Set(changes.map((c) => norm(c.before).match(/.{6,}/) ? norm(c.before) : c.before));

let md = `# confidence_cards free-text phone fabrication purge — 2026-06-10\n\n`;
md += `Generated by scripts/_gen-cc-phone-purge-2026-06-10.mjs (READ-ONLY). Apply SQL via MCP only after founder "go".\n\n`;
md += `Verification: workflow wf_dfe24959-27f (17 agents, adversarial 2-pass, official .gov.in/agency bar) + direct .gov.in fetches for 6 conflict cases.\n\n`;
md += `## Summary\n- Rows (dests) changed: **${updates.size}**\n- Field edits: **${changes.length}** (${Object.entries(byAction).map(([a, n]) => `${a}: ${n}`).join(", ")})\n`;
md += `- CORRECT numbers: ${CORRECT.size} distinct · DROP numbers: ${DROP.size} distinct · KEEP (untouched): ${KEEP.size} distinct\n`;
md += `- UNKNOWN/unmapped numbers encountered: **${unknownFlags.length}** ${unknownFlags.length ? "⚠️ REVIEW" : "(none — full coverage)"}\n\n`;
if (unknownFlags.length) {
  md += `### ⚠️ UNKNOWN numbers (NOT touched — adjudicate before applying)\n`;
  for (const u of unknownFlags) md += `- ${u.dest} · ${u.field}.${u.subkey}: "${u.value}" (${JSON.stringify(u.tokens)})\n`;
  md += `\n`;
}
md += `## Every change (before → after)\n\n`;
const order = ["delete-subkey", "strip-fake", "keep-name", "correct"];
for (const act of order) {
  const rows = changes.filter((c) => c.action === act);
  if (!rows.length) continue;
  md += `### ${act} (${rows.length})\n`;
  for (const c of rows.sort((a, b) => a.dest.localeCompare(b.dest))) {
    md += `- **${c.dest}** · ${c.field}.${c.subkey}\n  - before: \`${c.before}\`\n  - after:  ${c.after === null ? "_(subkey removed)_" : "`" + c.after + "`"}\n`;
  }
  md += `\n`;
}
writeFileSync("data/audits/cc-phone-fabrication-purge-2026-06-10.md", md);

const esc = (o) => JSON.stringify(o).replace(/'/g, "''");
let sql = `-- confidence_cards free-text phone purge — 2026-06-10 (apply via MCP execute_sql after founder "go")\n`;
sql += `-- ${updates.size} dests changed. Generated read-only; verified vs official .gov.in/agency sources.\n\n`;
for (const [dest, u] of [...updates.entries()].sort()) {
  const sets = [];
  if (u.emergency !== undefined) sets.push(`emergency = '${esc(u.emergency)}'::jsonb`);
  if (u.people_who_help !== undefined) sets.push(`people_who_help = '${esc(u.people_who_help)}'::jsonb`);
  sql += `UPDATE confidence_cards SET ${sets.join(", ")} WHERE destination_id = '${dest}';\n`;
}
writeFileSync("data/sos/cc-phone-purge-2026-06-10.sql", sql);

console.log(`dests changed: ${updates.size}`);
console.log(`field edits: ${changes.length} ->`, byAction);
console.log(`UNKNOWN flags: ${unknownFlags.length}`, unknownFlags.map((u) => `${u.dest}/${u.subkey}`));
console.log(`wrote data/audits/cc-phone-fabrication-purge-2026-06-10.md + data/sos/cc-phone-purge-2026-06-10.sql`);
