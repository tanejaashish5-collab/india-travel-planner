import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

export type EditorSlot = "experience" | "value" | "location" | "xfactor";

export interface EditorSource {
  url: string;
  title: string;
  source_type?: string;
}

export interface EditorStayPick {
  slot: EditorSlot;
  name: string;
  property_type: string | null;
  price_band: string | null;
  why_nakshiq: string;
  signature_experience?: string | null;
  warn?: string | null;
  contact_only?: boolean;
  contact_info?: string | null;
  sources?: EditorSource[];
  published?: boolean;
}

export interface StayIntelligence {
  upgrade_reasoning?: string | null;
  destination_note?: string | null;
  as_of_date?: string | null;
}

interface Props {
  destinationName: string;
  picks: EditorStayPick[];
  intelligence?: StayIntelligence | null;
}

const SLOT_LABEL: Record<EditorSlot, string> = {
  experience: "Experience",
  value: "Value",
  location: "Location",
  xfactor: "X-Factor",
};

// Each slot gets a theme-appropriate tint using the mobile palette.
const SLOT_TINT: Record<EditorSlot, { bg: string; fg: string; border: string }> = {
  experience: { bg: "rgba(200,147,47,0.12)", fg: colors.saffron, border: "rgba(200,147,47,0.45)" },
  value: { bg: "rgba(16,185,129,0.12)", fg: colors.score5, border: "rgba(16,185,129,0.45)" },
  location: { bg: "rgba(59,130,246,0.12)", fg: colors.score4, border: "rgba(59,130,246,0.45)" },
  xfactor: { bg: "rgba(229,86,66,0.12)", fg: colors.vermillion, border: "rgba(229,86,66,0.45)" },
};

const SLOT_ORDER: EditorSlot[] = ["experience", "value", "location", "xfactor"];

function titleCasePropertyType(raw: string | null | undefined): string | null {
  if (!raw) return null;
  return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function sourceHost(src: EditorSource, idx: number): string {
  try {
    return new URL(src.url).hostname.replace(/^www\./, "");
  } catch {
    return `src-${idx + 1}`;
  }
}

function PickCard({ pick }: { pick: EditorStayPick }) {
  const sources = (pick.sources ?? []).filter((s) => s && typeof s.url === "string" && s.url.length > 0);
  const tint = SLOT_TINT[pick.slot];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.slotBadge, { backgroundColor: tint.bg, borderColor: tint.border }]}>
          <Text style={[styles.slotBadgeText, { color: tint.fg }]}>
            {SLOT_LABEL[pick.slot].toUpperCase()}
          </Text>
        </View>
        {pick.price_band && <Text style={styles.priceBand}>{pick.price_band}</Text>}
      </View>

      <Text style={styles.pickName}>{pick.name}</Text>
      {titleCasePropertyType(pick.property_type) && (
        <Text style={styles.propertyType}>{titleCasePropertyType(pick.property_type)}</Text>
      )}

      <Text style={styles.whyText}>{pick.why_nakshiq}</Text>

      {pick.signature_experience && (
        <View style={styles.sigBox}>
          <Text style={styles.sigText}>{pick.signature_experience}</Text>
        </View>
      )}

      {pick.warn && (
        <View style={styles.warnRow}>
          <Text style={styles.warnGlyph}>⚠</Text>
          <Text style={styles.warnText}>{pick.warn}</Text>
        </View>
      )}

      {pick.contact_only && pick.contact_info && (
        <View style={styles.contactBox}>
          <Text style={styles.contactText}>
            Not listed on booking sites. Contact directly:
          </Text>
          <Text style={styles.contactInfo}>{pick.contact_info}</Text>
        </View>
      )}

      {sources.length > 0 && (
        <View style={styles.sourcesRow}>
          <Text style={styles.sourcesLabel}>SOURCES</Text>
          {sources.slice(0, 4).map((s, i) => (
            <TouchableOpacity
              key={`${s.url}-${i}`}
              onPress={() => Linking.openURL(s.url).catch(() => {})}
              style={styles.sourcePill}
              accessibilityRole="link"
              accessibilityLabel={s.title || sourceHost(s, i)}
            >
              <View style={styles.sourceDot} />
              <Text style={styles.sourceHost}>{sourceHost(s, i)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function EmptySlot({ slot }: { slot: EditorSlot }) {
  const tint = SLOT_TINT[slot];
  return (
    <View style={styles.emptyCard}>
      <View style={[styles.slotBadge, { backgroundColor: tint.bg, borderColor: tint.border, opacity: 0.6 }]}>
        <Text style={[styles.slotBadgeText, { color: tint.fg }]}>{SLOT_LABEL[slot].toUpperCase()}</Text>
      </View>
      <Text style={styles.emptyText}>
        No {SLOT_LABEL[slot].toLowerCase()} pick here that&rsquo;s worth the flag. See alternatives below.
      </Text>
    </View>
  );
}

export default function EditorsPicks({ destinationName, picks, intelligence }: Props) {
  const published = picks.filter((p) => p.published !== false);
  if (published.length === 0) return null;

  const bySlot = new Map<EditorSlot, EditorStayPick>();
  for (const p of published) bySlot.set(p.slot, p);

  const upgrade = intelligence?.upgrade_reasoning?.trim() || null;
  const note = intelligence?.destination_note?.trim() || null;
  const asOf = intelligence?.as_of_date?.trim() || null;

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.kicker}>EDITOR&rsquo;S PICKS</Text>
        <View style={styles.headerLine} />
        <Text style={styles.kickerMuted}>WHERE TO STAY</Text>
      </View>

      <Text style={styles.sectionTitle}>
        The stay decisions worth flagging in {destinationName}.
      </Text>
      {note && <Text style={styles.sectionNote}>{note}</Text>}

      {upgrade && (
        <View style={styles.upgradeBox}>
          <Text style={styles.upgradeKicker}>THE UPGRADE QUESTION</Text>
          <Text style={styles.upgradeText}>{upgrade}</Text>
        </View>
      )}

      <View style={styles.grid}>
        {SLOT_ORDER.map((slot) => {
          const pick = bySlot.get(slot);
          return pick
            ? <PickCard key={slot} pick={pick} />
            : <EmptySlot key={slot} slot={slot} />;
        })}
      </View>

      <View style={styles.footerRow}>
        {asOf && <Text style={styles.footerText}>As of {asOf}</Text>}
        <Text style={styles.footerText}>Sources linked per pick</Text>
        <Text style={styles.footerText}>Prices change — verify before booking</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "rgba(245,241,232,0.02)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  kicker: {
    fontSize: 10,
    letterSpacing: 2.4,
    fontWeight: "700",
    color: colors.foreground,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  kickerMuted: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.mutedForeground,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  sectionNote: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  upgradeBox: {
    borderWidth: 1,
    borderColor: "rgba(229,86,66,0.35)",
    backgroundColor: "rgba(229,86,66,0.06)",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  upgradeKicker: {
    fontSize: 10,
    letterSpacing: 2.2,
    fontWeight: "700",
    color: colors.vermillion,
    marginBottom: spacing.xs,
  },
  upgradeText: {
    fontSize: fontSize.base,
    lineHeight: 22,
    color: colors.foreground,
  },
  grid: {
    gap: spacing.sm,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  slotBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  slotBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
  },
  priceBand: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontFamily: "Menlo",
  },
  pickName: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
    lineHeight: 22,
  },
  propertyType: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  whyText: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  sigBox: {
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    paddingLeft: spacing.sm,
    marginTop: spacing.xs,
  },
  sigText: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontStyle: "italic",
    lineHeight: 18,
  },
  warnRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: spacing.xs,
  },
  warnGlyph: {
    color: colors.moderate,
    fontSize: fontSize.xs,
  },
  warnText: {
    flex: 1,
    fontSize: fontSize.xs,
    color: colors.moderate,
    lineHeight: 16,
  },
  contactBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  contactText: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  contactInfo: {
    fontSize: fontSize.xs,
    color: colors.foreground,
    fontFamily: "Menlo",
    marginTop: 2,
  },
  sourcesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.xs,
  },
  sourcesLabel: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.mutedForeground,
    marginRight: 2,
  },
  sourcePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  sourceDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.score5,
  },
  sourceHost: {
    fontSize: 10,
    color: colors.mutedForeground,
  },
  emptyCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: "rgba(245,241,232,0.02)",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: 10,
    color: colors.mutedForeground,
  },
});
