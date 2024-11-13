import Constants from "expo-constants";
import React from "react";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { Appbar, List, Switch, Text } from "react-native-paper";
import useSettingsStore from "@/src/stores/useSettingsStore";
import { View } from "react-native";
import MyBannerAd from "@/src/components/MyBannerAd";
import { useAuth } from "@/src/contexts/AuthContext";

export default function SettingsScreen() {
  const {
    vibrationEvery33,
    vibrationEvery100,
    setVibrationEvery33,
    setVibrationEvery100,
  } = useSettingsStore();
  const { authState, signOut } = useAuth();
  const email = authState?.email ?? "";

  return (
    <ScreenWrapper withScrollView={false}>
      <Appbar.Header>
        <Appbar.Content title="Pengaturan" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <List.Section>
          <List.Subheader>Getaran</List.Subheader>
          <List.Item
            title="Getar panjang di kelipatan 33"
            right={() => (
              <Switch
                value={vibrationEvery33}
                onValueChange={() => setVibrationEvery33(!vibrationEvery33)}
              />
            )}
          />
          <List.Item
            title="Getar panjang di kelipatan 100"
            right={() => (
              <Switch
                value={vibrationEvery100}
                onValueChange={() => setVibrationEvery100(!vibrationEvery100)}
              />
            )}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Akun ({email})</List.Subheader>
          <List.Item title="Keluar" onPress={signOut} />
        </List.Section>
      </View>
      <Text variant="bodySmall" style={{ padding: 8, textAlign: "center" }}>
        Versi {Constants.expoConfig?.version}
      </Text>
      <MyBannerAd adUnitId="ca-app-pub-9675217052405779/3677822299" />
    </ScreenWrapper>
  );
}
