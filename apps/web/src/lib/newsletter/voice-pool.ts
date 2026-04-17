// Curated micro-copy pool — preserves NakshIQ voice across automated sends.
// Lines are deterministically rotated by ISO week number so each issue
// feels composed, not random. Replace/edit these as brand voice evolves.

export const OPENINGS: string[] = [
  "One good week, one overrated place to skip, and a road update most travel sites won't tell you about.",
  "Sunday morning. Somewhere in India the weather just broke open. Here's where it's actually worth going.",
  "We scored every destination this week. Here's the one worth your weekend — and the one worth your no.",
  "The monsoon's moved. The scores have shifted. This is what the data says about right now.",
  "A good trip is 80% timing. Here's what's in season, and what to ignore no matter what Instagram says.",
  "Honest week. Fewer tourists than you think, better weather than most people know. Let's go.",
  "This week: one place scoring 5/5, one place you should actively avoid, one road that just opened.",
  "If you had one weekend to go somewhere in India right now, this is where the data points.",
  "Clear skies somewhere. Landslides somewhere else. The week's intelligence, filtered.",
  "The Window — four things that changed in the last seven days, and why one of them matters for your next trip.",
];

export const CLOSINGS: string[] = [
  "Go with confidence.",
  "See you Sunday.",
  "Reply and tell us where you went.",
  "Safe travels, short lines.",
  "Read the note, trust the score.",
  "One more week of signal. Until next Sunday.",
  "Honest data, honest trips. That's the deal.",
  "Plan with the data. Travel with the gut.",
];

// Deterministic week rotation — same week of year = same line within a rotation cycle.
export function pickOpening(issueNumber: number): string {
  return OPENINGS[issueNumber % OPENINGS.length];
}

export function pickClosing(issueNumber: number): string {
  return CLOSINGS[issueNumber % CLOSINGS.length];
}
