import React, { useEffect, useState } from "react";
import { View, ScrollView, LayoutChangeEvent, Text } from "react-native";
import { cn } from "../../../utils/css/cn";
import MenuItem from "./MenuItem/MenuItem";
import {
  BaseballCap,
  Books,
  Calendar,
  ClockClockwise,
  Gauge,
  MapTrifold,
  MathOperations,
  MedalMilitary,
  Moon,
  Planet,
  ShootingStar,
  StarOfDavid,
  Sword,
  Ticket,
  Users,
} from "phosphor-react-native";
import MenuItemLarge from "./MenuItemLarge/MenuItemLarge";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../../constant/screens";
import useHsrNote from "../../../hooks/hoyolab/useHsrNote";
import _ from "lodash";
import { formatTimePoint } from "../../../utils/date/formatTime";
import useAppLanguage from "../../../context/AppLanguage/useAppLanguage";
import { LOCALES } from "../../../../locales";
import Toast from "../../../utils/toast/Toast";
import formatNumber from "../../../utils/format/formatNumber";

export default function Menu() {
  const navigation = useNavigation();
  const { language } = useAppLanguage();

  //* Layout
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [menuItemSize, setMenuItemSize] = useState({ width: 0, height: 0 });
  const [menuItemLargeSize, setMenuItemLargeSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    MenuItem;
    setMenuItemSize({
      width: (layout.width - 72) / 4,
      height: (((layout.width - 72) / 4) * 9) / 8,
    });
    setMenuItemLargeSize({
      width: ((layout.width - 72) / 4) * 2 + 13,
      height: (((layout.width - 72) / 4) * 9) / 8,
    });
  }, [layout]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  //* Data
  const playerNote = useHsrNote();

  //* Menu
  const menuItems = [
    // 角色列表
    {
      type: "normal",
      name: SCREENS.CharacterListPage.getShortName(language),
      icon: SCREENS.CharacterListPage.icon,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.CharacterListPage.id);
      },
    },
    // 光錐列表
    {
      type: "normal",
      name: SCREENS.LightconeListPage.getShortName(language),
      icon: SCREENS.LightconeListPage.icon,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.LightconeListPage.id);
      },
    },
    // 遺器列表F
    {
      type: "normal",
      name: SCREENS.RelicListPage.getShortName(language),
      icon: SCREENS.RelicListPage.icon,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.RelicListPage.id);
      },
    },
    // 混沌回憶
    {
      type: "normal",
      name: SCREENS.MemoryOfChaosPage.getShortName(language),
      icon: SCREENS.MemoryOfChaosPage.icon,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.MemoryOfChaosPage.id);
      },
    },
    // 開拓力
    {
      type: "large",
      name: LOCALES[language].Stamina,
      icon: Moon,
      title: playerNote.data ? (
        <>
          <Text className="text-[24px] leading-[26px]">
            {playerNote.data?.current_stamina}
          </Text>
          <Text>/{playerNote.data?.max_stamina}</Text>
        </>
      ) : null,
      subtitle: playerNote.data ? (
        <Text>
          {playerNote.data.current_stamina >= 240
            ? LOCALES[language].StaminaIsFull
            : formatTimePoint(
                (playerNote.data.max_stamina -
                  playerNote.data.current_stamina) *
                  360
              )}
        </Text>
      ) : null,
      onPress: () => {},
    },
    // 每日實訓
    {
      type: "normal",
      name: playerNote.data
        ? `${playerNote.data?.current_train_score}/${playerNote.data?.max_train_score}`
        : LOCALES[language].NoDataYet,
      icon: Calendar,
      onPress: () => {},
    },
    // 模擬宇宙
    {
      type: "normal",
      name: playerNote.data
        ? `${formatNumber(playerNote.data?.current_rogue_score)}/${formatNumber(
            playerNote.data?.max_rogue_score
          )}`
        : LOCALES[language].NoDataYet,
      icon: Planet,
      onPress: () => {},
    },
    // 派遣委託
    {
      type: "large",
      name: SCREENS.ExpeditionPage.getShortName(language),
      icon: SCREENS.ExpeditionPage.icon,
      title: playerNote.data ? (
        <>
          <Text className="text-[24px] leading-[26px]">
            {playerNote.data?.accepted_epedition_num}
          </Text>
          <Text>/{playerNote.data?.total_expedition_num}</Text>
        </>
      ) : null,
      subtitle: playerNote.data ? (
        <Text>
          {_.maxBy(playerNote.data.expeditions, (e: any) => e.remaining_time)
            .remaining_time === 0
            ? LOCALES[language].IsDone
            : formatTimePoint(
                _.maxBy(
                  playerNote.data.expeditions,
                  (e: any) => e.remaining_time
                ).remaining_time
              )}
        </Text>
      ) : null,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.ExpeditionPage.id);
      },
    },
    // 地圖
    {
      type: "normal",
      name: SCREENS.MapPage.getShortName(language),
      icon: SCREENS.MapPage.icon,
      onPress: () => {
        // @ts-ignore
        navigation.navigate(SCREENS.MapPage.id);
      },
    },
  ];

  return (
    <View
      style={{
        height: 530,
      }}
    >
      <ScrollView>
        <View
          onLayout={onLayout}
          className={cn("w-full pt-3 px-4 pb-5")}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 13 }}
        >
          {menuItems.map((menuItem, i) => {
            if (menuItem.type === "normal") {
              return (
                <MenuItem
                  key={i}
                  width={menuItemSize.width}
                  height={menuItemSize.height}
                  Icon={menuItem.icon}
                  onPress={menuItem.onPress}
                >
                  {menuItem.name}
                </MenuItem>
              );
            } else if (menuItem.type === "large") {
              return (
                <MenuItemLarge
                  key={i}
                  width={menuItemLargeSize.width}
                  height={menuItemLargeSize.height}
                  Icon={menuItem.icon}
                  onPress={menuItem.onPress}
                  title={menuItem.title}
                  subtitle={menuItem.subtitle}
                >
                  {menuItem.name}
                </MenuItemLarge>
              );
            }
          })}

          {/* <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={MathOperations}
          >
            养成计算
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={Gauge}
          >
            伤害模拟
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={Books}
          >
            百科
          </MenuItem>
          <MenuItem
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={SCREENS.MapPage.icon}
            onPress={() => {
              // @ts-ignore
              navigation.navigate(SCREENS.MapPage.id);
            }}
          >
            {SCREENS.MapPage.getShortName(language)}
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={ShootingStar}
          >
            祈愿分析
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={StarOfDavid}
          >
            祈愿模拟
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={Ticket}
          >
            兑换码
          </MenuItem>
          <MenuItem
            onPress={() => {
              Toast.StillDevelopingToast();
            }}
            width={menuItemSize.width}
            height={menuItemSize.height}
            Icon={ClockClockwise}
          >
            未来卡池
          </MenuItem> */}
        </View>
      </ScrollView>
    </View>
  );
}
