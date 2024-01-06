import { ExpoConfig, ConfigContext } from "expo/config";

// process.env.NODE_ENV;
const ENV = "development";

export const APP_NAME = {
  development: "Stargazer Development Version",
  beta: "Stargazer BETA",
  production: "Stargazer",
};

export const VERSION = {
  development: "2.0.0",
  beta: "2.0.9",
  production: "2.0.0",
};

export const PACKAGE_NAME = {
  iosBETA: "com.voc.honkaistargazerbeta",
  androidBETA: "com.voc.honkai_stargazer_beta",
  ios: "com.voc.honkaistargazer",
  android: "com.voc.honkai_stargazer_gp",
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: askEnvDo({
    development: APP_NAME.development,
    beta: APP_NAME.beta,
    production: APP_NAME.production,
  }),
  slug: "honkai-stargazer",
  version: askEnvDo({
    development: VERSION.development,
    beta: VERSION.beta,
    production: VERSION.production,
  }),
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    googleServicesFile: "./GoogleService-Info.plist",
    supportsTablet: true,
    bundleIdentifier: askEnvDo({
      development: PACKAGE_NAME.iosBETA,
      beta: PACKAGE_NAME.iosBETA,
      production: PACKAGE_NAME.ios,
    }),
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
  },
  android: {
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/android-icon.png",
      backgroundColor: "#000000",
    },
    package: askEnvDo({
      development: PACKAGE_NAME.androidBETA,
      beta: PACKAGE_NAME.androidBETA,
      production: PACKAGE_NAME.android,
    }),
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "b9fe7661-b87f-485b-9509-cf28cddfe023",
    },
  },
  owner: "dalufishe",
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/b9fe7661-b87f-485b-9509-cf28cddfe023",
  },
  plugins: [
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "expo-media-library",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
        savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
        isAccessMediaLocationEnabled: true,
        requestLegacyExternalStorage: true,
      },
    ],
    "expo-build-properties",
  ],
});

function askEnvDo({
  development,
  beta,
  production,
}: {
  development: any;
  beta: any;
  production: any;
}) {
  if (ENV === "development") {
    return development;
  } else if (ENV === "beta") {
    return beta;
  } else if (ENV === "production") {
    return production;
  } else {
    return beta;
  }
}