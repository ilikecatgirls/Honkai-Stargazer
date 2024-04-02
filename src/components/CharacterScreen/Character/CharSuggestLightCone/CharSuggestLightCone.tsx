import { Sword } from "phosphor-react-native";
import CharPageHeading from "../../../global/PageHeading/PageHeading";
import { ScrollView, Text, View } from "react-native";
import CharSuggestLightConeCard from "./CharSuggestLightConeCard/CharSuggestLightConeCard";
import lightconeList from "../../../../../data/lightcone_data/lightcone_list.json";
import React from "react";
import { getLcFullData } from "../../../../utils/data/getDataFromMap";
import useCharId from "../../../../context/CharacterData/hooks/useCharId";
import LightconeNameMap from "../../../../../map/lightcone_name_map";
import { LightconeName } from "../../../../types/lightcone";
import useTextLanguage from "../../../../language/TextLanguage/useTextLanguage";
import Lightcone from "../../../../../assets/images/images_map/lightcone";
import charAdviceMap from "../../../../../map/character_advice_map";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import CharWeightList from "../../../../../data/weight_data/charWeightList.json";
import lcOfficalIdMap from "../../../../../map/lightcone_offical_id_map";
import charIdMap from "../../../../../map/character_id_map";

export default React.memo(function CharSuggestLightCone() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();
  const charId = useCharId();
  // @ts-ignore
  const suggestConesData = CharWeightList[charIdMap[charId]][0]?.advice_lightcone!.concat(CharWeightList[charIdMap[charId]][0]?.normal_lightcone!);
  const suggestCones = suggestConesData?.filter((cone : any) => cone !== -1 && cone !== -2)?.map((cone: any) => {
    // @ts-ignore
    const lcId: LightconeName = lcOfficalIdMap[cone];
    const lcFullData = getLcFullData(lcId, textLanguage);

    return {
      id: lcId,
      rare: lightconeList.filter((lc) => lc.name === lcId)[0]?.rare,
      name: lcFullData?.name,
      description: lcFullData?.descHash,
      skill: lcFullData?.skill,
      image: Lightcone[lcId]?.icon,
      path: lightconeList.filter((lc) => lc.name === lcId)[0]?.path,
    };
  });

  return (
    <View className="px-4" style={{ alignItems: "center" }}>
      <CharPageHeading Icon={Sword}>
        {LOCALES[appLanguage].AdviceLightcones}
      </CharPageHeading>
      {suggestCones && suggestCones.length > 0 ? (
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            {suggestCones
              ?.slice()
              .sort((a: any, b: any) => b.rare - a.rare)
              .map((l: any, i: any) => (
                // @ts-ignore
                <CharSuggestLightConeCard key={i} {...l} />
              ))}
          </View>
        </ScrollView>
      ) : (
        <Text className="text-text text-[HY65] font-[HY65]">
          {LOCALES[appLanguage].NoDataYet}
        </Text>
      )}
    </View>
  );
});
