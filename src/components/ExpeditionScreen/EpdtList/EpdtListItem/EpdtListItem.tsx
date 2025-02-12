import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BlurView from "../../../global/BlurView/BlurView";
import { Shadow } from "react-native-shadow-2";
import { Image } from "expo-image";
import {
  formatTimeDuration,
  formatTimePoint,
} from "../../../../utils/date/formatTime";
import { animated, useSpring } from "@react-spring/native";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";

type Props = {
  avatars: string[];
  icon: string;
  name: string;
  remainingTime: number;
  ongoing: boolean;
};

export default function EpdtListItem(props: Props) {
  const { language } = useAppLanguage();

  const progressBarAnimation = useSpring({
    from: { width: "0%" },
    to: { width: `${100 - (props.remainingTime / 72000) * 100}%` },
    delay: 600,
  });

  return (
    <View className="w-full h-20 rounded-[4px] rounded-tr-[24px] overflow-hidden">
      <TouchableOpacity activeOpacity={0.65}>
        <BlurView className="w-full">
          <Shadow startColor="#00000025" style={{ width: "100%" }}>
            <View
              className="w-full h-20 p-[10px] bg-[#d2d6db]"
              style={{ gap: 6 }}
            >
              <View style={{ gap: 8, flexDirection: "row" }}>
                {/* icon */}
                <Image cachePolicy="none"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF60]"
                  source={{ uri: props.icon }}
                ></Image>
                <View style={{ gap: 2, flexGrow: 1 }}>
                  {/* name */}
                  <Text
                    className="font-[HY65] text-[15px] text-[#222222] leading-5 w-48"
                    numberOfLines={1}
                  >
                    {props.name}
                  </Text>
                  {/* 剩餘時間 */}
                  <Text className="font-[HY65] text-[13px] text-[#00000060]">
                    {props.ongoing === false
                      ? LOCALES[language].IsDone
                      : formatTimeDuration(props.remainingTime, language)}
                  </Text>
                </View>
                <View
                  style={{
                    gap: 2,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 角色 */}
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    {props.avatars?.map((avatar, i) => (
                      <Image cachePolicy="none"
                        key={i}
                        className="w-5 h-5 rounded-full"
                        source={{ uri: avatar }}
                      />
                    ))}
                  </View>
                  {/* 結束時間 */}
                  <Text className="font-[HY65] text-[13px] text-[#00000060]">
                    {props.ongoing === false
                      ? ""
                      : formatTimePoint(props.remainingTime, language)}
                  </Text>
                </View>
              </View>
              {/* progress bar */}
              <View
                className="w-full h-[10px] bg-[#00000025] rounded-[20px] p-0.5"
                style={{ justifyContent: "center" }}
              >
                <AnimatedView
                  className="h-full bg-[#F3F9FF80] rounded-[20px]"
                  // @ts-ignore
                  style={{
                    transform: [{ translateY: -0.3 }],
                    ...progressBarAnimation,
                  }}
                ></AnimatedView>
              </View>
            </View>
          </Shadow>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}

const AnimatedView = animated(View);
