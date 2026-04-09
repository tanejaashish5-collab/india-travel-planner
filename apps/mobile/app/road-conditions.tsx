import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useRoadReports } from "../hooks/useRoadReports";

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  open: { bg: "rgba(16,185,129,0.15)", text: colors.score5 },
  blocked: { bg: "rgba(239,68,68,0.15)", text: colors.score1 },
  risky: { bg: "rgba(249,115,22,0.15)", text: colors.score2 },
  slow: { bg: "rgba(234,179,8,0.15)", text: colors.score3 },
};

export default function RoadConditionsScreen() {
  const { reports, loading, refresh } = useRoadReports();

  if (loading && reports.length === 0) return <View style={s.center}><Stack.Screen options={{ title: "Road Conditions" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Road Conditions" }} />
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
        ListHeaderComponent={() => <Text style={s.pullHint}>Pull to refresh</Text>}
        renderItem={({ item: r }) => {
          const destName = Array.isArray(r.destinations) ? (r.destinations as any)[0]?.name : r.destinations?.name;
          const statusStyle = STATUS_COLOR[r.status ?? ""] ?? STATUS_COLOR.slow;
          const hoursAgo = r.reported_at ? Math.round((Date.now() - new Date(r.reported_at).getTime()) / 3600000) : null;

          return (
            <View style={s.card}>
              <View style={s.cardHeader}>
                <View style={[s.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[s.statusText, { color: statusStyle.text }]}>{r.status?.toUpperCase()}</Text>
                </View>
                {r.verified && <Text style={s.verified}>✓ Verified</Text>}
              </View>
              {r.segment && <Text style={s.segment}>{r.segment}</Text>}
              {destName && <Text style={s.dest}>📍 {destName}</Text>}
              {r.report && <Text style={s.report}>{r.report}</Text>}
              <View style={s.footer}>
                {hoursAgo !== null && <Text style={s.time}>{hoursAgo < 1 ? "Just now" : `${hoursAgo}h ago`}</Text>}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  pullHint: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginBottom: spacing.sm },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  statusText: { fontSize: fontSize.xs, fontWeight: "700" },
  verified: { fontSize: fontSize.xs, color: colors.score5, fontWeight: "600" },
  segment: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginTop: spacing.sm },
  dest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 3 },
  report: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 20 },
  footer: { marginTop: spacing.sm },
  time: { fontSize: fontSize.xs, color: colors.mutedForeground },
});
