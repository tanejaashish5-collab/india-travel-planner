import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useRoadReports } from "../hooks/useRoadReports";

const STATUS_COLOR: Record<string, string> = {
  open: colors.score5,
  blocked: colors.score1,
  risky: colors.score2,
  slow: colors.score3,
};

function timeAgoText(reportedAt: string | null): { text: string; color: string } {
  if (!reportedAt) return { text: "", color: colors.mutedForeground };
  const hours = Math.round((Date.now() - new Date(reportedAt).getTime()) / 3600000);
  if (hours < 1) return { text: "Just now", color: colors.score5 };
  if (hours < 6) return { text: `${hours}h ago`, color: colors.score5 };
  if (hours < 24) return { text: `${hours}h ago`, color: colors.score3 };
  const days = Math.floor(hours / 24);
  return { text: days === 1 ? "1 day ago" : `${days} days ago`, color: colors.mutedForeground };
}

export default function RoadConditionsScreen() {
  const { reports, loading, refresh } = useRoadReports();

  if (loading && reports.length === 0)
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Road Conditions" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  const lastUpdate = reports.length > 0 && reports[0].reported_at
    ? new Date(reports[0].reported_at).toLocaleString("en-IN", {
        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
      })
    : null;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Road Conditions" }} />
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xl }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={() => (
          <View style={s.header}>
            <Text style={s.headerTitle}>🛣️ Road Conditions</Text>
            <Text style={s.headerSubtitle}>Live reports from mountain highways</Text>
            {lastUpdate && (
              <Text style={s.headerTimestamp}>Last updated {lastUpdate}</Text>
            )}
          </View>
        )}
        renderItem={({ item: r }) => {
          const destName = Array.isArray(r.destinations)
            ? (r.destinations as any)[0]?.name
            : r.destinations?.name;
          const barColor = STATUS_COLOR[r.status ?? ""] ?? colors.score3;
          const timeInfo = timeAgoText(r.reported_at);

          return (
            <View style={s.card}>
              {/* Vertical status bar */}
              <View style={[s.statusBar, { backgroundColor: barColor }]} />

              <View style={s.cardContent}>
                {/* Top row: status + time */}
                <View style={s.cardTopRow}>
                  <Text style={[s.statusLabel, { color: barColor }]}>
                    {r.status?.toUpperCase()}
                  </Text>
                  {timeInfo.text !== "" && (
                    <Text style={[s.timeText, { color: timeInfo.color }]}>
                      {timeInfo.text}
                    </Text>
                  )}
                </View>

                {/* Segment name */}
                {r.segment && <Text style={s.segment}>{r.segment}</Text>}

                {/* Destination */}
                {destName && <Text style={s.dest}>📍 {destName}</Text>}

                {/* Report */}
                {r.report && <Text style={s.report}>{r.report}</Text>}

                {/* Verified badge */}
                {r.verified && (
                  <View style={s.verifiedPill}>
                    <Text style={s.verifiedText}>✓ Verified</Text>
                  </View>
                )}
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
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
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
  headerTimestamp: {
    fontSize: fontSize.xs,
    color: colors.saffron,
    marginTop: spacing.xs,
    fontWeight: "600",
  },

  // Card
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    overflow: "hidden",
  },
  statusBar: {
    width: 5,
  },
  cardContent: {
    flex: 1,
    padding: spacing.md,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: fontSize.xs,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
  },
  segment: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.foreground,
    marginTop: spacing.sm,
  },
  dest: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 3,
  },
  report: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  verifiedPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(16,185,129,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  verifiedText: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.score5,
  },
});
