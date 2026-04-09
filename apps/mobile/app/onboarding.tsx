import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { usePreferences, UserPreferences } from "../hooks/usePreferences";

const { width } = Dimensions.get("window");

const TRAVELER_TYPES = [
  { id: "solo", icon: "🎒", label: "Solo", desc: "Independent explorer" },
  { id: "couple", icon: "💑", label: "Couple", desc: "Romantic getaway" },
  { id: "family", icon: "👨‍👩‍👧", label: "Family", desc: "Traveling with kids" },
  { id: "biker", icon: "🏍️", label: "Biker", desc: "Road warrior" },
  { id: "backpacker", icon: "🏕️", label: "Backpacker", desc: "Budget adventurer" },
  { id: "spiritual", icon: "🕉️", label: "Spiritual", desc: "Inner journey" },
];

const PRIORITIES = [
  { id: "kids-safety", icon: "👶", label: "Kids Safety", desc: "Family-friendly, good medical" },
  { id: "budget", icon: "💰", label: "Budget", desc: "Under ₹2,000/day" },
  { id: "offbeat", icon: "🗺️", label: "Offbeat", desc: "Zero tourists, raw India" },
  { id: "infrastructure", icon: "📶", label: "Infrastructure", desc: "Network, ATMs, hospitals" },
  { id: "adventure", icon: "⛰️", label: "Adventure", desc: "Treks, rafting, high altitude" },
  { id: "spiritual", icon: "🙏", label: "Spiritual", desc: "Temples, ashrams, peace" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function OnboardingScreen() {
  const { savePreferences } = usePreferences();
  const [step, setStep] = useState(0);
  const [travelerType, setTravelerType] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [travelMonth, setTravelMonth] = useState(0);

  function togglePriority(id: string) {
    setPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  async function finish() {
    const prefs: UserPreferences = { travelerType, priorities, travelMonth };
    await savePreferences(prefs);
    router.replace("/(tabs)");
  }

  return (
    <View style={s.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Progress dots */}
      <View style={s.progress}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[s.dot, step >= i && s.dotActive]} />
        ))}
      </View>

      {/* Step 0: Who are you? */}
      {step === 0 && (
        <ScrollView contentContainerStyle={s.stepContent}>
          <Text style={s.stepTag}>STEP 1 OF 3</Text>
          <Text style={s.stepTitle}>Who are you?</Text>
          <Text style={s.stepDesc}>This helps us recommend the right destinations.</Text>

          <View style={s.grid}>
            {TRAVELER_TYPES.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[s.card, travelerType === t.id && s.cardSelected]}
                onPress={() => setTravelerType(t.id)}
                activeOpacity={0.85}
              >
                <Text style={s.cardIcon}>{t.icon}</Text>
                <Text style={s.cardLabel}>{t.label}</Text>
                <Text style={s.cardDesc}>{t.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[s.nextBtn, !travelerType && s.nextBtnDisabled]}
            onPress={() => travelerType && setStep(1)}
            disabled={!travelerType}
          >
            <Text style={s.nextBtnText}>Next →</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Step 1: What matters most? */}
      {step === 1 && (
        <ScrollView contentContainerStyle={s.stepContent}>
          <Text style={s.stepTag}>STEP 2 OF 3</Text>
          <Text style={s.stepTitle}>What matters most?</Text>
          <Text style={s.stepDesc}>Pick up to 3 priorities. We'll filter destinations accordingly.</Text>

          <View style={s.grid}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[s.card, priorities.includes(p.id) && s.cardSelected]}
                onPress={() => togglePriority(p.id)}
                activeOpacity={0.85}
              >
                <Text style={s.cardIcon}>{p.icon}</Text>
                <Text style={s.cardLabel}>{p.label}</Text>
                <Text style={s.cardDesc}>{p.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.btnRow}>
            <TouchableOpacity style={s.backBtn} onPress={() => setStep(0)}>
              <Text style={s.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.nextBtn, priorities.length === 0 && s.nextBtnDisabled]}
              onPress={() => priorities.length > 0 && setStep(2)}
              disabled={priorities.length === 0}
            >
              <Text style={s.nextBtnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Step 2: When are you traveling? */}
      {step === 2 && (
        <ScrollView contentContainerStyle={s.stepContent}>
          <Text style={s.stepTag}>STEP 3 OF 3</Text>
          <Text style={s.stepTitle}>When are you traveling?</Text>
          <Text style={s.stepDesc}>We'll show destinations that score highest for your month.</Text>

          <View style={s.monthGrid}>
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={m}
                style={[s.monthCard, travelMonth === i + 1 && s.monthCardSelected]}
                onPress={() => setTravelMonth(i + 1)}
                activeOpacity={0.85}
              >
                <Text style={[s.monthText, travelMonth === i + 1 && s.monthTextSelected]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={s.skipBtn} onPress={() => setTravelMonth(0)}>
            <Text style={s.skipBtnText}>No specific month — show me everything</Text>
          </TouchableOpacity>

          <View style={s.btnRow}>
            <TouchableOpacity style={s.backBtn} onPress={() => setStep(1)}>
              <Text style={s.backBtnText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.nextBtn} onPress={finish}>
              <Text style={s.nextBtnText}>Let's Go ✨</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Skip */}
      {step === 0 && (
        <TouchableOpacity style={s.skipAll} onPress={finish}>
          <Text style={s.skipAllText}>Skip for now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  progress: { flexDirection: "row", justifyContent: "center", gap: 8, paddingTop: 60, paddingBottom: spacing.md },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.muted },
  dotActive: { backgroundColor: colors.vermillion, width: 24 },
  stepContent: { paddingHorizontal: spacing.lg, paddingBottom: 40 },
  stepTag: { fontSize: 10, fontWeight: "700", letterSpacing: 2, color: colors.vermillion, marginTop: spacing.lg },
  stepTitle: { fontSize: fontSize["3xl"], fontWeight: "800", color: colors.foreground, marginTop: spacing.sm },
  stepDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, marginBottom: spacing.xl },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  card: {
    width: (width - spacing.lg * 2 - spacing.sm) / 2,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardSelected: { borderColor: colors.vermillion, backgroundColor: colors.vermillion + "10" },
  cardIcon: { fontSize: 28 },
  cardLabel: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, marginTop: spacing.sm },
  cardDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  monthGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, justifyContent: "center" },
  monthCard: {
    width: (width - spacing.lg * 2 - spacing.sm * 5) / 4,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  monthCardSelected: { borderColor: colors.vermillion, backgroundColor: colors.vermillion + "10" },
  monthText: { fontSize: fontSize.base, fontWeight: "700", color: colors.mutedForeground },
  monthTextSelected: { color: colors.vermillion },
  nextBtn: { flex: 1, backgroundColor: colors.foreground, paddingVertical: 16, borderRadius: borderRadius.lg, alignItems: "center", marginTop: spacing.xl },
  nextBtnDisabled: { opacity: 0.3 },
  nextBtnText: { fontSize: fontSize.base, fontWeight: "700", color: colors.background },
  backBtn: { paddingVertical: 16, paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  backBtnText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  btnRow: { flexDirection: "row", alignItems: "center" },
  skipBtn: { marginTop: spacing.lg, alignItems: "center" },
  skipBtnText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  skipAll: { position: "absolute", bottom: 40, left: 0, right: 0, alignItems: "center" },
  skipAllText: { fontSize: fontSize.sm, color: colors.mutedForeground },
});
