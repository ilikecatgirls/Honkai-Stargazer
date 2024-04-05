import { View, StyleSheet, Text } from "react-native";
import React from "react";
import CharPageHeading from "../../../global/PageHeading/PageHeading";
import { BaseballCap } from "phosphor-react-native";
import { Image } from "expo-image";
import CharSuggestRelicsLeft from "./CharSuggestRelicsLeft/CharSuggestRelicsLeft";
import CharSuggestRelicsRight from "./CharSuggestRelicsRight/CharSuggestRelicsRight";
import CharSuggestRelicsProps from "./CharSuggestRelicsProps/CharSuggestRelicsProps";
import useCharId from "../../../../context/CharacterData/hooks/useCharId";
import charAdviceMap from "../../../../../map/character_advice_map";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import charIdMap from "../../../../../map/character_id_map";
import { useEffect, useState } from "react";
import useCharWeightList from "../../../../hooks/charWeightList/useCharWeightList";

// Relic 遺器套裝
// Ornaments 位面飾品
// 通稱 Relic 遺器

const AddIcon = require("../../../../../assets/icons/Add.svg");

export default React.memo(function CharSuggestRelics() {
  const { language } = useAppLanguage();

  const charId = useCharId();

  const [advices, setAdvices] = useState<Object[]>([])
  const [suggestRelics, setSuggestRelics] = useState<Object[]>([])
  const [alreadyInit, setAlreadyInit] = useState(false)

  useEffect(() => {
    async function init() {
      const CharWeightList = await useCharWeightList();
      
      setAdvices(CharWeightList[charIdMap[charId]][0]);
      setSuggestRelics(advices?.advice_relic!);
      setAlreadyInit(true)
    }
    if(!alreadyInit) init();
  })

  return (
    <View style={{ alignItems: "center" }}>
      <CharPageHeading Icon={BaseballCap}>
        {LOCALES[language].AdviceRelics}
      </CharPageHeading>
      {suggestRelics && suggestRelics.length > 0 ? (
        <View className="w-full" style={styles.lightconeImages}>
          <CharSuggestRelicsLeft />
          <View className="translate-y-[14px]">
            <AddIconComponent />
          </View>
          <CharSuggestRelicsRight />
        </View>
      ) : (
        <Text className="text-text text-[HY65] font-[HY65]">
          {LOCALES[language].NoDataYet}
        </Text>
      )}
      {suggestRelics && suggestRelics.length > 0 ?
        (
          <CharSuggestRelicsProps />
        ) : (<></>)
      }
    </View>
  );
});

const styles = StyleSheet.create({
  lightconeImages: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  lightconeImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
  },
});

const AddIconComponent = () => {
  return (
    <Image cachePolicy="none"
      className="translate-y-8"
      style={{ width: 13, height: 13 }}
      source={AddIcon}
    />
  );
};
