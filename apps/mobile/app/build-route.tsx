import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useDestinations, type Destination } from "../hooks/useDestinations";

// TODO: Replace banner with full implementation:
// 1. Destination picker — searchable FlatList, allow adding up to ~8 stops
// 2. Drag-to-reorder stops (react-native-draggable-flatlist or Reanimated gesture)
// 3. Drive-time estimates between consecutive stops (query destinations table for lat/lng then
//    compute haversine; label each leg with "~Xh drive" or "~X km")
// 4. Season-fit overlay — for each stop show the score for the trip month (month picker at top)
// 5. "Optimise order" button — sort by NakshIQ's north-to-south / proximity heuristic
// 6. Share route — deep-link URL or plain-text summary for copy/paste
// 7. Save route — persist to Supabase via useRoutes hook (schema: routes table already exists)

export default function BuildRouteScreen() {
  const { destinations, loading } = useDestinations();
  const [stops, setStops] = useState<Destination[]>([]);

  return (
    <>
      <Stack.Screen options={{ title: "Build a Route" }} />
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        <View style={s.accentLine} />

        <Text style={s.heading}>Build your route.</Text>
        <Text style={s.subhead}>
          Pick destinations and we'll sequence them by drive time and season fit.
        </Text>

        {/* Coming soon banner */}
        <View style={s.banner}>
          <Text style={s.bannerKicker}>NATIVE PORT · IN PROGRESS</Text>
          <Text style={s.bannerTitle}>Route builder coming to the app.</Text>
          <Text style={s.bannerBody}>
            Select stops, reorder them, and get drive-time estimates with
            season-fit scores — without opening a browser.
          </Text>
          <TouchableOpacity
            style={s.webButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={s.webButtonText}>← Back to More</Text>
          </TouchableOpacity>
        </View>

        {/* Stub: stop count badge to exercise hook import */}
        {!loading && destinations.length > 0 && (
          <View style={s.corpusBadge}>
            <Text style={s.corpusText}>
              {destinations.length} destinations in corpus
            </Text>
          </View>
        )}

        {stops.length > 0 && (
          <View style={s.stopsList}>
            {stops.map((d, i) => (
              <View key={d.id} style={s.stopRow}>
                <Text style={s.stopIndex}>{i + 1}</Text>
                <Text style={s.stopName}>{d.name}</Text>
              </View>
            ))}
          </View>
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
  webButton: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignSelf: "flex-start",
  },
  webButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.foreground,
  },

  corpusBadge: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
    marginBottom: spacing.md,
  },
  corpusText: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    fontWeight: "600",
  },

  stopsList: { gap: spacing.sm },
  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  stopIndex: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.vermillion,
    width: 20,
    textAlign: "center",
  },
  stopName: {
    fontSize: fontSize.base,
    fontWeight: "600",
    color: colors.foreground,
  },
});
