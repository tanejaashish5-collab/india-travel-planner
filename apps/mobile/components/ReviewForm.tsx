import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useAuth } from "../hooks/useAuth";
import { useSubmitReview } from "../hooks/useReviews";

const TRAVELER_TYPES = ["solo", "couple", "family", "biker", "backpacker", "photographer", "first-timer", "senior"] as const;
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS = Array.from({ length: 7 }, (_, i) => 2020 + i);

export default function ReviewForm({ destinationId, onSubmitted }: { destinationId: string; onSubmitted?: () => void }) {
  const { user } = useAuth();
  const { submitReview, loading, error } = useSubmitReview();

  const [rating, setRating] = useState(0);
  const [travelerType, setTravelerType] = useState<string>("");
  const [visitMonth, setVisitMonth] = useState<number | null>(null);
  const [visitYear, setVisitYear] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setLocalError(null);
    if (rating === 0) { setLocalError("Please select a star rating."); return; }
    if (text.length < 10) { setLocalError("Review must be at least 10 characters."); return; }
    if (!travelerType) { setLocalError("Please select your traveler type."); return; }

    const ok = await submitReview({
      destination_id: destinationId,
      rating,
      text,
      traveler_type: travelerType,
      visit_month: visitMonth,
      visit_year: visitYear,
    });
    if (ok) {
      setSuccess(true);
      onSubmitted?.();
    }
  }

  if (!user) {
    return (
      <View style={s.card}>
        <Text style={s.title}>Share your experience</Text>
        <Text style={s.helper}>Sign in to leave a review for this destination.</Text>
        <TouchableOpacity style={s.primaryBtn} onPress={() => router.push("/(tabs)/profile")}>
          <Text style={s.primaryBtnText}>Sign in to write a review</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (success) {
    return (
      <View style={[s.card, s.successCard]}>
        <Text style={s.successIcon}>✓</Text>
        <Text style={s.successTitle}>Review submitted</Text>
        <Text style={s.successBody}>Pending moderation — thanks for sharing.</Text>
      </View>
    );
  }

  return (
    <View style={s.card}>
      <Text style={s.title}>Write a review</Text>

      {/* Star rating */}
      <Text style={s.label}>Your rating</Text>
      <View style={s.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)} accessibilityLabel={`Rate ${star} stars`}>
            <Text style={[s.star, { color: star <= rating ? "#fbbf24" : colors.border }]}>
              {star <= rating ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Traveler type */}
      <Text style={s.label}>Traveler type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
        {TRAVELER_TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.chip, travelerType === t && s.chipActive]}
            onPress={() => setTravelerType(t)}
          >
            <Text style={[s.chipText, travelerType === t && s.chipTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Visit month */}
      <Text style={s.label}>Visit month (optional)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
        {MONTHS.map((m, i) => {
          const idx = i + 1;
          return (
            <TouchableOpacity
              key={m}
              style={[s.chip, visitMonth === idx && s.chipActive]}
              onPress={() => setVisitMonth(visitMonth === idx ? null : idx)}
            >
              <Text style={[s.chipText, visitMonth === idx && s.chipTextActive]}>{m.slice(0, 3)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Visit year */}
      <Text style={s.label}>Visit year (optional)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
        {YEARS.map((y) => (
          <TouchableOpacity
            key={y}
            style={[s.chip, visitYear === y && s.chipActive]}
            onPress={() => setVisitYear(visitYear === y ? null : y)}
          >
            <Text style={[s.chipText, visitYear === y && s.chipTextActive]}>{y}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Text */}
      <Text style={s.label}>Your experience</Text>
      <TextInput
        style={s.textArea}
        multiline
        numberOfLines={5}
        placeholder="What did you love, what surprised you, any tips for future travelers..."
        placeholderTextColor={colors.mutedForeground}
        value={text}
        onChangeText={(v) => setText(v.slice(0, 2000))}
        maxLength={2000}
      />
      <Text style={s.counter}>{text.length}/2000</Text>

      {(localError || error) && (
        <Text style={s.error}>{localError || error}</Text>
      )}

      <TouchableOpacity style={[s.primaryBtn, loading && { opacity: 0.6 }]} onPress={handleSubmit} disabled={loading}>
        <Text style={s.primaryBtnText}>{loading ? "Submitting..." : "Submit review"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.md },
  successCard: { alignItems: "center", borderColor: colors.score5 + "50", backgroundColor: colors.score5 + "10" },
  successIcon: { fontSize: 36, color: colors.score5, marginBottom: spacing.xs },
  successTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.score5 },
  successBody: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4, textAlign: "center" },
  title: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },
  helper: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.md },
  label: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, marginTop: spacing.md, marginBottom: spacing.sm, textTransform: "uppercase", letterSpacing: 0.5 },
  starRow: { flexDirection: "row", gap: spacing.xs },
  star: { fontSize: 32 },
  chipRow: { flexDirection: "row", gap: 6, paddingRight: spacing.md },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, marginRight: 6 },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primary + "15" },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, textTransform: "capitalize" },
  chipTextActive: { color: colors.primary },
  textArea: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: fontSize.sm, color: colors.foreground, minHeight: 120, textAlignVertical: "top" },
  counter: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "right", marginTop: 4 },
  error: { fontSize: fontSize.sm, color: colors.vermillion, marginTop: spacing.sm },
  primaryBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.md, paddingVertical: 14, alignItems: "center", marginTop: spacing.md },
  primaryBtnText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.background },
});
