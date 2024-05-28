import { useEffect, useState } from "react";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import useTextLanguage from "../language/TextLanguage/useTextLanguage";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import WallPaper from "../components/global/WallPaper/WallPaper";
import { LinearGradient } from "expo-linear-gradient";
import { SCREENS } from "../constant/screens";
import HeaderAlpha from "../components/global/HeaderAlpha/HeaderAlpha";
import { LOCALES } from "../../locales";

export default function ActionOrderSimulatorScreen() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();

  //Read data from character's team...

  return (
    <View style={{ flex: 1 }} className="overflow-hidden">
      <StatusBar style="dark" />

      <WallPaper isBlur />
      <LinearGradient
        className="absolute w-full h-full"
        colors={["#00000080", "#00000020"]}
      />

      {/** Body */}
      <View style={{ flex: 1, backgroundColor: "#CCC", flexDirection: "row", padding: 24 }}>
        {/** Left - Showing Team Data & Params */}
        <View style={{ flex: 0.45, backgroundColor: "#555" }}>
          <HeaderAlpha
            canOverLay={false}
            children={
              (<Text
                className="text-[20px] font-[HY65] text-[#FFFFFF] pb-[0px]"
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                {LOCALES[appLanguage].LotterySimulatorRecord}
              </Text>)
            }
          />
        </View>

        {/** Right - Showing Flow and Simuated List */}
        <View style={{ flex: 0.55, backgroundColor: "#100" }}>

        </View>
      </View>

    </View>
  )

}