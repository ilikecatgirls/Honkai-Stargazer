import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constant/screens";
import { formatTimeDurationSimple } from "../../../utils/date/formatTime";
import useAppLanguage from "../../../language/AppLanguage/useAppLanguage";

export default function EventListItemType2({
  event,
  eventListData,
  displayType,
  onLongPress,
}: {
  event: any;
  eventListData: any;
  displayType: 1 | 2;
  onLongPress: () => void;
}) {
  const navigation = useNavigation();
  const { language } = useAppLanguage();

  const handleNavigateEvent = (id: string) => {
    // @ts-ignore
    navigation.push(SCREENS.EventPage.id, { id });
  };

  return (
    <TouchableOpacity
      key={event?.ann_id}
      className="w-full"
      style={{ flexDirection: "row" }}
      activeOpacity={0.65}
      onPress={() => {
        handleNavigateEvent(event?.ann_id);
      }}
      onLongPress={onLongPress}
    >
      {displayType === 1 && (
        <View
          className="w-[40px] h-[46px] bg-[#F3F9FF80] items-center justify-center"
          style={{ gap: 4 }}
        >
          <Text className="font-[HY65] w-5 leading-4 text-center">
            {formatTimeDurationSimple(
              new Date(eventListData.end_time).getTime() / 1000 -
                Date.now() / 1000,
              language
            )}
          </Text>
        </View>
      )}
      {displayType === 2 && (
        <View className="px-2 py-1 bg-[#F3F9FF80] absolute top-[9px] left-[9px] z-50">
          <Text className="font-[HY65] leading-4">
            {formatTimeDurationSimple(
              new Date(eventListData.end_time).getTime() / 1000 -
                Date.now() / 1000,
              language
            )}
          </Text>
        </View>
      )}
      <Image cachePolicy="none"
        transition={200}
        className="aspect-[360/130] flex-1"
        source={event?.banner}
      />
    </TouchableOpacity>
  );
}
