import * as Updates from "expo-updates";
import { Alert } from "react-native";

export async function checkOtaUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();

      Alert.alert(
        "Versi baru tersedia",
        "Mulai ulang aplikasi diperlukan untuk menggunakan versi terbaru",
        [
          { text: "Abaikan", style: "cancel" },
          { text: "Mulai ulang", onPress: Updates.reloadAsync },
        ]
      );
    }
  } catch (error) {}
}
