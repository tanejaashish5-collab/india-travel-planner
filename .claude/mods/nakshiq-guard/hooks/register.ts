import type { Register } from 'claude-code'

// Each rule here mirrors a CLAUDE.md "never" rule; the deny text says where
// to go instead so the model can recover in the same turn.

// Split on shell separators so a pattern only fires where a command starts,
// not when it is quoted inside an argument (same approach as loop-guard.mjs).
const segments = (cmd: string) =>
  cmd.split(/&&|\|\||[;\n|]|\$\(|`/).map(s => s.trim()).filter(Boolean)

const STAGE_ALL = /^git\s+(?:-C\s+\S+\s+)?add\s+(?:.*\s)?(?:-A|--all|\.|:\/)(?:\s|$)/
const CURATE_STAYS = /^(?:\S*=\S*\s+)*node\b.*\bcurate-stays\.mjs\b/

// A list read of a reference table. Single-row lookups (.single/.maybeSingle)
// are fine; anything else belongs in lib/cached-data.ts.
const REF_LIST_READ = /\.from\(\s*["'`](destinations|collections|states)["'`]\s*\)/
const SINGLE_ROW = /\.(single|maybeSingle)\(\s*\)/
const PAGE_OR_ROUTE = /apps\/web\/src\/app\//

const denyReason = {
  bash(command: string): string | undefined {
    for (const seg of segments(command)) {
      if (STAGE_ALL.test(seg))
        return 'Commit path-scoped: stage the files you changed by name (CLAUDE.md "never git add -A"). Audit sessions use bash scripts/audit-commit-guard.sh -m "<msg>" <paths…>.'
      if (CURATE_STAYS.test(seg))
        return 'curate-stays.mjs calls a metered API and is retired (CLAUDE.md). Research stays via WebFetch/WebSearch agents instead.'
    }
    return undefined
  },
  write(filePath: string, text: string): string | undefined {
    if (!PAGE_OR_ROUTE.test(filePath)) return undefined
    const m = REF_LIST_READ.exec(text)
    if (!m || SINGLE_ROW.test(text)) return undefined
    return `Reference lists are read only through apps/web/src/lib/cached-data.ts (CLAUDE.md "Supabase load"). Replace the bare supabase.from("${m[1]}") list read with the cached-data helper.`
  },
}

export const register: Register = on => {
  on('tool.call', { tool: 'Bash' }, ($, e, next) => {
    const reason = denyReason.bash(e.command)
    return reason ? { deny: `${$.plugin.name}: ${reason}` } : next(e)
  })

  on('tool.call', { tool: 'Edit' }, ($, e, next) => {
    const reason = denyReason.write(e.file_path, e.new_string)
    return reason ? { deny: `${$.plugin.name}: ${reason}` } : next(e)
  })

  on('tool.call', { tool: 'Write' }, ($, e, next) => {
    const reason = denyReason.write(e.file_path, e.content)
    return reason ? { deny: `${$.plugin.name}: ${reason}` } : next(e)
  })
}
