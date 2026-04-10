import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useRoutes } from "../hooks/useRoutes";

const DIFF_COLOR: Record<string, string> = { easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme };
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "short", label: "≤5 days" },
  { id: "long", label: "8+ days" },
  { id: "bike", label: "🏍 Bike" },
  { id: "kids", label: "👶 Kids" },
];

export default function RoutesScreen() {
  const { routes, loading } = useRoutes();
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return routes;
    if (filter === "bike") return routes.filter((r) => r.bike_route);
    if (filter === "kids") return routes.filter((r) => r.kids_suitable);
    if (filter === "short") return routes.filter((r) => (r.days ?? 0) <= 5);
    if (filter === "long") return routes.filter((r) => (r.days ?? 0) >= 8);
    return routes;
  }, [routes, filter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (loading)
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Routes" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Road Trips" }} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xl }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={() => (
          <View>
            {/* Branded header */}
            <View style={s.header}>
              <Text style={s.headerTitle}>🚗 Road Trips</Text>
              <Text style={s.headerSubtitle}>Curated driving routes through mountains</Text>
              <Text style={s.headerCount}>{routes.length} routes</Text>
            </View>

            {/* Horizontal filter chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.chipScroll}
            >
              {FILTERS.map((f) => (
                <TouchableOpacity
                  key={f.id}
                  style={[s.chip, filter === f.id && s.chipActive]}
                  onPress={() => setFilter(f.id)}
                >
                  <Text style={[s.chipText, filter === f.id && s.chipTextActive]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        renderItem={({ item: r }) => (
          <TouchableOpacity
            style={s.card}
            onPress={() => router.push(`/route/${r.id}`)}
            activeOpacity={0.85}
          >
            {/* Header */}
            <View style={s.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={s.cardName}>{r.name}</Text>
                {r.description && (
                  <Text style={s.cardDesc} numberOfLines={2}>
                    {r.description}
                  </Text>
                )}
              </View>
              <View style={s.daysCircle}>
                <Text style={s.daysNum}>{r.days}</Text>
                <Text style={s.daysLabel}>days</Text>
              </View>
            </View>

            {/* Badges */}
            <View style={s.badgeRow}>
              {r.difficulty && (
                <View
                  style={[
                    s.badge,
                    { backgroundColor: (DIFF_COLOR[r.difficulty] || colors.muted) + "20" },
                  ]}
                >
                  <Text
                    style={[
                      s.badgeText,
                      { color: DIFF_COLOR[r.difficulty] || colors.foreground },
                    ]}
                  >
                    {r.difficulty}
                  </Text>
                </View>
              )}
              {r.bike_route && (
                <View style={[s.badge, { backgroundColor: colors.score4 + "20" }]}>
                  <Text style={[s.badgeText, { color: colors.score4 }]}>🏍 Bike route</Text>
                </View>
              )}
              {r.kids_suitable && (
                <View style={[s.badge, { backgroundColor: colors.score5 + "20" }]}>
                  <Text style={[s.badgeText, { color: colors.score5 }]}>👶 Kids OK</Text>
                </View>
              )}
              {r.budget_range && (
                <View style={[s.badge, { backgroundColor: colors.muted }]}>
                  <Text style={s.badgeText}>{r.budget_range}</Text>
                </View>
              )}
            </View>

            {/* Stops */}
            {r.stops?.length > 0 && (
              <View style={s.stopsRow}>
                {r.stops.map((stop: string, i: number) => (
                  <View key={i} style={s.stopItem}>
                    <View style={s.stopDot} />
                    <Text style={s.stopText} numberOfLines={1}>
                      {stop}
                    </Text>
                    {i < r.stops.length - 1 && <Text style={s.stopArrow}>→</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Highlights */}
            {r.highlights?.length > 0 && (
              <Text style={s.highlights} numberOfLines={1}>
                {r.highlights.slice(0, 3).join(" · ")}
              </Text>
            )}

            {/* Best months */}
            {r.best_months?.length > 0 && (
              <View style={s.monthRow}>
                {r.best_months.map((m: number) => (
                  <View key={m} style={s.monthPill}>
                    <Text style={s.monthText}>{MONTH_SHORT[m]}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize["3xl"],
    fontWeight: "800",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.xs,
  },
  headerCount: {
    fontSize: fontSize.xs,
    color: colors.saffron,
    fontWeight: "600",
    marginTop: spacing.xs,
  },

  // Chips
  chipScroll: {
    paddingVertical: spacing.sm,
    gap: 6,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "15",
  },
  chipText: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  chipTextActive: { color: colors.primary },

  // Card (preserved from original)
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: "row", gap: spacing.md },
  cardName: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  cardDesc: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 4,
    lineHeight: 20,
  },
  daysCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  daysNum: { fontSize: fontSize.lg, fontWeight: "800", color: colors.primary },
  daysLabel: { fontSize: 9, color: colors.mutedForeground, marginTop: -2 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.md },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.foreground,
    textTransform: "capitalize",
  },
  stopsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: spacing.md,
    gap: 2,
  },
  stopItem: { flexDirection: "row", alignItems: "center" },
  stopDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.score4,
    marginRight: 4,
  },
  stopText: { fontSize: fontSize.xs, color: colors.foreground },
  stopArrow: { fontSize: fontSize.xs, color: colors.mutedForeground, marginHorizontal: 4 },
  highlights: { fontSize: fontSize.xs, color: colors.score4, marginTop: spacing.sm },
  monthRow: { flexDirection: "row", gap: 4, marginTop: spacing.sm },
  monthPill: {
    backgroundColor: colors.muted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  monthText: { fontSize: 10, fontWeight: "600", color: colors.foreground },
});
