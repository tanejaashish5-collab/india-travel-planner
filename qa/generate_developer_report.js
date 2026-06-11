#!/usr/bin/env node
// qa/generate_developer_report.js
// Thin wrapper — delegates to qa/_lib/build_report.js with persona='developer'.
const { buildAndWrite } = require('./_lib/build_report.js');
buildAndWrite('developer').then(r => {
  if (!r.ok) { console.error(`FAIL: output ${r.outPath} is only ${r.size} bytes (<10KB threshold)`); process.exit(1); }
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
