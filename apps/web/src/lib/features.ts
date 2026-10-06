// Feature switches. Flip a value and redeploy; nothing else needs to change.
//
// aiPlanner (off 2026-10-06, founder): the /plan "AI Trip Planner" and every
// link to it are hidden; /plan redirects to Where to Go this month. It already
// ran with zero metered AI (scripts/check-no-metered-ai.mjs), but anyone who
// wants AI planning has their own assistant. Turn back on if that changes.
export const FEATURES = {
  aiPlanner: false,
} as const;
