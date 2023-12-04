import "./app.d";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { ClickOutsideProvider } from "react-native-click-outside";
import CharacterListScreen from "./src/screens/CharacterListScreen";
import { SCREENS } from "./src/constant/screens";
import CharacterScreen from "./src/screens/CharacterScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import LightconeListScreen from "./src/screens/LightconeListScreen";
import LightconeScreen from "./src/screens/LightconeScreen";
import FixedContext from "./src/components/global/Fixed/FixedContext";
import FixedProvider from "./src/components/global/Fixed/FixedProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // 在组件加载后设置导航栏
    async function setupNavigationBar() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#00000000");
    }

    if (Platform.OS === "android") {
      setupNavigationBar();
    }
  }, []);
  const [fontsLoaded] = useFonts({
    NotoSansSC: require("./assets/fonts/NotoSansSC-Regular.ttf"),
    HY55: require("./assets/fonts/HYRunYuan-55W.ttf"),
    HY65: require("./assets/fonts/HYRunYuan-65W.ttf"),
    HY75: require("./assets/fonts/HYRunYuan-75W.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClickOutsideProvider>
        <FixedProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            {/* <StatusBar hidden /> */}
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  animation: Platform.OS === "ios" ? "default" : "none",
                }}
              >
                <Stack.Screen
                  name={SCREENS.HomePage.id}
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREENS.CharacterListPage.id}
                  component={CharacterListScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREENS.CharacterPage.id}
                  component={CharacterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREENS.LightconeListPage.id}
                  component={LightconeListScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={SCREENS.LightconeScreen.id}
                  component={LightconeScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </FixedProvider>
      </ClickOutsideProvider>
    </GestureHandlerRootView>
  );
}
