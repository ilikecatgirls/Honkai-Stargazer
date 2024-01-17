import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useQuery } from "react-query";
import db from "../../../../firebase/db";
import CharacterImage from "../../../../../assets/images/images_map/chacracterImage";
import officalCharId from "../../../../../map/character_offical_id_map";
import useMyFirebaseUid from "../../../../firebase/hooks/FirebaseUid/useMyFirebaseUid";
import { LinearGradient } from "expo-linear-gradient";

export default function MOCLbItem({
  versionNumber,
  floorNumber,
  floorName,
}: {
  versionNumber: number;
  floorNumber: number;
  floorName: string;
}) {
  const [showRank, setShowRank] = useState(false);

  const { data: floorLbData } = useQuery(
    ["moc-leaderboard", floorNumber, versionNumber],
    async () =>
      (
        await db
          .UserMemoryOfChaos(versionNumber, floorNumber)
          .orderBy("star_num", "desc")
          .orderBy("round_num")
          .orderBy("challenge_time")
          .limit(5)
          .get()
      ).docs.map((doc) => doc.data())
  );

  const firebaseUID = useMyFirebaseUid();
  const { data: myFloorLbData } = useQuery(
    ["my-moc-leaderboard", floorNumber, versionNumber, firebaseUID],
    async () =>
      (
        await db
          .UserMemoryOfChaos(versionNumber, floorNumber)
          .doc(firebaseUID)
          .get()
      ).data()
  );

  return (
    <LinearGradient
      colors={["#000000", "#00000000"]}
      className="border border-[#DDDDDD20] rounded-[4px] py-4 px-3 w-[360px]"
      style={{ gap: 8 }}
    >
      <Text className="text-text2 font-[HY65] text-[16px]">{floorName}</Text>
      <View style={{ gap: 12 }}>
        {[
          floorLbData?.[0],
          floorLbData?.[1],
          floorLbData?.[2],
          floorLbData?.[3],
          floorLbData?.[4],
        ]?.map((user, i) => (
          <RecordItem
            key={i}
            rank={i + 1}
            {...user}
            showRank={showRank}
            onShowRank={setShowRank}
          />
        ))}
        <RecordItem
          rank={"-"}
          {...myFloorLbData}
          showRank={showRank}
          onShowRank={setShowRank}
        />
      </View>
    </LinearGradient>
  );
}

const RecordItem = (props: any) => {
  const [isLayer2, setIsLayer2] = useState(true);

  function getRankColor(rank: number) {
    const colors = {
      1: "#FFD070",
      2: "#F3F9FF80",
      3: "#AB6F66",
    };
    // @ts-ignore
    return colors[rank] || "#FFFFFF";
  }

  return (
    <View className="pl-3" style={{ flexDirection: "row", gap: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Text
              style={{ color: getRankColor(props.rank) }}
              className="font-[HY65] text-[16px]"
            >
              {props.rank}
            </Text>
            <Text
              className="text-[14px] font-[HY65] leading-4"
              style={{ color: props?.name ? "white" : "#DDD" }}
            >
              {
                // props?.uuid?.substr(0, 3) +
                // props?.uuid?.substr(-3).padStart(props.uuid?.length - 3, "*")
                props.name || "暫無數據"
              }
            </Text>
          </View>
          {props.challenge_time && (
            <Text className="text-text text-[10px] font-[HY65] translate-x-[-10px]">
              {new Date(props.challenge_time).toLocaleDateString()}{" "}
              {new Date(props.challenge_time).getHours()}:
              {new Date(props.challenge_time).getMinutes()} {props.round_num}輪{" "}
              {props.star_num}星
            </Text>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.35}
          onPress={() => {
            // setIsLayer2(!isLayer2);
            props.onShowRank(!props.showRank);
          }}
          style={{ flexDirection: "row", gap: 6 }}
        >
          {props.round_num !== 0 ? (
            props[isLayer2 ? "layer_2" : "layer_1"]?.characters.map(
              (char: any) => (
                <View
                  key={char.id}
                  style={{ gap: 2, alignItems: "center" }}
                  className="w-8"
                >
                  <Image
                    className="w-6 h-6 rounded-full"
                    // @ts-ignore
                    source={CharacterImage[officalCharId[char.id]].icon}
                  />
                  <Text className="text-text font-[HY65] text-[10px]">
                    {props.showRank ? (
                      <Text
                        style={{ color: char.rank === 6 ? "#DD8200" : "#FFF" }}
                      >{`${char.rank} 魂`}</Text>
                    ) : (
                      `Lv ${char.level}`
                    )}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text className="text-text2 font-[HY65] text-[12px]">快速通關</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
