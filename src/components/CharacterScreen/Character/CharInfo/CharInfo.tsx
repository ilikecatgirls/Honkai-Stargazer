import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import CharStars from "../../../global/PageStars/PageStars";
import { Image } from "expo-image";
import Path from "../../../../../assets/images/images_map/path";
import CombatType from "../../../../../assets/images/images_map/combatType";
import useCharData from "../../../../context/CharacterData/hooks/useCharData";
import { globalStyles } from "../../../../../styles/global";

export default React.memo(function CharInfo() {
  const { charData } = useCharData();
  const [containerLayout, setContainerLayout] = useState<any>({ height: 72 });

  return (
    <View
      className="px-6"
      style={{
        paddingTop:
          Dimensions.get("screen").height - 140 - containerLayout.height,
        gap: 8,
      }}
    >
      <View
        onLayout={(e) => {
          setContainerLayout(e.nativeEvent.layout);
        }}
        style={{ gap: 12 }}
      >
        <Text
          className="text-[32px] font-[HY65] text-white leading-9"
          style={globalStyles.textShadow}
        >
          {charData?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CharStars count={charData?.rare || 5} />
          <View>
            <Text
              numberOfLines={1} 
              ellipsizeMode='tail'  
              className="text-[16px] text-white font-[HY65] leading-5"
              style={[globalStyles.textShadow,{width:150},{textAlign: 'right'}]}
            >
              {charData?.location}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 26 }}>
          {/* 命途 */}
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image cachePolicy="none"
              // @ts-ignore
              source={Path[charData?.pathId]?.icon}
              style={{ width: 24, height: 24 }}
            />
            <Text
              className="text-[16px] text-white font-[HY65] leading-5"
              style={globalStyles.textShadow}
            >
              {charData?.path}
            </Text>
          </View>
          {/* 屬性 */}
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Image cachePolicy="none"
              // @ts-ignore
              source={CombatType[charData?.combatTypeId]?.icon}
              style={{ width: 24, height: 24 }}
            />
            <Text
              className="text-[16px] text-white font-[HY65] leading-5"
              style={globalStyles.textShadow}
            >
              {charData?.combatType}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});
