import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { supabase } from "../../lib/supabase";
import { getCached, TTL } from "../../lib/cache";

const DIFF_COLOR: Record<string, string> = { easy: colors.easy, moderate: colors.moderate, hard: colors.hard, extreme: colors.extreme };
const SCORE_COLOR: Record<number, string> = { 5: colors.score5, 4: colors.score4, 3: colors.score3, 2: colors.score2, 1: colors.score1 };

export default function RegionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [region, setRegion] = useState<any>(null);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    let mounted = true;
    if (!id) { setLoading(false); return; }
    Promise.all([
      getCached(
        `region:${id}`,
        async () => {
          const { data } = await supabase.from("regions").select("*").eq("id", id).single();
          return data;
        },
        TTL.long,
      ),
      getCached(
        `region-dests:${id}`,
        async () => {
          const { data } = await supabase
            .from("destinations")
            .select("id, name, tagline, difficulty, elevation_m, state:states(name), destination_months(month, score)")
            .eq("state_id", id)
            .order("name");
          return data ?? [];
        },
        TTL.medium,
      ),
    ]).then(([regRes, destRes]) => {
      if (!mounted) return;
      setRegion(regRes.data);
      setDestinations((destRes.data as any[]) ?? []);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Loading..." }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  const displayName = region?.name || id.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: displayName }} />
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={() => (
          <View style={s.header}>
            <Text style={s.title}>{displayName}</Text>
            {region?.hero_tagline && <Text style={s.tagline}>{region.hero_tagline}</Text>}
            <Text style={s.count}>{destinations.length} destinations</Text>
            {region?.description && <Text style={s.desc}>{region.description}</Text>}
          </View>
        )}
        renderItem={({ item: dest }) => {
          const monthScore = dest.destination_months?.find((m: any) => m.month === currentMonth)?.score;
          return (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/destination/${dest.id}`)}>
              <View style={s.cardHeader}>
                <Text style={s.cardName}>{dest.name}</Text>
                {monthScore !== undefined && (
                  <Text style={[s.score, { color: SCORE_COLOR[monthScore] || colors.mutedForeground }]}>{monthScore}/5</Text>
                )}
              </View>
              {dest.tagline && <Text style={s.cardTagline} numberOfLines={2}>{dest.tagline}</Text>}
              <View style={s.metaRow}>
                {dest.difficulty && <Text style={[s.meta, { color: DIFF_COLOR[dest.difficulty] }]}>{dest.difficulty}</Text>}
                {dest.elevation_m && <Text style={s.meta}>{dest.elevation_m.toLocaleString()}m</Text>}
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
  tagline: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.xs },
  count: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
  desc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, flex: 1 },
  score: { fontSize: fontSize.sm, fontWeight: "700" },
  cardTagline: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 20 },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.sm },
  meta: { fontSize: fontSize.xs, color: colors.mutedForeground, textTransform: "capitalize" },
});
