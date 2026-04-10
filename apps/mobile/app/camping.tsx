import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useCamping } from "../hooks/useCamping";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function CampingScreen() {
  const { spots, loading } = useCamping();
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return spots;
    if (filter === "open") return spots.filter((s) => s.open_months?.includes(currentMonth));
    if (filter === "water") return spots.filter((s) => s.water_source);
    if (filter === "free") return spots.filter((s) => !s.permit_required);
    return spots;
  }, [spots, filter, currentMonth]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Camping" }} /><ActivityIndicator size="large" color={colors.topographic} /></View>;

  const filters = [
    { id: "all", label: "All" },
    { id: "open", label: `Open in ${MONTH_SHORT[currentMonth]}` },
    { id: "water", label: "Water" },
    { id: "free", label: "No permit" },
  ];

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Camping" }} />

      {/* Branded Header */}
      <View style={s.header}>
        <View style={s.accentLine} />
        <View style={s.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.headerTitle}>Camping Spots ⛺</Text>
            <Text style={s.headerSub}>Wild camps & organized sites</Text>
          </View>
          <View style={s.countBadge}>
            <Text style={s.countText}>{spots.length}</Text>
          </View>
        </View>
      </View>

      {/* Filter Chips — Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipScroll}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[s.chip, filter === f.id && s.chipActive]}
            onPress={() => setFilter(f.id)}
          >
            <Text style={[s.chipText, filter === f.id && s.chipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Camping List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.topographic} />}
        renderItem={({ item: spot }) => {
          const destName = Array.isArray(spot.destinations) ? spot.destinations[0]?.name : spot.destinations?.name;
          const isOpenNow = spot.open_months?.includes(currentMonth);

          return (
            <TouchableOpacity
              style={s.card}
              onPress={() => spot.destination_id ? router.push(`/destination/${spot.destination_id}`) : null}
              activeOpacity={0.85}
            >
              {/* Top accent */}
              <View style={s.cardAccent} />

              <View style={s.cardContent}>
                {/* Name + Elevation row */}
                <View style={s.cardTopRow}>
                  <Text style={s.cardName} numberOfLines={1}>{spot.name}</Text>
                  {spot.elevation_m && (
                    <View style={s.elevBadge}>
                      <Text style={s.elevText}>{spot.elevation_m.toLocaleString()}m</Text>
                    </View>
                  )}
                </View>

                {/* Destination link */}
                {destName && (
                  <TouchableOpacity onPress={() => spot.destination_id ? router.push(`/destination/${spot.destination_id}`) : null}>
                    <Text style={s.destLink}>📍 {destName}</Text>
                  </TouchableOpacity>
                )}

                {/* Badges row */}
                <View style={s.badgeRow}>
                  {spot.permit_required ? (
                    <View style={s.badgeWarn}>
                      <Text style={s.badgeWarnText}>📋 Permit needed</Text>
                    </View>
                  ) : (
                    <View style={s.badgeGood}>
                      <Text style={s.badgeGoodText}>✓ No permit</Text>
                    </View>
                  )}
                  {spot.water_source && (
                    <View style={s.badgeWater}>
                      <Text style={s.badgeWaterText}>💧 Water</Text>
                    </View>
                  )}
                  {isOpenNow && (
                    <View style={s.badgeOpen}>
                      <Text style={s.badgeOpenText}>Open now</Text>
                    </View>
                  )}
                </View>

                {/* Facilities */}
                {spot.facilities && (
                  <View style={s.facilitiesWrap}>
                    <Text style={s.facilitiesLabel}>Facilities</Text>
                    <Text style={s.facilitiesText}>{spot.facilities}</Text>
                  </View>
                )}

                {/* Open months as pills */}
                {spot.open_months?.length > 0 && (
                  <View style={s.monthsWrap}>
                    <Text style={s.monthsLabel}>Open:</Text>
                    <View style={s.monthPills}>
                      {spot.open_months.map((m: number) => (
                        <View key={m} style={[s.monthPill, m === currentMonth && s.monthPillActive]}>
                          <Text style={[s.monthPillText, m === currentMonth && s.monthPillTextActive]}>{MONTH_SHORT[m]}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Text style={s.emptyIcon}>⛺</Text>
            <Text style={s.emptyTitle}>No camping spots found</Text>
            <Text style={s.emptySub}>Try a different filter</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },

  // Header
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  accentLine: { width: 40, height: 3, backgroundColor: colors.topographic, borderRadius: 2, marginBottom: spacing.sm },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground, letterSpacing: -0.5 },
  headerSub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  countBadge: { backgroundColor: colors.topographic + "25", borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: colors.topographic + "50" },
  countText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.topographic },

  // Chips
  chipScroll: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: borderRadius.full, backgroundColor: colors.muted, borderWidth: 1, borderColor: "transparent", marginRight: 6 },
  chipActive: { backgroundColor: colors.topographic + "20", borderColor: colors.topographic },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground },
  chipTextActive: { color: colors.topographic },

  // Card
  card: { borderRadius: borderRadius.lg, overflow: "hidden", backgroundColor: colors.card, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardAccent: { height: 3, backgroundColor: colors.topographic },
  cardContent: { padding: spacing.md },
  cardTopRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: spacing.sm },
  cardName: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, flex: 1 },
  elevBadge: { backgroundColor: colors.muted, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border },
  elevText: { fontSize: 11, fontWeight: "700", color: colors.foreground, fontFamily: "monospace" },
  destLink: { fontSize: fontSize.xs, color: colors.score4, marginTop: spacing.xs, fontWeight: "500" },

  // Badges
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.sm },
  badgeWarn: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(245,158,11,0.12)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: "rgba(245,158,11,0.25)" },
  badgeWarnText: { fontSize: 11, fontWeight: "600", color: "#f59e0b" },
  badgeGood: { flexDirection: "row", alignItems: "center", backgroundColor: colors.score5 + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.score5 + "30" },
  badgeGoodText: { fontSize: 11, fontWeight: "600", color: colors.score5 },
  badgeWater: { flexDirection: "row", alignItems: "center", backgroundColor: colors.score4 + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.score4 + "30" },
  badgeWaterText: { fontSize: 11, fontWeight: "600", color: colors.score4 },
  badgeOpen: { flexDirection: "row", alignItems: "center", backgroundColor: colors.score5 + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: colors.score5 + "30" },
  badgeOpenText: { fontSize: 11, fontWeight: "600", color: colors.score5 },

  // Facilities
  facilitiesWrap: { marginTop: spacing.sm, backgroundColor: colors.muted, borderRadius: borderRadius.sm, padding: spacing.sm },
  facilitiesLabel: { fontSize: 10, fontWeight: "700", color: colors.mutedForeground, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
  facilitiesText: { fontSize: fontSize.xs, color: colors.foreground, lineHeight: 18 },

  // Month pills
  monthsWrap: { marginTop: spacing.sm },
  monthsLabel: { fontSize: 10, fontWeight: "700", color: colors.mutedForeground, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: spacing.xs },
  monthPills: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  monthPill: { backgroundColor: colors.muted, paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full },
  monthPillActive: { backgroundColor: colors.score5 + "25", borderWidth: 1, borderColor: colors.score5 },
  monthPillText: { fontSize: 10, fontWeight: "600", color: colors.mutedForeground },
  monthPillTextActive: { color: colors.score5 },

  // Empty
  emptyWrap: { alignItems: "center", paddingTop: spacing.xxl * 2 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  emptySub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
});
