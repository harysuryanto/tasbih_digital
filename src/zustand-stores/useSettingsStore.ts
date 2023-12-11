import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  vibrationEvery33: boolean;
  vibrationEvery100: boolean;
  setVibrationEvery33: (vibrate: boolean) => void;
  setVibrationEvery100: (vibrate: boolean) => void;
};

const getCurrentDateTime = (): number => {
  const currentDatetime = new Date();
  return currentDatetime.getTime();
};

const useSettingsStore = create<Store>()(
  persist(
    (set) => ({
      vibrationEvery33: true,
      vibrationEvery100: false,
      setVibrationEvery33: (vibrate) =>
        set(() => ({ vibrationEvery33: vibrate })),
      setVibrationEvery100: (vibrate) =>
        set(() => ({ vibrationEvery100: vibrate })),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        vibrationEvery33: state.vibrationEvery33,
        vibrationEvery100: state.vibrationEvery100,
        updatedAt: getCurrentDateTime(),
      }),
    }
  )
);

export default useSettingsStore;
