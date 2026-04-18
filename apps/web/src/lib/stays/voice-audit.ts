/**
 * Post-generation audit for Claude-produced stay copy.
 *
 * Two checks:
 *  1. Banned-word regex — flags hype language (curated, elevated, etc.)
 *  2. Upgrade-reasoning shape — must name ≥2 properties, a rupee delta, and a concrete trade-off
 *
 * Output drives the `voice_flags` column and the admin review queue.
 */

export const BANNED_WORDS: readonly string[] = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "bucket list",
  "breathtaking", "magical", "incredible", "authentic", "curated",
  "elevated", "immersive", "luxurious", "opulent", "exquisite",
  "pristine", "paradise",
  // deliberately keep "flagship" OUT — it's legitimate in some hotel contexts
  // ("chain's flagship property") — audit focuses on voice not vocabulary police
];

export interface VoiceAuditResult {
  clean: boolean;
  flags: string[];            // banned words found, lowercased
  reasonCodes: string[];      // shape-test failures
}

/**
 * Check copy (why_nakshiq, signature_experience, destination_note, etc.) for
 * banned words. Case-insensitive whole-word-ish match (handles hyphens).
 */
export function auditCopy(text: string | null | undefined): VoiceAuditResult {
  if (!text) return { clean: true, flags: [], reasonCodes: [] };

  const lowered = text.toLowerCase();
  const flags: string[] = [];

  for (const term of BANNED_WORDS) {
    // match on word boundary for single words; substring for multi-word phrases
    const pattern = term.includes(" ")
      ? new RegExp(term.replace(/-/g, "\\-"), "i")
      : new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(lowered)) flags.push(term);
  }

  return {
    clean: flags.length === 0,
    flags,
    reasonCodes: [],
  };
}

/**
 * Check that upgrade_reasoning meets shape requirements:
 *   - mentions a rupee amount (₹X or Rs X or `Rs.` or digit+k)
 *   - looks like it names at least two properties (heuristic: 2+ capitalised multi-word tokens)
 *   - contains a trade-off noun from an allow-list (walk, view, room, drive, minutes, access, rate, pool, terrace, etc.)
 *
 * Returns clean=false with reasonCodes when any check fails.
 */
export function auditUpgradeReasoning(text: string | null | undefined): VoiceAuditResult {
  if (!text) {
    return { clean: false, flags: [], reasonCodes: ["missing"] };
  }

  const reasonCodes: string[] = [];

  // 1) Must mention a rupee amount
  const hasRupee = /(₹|Rs\.?)\s?[\d,]+/i.test(text) || /\b\d+k\b/i.test(text);
  if (!hasRupee) reasonCodes.push("no_rupee_delta");

  // 2) Heuristic: must name 2+ properties.
  // Look for sequences of 2+ capitalised words (e.g. "Jagat Niwas Palace")
  const propertyNameHits = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}\b/g) ?? [];
  // Filter out sentence-start false positives: if the first hit is at position 0, discount it
  const uniqueHits = new Set(propertyNameHits);
  if (uniqueHits.size < 2) reasonCodes.push("fewer_than_two_properties");

  // 3) Concrete trade-off noun
  const tradeOffRegex = /\b(walk|view|room|drive|minutes?|access|rate|pool|terrace|garden|courtyard|balcony|suite|breakfast|dinner|boat|taxi|cab|temple|fort|lake|sea|beach|market|bazaar|station|airport|tower|gate)\b/i;
  if (!tradeOffRegex.test(text)) reasonCodes.push("no_concrete_tradeoff");

  // 4) Also run banned-words pass
  const wordAudit = auditCopy(text);

  return {
    clean: reasonCodes.length === 0 && wordAudit.flags.length === 0,
    flags: wordAudit.flags,
    reasonCodes,
  };
}

/**
 * Combine auditCopy + auditUpgradeReasoning results for a destination
 * into one voice_flags JSON array for persisting.
 */
export interface AggregatedVoiceFlags {
  banned_words: string[];                                    // distinct banned words across all picks
  picks_with_flags: Array<{ slot: string; flags: string[] }>; // per-pick flag attribution
  upgrade_reasoning_issues: string[];                        // shape-test failures on destination-level field
}

export function aggregateFlags(
  perPick: Array<{ slot: string; result: VoiceAuditResult }>,
  upgradeResult: VoiceAuditResult
): AggregatedVoiceFlags {
  const bannedWordSet = new Set<string>();
  const picksWithFlags: Array<{ slot: string; flags: string[] }> = [];

  for (const p of perPick) {
    if (!p.result.clean) {
      picksWithFlags.push({ slot: p.slot, flags: p.result.flags });
      p.result.flags.forEach((f) => bannedWordSet.add(f));
    }
  }
  upgradeResult.flags.forEach((f) => bannedWordSet.add(f));

  return {
    banned_words: Array.from(bannedWordSet),
    picks_with_flags: picksWithFlags,
    upgrade_reasoning_issues: upgradeResult.reasonCodes,
  };
}
