// Reader-facing definitions for the destination `difficulty` grade
// (easy | moderate | hard | extreme). The bare word told the visitor
// nothing — hard to reach? hard to walk? — so every surface that shows
// the grade also shows this line. Keys match destinations.difficulty.
export const DIFFICULTY_EXPLAINER: Record<string, { en: string; hi: string }> = {
  easy: {
    en: "Easy: straightforward access and comfortable infrastructure — fine for first-timers and seniors.",
    hi: "आसान: पहुंच सीधी और सुविधाएं आरामदायक — पहली बार के यात्रियों और बुज़ुर्गों के लिए भी ठीक।",
  },
  moderate: {
    en: "Moderate: some long drives or walking involved — basic fitness is enough.",
    hi: "मध्यम: कुछ लंबी ड्राइव या पैदल चलना शामिल — सामान्य फिटनेस काफ़ी है।",
  },
  hard: {
    en: "Hard: high altitude, long rough-road access, or basic infrastructure — plan acclimatisation and buffer days.",
    hi: "कठिन: अधिक ऊंचाई, लंबे खराब रास्ते या बुनियादी सुविधाएं — एक्लिमेटाइज़ेशन और बफर दिन रखकर चलें।",
  },
  extreme: {
    en: "Extreme: remote, high-altitude terrain with minimal support — for experienced, self-sufficient travellers.",
    hi: "अत्यंत कठिन: दुर्गम, अधिक ऊंचाई वाला इलाका और न्यूनतम सुविधाएं — केवल अनुभवी, आत्मनिर्भर यात्रियों के लिए।",
  },
};

export function difficultyExplainer(
  difficulty: string | null | undefined,
  locale: string
): string | null {
  const entry = DIFFICULTY_EXPLAINER[(difficulty ?? "").toLowerCase()];
  if (!entry) return null;
  return locale === "hi" ? entry.hi : entry.en;
}
