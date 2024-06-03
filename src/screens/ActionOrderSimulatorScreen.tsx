import { useEffect, useState } from "react";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import useTextLanguage from "../language/TextLanguage/useTextLanguage";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import WallPaper from "../components/global/WallPaper/WallPaper";
import { LinearGradient } from "expo-linear-gradient";
import { SCREENS } from "../constant/screens";
import HeaderAlpha from "../components/global/HeaderAlpha/HeaderAlpha";
import { LOCALES } from "../../locales";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RouteProp, useNavigation, useRoute, } from "@react-navigation/native";
import { ParamList } from "../../../types/navigation";
import { TeamData, TeamListItem } from "./ActionOrderListScreen";
import CharCard from "../components/global/CharCard/CharCard";

export default function ActionOrderSimulatorScreen() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, "ActionOrderSimulator">>();

  var teamData = route.params?.selectedTeamData;

  const InfoBtn = require("../../assets/icons/info.png");
  const BackBtn = require("../../assets/icons/Back.svg");

  console.log(route.params)

  const handleClose = () => {
    navigation.goBack();
  };

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
      <View style={{ flex: 1, backgroundColor: "#CCCCCC22", flexDirection: "row", padding: 24 }}>
        {/** Left - Showing Team Data & Params */}
        <View style={{ flex: 0.40, backgroundColor: "#55555544" }}>
          {/** Header of Page (Left only) */}
          <View>
            <View
              className="w-full"
              style={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row", height: 40, paddingTop: 8 }}
            >
              {/* 左邊叉叉 */}
              <TouchableOpacity
                activeOpacity={0.35}
                onPress={handleClose}
                style={{ alignItems: "center", justifyContent: "center", height: 40, width: 40 }}
              >
                <View style={{ width: 40, height: 40, backgroundColor: "#FFFFFF08", borderRadius: 60 }}>
                  <Image cachePolicy="none"
                    style={{ width: 32, height: 32, justifyContent: "center", alignItems: "center", margin: 4 }}
                    source={BackBtn}
                  />
                </View>

              </TouchableOpacity>

              {/* 中間主體 */}
              <View
                style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text style={{ color: "#FFF", fontSize: 18 }}>{teamData?.teamName}</Text>
                <Text style={{ color: "#FFFFFF64", fontSize: 14 }}>{getDisplayDateByUnix(teamData?.teamBuildDate)}</Text>
              </View>

              {/* 右邊按鈕 */}
              {
                <View
                  className=""
                  style={{ alignItems: "center", justifyContent: "center", width: 40 }}
                >{
                    <Image cachePolicy="none"
                      style={{ width: 24, height: 24 }}
                      source={InfoBtn}
                    />
                  }</View>
              }
            </View>
          </View>

          <View style={{ height: 22 }}></View>

          {/** Showing Character Status, Level & Basic info */}
          <View style={{ backgroundColor: "#F3F9FFCD", flex: 1, borderRadius: 8, borderTopRightRadius: 20 }}>
            <View style={{ padding: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, }}>角色</Text>
                <View style={{ flex: 1 }}></View>
                <Text style={{ fontSize: 18, }}>編輯</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: 'row', paddingTop: 8,}}>
                <View style={{ width: 6 }} />
                  <ScrollView horizontal={true} style={{width:"100%", marginLeft : -12,}}>
                  {
                    teamData?.teamInfo.map((char: TeamData) => (
                      <View style={{ paddingBottom : 12,}}>
                        <CharCard outlinePadding={12} isLevelReplaceName={true} {...char} />

                        {/** 大技能量所需 */}
                        <View>

                        </View>
                      </View>
                    ))
                  }
                  </ScrollView>
                  
                <View style={{ width: 6 }} />
                </View>
              </View>
            </View>
          </View>

          {/** */}
        </View>

        <View style={{ flex: 0.05, backgroundColor: "#55555544" }}></View>
        {/** Right - Showing Flow and Simuated List */}
        <View style={{ flex: 0.55, backgroundColor: "#00000055" }}>

        </View>
      </View>

    </View>
  )

}
function getDisplayDateByUnix(unix: number): String {
  const date = new Date(unix);
  return date.getFullYear() + "."
    + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "."
    + (date.getDate() < 10 ? "0" : "") + date.getDate()
}