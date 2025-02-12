import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ExpoImage } from "../../../../types/image";
import { Image } from "expo-image";
import { cn } from "../../../../utils/css/cn";

type Props = {
  icon: ExpoImage;
  children: string;
  selected: boolean;
  onClick: () => void;
};

const CheckIcon = require("../../../../../assets/icons/Check.svg");

export default function FilterItem(props: Props) {
  const [selected, setSelected] = useState(props.selected);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const handlePress = () => {
    setSelected(!selected);
    setTimeout(() => {
      props.onClick();
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.65}
      className="w-full h-10 bg-white pl-2 pr-3"
      style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <Image cachePolicy="none" source={props.icon} className="w-5 h-5" />
      <Text numberOfLines={1} className="font-[HY65] w-16 leading-5">
        {props.children}
      </Text>
      <View
        className={cn(
          "w-4 h-4 absolute right-3",
          selected ? "bg-[#FCBC62]" : "border border-[#00000025]"
        )}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {selected && <Image cachePolicy="none" source={CheckIcon} className="w-2.5 h-2.5" />}
      </View>
    </TouchableOpacity>
  );
}
