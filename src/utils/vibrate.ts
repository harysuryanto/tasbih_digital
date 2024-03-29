import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/**
 * Works only on mobile (android and ios). Nothing happens on other platforms.
 */
export const vibrate = (power: "light" | "medium" | "heavy") => {
  if (Platform.OS === "android" || Platform.OS === "ios") {
    if (power === "light") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (power === "medium") {
      Haptics.selectionAsync();
    } else if (power === "heavy") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }
};
