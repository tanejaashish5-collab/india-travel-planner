import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

const MONTH_FULL = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SHORT = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const SCORE_CONFIG: Record<number, { label: string; color: string }> = {
  5: { label: "Peak Season", color: colors.score5 },
  4: { label: "Good Time", color: colors.score4 },
  3: { label: "Average", color: colors.score3 },
  2: { label: "Below Average", color: colors.score2 },
  1: { label: "Avoid", color: colors.score1 },
};

interface MonthData {
  month: number;
  score: number;
  note: string;
  prose_lead: string | null;
  prose_payoff: string | null;
  who_should_go: string | null;
  who_should_avoid: string | null;
}

interface DestinationData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
}

export default function DestinationMonthScreen() {
  const { id, month } = useLocalSearchParams<{ id: string; month: string }>();
  const monthNum = parseInt(month || "1", 10);

  const [destination, setDestination] = useState<DestinationData | null>(null);
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [allMonths, setAllMonths] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    const [destRes, monthsRes] = await Promise.all([
      supabase
        .from("destinations")
        .select("id, name, tagline, difficulty, elevation_m")
        .eq("id", id)
        .single(),
      supabase
        .from("destination_months")
        .select("month, score, note, prose_lead, prose_payoff, who_should_go, who_should_avoid")
        .eq("destination_id", id)
        .order("month"),
    ]);

    if (destRes.data) setDestination(destRes.data as DestinationData);

    const months = (monthsRes.data as MonthData[]) ?? [];
    setAllMonths(months);

    const current = months.find((m) => m.month === monthNum);
    setMonthData(current ?? null);

    setLoading(false);
  }, [id, monthNum]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  if (loading) {
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Month Guide" }} />
        <ActivityIndicator size="large" color={colors.vermillion} />
      </View>
    );
  }

  if (!destination || !monthData) {
    return (
      <View style={s.center}>
        <Stack.Screen options={{ title: "Month Guide" }} />
        <Text style={s.emptyTitle}>No data available</Text>
      </View>
    );
  }

  const scoreConf = SCORE_CONFIG[monthData.score] ?? SCORE_CONFIG[3];

  // Parse bullet lists from who_should_go / who_should_avoid
  const parseBullets = (text: string | null): string[] => {
    if (!text) return [];
    return text
      .split(/[;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const goList = parseBullets(monthData.who_should_go);
  const avoidList = parseBullets(monthData.who_should_avoid);

  return (
    <View style={s.container}>
      <Stack.Screen
        options={{
          title: `${destination.name} in ${MONTH_SHORT[monthNum]}`,
        }}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.vermillion}
          />
        }
      >
        {/* Branded Header */}
        <View style={s.header}>
          <View style={s.accentLine} />
          <Text style={s.destName}>{destination.name}</Text>
          <Text style={s.monthLabel}>{MONTH_FULL[monthNum]}</Text>
        </View>

        {/* Score Hero */}
        <View style={s.scoreHero}>
          <View style={[s.scoreCircle, { borderColor: scoreConf.color }]}>
            <Text style={[s.scoreNumber, { color: scoreConf.color }]}>
              {monthData.score}
            </Text>
            <Text style={s.scoreOf}>/5</Text>
          </View>
          <View
            style={[
              s.scoreLabelPill,
              { backgroundColor: scoreConf.color + "20", borderColor: scoreConf.color + "40" },
            ]}
          >
            <Text style={[s.scoreLabelText, { color: scoreConf.color }]}>
              {scoreConf.label}
            </Text>
          </View>
          {monthData.note ? (
            <Text style={s.scoreNote}>{monthData.note}</Text>
          ) : null}
        </View>

        {/* Prose Lead */}
        {monthData.prose_lead ? (
          <View style={s.proseSection}>
            <Text style={s.proseText}>{monthData.prose_lead}</Text>
          </View>
        ) : null}

        {/* Prose Payoff */}
        {monthData.prose_payoff ? (
          <View style={s.proseSection}>
            <Text style={s.proseSectionTitle}>What to Expect</Text>
            <Text style={s.proseText}>{monthData.prose_payoff}</Text>
          </View>
        ) : null}

        {/* Who Should Go */}
        {goList.length > 0 && (
          <View style={s.bulletSection}>
            <Text style={[s.bulletTitle, { color: colors.score5 }]}>
              Who Should Go
            </Text>
            {goList.map((item, i) => (
              <View key={i} style={s.bulletRow}>
                <Text style={[s.bulletDot, { color: colors.score5 }]}>+</Text>
                <Text style={s.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Who Should Think Twice */}
        {avoidList.length > 0 && (
          <View style={s.bulletSection}>
            <Text style={[s.bulletTitle, { color: colors.score1 }]}>
              Think Twice If...
            </Text>
            {avoidList.map((item, i) => (
              <View key={i} style={s.bulletRow}>
                <Text style={[s.bulletDot, { color: colors.score1 }]}>-</Text>
                <Text style={s.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* All 12 Months Comparison */}
        <View style={s.allMonthsSection}>
          <Text style={s.allMonthsTitle}>All Months</Text>
          {allMonths.map((m) => {
            const conf = SCORE_CONFIG[m.score] ?? SCORE_CONFIG[3];
            const isActive = m.month === monthNum;
            return (
              <TouchableOpacity
                key={m.month}
                style={[s.monthRow, isActive && s.monthRowActive]}
                activeOpacity={0.85}
                onPress={() =>
                  router.push(`/destination-month?id=${id}&month=${m.month}`)
                }
              >
                <Text
                  style={[s.monthRowName, isActive && s.monthRowNameActive]}
                >
                  {MONTH_FULL[m.month]}
                </Text>
                <View
                  style={[
                    s.monthScorePill,
                    { backgroundColor: conf.color + "20", borderColor: conf.color + "40" },
                  ]}
                >
                  <Text style={[s.monthScoreText, { color: conf.color }]}>
                    {m.score}/5
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Full Guide Link */}
        <TouchableOpacity
          style={s.fullGuideBtn}
          activeOpacity={0.85}
          onPress={() => router.push(`/destination/${id}`)}
        >
          <Text style={s.fullGuideBtnText}>
            Full {destination.name} Guide →
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: colors.vermillion,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  destName: {
    fontSize: fontSize["3xl"],
    fontWeight: "800",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  monthLabel: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.saffron,
    marginTop: 2,
  },

  // Score Hero
  scoreHero: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.card,
    flexDirection: "row",
  },
  scoreNumber: {
    fontSize: fontSize["4xl"],
    fontWeight: "900",
  },
  scoreOf: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.mutedForeground,
    marginTop: 8,
  },
  scoreLabelPill: {
    marginTop: spacing.sm,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  scoreLabelText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
  },
  scoreNote: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.lg,
  },

  // Prose
  proseSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  proseSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  proseText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 24,
  },

  // Bullets
  bulletSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  bulletTitle: {
    fontSize: fontSize.base,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  bulletRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  bulletDot: {
    fontSize: fontSize.lg,
    fontWeight: "800",
    width: 20,
    textAlign: "center",
  },
  bulletText: {
    fontSize: fontSize.sm,
    color: colors.foreground,
    flex: 1,
    lineHeight: 22,
  },

  // All Months
  allMonthsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  allMonthsTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: 2,
  },
  monthRowActive: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.vermillion + "40",
  },
  monthRowName: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.mutedForeground,
  },
  monthRowNameActive: {
    color: colors.foreground,
    fontWeight: "700",
  },
  monthScorePill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  monthScoreText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "monospace",
  },

  // Full Guide Button
  fullGuideBtn: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.vermillion + "18",
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.vermillion + "40",
  },
  fullGuideBtnText: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.vermillion,
  },

  // Empty
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.foreground,
  },
});
