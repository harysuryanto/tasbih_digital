import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useTasbeehsStore from "../../src/zustand-stores/useTasbeehsStore";
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { Appbar, IconButton, Snackbar } from "react-native-paper";
import { Text } from "react-native-paper";
import { vibrate } from "../../src/utils/vibrate";
import useSettingsStore from "../../src/zustand-stores/useSettingsStore";
import MyBannerAd from "../../src/components/MyBannerAd";

export default function index() {
  const router = useRouter();

  const { tasbeehId } = useLocalSearchParams();
  const { tasbeehs, setCount, increment, decrement, reset } =
    useTasbeehsStore();
  const tasbeeh = tasbeehs.find((value) => value.id === tasbeehId);
  const { vibrationEvery33, vibrationEvery100 } = useSettingsStore();
  const [countBeforeResetted, setCountBeforeResetted] = useState<
    number | undefined
  >(undefined);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleReset = () => {
    reset(tasbeeh!.id);
    setSnackbarVisible(true);
  };

  const handleIncrement = useCallback(() => {
    if (
      (vibrationEvery33 && tasbeeh!.count % 33 == 0) ||
      (vibrationEvery100 && tasbeeh!.count % 100 == 0)
    ) {
      vibrate("heavy");
    } else {
      vibrate("light");
    }

    increment(tasbeeh!.id);
  }, [tasbeeh?.count]);

  const handleDecrement = () => {
    vibrate("light");
    decrement(tasbeeh!.id);
  };

  useEffect(() => {
    if (tasbeeh?.count !== 0) {
      setCountBeforeResetted(tasbeeh?.count);
    }
  }, [tasbeeh?.count]);

  return (
    <ScreenWrapper withScrollView={false}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            router.canGoBack() ? router.back() : router.replace("/home");
          }}
        />
        <Appbar.Content title={tasbeeh?.name} />
      </Appbar.Header>
      <View style={styles.body}>
        <Text style={styles.count}>{tasbeeh!.count}</Text>
        <IconButton
          icon="refresh"
          size={30}
          disabled={tasbeeh?.count === 0}
          style={{ opacity: tasbeeh?.count === 0 ? 0 : 1 }}
          onPress={handleReset}
        />
        <IconButton icon="menu-up" size={160} onPress={handleIncrement} />
        <IconButton
          icon="menu-down"
          size={80}
          disabled={tasbeeh?.count === 0}
          style={{ opacity: tasbeeh?.count === 0 ? 0 : 1 }}
          onPress={handleDecrement}
        />
      </View>
      <MyBannerAd adUnitId="ca-app-pub-9675217052405779/5673430244" />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Urungkan",
          onPress: () => setCount(tasbeeh!.id, countBeforeResetted!),
        }}
      >
        Penghitung dikembalikan ke 0
      </Snackbar>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontSize: 120,
  },
});
