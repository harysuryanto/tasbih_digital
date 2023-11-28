import * as Updates from "expo-updates";
import { Alert } from "react-native";
import Toast from "react-native-simple-toast";

export async function checkOtaUpdate() {
  try {
    Toast.show("Memeriksa pembaharuan...", Toast.SHORT);
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      Toast.show("Mengunduh versi terbaru...", Toast.LONG);
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
  } catch (error) {
    alert(error);
  }
}
