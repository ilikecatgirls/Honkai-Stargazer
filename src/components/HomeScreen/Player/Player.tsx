import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PlayerAction from "./PlayerAction/PlayerAction";
import PlayerLevelBar from "./PlayerLevelBar/PlayerLevelBar";
import UUID from "./UUID/UUID";
import PlayerAvator from "./PlayerAvator/PlayerAvator";
import { cn } from "../../../utils/css/cn";
import PlayerCharacter from "./PlayerCharacter/PlayerCharacter";
import useHsrPlayerData from "../../../hooks/hoyolab/useHsrPlayerData";
import useAppLanguage from "../../../language/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../locales";
import useIsAdmin from "../../../firebase/hooks/Role/useIsAdmin";
import useIsTester from "../../../firebase/hooks/Role/useIsTester";

export default function Player() {
  const { language } = useAppLanguage();

  const playerData = useHsrPlayerData();
  const playerNickName = playerData?.nickname;
  const playerLevel = playerData?.level;

  const isAdmin = useIsAdmin();
  const isTester = useIsTester();

  return (
    <View
      className={cn("w-full pt-12 px-4 z-50")}
      style={styles.playerContainer}
    >
      {/* uuid */}
      <UUID />
      {/* player details */}
      <View className="w-full" style={styles.playerDetails}>
        <View className="z-50" style={styles.playerTopRow}>
          <View style={styles.playerAvatarRow}>
            <PlayerAvator />
            <View>
              <Text
                className={cn(
                  "text-text",
                  isAdmin && "text-[#FFD070]",
                  isTester && "text-green-400",
                  "text-[22px] font-[HY65] mb-1.5"
                )}
              >
                {playerNickName || LOCALES[language].Trailblazer}
              </Text>
              <PlayerCharacter />
            </View>
          </View>
          <View style={styles.playerActionColumn} className="absolute right-0">
            {/* 三個點點 */}
            <PlayerAction />
            {/* 開拓等級 */}
            <Text className="font-[HY65] text-[#DBC291] text-[14px]">
              {LOCALES[language].PlayerLevel}{" "}
              {playerLevel || ": " + LOCALES[language].NoDataYet}
            </Text>
          </View>
        </View>
        <PlayerLevelBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    gap: 12,
    alignItems: "flex-start",
  },
  playerDetails: {
    flexDirection: "column",
    gap: 12,
  },
  playerTopRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playerAvatarRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playerActionColumn: {
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-end",
  },
});
