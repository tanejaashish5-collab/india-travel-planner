import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useDestinations, type Destination } from "../hooks/useDestinations";

// TODO: Replace banner with full implementation:
// 1. Destination picker — up to 3 slots, searchable modal (mirror web CompareView UX)
// 2. Comparison matrix — rows: monthly score, difficulty, elevation, budget_tier,
//    family_stress, vehicle_fit, kids_friendly rating, solo_female_score, best_months
// 3. Horizontal ScrollView of column cards (one per destination) with sticky row labels
// 4. Month selector — show the score for a chosen month across all three destinations
// 5. Highlight best/worst cell per row with color (score5 / score1 accent)
// 6. "Clear all" + per-slot "×" removal buttons
// 7. Deep-link: /compare?ids=a,b,c to pre-populate from external source

const COMPARE_LIMIT = 3;

export default function CompareScreen() {
  const { destinations, loading } = useDestinations();
  const [selected, setSelected] = useState<Destination[]>([]);

  function toggleDest(dest: Destination) {
    if (selected.find((d) => d.id === dest.id)) {
      setSelected(selected.filter((d) => d.id !== dest.id));
    } else if (selected.length < COMPARE_LIMIT) {
      setSelected([...selected, dest]);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Compare Destinations" }} />
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        <View style={s.accentLine} />

        <Text style={s.heading}>Compare destinations.</Text>
        <Text style={s.subhead}>
          Pick up to three destinations and see them side by side — monthly
          score, kids rating, safety, network, medical access, budget,
          difficulty.
        </Text>

        {/* Coming soon banner */}
        <View style={s.banner}>
          <Text style={s.bannerKicker}>NATIVE PORT · IN PROGRESS</Text>
          <Text style={s.bannerTitle}>Full comparison matrix coming.</Text>
          <Text style={s.bannerBody}>
            Choose up to three destinations and get a scrollable side-by-side
            breakdown of every score and attribute — no browser required.
          </Text>
          <TouchableOpacity
            style={s.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={s.backButtonText}>← Back to More</Text>
          </TouchableOpacity>
        </View>

        {/* Stub slot indicators to exercise state + hook import */}
        <View style={s.slots}>
          {Array.from({ length: COMPARE_LIMIT }).map((_, i) => {
            const dest = selected[i];
            return (
              <View key={i} style={[s.slot, dest ? s.slotFilled : s.slotEmpty]}>
                {dest ? (
                  <>
                    <Text style={s.slotName} numberOfLines={1}>{dest.name}</Text>
                    <TouchableOpacity onPress={() => toggleDest(dest)}>
                      <Text style={s.slotRemove}>×</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={s.slotPlaceholder}>+ Add destination</Text>
                )}
              </View>
            );
          })}
        </View>

        {!loading && (
          <Text style={s.corpus}>
            {destinations.length} destinations available · select up to {COMPARE_LIMIT}
          </Text>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },

  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: colors.vermillion,
    borderRadius: 2,
    marginBottom: spacing.md,
  },

  heading: {
    fontSize: fontSize["3xl"],
    fontWeight: "700",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  subhead: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },

  banner: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderLeftColor: colors.vermillion,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  bannerKicker: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.vermillion,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  bannerTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  bannerBody: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  backButton: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.foreground,
  },

  slots: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  slot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.sm,
    minHeight: 44,
  },
  slotFilled: {
    backgroundColor: colors.card,
    borderColor: colors.vermillion + "60",
  },
  slotEmpty: {
    backgroundColor: colors.muted,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  slotName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
    flex: 1,
  },
  slotRemove: {
    fontSize: fontSize.xl,
    color: colors.mutedForeground,
    paddingHorizontal: spacing.xs,
  },
  slotPlaceholder: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },

  corpus: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    textAlign: "center",
  },
});
