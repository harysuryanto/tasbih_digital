import React, { useState } from "react";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

type Props = {
  adUnitId: string;
};

export default function MyBannerAd({ adUnitId }: Props) {
  const [error, setError] = useState<Error | undefined>();

  if (error) return null;

  return (
    <BannerAd
      unitId={__DEV__ ? TestIds.ADAPTIVE_BANNER! : adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      onAdFailedToLoad={(error) => setError(error)}
      requestOptions={{
        keywords: ["islam", "muslim", "tasbeeh", "tasbih", "beeds", "counter"],
      }}
    />
  );
}
