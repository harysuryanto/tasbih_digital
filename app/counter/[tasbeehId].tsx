import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useTasbeehsStore from "../../src/zustand-stores/useTasbeehsStore";
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { Appbar, IconButton, Snackbar } from "react-native-paper";
import { Text } from "react-native-paper";
import { vibrate } from "../../src/utils/vibrate";

export default function index() {
  const router = useRouter();

  const { tasbeehId } = useLocalSearchParams();
  const { tasbeehs, setCount, increment, decrement, reset } =
    useTasbeehsStore();
  const tasbeeh = tasbeehs.find((value) => value.id === tasbeehId);
  const [countBeforeResetted, setCountBeforeResetted] = useState<
    number | undefined
  >(undefined);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleReset = () => {
    reset(tasbeeh!.id);
    setSnackbarVisible(true);
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
        <IconButton
          icon="menu-up"
          size={160}
          onPress={() => {
            vibrate("light");
            increment(tasbeeh!.id);
          }}
        />
        <IconButton
          icon="menu-down"
          size={80}
          disabled={tasbeeh?.count === 0}
          style={{ opacity: tasbeeh?.count === 0 ? 0 : 1 }}
          onPress={() => {
            vibrate("light");
            decrement(tasbeeh!.id);
          }}
        />
      </View>
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
