import { Text } from "react-native";
import React from "react";
import Button from "../../../global/Button/Button";
import { cn } from "../../../../utils/css/cn";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../../locales";

type Props = {
  scrollHandler: SharedValue<number>;
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

export default function LcAction(props: Props) {
  const { language } = useAppLanguage();
  const bottomAnimatedStyles = useAnimatedStyle(() => {
    if (props.scrollHandler.value > 0) {
      return {
        opacity: withSpring(0),
      };
    } else {
      return {
        opacity: withSpring(1),
      };
    }
  });

  return (
    <Animated.View
      className={cn("w-full h-[83px] mb-[20px] z-50", "absolute bottom-0")}
      style={[
        bottomAnimatedStyles,
        {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 27,
        },
      ]}
    >
      <Button onPress={props.onLeftClick} width={200} height={46}>
        <Text className="font-[HY65] text-[16px]" numberOfLines={1}>
          {LOCALES[language].AdviceCharacters}
        </Text>
      </Button>
    </Animated.View>
  );
}
