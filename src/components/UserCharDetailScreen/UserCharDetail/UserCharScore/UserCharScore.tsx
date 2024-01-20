import { View, Text, Platform } from "react-native";
import React from "react";
import getRelicScore, {
  getRelicTotalScoreRange,
} from "../../../../utils/calculator/relicScoreCalculator/getRelicScore";
import useProfileHsrInGameInfo from "../../../../context/UserCharDetailData/hooks/useProfileHsrInGameInfo";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { Image } from "expo-image";
import ScoreRangeFont from "../../../../../assets/images/images_map/scoreRangeFont";
import getCharScore, {
  getCharRange,
} from "../../../../utils/calculator/charScoreCalculator/getCharScore";
import { cn } from "../../../../utils/css/cn";

export default function UserCharScore() {
  const { language: appLanguage } = useAppLanguage();

  const { inGameCharData } = useProfileHsrInGameInfo();
  const userRelicsData: any[] = inGameCharData?.relics;

  const { totalScore: relicTotalScore } = getRelicScore(
    inGameCharData?.id,
    userRelicsData
  );
  const charTotalScore = inGameCharData
    ? getCharScore(inGameCharData?.id, inGameCharData)
    : 0;

  const { language } = useAppLanguage()

  return (
    inGameCharData && (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {/* <View style={{ gap: 8, alignItems: "center" }}>
          <Text className="text-text font-[HY65] text-[24px]">101%</Text>
          <Text className="text-text font-[HY65] text-[12px]">角色毕业率</Text>
        </View> */}

          <View
            className="h-[54px]"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Text
              className={cn(
                "text-text font-[HY65] text-[24px]",
                Platform.OS === "ios" ? "translate-y-[6px]" : ""
              )}
            >
              {charTotalScore.toFixed(1)}
            </Text>
            <Text className="text-text font-[HY65] text-[12px]">{LOCALES[language].CharScore}</Text>
          </View>
          <View
            className="h-[54px]"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Image
              className="w-12 h-8"
              source={ScoreRangeFont[getCharRange(charTotalScore)]}
              contentFit="contain"
            />
            <Text className="text-text font-[HY65] text-[12px]">{LOCALES[language].CharRank}</Text>
          </View>
          <View
            className="h-[54px]"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Text
              className={cn(
                "text-text font-[HY65] text-[24px]",
                Platform.OS === "ios" ? "translate-y-[6px]" : ""
              )}
            >
              {relicTotalScore.toFixed(1)}
            </Text>
            <Text className="text-text font-[HY65] text-[12px]">
              {LOCALES[appLanguage].RelicScore}
            </Text>
          </View>
          <View
            className="h-[54px]"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Image
              className="w-12 h-8"
              source={ScoreRangeFont[getRelicTotalScoreRange(relicTotalScore)]}
              contentFit="contain"
            />
            <Text className="text-text font-[HY65] text-[12px]">
              {LOCALES[appLanguage].RelicRank}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", gap: 2 }}>
          <Text className="text-text font-[HY65] text-[18px] leading-5">
            {LOCALES[appLanguage].LackOfUserData}
          </Text>
          <Text className="text-[#FFFFFF60] font-[HY65] text-[12px] leading-4">
            {LOCALES[appLanguage].LeaderboardDataFrom}
          </Text>
        </View>
      </>
    )
  );
}
