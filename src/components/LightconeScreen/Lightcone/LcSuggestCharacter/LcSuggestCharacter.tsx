import { Sword } from "phosphor-react-native";
import PageHeading from "../../../global/PageHeading/PageHeading";
import { ScrollView, View, Text } from "react-native";
import characterList from "../../../../../data/character_data/character_list.json";
import characterListMap from "../../../../../map/character_data_map";
import LcSuggestCharacterCard from "./LcSuggestCharacterCard/LcSuggestCharacterCard";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";
import useLcId from "../../../../context/LightconeData/hooks/useLcId";
import { CHARACTERS } from "../../../../constant/character";
//import charAdviceMap from "../../../../../map/character_advice_map";
import { forEach } from "lodash";
import { useEffect, useMemo, useState } from "react";
import LightconeName from "../../../../../map/lightcone_name_map";
import { getCharFullData } from "../../../../utils/data/getDataFromMap";
import useTextLanguage from "../../../../language/TextLanguage/useTextLanguage";
import { CharacterName } from "../../../../types/character";
import useCharWeightList from "../../../../hooks/charWeightList/useCharWeightList";
import officalLightconeId from "../../../../../map/lightcone_offical_id_map";
import charIdMap from "../../../../../map/character_id_map";


export default function LcSuggestCharacter() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();

  const lcId = useLcId();

  const [suggestChars, setSuggestChars] = useState([]);
  // @ts-ignore
  const [CharWeightList, setCharWeightList] = useState<Object[]>([])
  const [alreadyInit, setAlreadyInit] = useState(false)

  useEffect(() => {
    async function init() {
      setCharWeightList(await useCharWeightList());
      setAlreadyInit(CharWeightList !== undefined);
    }
    if(!alreadyInit) {
      init()
    }
  })

  useEffect(() => {
    const suggestCharacters: any = [];
      const charIdToCones = CHARACTERS.map((charId) => {
        if(CharWeightList[charIdMap[charId]]){
          return ({
            //@ts-ignore
            [charId]: CharWeightList[charIdMap[charId] as string][0]?.advice_lightcone!.concat(
                  CharWeightList[charIdMap[charId] as string][0]?.normal_lightcone!)})
        }else{
          return ({[charId] : []})
        }
      });
      
      charIdToCones.forEach((charIdToCone) => {
        for (const [charId, cones] of Object.entries(charIdToCone)) {
          if (cones) {
            cones.forEach((cone) => {
              // @ts-ignore
                if (officalLightconeId[cone] === lcId) {
                  suggestCharacters.push(charId);
              }
            });
          }
        }
      });
      setSuggestChars(suggestCharacters);
  },[lcId, CharWeightList]);

  const suggestCharsJsx = useMemo(
    () =>
      suggestChars?.length ? (
        suggestChars
          .map((charId: CharacterName) => {
            const charJsonData = characterList.filter(
              (char) => char.name === charId
            )[0];
            const charFullData = getCharFullData(charId, textLanguage);
            return {
              id: charId,
              rare: charJsonData.rare,
              name: charFullData.name,
              description: charFullData.descHash,
              image: CharacterImage[charId].icon,
              combatType: charJsonData.element,
              path: charJsonData.path,
            };
          })
          ?.slice()
          .sort((a: any, b: any) => b.rare - a.rare)
          .map((l, i) => (
            // @ts-ignore
            <LcSuggestCharacterCard key={i} {...l} />
          ))
      ) : (
        <Text className="text-text font-[HY65]">
          {LOCALES[appLanguage].NoDataYet}
        </Text>
      ),
    [suggestChars]
  );

  return (
    <View className="px-4" style={{ alignItems: "center" }}>
      <PageHeading Icon={Sword}>
        {LOCALES[appLanguage].AdviceCharacters}
      </PageHeading>
      <ScrollView horizontal>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 8,
          }}
        >
          {suggestCharsJsx}
        </View>
      </ScrollView>
    </View>
  );
}
