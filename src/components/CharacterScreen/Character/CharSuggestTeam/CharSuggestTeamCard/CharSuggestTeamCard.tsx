import React, { useCallback, useState } from "react";
import { ExpoImage } from "../../../../../types/image";
import CharCard from "../../../../global/layout/CharCard/CharCard";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import PopUpCard from "../../../../global/layout/PopUpCard/PopUpCard";

type Props = {
  team: { image: ExpoImage; rare: number; name: string }[];
};

export default function CharSuggestTeamCard(props: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = useCallback(() => {
    setIsSelected(true);
  }, [isSelected]);

  return (
    <View>
      <View
        className="w-full"
        style={{
          opacity: isSelected ? 0 : 1,
          flexDirection: "row",
          gap: 8,
        }}
      >
        {props.team.map((char, i) => (
          <CharCard onPress={handlePress} key={i} {...char} />
        ))}
      </View>
      <Modal
        useNativeDriverForBackdrop
        animationIn="fadeInLeft"
        animationOut="fadeOutRight"
        isVisible={isSelected}
      >
        <Pressable
          onPress={() => {
            setIsSelected(false);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            transform: [{ translateY: -32 }],
          }}
        >
          <View
            className="w-full"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {props.team.map((char, i) => (
              <CharCard onPress={handlePress} key={i} {...char} />
            ))}
          </View>
          <PopUpCard
            title="狐鸭三拐一"
            content="停云、布洛妮娅双同协的增益，给予希儿很强的启动能力、高斩杀线的收割能力、以及高额的爆发能力。而符玄保证队伍生存的同时，也能提供一定的辅助能力。"
          />
        </Pressable>
      </Modal>
    </View>
  );
}