import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

interface StateInfo {
  id: string;
  name: string;
  region: string;
  dest_count: number;
}

const REGION_ORDER = ["North India", "South", "South India", "East India", "West India", "Central India", "Northeast India", "Islands"];
const REGION_ICONS: Record<string, string> = {
  "North India": "🏔️",
  "South India": "🛕",
  "South": "🛕",
  "East India": "🎭",
  "West India": "🏖️",
  "Central India": "🐅",
  "Northeast India": "🌿",
  "Islands": "🏝️",
};

export default function StatesScreen() {
  const [states, setStates] = useState<StateInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStates() {
      const { data: stateRows } = await supabase.from("states").select("id, name, region");
      if (!stateRows) { setLoading(false); return; }

      // Get destination counts per state
      const { data: counts } = await supabase
        .from("destinations")
        .select("state_id")
        .then(({ data }) => {
          const countMap: Record<string, number> = {};
          (data ?? []).forEach((d: any) => {
            countMap[d.state_id] = (countMap[d.state_id] || 0) + 1;
          });
          return { data: countMap };
        });

      const mapped = stateRows.map((s: any) => ({
        id: s.id,
        name: s.name,
        region: s.region,
        dest_count: (counts as any)?.[s.id] || 0,
      }));

      setStates(mapped);
      setLoading(false);
    }
    fetchStates();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Stack.Screen options={{ title: "All States & UTs" }} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Group by region
  const grouped: Record<string, StateInfo[]> = {};
  states.forEach((s) => {
    const region = s.region || "Other";
    if (!grouped[region]) grouped[region] = [];
    grouped[region].push(s);
  });

  // Sort groups by REGION_ORDER
  const sortedRegions = Object.keys(grouped).sort((a, b) => {
    const ai = REGION_ORDER.indexOf(a);
    const bi = REGION_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "All States & UTs" }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>36 States & Union Territories</Text>
        <Text style={styles.headerSub}>{states.reduce((sum, s) => sum + s.dest_count, 0)} destinations across all of India</Text>
      </View>

      {sortedRegions.map((region) => (
        <View key={region} style={styles.regionSection}>
          <Text style={styles.regionTitle}>
            {REGION_ICONS[region] || "📍"} {region}
          </Text>
          {grouped[region]
            .sort((a, b) => b.dest_count - a.dest_count)
            .map((state) => (
              <TouchableOpacity
                key={state.id}
                style={styles.stateRow}
                onPress={() => router.push(`/region/${state.id}` as any)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.stateName}>{state.name}</Text>
                </View>
                <Text style={styles.stateCount}>{state.dest_count} dest.</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}

      <View style={{ height: spacing.xxl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingBottom: spacing.md },
  headerTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground },
  headerSub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  regionSection: { marginBottom: spacing.lg, paddingHorizontal: spacing.md },
  regionTitle: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.saffron,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  stateRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  stateName: { fontSize: fontSize.md, color: colors.foreground, fontWeight: "500" },
  stateCount: { fontSize: fontSize.xs, color: colors.mutedForeground },
  arrow: { fontSize: fontSize.md, color: colors.mutedForeground },
});
