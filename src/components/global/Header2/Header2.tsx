import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { GestureResponderEvent } from "react-native-modal";

const CloseBtn = require("../../../../assets/icons/Close.svg");
const BackBtn = require("../../../../assets/icons/Back.svg");

type Props = {
  leftBtn?: "close" | "back";
  rightBtn?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  onBack?: () => void;
};

export default function Header2(props: Props) {
  const navigation = useNavigation();

  const handleClose = () => {
    props.onBack && props.onBack();
    navigation.goBack();
  };

  return (
    <Pressable
      onPress={props.onPress}
      style={{ position: "absolute", width: "100%", zIndex: 50 }}
    >
      <View className="w-full h-[110px]">
        {/* 左邊叉叉 */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute left-[17px] bottom-[19px] z-50"
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={props.leftBtn === "back" ? BackBtn : CloseBtn}
          />
        </TouchableOpacity>
        {/* 右邊按鈕 */}
        <View className="absolute right-[17px] bottom-[19px] z-50">
          {props.rightBtn}
        </View>
      </View>
    </Pressable>
  );
}