import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import genRanHex from "../../../../utils/genRanHex";

export default function PlayerCharacter() {
  const [ranHexs, setRanHexs] = useState([
    [genRanHex(6), genRanHex(6)],
    [genRanHex(6), genRanHex(6)],
    [genRanHex(6), genRanHex(6)],
  ]);

  return (
    <View className="flex flex-row gap-1">
      <Pressable
        className="w-[30px] h-[30px] border-2 rounded-full"
        style={{
          backgroundColor: "#" + ranHexs[0][0],
          borderColor: "#" + ranHexs[0][1],
        }}
      />
      <Pressable
        className="w-[30px] h-[30px] border-2 rounded-full"
        style={{
          backgroundColor: "#" + ranHexs[1][0],
          borderColor: "#" + ranHexs[1][1],
        }}
      />
      <Pressable
        className="w-[30px] h-[30px] border-2 rounded-full"
        style={{
          backgroundColor: "#" + ranHexs[2][0],
          borderColor: "#" + ranHexs[2][1],
        }}
      />
    </View>
  );
}