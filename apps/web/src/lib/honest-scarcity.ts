export const HONEST_SCARCITY_SLOTS = ['eateries', 'stays', 'gems'] as const;
export type HonestScarcitySlot = (typeof HONEST_SCARCITY_SLOTS)[number];

export const HONEST_SCARCITY_CATEGORIES = [
  'np_core',
  'military_or_restricted',
  'sub_5k_tribal',
  'uninhabited_island',
  'high_altitude_pass',
] as const;
export type HonestScarcityCategory = (typeof HONEST_SCARCITY_CATEGORIES)[number];

export type HonestScarcitySpecifics = {
  base_town?: string;
  base_distance_km?: number;
  note?: string;
};

export type HonestScarcitySlotEntry = {
  confirmed: true;
  category: HonestScarcityCategory;
  specifics: HonestScarcitySpecifics;
};

export type HonestScarcity = Partial<Record<HonestScarcitySlot, HonestScarcitySlotEntry>>;

export function isHonestScarcityConfirmed(
  honest_scarcity: HonestScarcity | null | undefined,
  slot: HonestScarcitySlot,
): boolean {
  return honest_scarcity?.[slot]?.confirmed === true;
}

export function getHonestScarcitySlot(
  honest_scarcity: HonestScarcity | null | undefined,
  slot: HonestScarcitySlot,
): HonestScarcitySlotEntry | null {
  const entry = honest_scarcity?.[slot];
  return entry?.confirmed ? entry : null;
}

export function isHsBTier(
  honest_scarcity: HonestScarcity | null | undefined,
  missingSlots: HonestScarcitySlot[],
): boolean {
  if (missingSlots.length === 0) return false;
  return missingSlots.every((slot) => isHonestScarcityConfirmed(honest_scarcity, slot));
}
