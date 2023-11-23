import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const vibrate = (power: "light" | "medium" | "heavy") => {
  if (Platform.OS === "android" || Platform.OS === "ios") {
    if (power === "light") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (power === "medium") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (power === "heavy") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }
};