import { View } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import Header from "../components/global/Header/Header";
import { SCREENS } from "../constant/screens";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import { dynamicHeightBottomBar, dynamicHeightHeader, dynamicHeightHeaderValue } from "../constant/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const { language } = useAppLanguage();

  return (
    <View style={{ flex: 1 }} className="overflow-hidden">
      <StatusBar style="dark" />
      <Header Icon={SCREENS.MapPage.icon}>
        {SCREENS.MapPage.getName(language)}
      </Header>
      <WebView
        style={{ marginTop: dynamicHeightHeaderValue, marginBottom: dynamicHeightBottomBar}}
        source={{
          uri: "https://act.hoyolab.com/sr/app/interactive-map/index.html",
        }}
      />
    </View>
  );
}
