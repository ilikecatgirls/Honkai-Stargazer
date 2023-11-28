import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/global/layout/Header";
import { SCREENS } from "../constant/screens";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamList } from "../types/navigation";

export default function CharacterScreen() {
  const route = useRoute<RouteProp<ParamList, "Character">>();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ImageBackground
        className="absolute w-full h-full"
        // 把背景關掉
        source={require("../../assets/images/test-bg.png")}
        // placeholder={blurhash}
        contentFit="cover"
        blurRadius={10}
      />
      <LinearGradient
        className="absolute w-full h-full"
        colors={["#00000080", "#00000020"]}
      />
      <Header Icon={SCREENS.CharacterPage.icon}>{route.params.name}</Header>
      <LinearGradient
        className="w-full h-[400px] absolute bottom-0"
        colors={["#00000000", "#000000"]}
      />
    </View>
  );
}