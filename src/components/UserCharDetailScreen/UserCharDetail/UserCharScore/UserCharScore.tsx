import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import getRelicScore, {
  getRelicTotalScoreRange,
} from "../../../../utils/calculator/relicScoreCalculator/getRelicScore";
import useProfileHsrInGameInfo from "../../../../context/UserCharDetailData/hooks/useProfileHsrInGameInfo";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import getCharScore, {
  getCharRange,
  getCurrAndGradScore,
  getTraceInfo,
} from "../../../../utils/calculator/charScoreCalculator/getCharScore";
import UserCharScoreItem from "./UserCharScoreItem/UserCharScoreItem";
import ScoreRangeFont from "../../../global/ScoreRangeFont/ScoreRangeFont";
import UserCharScoreBar from "./UserCharScoreBar/UserCharScoreBar";
import useCharWeightList from "../../../../hooks/charWeightList/useCharWeightList";

export default React.memo(function UserCharScore() {
  const { language: appLanguage } = useAppLanguage();

  const [scoreWeight, setScoreWeight] = useState({})
  const [alreadyInit, setAlreadyInit] = useState(false)

  useEffect(() => {
    async function init() {
      setScoreWeight(await useCharWeightList());
      setAlreadyInit(scoreWeight !== undefined)
    }
    if(!alreadyInit) init();
  })

  const { inGameCharData } = useProfileHsrInGameInfo();
  
  // 遺器總分
  const relicTotalScore = inGameCharData ? (
    getRelicScore(
      inGameCharData?.id,
      inGameCharData?.relics,
      scoreWeight
    ).totalScore
  ) : 0;
  // 角色總分
  const charTotalScore = inGameCharData
    ? getCharScore(inGameCharData?.id, inGameCharData,scoreWeight)
    : 0;
  // 各屬性畢業度
  const currAndGrad = inGameCharData
    ? getCurrAndGradScore(inGameCharData?.id, inGameCharData,scoreWeight)[0]
    : [];

  return (
    inGameCharData && (
      <View style={{ gap: 24 }} className="items-center">
        {/* <View style={styles.container}>
          <Text className="text-text font-[HY65] text-[20px]">角色详情</Text>
          <View
            className="w-[100px] h-[30px] bg-[#00000040] rounded-[43px]"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text className="text-text font-[HY65]">默認流派</Text>
          </View>
        </View> */}
        {/* 評分區 */}
        <View style={styles.scoreContainer}>
          {/* 角色評分 */}
          <UserCharScoreItem
            title={LOCALES[appLanguage].CharScore}
            value={
              charTotalScore === -1
              ? "N/A"
              : charTotalScore.toFixed(1)
            }
          />
          {/* 角色評價 */}
          <UserCharScoreItem
            title={LOCALES[appLanguage].CharRank}
            value={<ScoreRangeFont scoreRange={getCharRange(charTotalScore)} />}
          />
          {/* 遺器評分 */}
          <UserCharScoreItem
            title={LOCALES[appLanguage].RelicScore}
            value={relicTotalScore === -1
              ? "N/A"
              : relicTotalScore.toFixed(1)
            }
          />
          {/* 角色評價 */}
          <UserCharScoreItem
            title={LOCALES[appLanguage].RelicRank}
            value={
              <ScoreRangeFont
                scoreRange={getRelicTotalScoreRange(relicTotalScore)}
              />
            }
          />
        </View>
        {/* 當前數值 & 畢業數值分析 */}
        <View>
          <View style={{ gap: 16 }}>
            {currAndGrad?.map((attr: any, i: number) => (
              <UserCharScoreBar
                field={Object.keys(attr)[0]}
                // @ts-ignore
                currScore={Object.values(attr)?.[0]?.[0]}
                // @ts-ignore
                gradScore={Object.values(attr)?.[0]?.[1]}
                // @ts-ignore
                type={Object.values(attr)?.[0]?.[2]}
              />
            ))}
          </View>
        </View>
      </View>
    )
  );
});
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
});
