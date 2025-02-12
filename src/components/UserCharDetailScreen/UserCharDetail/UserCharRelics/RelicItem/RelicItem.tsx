import { View, Text, TouchableOpacity, Dimensions, PixelRatio } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import Relic from "../../../../../../assets/images/images_map/relic";
import { RelicName } from "../../../../../types/relic";
import officalRelicId from "../../../../../../map/relic_offical_id_map";
import AttributeImage from "../../../../../../assets/images/images_map/attributeImage";
import RelicScore from "./RelicScore/RelicScore";
import CardBg from "../../../../global/CardBg/CardBg";
import { animated, useSpring } from "@react-spring/native";
import { LOCALES } from "../../../../../../locales";
import useAppLanguage from "../../../../../language/AppLanguage/useAppLanguage";
import { upperCase } from "lodash";
import DeviceInfo from "react-native-device-info";

export default React.memo(function RelicItem({
  userRelicData,
  score,
  selected,
  onSlectedChange,
}: {
  userRelicData: any;
  score: number;
  selected: boolean;
  onSlectedChange: (s: boolean) => void;
}) {
  const { language: appLanguage } = useAppLanguage();

  const relicSetId = officalRelicId[userRelicData.set_id] as RelicName;
  const relicCount =
    Number(
      userRelicData.icon?.split(".")[0][
        userRelicData.icon?.split(".")[0].length - 1
      ]
    ) + 1;

  const containerAnimation = useSpring({
    justifyContent: selected ? "center" : "flex-start",
  });

  return (
    <AnimatedView
      className="py-2"
      style={[
        {
          flexDirection: selected ? "column" : "row",
          gap: selected ? 18 : 6,
          width: selected ? "100%" : Dimensions.get("screen").width / 2 - 36,
          height: selected ? 230 : null,
          alignItems: selected ? "center" : "flex-start",
        },
      ]}
    >
      {/* 圖片 */}
      <AnimatedView>
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={() => {
            onSlectedChange(!selected);
          }}
        >
          <View style={{ transform: [{ scale: 0.6 }, { translateX: -13 }] }}>
            <CardBg rare={userRelicData.rarity} />
          </View>
          <View
            className="w-[47px] h-[47px]"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image cachePolicy="none"
              transition={200}
              className="w-[30px] h-[30px]"
              // @ts-ignore
              source={Relic[relicSetId]?.["icon" + relicCount]}
            />
          </View>
        </TouchableOpacity>
        {/* 等級 */}
        <View
          className="absolute top-[41px] w-[49px] z-50"
          style={{ alignItems: "center" }}
        >
          <View className="bg-[#00000040] rounded-[15px] px-1.5 py-0.5">
            <Text className="text-text font-[HY65] text-[8px] text-center">
              {userRelicData.level}
            </Text>
          </View>
        </View>
      </AnimatedView>
      {/* 詞條 */}
      {selected ? (
        <View className="w-[200px]" style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image cachePolicy="none"
              className="w-[24px] h-[24px]"
              // @ts-ignore
              source={AttributeImage[userRelicData.main_affix.field]}
            />
            <Text className="text-text font-[HY65]">
              {
                LOCALES[appLanguage][
                  "ATTR_" + userRelicData.main_affix.field.toUpperCase()
                ]
              }
            </Text>
            <Text className="text-text text-[16px] font-[HY65] absolute right-0">
              +{userRelicData.main_affix.display}
            </Text>
          </View>
          {userRelicData.sub_affix.map((sub: any) => {
            return (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Image cachePolicy="none"
                  className="w-[24px] h-[24px]"
                  // @ts-ignore
                  source={AttributeImage[sub.field]}
                />
                <Text className="text-text font-[HY65]">
                  {LOCALES[appLanguage]["ATTR_" + sub.field.toUpperCase()]}
                </Text>
                <Text className="text-text text-[16px] font-[HY65] absolute right-0">
                  +{sub.display}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        // 簡短詞條
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight:20 * PixelRatio.get()
            }}
          >
            {/* 主詞條 */}
            <View style={{ flexDirection: "row" }}>
              <Image cachePolicy="none"
                className="w-[20px] h-[20px]"
                // @ts-ignore
                source={AttributeImage[userRelicData.main_affix.field]}
              />
              <Text className="text-text text-[12px] font-[HY65]">
                +{userRelicData.main_affix.display}
              </Text>
            </View>
            {/* 評分 */}
            <RelicScore score={score} />
          </View>
          {/* 副詞條 */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth:300}}>
            {userRelicData.sub_affix.map((sub: any) => (
              <View
                style={{ flexDirection: "row", alignItems: "center",flexBasis: '50%'
              }}
              >
                <Image cachePolicy="none"
                  className="w-[20px] h-[20px]"
                  // @ts-ignore
                  source={AttributeImage[sub.field]}
                />
                <Text className="text-text text-[10px] font-[HY65]">
                  +{sub.display}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </AnimatedView>
  );
});
const AnimatedView = animated(View);
