import {
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
} from "react-native";
import React, { useState } from "react";
import MOCLbItem from "./MOCLbItem/MOCLbItem";
import MOCDataMap from "../../../../map/memory_of_chao_data_map";
import useTextLanguage from "../../../language/TextLanguage/useTextLanguage";
import Button from "../../global/Button/Button";
import Listbox from "../../global/Listbox/Listbox";
import { Image } from "expo-image";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamList } from "../../../types/navigation";

export default function MOCLbList() {
  const { language: textLanguage } = useTextLanguage();

  const route = useRoute<RouteProp<ParamList, "MemoryOfChaosLeaderboard">>();
  const scheduleId = route.params?.scheduleId;
  const floorNumber = route.params?.floorNumber;

  const mocVersion = [
    {
      id: 1009,
      name: `${MOCDataMap[1009].time.versionBegin} - ${MOCDataMap[1009].time.versionEnd} ${MOCDataMap[1009].name[textLanguage]}`,
    },
    {
      id: 1008,
      name: `${MOCDataMap[1008].time.versionBegin} - ${MOCDataMap[1008].time.versionEnd} ${MOCDataMap[1008].name[textLanguage]}`,
    },
  ];
  const [selectedVersion, setSelectedVersion] = useState(
    scheduleId || mocVersion[0].id
  );

  // @ts-ignore
  const mocData = MOCDataMap[selectedVersion];
  const floorNames = mocData.info
    .map((floor: any) => floor.name?.[textLanguage])
    .reverse();

  return (
    <View style={{ width: "100%" }} className="z-30">
      <ScrollView
        className="p-4 pb-0 pt-[127px]"
        style={{ height: Dimensions.get("screen").height }}
      >
        <View className="w-full mb-4 z-40" style={{ alignItems: "center" }}>
          {floorNumber ? (
            <></>
          ) : (
            <Listbox
              top={8}
              button={
                <Button width={300} height={46} withArrow>
                  <Text className="text-[16px] font-[HY65] text-[#222]">
                    {mocVersion.filter((v) => v.id === selectedVersion)[0].name}
                  </Text>
                </Button>
              }
              value={selectedVersion}
              onChange={(version) => {
                setSelectedVersion(version);
              }}
            >
              {mocVersion?.map((version) => (
                <Listbox.Item key={version.id} value={version.id}>
                  {/* @ts-ignore */}
                  {version.name}
                </Listbox.Item>
              )) || []}
            </Listbox>
          )}
        </View>
        <View style={{ gap: 16, alignItems: "center" }} className="mb-44">
          {floorNumber
            ? [floorNames?.[floorNumber - 1]]?.map(
                (name: string, i: number) => (
                  <MOCLbItem
                    key={i}
                    versionNumber={selectedVersion}
                    floorNumber={floorNames.length - i}
                    floorName={name}
                  />
                )
              )
            : floorNames?.map((name: string, i: number) => (
                <MOCLbItem
                  key={i}
                  versionNumber={selectedVersion}
                  floorNumber={floorNames.length - i}
                  floorName={name}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
}
