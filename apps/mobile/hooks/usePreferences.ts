import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFS_KEY = "nakshiq_preferences";
const ONBOARDED_KEY = "nakshiq_onboarded";

export interface UserPreferences {
  travelerType: string; // solo, couple, family, biker, backpacker, spiritual
  priorities: string[]; // kids-safety, budget, offbeat, infrastructure, adventure, spiritual
  travelMonth: number; // 1-12, 0 = no preference
}

const DEFAULT_PREFS: UserPreferences = {
  travelerType: "couple",
  priorities: [],
  travelMonth: 0,
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFS);
  const [onboarded, setOnboarded] = useState<boolean | null>(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(PREFS_KEY),
      AsyncStorage.getItem(ONBOARDED_KEY),
    ]).then(([prefsRaw, onboardedRaw]) => {
      if (prefsRaw) setPreferences(JSON.parse(prefsRaw));
      setOnboarded(onboardedRaw === "true");
      setLoading(false);
    });
  }, []);

  const savePreferences = useCallback(async (prefs: UserPreferences) => {
    setPreferences(prefs);
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    await AsyncStorage.setItem(ONBOARDED_KEY, "true");
    setOnboarded(true);
  }, []);

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(ONBOARDED_KEY);
    setOnboarded(false);
  }, []);

  return { preferences, onboarded, loading, savePreferences, resetOnboarding };
}
