const { withAndroidManifest } = require("@expo/config-plugins");

/**
 * Custom Expo Config Plugin to modify AndroidManifest.xml
 * @param {import('@expo/config-plugins').ExpoConfig} config
 * @returns {import('@expo/config-plugins').ExpoConfig}
 */
function withAppwriteAuth(config) {
  return withAndroidManifest(config, async (config) => {
    const appManifest = config.modResults;

    appManifest.manifest.application[0].activity = [
      ...(appManifest.manifest.application[0].activity || []),
      {
        $: {
          "android:name": "io.appwrite.views.CallbackActivity",
          "android:exported": "true",
        },
        "intent-filter": [
          {
            $: { "android:label": "android_web_auth" },
            action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
            category: [
              { $: { "android:name": "android.intent.category.DEFAULT" } },
              { $: { "android:name": "android.intent.category.BROWSABLE" } },
            ],
            data: [
              {
                $: {
                  "android:scheme": "appwrite-callback-6710b5a600394e11084c",
                },
              },
            ],
          },
        ],
      },
    ];

    return config;
  });
}

module.exports = withAppwriteAuth;
