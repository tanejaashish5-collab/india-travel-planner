import { useState, useMemo, useRef } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useFestivals } from "../hooks/useFestivals";

const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function FestivalsScreen() {
  const { festivals, loading } = useFestivals();
  const [monthFilter, setMonthFilter] = useState(0); // 0 = all
  const currentMonth = new Date().getMonth() + 1;

  const sections = useMemo(() => {
    const filtered = monthFilter === 0 ? festivals : festivals.filter((f) => f.month === monthFilter);
    const grouped: Record<number, any[]> = {};
    filtered.forEach((f) => {
      const m = f.month ?? 0;
      if (!grouped[m]) grouped[m] = [];
      grouped[m].push(f);
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([month, data]) => ({ title: MONTH_FULL[Number(month)] || "Unknown", data }));
  }, [festivals, monthFilter]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Festivals" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${festivals.length} Festivals` }} />
      <View style={s.chipScroll}>
        <TouchableOpacity style={[s.chip, monthFilter === 0 && s.chipActive]} onPress={() => setMonthFilter(0)}>
          <Text style={[s.chipText, monthFilter === 0 && s.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <TouchableOpacity key={m} style={[s.chip, monthFilter === m && s.chipActive, m === currentMonth && monthFilter === 0 && s.chipHighlight]} onPress={() => setMonthFilter(m)}>
            <Text style={[s.chipText, monthFilter === m && s.chipTextActive]}>{MONTH_SHORT[m]}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderSectionHeader={({ section }) => (
          <Text style={s.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item: f }) => {
          const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
          return (
            <TouchableOpacity style={s.card} onPress={() => f.destination_id ? router.push(`/destination/${f.destination_id}`) : null}>
              <Text style={s.festName}>{f.name}</Text>
              {f.approximate_date && <Text style={s.date}>{f.approximate_date}</Text>}
              {destName && <Text style={s.dest}>📍 {destName}</Text>}
              {f.significance && <Text style={s.sig} numberOfLines={2}>{f.significance}</Text>}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text style={s.empty}>No festivals found for this month.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  chipScroll: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 6, flexWrap: "wrap" },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: borderRadius.full, backgroundColor: colors.muted },
  chipActive: { backgroundColor: colors.primary },
  chipHighlight: { borderWidth: 1, borderColor: colors.primary },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground },
  chipTextActive: { color: colors.primaryForeground },
  sectionHeader: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, paddingVertical: spacing.sm, marginTop: spacing.sm },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.sm, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  festName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground },
  date: { fontSize: fontSize.xs, color: colors.primary, marginTop: 3, fontFamily: "monospace" },
  dest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 3 },
  sig: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 20 },
  empty: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.xl },
});
