import React, { useContext } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image";
import LightconeContext from "../../../../context/LightconeContext";
import { Dimensions, Platform } from "react-native";

type Props = {
  scrollHandler: SharedValue<number>;
  lcContainerHeight: number;
};

export default function LcImageFull(props: Props) {
  const lcData = useContext(LightconeContext);

  const imageAnimatedStyles = useAnimatedStyle(() => {
    // const height = props.charContainerHeight;
    // const offsetY = props.scrollHandler.value;

    // return { opacity: 1 - (offsetY / height) * 12 || 0 };
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
    <Animated.View style={imageAnimatedStyles}>
      <Image
        transition={200}
        style={{
          width: Dimensions.get("window").width,
          height: (Dimensions.get("window").height * 3) / 5,
          transform: [{ scale: 1 }],
        }}
        source={lcData?.imageFull}
        contentFit={Platform.OS === "android" ? "none" : "contain"}
      />
    </Animated.View>
  );
}