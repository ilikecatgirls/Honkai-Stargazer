import { View, Text } from "react-native";
import React, { useState } from "react";
import RelicsCard from "../../../../global/RelicsCard/RelicsCard";
import RightBtn from "../ui/RightBtn";
import LeftBtn from "../ui/LeftBtn";
import useCharId from "../../../../../context/CharacterData/hooks/useCharId";
import { getRelicFullData } from "../../../../../utils/data/getDataFromMap";
import { map } from "lodash";
import useTextLanguage from "../../../../../language/TextLanguage/useTextLanguage";
import { RelicName } from "../../../../../types/relic";
import Relic from "../../../../../../assets/images/images_map/relic";
import SelectedIndex from "../ui/SelectedIndex";
import CharSuggestRelicsCard from "../CharSuggestRelicsCard/CharSuggestRelicsCard";
import { SCREENS } from "../../../../../constant/screens";
import { useNavigation } from "@react-navigation/native";
import charAdviceMap from "../../../../../../map/character_advice_map";
import CharWeightList from "../../../../../../data/weight_data/charWeightList.json";
import charIdMap from "../../../../../../map/character_id_map";
import relicOfficalIdMap from "../../../../../../map/relic_offical_id_map";

export default function CharSuggestRelicsLeft() {
  const { language: textLanguage } = useTextLanguage();

  const navigation = useNavigation();

  const charId = useCharId();
  const advices = CharWeightList[charIdMap[charId]][0];
  const suggestRelics = advices?.advice_relic!;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleLeft = () => {
    setSelectedIndex(
      selectedIndex - 1 < 0 ? suggestRelics?.length - 1 : selectedIndex - 1
    );
  };
  const handleRight = () => {
    setSelectedIndex(
      selectedIndex + 1 >= suggestRelics?.length ? 0 : selectedIndex + 1
    );
  };

  return (
    <View style={{ alignItems: "center", gap: 9 }}>
      <SelectedIndex max={suggestRelics?.length || 0} index={selectedIndex} />
      <View style={{ flexDirection: "row" }}>
        <LeftBtn onPress={handleLeft} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 8,
          }}
        >
          {map(suggestRelics?.[selectedIndex], (v: RelicName, k) => {
            let relic = relicOfficalIdMap[v];
            if (!v) {
              relic = relicOfficalIdMap[suggestRelics?.[selectedIndex]?.[0]]! as RelicName;
            }
            return (
              <RelicsCard
                key={k}
                // id={relic}
                name={getRelicFullData(relic, textLanguage)?.name}
                // description=""
                rare={5}
                image={Relic[relic]?.pcIcon}
                onPress={() => {
                  // @ts-ignore
                  navigation.push(SCREENS.RelicPage.id, {
                    id: relic,
                    name: getRelicFullData(relic, textLanguage)?.name,
                  });
                }}
              />
            );
          })}
        </View>
        <RightBtn onPress={handleRight} />
      </View>
    </View>
  );
}
