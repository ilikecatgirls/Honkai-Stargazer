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
      teamName: "名字隨意改",
      teamBuildDate: 1713839701000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Kafka"))[0], ...
          {
            level: 78,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Guinaifen"))[0], ...
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
      teamName: "冰隊",
      teamBuildDate: 1710839701000,
      teamInfo: [
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Jingliu"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Pela"))[0], ...
          {
            level: 80,
            energyRechargeRate: 1.00,
            speedBase: 106.0,
            speedAddition: 25.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Ruan Mei"))[0], ...
          {
            level: 60,
            energyRechargeRate: 1.00,
            speedBase: 100.0,
            speedAddition: 34.0,
          }
        },
        {
          ...charCardListData?.filter((char: TeamData) => (char.id === "Huohuo"))[0], ...
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

  const teamListContent = teamDataTest;

  //Go to ActionOrderSimuator
  const handleTeamPress = useCallback((teamIndex: number) => {
    console.log(teamIndex)
    // @ts-ignore
    navigation.push(SCREENS.ActionOrderSimulatorPage.id, {
      selectedTeamData: teamListContent[teamIndex],
    });
  }, []);

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
        <Button width={212} height={46}>
          <Text className="font-[HY65] text-[16px]">{LOCALES[appLanguage].ActionOrderAddTeam}</Text>
        </Button>
      </View>


      <ScrollView className={dynamicHeightScrollView} ref={scrollViewRef} nestedScrollEnabled={true}>
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