import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Options from "../../global/Options/Options";
import { map } from "lodash";
import { getCharFullData } from "../../../utils/data/getDataFromMap";
import useTextLanguage from "../../../language/TextLanguage/useTextLanguage";
import officalCharId from "../../../../map/character_offical_id_map";
import getRankColor from "../../../utils/getRankColor";
import { useQuery } from "react-query";
import db from "../../../firebase/db";
import useUser from "../../../firebase/hooks/User/useUser";
import { ScoreColors } from "../../../constant/score";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constant/screens";
import { getCharRange } from "../../../utils/calculator/charScoreCalculator/getCharScore";
import useAppLanguage from "../../../language/AppLanguage/useAppLanguage";
import { Image } from "expo-image";
import Relic from "../../../../assets/images/images_map/relic";
import officalRelicId from "../../../../map/relic_offical_id_map";
import { FlatList } from "react-native";

export default function RelicScoreLb(props: {
  selectedCharOption: any;
  onChange: (v: any) => void;
}) {
  const { language: textLanguage } = useTextLanguage();

  // 所有角色選項
  const charOptions: { id: string; name: string }[] = map(
    officalCharId,
    (v, k) => ({
      id: k,
      name: getCharFullData(v, textLanguage).name,
    })
  );
  // 當前選擇角色
  const [selectedCharOption, setSelectedCharOption] = useState(
    props.selectedCharOption
  );
  // <-> 父組件同步更新
  useEffect(() => {
    props.onChange(selectedCharOption);
  }, [selectedCharOption]);
  useEffect(() => {
    setSelectedCharOption(props.selectedCharOption);
  }, [props.selectedCharOption]);

  // 評分數據
  const { data: charScores } = useQuery(
    ["relic-score-leaderboard", selectedCharOption.id],
    async () =>
      (
        await db
          .UserCharacterScores(selectedCharOption.id)
          .orderBy("relic_score", "desc")
          .limit(99)
          .get()
      ).docs?.map((doc) => ({ id: doc.id, ...doc.data() })),
    { staleTime: 1000 * 60 }
  ) as any;

  return (
    <>
      <View style={{ gap: 12 }}>
        <Options
          values={charOptions}
          value={selectedCharOption}
          onChange={(c) => {
            setSelectedCharOption(c);
          }}
        />
        <FlatList
          data={charScores} // 数据源
          keyExtractor={(item, index) => `relic-score-${item.id || index}`} // 提供唯一的key
          renderItem={(
            { item, index } // 渲染列表项
          ) => (
            <CharRelicScoreLbItem
              rank={index + 1}
              userId={item.id}
              charId={selectedCharOption.id}
              relicTotalScore={item.relic_score}
              relicHeadScore={item.relic_head_score}
              relicHandsScore={item.relic_hands_score}
              relicBodyScore={item.relic_body_score}
              relicShoesScore={item.relic_shoes_score}
              relicBallScore={item.relic_ball_score}
              relicLinkScore={item.relic_link_score}
              relicHeadSetId={item.relic_head_set_id}
              relicHandsSetId={item.relic_hands_set_id}
              relicBodySetId={item.relic_body_set_id}
              relicShoesSetId={item.relic_shoes_set_id}
              relicBallSetId={item.relic_ball_set_id}
              relicLinkSetId={item.relic_link_set_id}
            />
          )}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 2 ,gap: 12,}} // 设置内容容器的样式
          style={{ height: Dimensions.get("screen").height - 220 }} // 设置FlatList的样式
        />
      </View>
    </>
  );
}

const CharRelicScoreLbItem = React.memo(
  (props: {
    rank: number;
    userId: string;
    relicTotalScore: number;
    relicHeadScore: number;
    relicHandsScore: number;
    relicBodyScore: number;
    relicShoesScore: number;
    relicBallScore: number;
    relicLinkScore: number;
    relicHeadSetId: number;
    relicHandsSetId: number;
    relicBodySetId: number;
    relicShoesSetId: number;
    relicBallSetId: number;
    relicLinkSetId: number;
    charId: string;
  }) => {
    const navigation = useNavigation();
    const { language: appLanguage } = useAppLanguage();

    const { data: user } = useUser(props.userId);

    const handleNavigateToUserCharaPage = () => {
      // @ts-ignore
      navigation.push(SCREENS.UserCharDetailPage.id, {
        uuid: user?.uuid,
        charId: officalCharId?.[props.charId],
      });
    };

    return (
      !!props?.relicTotalScore && (
        <View className="flex-row items-center justify-between h-6">
          <View className="flex-row" style={{ gap: 10 }}>
            <Text
              style={{ color: getRankColor(props.rank) }}
              className="font-[HY65] text-[20px] leading-5"
            >
              {props.rank}
            </Text>
            <TouchableOpacity
              activeOpacity={0.35}
              onPress={handleNavigateToUserCharaPage}
            >
              <Text className="text-text font-[HY65] text-[20px] leading-6">
                {user?.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center" style={{ gap: 12 }}>
            {/* 遺器圖標 */}
            <View className="flex-row" style={{ gap: 6 }}>
              <Image cachePolicy="none"
                className="w-7 h-7"
                // @ts-ignore
                source={
                  Relic[officalRelicId[props.relicHeadSetId]]?.["icon" + 1]
                }
              />
              <Image cachePolicy="none"
                className="w-7 h-7"
                // @ts-ignore
                source={
                  Relic[officalRelicId[props.relicHandsSetId]]?.["icon" + 2]
                }
              />
              <Image cachePolicy="none"
                className="w-7 h-7"
                // @ts-ignore
                source={
                  Relic[officalRelicId[props.relicBodySetId]]?.["icon" + 3]
                }
              />
              <Image cachePolicy="none"
                className="w-7 h-7"
                // @ts-ignore
                source={
                  Relic[officalRelicId[props.relicShoesSetId]]?.["icon" + 4]
                }
              />  
            </View>
            {/* 分數 */}
            <View className="items-end w-[56px]">
              <Text
                style={{
                  color: ScoreColors[getCharRange(props?.relicTotalScore)],
                }}
                className="font-[HY65] text-[18px] leading-5"
              >
                {props?.relicTotalScore?.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      )
    );
  }
);
