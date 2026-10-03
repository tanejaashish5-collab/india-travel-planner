import type { On } from 'claude-code'
import { test, expect } from 'claude-code/testing'

// The test's own tool.call hooks sit beneath the plugin and stand in for the
// engine: they answer with a marker deny, so a call that reaches them was
// let through by nakshiq-guard, and nothing actually runs.
const REACHED = 'reached-engine'
const stubEngine = (on: On) => {
  for (const tool of ['Bash', 'Edit', 'Write'] as const)
    on('tool.call', { tool }, () => ({ deny: REACHED }))
}

const outcome = (r: { text?: string; deny?: string }) => {
  const msg = r.deny ?? r.text ?? ''
  return msg.includes(REACHED) ? 'allowed' : msg.includes('nakshiq-guard') ? 'denied' : `other: ${msg}`
}

test('blocks staging everything, allows path-scoped adds', async ($, on) => {
  stubEngine(on)
  for (const command of ['git add -A', 'git add .', 'git add --all && git commit -m x', 'cd apps/web && git add -A'])
    expect(outcome(await $.tool.call({ tool: 'Bash', command }))).toBe('denied')
  for (const command of ['git add scripts/generate-blog-draft.mjs', 'git add -p apps/web/src/messages/en.json', 'echo "never git add -A"', 'git status'])
    expect(outcome(await $.tool.call({ tool: 'Bash', command }))).toBe('allowed')
})

test('blocks running curate-stays.mjs but not reading it', async ($, on) => {
  stubEngine(on)
  expect(outcome(await $.tool.call({ tool: 'Bash', command: 'node --env-file=apps/web/.env.local scripts/curate-stays.mjs --dest manali' }))).toBe('denied')
  expect(outcome(await $.tool.call({ tool: 'Bash', command: 'grep -n model scripts/curate-stays.mjs' }))).toBe('allowed')
})

test('blocks bare reference-list reads in pages/routes only', async ($, on) => {
  stubEngine(on)
  const listRead = 'const { data } = await supabase.from("destinations").select("id, name");'
  const singleRow = 'const { data } = await supabase.from("destinations").select("*").eq("id", id).single();'
  const page = '/repo/apps/web/src/app/[locale]/destination/[id]/page.tsx'
  expect(outcome(await $.tool.call({ tool: 'Write', file_path: page, content: listRead }))).toBe('denied')
  expect(outcome(await $.tool.call({ tool: 'Edit', file_path: page, old_string: 'x', new_string: listRead }))).toBe('denied')
  expect(outcome(await $.tool.call({ tool: 'Edit', file_path: page, old_string: 'x', new_string: singleRow }))).toBe('allowed')
  expect(outcome(await $.tool.call({ tool: 'Write', file_path: '/repo/apps/web/src/lib/cached-data.ts', content: listRead }))).toBe('allowed')
  expect(outcome(await $.tool.call({ tool: 'Write', file_path: '/repo/scripts/backfill.mjs', content: listRead }))).toBe('allowed')
})
