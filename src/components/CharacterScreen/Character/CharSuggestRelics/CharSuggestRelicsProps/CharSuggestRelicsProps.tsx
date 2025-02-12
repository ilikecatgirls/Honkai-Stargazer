import { View, Text } from "react-native";
import React from "react";
import useCharData from "../../../../../context/CharacterData/hooks/useCharData";
import useAppLanguage from "../../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../../locales";
import charIdMap from "../../../../../../map/character_id_map";
import charOfficalIdMap from "../../../../../../map/character_offical_id_map";
import { useEffect, useState } from "react";
import useCharWeightList from "../../../../../hooks/charWeightList/useCharWeightList";

export default function CharSuggestRelicsProps() {
  const { language: appLanguage } = useAppLanguage();
  const { charId } = useCharData();

  const mainRelicPropNames = [
    LOCALES[appLanguage].RelicPropBodyShort,
    LOCALES[appLanguage].RelicPropFeetShort,
    LOCALES[appLanguage].RelicPropPlanarSphereShort,
    LOCALES[appLanguage].RelicPropLinkRopeShort,
  ];

  const [adviceRelics, setAdviceRelics] = useState<Object[]>([])
  const [adviceRelicsSub, setAdviceRelicsSub] = useState<Object[]>([])
  const [alreadyInit, setAlreadyInit] = useState(false)

  useEffect(() => {
    async function init() {
      const CharWeightList = await useCharWeightList();
      setAdviceRelics(CharWeightList?.[charIdMap[charId]][0]?.advice_relic_attr)
      setAdviceRelicsSub(CharWeightList?.[charIdMap[charId]][0]?.advice_relic_sub)
      setAlreadyInit(true)
    }
    if(!alreadyInit) init();
  })

  return (
    <View className="w-full mt-4 px-6">
      <View className="w-full">
        <Text className="font-[HY65] text-white text-[16px]">
          {LOCALES[appLanguage].MainAffix}
        </Text>
        {/* 主詞條 */}
        <View
          className="w-full pt-3 pb-4 "
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 9,
            columnGap: 12,
          }}
        >
          {adviceRelics?.slice(0, 4)?.map((r: any, i: number) => (
            <View
              key={i}
              className="w-[48%]"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text className="text-[13px] text-white font-[HY65] leading-4">
                {mainRelicPropNames[i]}
              </Text>
              <Text
                numberOfLines={1}
                className="text-[13px] text-[#DDD] opacity-80 font-[HY65] w-24 text-right leading-4"
              >
                {LOCALES[appLanguage][r.propertyName]}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* 副詞條 */}
      <View
        className="w-full"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text className="font-[HY65] text-white text-[16px]">
          {LOCALES[appLanguage].SubAffix}
        </Text>
        <Text className="text-[13px] text-[#DDD] opacity-80 font-[HY65]">
          {adviceRelicsSub?.map((sub: any, i: number) => (
            <Text>
              {LOCALES[appLanguage][sub]}
              {i !== adviceRelicsSub?.length - 1 && ", "}
            </Text>
          )) || LOCALES[appLanguage].NoDataYet}
        </Text>
      </View>
    </View>
  );
}
