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
      <View style={{ flex: 1, backgroundColor: "#CCCCCC00", flexDirection: "row", margin: 24 }}>
        {/** Left - Showing Team Data & Params */}
        <View style={{ flex: 0.45, backgroundColor: "#55555500" }}>
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
          <ScrollView style={{ backgroundColor: "#F3F9FFCD", flex: 1, borderRadius: 8, borderTopRightRadius: 20 }}>
            <View style={{ padding: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, }}>角色</Text>
                <View style={{ flex: 1 }}></View>
                <Text style={{ fontSize: 18, }}>編輯</Text>
              </View>

              <ScrollView horizontal={true} style={{ width: "100%", paddingTop: 8, paddingBottom: 12, backgroundColor: "#00000000" }}>
                {
                  teamData?.teamInfo.map((char: TeamData) => {
                    /** Space for allowing to add testing codes */
                    return (
                      <View>
                        {/** Character Card */}
                        <CharCard outlinePadding={12} isLevelReplaceName={true} {...char} />

                        {/** Energy Required of their 終結技 */}
                        <View style={{ width: "100%", paddingTop: 6, paddingLeft: 12, paddingRight: 12, justifyContent: "center", alignSelf: "center", maxWidth: 80 }}>
                          <Text style={{ width: "100%", padding: 6, color: "#FFF", backgroundColor: "#00000033", justifyContent: "center", alignSelf: "center", textAlign: 'center', borderRadius: 4 }}>
                            {char.energyLimit}
                          </Text>
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>

              <View>
                <View style={{ flexDirection: 'row', width: "100%" }}>
                  <Text style={{ fontSize: 18, flex: 1, justifyContent: 'center', alignSelf: 'center' }}>初始戰績點</Text>
                  <View style={{ width: "100%", paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 0, justifyContent: "center", alignSelf: "center", maxWidth: 80 }}>
                    <Text style={{ width: "100%", padding: 6, color: "#FFF", backgroundColor: "#00000033", justifyContent: "center", alignSelf: "center", textAlign: 'center', borderRadius: 4 }}>
                      {3}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: "100%" }}>
                  <Text style={{ fontSize: 18, flex: 1, justifyContent: 'center', alignSelf: 'center' }}>戰績點上限</Text>
                  <View style={{ width: "100%", paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 0, justifyContent: "center", alignSelf: "center", maxWidth: 80 }}>
                    <Text style={{ width: "100%", padding: 6, color: "#FFF", backgroundColor: "#00000033", justifyContent: "center", alignSelf: "center", textAlign: 'center', borderRadius: 4 }}>
                      {5}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: "100%" }}>
                  <Text style={{ fontSize: 18, flex: 1, justifyContent: 'center', alignSelf: 'center' }}>敵人速度</Text>
                  <View style={{ width: "100%", paddingTop: 4, paddingBottom: 4, paddingLeft: 12, paddingRight: 0, justifyContent: "center", alignSelf: "center", maxWidth: 80 }}>
                    <Text style={{ width: "100%", padding: 6, color: "#FFF", backgroundColor: "#00000033", justifyContent: "center", alignSelf: "center", textAlign: 'center', borderRadius: 4 }}>
                      {190}
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </ScrollView>

          {/** */}
        </View>

        {/** Middle Blank*/}
        <View style={{ width: 24, backgroundColor: "#55555500" }}></View>

        {/** Right - Showing Flow and Simuated List */}
        <View style={{ flex: 0.55, backgroundColor: "#0000002C" }}>
          {/** Header */}
          <View>
            {/** All Steps */}
            <View style={{ paddingLeft: 16, paddingRight: 16, paddingBottom:12}}>
              <Text style={{ fontSize: 20, color: "#FFF" }}>所有流程</Text>
            </View>


          </View>
          
          {/** Step List */}
          <View style={{ backgroundColor: "#F3F9FF66", flex: 1, borderRadius: 8, borderTopRightRadius: 20 }}>
          </View>
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