import { readFileSync, writeFileSync } from "node:fs";
const empty = JSON.parse(readFileSync("/tmp/empty-slots-to-fill.json", "utf-8"));
const audit = JSON.parse(readFileSync("/tmp/audit-results.json", "utf-8"));
const keeps = audit.filter(r => r.verdict === "KEEP");

const out = {
  task_a_replacements: empty.map(d => ({
    destination_id: d.destination_id,
    destination_name: d.destination_name,
    state_id: d.state_id,
    region: d.region,
    empty_slots: d.empty_slots,
    already_filled: d.filled_slots.map(p => `[${p.slot}] ${p.name}`),
  })),
  task_b_enrichments: keeps.map(r => ({
    destination_id: r.destination_id,
    slot: r.slot,
    name: r.name,
    evidence_url: r.evidence_url,
  })),
};
writeFileSync("/tmp/agent-input.json", JSON.stringify(out, null, 2));
console.log(`Task A: ${out.task_a_replacements.length} dests, ${out.task_a_replacements.reduce((s,d)=>s+d.empty_slots.length,0)} slots`);
console.log(`Task B: ${out.task_b_enrichments.length} picks needing 2+ sources`);
