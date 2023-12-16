import { NetInfoStateType, useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

type Props = {
  adUnitId: string;
  /***
   * @default false
   */
  keepLayoutOnLoadFailed?: boolean;
};

function MyBannerAd({ adUnitId, keepLayoutOnLoadFailed = false }: Props) {
  const { type: networkType } = useNetInfo();

  const [isWifi, setIsWifi] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setIsWifi(networkType === NetInfoStateType.wifi);
  }, [networkType]);

  if ((!isWifi || error) && !keepLayoutOnLoadFailed) return null;

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

export default React.memo(MyBannerAd);
