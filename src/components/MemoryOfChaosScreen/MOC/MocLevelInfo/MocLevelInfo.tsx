import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import CombatType from "../../../../../assets/images/images_map/combatType";
import useTextLanguage from "../../../../language/TextLanguage/useTextLanguage";
import { LinearGradient } from "expo-linear-gradient";
import MonsterImage from "../../../../../assets/images/images_map/monsterImage";
import MOCDataMap from "../../../../../map/memory_of_chao_data_map";
import { LOCALES } from "../../../../../locales";
import useAppLanguage from "../../../../language/AppLanguage/useAppLanguage";

export default function MocLevelInfo({
  versionNumber,
}: {
  versionNumber: number;
}) {
  // @ts-ignore
  const mocData = MOCDataMap[versionNumber];
  const [floor, setFloor] = useState(1);
  const { language } = useAppLanguage();

  return (
    <View
      className="border border-[#DDDDDD20] rounded-[4px] p-2.5 w-[360px]"
      style={{ gap: 8 }}
    >
      {/* Top */}
      <View
        className="z-50"
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text className="text-text text-[16px] font-[HY65]">{LOCALES[language].MOCMissionInfoTitle}</Text>
        <FloorOptions
          length={mocData.info.length}
          onChange={(f) => {
            setFloor(f);
          }}
        />
      </View>
      <View>
        <View style={{ gap: 8 }}>
          {/* 1-1 */}
          <Layer data={mocData?.info?.[floor - 1]} part={1} wave={1} />
          {/* 1-2 */}
          <Layer data={mocData?.info?.[floor - 1]} part={1} wave={2} />
          <View className="w-full h-[1px] bg-[#FFFFFF20]" />
          {/* 2-1 */}
          <Layer data={mocData?.info?.[floor - 1]} part={2} wave={1} />
          {/* 2-2 */}
          <Layer data={mocData?.info?.[floor - 1]} part={2} wave={2} />
        </View>
        <View></View>
      </View>
    </View>
  );
}

const Layer = ({
  data,
  part,
  wave,
}: {
  data: any;
  part: number;
  wave: number;
}) => {
  return (
    data && (
      <View
        className="h-[80px]"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {/*  */}
        <View
          className="w-[100px]"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text className="text-text text-[16px] font-[HY65]">
            {part}-{wave}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              className="w-4 h-4"
              source={
                // @ts-ignore
                CombatType[data["part" + part].weakness_suggest[0]]?.icon
              }
            />
            <Image
              className="w-4 h-4"
              source={
                // @ts-ignore
                CombatType[data["part" + part].weakness_suggest[1]]?.icon
              }
            />
          </View>
        </View>
        {/*  */}
        <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
          {data["part" + part]["wave" + wave].map((monster: any) => (
            <Mob>{monster}</Mob>
          ))}
        </View>
      </View>
    )
  );
};

const Mob = ({ children }: { children: any }) => (
  <>
    <View style={{ gap: 2 }}>
      <TouchableOpacity activeOpacity={0.65}>
        <LinearGradient
          className="w-12 h-12 rounded-[4px]"
          style={{ justifyContent: "center", alignItems: "center" }}
          colors={["#78767D", "#9F9FAA"]}
        >
          <Image
            cachePolicy="none"
            transition={200}
            // @ts-ignore
            source={MonsterImage[children.monster_name]?.icon}
            className="w-9 h-9"
          />
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {children.monster_weakness.map((w: any, i: number) => (
          // @ts-ignore
          <Image key={i} className="w-4 h-4" source={CombatType[w]?.icon} />
        ))}
      </View>
    </View>
  </>
);

const FloorOptions = ({
  onChange,
  length,
}: {
  onChange: (floor: number) => void;
  length: number;
}) => {
  const { language } = useAppLanguage();
  const floors = [
    LOCALES[language].MOCMissionPart1,
    LOCALES[language].MOCMissionPart2,
    LOCALES[language].MOCMissionPart3,
    LOCALES[language].MOCMissionPart4,
    LOCALES[language].MOCMissionPart5,
    LOCALES[language].MOCMissionPart6,
    LOCALES[language].MOCMissionPart7,
    LOCALES[language].MOCMissionPart8,
    LOCALES[language].MOCMissionPart9,
    LOCALES[language].MOCMissionPart10,
    LOCALES[language].MOCMissionPart11,
    LOCALES[language].MOCMissionPart12,
  ].slice(0, length);

  const [currentFloor, setCurrentFloor] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange(currentFloor + 1);
  }, [currentFloor]);

  return (
    <View className="w-[90px]" style={{ alignItems: "flex-end" }}>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
        }}
        activeOpacity={0.35}
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <Text className="text-text text-[16px] font-[HY65]">
          {floors[currentFloor]}
        </Text>
        <Image source={require("./icons/More.svg")} className="w-3 h-1.5" />
      </TouchableOpacity>
      <View
        style={{
          display: open ? "flex" : "none",
          gap: 8,
          alignItems: "center",
        }}
        className="absolute top-[24px] right-0 bg-[#9F9FAA] px-3 py-2 rounded-[4px]"
      >
        {floors.map((floor, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.35}
            onPress={() => {
              setOpen(false);
              setCurrentFloor(i);
            }}
            style={{ alignItems: "flex-end" }}
          >
            <Text className="text-text text-[16px] font-[HY65]">{floor}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};