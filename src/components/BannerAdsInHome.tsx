import React from "react";
import MyBannerAd from "./MyBannerAd";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export default React.memo(
  function BannerAdsInHome({ containerStyle }: Props) {
    return (
      <View style={containerStyle}>
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/2293939504" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/6465420126" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/9454545548" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/7476137510" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/5181146668" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/2362523583" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/6163055846" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/3839256786" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/3868064998" />
        <MyBannerAd adUnitId="ca-app-pub-9675217052405779/7586930102" />
      </View>
    );
  },
  () => true
);
