import React from "react";
import ScreenWrapper from "../../../src/components/ScreenWrapper";
import { Appbar, List, Switch, Text } from "react-native-paper";
import useSettingsStore from "../../../src/stores/useSettingsStore";
import { View } from "react-native";
import MyBannerAd from "../../../src/components/MyBannerAd";
import appJson from "../../../app.json";

export default function SettingsScreen() {
  const {
    vibrationEvery33,
    vibrationEvery100,
    setVibrationEvery33,
    setVibrationEvery100,
  } = useSettingsStore();

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
      </View>
      <Text variant="bodySmall" style={{ padding: 8, textAlign: "center" }}>
        Versi {appJson.expo.version}
      </Text>
      <MyBannerAd adUnitId="ca-app-pub-9675217052405779/3677822299" />
    </ScreenWrapper>
  );
}
