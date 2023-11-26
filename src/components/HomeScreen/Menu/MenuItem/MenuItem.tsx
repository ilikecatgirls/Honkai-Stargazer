import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { BlurView } from "expo-blur";
import { LinearGradient as LinearGradientExpo } from "expo-linear-gradient";

export default function MenuItem({
  children,
  Icon,
  width,
  height,
}: {
  children: any;
  Icon: any;
  width: number;
  height: number;
}) {
  return (
    <TouchableNativeFeedback>
      <View>
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
        >
          {/* LinearGradient definition */}
          <Defs>
            <LinearGradient id="paint0_linear" x1="56" y1="12" x2="56" y2="92">
              <Stop offset="0" stopColor="#222222" />
              <Stop offset="1" stopColor="#222222" stopOpacity="0" />
            </LinearGradient>
          </Defs>

          {/* Rectangles */}
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx="4"
            fill="url(#paint0_linear)"
            fillOpacity="0.6"
          />
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx="4"
            fill="white"
            fillOpacity="0.1"
          />
          <Rect
            x="0.75"
            y="0.75"
            width={width - 1.5}
            height={height - 1.5}
            rx="3.25"
            stroke="#907C54"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
        </Svg>
        <View
          className="absolute top-[15px]"
          style={{ alignItems: "center", width, height }}
        >
          <View style={{ gap: 7, alignItems: "center" }}>
            {Icon && <Icon weight="fill" size={32} color="white" />}
            <Text className="text-[14px] text-white">{children}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
