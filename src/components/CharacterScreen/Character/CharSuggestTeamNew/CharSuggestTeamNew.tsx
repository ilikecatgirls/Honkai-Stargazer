import { Text, View } from "react-native";
import React from "react";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";
import CharPageHeading from "../../../../components/global/PageHeading/PageHeading";
import useCharId from "../../../../context/CharacterData/hooks/useCharId";
import { Person } from "phosphor-react-native";
import CharacterName from "../../../../../map/character_name_map";
import CharacterId from "../../../../../map/character_id_map";
import charAdviceMap from "../../../../../map/character_advice_map";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import { CharacterName as CharNameType } from "../../../../types/character";
import useTextLanguage from "../../../../language/TextLanguage/useTextLanguage";
import CharWeightList from "../../../../../data/weight_data/charWeightList.json";
import {
  getCharFullData,
  getCharJsonData,
} from "../../../../utils/data/getDataFromMap";
import CharCard from "../../../global/CharCard/CharCard";
import { CombatType } from "../../../../types/combatType";
import { Path } from "../../../../types/path";

export default React.memo(function CharSuggestTeamNew() {
  const { language: textLanguage } = useTextLanguage();
  const { language: appLanguage } = useAppLanguage();

  const charId = useCharId();
  const charOfficialId = CharacterId[useCharId() as CharNameType];
  // @ts-ignore
  const suggestTeamsData = CharWeightList[charOfficialId as string][0]?.team

  const charJsonData = getCharJsonData(charId);
  const charFullData = getCharFullData(charId, textLanguage);

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
            <View style={{flexDirection:"row"}}>
              <CharCard {...charInfo} />
              {
                team?.map((value: string,p:number) => (
                  <CharCard key={i+"-"+p} isShowMultiType={true} typeListStr={value} />
                ))
              }
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
