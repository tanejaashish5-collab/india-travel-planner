import { View, Text, StyleSheet } from "react-native";
import { colors, borderRadius } from "../lib/theme";

const SCORE_COLORS: Record<number, string> = {
  5: colors.score5,
  4: colors.score4,
  3: colors.score3,
  2: colors.score2,
  1: colors.score1,
};

const SCORE_LABELS: Record<number, string> = {
  5: "Perfect",
  4: "Great",
  3: "Okay",
  2: "Poor",
  1: "Avoid",
};

const SIZE_CONFIG = {
  sm: { paddingHorizontal: 6, paddingVertical: 2, fontSize: 10 },
  md: { paddingHorizontal: 10, paddingVertical: 4, fontSize: 12 },
  lg: { paddingHorizontal: 14, paddingVertical: 6, fontSize: 16 },
} as const;

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreBadge({
  score,
  size = "md",
  showLabel = false,
}: ScoreBadgeProps) {
  const color = SCORE_COLORS[score] || colors.mutedForeground;
  const cfg = SIZE_CONFIG[size];
  const label = SCORE_LABELS[score] || "";

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color + "20",
          paddingHorizontal: cfg.paddingHorizontal,
          paddingVertical: cfg.paddingVertical,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color, fontSize: cfg.fontSize, fontWeight: "700" },
        ]}
      >
        {score}/5{showLabel && label ? ` ${label}` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: "monospace",
  },
});
