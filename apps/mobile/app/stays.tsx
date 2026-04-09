import { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useStays } from "../hooks/useStays";

export default function StaysScreen() {
  const { stays, loading } = useStays();
  const [typeFilter, setTypeFilter] = useState("all");

  const types = useMemo(() => {
    const set = new Set(stays.map((s) => s.type));
    return ["all", ...Array.from(set).sort()];
  }, [stays]);

  const filtered = useMemo(() => {
    if (typeFilter === "all") return stays;
    return stays.filter((s) => s.type === typeFilter);
  }, [stays, typeFilter]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Stays" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${stays.length} Local Stays` }} />
      <View style={s.chipRow}>
        {types.slice(0, 8).map((t) => (
          <TouchableOpacity key={t} style={[s.chip, typeFilter === t && s.chipActive]} onPress={() => setTypeFilter(t)}>
            <Text style={[s.chipText, typeFilter === t && s.chipTextActive]}>{t === "all" ? "All" : t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item: stay }) => {
          const destName = Array.isArray(stay.destinations) ? (stay.destinations as any)[0]?.name : stay.destinations?.name;
          return (
            <TouchableOpacity style={s.card} onPress={() => stay.destination_id ? router.push(`/destination/${stay.destination_id}`) : null}>
              <View style={s.cardHeader}>
                <Text style={s.cardName}>{stay.name}</Text>
                <Text style={s.typeBadge}>{stay.type}</Text>
              </View>
              {destName && <Text style={s.dest}>📍 {destName}</Text>}
              {stay.why_special && <Text style={s.special} numberOfLines={2}>{stay.why_special}</Text>}
              <View style={s.metaRow}>
                {stay.price_range && <Text style={s.meta}>{stay.price_range}</Text>}
                {stay.best_for && <Text style={s.meta}>Best for: {stay.best_for}</Text>}
              </View>
              {stay.verified && <Text style={s.verifiedBadge}>✓ Verified</Text>}
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
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, textTransform: "capitalize" },
  chipTextActive: { color: colors.primaryForeground },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, flex: 1 },
  typeBadge: { fontSize: 10, color: colors.score4, backgroundColor: "rgba(59,130,246,0.15)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm, textTransform: "capitalize" },
  dest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
  special: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 20 },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.sm },
  meta: { fontSize: fontSize.xs, color: colors.mutedForeground },
  verifiedBadge: { fontSize: fontSize.xs, color: colors.score5, marginTop: spacing.xs, fontWeight: "600" },
});
