import { View } from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/global/Header/Header";
import { StatusBar } from "expo-status-bar";
import { SCREENS } from "../constant/screens";
import CharList from "../components/CharacterListScreen/CharList/CharList";
import WallPaper from "../components/global/WallPaper/WallPaper";
import CharAction from "../components/CharacterListScreen/CharAction/CharAction";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";

export default function CharacterListScreen() {
  const { language } = useAppLanguage();
  const scrollViewRef = useRef();
  return (
    <View style={{ flex: 1 }} className="overflow-hidden">
      <StatusBar style="dark" />
      <WallPaper isBlur />
      <LinearGradient
        className="absolute w-full h-full"
        colors={["#00000080", "#00000020"]}
      />

      <Header Icon={SCREENS.CharacterListPage.icon} scrollViewRef={scrollViewRef}>
        {SCREENS.CharacterListPage.getName(language)}
      </Header>
      <>
        <CharList scrollViewRef={scrollViewRef} />
        <CharAction />
      </>
      <LinearGradient
        pointerEvents="none"
        className="w-full h-[177px] absolute bottom-0 z-40"
        colors={["#00000000", "#000000"]}
      />
      <LinearGradient
        className="w-full h-[600px] absolute bottom-0"
        colors={["#00000000", "#000000"]}
      />
    </View>
  );
}
