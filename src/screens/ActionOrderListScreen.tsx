import { useEffect, useRef, useState } from "react";
import useAppLanguage from "../language/AppLanguage/useAppLanguage";
import useTextLanguage from "../language/TextLanguage/useTextLanguage";
import Header from "../components/global/Header/Header";
import { StatusBar } from "expo-status-bar";
import WallPaper from "../components/global/WallPaper/WallPaper";
import { LinearGradient } from "expo-linear-gradient";
import { SCREENS } from "../constant/screens";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserCharacters from "../firebase/models/UserCharacters";
import { CharacterName } from "../types/character";
import { CharacterData } from "../context/CharacterData/CharacterData.types";
import { dynamicHeightScrollView } from "../constant/ui";
import CharCard from "../components/global/CharCard/CharCard";
import characterList from "../../data/character_data/character_list.json";
import { Path } from "../types/path";
import { CombatType } from "../types/combatType";
import { ExpoImage } from "../types/image";
import CharacterImage from "../../assets/images/images_map/chacracterImage";
import { getCharFullData } from "../utils/data/getDataFromMap";
import { getCharAttrData } from "../utils/calculator/getAttrData";


export type TeamListItem = {
  teamName : String;
  teamInfo : Array<TeamData>;
}

export type TeamData = {
  characterName : CharacterName;
  level : number;
  energyLimit : number,
  energyRechargeRate : number,
  speedBase : number,
  speedAddition : number,
  charData : UserCharacters | undefined,
}

export type CharListItem = {
  id: CharacterName;
  name: string;
  rare: number;
  path: Path;
  combatType: CombatType;
  image: ExpoImage;
  version: string;
  atk: number;
  def: number;
  hp: number;
  energy: number;
};

export default function ActionOrderListScreen() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();
  const scrollViewRef = useRef(null);
  
  const [charCardListData, setCharCardListData] = useState<CharListItem []>();

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
          version: char.version,
          atk: charAttrData.atk,
          def: charAttrData.def,
          hp: charAttrData.hp,
          energy: charAttrData.energy,
        };
      })
    );
  }, []);

  //Read data from character's team...
  const teamDataTest : Array<TeamListItem> = [
    {
      teamName: "名字隨意改",
      teamInfo: [
        {
          characterName: "Kafka",
          level : 78,
          energyLimit : 120,
          energyRechargeRate : 1.00,
          speedBase : 100.0,
          speedAddition : 34.0,
          charData : charCardListData?.filter((char : CharListItem) => (char.name === "Kafka"))[0],
        },
        {
          characterName: "Guinaifen",
          level : 78,
          energyLimit : 120,
          energyRechargeRate : 1.00,
          speedBase : 106.0,
          speedAddition : 25.0,
          charData : undefined,
        },
        {
          characterName: "Ruan Mei",
          level : 78,
          energyLimit : 130,
          energyRechargeRate : 1.244,
          speedBase : 104.0,
          speedAddition : 5.0,
          charData : undefined,
        },
        {
          characterName: "Huohuo",
          level : 78,
          energyLimit : 140,
          energyRechargeRate : 1.244,
          speedBase : 98.0,
          speedAddition : 46.88,
          charData : undefined,
        },
      ],
    } as TeamListItem,
    {
      teamName: "我再試試",
      teamInfo: [
        {
          characterName: "Kafka",
          level : 78,
          energyLimit : 120,
          energyRechargeRate : 1.00,
          speedBase : 100.0,
          speedAddition : 34.0,
          charData : undefined,
        },
        {
          characterName: "Guinaifen",
          level : 78,
          energyLimit : 120,
          energyRechargeRate : 1.00,
          speedBase : 106.0,
          speedAddition : 25.0,
          charData : undefined,
        },
        {
          characterName: "Ruan Mei",
          level : 78,
          energyLimit : 130,
          energyRechargeRate : 1.244,
          speedBase : 104.0,
          speedAddition : 5.0,
          charData : undefined,
        },
        {
          characterName: "Huohuo",
          level : 78,
          energyLimit : 140,
          energyRechargeRate : 1.244,
          speedBase : 98.0,
          speedAddition : 46.88,
          charData : undefined,
        },
      ],
    } as TeamListItem,
  ];
  const teamListContent = teamDataTest;

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

      <ScrollView className={dynamicHeightScrollView} ref={scrollViewRef} nestedScrollEnabled={true}>
        {
          teamListContent?.map((team : TeamListItem) => {
            return (
              <View style={{backgroundColor: "#DDDDDDFF", padding:12}}>
                <Text style={{fontSize:16,color:"#000000FF"}}>{team.teamName}</Text>
                <ScrollView horizontal={false}>
                  {team.teamInfo.map((char : TeamData) => (
                    <View>
                      <CharCard {...char?.charData}/>
                    </View>
                  ))}
                </ScrollView>
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
