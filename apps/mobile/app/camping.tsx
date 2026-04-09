import { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useCamping } from "../hooks/useCamping";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function CampingScreen() {
  const { spots, loading } = useCamping();
  const [filter, setFilter] = useState("all");
  const currentMonth = new Date().getMonth() + 1;

  const filtered = useMemo(() => {
    if (filter === "all") return spots;
    if (filter === "open") return spots.filter((s) => s.open_months?.includes(currentMonth));
    if (filter === "water") return spots.filter((s) => s.water_source);
    if (filter === "free") return spots.filter((s) => !s.permit_required);
    return spots;
  }, [spots, filter, currentMonth]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Camping" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${spots.length} Camping Spots` }} />
      <View style={s.chipRow}>
        {[{id:"all",label:"All"},{id:"open",label:`Open in ${MONTH_SHORT[currentMonth]}`},{id:"water",label:"💧 Water"},{id:"free",label:"No permit"}].map((f) => (
          <TouchableOpacity key={f.id} style={[s.chip, filter === f.id && s.chipActive]} onPress={() => setFilter(f.id)}>
            <Text style={[s.chipText, filter === f.id && s.chipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item: spot }) => {
          const destName = Array.isArray(spot.destinations) ? spot.destinations[0]?.name : spot.destinations?.name;
          return (
            <TouchableOpacity style={s.card} onPress={() => spot.destination_id ? router.push(`/destination/${spot.destination_id}`) : null}>
              <Text style={s.cardName}>{spot.name}</Text>
              <View style={s.metaRow}>
                {destName && <Text style={s.meta}>📍 {destName}</Text>}
                {spot.elevation_m && <Text style={s.meta}>⛰ {spot.elevation_m.toLocaleString()}m</Text>}
              </View>
              <View style={s.badgeRow}>
                {spot.permit_required && <Text style={s.badgeWarn}>Permit needed</Text>}
                {spot.water_source && <Text style={s.badgeGood}>💧 Water</Text>}
                {!spot.permit_required && <Text style={s.badgeGood}>No permit</Text>}
              </View>
              {spot.facilities && <Text style={s.facilities}>{spot.facilities}</Text>}
              {spot.open_months?.length > 0 && (
                <Text style={s.months}>Open: {spot.open_months.map((m) => MONTH_SHORT[m]).join(", ")}</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  chipRow: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 6, flexWrap: "wrap" },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full, backgroundColor: colors.muted },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground },
  chipTextActive: { color: colors.primaryForeground },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xs },
  meta: { fontSize: fontSize.xs, color: colors.mutedForeground },
  badgeRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  badgeWarn: { fontSize: 10, color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.15)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm },
  badgeGood: { fontSize: 10, color: colors.score5, backgroundColor: "rgba(16,185,129,0.15)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm },
  facilities: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.sm },
  months: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
});
