import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ScoreColors } from "../../../../../../constant/score";
import getScoreRange from "../../utils/getScoreRange";
import RelicScoreBlurMap from "./images/map/RelicScoreBlurMap";

export default function RelicScore({ score }: { score: number }) {
  const scoreRange = getScoreRange(score);

  return (
    <View>
      <Text
        style={{ color: ScoreColors[scoreRange] }}
        className="font-[HY65] text-[15px] translate-y-[-2px]"
      >
        {score.toFixed(1)}
      </Text>
      {/* 評分 */}
      <Image
        source={RelicScoreBlurMap[scoreRange]}
        className="absolute w-12 h-[30px] translate-y-[-8px] translate-x-[-4px]"
      />
    </View>
  );
}