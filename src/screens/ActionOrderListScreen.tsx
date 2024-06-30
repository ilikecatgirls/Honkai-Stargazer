import { useCallback, useEffect, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import useTextLanguage from "../language/TextLanguage/useTextLanguage";
import Header from "../components/global/Header/Header";
import { StatusBar } from "expo-status-bar";
import WallPaper from "../components/global/WallPaper/WallPaper";
import { LinearGradient } from "expo-linear-gradient";
import { SCREENS } from "../constant/screens";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import UserCharacters from "../firebase/models/UserCharacters";
import { CharacterName } from "../types/character";
import { CharacterData } from "../context/CharacterData/CharacterData.types";
import { dynamicHeightListAction, dynamicHeightScrollView } from "../constant/ui";
import CharCard from "../components/global/CharCard/CharCard";
import characterList from "../../data/character_data/character_list.json";
import { Path } from "../types/path";
import { CombatType } from "../types/combatType";
import { ExpoImage } from "../types/image";
import CharacterImage from "../../assets/images/images_map/chacracterImage";
import { getCharFullData } from "../utils/data/getDataFromMap";
import { getCharAttrData } from "../utils/calculator/getAttrData";
import Button from "../components/global/Button/Button";
import { LOCALES } from "../../locales";
import React from "react";
import Toast from "../utils/toast/Toast";


export type TeamListItem = {
  teamName: String;
  teamBuildDate: number;
  teamInfo: Array<TeamData>;
}

export type TeamData = {
  id: CharacterName;
  name: string;
  rare: number;
  path: Path;
  combatType: CombatType;
  image: ExpoImage;
  level?: number;
  energyLimit: number;
  energyRechargeRate?: number;
  speedBase?: number;
  speedAddition?: number;
}


export default function ActionOrderListScreen() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const [charCardListData, setCharCardListData] = useState<TeamData[]>();

  useEffect(() => {
    setCharCardListData(
      characterList.map((char) => {
        const charId = char.name as CharacterName;
        const charFullData = getCharFullData(charId, textLanguage);
        const charAttrData = getCharAttrData(charId, 80);
        return {
          id: charId,
          name: charFullData?.name || char.name,
          rare: char.rare,
          combatType: char.element as CombatType,
          path: char.path as Path,
          image: CharacterImage[char.name as CharacterName]?.icon,
          energyLimit: charAttrData.energy,
        };
      })
    );
  }, []);

  //Read data from character's team...
  const teamDataTest: Array<TeamListItem> = [
    {
      teamName: "開拓者，生日快樂！Happy Birthday to Trilblazer!",
      teamBuildDate: 1721344740000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Trailblazer Girl (Imaginary)"))[0], ...
          {
            level: 19,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
      ],
    } as TeamListItem,
    {
      teamName: "再見，Stargazer 2；你好，Stargazer 3！\nBye Stargazer 2 and Hi Stargazer 3!",
      teamBuildDate: 1719789540000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Firefly"))[0], ...
          {
            level: 78,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Trailblazer Girl (Imaginary)"))[0], ...
          {
            level: 78,
            energyRechargeRate: 1.00,
            speedBase: 106.0,
            speedAddition: 25.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Ruan Mei"))[0], ...
          {
            level: 78,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Huohuo"))[0], ...
          {
            level: 78,
            energyRechargeRate: 1.244,
            speedBase: 98.0,
            speedAddition: 46.88,
          }
        },
      ],
    } as TeamListItem,


    {
      teamName: "終於決定做排軸功能了！ Finally we confirmed to develop Action Order Function",
      teamBuildDate: 1713839701000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Acheron"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Robin"))[0], ...
          {
            level: 70,
            energyRechargeRate: 1.00,
            speedBase: 106.0,
            speedAddition: 25.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Sparkle"))[0], ...
          {
            level: 60,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Bailu"))[0], ...
          {
            level: 60,
            energyRechargeRate: 1.244,
            speedBase: 98.0,
            speedAddition: 46.88,
          }
        },
      ],
    } as TeamListItem,


    {
      teamName: "「開拓」之旅永不結束，他只是到了他的下一站\nThe journey of \"Trailblaze\" never ends, he just reaches his next stop",
      teamBuildDate: 1708961520000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Trailblazer Girl (Imaginary)"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Himeko"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 106.0,
            speedAddition: 25.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "March 7th"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Welt"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.244,
            speedBase: 98.0,
            speedAddition: 46.88,
          }
        },
      ],
    } as TeamListItem,

    {
      teamName: "夢開始的地方 Where Dream Start",
      teamBuildDate: 1700956800000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Seele"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Silver Wolf"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 106.0,
            speedAddition: 25.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Qingque"))[0], ...
          {
            level: 60,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Fu Xuan"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.244,
            speedBase: 98.0,
            speedAddition: 46.88,
          }
        },
      ],
    } as TeamListItem,
  ];

  const enemySpeed = 158 

  const teamListContent = teamDataTest;

  //Go to ActionOrderSimuator
  const handleTeamPress = (teamIndex: number) => {
    console.log(JSON.stringify(teamListContent[teamIndex]))
    // @ts-ignore
    navigation.push(SCREENS.ActionOrderSimulatorPage.id, {
      selectedTeamData: teamListContent[teamIndex],
      selectedEnemyData: {enemySpeed : enemySpeed}
    });
  };

  return (
    <View style={{ flex: 1 }} className="overflow-hidden">
      <StatusBar style="dark" />
      <WallPaper isBlur />
      <LinearGradient
        className="absolute w-full h-full"
        colors={["#00000080", "#00000020"]}
      />

      <Header
        Icon={SCREENS.ActionOrderListPage.icon}
        scrollViewRef={scrollViewRef}
        leftBtn="back"
      >
        {SCREENS.ActionOrderListPage.getName(appLanguage)}
      </Header>

      {/* Add Team Button */}
      <View className={dynamicHeightListAction} style={{
        justifyContent: "flex-end",
        alignItems: "center",
      }}>
        <Button width={212} height={46} onPress={() => {Toast("Developing...")}}>
          <Text className="font-[HY65] text-[16px]">{LOCALES[appLanguage].ActionOrderAddTeam}</Text>
        </Button>
        {/** Preview Text */}
      <Text style={{color : "#FFFFFF", alignSelf:"center", paddingTop:8}}>This function is in the Preview Version | 本功能為預覽版</Text>
      
      </View>


      <ScrollView className={dynamicHeightScrollView} ref={scrollViewRef} nestedScrollEnabled={true} >
        {
          teamListContent?.map((team: TeamListItem, index: number) => {
            return (
              <View style={{ paddingBottom: 12 }}>
                <View style={{ backgroundColor: "#DDDDDDFF", padding: 12, borderRadius: 4, borderTopRightRadius: 16 }}>
                  <TouchableOpacity
                    //@ts-ignore
                    onPress={() => handleTeamPress(index)}
                  >
                    <Text style={{ fontSize: 16, color: "#000000FF", paddingBottom: 4 }}>{team.teamName}</Text>
                    <Text style={{ fontSize: 14, color: "#00000099", paddingBottom: 8 }}>{getDisplayDateByUnix(team.teamBuildDate)}</Text>
                    <View style={{ backgroundColor: "#00000010", width: "100%", height: 1 }}></View>
                    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                      {
                        team?.teamInfo?.map((char: TeamData) => (
                          <CharCard outlinePadding={12} isLevelReplaceName={true} {...char} />
                        ))
                      }
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }

        <View style={{padding:160}}></View>
        
      </ScrollView>



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

function getDisplayDateByUnix(unix: number): String {
  const date = new Date(unix);
  return date.getFullYear() + "."
    + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "."
    + (date.getDate() < 10 ? "0" : "") + date.getDate()
}