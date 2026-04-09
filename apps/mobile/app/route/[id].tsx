import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useRoute } from "../../hooks/useRoutes";

const DIFF_COLOR: Record<string, string> = { easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme };
const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { route: r, loading } = useRoute(id);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  if (loading || !r) return <View style={s.center}><Stack.Screen options={{ title: "Loading..." }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: r.name }} />

      <Text style={s.title}>{r.name}</Text>

      {/* Stats */}
      <View style={s.statsRow}>
        <View style={s.statCard}><Text style={s.statValue}>{r.days}</Text><Text style={s.statLabel}>Days</Text></View>
        {r.difficulty && <View style={s.statCard}><Text style={[s.statValue, { color: DIFF_COLOR[r.difficulty] }]}>{r.difficulty}</Text><Text style={s.statLabel}>Difficulty</Text></View>}
        {r.bike_route && <View style={s.statCard}><Text style={s.statValue}>🏍</Text><Text style={s.statLabel}>Bike OK</Text></View>}
        {r.kids_suitable && <View style={s.statCard}><Text style={s.statValue}>👶</Text><Text style={s.statLabel}>Kids OK</Text></View>}
      </View>

      {r.description && <Text style={s.desc}>{r.description}</Text>}

      {/* Best months */}
      {r.best_months?.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Best Months</Text>
          <View style={s.chipRow}>{r.best_months.map((m) => <View key={m} style={s.monthChip}><Text style={s.monthText}>{MONTH_SHORT[m]}</Text></View>)}</View>
        </View>
      )}

      {/* Highlights */}
      {r.highlights?.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Highlights</Text>
          {r.highlights.map((h, i) => <Text key={i} style={s.bullet}>• {h}</Text>)}
        </View>
      )}

      {/* Stops */}
      {r.stops?.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Route Stops</Text>
          <Text style={s.stopsLine}>{r.stops.join(" → ")}</Text>
        </View>
      )}

      {/* Day by Day */}
      {r.day_by_day?.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Day by Day</Text>
          {r.day_by_day.map((day: any, i: number) => (
            <TouchableOpacity key={i} style={s.dayCard} onPress={() => setExpandedDay(expandedDay === i ? null : i)}>
              <View style={s.dayHeader}>
                <View style={s.dayBadge}><Text style={s.dayBadgeText}>Day {day.day || i + 1}</Text></View>
                <Text style={s.dayTitle} numberOfLines={expandedDay === i ? undefined : 1}>{day.title || day.destination || `Day ${i + 1}`}</Text>
              </View>
              {expandedDay === i && (
                <View style={s.dayContent}>
                  {day.description && <Text style={s.dayDesc}>{day.description}</Text>}
                  {day.distance && <Text style={s.dayMeta}>🚗 {day.distance}</Text>}
                  {day.accommodation && <Text style={s.dayMeta}>🏨 {day.accommodation}</Text>}
                  {day.stops?.map((stop: string, j: number) => (
                    <Text key={j} style={s.dayStop}>• {stop}</Text>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Logistics */}
      {r.logistics && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Logistics</Text>
          <Text style={s.desc}>{r.logistics}</Text>
        </View>
      )}

      {r.budget_range && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>Budget</Text>
          <Text style={s.desc}>{r.budget_range}</Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  statsRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.sm, padding: spacing.sm, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground },
  statLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  desc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 22 },
  section: { marginTop: spacing.lg },
  sectionTitle: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  monthChip: { backgroundColor: colors.muted, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  monthText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.foreground },
  bullet: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 4, lineHeight: 20 },
  stopsLine: { fontSize: fontSize.sm, color: colors.score4, lineHeight: 22 },
  dayCard: { backgroundColor: colors.card, borderRadius: borderRadius.sm, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  dayHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  dayBadge: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  dayBadgeText: { fontSize: fontSize.xs, fontWeight: "700", color: colors.primaryForeground },
  dayTitle: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, flex: 1 },
  dayContent: { marginTop: spacing.sm },
  dayDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 20 },
  dayMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4 },
  dayStop: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
});
