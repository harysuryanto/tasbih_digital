import { ConfigContext, ExpoConfig } from "expo/config";

const packageJson = require("./package.json");
const VERSION: string = packageJson.version;
const NAME: string = `Tasbih Digital`;
const withAppwriteAuth = require("./withAppwriteAuth");

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
      bundleIdentifier: "com.harysuryanto.tasbihdigital",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleTypeRole: "Editor",
            CFBundleURLName: "io.appwrite",
            CFBundleURLSchemes: ["appwrite-callback-6710b5a600394e11084c"],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.harysuryanto.tasbihdigital",
      versionCode: 6,
      permissions: ["com.google.android.gms.permission.AD_ID"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 34,
            minSdkVersion: 34,
            targetSdkVersion: 34,
          },
          ios: { useFrameworks: "static" },
        },
      ],
      [withAppwriteAuth], // Ensure it's wrapped as a tuple
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
      // "react-native-google-mobile-ads": {
      //   android_app_id: "ca-app-pub-9675217052405779~3502939772",
      // },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/5f76de24-53f5-457f-93cf-9c374e0af0fd",
    },
  };
};
