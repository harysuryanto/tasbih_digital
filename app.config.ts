import { ConfigContext, ExpoConfig } from "expo/config";

const packageJson = require("./package.json");
const VERSION: string = packageJson.version;
const APP_VARIANT = process.env.APP_VARIANT;
const IS_DEV = APP_VARIANT === "development";
const NAME: string = `Tasbih Digital${IS_DEV ? " Dev" : ""}`;

module.exports = (_: ConfigContext): Partial<ExpoConfig> => {
  return {
    name: NAME,
    slug: "tasbih-digital",
    version: VERSION,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "tasbih-digital",
    userInterfaceStyle: "automatic",
    backgroundColor: "#000000",
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV
        ? "com.harysuryanto.tasbihdigital.dev"
        : "com.harysuryanto.tasbihdigital",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: IS_DEV
        ? "com.harysuryanto.tasbihdigital.dev"
        : "com.harysuryanto.tasbihdigital",
      // TODO: Make this automaticly incremented
      versionCode: 2,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      ["expo-build-properties", { ios: { useFrameworks: "static" } }],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "5f76de24-53f5-457f-93cf-9c374e0af0fd",
      },
      "react-native-google-mobile-ads": {
        android_app_id: "ca-app-pub-9675217052405779~3502939772",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/5f76de24-53f5-457f-93cf-9c374e0af0fd",
    },
  };
};
