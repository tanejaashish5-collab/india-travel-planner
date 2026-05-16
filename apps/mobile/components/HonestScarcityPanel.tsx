import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

// Slot keys + categories mirror apps/web/src/lib/honest-scarcity.ts. Mobile has
// no i18n today, so copy is inlined in English; when i18n lands, replace with
// useTranslation lookups against the same keys as web (scarcity.<slot>.<category>).

export type HonestScarcitySlot = "eateries" | "stays" | "gems";
export type HonestScarcityCategory =
  | "np_core"
  | "military_or_restricted"
  | "sub_5k_tribal"
  | "uninhabited_island"
  | "high_altitude_pass";

export type HonestScarcityEntry = {
  confirmed: true;
  category: HonestScarcityCategory;
  specifics: {
    base_town?: string;
    base_distance_km?: number;
    note?: string;
  };
};

export type HonestScarcity = Partial<Record<HonestScarcitySlot, HonestScarcityEntry>>;

export function isHonestScarcityConfirmed(
  hs: HonestScarcity | null | undefined,
  slot: HonestScarcitySlot,
): boolean {
  return hs?.[slot]?.confirmed === true;
}

const HEADINGS: Record<HonestScarcitySlot, (name: string) => string> = {
  eateries: (n) => `Where to eat in ${n}`,
  stays: (n) => `Where to stay in ${n}`,
  gems: (n) => `Things to see in ${n}`,
};

// Templates mirror apps/web/src/messages/en.json scarcity.<slot>.<category>.
const TEMPLATES: Record<HonestScarcitySlot, Record<HonestScarcityCategory, string>> = {
  eateries: {
    np_core: "{destination} is a protected core zone — no commercial dining is permitted here. Pack a meal from {base_town}, {base_distance_km}km out, or rely on your homestay's kitchen.",
    military_or_restricted: "{destination} is restricted ground with no permanent commercial infrastructure. Eat in {base_town}, {base_distance_km}km out, before you head up.",
    sub_5k_tribal: "{destination} is a tribal community of fewer than 5,000 — every meal here comes from a homestay kitchen. There are no standalone restaurants, and that's correct.",
    uninhabited_island: "{destination} has no permanent residents. Day-trip charters carry packed lunches from {base_town}. No restaurants exist, and none should.",
    high_altitude_pass: "{destination} is a pass, not a settlement. Eat in {base_town}, {base_distance_km}km out, and carry water and a hot flask for the climb.",
  },
  stays: {
    np_core: "The core zone permits no commercial overnight stays. Base in {base_town}, {base_distance_km}km out, and enter on a day permit.",
    military_or_restricted: "Overnight stays inside {destination} aren't sanctioned. Use {base_town}, {base_distance_km}km out, as your base.",
    sub_5k_tribal: "Every overnight option in {destination} is a community-run homestay. The listings here are the village's complete inventory.",
    uninhabited_island: "{destination} permits no overnight stays. Day-trip from {base_town} and return by sunset.",
    high_altitude_pass: "Nobody sleeps at {destination}. Acclimatise in {base_town}, {base_distance_km}km out — overnight at this altitude is medically unwise.",
  },
  gems: {
    np_core: "{destination} is the protected core itself. The sanctioned viewing points and trails are all there is, and all you came for.",
    military_or_restricted: "Access points and timing are the experience here. The single sanctioned route is the answer.",
    sub_5k_tribal: "{destination} itself is the visit — the community welcome, the rhythm of the village. There's no second checklist.",
    uninhabited_island: "The lagoon, the reef, and the solitude are the visit. There's no second thing to do, and that's the point.",
    high_altitude_pass: "The pass is the experience. No other listings exist — the view from the top is what you came for.",
  },
};

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

type Props = {
  slot: HonestScarcitySlot;
  destinationName: string;
  honestScarcity: HonestScarcity | null | undefined;
};

export default function HonestScarcityPanel({ slot, destinationName, honestScarcity }: Props) {
  const entry = honestScarcity?.[slot];
  if (!entry?.confirmed) return null;

  const body = interpolate(TEMPLATES[slot][entry.category], {
    destination: destinationName,
    base_town: entry.specifics.base_town ?? "",
    base_distance_km: entry.specifics.base_distance_km ?? 0,
  });
  const heading = HEADINGS[slot](destinationName);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.body}>{body}</Text>
      {entry.specifics.note ? (
        <Text style={styles.note}>{entry.specifics.note}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.sm,
    fontStyle: "italic",
  },
  body: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * 1.5,
    color: colors.mutedForeground,
  },
  note: {
    marginTop: spacing.sm,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5,
    color: colors.mutedForeground,
  },
});
