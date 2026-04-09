import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useCollection } from "../../hooks/useCollections";

const SCORE_COLOR: Record<number, string> = { 5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1 };
const DIFF_COLOR: Record<string, string> = { easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme };

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { collection: col, loading } = useCollection(id);
  const currentMonth = new Date().getMonth() + 1;

  if (loading || !col) return <View style={s.center}><Stack.Screen options={{ title: "Loading..." }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: col.name }} />
      <FlatList
        data={col.destinations ?? []}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={() => (
          <View style={s.header}>
            <Text style={s.title}>{col.name}</Text>
            {col.description && <Text style={s.desc}>{col.description}</Text>}
            <Text style={s.count}>{col.destinations?.length ?? 0} destinations</Text>
          </View>
        )}
        renderItem={({ item: dest }: any) => {
          const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
          const monthScore = dest.destination_months?.find((m: any) => m.month === currentMonth)?.score;
          return (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/destination/${dest.id}`)}>
              <View style={s.cardHeader}>
                <Text style={s.cardName}>{dest.name}</Text>
                {monthScore !== undefined && (
                  <View style={[s.scorePill, { borderColor: SCORE_COLOR[monthScore] || colors.border }]}>
                    <Text style={{ fontSize: fontSize.xs, fontWeight: "700", color: SCORE_COLOR[monthScore] || colors.mutedForeground }}>{monthScore}/5</Text>
                  </View>
                )}
              </View>
              {dest.tagline && <Text style={s.tagline} numberOfLines={2}>{dest.tagline}</Text>}
              <View style={s.metaRow}>
                {stateName && <Text style={s.meta}>{stateName}</Text>}
                {dest.difficulty && <><Text style={s.metaDot}>·</Text><Text style={[s.meta, { color: DIFF_COLOR[dest.difficulty] }]}>{dest.difficulty}</Text></>}
                {dest.elevation_m && <><Text style={s.metaDot}>·</Text><Text style={s.meta}>{dest.elevation_m.toLocaleString()}m</Text></>}
              </View>
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
  header: { marginBottom: spacing.lg },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  desc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },
  count: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, flex: 1 },
  scorePill: { borderWidth: 1, borderRadius: borderRadius.full, paddingHorizontal: 8, paddingVertical: 3 },
  tagline: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 20 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.sm },
  meta: { fontSize: fontSize.xs, color: colors.mutedForeground },
  metaDot: { fontSize: fontSize.xs, color: colors.mutedForeground },
});
