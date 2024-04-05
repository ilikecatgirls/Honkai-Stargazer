import { Text, View, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";
import CharPageHeading from "../../../../components/global/PageHeading/PageHeading";
import useCharId from "../../../../context/CharacterData/hooks/useCharId";
import { Person } from "phosphor-react-native";
import CharacterId from "../../../../../map/character_id_map";
import CharacterOfficialId from "../../../../../map/character_offical_id_map";
import charAdviceMap from "../../../../../map/character_advice_map";
import CharAdviceIdMap from "../../../../../map/character_advice_id_map";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import { CharacterName } from "../../../../types/character";
import useTextLanguage from "../../../../language/TextLanguage/useTextLanguage";
import Modal from "react-native-modal";
import {
  getCharFullData,
  getCharJsonData,
} from "../../../../utils/data/getDataFromMap";
import CharCard from "../../../global/CharCard/CharCard";
import { CombatType } from "../../../../types/combatType";
import { Path } from "../../../../types/path";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../../constant/screens";
import PopUpCard from "../../../global/PopUpCard/PopUpCard";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import useCharWeightList from "../../../../hooks/charWeightList/useCharWeightList";

export default React.memo(function CharSuggestTeamNew() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();

  const charId = useCharId();
  const navigation = useNavigation();
  const charOfficialId = CharacterId[useCharId()];
  const [isSelected, setIsSelected] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  // @ts-ignore
  const [suggestTeamsData, setSuggestTeamsData] = useState<Object[]>([])
  const [CharWeightList, setCharWeightList] = useState<Object[]>([])
  const [alreadyInit, setAlreadyInit] = useState(false)

  useEffect(() => {
    async function init() {
      setCharWeightList(await useCharWeightList());
      setSuggestTeamsData(CharWeightList[charOfficialId as string][0]?.team)
      setAlreadyInit(suggestTeamsData !== undefined)
    }
    if(!alreadyInit) init();
  })

  const charJsonData = getCharJsonData(charId);
  const charFullData = getCharFullData(charId, textLanguage);

  const handleCharPress = useCallback((charId: string, charName: string) => {
    // @ts-ignore
    navigation.push(SCREENS.CharacterPage.id, {
      id: charId,
      name: charName,
    });
    setIsSelected(false);
  }, []);

  const handleOptionPress = useCallback((value: string) => {
    setIsSelected(true);
    setOptionValue(value);
  }, [isSelected]);

  const charInfo = {
    id: charId,
    image: CharacterImage[charId]?.icon,
    rare: charJsonData?.rare,
    name: charFullData?.name,
    path: charJsonData?.path as Path,
    combatType: charJsonData?.element as CombatType,
  }

  return (
    <View style={{ alignItems: "center" }}>
      <CharPageHeading Icon={Person}>
        {LOCALES[appLanguage].AdviceTeams}
      </CharPageHeading>
      {suggestTeamsData && suggestTeamsData.length > 0 && suggestTeamsData[0] !== undefined ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            rowGap: 16,
          }}
        >
          {suggestTeamsData?.map((team: any, i: number) => (
            // @ts-ignore
            <View style={{ flexDirection: "row" }}>
              {/* 該角色的卡片 */}
              <CharCard {...charInfo} />
              {/* 推薦隊友的卡片 */
                team?.map((value: string, p: number) => {
                  if (!isNaN(Number(value)) && CharacterImage[CharacterOfficialId[Number(value)]]?.icon !== undefined) {
                    const valNum = Number(value);
                    const charJsonData = getCharJsonData(CharacterOfficialId[valNum] as CharacterName);
                    const charFullData = getCharFullData(CharacterOfficialId[valNum] as CharacterName, textLanguage);

                    const charInfo = {
                      id: CharacterOfficialId[valNum] as CharacterName,
                      image: CharacterImage[CharacterOfficialId[valNum]]?.icon,
                      rare: charJsonData?.rare,
                      name: charFullData?.name,
                      path: charJsonData?.path as Path,
                      combatType: charJsonData?.element as CombatType,
                    }

                    return (<CharCard key={i + "-" + p} onPress={handleCharPress} {...charInfo} />)
                  }
                  return (
                    <CharCard key={i + "-" + p} isShowMultiType={true} typeListStr={value} onPressShowChoice={() => handleOptionPress(value)} />
                  )
                })
              }
              <Modal
                useNativeDriverForBackdrop
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={isSelected}
              >
                <Pressable
                  onPress={() => {
                    setIsSelected(false);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 14,
                    transform: [{ translateY: -32 }],
                  }}
                >
                  <PopUpCard
                    title={LOCALES[appLanguage].MatchRequirementChar.replace("${1}", 
                    getKeywordsRequire(optionValue)?.keywords?.map((keywords, index, array) => {
                      return (
                        (CharAdviceIdMap[keywords]?.name || getCharFullData(CharacterOfficialId[keywords], textLanguage)?.name || CharacterOfficialId[keywords]) 
                        + (index + 1 < array.length ? (getKeywordsRequire(optionValue).isAnd ? LOCALES[appLanguage].RequirementAND : LOCALES[appLanguage].RequirementOR) : "")
                      )
                    }).toString().replaceAll(",",""))}
                    content={(

                      <ScrollView style={{ maxHeight: 300 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            rowGap: 8,
                            justifyContent: "center",
                            padding: 8
                          }}
                        >
                          {Object.keys(CharWeightList)?.filter((officialId: string) => {
                            const keywordRequire = getKeywordsRequire(optionValue);
                            for (let k = 0; k < keywordRequire.keywords?.length; k++) {
                              if (CharWeightList[officialId][0]?.keywords?.includes(Number(keywordRequire.keywords[k])) === false && officialId !== keywordRequire.keywords[k]) {
                                if (keywordRequire.isAnd === true) return false;
                              } else {
                                return true
                              }
                            }
                            return false;
                          })?.map((officialId: any) => {
                            const valNum = Number(officialId)
                            const charJsonData = getCharJsonData(CharacterOfficialId[valNum] as CharacterName);
                            const charFullData = getCharFullData(CharacterOfficialId[valNum] as CharacterName, textLanguage);

                            const charInfo = {
                              id: CharacterOfficialId[valNum] as CharacterName,
                              image: CharacterImage[CharacterOfficialId[valNum]]?.icon,
                              rare: charJsonData?.rare,
                              name: charFullData?.name,
                              path: charJsonData?.path as Path,
                              combatType: charJsonData?.element as CombatType,
                            }

                            return (
                              <CharCard key={i + "-" +charInfo?.id} onPress={handleCharPress} {...charInfo} />
                            )
                          })}
                        </View>
                      </ScrollView>

                    )}
                    onClose={() => {
                      setIsSelected(false);
                    }}
                  />
                </Pressable>
              </Modal>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-text text-[HY65]">
          {LOCALES[appLanguage].NoDataYet}
        </Text>



        /*
        <View style={{flexDirection:"row"}}>
          <CharCard isShowMultiType={true} typeListStr={"Bailu||Huohuo"}/>
          <CharCard isShowMultiType={true} typeListStr={"Bailu&&Huohuo||Abundance||Preservation"}/>
          <CharCard isShowMultiType={true} typeListStr={"Bailu||Huohuo&&Abundance"}/>
          <CharCard isShowMultiType={true} typeListStr={"Harmony||Hunt||Fire"}/>
          <CharCard isShowMultiType={true} typeListStr={"Hunt&&Fire||Hunt&&Ice"}/>
        </View>
        */
      )}
    </View>
  );
});

function getKeywordsRequire(typeListStr: string) {
  const typeList = typeListStr?.split("||") || [];
  let typeListFinal: string[] = [];
  for (let x = 0; typeList !== undefined && x < typeList.length; x++) {
    typeList[x].split("&&").map((str: string) => {
      typeListFinal.push(str);
    })
  }
  return { "keywords": typeListFinal, "isAnd": (typeList[0].split("&&").length > 1) };
}